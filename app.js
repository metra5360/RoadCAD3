/* ===== js/catalog.js ===== */
'use strict';
/* КАТАЛОГ ДОРІГ: пресети (смуги, ширина, швидкість, оздоблення) і похідні розміри.
   f/b — смуги вперед/назад, lw — ширина смуги, v — макс.швидкість, med — розділювач, sw — тротуар, lv — примусовий рівень. */
// ===== Пресети: f/b — смуги вперед/назад, lw — ширина смуги, v — макс.швидкість, med — розділювач
const CATS=[],PRESETS={};
const B={f:1,b:1,lw:30,v:1.8,col:'#3b3f46',med:0,sw:0,paved:1};
function C(cat,L){CATS.push(cat);for(const[n,o]of L)PRESETS['p'+Object.keys(PRESETS).length]={n,cat,...B,...o}}
const M={f:2,b:2,v:2.2},L6={f:3,b:3,v:2.6},H={col:'#3b3f46',v:3.2,barrier:1},BR={f:2,b:2,v:2.2,lv:1,sw:6};
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
const S={rev:0,dirty:1,nodes:[],opt:{mode:'line',level:0,par:false,mrg:true,grid:true,snap:true},marks:[],roads:[],lanes:[],cars:[],pts:[],preset:'p0',run:false,cam:{x:0,y:0,z:1},mouse:{x:0,y:0},obst:[]};
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
/** Прибирає (майже) однакові сусідні точки: нульові сегменти ламають нормалі → стрибки смуг/розмітки та «криві» авто. Кінці зберігаються. */
function cleanPath(P,min=.75){if(P.length<3)return P;const o=[P[0]];for(let i=1;i<P.length;i++){const p=P[i],q=o[o.length-1];
  if(Math.hypot(p.x-q.x,p.y-q.y)>=min)o.push(p);else if(i===P.length-1){if(o.length>1)o[o.length-1]=p;else o.push(p)}}return o}
/** Паралельна лінія на відстані d (праворуч за напрямком, d<0 — ліворуч). Стійка до нульових сегментів; на зломах зсув
    компенсується (міtre, ×≤2), тож відстань до осі лишається сталою. */
function offsetLine(P,d){const n=P.length;if(n<2)return P.map(p=>({x:p.x,y:p.y}));const T=[];
 for(let i=0;i<n-1;i++){const dx=P[i+1].x-P[i].x,dy=P[i+1].y-P[i].y,l=Math.hypot(dx,dy);T.push(l>1e-6?{x:dx/l,y:dy/l}:null)}
 let last=null;for(let i=0;i<T.length;i++){if(T[i])last=T[i];else if(last)T[i]=last}
 last=null;for(let i=T.length-1;i>=0;i--){if(T[i])last=T[i];else T[i]=last||{x:1,y:0}}
 return P.map((p,i)=>{const a=T[Math.max(0,i-1)],b=T[Math.min(T.length-1,i)];let tx=a.x+b.x,ty=a.y+b.y,l=Math.hypot(tx,ty);if(l<1e-6){tx=b.x;ty=b.y;l=1}tx/=l;ty/=l;
  const k=1/Math.max(.5,tx*b.x+ty*b.y);return{x:p.x-ty*d*k,y:p.y+tx*d*k}})}
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
 out.push(cur);return out.map(p=>cleanPath(p)).filter(p=>p.length>1&&mkLane(p).len>6)}
/** Розрізає дорогу; усі її властивості переносяться на шматки (раніше розріз «ламав» з'їзди/рампи, бо втрачав їхні ознаки).
    Ознаки рампи лишає лише шматок із прикріпленим кінцем; решта стає звичайною дорогою. Нахил (ys) ділиться пропорційно довжині. */
function splitRoad(r,cuts){S.roads=S.roads.filter(x=>x!==r);const pcs=cutPoly(r.pts,cuts),lens=pcs.map(p=>mkLane(p).len),tot=lens.reduce((a,b)=>a+b,0)||1,out=[];let acc=0;
 pcs.forEach((p,i)=>{const q={pts:p,pk:r.pk,level:r.level,sh:r.sh};if(i===0&&r.l0)q.l0=r.l0;if(i===pcs.length-1&&r.l1)q.l1=r.l1;
  if(r.ys){const f0=acc/tot,f1=(acc+lens[i])/tot;q.ys=[r.ys[0]+(r.ys[1]-r.ys[0])*f0,r.ys[0]+(r.ys[1]-r.ys[0])*f1]}
  if(r.ramp){const att=r.ramp==='exit'?0:r.ramp==='entry'?1:r.attEnd;if(att===0?i===0:i===pcs.length-1){q.ramp=r.ramp;if(r.from!==undefined){q.from=r.from;q.attEnd=att}}}
  acc+=lens[i];S.roads.push(q);out.push(q)});return out}
function trimPoly(P,a,b){const L=mkLane(P);
 if(L.len<a+b+12){if(L.len<16)return P;const k=(L.len-12)/(a+b);a*=k;b*=k} // коротка ділянка між вузлами: пропорційно зменшуємо відступи, лишаючи ≥12 одиниць смуги
 const o=[at(L,a)];for(let i=1;i<P.length-1;i++)if(L.cum[i]>a&&L.cum[i]<L.len-b)o.push(P[i]);o.push(at(L,L.len-b));return cleanPath(o.map(p=>({x:p.x,y:p.y})))}
const rightN=h=>({x:-Math.sin(h),y:Math.cos(h)});
/** Торець дороги ei: його точка та напрямок полілінії біля нього. */
function endInfo(r,ei){const P=r.pts,k=P.length,q=ei?P[k-1]:P[0],a=ei?P[k-2]:P[1];return{q,h:ei?Math.atan2(q.y-a.y,q.x-a.x):Math.atan2(a.y-q.y,a.x-q.x)}}
/** Межі смуг відносно осі блоку: краї кожної смуги (і край блоку). */
function laneBounds(p){const s=new Set();for(let i=0;i<p.f;i++){const c=laneOff(p,0,i);s.add(+(c-p.lw/2).toFixed(2));s.add(+(c+p.lw/2).toFixed(2))}
 for(let i=0;i<p.b;i++){const c=laneOff(p,1,i);s.add(+(c-p.lw/2).toFixed(2));s.add(+(c+p.lw/2).toFixed(2))}
 if(!s.size){s.add(-carW(p)/2);s.add(carW(p)/2)}return[...s].sort((a,b)=>a-b)}
/** Бічне зміщення нової дороги відносно цілі, при якому лінії її смуг збігаються з лініями смуг цілі (смуга в смугу).
    Вужча дорога лежить усередині ширшої, ширша — накриває вужчу; серед варіантів беремо найближчий до курсора. */
function laneSnap(po,pn,lat){const Wt=laneW(po)||carW(po),Wn=laneW(pn)||carW(pn),bt=laneBounds(po),bn=laneBounds(pn);let best=0,bd=1e9;
 for(const t of bt)for(const q of bn){const p=t-q;if(!(Wn<=Wt+1?Math.abs(p)+Wn/2<=Wt/2+.5:Math.abs(p)+Wt/2<=Wn/2+.5))continue;const d=Math.abs(p-lat);if(d<bd){bd=d;best=p}}
 return best}
/** Чи лежить точка e на торці якоїсь дороги (по поздовжньому ≤30, по ширині в межах дороги)? Повертає прив'язану до смуг точку + позицію вузла. */
function endSnap(e,pk,lv){const pn=PRESETS[pk];let best=null;
 for(const r of S.roads){if(r.level!==lv||r.ramp==='level')continue;const po=PRESETS[r.pk];if(po.f+po.b<1||po.w)continue;
  for(const ei of [0,1]){if((r.ramp==='exit'&&ei===0)||(r.ramp==='entry'&&ei===1))continue;const{q,h}=endInfo(r,ei),rn=rightN(h),out=ei?h:h+Math.PI,dx=e.x-q.x,dy=e.y-q.y;
   const lon=dx*Math.cos(out)+dy*Math.sin(out),lat=dx*rn.x+dy*rn.y-(r.sh||0);
   if(Math.abs(lon)<30&&Math.abs(lat)<=roadW(po)/2+10){const sc=Math.abs(lon)+Math.abs(lat)*.2;if(!best||sc<best.sc)best={r,ei,q,rn,po,lat,sc}}}}
 if(!best)return null;const o=(best.r.sh||0)+laneSnap(best.po,pn,best.lat);
 return{pt:{x:best.q.x+best.rn.x*o,y:best.q.y+best.rn.y*o},link:{x:best.q.x,y:best.q.y}}}
// Додавання дороги з АВТО-перехрестями: прилипання кінців, Т‑розгалуження, перетини X
// Авто-об'єднання: нова односторонка поруч з дорогою стає її додатковою смугою
function derive(pk,df,db){const key=pk+'|'+df+'|'+db;if(!PRESETS[key])PRESETS[key]={...PRESETS[pk],f:PRESETS[pk].f+df,b:PRESETS[pk].b+db,n:PRESETS[pk].n+' +',cat:undefined};return key}
function tryMerge(c,pk,lv){const pn=PRESETS[pk];if(pn.f<1||pn.b||pn.w||pn.med||S.opt.mrg===false)return false;
 const L=mkLane(c);if(L.len<40)return false;const smp=[];for(let t=0;t<L.len;t+=20)smp.push(at(L,t));smp.push(at(L,L.len));
 const hn=pn.f*pn.lw/2;let best=null;
 for(const r of S.roads){if(r.level!==lv||r.ramp)continue;const po=PRESETS[r.pk];if(po.f+po.b<1||po.w||po.f+po.b+pn.f>10)continue;
  const Hw=laneW(po)/2,ok=[],lats=[];
  for(const q of smp){const nn=nearestOn(r.pts,q),a=r.pts[nn.i],b=r.pts[nn.i+1],h0=Math.atan2(b.y-a.y,b.x-a.x);
   const lat=(q.x-nn.x)*-Math.sin(h0)+(q.y-nn.y)*Math.cos(h0)-(r.sh||0),df=Math.abs(Math.atan2(Math.sin(q.a-h0),Math.cos(q.a-h0)));
   ok.push((df<.6||df>Math.PI-.6)&&Math.abs(lat)>=Hw+hn*.3&&Math.abs(lat)<=Hw+hn+45&&Math.hypot(q.x-nn.x,q.y-nn.y)<Math.abs(lat)+8);lats.push(lat)} // остання умова: точка не «за кінцем» дороги // біля КРАЮ смуг, а не осі дороги
  let bi=-1,bj=-1,i=0;while(i<ok.length){if(!ok[i]){i++;continue}let j=i;while(j+1<ok.length&&ok[j+1]&&Math.sign(lats[j+1])===Math.sign(lats[i]))j++;if(j-i>bj-bi){bi=i;bj=j}i=j+1}
  if(bi<0||(bj-bi)*20<40||bi*20>80||(ok.length-1-bj)*20>80)continue; // надлишок малювання за межами дороги ≤80 ігноруємо
  const side=Math.sign(lats[bi]),sc=lats.slice(bi,bj+1).reduce((s,x)=>s+Math.abs(Math.abs(x)-Hw-hn),0)/(bj-bi+1);
  if(!best||sc<best.sc)best={r,sc,bi,bj,df:side>0||po.b===0?pn.f:0,db:side<0&&po.b>0?pn.f:0,sh:side*pn.f*po.lw/2}}
 if(!best)return false;
 const r=best.r,cuts=[];for(const q of [smp[best.bi],smp[best.bj]]){const nn=nearestOn(r.pts,q);if(dist(nn,r.pts[0])>15&&dist(nn,r.pts[r.pts.length-1])>15)cuts.push(nn)}
 let target=r;if(cuts.length){const pcs=splitRoad(r,cuts),mid=smp[(best.bi+best.bj)>>1];target=pcs.reduce((a,b)=>{const mm=p=>{const l=mkLane(p.pts);return dist(at(l,l.len/2),mid)};return mm(b)<mm(a)?b:a})}
 target.pk=derive(target.pk,best.df,best.db);target.sh=(target.sh||0)+best.sh;buildGraph();toast('Додано смугу до існуючої дороги');return true}
