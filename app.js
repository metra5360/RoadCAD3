'use strict';
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
const S={roads:[],lanes:[],cars:[],pts:[],preset:'p0',run:false,cam:{x:0,y:0,z:1},mouse:{x:0,y:0},obst:[]};
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
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function nearestOn(P,p){let b={d:1e9};for(let i=0;i<P.length-1;i++){const a=P[i],c=P[i+1],dx=c.x-a.x,dy=c.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1))),x=a.x+dx*t,y=a.y+dy*t,d=Math.hypot(p.x-x,p.y-y);if(d<b.d)b={d,i,t,x,y}}return b}
function segInt(a,b,c,d){const r={x:b.x-a.x,y:b.y-a.y},s={x:d.x-c.x,y:d.y-c.y},den=r.x*s.y-r.y*s.x;if(Math.abs(den)<1e-9)return null;
 const t=((c.x-a.x)*s.y-(c.y-a.y)*s.x)/den,u=((c.x-a.x)*r.y-(c.y-a.y)*r.x)/den;return t>.001&&t<.999&&u>.001&&u<.999?{t,u,x:a.x+r.x*t,y:a.y+r.y*t}:null}
function cutPoly(P,cuts){cuts.sort((a,b)=>a.i+a.t-b.i-b.t);const out=[];let cur=[P[0]],ci=0;
 for(let i=0;i<P.length-1;i++){while(ci<cuts.length&&cuts[ci].i===i){const q={x:cuts[ci].x,y:cuts[ci].y};cur.push(q);out.push(cur);cur=[q];ci++}cur.push(P[i+1])}
 out.push(cur);return out.filter(p=>mkLane(p).len>6)}
function splitRoad(r,cuts){S.roads=S.roads.filter(x=>x!==r);for(const p of cutPoly(r.pts,cuts))S.roads.push({pts:p,pk:r.pk,level:r.level})}
function trimPoly(P,a,b){const L=mkLane(P);if(L.len<a+b+12)return P;const o=[at(L,a)];for(let i=1;i<P.length-1;i++)if(L.cum[i]>a&&L.cum[i]<L.len-b)o.push(P[i]);o.push(at(L,L.len-b));return o.map(p=>({x:p.x,y:p.y}))}
// Додавання дороги з АВТО-перехрестями: прилипання кінців, Т‑розгалуження, перетини X
function addRoad(pts,pk,lv,sp){let c=sp?catmull(pts):pts.map(p=>({...p}));
 for(const k of [0,c.length-1]){const e=c[k];let hit=false;const same=S.roads.filter(r=>r.level===lv);
  for(const r of same){for(const q of [r.pts[0],r.pts[r.pts.length-1]])if(dist(e,q)<30){c[k]={x:q.x,y:q.y};hit=true;break}if(hit)break}
  if(!hit)for(const r of same){const n=nearestOn(r.pts,e);if(n.d<roadW(PRESETS[r.pk])/2+14){c[k]={x:n.x,y:n.y};splitRoad(r,[n]);break}}}
 const cuts=[];
 for(const r of S.roads.filter(x=>x.level===lv)){const rc=[];
  for(let i=0;i<c.length-1;i++)for(let j=0;j<r.pts.length-1;j++){const h=segInt(c[i],c[i+1],r.pts[j],r.pts[j+1]);if(h){cuts.push({i,t:h.t,x:h.x,y:h.y});rc.push({i:j,t:h.u,x:h.x,y:h.y})}}
  if(rc.length)splitRoad(r,rc)}
 for(const p of cutPoly(c,cuts))S.roads.push({pts:p,pk,level:lv});buildGraph()}
