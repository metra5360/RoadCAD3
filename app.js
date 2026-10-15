'use strict';
// ===== Пресети: f/b — смуги вперед/назад, lw — ширина смуги, v — макс.швидкість, med — розділювач
const PRESETS={
 dirt:{n:'Ґрунтова',f:1,b:1,lw:26,v:1.1,col:'#7a5c3a',paved:false},
 st1:{n:'Вулиця ↑ 2 смуги',f:2,b:0,lw:30,v:1.8,col:'#3b3f46',paved:true},
 st2:{n:'Вулиця ⇅ 1+1',f:1,b:1,lw:30,v:1.8,col:'#3b3f46',paved:true},
 st4:{n:'Вулиця ⇅ 2+2',f:2,b:2,lw:30,v:2.2,col:'#3b3f46',paved:true},
 hwy:{n:'Шосе 3+3',f:3,b:3,lw:32,v:3.2,col:'#2f3237',paved:true,med:14,barrier:true}};
const S={roads:[],lanes:[],cars:[],pts:[],preset:'st2',run:false,cam:{x:0,y:0,z:1},mouse:{x:0,y:0},obst:[]};
const cv=document.getElementById('c2d'),ctx=cv.getContext('2d');
const $=id=>document.getElementById(id);
const rs=()=>{cv.width=innerWidth;cv.height=innerHeight};addEventListener('resize',rs);rs();
const w2s=p=>({x:(p.x-S.cam.x)*S.cam.z+cv.width/2,y:(p.y-S.cam.y)*S.cam.z+cv.height/2});
const s2w=(x,y)=>({x:(x-cv.width/2)/S.cam.z+S.cam.x,y:(y-cv.height/2)/S.cam.z+S.cam.y});
// ===== Геометрія
function catmull(P,n=12){if(P.length<3)return P;const o=[];for(let i=0;i<P.length-1;i++){const a=P[i-1]||P[i],b=P[i],c=P[i+1],d=P[i+2]||c;
 for(let t=0;t<n;t++){const u=t/n,u2=u*u,u3=u2*u,f=(k,p0,p1,p2,p3)=>.5*(2*p1+(-p0+p2)*u+(2*p0-5*p1+4*p2-p3)*u2+(-p0+3*p1-3*p2+p3)*u3);
 o.push({x:f(0,a.x,b.x,c.x,d.x),y:f(0,a.y,b.y,c.y,d.y)})}}o.push(P[P.length-1]);return o}
function offsetLine(P,d){return P.map((p,i)=>{const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)];let dx=b.x-a.x,dy=b.y-a.y;const l=Math.hypot(dx,dy)||1;return{x:p.x-dy/l*d,y:p.y+dx/l*d}})}
function mkLane(pts){let L=0;const cum=[0];for(let i=1;i<pts.length;i++){L+=Math.hypot(pts[i].x-pts[i-1].x,pts[i].y-pts[i-1].y);cum.push(L)}return{pts,cum,len:L}}
function at(l,s){s=Math.max(0,Math.min(l.len,s));let i=1;while(i<l.cum.length-1&&l.cum[i]<s)i++;const a=l.pts[i-1],b=l.pts[i],t=(s-l.cum[i-1])/((l.cum[i]-l.cum[i-1])||1);
 return{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,a:Math.atan2(b.y-a.y,b.x-a.x)}}
// ===== Побудова доріг і графа смуг
function addRoad(pts,pk,level,spline){const pr=PRESETS[pk],c=spline?catmull(pts):pts;S.roads.push({pts:c,pk,level});buildGraph()}
function buildGraph(){S.lanes=[];S.cars=[];S.obst=[];
 S.roads.forEach((r,ri)=>{const pr=PRESETS[r.pk],m=(pr.med||0)/2;
  for(let i=0;i<pr.f;i++){const l=mkLane(offsetLine(r.pts,m+(i+.5)*pr.lw));Object.assign(l,{road:ri,dir:1,idx:i,next:[],nb:[]});S.lanes.push(l)}
  for(let i=0;i<pr.b;i++){const l=mkLane(offsetLine(r.pts,-(m+(i+.5)*pr.lw)).reverse());Object.assign(l,{road:ri,dir:-1,idx:i,next:[],nb:[]});S.lanes.push(l)}});
 const R=46,end=l=>l.pts[l.pts.length-1],st=l=>l.pts[0],ang=(l,e)=>{const k=l.pts.length;return e?at(l,l.len).a:at(l,0).a};
 for(const a of S.lanes)for(const b of S.lanes){if(a===b)continue;const ra=S.roads[a.road],rb=S.roads[b.road];
  if(ra.level!==rb.level)continue;
  const d=Math.hypot(end(a).x-st(b).x,end(a).y-st(b).y);if(d>R)continue;
  let da=Math.abs(ang(a,1)-ang(b,0));da=Math.min(da,2*Math.PI-da);if(da>2.1)continue; // без розворотів
  a.next.push(b);const t=a.next.length;a.turn=da}
 // сусідні смуги одного напрямку (для перестроювання)
 for(const a of S.lanes)for(const b of S.lanes)if(a!==b&&a.road===b.road&&a.dir===b.dir&&Math.abs(a.idx-b.idx)===1)a.nb.push(b)}