/** Дорога, що вже існує в цьому місці (≤8 од. від осі й паралельна). */
function coverOf(q,lv){let best=null,bd=8;for(const r of S.roads){if(r.level!==lv||r.ramp==='level')continue;const b=r.bb||(r.bb=bboxOf(r.pts));if(q.x<b.x0-8||q.x>b.x1+8||q.y<b.y0-8||q.y>b.y1+8)continue;
  const nn=nearestOn(r.pts,q);if(nn.d>=bd)continue;const h=Math.atan2(r.pts[nn.i+1].y-r.pts[nn.i].y,r.pts[nn.i+1].x-r.pts[nn.i].x),d=Math.abs(Math.atan2(Math.sin(q.a-h),Math.cos(q.a-h)));if(d<.5||d>Math.PI-.5){bd=nn.d;best=r}}return best}
/** Повторне малювання «на тому самому місці» НІКОЛИ не дублює дорогу: збіг з існуючою дорогою пропускається (той самий тип)
    або оновлює її тип; непокриті ділянки будуються як завжди. Короткий збіг на початку/кінці (з'їзд від осі) не рахується. */
function coverReduce(c,pk,lv){const L=mkLane(c);if(L.len<24)return false;const n=Math.max(3,Math.ceil(L.len/10)),cov=[];
 for(let k=0;k<=n;k++)cov.push(coverOf(at(L,L.len*k/n),lv));if(!cov.some(x=>x))return false;
 const runs=[];for(let k=0;k<=n;k++){const r=cov[k],l=runs[runs.length-1];if(l&&l.r===r)l.e=k;else runs.push({r,s:k,e:k})}
 const len=u=>(u.e-u.s)*L.len/n,big=u=>u.r&&len(u)>=20&&(len(u)>=60||len(u)>=.6*L.len||(u.s>0&&u.e<n));
 if(!runs.some(big))return false;
 const sub=(s0,s1)=>{const o=[at(L,s0)];for(let i=1;i<L.cum.length-1;i++)if(L.cum[i]>s0+.5&&L.cum[i]<s1-.5)o.push(L.pts[i]);o.push(at(L,s1));return cleanPath(o.map(p=>({x:p.x,y:p.y})))};
 const todo=[],upg=[];for(const u of runs){const s0=L.len*u.s/n,s1=L.len*u.e/n;if(big(u)){if(u.r.pk!==pk&&!u.r.ramp&&!u.r.sh)upg.push(sub(s0,s1))}else if(len(u)>=20)todo.push(sub(s0,s1))}
 for(const seg of upg){const mid=seg[seg.length>>1],r=coverOf({...mid,a:at(L,0).a},lv);if(!r||r.pk===pk)continue;const cuts=[];
  for(const q of[seg[0],seg[seg.length-1]]){const nn=nearestOn(r.pts,q);if(dist(nn,r.pts[0])>15&&dist(nn,r.pts[r.pts.length-1])>15)cuts.push(nn)}
  let t=r;if(cuts.length){const pcs=splitRoad(r,cuts);t=pcs.reduce((a,b)=>{const m=p=>{const l=mkLane(p.pts);return dist(at(l,l.len/2),mid)};return m(b)<m(a)?b:a})}t.pk=pk}
 if(upg.length)buildGraph();
 for(const p of todo)addRoad(p,pk,lv,false,true,true);return true}
function addRoad(pts,pk,lv,sp,nm,ov){let c=cleanPath(sp?smoothPath(cleanPath(pts)):pts.map(p=>({...p})));if(c.length<2||mkLane(c).len<8)return; // ігноруємо вироджені/надто короткі накреслення
 if(!ov&&coverReduce(c,pk,lv))return;
 if(!nm&&(autoRamp(c,pk,lv,sp)||tryMerge(c,pk,lv)||autoLevelRamp(c,pk,lv)))return; // пріоритет: з'їзд/заїзд (кінець на тілі дороги) → смуга поруч → рампа між рівнями
 let lk0=null,lk1=null;
 for(const k of [0,c.length-1]){const e=c[k],sn=endSnap(e,pk,lv);
  if(sn){c[k]=sn.pt;if(k===0)lk0=sn.link;else lk1=sn.link;continue} // торець → прикріплення до смуг (вузол лишається в центрі торця)
  for(const r of S.roads.filter(x=>x.level===lv)){const nn=nearestOn(r.pts,e);if(nn.d<roadW(PRESETS[r.pk])/2+14){c[k]={x:nn.x,y:nn.y};splitRoad(r,[nn]);break}}} // Т: кінець на тілі дороги → розрізаємо
 c=cleanPath(c);
 const cuts=[];
 const cb=bboxOf(c);for(const r of S.roads.filter(x=>x.level===lv)){const rc=[];if(!bbHit(cb,r.bb||(r.bb=bboxOf(r.pts))))continue; // відсікання за bbox
  for(let i=0;i<c.length-1;i++)for(let j=0;j<r.pts.length-1;j++){const h=segInt(c[i],c[i+1],r.pts[j],r.pts[j+1]);if(h){cuts.push({i,t:h.t,x:h.x,y:h.y});rc.push({i:j,t:h.u,x:h.x,y:h.y})}}
  if(rc.length)splitRoad(r,rc)}
 const pcs=cutPoly(c,cuts);pcs.forEach((p,i)=>{const o={pts:p,pk,level:lv};if(i===0&&lk0)o.l0=lk0;if(i===pcs.length-1&&lk1)o.l1=lk1;S.roads.push(o)});buildGraph()}
/** Рукави вузла: кінцева точка (після обрізання), напрям від центру, півширина; відсортовані за кутом (за годинниковою стрілкою). */
function makeArms(n){const A=[];for(const q of n.m){const r=S.roads[q.r],tp=r.tp,pr=PRESETS[r.pk],p=q.e?tp[tp.length-1]:tp[0];
  let o=null;for(let k=1;k<tp.length&&!o;k++){const t=q.e?tp[tp.length-1-k]:tp[k];if(Math.hypot(t.x-p.x,t.y-p.y)>=10||k===tp.length-1)o=t} // точка ≥10 од. углиб дороги
  const dx=o.x-p.x,dy=o.y-p.y,l=Math.hypot(dx,dy)||1,d={x:dx/l,y:dy/l};
  A.push({r:q.r,e:q.e,p,d,w:carW(pr)/2,col:pr.col,a:Math.atan2(d.y,d.x)})}
 return A.sort((x,y)=>x.a-y.a)}
/** Фази світлофора: протилежні рукави їдуть разом, інші — окремо. */
function makeSignal(A){const ph=[],used=new Set();A.forEach((a,i)=>{if(used.has(i))return;used.add(i);let j=-1,bd=-.7;
  A.forEach((b,k)=>{if(!used.has(k)){const dot=a.d.x*b.d.x+a.d.y*b.d.y;if(dot<bd){bd=dot;j=k}}});if(j>=0)used.add(j);ph.push(j>=0?[i,j]:[i])});
 return{ph,cur:0,t:Math.random()*5}}
/** Чи потрібен світлофор: ≥3 «значущі» рукави (≥2 смуги), без шосе/ґрунтовок/рамп, кути між рукавами ≥ ~54° (не злиття Y), є ≥3 напрямки заїзду. */
function shouldSignal(nd){const A=nd.arms;if(A.length<3)return false;let appr=0,big=0,minGap=9;
 for(const a of A){const r=S.roads[a.r],pr=PRESETS[r.pk];if(r.ramp||pr.barrier||pr.v>=3||pr.w||!pr.paved)return false;
  if(pr.f+pr.b>=2)big++;if(a.e?pr.f>0:pr.b>0)appr++}
 A.forEach((a,i)=>{const b=A[(i+1)%A.length],g=((b.a-a.a)+2*Math.PI)%(2*Math.PI)||2*Math.PI;if(g<minGap)minGap=g});
 return big>=3&&appr>=3&&minGap>.95}
/** Чи перетинаються (або майже зливаються) траєкторії двох з'єднань у вузлі. */
function pathsCross(a,b){for(let i=0;i<a.pts.length-1;i++)for(let j=0;j<b.pts.length-1;j++)if(segInt(a.pts[i],a.pts[i+1],b.pts[j],b.pts[j+1]))return true;
 for(const p of a.pts)for(const q of b.pts)if(Math.hypot(p.x-q.x,p.y-q.y)<14)return true;return false}