function buildGraph(){const eLv=(ri,e)=>{const r=S.roads[ri];return r.from!==undefined&&e===r.attEnd?r.from:r.level};S.lanes=[];S.cars=[];S.obst=[];S.roads.forEach(r=>r.t0=r.t1=0);
 const eps=[];S.roads.forEach((r,i)=>[0,1].forEach(e=>{if((r.ramp==='exit'||r.ramp==='entry')&&e===(r.ramp==='exit'?0:1))return;eps.push({r:i,e,p:e?r.pts[r.pts.length-1]:r.pts[0]})}));
 const nodes=[];for(const q of eps){const rq=S.roads[q.r],lvq=rq.from!==undefined&&q.e===rq.attEnd?rq.from:rq.level;let n=nodes.find(n=>n.lv===lvq&&dist(n.c,q.p)<14);if(!n)nodes.push(n={lv:lvq,c:{x:q.p.x,y:q.p.y},m:[]});n.m.push(q)}
 S.nodes=nodes.filter(n=>n.m.length>1);
 for(const n of S.nodes){n.mw=Math.max(...n.m.map(q=>roadW(PRESETS[S.roads[q.r].pk])));n.T=n.m.length>2?n.mw*.5+10:4;n.m.forEach(q=>S.roads[q.r]['t'+q.e]=n.T)}
 S.roads.forEach((r,ri)=>{const pr=PRESETS[r.pk],m=pr.med/2;r.tp=trimPoly(r.pts,r.t0,r.t1);
  const mk=(d,rev,idx)=>{const Q=offsetLine(r.tp,d);if(rev)Q.reverse();const l=mkLane(Q);Object.assign(l,{road:ri,dir:rev?-1:1,idx,nl:rev?pr.b:pr.f,next:[],nb:[]});S.lanes.push(l)};
  for(let i=0;i<pr.f;i++)mk(laneOff(pr,0,i),0,i);for(let i=0;i<pr.b;i++)mk(laneOff(pr,1,i),1,i)});
 const conns=[],wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
 for(const n of S.nodes){const R=n.mw/2+40;
  for(const a of S.lanes){if(eLv(a.road,a.dir>0?1:0)!==n.lv||dist(a.pts[a.pts.length-1],n.c)>R)continue;
   for(const b of S.lanes){if(b.road===a.road||eLv(b.road,b.dir>0?0:1)!==n.lv||dist(b.pts[0],n.c)>R)continue;
    const turn=wrap(at(b,0).a-at(a,a.len).a),ab=Math.abs(turn);if(ab>2.1)continue;
    const ok=ab<.5?b.idx===Math.min(a.idx,b.nl-1):turn>0?(a.idx===a.nl-1&&b.idx===b.nl-1):(a.idx===0&&b.idx===0);if(!ok)continue;
    const p0=a.pts[a.pts.length-1],p1=b.pts[0],ct=ab<.5?{x:(p0.x+p1.x)/2,y:(p0.y+p1.y)/2}:n.c,Q=[];
    for(let k=0;k<=10;k++){const t=k/10,u=1-t;Q.push({x:u*u*p0.x+2*u*t*ct.x+t*t*p1.x,y:u*u*p0.y+2*u*t*ct.y+t*t*p1.y})}
    const l=mkLane(Q);Object.assign(l,{road:a.road,dir:0,idx:0,conn:true,next:[b],nb:[]});conns.push(l);a.next.push(l);b.hasIn=true}}}
 const link=(a,b)=>{const p0=a.pts[a.pts.length-1],p1=b.pts[0],Q=[];for(let k=0;k<=6;k++){const t=k/6;Q.push({x:p0.x+(p1.x-p0.x)*t,y:p0.y+(p1.y-p0.y)*t})}
  const l=mkLane(Q);Object.assign(l,{road:a.road,dir:0,idx:0,conn:true,next:[b],nb:[]});conns.push(l);a.next.push(l);b.hasIn=true};
 S.roads.forEach((r,ri)=>{if(r.ramp!=='exit'&&r.ramp!=='entry')return;const rl=S.lanes.find(l=>l.road===ri&&!l.conn);if(!rl)return;const ex=r.ramp==='exit',q=ex?rl.pts[0]:rl.pts[rl.pts.length-1];let best=null,bd=220;
  for(const o of S.lanes){if(o.conn||o.road===ri||S.roads[o.road].level!==r.level)continue;const e=ex?o.pts[o.pts.length-1]:o.pts[0],d=dist(e,q);
   const dh=Math.abs(wrap((ex?at(o,o.len).a:at(o,0).a)-(ex?at(rl,0).a:at(rl,rl.len).a)));if(d<bd&&dh<1.6){bd=d;best=o}}
  r.linked=!!best;if(best)ex?link(best,rl):link(rl,best)});
 S.lanes.push(...conns);
 for(const a of S.lanes)for(const b of S.lanes)if(a!==b&&!a.conn&&!b.conn&&a.road===b.road&&a.dir===b.dir&&Math.abs(a.idx-b.idx)===1)a.nb.push(b)}
