/* ===== js/catalog.js ===== */
'use strict';
/* КАТАЛОГ ДОРІГ: пресети (смуги, ширина, швидкість, оздоблення) і похідні розміри.
   f/b — смуги вперед/назад, lw — ширина смуги, v — макс.швидкість, med — розділювач, sw — тротуар, lv — примусовий рівень. */
// ===== Пресети: f/b — смуги вперед/назад, lw — ширина смуги, v — макс.швидкість, med — розділювач
const CATS=[],PRESETS={};
const B={f:1,b:1,lw:30,v:1.8,col:'#3b3f46',med:0,sw:0,paved:1};
function C(cat,L){CATS.push(cat);for(const[n,o]of L)PRESETS['p'+Object.keys(PRESETS).length]={n,cat,...B,...o}}
const M={f:2,b:2,v:2.2},L6={f:3,b:3,v:2.6},H={col:'#2f3237',v:3.2,barrier:1},BR={f:2,b:2,v:2.2,lv:1,sw:6};
C('🏘️ Малі',[['Двосмугова двостороння',{}],['Двосмугова одностороння',{f:2,b:0}],['Односмугова одностороння',{f:1,b:0}],['Односмугова вузька',{f:1,b:0,lw:24}],['Односмугова з тротуарами',{f:1,b:0,sw:10}],['Вузька житлова',{lw:24}],['Житлова з тротуарами',{sw:10}],['Житлова з деревами',{sw:12,tree:1}],['Житлова з паркуванням',{sw:10,park:1}],['Житлова з узбіччям',{sw:8,swc:'#9a8b6a'}],['Ґрунтова',{lw:26,v:1.1,col:'#7a5c3a',paved:0}],['Гравійна',{lw:26,v:1.4,col:'#9a9486',paved:0}],['Тупик (cul-de-sac)',{cul:1,sw:8}],['Під паркування',{park:1}],['Мала на мосту',{lv:1,sw:6}],['Мала з трамваєм',{med:18,tram:1}]]);
C('🏙️ Середні',[['4 смуги двостороння',M],['4 смуги одностороння',{...M,f:4,b:0}],['4 смуги з розділювачем',{...M,med:14}],['4 смуги з деревами',{...M,sw:12,tree:1}],['З велосмугами',{...M,bike:1,sw:6}],['З автобусними смугами',{...M,bus:1,sw:6}],['З трамвайними коліями',{...M,med:20,tram:1}],['Автобусні + трамвай',{...M,bus:1,med:20,tram:1}],['Широкі тротуари',{...M,sw:26}],['З паркувальними смугами',{...M,park:1,sw:8}],['Центральна зелена смуга',{...M,med:18,green:1}],['Середня на мосту',{...M,lv:1,sw:6}],['Два рівні проїзної частини',{...M,lv:1,br:'cover',sw:6}]]);
C('🌆 Великі',[['6 смуг двостороння',L6],['6 смуг одностороння',{...L6,f:6,b:0}],['6 смуг з розділювачем',{...L6,med:14}],['6 смуг з деревами',{...L6,sw:12,tree:1}],['З велосмугами',{...L6,bike:1,sw:6}],['З автобусними смугами',{...L6,bus:1,sw:6}],['З трамвайними коліями',{...L6,med:20,tram:1}],['Проспект з широкими тротуарами',{...L6,sw:30,tree:1}],['Центральна зелена смуга',{...L6,med:22,green:1}],['Велика на мосту',{...L6,lv:1,sw:6}]]);
C('🚘 Автомагістралі',[['2 смуги одностороння',{...H,f:2,b:0}],['3 смуги одностороння',{...H,f:3,b:0}],['4 смуги двостороння',{...H,f:2,b:2,med:10}],['6 смуг двостороння',{...H,f:3,b:3,med:10}],['З центральним розділювачем',{...H,f:3,b:3,med:24,green:1}],['З шумовими бар\'єрами',{...H,f:2,b:2,med:10,noise:1}],['Розділені проїзні частини',{...H,f:2,b:2,med:60,green:1}],['Дворівнева',{...H,f:2,b:2,med:10,lv:1,br:'cover'}],['Естакадна',{...H,f:2,b:2,med:10,lv:1}],['Підземна',{...H,f:2,b:2,med:10,lv:-1}],['В\'їзд на магістраль',{...H,f:1,b:0,v:2.4}],['З\'їзд з магістралі',{...H,f:1,b:0,v:2.4}],['Ділянка розв\'язки',{...H,f:2,b:0,v:2.6}]]);
C('🌉 Мости й тунелі',[['Автомобільний міст',BR],['Арковий',{...BR,br:'arch'}],['Підвісний',{...BR,br:'susp'}],['Вантовий',{...BR,br:'cable'}],['Розвідний',{...BR,br:'bascule'}],['Підіймальний',{...BR,br:'lift'}],['Дворівневий',{...BR,br:'cover',f:3,b:3}],['З трамваєм',{...BR,f:1,b:1,med:18,tram:1}],['Автотунель',{...BR,lv:-1,sw:0}],['Підземний проїзд',{...BR,lv:-1,f:1,b:1,sw:0}],['Естакада',{...BR,sw:0}],['Дворівнева споруда',{...BR,br:'cover',med:10}]]);
const carW=p=>Math.max((p.f+p.b)*p.lw+p.med,p.w||0),sideW=p=>(p.bus?p.lw:0)+(p.bike?12:0)+(p.park?16:0)+p.sw,roadW=p=>carW(p)+2*sideW(p);
const laneW=p=>(p.f+p.b)*p.lw+p.med,laneOff=(p,rev,i)=>rev?-laneW(p)/2+p.b*p.lw-(i+.5)*p.lw:-laneW(p)/2+p.b*p.lw+p.med+(i+.5)*p.lw;
const BRC={susp:'#dc2626',cable:'#f59e0b',arch:'#6b7280',bascule:'#7c3aed',lift:'#0ea5e9',rail:'#78350f'};
 
/* ===== js/core.js ===== */
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
/** Згладжування шляху «зрізанням кутів» (Chaikin = квадратичний B-сплайн) з незмінними кінцями.
    Крива лишається всередині опуклої оболонки опорних точок → НЕМАЄ викидів/вигину в інший бік перед поворотом
    (інтерполюючі сплайни проходять крізь кут по діагоналі й «перестрибують»). Перший/останній сегмент дотичні до кривої. */