function buildGraph(){const oldCars=S.cars,oldObst=S.obst;S.roads=S.roads.filter(r=>r.pts&&r.pts.length>1&&r.pts.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y))); // відкидаємо биті дороги замість краху
 const eLv=(ri,e)=>{const r=S.roads[ri];return r.from!==undefined&&e===r.attEnd?r.from:r.level};S.lanes=[];S.cars=[];S.obst=[];S.roads.forEach(r=>r.t0=r.t1=0);
 const eps=[];S.roads.forEach((r,i)=>[0,1].forEach(e=>{if((r.ramp==='exit'||r.ramp==='entry')&&e===(r.ramp==='exit'?0:1))return;{const p=e?r.pts[r.pts.length-1]:r.pts[0];eps.push({r:i,e,p,cp:(e?r.l1:r.l0)||p})}}));
 // Вузли: кластеризація кінців доріг одного рівня через сітку (замість O(n²))
 const nodes=[],grid=new Map(),CELL=28;
 for(const q of eps){const rq=S.roads[q.r],lvq=rq.from!==undefined&&q.e===rq.attEnd?rq.from:rq.level,gx=Math.floor(q.cp.x/CELL),gy=Math.floor(q.cp.y/CELL);let n=null;
  for(let dx=-1;dx<=1&&!n;dx++)for(let dy=-1;dy<=1&&!n;dy++){const b=grid.get(lvq+':'+(gx+dx)+':'+(gy+dy));if(b)n=b.find(m=>dist(m.c,q.cp)<14)||null}
  if(!n){n={lv:lvq,c:{x:q.cp.x,y:q.cp.y},m:[]};nodes.push(n);const k=lvq+':'+gx+':'+gy;(grid.get(k)||grid.set(k,[]).get(k)).push(n)}n.m.push(q)}
 S.nodes=nodes.filter(n=>n.m.length>1);
 for(const n of S.nodes){const ws=n.m.map(q=>roadW(PRESETS[S.roads[q.r].pk])/2),dirs=n.m.map(q=>{const{h}=endInfo(S.roads[q.r],q.e);return q.e?h+Math.PI:h});n.mw=Math.max(...ws)*2;n.T=4;
  // відступ рукава = скільки потрібно, щоб звільнити гирло сусідніх доріг: півширина/sin(кута) + запас на заокруглення; протилежне плече тієї ж лінії не враховується
  n.m.forEach((q,i)=>{let T=4;n.m.forEach((_,j)=>{if(j===i)return;const g=Math.abs(Math.atan2(Math.sin(dirs[i]-dirs[j]),Math.cos(dirs[i]-dirs[j])));if(g>Math.PI-.35)return;T=Math.max(T,Math.min(240,ws[j]/Math.max(Math.sin(g),.3)+22))});
   S.roads[q.r]['t'+q.e]=T;if(T>n.T)n.T=T})}
 S.roads.forEach((r,ri)=>{const pr=PRESETS[r.pk],m=pr.med/2;r.dp=r.sh?offsetLine(r.pts,r.sh):r.pts;r.tp=trimPoly(r.dp,r.t0,r.t1);
  const mk=(d,rev,idx)=>{const Q=offsetLine(r.tp,d);if(rev)Q.reverse();const l=mkLane(Q);Object.assign(l,{road:ri,dir:rev?-1:1,idx,nl:rev?pr.b:pr.f,next:[],nb:[]});S.lanes.push(l)};
  for(let i=0;i<pr.f;i++)mk(laneOff(pr,0,i),0,i);for(let i=0;i<pr.b;i++)mk(laneOff(pr,1,i),1,i)});
 for(const nd of S.nodes){nd.arms=makeArms(nd);nd.sig=shouldSignal(nd)?makeSignal(nd.arms):null;nd.sigLanes=[];nd.conns=[]}
 for(const a of S.nodes)if(a.sig)for(const b of S.nodes)if(b!==a&&b.sig&&b.lv===a.lv&&dist(a.c,b.c)<150&&(b.arms.length>a.arms.length||(b.arms.length===a.arms.length&&S.nodes.indexOf(b)<S.nodes.indexOf(a)))){a.sig=null;break} // два світлофори впритул — лишаємо один
 S.lanes=S.lanes.filter(l=>l.len>=1&&l.pts.length>1); // відкидаємо виродженi смуги (краш at())
 const conns=[],wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
 // З'єднання смуг на вузлах: беремо кандидатів із хешу кінців/початків, а не всі пари смуг
 const endH=new SpatialHash(128),startH=new SpatialHash(128);for(const l of S.lanes){endH.add(l.pts[l.pts.length-1],l);startH.add(l.pts[0],l)}
 for(const n of S.nodes){const R=n.mw/2+40,As=endH.query(n.c,R),Bs=startH.query(n.c,R);
  // Прямі з'єднання «смуга в смугу»: кожна смуга з'єднується з найближчою за бічним зсувом (і навпаки), а не за номером смуги
  const mnA=new Map(),mnB=new Map(),spr=[],str=new Map();
  for(const a of As){if(eLv(a.road,a.dir>0?1:0)!==n.lv||dist(a.pts[a.pts.length-1],n.c)>R)continue;const ea=a.pts[a.pts.length-1],ha=at(a,a.len).a;
   for(const b of Bs){if(b.road===a.road||eLv(b.road,b.dir>0?0:1)!==n.lv||dist(b.pts[0],n.c)>R||Math.abs(wrap(at(b,0).a-ha))>=.5)continue;
    const lat=Math.abs((b.pts[0].x-ea.x)*-Math.sin(ha)+(b.pts[0].y-ea.y)*Math.cos(ha));spr.push([a,b,lat]);if(!(mnA.get(a)<=lat))mnA.set(a,lat);if(!(mnB.get(b)<=lat))mnB.set(b,lat)}}
  for(const[a,b,lat]of spr){const lw=Math.max(PRESETS[roadOf(a).pk].lw,PRESETS[roadOf(b).pk].lw);if(lat<=lw*1.6&&(lat<=mnA.get(a)+.5||lat<=mnB.get(b)+.5))(str.get(a)||str.set(a,new Set()).get(a)).add(b)}
  for(const a of As){if(eLv(a.road,a.dir>0?1:0)!==n.lv||dist(a.pts[a.pts.length-1],n.c)>R)continue;
   const ai=n.arms.findIndex(m=>m.r===a.road&&(a.dir>0?m.e===1:m.e===0));if(n.sig&&ai>=0&&!a.sig){a.sig={n,arm:ai};n.sigLanes.push(a)} // стоп-лінія світлофора
   for(const b of Bs){if(b.road===a.road||eLv(b.road,b.dir>0?0:1)!==n.lv||dist(b.pts[0],n.c)>R)continue;
    const turn=wrap(at(b,0).a-at(a,a.len).a),ab=Math.abs(turn);if(ab>2.1)continue;
    const ok=ab<.5?!!(str.get(a)&&str.get(a).has(b)):turn>0?(a.idx===a.nl-1&&b.idx===b.nl-1):(a.idx===0&&b.idx===0);if(!ok)continue;
    const p0=a.pts[a.pts.length-1],p1=b.pts[0],ct=ab<.5?{x:(p0.x+p1.x)/2,y:(p0.y+p1.y)/2}:n.c,Q=[];
    for(let k=0;k<=10;k++){const t=k/10,u=1-t;Q.push({x:u*u*p0.x+2*u*t*ct.x+t*t*p1.x,y:u*u*p0.y+2*u*t*ct.y+t*t*p1.y})}
    const l=mkLane(Q);Object.assign(l,{road:a.road,dir:0,idx:0,conn:true,turn,src:a,dst:b,occ:0,next:[b],nb:[]});conns.push(l);n.conns.push(l);a.next.push(l);b.hasIn=true}}}
 const link=(a,b)=>{const p0=a.pts[a.pts.length-1],p1=b.pts[0],Q=[];for(let k=0;k<=6;k++){const t=k/6;Q.push({x:p0.x+(p1.x-p0.x)*t,y:p0.y+(p1.y-p0.y)*t})}
  const l=mkLane(Q);Object.assign(l,{road:a.road,dir:0,idx:0,conn:true,src:a,dst:b,occ:0,next:[b],nb:[]});conns.push(l);a.next.push(l);b.hasIn=true};
 S.roads.forEach((r,ri)=>{if(r.ramp!=='exit'&&r.ramp!=='entry')return;const rl=S.lanes.find(l=>l.road===ri&&!l.conn);if(!rl)return;const ex=r.ramp==='exit',q=ex?rl.pts[0]:rl.pts[rl.pts.length-1];let best=null,bd=220;
  for(const o of S.lanes){if(o.conn||o.road===ri||S.roads[o.road].level!==r.level)continue;const e=ex?o.pts[o.pts.length-1]:o.pts[0],d=dist(e,q);
   const dh=Math.abs(wrap((ex?at(o,o.len).a:at(o,0).a)-(ex?at(rl,0).a:at(rl,rl.len).a)));if(d<bd&&dh<1.6){bd=d;best=o}}
  r.linked=!!best;if(best)ex?link(best,rl):link(rl,best)});
 // Конфлікти між з'єднаннями: злиття в одну смугу або перетин траєкторій у вузлі (з однієї смуги-джерела — не конфлікт)
 const byDst=new Map(),addConf=(x,y)=>{if(x.src!==y.src&&!x.conf.includes(y)){x.conf.push(y);y.conf.push(x)}};
 for(const l of conns){l.conf=[];(byDst.get(l.dst)||byDst.set(l.dst,[]).get(l.dst)).push(l)}
 for(const g of byDst.values())for(let i=0;i<g.length;i++)for(let j=i+1;j<g.length;j++)addConf(g[i],g[j]);
 for(const nd of S.nodes)for(let i=0;i<nd.conns.length;i++)for(let j=i+1;j<nd.conns.length;j++)if(pathsCross(nd.conns[i],nd.conns[j]))addConf(nd.conns[i],nd.conns[j]);
 S.lanes.push(...conns);
 // Сусідні смуги одного напрямку (для перестроювання): групуємо за дорогою+напрямком
 const grp=new Map();for(const l of S.lanes){if(l.conn)continue;const k=l.road*3+l.dir+1;(grp.get(k)||grp.set(k,[]).get(k)).push(l)}
 for(const g of grp.values())for(const a of g){a.grp=g;for(const b of g)if(Math.abs(a.idx-b.idx)===1)a.nb.push(b)}
 S.rev++;S.dirty=1;restoreTraffic(oldCars,oldObst)}
/* ===== js/sim.js ===== */
'use strict';
/* СИМУЛЯЦІЯ ТРАФІКУ: IDM (слідування за лідером) + перестроювання.
   Оптимізація: авто індексуються по смугах (відсортовані за s) → пошук лідера O(log n), загалом O(n log n) замість O(n²). */
const SIM={nid:0,dt:1/60,spawnP:.04,perLane:6,maxCars:900,rev:-1,arev:-1,active:[],spawnLanes:[]};
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
/** Чи вже хтось із сусідніх смуг перестроюється в цю смугу поруч із нами (резерв). */
function laneTaken(nb,c){for(const m of nb.nb)for(const o of m.cars)if(o!==c&&o.want===nb&&Math.abs(o.s-c.s)<50)return true;return false}
/** Планування: заздалегідь обираємо напрямок на найближчому перехресті (прямо ×3, поворот ×1) і смугу, з якої він доступний. */
function planGoal(c){const l=c.lane;c.route=c.goal=c.alt=null;if(l.conn||!l.grp)return;let tot=0;const o=[];
 for(const g of l.grp)for(const nx of g.next){const w=Math.abs(nx.turn||0)<.5?3:1;o.push({g,nx,w});tot+=w}
 if(!o.length)return;let r=Math.random()*tot;for(const x of o){r-=x.w;if(r<=0){c.goal=x.g;c.route=x.nx;return}}}
/** Обов'язкове перестроювання до смуги-цілі (перед поворотом), якщо в сусідній смузі безпечний проміжок. */
function tryGoalChange(c){const g=c.goal,d0=Math.abs(c.lane.idx-g.idx);
 for(const nb of c.lane.nb){if(Math.abs(nb.idx-g.idx)>=d0||laneTaken(nb,c))continue;const s2=c.s*nb.len/c.lane.len,f=gapAhead(nb,s2,null),bk=lastBehind(nb,s2);
  if(f.gap>32&&!(bk&&(s2-bk.s<36||(s2-bk.s<55&&bk.v>c.v*1.05)))){c.want=nb;return}}}