// ===== Симуляція (IDM + перестроювання)
function spawn(){const ok=S.lanes.filter(l=>!l.conn&&!l.hasIn); if(!ok.length)return;
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
  if(c.want){const nb=c.want,tgt=-(nb.idx-c.lane.idx)*PRESETS[S.roads[c.lane.road].pk].lw;
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
const strokeOff=(P,d,w,col,dash)=>strokePath(offsetLine(P,d),w,col,dash);
function deco(r,p){const P=r.tp,E=carW(p)/2,mc=-laneW(p)/2+p.b*p.lw+p.med/2;let o=E;
 if(p.bus){[1,-1].forEach(s=>strokeOff(P,s*(o+p.lw/2),p.lw,'#b91c1c'));o+=p.lw}
 if(p.bike){[1,-1].forEach(s=>strokeOff(P,s*(o+6),10,'#16a34a'));o+=12}
 if(p.park){[1,-1].forEach(s=>{strokeOff(P,s*(o+8),14,'#4b5563');strokeOff(P,s*(o+8),14,'#e5e7eb',[2,16])});o+=16}
 if(p.tree)[1,-1].forEach(s=>strokeOff(P,s*(o+p.sw/2),8,'#15803d',[6,24]));
 if(p.med){strokeOff(P,mc,p.med,p.green?'#3f7f3f':p.tram?'#555':'#6b7280');if(p.tram)[-4,4].forEach(d=>strokeOff(P,mc+d,1.5,'#d1d5db'));if(p.barrier)[1,-1].forEach(s=>strokeOff(P,mc+s*(p.med/2+1),3,'#e5e7eb'))}
 if(p.noise)[1,-1].forEach(s=>strokeOff(P,s*(E+3),4,'#38bdf8'));
 if(p.paved){const L0=-laneW(p)/2+p.b*p.lw;for(let i=1;i<p.f;i++)strokeOff(P,L0+p.med+i*p.lw,2,'#e5e7eb',[14,14]);for(let i=1;i<p.b;i++)strokeOff(P,L0-i*p.lw,2,'#e5e7eb',[14,14]);if(p.b&&p.f&&!p.med)strokeOff(P,L0,2,'#facc15')}}
function draw(){ctx.fillStyle='#14532d';ctx.fillRect(0,0,cv.width,cv.height);
 for(const lv of [-1,0,1]){const R=S.roads.filter(r=>r.level===lv);ctx.globalAlpha=lv<0?.45:1;
  for(const r of R){const p=PRESETS[r.pk];if(lv>0){strokePath(r.pts,roadW(p)+22,'rgba(0,0,0,.35)');strokePath(r.pts,roadW(p)+8,BRC[p.br]||'#9ca3af')}if(sideW(p))strokePath(r.pts,roadW(p),p.swc||'#b8b8b0')}
  for(const r of R){const p=PRESETS[r.pk];strokePath(r.pts,carW(p),p.col);if(p.cul){const q=w2s(r.pts[r.pts.length-1]);ctx.fillStyle=p.col;ctx.beginPath();ctx.arc(q.x,q.y,carW(p)*.9*S.cam.z,0,7);ctx.fill()}}
  for(const n of S.nodes||[]){if(n.lv!==lv)continue;const q=w2s(n.c);ctx.fillStyle='#3b3f46';ctx.beginPath();ctx.arc(q.x,q.y,(n.T+4)*S.cam.z,0,7);ctx.fill()}
  for(const l of S.lanes)if(l.conn&&S.roads[l.road].level===lv){const p=PRESETS[S.roads[l.road].pk];strokePath(l.pts,p.lw,p.col)}
  for(const r of R)deco(r,PRESETS[r.pk]);
  const lvOf=l=>S.roads[l.road].level;
  ctx.fillStyle='rgba(255,255,255,.85)';
  for(const l of S.lanes)if(!l.conn&&lvOf(l)===lv)for(let s=l.len*.5;s<l.len;s+=90){const p=at(l,s),q=w2s(p);ctx.save();ctx.translate(q.x,q.y);ctx.rotate(p.a);ctx.scale(S.cam.z,S.cam.z);
   ctx.beginPath();ctx.moveTo(7,0);ctx.lineTo(-5,-5);ctx.lineTo(-5,5);ctx.fill();ctx.restore()}
  for(const o of S.obst)if(lvOf(o.lane)===lv){const p=at(o.lane,o.s),q=w2s(p);ctx.fillStyle='#ef4444';ctx.fillRect(q.x-8*S.cam.z,q.y-8*S.cam.z,16*S.cam.z,16*S.cam.z)}
  for(const c of S.cars)if(lvOf(c.lane)===lv){const q=w2s(c);ctx.save();ctx.translate(q.x,q.y);ctx.rotate(c.a);ctx.scale(S.cam.z,S.cam.z);ctx.fillStyle=c.col;ctx.fillRect(-12,-6,24,12);
   ctx.fillStyle='#111';ctx.fillRect(3,-5,5,10);if(c.v<.05){ctx.fillStyle='#f00';ctx.fillRect(-13,-5,2,10)}ctx.restore()}
  ctx.globalAlpha=1}
 if(S.rampMode){const g=rampAt(S.mouseRaw);if(g)strokePath(g.pts,30,'rgba(250,204,21,.6)')}
 if(S.pts.length){const P=[...S.pts,S.mouse];strokePath($('mode').value==='spline'?catmull(P):P,roadW(PRESETS[S.preset]),'rgba(129,140,248,.5)')}}
// ===== Введення
const toolbar=$('presets'),catBar=$('cats');let curCat=CATS[0];
function renderPresets(){toolbar.innerHTML='';for(const k in PRESETS){const p=PRESETS[k];if(p.cat!==curCat)continue;const b=document.createElement('button');b.className='pre'+(k===S.preset?' on':'');b.textContent=p.n;
 b.onclick=()=>{S.preset=k;if(p.lv!==undefined)$('level').value=p.lv;renderPresets()};toolbar.appendChild(b)}}
CATS.forEach(c=>{const b=document.createElement('button');b.className='btn';b.textContent=c;b.onclick=()=>{curCat=c;renderPresets()};catBar.appendChild(b)});renderPresets();
function finish(){if(S.pts.length>1){const sp=$('mode').value==='spline',lv=+$('level').value,pr=PRESETS[S.preset];
  addRoad(S.pts.slice(),S.preset,lv,sp);
  if($('par').checked){const W=roadW(pr)+24;addRoad(offsetLine(S.pts,W),S.preset,lv,sp)}}
 S.pts=[]}
let drag=null;
cv.addEventListener('mousedown',e=>{if(e.button===2){drag={x:e.clientX,y:e.clientY,cx:S.cam.x,cy:S.cam.y};return}
 const p=s2w(e.clientX,e.clientY);
 if(S.rampMode&&!e.altKey){placeRamp(p);return}
 if(e.altKey){let best=null,bd=40;for(const l of S.lanes)for(let s=0;s<l.len;s+=10){const q=at(l,s),d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;best={lane:l,s}}}if(best)S.obst.push(best);return}
 const g=40;S.pts.push({x:Math.round(p.x/g)*g,y:Math.round(p.y/g)*g})});
cv.addEventListener('mousemove',e=>{if(drag){S.cam.x=drag.cx-(e.clientX-drag.x)/S.cam.z;S.cam.y=drag.cy-(e.clientY-drag.y)/S.cam.z}
 const p=s2w(e.clientX,e.clientY);S.mouseRaw=p;S.mouse={x:Math.round(p.x/40)*40,y:Math.round(p.y/40)*40}});
addEventListener('mouseup',()=>drag=null);cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('dblclick',()=>{S.pts.pop();finish()});
cv.addEventListener('wheel',e=>{S.cam.z=Math.max(.3,Math.min(3,S.cam.z*(e.deltaY<0?1.1:.9)))});
addEventListener('keydown',e=>{if(e.key==='Enter')finish();if(e.key==='Escape')S.pts=[]});
$('sim').onclick=()=>{S.run=!S.run;$('sim').textContent=S.run?'⏸ Трафік':'▶ Трафік'};
$('clr').onclick=()=>{S.roads=[];S.pts=[];buildGraph()};
// ===== З'їзди / заїзди з заданим кутом
S.mouseRaw={x:1e9,y:1e9};
function lvlRamp(p){let best=null,bd=1e9;for(const r of S.roads){const pr=PRESETS[r.pk];if(pr.f+pr.b===0)continue;const n=nearestOn(r.pts,p);if(n.d<bd&&n.d<roadW(pr)/2+30){bd=n.d;best={r,n}}}
 if(!best)return null;const r=best.r,P=r.pts,e0=dist(p,P[0])<dist(p,P[P.length-1])?0:1,E=e0?P[P.length-1]:P[0];if(dist(p,E)>220)return null;
 const Q=e0?P[P.length-2]:P[1],h=Math.atan2(E.y-Q.y,E.x-Q.x),L=+$('rlen').value,sel=+$('level').value,to=sel!==r.level?sel:(r.level===0?1:0),pts=[];
 for(let k=0;k<=8;k++)pts.push({x:E.x+Math.cos(h)*L*k/8,y:E.y+Math.sin(h)*L*k/8});return{lv:1,r,pts,to,pk:r.pk}}
function rampAt(p){if(+$('rang').value===0)return lvlRamp(p);let best=null,bd=1e9;
 for(const r of S.roads){if(r.ramp==='level')continue;const pr=PRESETS[r.pk];if(pr.f+pr.b===0)continue;const n=nearestOn(r.pts,p);if(n.d<bd&&n.d<roadW(pr)/2+30){bd=n.d;best={r,n}}}
 if(!best)return null;let right=$('rside').value==='r';const{r,n}=best,pr=PRESETS[r.pk],a=r.pts[n.i],b=r.pts[n.i+1],h0=Math.atan2(b.y-a.y,b.x-a.x);
 if(right?!pr.f:!pr.b)right=!right;if(right?!pr.f:!pr.b)return null;
 const h=right?h0:h0+Math.PI,off=right?laneOff(pr,0,pr.f-1):laneOff(pr,1,pr.b-1),att={x:n.x-Math.sin(h0)*off,y:n.y+Math.cos(h0)*off};
 const th=$('rang').value*Math.PI/180,d=(+$('rlen').value)/2,exit=$('rkind').value==='exit';let P0,C,P2;
 if(exit){P0=att;C={x:att.x+Math.cos(h)*d,y:att.y+Math.sin(h)*d};P2={x:C.x+Math.cos(h+th)*d,y:C.y+Math.sin(h+th)*d}}
 else{C={x:att.x-Math.cos(h)*d,y:att.y-Math.sin(h)*d};P0={x:C.x-Math.cos(h-th)*d,y:C.y-Math.sin(h-th)*d};P2=att}
 const pts=[];for(let k=0;k<=16;k++){const t=k/16,u=1-t;pts.push({x:u*u*P0.x+2*u*t*C.x+t*t*P2.x,y:u*u*P0.y+2*u*t*C.y+t*t*P2.y})}
 return{r,n,pts,exit}}
const HINT0=$('hint').textContent;let hintT=0;
function toast(t){const d=$('hint');d.textContent=t;clearTimeout(hintT);hintT=setTimeout(()=>{d.textContent=HINT0;d.style.background=''},3500)}
function placeRamp(p){const g=rampAt(p);if(!g){toast('Наведіть курсор на дорогу зі смугами (з\'їзд ставиться біля неї; 0° — біля кінця дороги)');return}if(g.lv){S.roads.push({pts:g.pts,pk:g.pk,level:g.to,ramp:'level',from:g.r.level,attEnd:0,ys:[g.r.level*30,g.to*30]});buildGraph();return}const cur=PRESETS[S.preset],nm=g.exit?"З'їзд з магістралі":"В'їзд на магістраль";
 const pk=cur.f>0&&cur.b===0?S.preset:Object.keys(PRESETS).find(k=>PRESETS[k].n===nm);
 splitRoad(g.r,[g.n]);S.roads.push({pts:g.pts,pk,level:g.r.level,ramp:g.exit?'exit':'entry'});buildGraph();if(!S.roads[S.roads.length-1].linked)toast('Рампу поставлено, але вона не з\'єднана зі смугою. Спробуйте інше місце, далі від перехрестя.')}
$('ramp').onclick=()=>{S.rampMode=!S.rampMode;$('rampbox').classList.toggle('hidden',!S.rampMode);$('ramp').classList.toggle('ring-2',S.rampMode);S.pts=[]};
$('rang').oninput=()=>{const v=+$('rang').value;$('rangv').textContent=v+'°';$('rhint').textContent=v===0?'0° = пряма рампа міст↔земля (від кінця дороги)':''};
// ===== 3D (Three.js): стрічки доріг + бокси авто
let T=null;
function init3D(){const el=$('c3d'),r=new THREE.WebGLRenderer({antialias:true});r.setSize(innerWidth,innerHeight);el.innerHTML='';el.appendChild(r.domElement);
 const sc=new THREE.Scene();sc.background=new THREE.Color(0x9ec5e8);sc.add(new THREE.HemisphereLight(0xffffff,0x335533,1));
 const cam=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,1,6000);
 const g=new THREE.Mesh(new THREE.PlaneGeometry(9000,9000),new THREE.MeshStandardMaterial({color:0x2e7d32}));g.rotation.x=-Math.PI/2;sc.add(g);
 for(const rd of S.roads){const pr=PRESETS[rd.pk],W=roadW(pr),y=rd.level*30+.5;
  const v=[],id=[];rd.pts.forEach((p,i)=>{const a=rd.pts[Math.max(0,i-1)],b=rd.pts[Math.min(rd.pts.length-1,i+1)],dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy)||1,nx=-dy/l*W/2,ny=dx/l*W/2;
   const yy=rd.ys?rd.ys[0]+(rd.ys[1]-rd.ys[0])*i/(rd.pts.length-1)+.5:y;v.push(p.x+nx,yy,p.y+ny,p.x-nx,yy,p.y-ny);if(i)id.push(2*i-2,2*i-1,2*i,2*i-1,2*i+1,2*i)});
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(v,3));geo.setIndex(id);geo.computeVertexNormals();
  sc.add(new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:pr.col,side:THREE.DoubleSide})));
  {const m=rd.pts[rd.pts.length>>1];if(pr.br==='susp'||pr.br==='cable'){const t=new THREE.Mesh(new THREE.BoxGeometry(8,120,W),new THREE.MeshStandardMaterial({color:0xdc2626}));t.position.set(m.x,60,m.y);sc.add(t)}if(pr.br==='arch'){const a=new THREE.Mesh(new THREE.TorusGeometry(100,4,6,24,Math.PI),new THREE.MeshStandardMaterial({color:0x6b7280}));a.position.set(m.x,rd.level*30,m.y);sc.add(a)}}
 if(rd.level>0&&!rd.ys){const pil=new THREE.Mesh(new THREE.BoxGeometry(W,rd.level*30,8),new THREE.MeshStandardMaterial({color:0x9ca3af}));
   pil.position.set(rd.pts[0].x,rd.level*15,rd.pts[0].y);sc.add(pil)}}
 T={r,sc,cam,cars:[],ang:0}}
