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
/** Статичний малюнок одного рівня: мости/тротуари → асфальт → вузли → з'єднання → оздоблення → стрілки. */
function drawRoadLevel(lv){const R=S.roads.filter(r=>r.level===lv&&roadVisible(r));
 for(const r of R){const p=PRESETS[r.pk];if(lv>0){strokePath(r.dp,roadW(p)+22,'rgba(0,0,0,.35)');strokePath(r.dp,roadW(p)+8,BRC[p.br]||'#9ca3af')}if(sideW(p))strokePath(r.dp,roadW(p),p.swc||'#b8b8b0')}
 for(const r of R){const p=PRESETS[r.pk];strokePath(r.dp,carW(p),p.col);if(p.cul){const q=w2s(r.dp[r.dp.length-1]);ctx.fillStyle=p.col;ctx.beginPath();ctx.arc(q.x,q.y,carW(p)*.9*S.cam.z,0,7);ctx.fill()}}
 for(const n of S.nodes||[]){if(n.lv!==lv)continue;const q=w2s(n.c);ctx.fillStyle='#3b3f46';ctx.beginPath();ctx.arc(q.x,q.y,(n.T+4)*S.cam.z,0,7);ctx.fill()}
 for(const l of S.lanes)if(l.conn&&lvOf(l)===lv){const p=PRESETS[roadOf(l).pk];strokePath(l.pts,p.lw,p.col)}
 for(const r of R)deco(r,PRESETS[r.pk]);
 ctx.fillStyle='rgba(255,255,255,.85)';
 for(const l of S.lanes)if(!l.conn&&lvOf(l)===lv)for(let s=l.len*.5;s<l.len;s+=90){const p=at(l,s),q=w2s(p);ctx.save();ctx.translate(q.x,q.y);ctx.rotate(p.a);ctx.scale(S.cam.z,S.cam.z);
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
 if(S.rampMode&&S.rampPrev)strokePath(S.rampPrev.pts,30,'rgba(250,204,21,.6)');
 if(S.pts.length){const P=[...S.pts,S.mouse];strokePath($('mode').value==='spline'?catmull(P):P,roadW(PRESETS[S.preset]),'rgba(129,140,248,.5)')}}
function draw(){ctx=mainCtx;ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#14532d';ctx.fillRect(0,0,cv.width,cv.height);
 if(DR.rev!==S.rev){DR.lv=new Set(S.roads.map(r=>r.level));DR.rev=S.rev}
 for(const lv of [-1,0,1]){if(!DR.lv.has(lv))continue;ctx.globalAlpha=lv<0?.45:1;ctx.drawImage(renderLayer(lv).c,0,0);drawObstacles(lv);drawCars(lv);ctx.globalAlpha=1}
 drawOverlay()}