/** Світлофори: цикл фаз (зелений/жовтий/червоний); стан смуги залежить від рукава вузла. */
const SIG={G:9,Y:1.5,R:1.2};
function sigState(s){const p=s.n.sig;if(!p.ph[p.cur].includes(s.arm))return'r';return p.t<SIG.G?'g':p.t<SIG.G+SIG.Y?'y':'r'}
function updateSignals(dt){for(const n of S.nodes){const p=n.sig;if(!p)continue;p.t+=dt;if(p.t>=SIG.G+SIG.Y+SIG.R){p.t=0;p.cur=(p.cur+1)%p.ph.length}}}
/** Червоний/жовтий = віртуальна нерухома перешкода на стоп-лінії (на жовтий їдемо далі, якщо вже не встигнемо загальмувати). */
const STOP=14; // центр авто зупиняється за 14 од. до кінця смуги (ніс — біля стоп-лінії)
/** Відстань до стоп-лінії, якщо треба зупинитись (червоний; жовтий — якщо ще можна загальмувати), інакше null. */
function signalHold(c){const s=c.lane.sig;if(!s)return null;const st=sigState(s);if(st==='g')return null;const d=c.lane.len-STOP-c.s;if(d<-1)return null;if(st==='y'&&d<c.v*12)return null;return Math.max(d,0)}
/** Правило проїзду вузла: стоп-лінія «закрита», якщо наступне з'єднання конфліктує із зайнятим (перетин/злиття) або за вузлом немає місця
    (не блокуємо перехрестя). Аварійне розблокування — якщо авто чекає >15 с. */
function junctionHold(c){const l=c.lane;if(l.conn||!l.next.length||c.jw>900)return null;const d=l.len-STOP-c.s;if(d<-1||d>40)return null;
 const nx=routeFor(c);if(!nx||!nx.conf)return null;for(const k of nx.conf)if(k.occ>0)return Math.max(d,0);
 const b=nx.next[0];if(b&&b.cars.length&&b.cars[0].s<28)return Math.max(d,0);return null}
const holdLine=c=>{const a=signalHold(c),b=junctionHold(c);return a===null?b:b===null?a:Math.min(a,b)};
function signalStop(c){const d=holdLine(c);return d===null?null:{o:{v:0,s:c.lane.len,obst:true},gap:Math.max(d,.5)}}
/** Просторовий хеш авто (оновлюється раз на крок) — для перевірки зіткнень на перехрестях і при перестроюванні. */
const CH={m:new Map(),used:[]},CELL=64;
function hashCars(){for(const k of CH.used)CH.m.get(k).length=0;CH.used.length=0;
 for(const c of S.cars){const k=Math.floor(c.x/CELL)*65537+Math.floor(c.y/CELL);let a=CH.m.get(k);if(!a)CH.m.set(k,a=[]);if(!a.length)CH.used.push(k);a.push(c)}}
/** Перешкода-авто попереду по ходу (вузький конус): авто з іншої смуги, чия траєкторія перетинається. Гальмуємо за ним, як за лідером.
    Якщо стоїмо через це >3 с (взаємне блокування) — конус тимчасово ігноруємо. */
function coneStop(c){if(c.cw>180||c.lane.conn)return null;const D=16+Math.min(c.v*30,80),ca=Math.cos(c.a),sa=Math.sin(c.a),gx=Math.floor(c.x/CELL),gy=Math.floor(c.y/CELL);let best=null,bg=1e9;
 for(let ix=gx-2;ix<=gx+2;ix++)for(let iy=gy-2;iy<=gy+2;iy++){const a=CH.m.get(ix*65537+iy);if(!a)continue;
  for(const o of a){if(o===c||o.lane===c.lane)continue;const dx=o.x-c.x,dy=o.y-c.y,f=dx*ca+dy*sa;if(f<=0||f>D+13)continue;if(Math.abs(-dx*sa+dy*ca)>14)continue;
   const g=f-13;if(g<bg){bg=g;best=o}}}
 return best?{o:best,gap:Math.max(bg,.5)}:null}
/** Лідер = найближча з перешкод: авто в смузі / світлофор / авто на перетині траєкторій. */
function leader(c){let r=leaderCars(c);if(c.want){const g=gapAhead(c.want,c.s*c.want.len/c.lane.len,null);if(g.gap<r.gap)r=g} // під час перестроювання рахуємо й лідера цільової смуги
 const g=signalStop(c);if(g&&g.gap<r.gap)r=g;const k=coneStop(c);if(k&&k.gap<r.gap)r={o:k.o,gap:k.gap,cone:true};return r}


function spawnCars(){
 if(SIM.rev!==S.rev){SIM.spawnLanes=S.lanes.filter(l=>!l.conn&&!l.hasIn);SIM.rev=S.rev}
 const sp=SIM.spawnLanes;if(!sp.length||Math.random()>=SIM.spawnP||S.cars.length>=Math.min(SIM.maxCars,S.lanes.length*SIM.perLane))return;
 const l=sp[(Math.random()*sp.length)|0];if(l.cars[0]&&l.cars[0].s<40)return;
 const p=at(l,5);S.cars.push({lane:l,s:5,v:0,lat:0,col:`hsl(${Math.random()*360|0},60%,55%)`,vm:.8+Math.random()*.3,want:null,route:null,x:p.x,y:p.y,a:p.a,id:++SIM.nid,cw:0,lvl:roadOf(l).level});planGoal(S.cars[S.cars.length-1])}

/** Перестроювання: обганяємо повільного лідера, якщо в сусідній смузі є вільне місце попереду й позаду. */
function tryLaneChange(c,L){
 for(const nb of c.lane.nb){if(laneTaken(nb,c))continue;
  if(c.goal&&c.lane.len-c.s<350&&Math.abs(nb.idx-c.goal.idx)>Math.abs(c.lane.idx-c.goal.idx))continue; // не відходимо від смуги-цілі біля перехрестя
  const s2=c.s*nb.len/c.lane.len,f=gapAhead(nb,s2,null),bk=lastBehind(nb,s2);
  if(f.gap>L.gap+20&&f.gap>35&&!(bk&&(s2-bk.s<36||(s2-bk.s<55&&bk.v>c.v*1.05)))){c.want=nb;return}}}
function advanceLaneChange(c,dt){const nb=c.want,lw=PRESETS[roadOf(c.lane).pk].lw,tgt=-(nb.idx-c.lane.idx)*lw,s2=c.s*nb.len/c.lane.len; // lat>0 — ліворуч
 // скасовуємо маневр (поки ще <70% шляху), якщо поруч з'явилось авто або ми зупинились — тоді повертаємось у свою смугу
 if(Math.abs(c.lat)<.7*Math.abs(tgt)&&(c.v<.05||nb.cars.some(o=>o!==c&&Math.abs(o.s-s2)<30))){c.want=null;return}
 c.lat+=Math.sign(tgt)*dt*40*(c.v>.1?1:0);
 if(Math.abs(c.lat)>=Math.abs(tgt)-.5){c.s=c.s*nb.len/c.lane.len;c.lane=nb;c.lat=0;c.want=null;c.alt=null}}
/** Перехід на наступну смугу (до 4 коротких з'єднань за крок); немає продовження → авто зникає. */
function advanceLane(c){let g=0;while(c.s>=c.lane.len&&g++<4){const n=routeFor(c);
 if(!n){c.dead=true;return}c.s-=c.lane.len;if(c.lane.conn)c.lane.occ--;if(c.res&&c.res!==n)c.res.occ--;if(n.conn&&c.res!==n)n.occ=(n.occ||0)+1;c.res=null;c.lane=n;c.lvl=roadOf(n).level;c.lat=0;c.want=null;planGoal(c)}}

function updateCar(c,dt){
 c.stall=c.v<.01?(c.stall||0)+1:0;if(c.stall>1800&&signalHold(c)===null){if(c.lane.conn)c.lane.occ--;if(c.res)c.res.occ--;c.dead=true;return} // анти-затор (взаємне блокування коротких ділянок)
 const pr=PRESETS[roadOf(c.lane).pk],vmax=pr.v*c.vm,L=leader(c),dv=L.o?c.v-L.o.v:0;
 const sStar=12+Math.max(0,c.v*8+c.v*dv*8/(2*Math.sqrt(.06*.12)));
 const acc=.06*(1-Math.pow(c.v/vmax,4)-(L.o?Math.pow(sStar/Math.max(L.gap,1),2):0));
 c.v=Math.max(0,c.v+acc*dt*30);
 if(!c.want&&c.v>.2&&c.goal&&c.goal!==c.lane&&c.s>8)tryGoalChange(c);
 if(!c.want&&c.v>.2&&c.lane.nb.length&&L.o&&L.gap<60&&L.o.v<vmax*.7)tryLaneChange(c,L);
 if(c.want)advanceLaneChange(c,dt);else if(c.lat)c.lat-=Math.sign(c.lat)*Math.min(Math.abs(c.lat),dt*40); // повернення в центр смуги після скасованого маневру
 const sh=signalHold(c),jh=junctionHold(c),hd=sh===null?jh:jh===null?sh:Math.min(sh,jh);c.jw=jh!==null&&c.v<.05?(c.jw||0)+1:0;
 if(!c.lane.conn&&!c.res&&jh===null&&c.lane.len-STOP-c.s<=6){const nx=routeFor(c);if(nx&&nx.conf){nx.occ++;c.res=nx}} // резерв: з цього моменту конфліктні напрямки чекають
 let ds=c.v*dt*60;if(hd!==null&&ds>hd){ds=hd;c.v=0} // жорстка зупинка на стоп-лінії: червоний не проїхати за жодних умов
 c.cw=L.cone&&c.v<.05?(c.cw||0)+1:0;
 c.s+=ds;if(c.s>=c.lane.len)advanceLane(c);if(c.dead)return;
 const p=at(c.lane,c.s);c.x=p.x+Math.sin(p.a)*c.lat;c.y=p.y-Math.cos(p.a)*c.lat;
 c.a+=(((p.a-c.a+Math.PI*3)%(Math.PI*2))-Math.PI)*.25}

/** Найближча звичайна смуга до точки (x,y) того ж рівня, з урахуванням напрямку a (якщо задано). */
function matchLane(lanes,x,y,a,lvl,maxD=18){let best=null,bd=maxD;
 for(const l of lanes){const b=l.bb;if(x<b.x0-bd||x>b.x1+bd||y<b.y0-bd||y>b.y1+bd||roadOf(l).level!==lvl)continue;const nn=nearestOn(l.pts,{x,y});if(nn.d>=bd)continue;
  if(a!=null){const h=Math.atan2(l.pts[nn.i+1].y-l.pts[nn.i].y,l.pts[nn.i+1].x-l.pts[nn.i].x);if(Math.abs(Math.atan2(Math.sin(h-a),Math.cos(h-a)))>1.3)continue}
  bd=nn.d;best={l,s:l.cum[nn.i]+nn.t*(l.cum[nn.i+1]-l.cum[nn.i])}}
 return best}
