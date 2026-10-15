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
function trimPoly(P,a,b){const L=mkLane(P);if(L.len<a+b+12)return P;const o=[at(L,a)];for(let i=1;i<P.length-1;i++)if(L.cum[i]>a&&L.cum[i]<L.len-b)o.push(P[i]);o.push(at(L,L.len-b));return o.map(p=>({x:p.x,y:p.y}))}
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
function addRoad(pts,pk,lv,sp,nm){let c=sp?catmull(pts):pts.map(p=>({...p}));if(!nm&&tryMerge(c,pk,lv))return;
 for(const k of [0,c.length-1]){const e=c[k];let hit=false;const same=S.roads.filter(r=>r.level===lv);
  for(const r of same){for(const q of [r.pts[0],r.pts[r.pts.length-1]])if(dist(e,q)<30){c[k]={x:q.x,y:q.y};hit=true;break}if(hit)break}
  if(!hit)for(const r of same){const n=nearestOn(r.pts,e);if(n.d<roadW(PRESETS[r.pk])/2+14){c[k]={x:n.x,y:n.y};splitRoad(r,[n]);break}}}
 const cuts=[];
 const cb=bboxOf(c);for(const r of S.roads.filter(x=>x.level===lv)){const rc=[];if(!bbHit(cb,r.bb||(r.bb=bboxOf(r.pts))))continue; // відсікання за bbox
  for(let i=0;i<c.length-1;i++)for(let j=0;j<r.pts.length-1;j++){const h=segInt(c[i],c[i+1],r.pts[j],r.pts[j+1]);if(h){cuts.push({i,t:h.t,x:h.x,y:h.y});rc.push({i:j,t:h.u,x:h.x,y:h.y})}}
  if(rc.length)splitRoad(r,rc)}
 for(const p of cutPoly(c,cuts))S.roads.push({pts:p,pk,level:lv});buildGraph()}
function buildGraph(){const eLv=(ri,e)=>{const r=S.roads[ri];return r.from!==undefined&&e===r.attEnd?r.from:r.level};S.lanes=[];S.cars=[];S.obst=[];S.roads.forEach(r=>r.t0=r.t1=0);
 const eps=[];S.roads.forEach((r,i)=>[0,1].forEach(e=>{if((r.ramp==='exit'||r.ramp==='entry')&&e===(r.ramp==='exit'?0:1))return;eps.push({r:i,e,p:e?r.pts[r.pts.length-1]:r.pts[0]})}));
 // Вузли: кластеризація кінців доріг одного рівня через сітку (замість O(n²))
 const nodes=[],grid=new Map(),CELL=28;
 for(const q of eps){const rq=S.roads[q.r],lvq=rq.from!==undefined&&q.e===rq.attEnd?rq.from:rq.level,gx=Math.floor(q.p.x/CELL),gy=Math.floor(q.p.y/CELL);let n=null;
  for(let dx=-1;dx<=1&&!n;dx++)for(let dy=-1;dy<=1&&!n;dy++){const b=grid.get(lvq+':'+(gx+dx)+':'+(gy+dy));if(b)n=b.find(m=>dist(m.c,q.p)<14)||null}
  if(!n){n={lv:lvq,c:{x:q.p.x,y:q.p.y},m:[]};nodes.push(n);const k=lvq+':'+gx+':'+gy;(grid.get(k)||grid.set(k,[]).get(k)).push(n)}n.m.push(q)}
 S.nodes=nodes.filter(n=>n.m.length>1);
 for(const n of S.nodes){n.mw=Math.max(...n.m.map(q=>roadW(PRESETS[S.roads[q.r].pk])));n.T=n.m.length>2?n.mw*.5+10:4;n.m.forEach(q=>S.roads[q.r]['t'+q.e]=n.T)}
 S.roads.forEach((r,ri)=>{const pr=PRESETS[r.pk],m=pr.med/2;r.dp=r.sh?offsetLine(r.pts,r.sh):r.pts;r.tp=trimPoly(r.dp,r.t0,r.t1);
  const mk=(d,rev,idx)=>{const Q=offsetLine(r.tp,d);if(rev)Q.reverse();const l=mkLane(Q);Object.assign(l,{road:ri,dir:rev?-1:1,idx,nl:rev?pr.b:pr.f,next:[],nb:[]});S.lanes.push(l)};
  for(let i=0;i<pr.f;i++)mk(laneOff(pr,0,i),0,i);for(let i=0;i<pr.b;i++)mk(laneOff(pr,1,i),1,i)});
 S.lanes=S.lanes.filter(l=>l.len>=1&&l.pts.length>1); // відкидаємо виродженi смуги (краш at())
 const conns=[],wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
 // З'єднання смуг на вузлах: беремо кандидатів із хешу кінців/початків, а не всі пари смуг
 const endH=new SpatialHash(128),startH=new SpatialHash(128);for(const l of S.lanes){endH.add(l.pts[l.pts.length-1],l);startH.add(l.pts[0],l)}
 for(const n of S.nodes){const R=n.mw/2+40,As=endH.query(n.c,R),Bs=startH.query(n.c,R);
  for(const a of As){if(eLv(a.road,a.dir>0?1:0)!==n.lv||dist(a.pts[a.pts.length-1],n.c)>R)continue;
   for(const b of Bs){if(b.road===a.road||eLv(b.road,b.dir>0?0:1)!==n.lv||dist(b.pts[0],n.c)>R)continue;
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
 // Сусідні смуги одного напрямку (для перестроювання): групуємо за дорогою+напрямком
 const grp=new Map();for(const l of S.lanes){if(l.conn)continue;const k=l.road*3+l.dir+1;(grp.get(k)||grp.set(k,[]).get(k)).push(l)}
 for(const g of grp.values())for(const a of g)for(const b of g)if(Math.abs(a.idx-b.idx)===1)a.nb.push(b);
 S.rev++;S.dirty=1}