function smoothPath(P,iter=4){if(P.length<3)return P;let A=P.map(p=>({x:p.x,y:p.y}));
 for(let k=0;k<iter;k++){const B=[A[0]];for(let i=0;i<A.length-1;i++){const p=A[i],q=A[i+1];B.push({x:.75*p.x+.25*q.x,y:.75*p.y+.25*q.y},{x:.25*p.x+.75*q.x,y:.25*p.y+.75*q.y})}B.push(A[A.length-1]);A=B}
 return A}
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
/* ===== js/network.js ===== */
'use strict';
/* МЕРЕЖА ДОРІГ: додавання доріг (прилипання, Т-розгалуження, перетини), авто-об'єднання смуг, побудова графа смуг. */
// ===== Побудова доріг і графа смуг
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function nearestOn(P,p){let b={d:1e9};for(let i=0;i<P.length-1;i++){const a=P[i],c=P[i+1],dx=c.x-a.x,dy=c.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1))),x=a.x+dx*t,y=a.y+dy*t,d=Math.hypot(p.x-x,p.y-y);if(d<b.d)b={d,i,t,x,y}}return b}
function segInt(a,b,c,d){const r={x:b.x-a.x,y:b.y-a.y},s={x:d.x-c.x,y:d.y-c.y},den=r.x*s.y-r.y*s.x;if(Math.abs(den)<1e-9)return null;
 const t=((c.x-a.x)*s.y-(c.y-a.y)*s.x)/den,u=((c.x-a.x)*r.y-(c.y-a.y)*r.x)/den;return t>.001&&t<.999&&u>.001&&u<.999?{t,u,x:a.x+r.x*t,y:a.y+r.y*t}:null}
function cutPoly(P,cuts){cuts.sort((a,b)=>a.i+a.t-b.i-b.t);const out=[];let cur=[P[0]],ci=0;
 for(let i=0;i<P.length-1;i++){while(ci<cuts.length&&cuts[ci].i===i){const q={x:cuts[ci].x,y:cuts[ci].y};cur.push(q);out.push(cur);cur=[q];ci++}cur.push(P[i+1])}
 out.push(cur);return out.filter(p=>mkLane(p).len>6)}
function splitRoad(r,cuts){S.roads=S.roads.filter(x=>x!==r);const out=[];for(const p of cutPoly(r.pts,cuts)){const q={pts:p,pk:r.pk,level:r.level,sh:r.sh};S.roads.push(q);out.push(q)}return out}
function trimPoly(P,a,b){const L=mkLane(P);
 if(L.len<a+b+12){if(L.len<16)return P;const k=(L.len-12)/(a+b);a*=k;b*=k} // коротка ділянка між вузлами: пропорційно зменшуємо відступи, лишаючи ≥12 одиниць смуги
 const o=[at(L,a)];for(let i=1;i<P.length-1;i++)if(L.cum[i]>a&&L.cum[i]<L.len-b)o.push(P[i]);o.push(at(L,L.len-b));return o.map(p=>({x:p.x,y:p.y}))}
// Додавання дороги з АВТО-перехрестями: прилипання кінців, Т‑розгалуження, перетини X
// Авто-об'єднання: нова односторонка поруч з дорогою стає її додатковою смугою
function derive(pk,df,db){const key=pk+'|'+df+'|'+db;if(!PRESETS[key])PRESETS[key]={...PRESETS[pk],f:PRESETS[pk].f+df,b:PRESETS[pk].b+db,n:PRESETS[pk].n+' +',cat:undefined};return key}
function tryMerge(c,pk,lv){const pn=PRESETS[pk];if(pn.f<1||pn.b||pn.w||pn.med||($('mrg')&&$('mrg').checked===false))return false;
 const L=mkLane(c);if(L.len<40)return false;const smp=[];for(let t=0;t<L.len;t+=20)smp.push(at(L,t));smp.push(at(L,L.len));
 let best=null;
 for(const r of S.roads){if(r.level!==lv||r.ramp)continue;const po=PRESETS[r.pk];if(po.f+po.b<1||po.w||po.f+po.b+pn.f>10)continue;
  const Dexp=laneW(po)/2+pn.f*po.lw/2;let same=null,side=null,sum=0,ok=true;
  for(const q of smp){const n=nearestOn(r.pts,q),a=r.pts[n.i],b=r.pts[n.i+1],h0=Math.atan2(b.y-a.y,b.x-a.x);
   const lat=(q.x-n.x)*-Math.sin(h0)+(q.y-n.y)*Math.cos(h0)-(r.sh||0),mag=Math.abs(lat),df=Math.atan2(Math.sin(q.a-h0),Math.cos(q.a-h0));
   const sm=Math.abs(df)<.5?1:Math.abs(df)>Math.PI-.5?-1:0,sd=Math.sign(lat);
   if(!sm||mag<Dexp*.4||mag>Dexp+30||(same!==null&&(sm!==same||sd!==side))){ok=false;break}same=sm;side=sd;sum+=Math.abs(mag-Dexp)}
  if(!ok)continue;
  const right=side>0;let df=0,db=0;
  if(same>0){if(!right&&po.b>0)continue;df=pn.f}else{if(po.b<=0||right)continue;db=pn.f}
  if(!best||sum<best.sum)best={r,sum,df,db,sh:(right?1:-1)*pn.f*po.lw/2}}
 if(!best)return false;
 const r=best.r,cuts=[];for(const q of [smp[0],smp[smp.length-1]]){const n=nearestOn(r.pts,q),e0=dist(n,r.pts[0]),e1=dist(n,r.pts[r.pts.length-1]);if(e0>15&&e1>15)cuts.push(n)}
 let target=r;if(cuts.length){const pcs=splitRoad(r,cuts),mid=smp[smp.length>>1];target=pcs.reduce((a,b)=>{const m=p=>{const l=mkLane(p.pts);return dist(at(l,l.len/2),mid)};return m(b)<m(a)?b:a})}
 target.pk=derive(target.pk,best.df,best.db);target.sh=(target.sh||0)+best.sh;buildGraph();toast('Додано смугу до існуючої дороги');return true}
function addRoad(pts,pk,lv,sp,nm){let c=sp?smoothPath(pts):pts.map(p=>({...p}));if(!nm&&(autoRamp(c,pk,lv)||tryMerge(c,pk,lv)||autoLevelRamp(c,pk,lv)))return; // пріоритет: з'їзд/заїзд (кінець на тілі дороги) → смуга поруч → рампа між рівнями
 for(const k of [0,c.length-1]){const e=c[k];let hit=false;const same=S.roads.filter(r=>r.level===lv);
  for(const r of same){for(const q of [r.pts[0],r.pts[r.pts.length-1]])if(dist(e,q)<30){c[k]={x:q.x,y:q.y};hit=true;break}if(hit)break}
  if(!hit)for(const r of same){const n=nearestOn(r.pts,e);if(n.d<roadW(PRESETS[r.pk])/2+14){c[k]={x:n.x,y:n.y};splitRoad(r,[n]);break}}}
 const cuts=[];
 const cb=bboxOf(c);for(const r of S.roads.filter(x=>x.level===lv)){const rc=[];if(!bbHit(cb,r.bb||(r.bb=bboxOf(r.pts))))continue; // відсікання за bbox
  for(let i=0;i<c.length-1;i++)for(let j=0;j<r.pts.length-1;j++){const h=segInt(c[i],c[i+1],r.pts[j],r.pts[j+1]);if(h){cuts.push({i,t:h.t,x:h.x,y:h.y});rc.push({i:j,t:h.u,x:h.x,y:h.y})}}
  if(rc.length)splitRoad(r,rc)}
 for(const p of cutPoly(c,cuts))S.roads.push({pts:p,pk,level:lv});buildGraph()}