function draw3D(){if(!T)return;const n=S.cars.length;while(T.cars.length<n){const m=new THREE.Mesh(new THREE.BoxGeometry(24,8,12),new THREE.MeshStandardMaterial({color:0xffffff}));T.sc.add(m);T.cars.push(m)}
 while(T.cars.length>n)T.sc.remove(T.cars.pop());
 S.cars.forEach((c,i)=>{const m=T.cars[i];m.material.color.set(c.col);const rd=S.roads[c.lane.road],fr=c.lane.dir>0?c.s/c.lane.len:c.lane.dir<0?1-c.s/c.lane.len:null;m.position.set(c.x,(rd.ys&&fr!==null?rd.ys[0]+(rd.ys[1]-rd.ys[0])*fr:rd.level*30)+5,c.y);m.rotation.y=-c.a});
 T.ang+=.003;const R=700;T.cam.position.set(S.cam.x+Math.cos(T.ang)*R,520,S.cam.y+Math.sin(T.ang)*R);T.cam.lookAt(S.cam.x,0,S.cam.y);T.r.render(T.sc,T.cam)}
$('v3').onclick=()=>{const on=$('c3d').classList.toggle('hidden')===false;if(on)init3D();cv.style.visibility=on?'hidden':'visible'};
// ===== Цикл
let last=performance.now();(function loop(t){const dt=Math.min(.05,(t-last)/1000);last=t;try{if(S.run)step(dt);
 if(!$('c3d').classList.contains('hidden'))draw3D();else draw()}catch(e){console.error(e);S.run=false;const d=$('hint');d.style.background='#7f1d1d';d.textContent='Помилка: '+e.message}
 requestAnimationFrame(loop)})(last);
 