/** Після перебудови мережі повертаємо авто й аварії на найближчі нові смуги — будівництво не «обнуляє» трафік. */
function restoreTraffic(cars,obst){if(!(cars&&cars.length)&&!(obst&&obst.length))return;const lanes=S.lanes.filter(l=>!l.conn);for(const l of lanes)l.bb=bboxOf(l.pts);
 for(const c of cars||[]){const m=matchLane(lanes,c.x,c.y,c.a,c.lvl||0);if(!m)continue;c.lane=m.l;c.s=m.s;c.lat=0;c.want=null;c.res=null;c.cw=0;c.jw=0;c.stall=0;planGoal(c);S.cars.push(c)}
 for(const o of obst||[]){if(o.x==null)continue;const m=matchLane(lanes,o.x,o.y,null,o.lvl||0);if(m)S.obst.push({lane:m.l,s:m.s,x:o.x,y:o.y,lvl:o.lvl})}}
/** Один фіксований крок симуляції. Мертві авто видаляються на місці (без нових масивів → менше GC). */
function step(dt){indexCars();hashCars();updateSignals(dt);spawnCars();const cs=S.cars;let w=0;for(let i=0;i<cs.length;i++){const c=cs[i];updateCar(c,dt);if(!c.dead)cs[w++]=c}cs.length=w}

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
  const P=(a,sg)=>w2s({x:a.p.x-a.d.y*a.w*sg,y:a.p.y+a.d.x*a.w*sg});ctx.beginPath();
 A.forEach((a,i)=>{const b=A[(i+1)%A.length],pa=P(a,1),pb=P(b,-1);if(!i){const p0=P(a,-1);ctx.moveTo(p0.x,p0.y)}ctx.lineTo(pa.x,pa.y);
  const gap=((b.a-a.a)+2*Math.PI)%(2*Math.PI)||2*Math.PI;let k=null;
  if(gap<2.6){const ax=a.p.x-a.d.y*a.w,ay=a.p.y+a.d.x*a.w,bx=b.p.x+b.d.y*b.w,by=b.p.y-b.d.x*b.w,den=a.d.x*b.d.y-a.d.y*b.d.x;
   if(Math.abs(den)>1e-3){const t=((bx-ax)*b.d.y-(by-ay)*b.d.x)/den;if(Math.abs(t)<n.T*1.5+40)k=w2s({x:ax+a.d.x*t,y:ay+a.d.y*t})}}
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
 for(const r of R){try{deco(r,PRESETS[r.pk])}catch(e){console.error('deco',e)}} // одна «погана» дорога не блокує малювання решти
 ctx.fillStyle='rgba(255,255,255,.85)';
 for(const l of S.lanes)if(!l.conn&&lvOf(l)===lv)for(let s=Math.max(40,l.len*.5);s<l.len-40;s+=90){const p=at(l,s),q=w2s(p);ctx.save();ctx.translate(q.x,q.y);ctx.rotate(p.a);ctx.scale(S.cam.z,S.cam.z);
  ctx.beginPath();ctx.moveTo(7,0);ctx.lineTo(-5,-5);ctx.lineTo(-5,5);ctx.fill();ctx.restore()}
 drawMarks(lv)}
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
/** Попередній перегляд: перший/останній вузол прив'язується до смуг на торцях доріг (як при побудові). */
function previewPath(){const P=[...S.pts,S.mouse].map(p=>({x:p.x,y:p.y})),pk=S.preset,lv=S.opt.level;
 for(const i of [0,P.length-1]){const sn=endSnap(P[i],pk,lv);if(sn)P[i]=sn.pt}return P}
/** Привид розмітки під курсором і розмітка, що малюється. */
function drawMarkOverlay(){if(S.tool==='mark'){const t=MK[S.mk.key];
  if(t.kind==='stamp'){if(S.mouseRaw)drawMark(markAt(S.mouseRaw),.65)}
  else if(S.mkpts.length){const m=markAt(S.mkpts[0]);m.pts=[...S.mkpts,S.mkMouse||S.mkpts[S.mkpts.length-1]];drawMark(m,.8)}}}
function drawOverlay(){drawMarkOverlay();
 if(S.pts.length){const P=previewPath();strokePath(S.opt.mode==='spline'?smoothPath(P):P,roadW(PRESETS[S.preset]),'rgba(129,140,248,.5)')}}
function draw(){ctx=mainCtx;ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#14532d';ctx.fillRect(0,0,cv.width,cv.height);
 if(DR.rev!==S.rev){DR.lv=new Set(S.roads.map(r=>r.level));DR.rev=S.rev}
 for(const lv of [-1,0,1]){if(!DR.lv.has(lv))continue;ctx.globalAlpha=lv<0?.45:1;ctx.drawImage(renderLayer(lv).c,0,0);drawObstacles(lv);drawCars(lv);drawSignals(lv);ctx.globalAlpha=1}
 drawOverlay()}

/* ===== js/marks.js ===== */
'use strict';
/* РОЗМІТКА. Каталог видів (лінії + «штампи»), малювання на полотні, розміщення з прив'язкою до смуг і гумка.
   Лінія — ламана з кліків (Enter/подвійний клік — завершити). Штамп — один клік; кут (°), довжина, ширина, крок, колір задаються в панелі.
   Локальні координати штампа: x — по ходу руху, y — вправо. */
const MCOL={white:'#f5f5f5',yellow:'#facc15',red:'#dc2626',blue:'#2563eb',green:'#16a34a',black:'#111827'};
const MCOLN={white:'Білий',yellow:'Жовтий',red:'Червоний',blue:'Синій',green:'Зелений',black:'Чорний'};
const MPAR={len:'Довжина',w:'Ширина',gap:'Крок',ang:'Кут (°)',hang:'Кут штрихів (°)',col:'Колір',text:'Текст'};
const MK={};
const mc=m=>MCOL[m.col]||m.col||MCOL.white,dz=m=>[m.len*S.cam.z,m.gap*S.cam.z];
// --- примітиви в локальних координатах штампа
const Lx=(x1,y1,x2,y2,wd,c)=>{ctx.strokeStyle=c;ctx.lineWidth=wd;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()};
const Rx=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
function head(x,y,a,s,c){ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x+Math.cos(a)*s,y+Math.sin(a)*s);ctx.lineTo(x+Math.cos(a+2.5)*s*.85,y+Math.sin(a+2.5)*s*.85);ctx.lineTo(x+Math.cos(a-2.5)*s*.85,y+Math.sin(a-2.5)*s*.85);ctx.fill()}
function txt(s,size,c){ctx.save();ctx.rotate(Math.PI/2);ctx.fillStyle=c;ctx.font=`bold ${size}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(s,0,0);ctx.restore()}
function arrow(m,br){const L=m.len,c=mc(m),wd=m.w;Lx(-L/2,0,0,0,wd,c);
 for(const b of br){const a=b*Math.PI/180,e=L*.5,ex=Math.cos(a)*e,ey=Math.sin(a)*e;Lx(0,0,ex*.8,ey*.8,wd,c);head(ex,ey,a,wd*2.6,c)}}
function uturn(m){const r=m.len*.2,c=mc(m);Lx(-m.len/2,0,0,0,m.w,c);ctx.strokeStyle=c;ctx.lineWidth=m.w;ctx.beginPath();ctx.arc(0,-r,r,Math.PI/2,-Math.PI/2,true);ctx.stroke();head(0,-2*r,Math.PI,m.w*2.6,c)}
function zigzag(P,step,amp){const L=mkLane(P),o=[];let i=0;for(let s=0;s<L.len;s+=step,i++){const p=at(L,s),f=i%2?amp:-amp;o.push({x:p.x-Math.sin(p.a)*f,y:p.y+Math.cos(p.a)*f})}o.push(P[P.length-1]);return o}
function zebra(m,lines){const c=mc(m);for(let y=-m.len/2;y<m.len/2-1;y+=m.gap*2)Rx(-m.w/2,y,m.w,Math.min(m.gap,m.len/2-y),c);if(lines){Rx(-m.w/2-2,-m.len/2,2,m.len,c);Rx(m.w/2,-m.len/2,2,m.len,c)}}
function hatchRect(m,both){ctx.save();ctx.beginPath();ctx.rect(-m.len/2,-m.w/2,m.len,m.w);ctx.clip();const c=mc(m),t=Math.tan((m.hang||45)*Math.PI/180),R=m.len+m.w;
 for(const sg of both?[1,-1]:[1])for(let x=-R;x<R;x+=m.gap)Lx(x-sg*m.w/2/(t||1e-3),-sg*m.w/2,x+sg*m.w/2/(t||1e-3),sg*m.w/2,2,c);ctx.restore();ctx.strokeStyle=c;ctx.lineWidth=2;ctx.strokeRect(-m.len/2,-m.w/2,m.len,m.w)}
function def(key,n,kind,group,d,par,draw,snap){MK[key]={key,n,kind,group,def:d,par,draw,snap:snap||'lane'}}
const LP=['w','len','gap','col'];
// ----- ЛІНІЇ
def('l_solid','Суцільна','line','Лінії',{w:3,col:'white'},['w','col'],m=>strokePath(m.pts,m.w,mc(m)));
def('l_dash','Переривчаста','line','Лінії',{w:3,len:14,gap:14,col:'white'},LP,m=>strokePath(m.pts,m.w,mc(m),dz(m)));
def('l_long','Попереджувальна (довгий штрих)','line','Лінії',{w:3,len:30,gap:10,col:'white'},LP,m=>strokePath(m.pts,m.w,mc(m),dz(m)));
def('l_dot','Крапкова (напрямна)','line','Лінії',{w:3,len:3,gap:6,col:'white'},LP,m=>strokePath(m.pts,m.w,mc(m),dz(m)));
def('l_dsolid','Подвійна суцільна','line','Лінії',{w:2.5,gap:3,col:'yellow'},['w','gap','col'],m=>{const o=m.w/2+m.gap/2;strokeOff(m.pts,o,m.w,mc(m));strokeOff(m.pts,-o,m.w,mc(m))});
def('l_sd','Суцільна + переривчаста','line','Лінії',{w:2.5,len:14,gap:14,col:'white'},LP,m=>{const o=m.w+1.5;strokeOff(m.pts,-o,m.w,mc(m));strokeOff(m.pts,o,m.w,mc(m),dz(m))});
def('l_dd','Подвійна переривчаста (реверсивна)','line','Лінії',{w:2.5,len:14,gap:14,col:'yellow'},LP,m=>{const o=m.w+1.5;strokeOff(m.pts,-o,m.w,mc(m),dz(m));strokeOff(m.pts,o,m.w,mc(m),dz(m))});
def('l_edge','Краєва (суцільна жирна)','line','Лінії',{w:5,col:'white'},['w','col'],m=>strokePath(m.pts,m.w,mc(m)));
def('l_zig','Зигзаг (зупинка заборонена)','line','Лінії',{w:3,len:10,gap:6,col:'yellow'},LP,m=>strokePath(zigzag(m.pts,m.len,m.gap),m.w,mc(m)));
def('l_park','Паркувальна (жовта)','line','Лінії',{w:2.5,len:10,gap:8,col:'yellow'},LP,m=>strokePath(m.pts,m.w,mc(m),dz(m)));
def('l_stripe','Кольорова смуга (автобус/вело)','line','Лінії',{w:24,col:'red'},['w','col'],m=>{ctx.globalAlpha*=.6;strokePath(m.pts,m.w,mc(m))});
def('l_curb','Бордюр (смугастий)','line','Лінії',{w:6,len:8,gap:8,col:'white'},LP,m=>{strokePath(m.pts,m.w,MCOL.black);strokePath(m.pts,m.w,mc(m),dz(m))});
// ----- СТРІЛКИ
const AP=['len','w','ang','col'],AD={len:34,w:4,col:'white'};
for(const[k,n,br]of[['a_str','Прямо',[0]],['a_left','Ліворуч',[-48]],['a_right','Праворуч',[48]],['a_sl','Прямо + ліворуч',[0,-48]],['a_sr','Прямо + праворуч',[0,48]],['a_lr','Ліворуч + праворуч',[-48,48]],['a_ml','Злиття ліворуч',[-22]],['a_mr','Злиття праворуч',[22]]])def(k,n,'stamp','Стрілки',AD,AP,m=>arrow(m,br));
def('a_u','Розворот','stamp','Стрілки',AD,AP,uturn);
// ----- ПЕРЕХОДИ
const CP=['len','w','gap','ang','col'];
def('c_zebra','Зебра','stamp','Переходи',{len:80,w:26,gap:6,col:'white'},CP,m=>zebra(m,false),'road');
def('c_ladder','Драбинка','stamp','Переходи',{len:80,w:26,gap:6,col:'white'},CP,m=>zebra(m,true),'road');
def('c_cont','Континентальний','stamp','Переходи',{len:80,w:30,gap:10,col:'white'},CP,m=>zebra(m,false),'road');
def('c_lines','Пішохідний (дві лінії)','stamp','Переходи',{len:80,w:26,col:'white'},['len','w','ang','col'],m=>{Rx(-m.w/2-3,-m.len/2,3,m.len,mc(m));Rx(m.w/2,-m.len/2,3,m.len,mc(m))},'road');
// ----- СИМВОЛИ ТА ДІЛЯНКИ
def('s_stop','Стоп-лінія','stamp','Символи й ділянки',{len:30,w:6,col:'white'},['len','w','ang','col'],m=>Rx(-m.w/2,-m.len/2,m.w,m.len,mc(m)));
def('s_yield','Лінія «Дай дорогу»','stamp','Символи й ділянки',{len:30,w:9,gap:10,col:'white'},CP,m=>{ctx.fillStyle=mc(m);for(let y=-m.len/2;y<m.len/2-m.gap/2;y+=m.gap){ctx.beginPath();ctx.moveTo(m.w/2,y);ctx.lineTo(m.w/2,y+m.gap*.9);ctx.lineTo(-m.w/2,y+m.gap*.45);ctx.fill()}});
def('s_hatch','Штриховка (розділювальна)','stamp','Символи й ділянки',{len:80,w:30,gap:9,hang:45,col:'white'},['len','w','gap','hang','ang','col'],m=>hatchRect(m,false),'road');
def('s_chev','Шеврони (острівець)','stamp','Символи й ділянки',{len:80,w:30,gap:14,col:'white'},CP,m=>{for(let x=-m.len/2;x<m.len/2;x+=m.gap){ctx.strokeStyle=mc(m);ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,-m.w/2);ctx.lineTo(x+m.gap*.7,0);ctx.lineTo(x,m.w/2);ctx.stroke()}},'road');
def('s_box','Жовта сітка (не блокувати)','stamp','Символи й ділянки',{len:60,w:60,gap:12,hang:45,col:'yellow'},['len','w','gap','hang','ang','col'],m=>hatchRect(m,true),'road');
def('s_hump','Лежачий поліцейський','stamp','Символи й ділянки',{len:30,w:20,gap:5,col:'white'},CP,m=>{for(let x=-m.w/2;x<m.w/2;x+=m.gap*2)Rx(x,-m.len/2,m.gap,m.len,mc(m))});
def('s_rumble','Шумові смуги','stamp','Символи й ділянки',{len:30,w:22,gap:7,col:'white'},CP,m=>{for(let x=-m.w/2;x<m.w/2;x+=m.gap)Rx(x,-m.len/2,2,m.len,mc(m))});
def('s_bike','Велосипед','stamp','Символи й ділянки',{len:28,w:2.5,col:'white'},['len','w','ang','col'],m=>{const c=mc(m),r=m.len*.2;ctx.strokeStyle=c;ctx.lineWidth=m.w;for(const x of[-m.len*.25,m.len*.25]){ctx.beginPath();ctx.arc(x,0,r,0,7);ctx.stroke()}Lx(-m.len*.25,0,0,-r*.8,m.w,c);Lx(0,-r*.8,m.len*.25,0,m.w,c);Lx(-m.len*.25,0,m.len*.1,-r*1.4,m.w,c);Lx(m.len*.25,0,m.len*.2,-r*1.6,m.w,c)});
def('s_bus','БУС (смуга автобуса)','stamp','Символи й ділянки',{len:20,text:'БУС',col:'white'},['len','ang','col'],m=>txt('БУС',m.len,mc(m)));
def('s_dis','Місце для інвалідів','stamp','Символи й ділянки',{len:22,text:'♿',col:'blue'},['len','ang','col'],m=>txt('♿',m.len,mc(m)));
def('s_park','Паркомісце','stamp','Символи й ділянки',{len:50,w:26,col:'white'},['len','w','ang','col'],m=>{ctx.strokeStyle=mc(m);ctx.lineWidth=2;ctx.strokeRect(-m.len/2,-m.w/2,m.len,m.w)});
def('s_speed','Обмеження швидкості','stamp','Символи й ділянки',{len:34,w:3,text:'50',col:'red'},['len','w','text','ang','col'],m=>{ctx.strokeStyle=mc(m);ctx.lineWidth=m.w;ctx.beginPath();ctx.arc(0,0,m.len/2,0,7);ctx.stroke();txt(m.text,m.len*.5,MCOL.white)});
def('s_text','Текст на дорозі','stamp','Символи й ділянки',{len:24,text:'СТОП',col:'white'},['len','text','ang','col'],m=>txt(m.text,m.len,mc(m)));
/** Малює одну розмітку (alpha — для привида під курсором). */
function drawMark(m,al){const t=MK[m.k];if(!t)return;const prev=ctx.globalAlpha;ctx.globalAlpha=prev*(al==null?1:al);
 if(t.kind==='line'){if(m.pts&&m.pts.length>1)t.draw(m)}else{const q=w2s(m);ctx.save();ctx.translate(q.x,q.y);ctx.rotate(m.a);ctx.scale(S.cam.z,S.cam.z);ctx.lineCap='butt';t.draw(m);ctx.restore()}
 ctx.globalAlpha=prev}
const drawMarks=lv=>{for(const m of S.marks)if((m.lv||0)===lv)drawMark(m)};
// ----- Прив'язка до смуг
/** Найближча смуга (центр смуги, її напрям руху). */
function snapLane(p,maxD=45){let best=null,bd=maxD;for(const l of S.lanes){if(l.conn)continue;const b=l.bb||(l.bb=bboxOf(l.pts));if(p.x<b.x0-bd||p.x>b.x1+bd||p.y<b.y0-bd||p.y>b.y1+bd)continue;
  const n=nearestOn(l.pts,p);if(n.d<bd){bd=n.d;best={x:n.x,y:n.y,a:Math.atan2(l.pts[n.i+1].y-l.pts[n.i].y,l.pts[n.i+1].x-l.pts[n.i].x),lv:roadOf(l).level,w:PRESETS[roadOf(l).pk].lw}}}return best}
/** Найближча вісь блоку смуг дороги (для переходів, штриховки): точка по центру проїзної частини. */
function snapRoad(p,maxD=70){let best=null,bd=maxD;for(const r of S.roads){const pr=PRESETS[r.pk];if(pr.f+pr.b<1&&!pr.w)continue;const P=r.dp||r.pts,b=r.bb||(r.bb=bboxOf(r.pts));if(p.x<b.x0-bd||p.x>b.x1+bd||p.y<b.y0-bd||p.y>b.y1+bd)continue;
  const n=nearestOn(P,p);if(n.d<bd){bd=n.d;best={x:n.x,y:n.y,a:Math.atan2(P[n.i+1].y-P[n.i].y,P[n.i+1].x-P[n.i].x),lv:r.level,w:carW(pr)}}}return best}
/** Точка на найближчій межі смуги (для ліній розмітки). */
function snapBoundary(p,maxD=14){let best=null,bd=maxD;for(const r of S.roads){const pr=PRESETS[r.pk];if(pr.f+pr.b<1)continue;const P=r.dp||r.pts,b=r.bb||(r.bb=bboxOf(r.pts));if(p.x<b.x0-60||p.x>b.x1+60||p.y<b.y0-60||p.y>b.y1+60)continue;
  for(const o of laneBounds(pr)){const n=nearestOn(offsetLine(P,o),p);if(n.d<bd){bd=n.d;best={x:n.x,y:n.y,lv:r.level}}}}return best}
/** Розмітка, яку було б поставлено зараз (для привида й розміщення). */
function markAt(p,live){const t=MK[S.mk.key],o=S.mk,m={k:t.key,len:o.len,w:o.w,gap:o.gap,col:o.col,hang:o.hang,text:o.text,lv:S.opt.level};
 if(t.kind==='line')return m;let a=(o.ang||0)*Math.PI/180,x=p.x,y=p.y;
 if(S.opt.snap){const s=t.snap==='road'?snapRoad(p):snapLane(p);if(s){x=s.x;y=s.y;a+=s.a;m.lv=s.lv}}
 m.x=x;m.y=y;m.a=a;return m}
function eraseMarkAt(p){let best=-1,bd=26;S.marks.forEach((m,i)=>{let d;if(m.pts){d=1e9;for(let k=0;k<m.pts.length-1;k++){const a=m.pts[k],b=m.pts[k+1],dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1)));d=Math.min(d,Math.hypot(p.x-a.x-dx*t,p.y-a.y-dy*t))}}else d=Math.hypot(p.x-m.x,p.y-m.y)-(m.len||0)*.3;if(d<bd){bd=d;best=i}});
 if(best<0)return false;S.marks.splice(best,1);S.rev++;S.dirty=1;return true}

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
function autoRamp(c,pk,lv,sp){const pn=PRESETS[pk];if(pn.f<1||pn.b||pn.w||pn.med||c.length<2)return false;
 for(const first of [true,false]){const t=findRampTarget(c,lv,first);if(!t)continue;
  const{r,n,po,side,h0,hc}=t,off=(side>0?laneOff(po,0,po.f-1):laneOff(po,1,po.b-1))+(r.sh||0),att={x:n.x-Math.sin(h0)*off,y:n.y+Math.cos(h0)*off};
  const lead={x:att.x+Math.cos(hc)*(first?30:-30),y:att.y+Math.sin(hc)*(first?30:-30)}; // короткий відрізок уздовж траси → плавне відгалуження
  let pts=c.map(p=>({...p}));if(first){pts.shift();while(pts.length>1&&dist(pts[0],att)<60)pts.shift();pts=[att,lead,...pts]}
  else{pts.pop();while(pts.length>1&&dist(pts[pts.length-1],att)<60)pts.pop();pts=[...pts,lead,att]}
  splitRoad(r,[n]);S.roads.push({pts:cleanPath(smoothPath(cleanPath(pts),sp?1:3)),pk,level:lv,ramp:first?'exit':'entry'}) /* без подвійного згладжування: спліновий шлях уже гладкий */;buildGraph();toast(first?"З'їзд створено":'Заїзд створено');return true}
 return false}
/** Дорога іншого рівня, що торкається кінця існуючої, стає рампою зі схилом (висота інтерполюється у 3D). */
function autoLevelRamp(c,pk,lv){for(const k of [0,c.length-1]){const e=c[k];
  if(S.roads.some(x=>x.level===lv&&(dist(x.pts[0],e)<30||dist(x.pts[x.pts.length-1],e)<30)))continue; // є з'єднання на тому ж рівні
  for(const r of S.roads){if(r.level===lv||r.ramp==='level'||PRESETS[r.pk].f+PRESETS[r.pk].b<1)continue;
   for(const q of [r.pts[0],r.pts[r.pts.length-1]])if(dist(e,q)<30){const pts=c.map(p=>({...p}));pts[k]={x:q.x,y:q.y};
    S.roads.push({pts,pk,level:lv,ramp:'level',sh:r.sh||0,from:r.level,attEnd:k?1:0,ys:k?[lv*30,r.level*30]:[r.level*30,lv*30]});buildGraph();toast('Рампу між рівнями створено');return true}}}
 return false}

/* ===== js/save.js ===== */
'use strict';
/* ЗБЕРЕЖЕННЯ: файл JSON (завантаження/відкриття) + автозбереження в браузері (localStorage). */
const SAVE_KEY='roadcad.autosave.v1',ROAD_KEYS=['pk','level','sh','l0','l1','ramp','from','attEnd','ys'];
/** Відновлює похідні пресети («база|смуги вперед|смуги назад|…»), створені авто-додаванням смуг. */
function ensurePreset(pk){if(PRESETS[pk])return true;const p=String(pk).split('|');if(p.length<3||!PRESETS[p[0]])return false;let cur=p[0];for(let i=1;i+1<p.length;i+=2)cur=derive(cur,+p[i],+p[i+1]);return !!PRESETS[pk]}
const r2=v=>v,/* повна точність: однакова мережа після відкриття */ fin2=a=>Array.isArray(a)&&a.length>=2&&Number.isFinite(a[0])&&Number.isFinite(a[1]);
function serialize(){return{v:1,app:'RoadCAD Lanes',roads:S.roads.map(r=>{const o={pts:r.pts.map(p=>[r2(p.x),r2(p.y)])};for(const k of ROAD_KEYS)if(r[k]!==undefined)o[k]=r[k];return o}),
 marks:S.marks.map(m=>{const o={...m};if(m.pts)o.pts=m.pts.map(p=>[r2(p.x),r2(p.y)]);return o}),cam:{x:S.cam.x,y:S.cam.y,z:S.cam.z}}}
/** Завантаження з перевіркою: биті/невідомі об'єкти пропускаються, а не ламають проєкт. */
function deserialize(d){if(!d||!Array.isArray(d.roads))throw new Error('Невідомий формат файлу');const roads=[];
 for(const o of d.roads){if(!Array.isArray(o.pts)||o.pts.length<2||!o.pts.every(fin2)||!ensurePreset(o.pk))continue;const r={pts:o.pts.map(([x,y])=>({x,y}))};for(const k of ROAD_KEYS)if(o[k]!==undefined)r[k]=o[k];if(r.level===undefined)r.level=0;roads.push(r)}
 const marks=(d.marks||[]).filter(m=>MK[m.k]&&(m.pts?m.pts.every(fin2):Number.isFinite(m.x)&&Number.isFinite(m.y))).map(m=>{const o={...m};if(m.pts)o.pts=m.pts.map(([x,y])=>({x,y}));return o});
 S.roads=roads;S.marks=marks;if(d.cam&&Number.isFinite(d.cam.x)&&Number.isFinite(d.cam.y)&&Number.isFinite(d.cam.z))Object.assign(S.cam,{x:d.cam.x,y:d.cam.y,z:d.cam.z});S.pts=[];S.obst=[];buildGraph();return{roads:roads.length,marks:marks.length}}
function autosave(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(serialize()))}catch(e){}}
function restoreAuto(){try{const t=localStorage.getItem(SAVE_KEY);if(t)deserialize(JSON.parse(t))}catch(e){console.warn('autosave',e)}}
function saveFile(){const d=new Date(),p=n=>String(n).padStart(2,'0'),name=`roadcad-${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.json`;
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(serialize())],{type:'application/json'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);toast('Збережено: '+name)}
function loadFile(file){const rd=new FileReader();rd.onload=()=>{try{pushUndo();const r=deserialize(JSON.parse(rd.result));toast(`Відкрито: ${r.roads} доріг, ${r.marks} розміток`)}catch(e){undo();toast('Не вдалося відкрити файл: '+e.message)}};rd.readAsText(file)}

/* ===== js/ui.js ===== */
'use strict';
/* ІНТЕРФЕЙС (у стилі Cities: Skylines): вгорі — типи; клік по типу відкриває панель підтипів; ліворуч — інструменти.
   Миша/клавіатура: будівництво доріг, розмітка (лінії/штампи), гумка, скасування, збереження. */
const MARK_CAT='MARK';
S.cat=CATS[0];S.tool='road';S.mkpts=[];S.mk={key:'l_solid',len:14,w:3,gap:14,col:'white',hang:45,text:'СТОП',ang:0};
/** Скасування: знімок доріг і розмітки перед кожною дією (до 50 кроків). Об'єкти копіюються неглибоко — масиви точок ніколи не змінюються «на місці». */
const UNDO=[];
function pushUndo(){UNDO.push({roads:S.roads.map(r=>({...r})),marks:S.marks.map(m=>({...m}))});if(UNDO.length>50)UNDO.shift()}
function undo(){const s=UNDO.pop();if(!s){toast('Нічого скасовувати');return}S.roads=s.roads;S.marks=s.marks;S.pts=[];S.mkpts=[];buildGraph();toast('Скасовано')}
// ---------- попередній перегляд карток
function swapDraw(cvs,z,fn){const c=cvs.getContext('2d'),oc=ctx,ocam=S.cam;ctx=c;S.cam={x:(cv.width/2-cvs.width/2)/z,y:(cv.height/2-cvs.height/2)/z,z};try{fn(c)}finally{ctx=oc;S.cam=ocam}}
function previewPreset(cvs,p){const c=cvs.getContext('2d'),W=cvs.width,H=cvs.height;c.fillStyle='#14532d';c.fillRect(0,0,W,H);
 const tw=Math.max(roadW(p),40),s=Math.min((W-10)/tw,1.15);let x=(W-tw*s)/2;const y0=5,hh=H-10;
 const sides=()=>{const a=[];if(p.sw)a.push([p.sw,p.swc||'#b8b8b0']);if(p.park)a.push([16,'#4b5563']);if(p.bike)a.push([12,'#16a34a']);if(p.bus)a.push([p.lw,'#b91c1c']);return a};
 const band=(w,col)=>{c.fillStyle=col;c.fillRect(x,y0,w*s,hh);x+=w*s};
 sides().forEach(([w,col])=>band(w,col));const cx0=x,cw=carW(p)*s,mid=cx0+cw/2;band(carW(p),p.col);
 const Wl=laneW(p)||carW(p);
 if(p.med){const mc=-Wl/2+p.b*p.lw+p.med/2;c.fillStyle=p.green?'#3f7f3f':p.tram?'#555':'#6b7280';c.fillRect(mid+(mc-p.med/2)*s,y0,p.med*s,hh)}
 if(p.paved&&p.f+p.b>0){const L0=-Wl/2+p.b*p.lw;c.lineWidth=1.2;c.strokeStyle='#e5e7eb';c.setLineDash([4,4]);
  for(let i=1;i<p.f;i++){const xx=mid+(L0+p.med+i*p.lw)*s;c.beginPath();c.moveTo(xx,y0);c.lineTo(xx,y0+hh);c.stroke()}
  for(let i=1;i<p.b;i++){const xx=mid+(L0-i*p.lw)*s;c.beginPath();c.moveTo(xx,y0);c.lineTo(xx,y0+hh);c.stroke()}c.setLineDash([]);
  if(p.b&&p.f&&!p.med){c.strokeStyle='#facc15';const xx=mid+L0*s;c.beginPath();c.moveTo(xx,y0);c.lineTo(xx,y0+hh);c.stroke()}}
 c.fillStyle='rgba(255,255,255,.85)';const arr=(xx,up)=>{c.beginPath();const d=up?-1:1;c.moveTo(xx,y0+hh/2+d*9);c.lineTo(xx-4,y0+hh/2-d*3);c.lineTo(xx+4,y0+hh/2-d*3);c.fill()};
 for(let i=0;i<p.f;i++)arr(mid+laneOff(p,0,i)*s,true);for(let i=0;i<p.b;i++)arr(mid+laneOff(p,1,i)*s,false);
 x=cx0+cw;sides().reverse().forEach(([w,col])=>band(w,col))}
function previewMark(cvs,key){const t=MK[key],c=cvs.getContext('2d');c.fillStyle='#3b3f46';c.fillRect(0,0,cvs.width,cvs.height);
 const m={k:key,...t.def,gap:t.def.gap??10,w:t.def.w??6,len:t.def.len??30,hang:t.def.hang??45,text:t.def.text||'',lv:0};
 if(t.kind==='line'){const z=1;m.pts=[{x:-38,y:0},{x:38,y:0}];if(key==='l_stripe')m.w=12;swapDraw(cvs,z,()=>drawMark(m))}
 else{const ext=Math.max(m.len,m.w||0,24);const z=Math.min(1.5,(Math.min(cvs.width,cvs.height)-8)/ext);m.x=0;m.y=0;m.a=-Math.PI/2;swapDraw(cvs,z,()=>drawMark(m))}}
// ---------- панель підтипів
function openSub(cat){S.cat=cat;renderSub();$('sub').classList.remove('hidden');syncUI()}
function closeSub(){$('sub').classList.add('hidden');syncUI()}
function card(name,on,draw,click){const d=document.createElement('div');d.className='card'+(on?' on':'');const c=document.createElement('canvas');c.width=112;c.height=56;d.appendChild(c);const s=document.createElement('span');s.textContent=name;d.appendChild(s);d.onclick=click;draw(c);return d}
function renderSub(){const body=$('subbody');body.innerHTML='';
 if(S.cat===MARK_CAT){$('subtitle').textContent='🖍️ Розмітка — лінії, стрілки, переходи, символи (параметри ліворуч)';
  const groups=[...new Set(Object.values(MK).map(t=>t.group))];
  for(const g of groups){const h=document.createElement('div');h.className='gt';h.textContent=g;body.appendChild(h);const gr=document.createElement('div');gr.className='grid';
   for(const t of Object.values(MK).filter(t=>t.group===g))gr.appendChild(card(t.n,S.tool!=='road'&&S.mk.key===t.key,c=>previewMark(c,t.key),()=>{selectMark(t.key);closeSub()}));body.appendChild(gr)}}
 else{$('subtitle').textContent=S.cat.replace(/^\S+\s/,'')+' — оберіть тип дороги';const gr=document.createElement('div');gr.className='grid';
  for(const k in PRESETS){const p=PRESETS[k];if(p.cat!==S.cat)continue;gr.appendChild(card(p.n,S.tool==='road'&&S.preset===k,c=>previewPreset(c,p),()=>{selectPreset(k);closeSub()}))}body.appendChild(gr)}}
function buildCats(){const nav=$('cats');nav.innerHTML='';const all=[...CATS,MARK_CAT];
 for(const c of all){const b=document.createElement('button');const em=c===MARK_CAT?'🖍️':c.split(' ')[0],nm=c===MARK_CAT?'Розмітка':c.replace(/^\S+\s/,'');b.innerHTML=`<span class="ic">${em}</span><span>${nm}</span>`;b.dataset.cat=c;
  b.onclick=()=>{if(c===MARK_CAT){if(S.tool==='road'){S.tool='mark';S.pts=[];renderMkPar()}}else if(S.tool!=='road'){S.tool='road';S.mkpts=[]}
  if(S.cat===c&&!$('sub').classList.contains('hidden'))closeSub();else openSub(c)};nav.appendChild(b)}}
// ---------- вибір інструментів
function selectPreset(k){S.preset=k;S.tool='road';S.pts=[];S.mkpts=[];const p=PRESETS[k];if(p.lv!==undefined)S.opt.level=p.lv;syncUI()}
function selectMark(key){const t=MK[key];S.mk.key=key;for(const f of['len','w','gap','col','hang','text'])if(t.def[f]!==undefined)S.mk[f]=t.def[f];S.tool='mark';S.pts=[];S.mkpts=[];renderMkPar();syncUI()}
function renderMkPar(){const t=MK[S.mk.key],box=$('mk-par');$('mk-name').textContent='🖍️ '+t.n;box.innerHTML='';
 for(const f of t.par){const row=document.createElement('div');row.className='row';const lb=document.createElement('label');lb.textContent=MPAR[f];row.appendChild(lb);let inp;
  if(f==='col'){inp=document.createElement('select');for(const k in MCOLN){const o=document.createElement('option');o.value=k;o.textContent=MCOLN[k];inp.appendChild(o)}inp.value=S.mk.col;inp.onchange=()=>{S.mk.col=inp.value;S.dirty=1}}
  else if(f==='text'){inp=document.createElement('input');inp.type='text';inp.value=S.mk.text;inp.maxLength=12;inp.oninput=()=>{S.mk.text=inp.value;S.dirty=1}}
  else{inp=document.createElement('input');inp.type='number';inp.step=f==='ang'||f==='hang'?5:1;inp.value=S.mk[f];inp.dataset.f=f;inp.oninput=()=>{const v=parseFloat(inp.value);if(Number.isFinite(v)){S.mk[f]=v;S.dirty=1}}}
  row.appendChild(inp);box.appendChild(row)}}
function syncUI(){document.querySelectorAll('#cats button').forEach(b=>b.classList.toggle('on',b.dataset.cat===S.cat&&!$('sub').classList.contains('hidden')||(b.dataset.cat===MARK_CAT&&S.tool!=='road'&&$('sub').classList.contains('hidden'))));
 document.querySelectorAll('#s-mode button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.opt.mode));
 document.querySelectorAll('#s-level button').forEach(b=>b.classList.toggle('on',+b.dataset.v===S.opt.level));
 for(const[id,k]of[['t-par','par'],['t-mrg','mrg'],['t-grid','grid'],['t-snap','snap']])$(id).classList.toggle('on',!!S.opt[k]);
 $('g-road').classList.toggle('hidden',S.tool!=='road');$('g-mark').classList.toggle('hidden',S.tool==='road');$('mk-erase').classList.toggle('on',S.tool==='erase');S.dirty=1}
for(const[id,k,num]of[['s-mode','mode'],['s-level','level',1]])$(id).querySelectorAll('button').forEach(b=>b.onclick=()=>{S.opt[k]=num?+b.dataset.v:b.dataset.v;syncUI()});
for(const[id,k]of[['t-par','par'],['t-mrg','mrg'],['t-grid','grid'],['t-snap','snap']])$(id).onclick=()=>{S.opt[k]=!S.opt[k];syncUI()};
$('mk-erase').onclick=()=>{S.tool=S.tool==='erase'?'mark':'erase';S.mkpts=[];syncUI()};
// ---------- побудова доріг і розмітки
function finish(){if(S.pts.length>1){const rev=S.rev;pushUndo();const sp=S.opt.mode==='spline',lv=S.opt.level,pr=PRESETS[S.preset];
  addRoad(S.pts.slice(),S.preset,lv,sp);if(S.opt.par)addRoad(offsetLine(S.pts,roadW(pr)+24),S.preset,lv,sp,true);if(S.rev===rev)UNDO.pop()}S.pts=[]}
function finishMark(){const t=MK[S.mk.key];if(t.kind==='line'&&S.mkpts.length>1){pushUndo();const m=markAt(S.mkpts[0]);m.pts=S.mkpts.map(p=>({x:p.x,y:p.y}));S.marks.push(m);S.rev++;S.dirty=1}S.mkpts=[]}
/** Побудова з автоматичним відкатом при помилці (щоб жодна дія не залишала мережу напівзламаною). */
function safeFinish(){try{S.tool==='road'?finish():finishMark()}catch(err){console.error(err);S.pts=[];S.mkpts=[];undo();toast('Не вдалося виконати дію — зміни скасовано')}}
const gridPt=p=>({x:Math.round(p.x/40)*40,y:Math.round(p.y/40)*40});
const markPt=p=>{if(S.opt.snap){const b=snapBoundary(p);if(b)return{x:b.x,y:b.y}}return S.opt.grid?gridPt(p):{x:p.x,y:p.y}};
let drag=null;
cv.addEventListener('mousedown',e=>{S.dirty=1;if(e.button===2){drag={x:e.clientX,y:e.clientY,cx:S.cam.x,cy:S.cam.y};return}if(e.button!==0)return;closeSub();
 const p=s2w(e.clientX,e.clientY);
 if(S.tool==='erase'){pushUndo();if(!eraseMarkAt(p))UNDO.pop();return}
 if(S.tool==='mark'){const t=MK[S.mk.key];if(t.kind==='stamp'){pushUndo();S.marks.push(markAt(p));S.rev++}else S.mkpts.push(markPt(p));return}
 if(e.altKey){let best=null,bd=40;for(const l of S.lanes)for(let s=0;s<l.len;s+=10){const q=at(l,s),d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;best={lane:l,s}}}
  if(best){const q=at(best.lane,best.s);best.x=q.x;best.y=q.y;best.lvl=lvOf(best.lane);S.obst.push(best)}return}
 S.pts.push(S.opt.grid?gridPt(p):{x:p.x,y:p.y})});
cv.addEventListener('mousemove',e=>{S.dirty=1;if(drag){S.cam.x=drag.cx-(e.clientX-drag.x)/S.cam.z;S.cam.y=drag.cy-(e.clientY-drag.y)/S.cam.z}
 const p=s2w(e.clientX,e.clientY);S.mouseRaw=p;S.mouse=S.opt.grid?gridPt(p):{x:p.x,y:p.y};S.mkMouse=markPt(p)});
addEventListener('mouseup',()=>drag=null);cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('dblclick',()=>{if(S.tool==='road')S.pts.pop();else if(S.tool==='mark')S.mkpts.pop();safeFinish()});
cv.addEventListener('wheel',e=>{S.dirty=1;S.cam.z=Math.max(.3,Math.min(3,S.cam.z*(e.deltaY<0?1.1:.9)))});
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test((e.target.tagName||'')))return;S.dirty=1;
 if((e.ctrlKey||e.metaKey)&&e.code==='KeyZ'){e.preventDefault();undo();return}
 if(e.key==='Enter')safeFinish();if(e.key==='Escape'){S.pts=[];S.mkpts=[];closeSub()}
 if(S.tool==='mark'&&(e.key==='['||e.key===']')){S.mk.ang=(((S.mk.ang||0)+(e.key===']'?15:-15))%360+360)%360;const i=document.querySelector('#mk-par input[data-f=ang]');if(i)i.value=S.mk.ang}});
// ---------- кнопки дій
$('sim').onclick=()=>{S.run=!S.run;$('sim').textContent=S.run?'⏸ Трафік':'▶ Трафік'};
$('undo').onclick=undo;
$('clr').onclick=()=>{pushUndo();S.roads=[];S.marks=[];S.pts=[];S.mkpts=[];S.obst=[];S.cars=[];buildGraph();toast('Все очищено · Ctrl+Z поверне назад')};
$('save').onclick=saveFile;$('load').onclick=()=>$('file').click();$('file').onchange=e=>{const f=e.target.files[0];if(f)loadFile(f);e.target.value=''};
// ---------- старт
buildCats();selectPreset('p0');renderMkPar();restoreAuto();if(S.roads.length||S.marks.length)toast('Відновлено автозбереження');else openSub(CATS[0]);syncUI();

/* ===== js/main.js ===== */
'use strict';
/* ГОЛОВНИЙ ЦИКЛ: фіксований крок симуляції (60 Гц, акумулятор) — однакова поведінка на будь-якому FPS.
   Малювання лише коли щось змінилось (симуляція йде або S.dirty); помилка не зупиняє цикл, а показується у підказці.
   Автозбереження — раз на 2 с, якщо мережа чи розмітка змінились. */
let last=performance.now(),acc=0,savedRev=-1;
function frame(t){const dt=Math.min(.1,(t-last)/1000);last=t;
 try{if(S.run){acc+=dt;let n=0;while(acc>=SIM.dt&&n<3){step(SIM.dt);acc-=SIM.dt;n++}if(n===3)acc=0}
  if(S.run||S.dirty){draw();S.dirty=0}}
 catch(e){console.error(e);S.run=false;const d=$('hint');d.style.background='#7f1d1d';d.textContent='Помилка: '+e.message}
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
setInterval(()=>{if(S.rev!==savedRev){savedRev=S.rev;autosave()}},2000);