/** Рукави вузла: кінцева точка (після обрізання), напрям від центру, півширина; відсортовані за кутом (за годинниковою стрілкою). */
function makeArms(n){const A=[];for(const q of n.m){const r=S.roads[q.r],tp=r.tp,p=q.e?tp[tp.length-1]:tp[0],dx=p.x-n.c.x,dy=p.y-n.c.y,l=Math.hypot(dx,dy);let d;
  if(l>1)d={x:dx/l,y:dy/l};else{const a=q.e?tp[Math.max(0,tp.length-2)]:tp[Math.min(1,tp.length-1)],ex=a.x-p.x,ey=a.y-p.y,m=Math.hypot(ex,ey)||1;d={x:ex/m,y:ey/m}}
  const pr=PRESETS[r.pk];A.push({r:q.r,e:q.e,p,d,w:carW(pr)/2,col:pr.col,a:Math.atan2(d.y,d.x)})}
 return A.sort((x,y)=>x.a-y.a)}
/** Фази світлофора: протилежні рукави їдуть разом, інші — окремо. */
function makeSignal(A){const ph=[],used=new Set();A.forEach((a,i)=>{if(used.has(i))return;used.add(i);let j=-1,bd=-.7;
  A.forEach((b,k)=>{if(!used.has(k)){const dot=a.d.x*b.d.x+a.d.y*b.d.y;if(dot<bd){bd=dot;j=k}}});if(j>=0)used.add(j);ph.push(j>=0?[i,j]:[i])});
 return{ph,cur:0,t:Math.random()*5}}
function buildGraph(){const eLv=(ri,e)=>{const r=S.roads[ri];return r.from!==undefined&&e===r.attEnd?r.from:r.level};S.lanes=[];S.cars=[];S.obst=[];S.roads.forEach(r=>r.t0=r.t1=0);
 const eps=[];S.roads.forEach((r,i)=>[0,1].forEach(e=>{if((r.ramp==='exit'||r.ramp==='entry')&&e===(r.ramp==='exit'?0:1))return;eps.push({r:i,e,p:e?r.pts[r.pts.length-1]:r.pts[0]})}));
 // Вузли: кластеризація кінців доріг одного рівня через сітку (замість O(n²))
 const nodes=[],grid=new Map(),CELL=28;
 for(const q of eps){const rq=S.roads[q.r],lvq=rq.from!==undefined&&q.e===rq.attEnd?rq.from:rq.level,gx=Math.floor(q.p.x/CELL),gy=Math.floor(q.p.y/CELL);let n=null;
  for(let dx=-1;dx<=1&&!n;dx++)for(let dy=-1;dy<=1&&!n;dy++){const b=grid.get(lvq+':'+(gx+dx)+':'+(gy+dy));if(b)n=b.find(m=>dist(m.c,q.p)<14)||null}
  if(!n){n={lv:lvq,c:{x:q.p.x,y:q.p.y},m:[]};nodes.push(n);const k=lvq+':'+gx+':'+gy;(grid.get(k)||grid.set(k,[]).get(k)).push(n)}n.m.push(q)}
 S.nodes=nodes.filter(n=>n.m.length>1);
 for(const n of S.nodes){n.mw=Math.max(...n.m.map(q=>roadW(PRESETS[S.roads[q.r].pk])));n.T=n.m.length>2?n.mw*.5+28:4;n.m.forEach(q=>S.roads[q.r]['t'+q.e]=n.T)}
 S.roads.forEach((r,ri)=>{const pr=PRESETS[r.pk],m=pr.med/2;r.dp=r.sh?offsetLine(r.pts,r.sh):r.pts;r.tp=trimPoly(r.dp,r.t0,r.t1);
  const mk=(d,rev,idx)=>{const Q=offsetLine(r.tp,d);if(rev)Q.reverse();const l=mkLane(Q);Object.assign(l,{road:ri,dir:rev?-1:1,idx,nl:rev?pr.b:pr.f,next:[],nb:[]});S.lanes.push(l)};
  for(let i=0;i<pr.f;i++)mk(laneOff(pr,0,i),0,i);for(let i=0;i<pr.b;i++)mk(laneOff(pr,1,i),1,i)});
 for(const nd of S.nodes){nd.arms=makeArms(nd);nd.sig=nd.arms.length>=3?makeSignal(nd.arms):null;nd.sigLanes=[]} // рукави + світлофор на розвилках (≥3 рукави)
 S.lanes=S.lanes.filter(l=>l.len>=1&&l.pts.length>1); // відкидаємо виродженi смуги (краш at())
 const conns=[],wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
 // З'єднання смуг на вузлах: беремо кандидатів із хешу кінців/початків, а не всі пари смуг
 const endH=new SpatialHash(128),startH=new SpatialHash(128);for(const l of S.lanes){endH.add(l.pts[l.pts.length-1],l);startH.add(l.pts[0],l)}
 for(const n of S.nodes){const R=n.mw/2+40,As=endH.query(n.c,R),Bs=startH.query(n.c,R);
  for(const a of As){if(eLv(a.road,a.dir>0?1:0)!==n.lv||dist(a.pts[a.pts.length-1],n.c)>R)continue;
   const ai=n.arms.findIndex(m=>m.r===a.road&&(a.dir>0?m.e===1:m.e===0));if(n.sig&&ai>=0&&!a.sig){a.sig={n,arm:ai};n.sigLanes.push(a)} // стоп-лінія світлофора
   for(const b of Bs){if(b.road===a.road||eLv(b.road,b.dir>0?0:1)!==n.lv||dist(b.pts[0],n.c)>R)continue;
    const turn=wrap(at(b,0).a-at(a,a.len).a),ab=Math.abs(turn);if(ab>2.1)continue;
    const ok=ab<.5?b.idx===Math.min(a.idx,b.nl-1):turn>0?(a.idx===a.nl-1&&b.idx===b.nl-1):(a.idx===0&&b.idx===0);if(!ok)continue;
    const p0=a.pts[a.pts.length-1],p1=b.pts[0],ct=ab<.5?{x:(p0.x+p1.x)/2,y:(p0.y+p1.y)/2}:n.c,Q=[];
    for(let k=0;k<=10;k++){const t=k/10,u=1-t;Q.push({x:u*u*p0.x+2*u*t*ct.x+t*t*p1.x,y:u*u*p0.y+2*u*t*ct.y+t*t*p1.y})}
    const l=mkLane(Q);Object.assign(l,{road:a.road,dir:0,idx:0,conn:true,turn,next:[b],nb:[]});conns.push(l);a.next.push(l);b.hasIn=true}}}
 const link=(a,b)=>{const p0=a.pts[a.pts.length-1],p1=b.pts[0],Q=[];for(let k=0;k<=6;k++){const t=k/6;Q.push({x:p0.x+(p1.x-p0.x)*t,y:p0.y+(p1.y-p0.y)*t})}
  const l=mkLane(Q);Object.assign(l,{road:a.road,dir:0,idx:0,conn:true,next:[b],nb:[]});conns.push(l);a.next.push(l);b.hasIn=true};
 S.roads.forEach((r,ri)=>{if(r.ramp!=='exit'&&r.ramp!=='entry')return;const rl=S.lanes.find(l=>l.road===ri&&!l.conn);if(!rl)return;const ex=r.ramp==='exit',q=ex?rl.pts[0]:rl.pts[rl.pts.length-1];let best=null,bd=220;
  for(const o of S.lanes){if(o.conn||o.road===ri||S.roads[o.road].level!==r.level)continue;const e=ex?o.pts[o.pts.length-1]:o.pts[0],d=dist(e,q);
   const dh=Math.abs(wrap((ex?at(o,o.len).a:at(o,0).a)-(ex?at(rl,0).a:at(rl,rl.len).a)));if(d<bd&&dh<1.6){bd=d;best=o}}
  r.linked=!!best;if(best)ex?link(best,rl):link(rl,best)});
 S.lanes.push(...conns);
 // Сусідні смуги одного напрямку (для перестроювання): групуємо за дорогою+напрямком
 const grp=new Map();for(const l of S.lanes){if(l.conn)continue;const k=l.road*3+l.dir+1;(grp.get(k)||grp.set(k,[]).get(k)).push(l)}
 for(const g of grp.values())for(const a of g){a.grp=g;for(const b of g)if(Math.abs(a.idx-b.idx)===1)a.nb.push(b)}
 S.rev++;S.dirty=1}