// ===== Симуляція (IDM + перестроювання)
function spawn(){const ok=S.lanes.filter(l=>S.lanes.every(o=>!o.next.includes(l))); if(!ok.length)return;
 const l=ok[Math.random()*ok.length|0];if(S.cars.some(c=>c.lane===l&&c.s<40))return;
 S.cars.push({lane:l,s:5,v:0,lat:0,col:`hsl(${Math.random()*360|0},60%,55%)`,vm:(.8+Math.random()*.3),want:null,x:0,y:0,a:0})}
function leader(c,lane,s){let best=null,gap=1e9;
 for(const o of S.cars)if(o!==c&&o.lane===lane&&o.s>s){const g=o.s-s-26;if(g<gap){gap=g;best=o}}
 for(const o of S.obst)if(o.lane===lane&&o.s>s){const g=o.s-s-20;if(g<gap){gap=g;best={v:0}}}
 if(!best&&lane.next.length){const nx=c.route||(c.route=lane.next[Math.random()*lane.next.length|0]);
  for(const o of S.cars)if(o.lane===nx){const g=lane.len-s+o.s-26;if(g<gap){gap=g;best=o}}}
 return{best,gap}}
function step(dt){if(Math.random()<.04&&S.cars.length<(S.lanes.length*6))spawn();
 for(const c of S.cars){const vmax=PRESETS[S.roads[c.lane.road].pk].v*c.vm;
  const L=leader(c,c.lane,c.s),dv=L.best?c.v-L.best.v:0;
  const sStar=12+Math.max(0,c.v*8+c.v*dv*8/(2*Math.sqrt(.06*.12)));
  let acc=.06*(1-Math.pow(c.v/vmax,4)-(L.best?Math.pow(sStar/Math.max(L.gap,1),2):0));
  c.v=Math.max(0,c.v+acc*dt*60*.5);
  // перестроювання: обгін повільного лідера або підготовка до повороту
  if(!c.want&&c.lane.nb.length){const slow=L.best&&L.gap<60&&L.best.v<vmax*.7;
   const nxt=c.route,needTurn=nxt&&c.lane.len-c.s<160&&false;
   if(slow||needTurn){for(const nb of c.lane.nb){const s2=c.s*nb.len/c.lane.len;
     const f=leader(c,nb,s2),back=S.cars.some(o=>o.lane===nb&&o.s<s2&&s2-o.s<34&&o.v>c.v*.9&&o!==c);
     if(f.gap>L.gap+20&&f.gap>35&&!back){c.want=nb;break}}}}
  if(c.want){const nb=c.want,tgt=(nb.idx-c.lane.idx)*PRESETS[S.roads[c.lane.road].pk].lw*(nb.dir);
   c.lat+=(Math.sign(tgt)||0)*dt*40*(c.v>.1?1:0);
   if(Math.abs(c.lat)>=Math.abs(tgt)-.5){c.s=c.s*nb.len/c.lane.len;c.lane=nb;c.lat=0;c.want=null;c.route=null}}
  c.s+=c.v*dt*60;
  if(c.s>=c.lane.len){if(c.lane.next.length){const n=c.route||c.lane.next[Math.random()*c.lane.next.length|0];c.s-=c.lane.len;c.lane=n;c.route=null;c.lat=0;c.want=null}else c.dead=true}
  const p=at(c.lane,c.s);c.x=p.x-Math.sin(p.a)*c.lat*-1;c.y=p.y+Math.cos(p.a)*c.lat*-1;
  c.a+=(((p.a-c.a+Math.PI*3)%(Math.PI*2))-Math.PI)*.25}
 S.cars=S.cars.filter(c=>!c.dead)}
