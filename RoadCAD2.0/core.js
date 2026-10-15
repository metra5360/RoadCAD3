'use strict';
/* ЯДРО: стан застосунку (S), камера, геометрія (сплайни, зсув лінії, смуга як полілінія з довжинами). */
const S={rev:0,dirty:1,roads:[],lanes:[],cars:[],pts:[],preset:'p0',run:false,cam:{x:0,y:0,z:1},mouse:{x:0,y:0},obst:[]};
const cv=document.getElementById('c2d'),mainCtx=cv.getContext('2d');
let ctx=mainCtx; // тимчасово підміняється під час рендеру кешованих шарів
const $=id=>document.getElementById(id);
const rs=()=>{cv.width=innerWidth;cv.height=innerHeight;S.dirty=1};addEventListener('resize',rs);rs();
const w2s=p=>({x:(p.x-S.cam.x)*S.cam.z+cv.width/2,y:(p.y-S.cam.y)*S.cam.z+cv.height/2});
const s2w=(x,y)=>({x:(x-cv.width/2)/S.cam.z+S.cam.x,y:(y-cv.height/2)/S.cam.z+S.cam.y});
// ===== Геометрія
function catmull(P,n=12){if(P.length<3)return P;const o=[];for(let i=0;i<P.length-1;i++){const a=P[i-1]||P[i],b=P[i],c=P[i+1],d=P[i+2]||c;
 for(let t=0;t<n;t++){const u=t/n,u2=u*u,u3=u2*u,f=(k,p0,p1,p2,p3)=>.5*(2*p1+(-p0+p2)*u+(2*p0-5*p1+4*p2-p3)*u2+(-p0+3*p1-3*p2+p3)*u3);
 o.push({x:f(0,a.x,b.x,c.x,d.x),y:f(0,a.y,b.y,c.y,d.y)})}}o.push(P[P.length-1]);return o}
function offsetLine(P,d){return P.map((p,i)=>{const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)];let dx=b.x-a.x,dy=b.y-a.y;const l=Math.hypot(dx,dy)||1;return{x:p.x-dy/l*d,y:p.y+dx/l*d}})}
function mkLane(pts){let L=0;const cum=[0];for(let i=1;i<pts.length;i++){L+=Math.hypot(pts[i].x-pts[i-1].x,pts[i].y-pts[i-1].y);cum.push(L)}return{pts,cum,len:L,cars:[]}}
/** Точка на смузі на відстані s: бінарний пошук сегмента (O(log n) замість O(n)). */
function at(l,s){s=s<0?0:s>l.len?l.len:s;const cum=l.cum;let lo=1,hi=cum.length-1;
 while(lo<hi){const m=(lo+hi)>>1;if(cum[m]<s)lo=m+1;else hi=m}
 const a=l.pts[lo-1],b=l.pts[lo],t=(s-cum[lo-1])/((cum[lo]-cum[lo-1])||1);
 return{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,a:Math.atan2(b.y-a.y,b.x-a.x)}}
/** Просторовий хеш: швидкий пошук об'єктів у радіусі (використовується для зв'язків смуг на вузлах). */
class SpatialHash{constructor(c){this.c=c;this.m=new Map()}
 add(p,it){const k=Math.floor(p.x/this.c)+','+Math.floor(p.y/this.c);let a=this.m.get(k);if(!a)this.m.set(k,a=[]);a.push(it)}
 query(p,r){const c=this.c,out=[];for(let gx=Math.floor((p.x-r)/c);gx<=Math.floor((p.x+r)/c);gx++)for(let gy=Math.floor((p.y-r)/c);gy<=Math.floor((p.y+r)/c);gy++){const a=this.m.get(gx+','+gy);if(a)for(const it of a)out.push(it)}return out}}
const bboxOf=P=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const p of P){if(p.x<x0)x0=p.x;if(p.x>x1)x1=p.x;if(p.y<y0)y0=p.y;if(p.y>y1)y1=p.y}return{x0,y0,x1,y1}};
const bbHit=(a,b)=>a.x0<=b.x1&&a.x1>=b.x0&&a.y0<=b.y1&&a.y1>=b.y0;