/* ===== js/sim.js ===== */
'use strict';
/* СИМУЛЯЦІЯ ТРАФІКУ: IDM (слідування за лідером) + перестроювання.
   Оптимізація: авто індексуються по смугах (відсортовані за s) → пошук лідера O(log n), загалом O(n log n) замість O(n²). */
const SIM={dt:1/60,spawnP:.04,perLane:6,maxCars:900,rev:-1,arev:-1,active:[],spawnLanes:[]};
const roadOf=l=>S.roads[l.road];
 
/** Перебудова індексу: lane.cars (за зростанням s) + аварії як нерухомі «авто-перешкоди».
    Чіпаємо лише «активні» смуги (де є авто) — вартість не залежить від загальної кількості смуг. */
function indexCars(){
 if(SIM.arev!==S.rev){SIM.active.length=0;SIM.arev=S.rev}
 for(const l of SIM.active)l.cars.length=0;SIM.active.length=0;
 const put=(l,x)=>{if(!l.cars.length)SIM.active.push(l);l.cars.push(x)};
 for(const c of S.cars)put(c.lane,c);
 for(const o of S.obst)put(o.lane,{s:o.s,v:0,obst:true,lane:o.lane});
 for(const l of SIM.active)if(l.cars.length>1)l.cars.sort((a,b)=>a.s-b.s);}
 
/** Перше авто попереду позиції s на смузі (бінарний пошук), пропускаючи self. */
function firstAhead(lane,s,self){const a=lane.cars;let lo=0,hi=a.length;
 while(lo<hi){const m=(lo+hi)>>1;if(a[m].s<=s)lo=m+1;else hi=m}
 while(lo<a.length&&a[lo]===self)lo++;return a[lo]||null}
const lastBehind=(lane,s)=>{const a=lane.cars;let lo=0,hi=a.length;while(lo<hi){const m=(lo+hi)>>1;if(a[m].s<s)lo=m+1;else hi=m}return a[lo-1]||null};
const bumper=o=>o.obst?20:26;
function gapAhead(lane,s,self){const o=firstAhead(lane,s,self);return o?{o,gap:o.s-s-bumper(o)}:{o:null,gap:1e9}}
const pickNext=lane=>lane.next.length?lane.next[(Math.random()*lane.next.length)|0]:null;
 
/** Лідер для авто: у власній смузі, інакше на наступній (2 кроки уперед). Маршрут обирається один раз і зберігається. */
function leaderCars(c){const lane=c.lane,a=gapAhead(lane,c.s,c);if(a.o||!lane.next.length)return a;
 const nx=routeFor(c);if(!nx)return a;
 const rest=lane.len-c.s,f=nx.cars[0];
 if(f)return{o:f,gap:rest+f.s-bumper(f)};
 if(nx.next.length===1){const f2=nx.next[0].cars[0];if(f2)return{o:f2,gap:rest+nx.len+f2.s-bumper(f2)}}
 return a}
 
/** Маршрут через перехрестя: «ціль» (планується при в'їзді на дорогу) → запасний варіант, якщо ціль недосяжна з поточної смуги. */
function routeFor(c){const l=c.lane;if(c.route&&l.next.includes(c.route))return c.route;if(c.alt&&l.next.includes(c.alt))return c.alt;return c.alt=pickNext(l)}
/** Планування: заздалегідь обираємо напрямок на найближчому перехресті (прямо ×3, поворот ×1) і смугу, з якої він доступний. */
function planGoal(c){const l=c.lane;c.route=c.goal=c.alt=null;if(l.conn||!l.grp)return;let tot=0;const o=[];
 for(const g of l.grp)for(const nx of g.next){const w=Math.abs(nx.turn||0)<.5?3:1;o.push({g,nx,w});tot+=w}
 if(!o.length)return;let r=Math.random()*tot;for(const x of o){r-=x.w;if(r<=0){c.goal=x.g;c.route=x.nx;return}}}
/** Обов'язкове перестроювання до смуги-цілі (перед поворотом), якщо в сусідній смузі безпечний проміжок. */
function tryGoalChange(c){const g=c.goal,d0=Math.abs(c.lane.idx-g.idx);
 for(const nb of c.lane.nb){if(Math.abs(nb.idx-g.idx)>=d0)continue;const s2=c.s*nb.len/c.lane.len,f=gapAhead(nb,s2,null),bk=lastBehind(nb,s2);
  if(f.gap>25&&!(bk&&s2-bk.s<28&&bk.v>c.v*1.05)){c.want=nb;return}}}
/** Світлофори: цикл фаз (зелений/жовтий/червоний); стан смуги залежить від рукава вузла. */
const SIG={G:9,Y:1.5,R:1.2};
function sigState(s){const p=s.n.sig;if(!p.ph[p.cur].includes(s.arm))return'r';return p.t<SIG.G?'g':p.t<SIG.G+SIG.Y?'y':'r'}
function updateSignals(dt){for(const n of S.nodes){const p=n.sig;if(!p)continue;p.t+=dt;if(p.t>=SIG.G+SIG.Y+SIG.R){p.t=0;p.cur=(p.cur+1)%p.ph.length}}}
/** Червоний/жовтий = віртуальна нерухома перешкода на стоп-лінії (на жовтий їдемо далі, якщо вже не встигнемо загальмувати). */
function signalStop(c){const s=c.lane.sig;if(!s)return null;const st=sigState(s);if(st==='g')return null;const gap=c.lane.len-c.s-8;if(gap<-2)return null;
 if(st==='y'&&gap<c.v*25)return null;return{o:{v:0,s:c.lane.len,obst:true},gap:Math.max(gap,.5)}}
function leader(c){const a=leaderCars(c),g=signalStop(c);return g&&g.gap<a.gap?g:a}
 