// ===== 2D рендерер
function strokePath(P,w,col,dash){ctx.beginPath();P.forEach((p,i)=>{const q=w2s(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y)});
 ctx.lineWidth=w*S.cam.z;ctx.strokeStyle=col;ctx.setLineDash(dash||[]);ctx.lineCap='butt';ctx.lineJoin='round';ctx.stroke();ctx.setLineDash([])}
function draw(){ctx.fillStyle='#14532d';ctx.fillRect(0,0,cv.width,cv.height);
 for(const lv of [-1,0,1])for(const r of S.roads){if(r.level!==lv)continue;const pr=PRESETS[r.pk],W=(pr.f+pr.b)*pr.lw+(pr.med||0);
  ctx.globalAlpha=lv<0?.45:1;if(lv>0)strokePath(r.pts,W+10,'#9ca3af');
  strokePath(r.pts,W,pr.col);ctx.globalAlpha=1
  if(pr.paved){const m=(pr.med||0)/2;
   if(pr.med)strokePath(r.pts,pr.med,'#6b7280'),pr.barrier&&[1,-1].forEach(s=>strokePath(offsetLine(r.pts,s*(m+1)),3,'#e5e7eb'));
   for(let i=1;i<pr.f;i++)strokePath(offsetLine(r.pts,m+i*pr.lw),2,'#e5e7eb',[14,14]);
   for(let i=1;i<pr.b;i++)strokePath(offsetLine(r.pts,-(m+i*pr.lw)),2,'#e5e7eb',[14,14]);
   if(pr.b&&!pr.med)strokePath(r.pts,2,'#facc15')}}
 ctx.fillStyle='rgba(255,255,255,.85)';
 for(const l of S.lanes)for(let s=l.len*.5;s<l.len;s+=90){const p=at(l,s),q=w2s(p);ctx.save();ctx.translate(q.x,q.y);ctx.rotate(p.a);ctx.scale(S.cam.z,S.cam.z);
  ctx.beginPath();ctx.moveTo(7,0);ctx.lineTo(-5,-5);ctx.lineTo(-5,5);ctx.fill();ctx.restore()}
 for(const o of S.obst){const p=at(o.lane,o.s),q=w2s(p);ctx.fillStyle='#ef4444';ctx.fillRect(q.x-8*S.cam.z,q.y-8*S.cam.z,16*S.cam.z,16*S.cam.z)}
 for(const c of S.cars){const q=w2s(c);ctx.save();ctx.translate(q.x,q.y);ctx.rotate(c.a);ctx.scale(S.cam.z,S.cam.z);ctx.fillStyle=c.col;ctx.fillRect(-12,-6,24,12);
  ctx.fillStyle='#111';ctx.fillRect(3,-5,5,10);if(c.v<.05){ctx.fillStyle='#f00';ctx.fillRect(-13,-5,2,10)}ctx.restore()}
 if(S.pts.length){const P=[...S.pts,S.mouse];strokePath($('mode').value==='spline'?catmull(P):P,PRESETS[S.preset].lw*(PRESETS[S.preset].f+PRESETS[S.preset].b),'rgba(129,140,248,.5)')}}
// ===== Введення
const toolbar=$('presets');
for(const k in PRESETS){const b=document.createElement('button');b.className='pre'+(k===S.preset?' on':'');b.textContent=PRESETS[k].n;
 b.onclick=()=>{S.preset=k;[...toolbar.children].forEach(x=>x.classList.remove('on'));b.classList.add('on')};toolbar.appendChild(b)}
function finish(){if(S.pts.length>1){const sp=$('mode').value==='spline',lv=+$('level').value,pr=PRESETS[S.preset];
  addRoad(S.pts.slice(),S.preset,lv,sp);
  if($('par').checked){const W=(pr.f+pr.b)*pr.lw+(pr.med||0)+24;addRoad(offsetLine(S.pts,W),S.preset,lv,sp)}}
 S.pts=[]}
let drag=null;
cv.addEventListener('mousedown',e=>{if(e.button===2){drag={x:e.clientX,y:e.clientY,cx:S.cam.x,cy:S.cam.y};return}
 const p=s2w(e.clientX,e.clientY);
 if(e.altKey){let best=null,bd=40;for(const l of S.lanes)for(let s=0;s<l.len;s+=10){const q=at(l,s),d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;best={lane:l,s}}}if(best)S.obst.push(best);return}
 const g=40;S.pts.push({x:Math.round(p.x/g)*g,y:Math.round(p.y/g)*g})});