function spawnCars(){
 if(SIM.rev!==S.rev){SIM.spawnLanes=S.lanes.filter(l=>!l.conn&&!l.hasIn);SIM.rev=S.rev}
 const sp=SIM.spawnLanes;if(!sp.length||Math.random()>=SIM.spawnP||S.cars.length>=Math.min(SIM.maxCars,S.lanes.length*SIM.perLane))return;
 const l=sp[(Math.random()*sp.length)|0];if(l.cars[0]&&l.cars[0].s<40)return;
 const p=at(l,5);S.cars.push({lane:l,s:5,v:0,lat:0,col:`hsl(${Math.random()*360|0},60%,55%)`,vm:.8+Math.random()*.3,want:null,route:null,x:p.x,y:p.y,a:p.a});planGoal(S.cars[S.cars.length-1])}
 
/** Перестроювання: обганяємо повільного лідера, якщо в сусідній смузі є вільне місце попереду й позаду. */
function tryLaneChange(c,L){
 for(const nb of c.lane.nb){if(c.goal&&c.lane.len-c.s<350&&Math.abs(nb.idx-c.goal.idx)>Math.abs(c.lane.idx-c.goal.idx))continue; // не відходимо від смуги-цілі біля перехрестя
  const s2=c.s*nb.len/c.lane.len,f=gapAhead(nb,s2,null),bk=lastBehind(nb,s2);
  if(f.gap>L.gap+20&&f.gap>35&&!(bk&&s2-bk.s<34&&bk.v>c.v*.9)){c.want=nb;return}}}
function advanceLaneChange(c,dt){const nb=c.want,lw=PRESETS[roadOf(c.lane).pk].lw,tgt=-(nb.idx-c.lane.idx)*lw; // lat>0 — ліворуч
 c.lat+=Math.sign(tgt)*dt*40*(c.v>.1?1:0);
 if(Math.abs(c.lat)>=Math.abs(tgt)-.5){c.s=c.s*nb.len/c.lane.len;c.lane=nb;c.lat=0;c.want=null;c.alt=null}}
/** Перехід на наступну смугу (до 4 коротких з'єднань за крок); немає продовження → авто зникає. */
function advanceLane(c){let g=0;while(c.s>=c.lane.len&&g++<4){const n=routeFor(c);
 if(!n){c.dead=true;return}c.s-=c.lane.len;c.lane=n;c.lat=0;c.want=null;planGoal(c)}}
 
function updateCar(c,dt){
 const pr=PRESETS[roadOf(c.lane).pk],vmax=pr.v*c.vm,L=leader(c),dv=L.o?c.v-L.o.v:0;
 const sStar=12+Math.max(0,c.v*8+c.v*dv*8/(2*Math.sqrt(.06*.12)));
 const acc=.06*(1-Math.pow(c.v/vmax,4)-(L.o?Math.pow(sStar/Math.max(L.gap,1),2):0));
 c.v=Math.max(0,c.v+acc*dt*30);
 if(!c.want&&c.goal&&c.goal!==c.lane&&c.s>8)tryGoalChange(c);
 if(!c.want&&c.lane.nb.length&&L.o&&L.gap<60&&L.o.v<vmax*.7)tryLaneChange(c,L);
 if(c.want)advanceLaneChange(c,dt);
 c.s+=c.v*dt*60;if(c.s>=c.lane.len)advanceLane(c);if(c.dead)return;
 const p=at(c.lane,c.s);c.x=p.x+Math.sin(p.a)*c.lat;c.y=p.y-Math.cos(p.a)*c.lat;
 c.a+=(((p.a-c.a+Math.PI*3)%(Math.PI*2))-Math.PI)*.25}
 
/** Один фіксований крок симуляції. Мертві авто видаляються на місці (без нових масивів → менше GC). */
function step(dt){indexCars();updateSignals(dt);spawnCars();const cs=S.cars;let w=0;for(let i=0;i<cs.length;i++){const c=cs[i];updateCar(c,dt);if(!c.dead)cs[w++]=c}cs.length=w}
 
/* ===== js/render2d.js ===== */
'use strict';
/* 2D-РЕНДЕРЕР. Дороги кешуються в офскрін-шари (по рівнях) і перемальовуються лише при зміні мережі/камери;
   щокадру малюються тільки авто. Усі об'єкти поза екраном відсікаються. */
function strokePath(P,w,col,dash){ctx.beginPath();P.forEach((p,i)=>{const q=w2s(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y)});
 ctx.lineWidth=w*S.cam.z;ctx.strokeStyle=col;ctx.setLineDash(dash||[]);ctx.lineCap='butt';ctx.lineJoin='round';ctx.stroke();ctx.setLineDash([])}
const strokeOff=(P,d,w,col,dash)=>strokePath(offsetLine(P,d),w,col,dash);
function deco(r,p){const P=r.tp,E=carW(p)/2,mc=-laneW(p)/2+p.b*p.lw+p.med/2;let o=E;
 if(p.bus){[1,-1].forEach(s=>strokeOff(P,s*(o+p.lw/2),p.lw,'#b91c1c'));o+=p.lw}
 if(p.bike){[1,-1].forEach(s=>strokeOff(P,s*(o+6),10,'#16a34a'));o+=12}
 if(p.park){[1,-1].forEach(s=>{strokeOff(P,s*(o+8),14,'#4b5563');strokeOff(P,s*(o+8),14,'#e5e7eb',[2,16])});o+=16}
 if(p.tree)[1,-1].forEach(s=>strokeOff(P,s*(o+p.sw/2),8,'#15803d',[6,24]));
 if(p.med){strokeOff(P,mc,p.med,p.green?'#3f7f3f':p.tram?'#555':'#6b7280');if(p.tram)[-4,4].forEach(d=>strokeOff(P,mc+d,1.5,'#d1d5db'));if(p.barrier)[1,-1].forEach(s=>strokeOff(P,mc+s*(p.med/2+1),3,'#e5e7eb'))}
 if(p.noise)[1,-1].forEach(s=>strokeOff(P,s*(E+3),4,'#38bdf8'));
 if(p.paved){const L0=-laneW(p)/2+p.b*p.lw;for(let i=1;i<p.f;i++)strokeOff(P,L0+p.med+i*p.lw,2,'#e5e7eb',[14,14]);for(let i=1;i<p.b;i++)strokeOff(P,L0-i*p.lw,2,'#e5e7eb',[14,14]);if(p.b&&p.f&&!p.med)strokeOff(P,L0,2,'#facc15')}}
 
const LAYERS={},DR={rev:-1,lv:new Set()};
const lvOf=l=>S.roads[l.road].level;
/** Чи потрапляє дорога (bbox + запас на ширину) у видиму область. */
function roadVisible(r){const b=r.bb||(r.bb=bboxOf(r.pts)),a=s2w(0,0),z=s2w(cv.width,cv.height),pad=300;return bbHit({x0:a.x-pad,y0:a.y-pad,x1:z.x+pad,y1:z.y+pad},b)}
/** Перехрестя: суцільний контур із заокругленими кутами між сусідніми рукавами (квадратична крива через точку перетину країв).
    Замість круглої «плями» — форма точно по ширині доріг. Вузол із 2 рукавів — лише закриття стику. */
function drawJunction(n){const A=n.arms;if(!A||A.length<2)return;ctx.fillStyle=A.reduce((a,b)=>b.w>a.w?b:a).col;
 if(A.length<3){const q=w2s(n.c);ctx.beginPath();ctx.arc(q.x,q.y,Math.max(...A.map(a=>a.w))*S.cam.z,0,7);ctx.fill();return}
 const P=(a,sg)=>w2s({x:a.p.x-a.d.y*a.w*sg,y:a.p.y+a.d.x*a.w*sg});ctx.beginPath();
 A.forEach((a,i)=>{const b=A[(i+1)%A.length],pa=P(a,1),pb=P(b,-1);if(!i){const p0=P(a,-1);ctx.moveTo(p0.x,p0.y)}ctx.lineTo(pa.x,pa.y);
  const gap=((b.a-a.a)+2*Math.PI)%(2*Math.PI)||2*Math.PI;let k=null;
  if(gap<3.0){const ax=a.p.x-a.d.y*a.w,ay=a.p.y+a.d.x*a.w,bx=b.p.x+b.d.y*b.w,by=b.p.y-b.d.x*b.w,den=a.d.x*b.d.y-a.d.y*b.d.x;
   if(Math.abs(den)>1e-3){const t=((bx-ax)*b.d.y-(by-ay)*b.d.x)/den;if(Math.abs(t)<n.T*3+60)k=w2s({x:ax+a.d.x*t,y:ay+a.d.y*t})}}
  if(k)ctx.quadraticCurveTo(k.x,k.y,pb.x,pb.y);else ctx.lineTo(pb.x,pb.y)});
 ctx.closePath();ctx.fill()}
/** Стоп-лінії світлофорів (динамічні, малюються поверх кешованих шарів). */
function drawSignals(lv){const C={g:'#22c55e',y:'#facc15',r:'#ef4444'};
 for(const n of S.nodes){if(!n.sig||n.lv!==lv)continue;for(const l of n.sigLanes){const p=l.pts[l.pts.length-1],a=at(l,l.len).a,hw=PRESETS[roadOf(l).pk].lw*.45;
  strokePath([{x:p.x+Math.sin(a)*hw,y:p.y-Math.cos(a)*hw},{x:p.x-Math.sin(a)*hw,y:p.y+Math.cos(a)*hw}],3,C[sigState(l.sig)])}}}
/** Статичний малюнок одного рівня: мости/тротуари → асфальт → вузли → з'єднання → оздоблення → стрілки. */
function drawRoadLevel(lv){const R=S.roads.filter(r=>r.level===lv&&roadVisible(r));
 for(const r of R){const p=PRESETS[r.pk];if(lv>0){strokePath(r.dp,roadW(p)+22,'rgba(0,0,0,.35)');strokePath(r.dp,roadW(p)+8,BRC[p.br]||'#9ca3af')}if(sideW(p))strokePath(r.dp,roadW(p),p.swc||'#b8b8b0')}
 for(const r of R){const p=PRESETS[r.pk];strokePath(r.dp,carW(p),p.col);if(p.cul){const q=w2s(r.dp[r.dp.length-1]);ctx.fillStyle=p.col;ctx.beginPath();ctx.arc(q.x,q.y,carW(p)*.9*S.cam.z,0,7);ctx.fill()}}
 for(const n of S.nodes||[])if(n.lv===lv)drawJunction(n);
 for(const l of S.lanes)if(l.conn&&lvOf(l)===lv){const p=PRESETS[roadOf(l).pk];strokePath(l.pts,p.lw,p.col)}
 for(const r of R)deco(r,PRESETS[r.pk]);
 ctx.fillStyle='rgba(255,255,255,.85)';
 for(const l of S.lanes)if(!l.conn&&lvOf(l)===lv)for(let s=Math.max(40,l.len*.5);s<l.len-40;s+=90){const p=at(l,s),q=w2s(p);ctx.save();ctx.translate(q.x,q.y);ctx.rotate(p.a);ctx.scale(S.cam.z,S.cam.z);
  ctx.beginPath();ctx.moveTo(7,0);ctx.lineTo(-5,-5);ctx.lineTo(-5,5);ctx.fill();ctx.restore()}}
/** Повертає актуальний шар рівня; перемальовує тільки якщо змінились мережа (S.rev), камера або розмір вікна. */
function renderLayer(lv){let L=LAYERS[lv];if(!L){const c=document.createElement('canvas');L=LAYERS[lv]={c,x:c.getContext('2d'),rev:-1,key:''}}
 if(L.c.width!==cv.width||L.c.height!==cv.height){L.c.width=cv.width;L.c.height=cv.height;L.rev=-1}
 const key=S.cam.x+','+S.cam.y+','+S.cam.z;if(L.rev===S.rev&&L.key===key)return L;
 ctx=L.x;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,cv.width,cv.height);try{drawRoadLevel(lv)}finally{ctx=mainCtx}L.rev=S.rev;L.key=key;return L}
function drawObstacles(lv){for(const o of S.obst){if(lvOf(o.lane)!==lv)continue;const q=w2s(at(o.lane,o.s)),z=S.cam.z;ctx.fillStyle='#ef4444';ctx.fillRect(q.x-8*z,q.y-8*z,16*z,16*z)}}
/** Авто: без save/restore (один setTransform на авто), з відсіканням за межами екрана. */
function drawCars(lv){const z=S.cam.z,w=cv.width,h=cv.height;
 for(const c of S.cars){if(lvOf(c.lane)!==lv)continue;const x=(c.x-S.cam.x)*z+w/2,y=(c.y-S.cam.y)*z+h/2;if(x<-30||y<-30||x>w+30||y>h+30)continue;
  const co=Math.cos(c.a)*z,si=Math.sin(c.a)*z;ctx.setTransform(co,si,-si,co,x,y);ctx.fillStyle=c.col;ctx.fillRect(-12,-6,24,12);
  ctx.fillStyle='#111';ctx.fillRect(3,-5,5,10);if(c.v<.05){ctx.fillStyle='#f00';ctx.fillRect(-13,-5,2,10)}}
 ctx.setTransform(1,0,0,1,0,0)}
function drawOverlay(){
 if(S.pts.length){const P=[...S.pts,S.mouse];strokePath($('mode').value==='spline'?smoothPath(P):P,roadW(PRESETS[S.preset]),'rgba(129,140,248,.5)')}}
function draw(){ctx=mainCtx;ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#14532d';ctx.fillRect(0,0,cv.width,cv.height);
 if(DR.rev!==S.rev){DR.lv=new Set(S.roads.map(r=>r.level));DR.rev=S.rev}
 for(const lv of [-1,0,1]){if(!DR.lv.has(lv))continue;ctx.globalAlpha=lv<0?.45:1;ctx.drawImage(renderLayer(lv).c,0,0);drawObstacles(lv);drawCars(lv);drawSignals(lv);ctx.globalAlpha=1}
 drawOverlay()}
 