cv.addEventListener('mousemove',e=>{if(drag){S.cam.x=drag.cx-(e.clientX-drag.x)/S.cam.z;S.cam.y=drag.cy-(e.clientY-drag.y)/S.cam.z}
 const p=s2w(e.clientX,e.clientY);S.mouse={x:Math.round(p.x/40)*40,y:Math.round(p.y/40)*40}});
addEventListener('mouseup',()=>drag=null);cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('dblclick',()=>{S.pts.pop();finish()});
cv.addEventListener('wheel',e=>{S.cam.z=Math.max(.3,Math.min(3,S.cam.z*(e.deltaY<0?1.1:.9)))});
addEventListener('keydown',e=>{if(e.key==='Enter')finish();if(e.key==='Escape')S.pts=[]});
$('sim').onclick=()=>{S.run=!S.run;$('sim').textContent=S.run?'⏸ Трафік':'▶ Трафік'};
$('clr').onclick=()=>{S.roads=[];S.pts=[];buildGraph()};
// ===== 3D (Three.js): стрічки доріг + бокси авто
let T=null;
function init3D(){const el=$('c3d'),r=new THREE.WebGLRenderer({antialias:true});r.setSize(innerWidth,innerHeight);el.innerHTML='';el.appendChild(r.domElement);
 const sc=new THREE.Scene();sc.background=new THREE.Color(0x9ec5e8);sc.add(new THREE.HemisphereLight(0xffffff,0x335533,1));
 const cam=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,1,6000);
 const g=new THREE.Mesh(new THREE.PlaneGeometry(9000,9000),new THREE.MeshStandardMaterial({color:0x2e7d32}));g.rotation.x=-Math.PI/2;sc.add(g);
 for(const rd of S.roads){const pr=PRESETS[rd.pk],W=(pr.f+pr.b)*pr.lw+(pr.med||0),y=rd.level*30+.5;
  const v=[],id=[];rd.pts.forEach((p,i)=>{const a=rd.pts[Math.max(0,i-1)],b=rd.pts[Math.min(rd.pts.length-1,i+1)],dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy)||1,nx=-dy/l*W/2,ny=dx/l*W/2;
   v.push(p.x+nx,y,p.y+ny,p.x-nx,y,p.y-ny);if(i)id.push(2*i-2,2*i-1,2*i,2*i-1,2*i+1,2*i)});
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(v,3));geo.setIndex(id);geo.computeVertexNormals();
  sc.add(new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:pr.col,side:THREE.DoubleSide})));
  if(rd.level>0){const pil=new THREE.Mesh(new THREE.BoxGeometry(W,rd.level*30,8),new THREE.MeshStandardMaterial({color:0x9ca3af}));
   pil.position.set(rd.pts[0].x,rd.level*15,rd.pts[0].y);sc.add(pil)}}
 T={r,sc,cam,cars:[],ang:0}}
function draw3D(){if(!T)return;const n=S.cars.length;while(T.cars.length<n){const m=new THREE.Mesh(new THREE.BoxGeometry(24,8,12),new THREE.MeshStandardMaterial({color:0xffffff}));T.sc.add(m);T.cars.push(m)}
 while(T.cars.length>n)T.sc.remove(T.cars.pop());
 S.cars.forEach((c,i)=>{const m=T.cars[i];m.material.color.set(c.col);m.position.set(c.x,S.roads[c.lane.road].level*30+5,c.y);m.rotation.y=-c.a});
 T.ang+=.003;const R=700;T.cam.position.set(S.cam.x+Math.cos(T.ang)*R,520,S.cam.y+Math.sin(T.ang)*R);T.cam.lookAt(S.cam.x,0,S.cam.y);T.r.render(T.sc,T.cam)}
$('v3').onclick=()=>{const on=$('c3d').classList.toggle('hidden')===false;if(on)init3D();cv.style.visibility=on?'hidden':'visible'};
// ===== Цикл
let last=performance.now();(function loop(t){const dt=Math.min(.05,(t-last)/1000);last=t;if(S.run)step(dt);
 if(!$('c3d').classList.contains('hidden'))draw3D();else draw();requestAnimationFrame(loop)})(last);