/* ===== js/ui.js ===== */
'use strict';
/* ІНТЕРФЕЙС: панель пресетів, режими, миша/клавіатура. */
// ===== Введення
const toolbar=$('presets'),catBar=$('cats');let curCat=CATS[0];
function renderPresets(){toolbar.innerHTML='';for(const k in PRESETS){const p=PRESETS[k];if(p.cat!==curCat)continue;const b=document.createElement('button');b.className='pre'+(k===S.preset?' on':'');b.textContent=p.n;
 b.onclick=()=>{S.preset=k;if(p.lv!==undefined)$('level').value=p.lv;renderPresets()};toolbar.appendChild(b)}}
CATS.forEach(c=>{const b=document.createElement('button');b.className='btn';b.textContent=c;b.onclick=()=>{curCat=c;renderPresets()};catBar.appendChild(b)});renderPresets();
function finish(){if(S.pts.length>1){const sp=$('mode').value==='spline',lv=+$('level').value,pr=PRESETS[S.preset];
  addRoad(S.pts.slice(),S.preset,lv,sp);
  if($('par').checked){const W=roadW(pr)+24;addRoad(offsetLine(S.pts,W),S.preset,lv,sp,true)}}
 S.pts=[]}
let drag=null;
cv.addEventListener('mousedown',e=>{S.dirty=1;if(e.button===2){drag={x:e.clientX,y:e.clientY,cx:S.cam.x,cy:S.cam.y};return}
 const p=s2w(e.clientX,e.clientY);
 if(e.altKey){let best=null,bd=40;for(const l of S.lanes)for(let s=0;s<l.len;s+=10){const q=at(l,s),d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;best={lane:l,s}}}if(best)S.obst.push(best);return}
 const g=40;S.pts.push({x:Math.round(p.x/g)*g,y:Math.round(p.y/g)*g})});
cv.addEventListener('mousemove',e=>{S.dirty=1;if(drag){S.cam.x=drag.cx-(e.clientX-drag.x)/S.cam.z;S.cam.y=drag.cy-(e.clientY-drag.y)/S.cam.z}
 const p=s2w(e.clientX,e.clientY);S.mouseRaw=p;S.mouse={x:Math.round(p.x/40)*40,y:Math.round(p.y/40)*40}});
addEventListener('mouseup',()=>drag=null);cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('dblclick',()=>{S.pts.pop();finish()});
cv.addEventListener('wheel',e=>{S.dirty=1;S.cam.z=Math.max(.3,Math.min(3,S.cam.z*(e.deltaY<0?1.1:.9)))});
addEventListener('keydown',e=>{S.dirty=1;if(e.key==='Enter')finish();if(e.key==='Escape')S.pts=[]});
$('sim').onclick=()=>{S.run=!S.run;$('sim').textContent=S.run?'⏸ Трафік':'▶ Трафік'};
$('clr').onclick=()=>{S.roads=[];S.pts=[];buildGraph()};
 
/* ===== js/ramps.js ===== */
'use strict';
/* З'ЇЗДИ / ЗАЇЗДИ БЕЗ НАЛАШТУВАНЬ. Просто малюйте односторонню дорогу:
   • початок на тілі траси під кутом → З'ЇЗД (від крайньої смуги); кінець на тілі траси → ЗАЇЗД (вливання в крайню смугу);
   • кут і форму задаєте самі рухом миші; сторона (пряма/зворотна смуга траси) визначається автоматично;
   • дорога іншого рівня, що починається/закінчується в кінці існуючої, стає рампою міст↔земля↔тунель. */
const wrapA=a=>Math.atan2(Math.sin(a),Math.cos(a));
const HINT0=$('hint').textContent;let hintT=0;
function toast(t){const d=$('hint');d.textContent=t;clearTimeout(hintT);hintT=setTimeout(()=>{d.textContent=HINT0;d.style.background=''},3500)}
/** Шукає, чи кінець k накреслення лежить на тілі іншої дороги під «правим» кутом (0.04…1.25 рад) для якоїсь із її смуг. */
function findRampTarget(c,lv,first){const e=first?c[0]:c[c.length-1],nx=first?c[1]:c[c.length-2],hd=first?Math.atan2(nx.y-e.y,nx.x-e.x):Math.atan2(e.y-nx.y,e.x-nx.x);let best=null;
 for(const r of S.roads){if(r.level!==lv||r.ramp)continue;const po=PRESETS[r.pk];if(po.f+po.b<1||po.w)continue;
  const n=nearestOn(r.pts,e);if(n.d>=roadW(po)/2+14||dist(n,r.pts[0])<30||dist(n,r.pts[r.pts.length-1])<30)continue; // біля кінця — звичайне з'єднання
  const h0=Math.atan2(r.pts[n.i+1].y-r.pts[n.i].y,r.pts[n.i+1].x-r.pts[n.i].x);
  for(const side of [1,-1]){if(side>0?!po.f:!po.b)continue;const hc=side>0?h0:h0+Math.PI,turn=first?wrapA(hd-hc):wrapA(hc-hd);
   if(turn>.04&&turn<1.25&&(!best||turn<best.turn))best={r,n,po,side,h0,hc,turn}}}
 return best}
function autoRamp(c,pk,lv){const pn=PRESETS[pk];if(pn.f<1||pn.b||pn.w||pn.med||c.length<2)return false;
 for(const first of [true,false]){const t=findRampTarget(c,lv,first);if(!t)continue;
  const{r,n,po,side,h0,hc}=t,off=(side>0?laneOff(po,0,po.f-1):laneOff(po,1,po.b-1))+(r.sh||0),att={x:n.x-Math.sin(h0)*off,y:n.y+Math.cos(h0)*off};
  const lead={x:att.x+Math.cos(hc)*(first?30:-30),y:att.y+Math.sin(hc)*(first?30:-30)}; // короткий відрізок уздовж траси → плавне відгалуження
  let pts=c.map(p=>({...p}));if(first){pts.shift();while(pts.length>1&&dist(pts[0],att)<60)pts.shift();pts=[att,lead,...pts]}
  else{pts.pop();while(pts.length>1&&dist(pts[pts.length-1],att)<60)pts.pop();pts=[...pts,lead,att]}
  splitRoad(r,[n]);S.roads.push({pts:smoothPath(pts),pk,level:lv,ramp:first?'exit':'entry'});buildGraph();toast(first?"З'їзд створено":'Заїзд створено');return true}
 return false}
/** Дорога іншого рівня, що торкається кінця існуючої, стає рампою зі схилом (висота інтерполюється у 3D). */
function autoLevelRamp(c,pk,lv){for(const k of [0,c.length-1]){const e=c[k];
  if(S.roads.some(x=>x.level===lv&&(dist(x.pts[0],e)<30||dist(x.pts[x.pts.length-1],e)<30)))continue; // є з'єднання на тому ж рівні
  for(const r of S.roads){if(r.level===lv||r.ramp==='level'||PRESETS[r.pk].f+PRESETS[r.pk].b<1)continue;
   for(const q of [r.pts[0],r.pts[r.pts.length-1]])if(dist(e,q)<30){const pts=c.map(p=>({...p}));pts[k]={x:q.x,y:q.y};
    S.roads.push({pts,pk,level:lv,ramp:'level',sh:r.sh||0,from:r.level,attEnd:k?1:0,ys:k?[lv*30,r.level*30]:[r.level*30,lv*30]});buildGraph();toast('Рампу між рівнями створено');return true}}}
 return false}
 
/* ===== js/render3d.js ===== */
'use strict';
/* 3D-ВИГЛЯД (Three.js). Дороги — статична група мешів (перебудова лише при зміні S.rev),
   усі авто — ОДИН InstancedMesh (1 draw call). Матеріали кешуються; при виході з 3D усе звільняється (dispose) — без витоків GPU-пам'яті. */
const T3={r:null,sc:null,cam:null,roads:null,cars:null,dummy:null,rev:-1,ang:0,mats:new Map()},MAX3D=1200;
function mat3(col,tag){const k=col+(tag||'');let m=T3.mats.get(k);if(!m){m=new THREE.MeshStandardMaterial({color:col,side:THREE.DoubleSide});T3.mats.set(k,m)}return m}
function disposeGroup(g){g.traverse(o=>{if(o.geometry)o.geometry.dispose()});T3.sc.remove(g)}
/** Меші доріг: стрічка за точками (з похилом для рамп), пілони мостів, пілони/арки спеціальних мостів. */
function buildRoads3D(){if(T3.roads)disposeGroup(T3.roads);const g=new THREE.Group();
 for(const rd of S.roads){const P=rd.dp||rd.pts,pr=PRESETS[rd.pk],W=roadW(pr),y0=rd.level*30+.5,v=[],id=[];
  P.forEach((p,i)=>{const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)],dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy)||1,nx=-dy/l*W/2,ny=dx/l*W/2;
   const y=rd.ys?rd.ys[0]+(rd.ys[1]-rd.ys[0])*i/(P.length-1)+.5:y0;v.push(p.x+nx,y,p.y+ny,p.x-nx,y,p.y-ny);if(i)id.push(2*i-2,2*i-1,2*i,2*i-1,2*i+1,2*i)});
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(v,3));geo.setIndex(id);geo.computeVertexNormals();g.add(new THREE.Mesh(geo,mat3(pr.col)));
  const m=P[P.length>>1];
  if(pr.br==='susp'||pr.br==='cable'){const t=new THREE.Mesh(new THREE.BoxGeometry(8,120,W),mat3('#dc2626'));t.position.set(m.x,60,m.y);g.add(t)}
  if(pr.br==='arch'){const a=new THREE.Mesh(new THREE.TorusGeometry(100,4,6,24,Math.PI),mat3('#6b7280'));a.position.set(m.x,rd.level*30,m.y);g.add(a)}
  if(rd.level>0&&!rd.ys){const pil=new THREE.Mesh(new THREE.BoxGeometry(W,rd.level*30,8),mat3('#9ca3af'));pil.position.set(P[0].x,rd.level*15,P[0].y);g.add(pil)}}
 T3.roads=g;T3.sc.add(g);T3.rev=S.rev}
function init3D(){if(T3.r)return;const el=$('c3d'),r=new THREE.WebGLRenderer({antialias:true});r.setPixelRatio(Math.min(devicePixelRatio||1,2));r.setSize(innerWidth,innerHeight);el.innerHTML='';el.appendChild(r.domElement);
 const sc=new THREE.Scene();sc.background=new THREE.Color(0x9ec5e8);sc.add(new THREE.HemisphereLight(0xffffff,0x335533,1));
 T3.r=r;T3.sc=sc;T3.cam=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,1,6000);
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(9000,9000),mat3('#2e7d32','g'));ground.rotation.x=-Math.PI/2;sc.add(ground);
 T3.cars=new THREE.InstancedMesh(new THREE.BoxGeometry(24,8,12),new THREE.MeshStandardMaterial({color:0xffffff}),MAX3D);T3.cars.instanceMatrix.setUsage(THREE.DynamicDrawUsage);T3.cars.frustumCulled=false;
 T3.dummy=new THREE.Object3D();sc.add(T3.cars);buildRoads3D()}
function dispose3D(){if(!T3.r)return;T3.sc.traverse(o=>{if(o.geometry)o.geometry.dispose()});T3.mats.forEach(m=>m.dispose());T3.mats.clear();
 T3.cars.material.dispose();T3.cars.dispose();T3.r.dispose();if(T3.r.forceContextLoss)T3.r.forceContextLoss();T3.r.domElement.remove();
 T3.r=T3.sc=T3.cam=T3.roads=T3.cars=null;T3.rev=-1}
function draw3D(){if(!T3.r)return;if(T3.rev!==S.rev)buildRoads3D();
 const n=Math.min(S.cars.length,MAX3D),d=T3.dummy;
 for(let i=0;i<n;i++){const c=S.cars[i],rd=roadOf(c.lane),fr=c.lane.dir>0?c.s/c.lane.len:c.lane.dir<0?1-c.s/c.lane.len:null;
  d.position.set(c.x,(rd.ys&&fr!==null?rd.ys[0]+(rd.ys[1]-rd.ys[0])*fr:rd.level*30)+5,c.y);d.rotation.y=-c.a;d.updateMatrix();
  T3.cars.setMatrixAt(i,d.matrix);T3.cars.setColorAt(i,c.c3||(c.c3=new THREE.Color(c.col)))}
 T3.cars.count=n;T3.cars.instanceMatrix.needsUpdate=true;if(T3.cars.instanceColor)T3.cars.instanceColor.needsUpdate=true;
 T3.ang+=.003;const R=700;T3.cam.position.set(S.cam.x+Math.cos(T3.ang)*R,520,S.cam.y+Math.sin(T3.ang)*R);T3.cam.lookAt(S.cam.x,0,S.cam.y);T3.r.render(T3.sc,T3.cam)}
addEventListener('resize',()=>{if(T3.r){T3.r.setSize(innerWidth,innerHeight);T3.cam.aspect=innerWidth/innerHeight;T3.cam.updateProjectionMatrix()}});
$('v3').onclick=()=>{const hidden=$('c3d').classList.toggle('hidden');if(hidden){dispose3D();cv.style.visibility='visible';S.dirty=1}else{init3D();cv.style.visibility='hidden'}};
 
/* ===== js/main.js ===== */
'use strict';
/* ГОЛОВНИЙ ЦИКЛ: фіксований крок симуляції (60 Гц, акумулятор) — однакова поведінка на будь-якому FPS.
   Малювання лише коли щось змінилось (симуляція йде або S.dirty); помилка не зупиняє цикл, а показується у підказці. */
let last=performance.now(),acc=0;
function frame(t){const dt=Math.min(.1,(t-last)/1000);last=t;
 try{if(S.run){acc+=dt;let n=0;while(acc>=SIM.dt&&n<3){step(SIM.dt);acc-=SIM.dt;n++}if(n===3)acc=0}
  if(!$('c3d').classList.contains('hidden'))draw3D();else if(S.run||S.dirty){draw();S.dirty=0}}
 catch(e){console.error(e);S.run=false;const d=$('hint');d.style.background='#7f1d1d';d.textContent='Помилка: '+e.message}
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
