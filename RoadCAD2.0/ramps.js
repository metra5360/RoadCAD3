'use strict';
/* З'ЇЗДИ / ЗАЇЗДИ: кут задає користувач; 0° — пряма рампа між рівнями (міст↔земля↔тунель). */
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
 const h=right?h0:h0+Math.PI,off=(right?laneOff(pr,0,pr.f-1):laneOff(pr,1,pr.b-1))+(r.sh||0),att={x:n.x-Math.sin(h0)*off,y:n.y+Math.cos(h0)*off};
 const th=$('rang').value*Math.PI/180,d=(+$('rlen').value)/2,exit=$('rkind').value==='exit';let P0,C,P2;
 if(exit){P0=att;C={x:att.x+Math.cos(h)*d,y:att.y+Math.sin(h)*d};P2={x:C.x+Math.cos(h+th)*d,y:C.y+Math.sin(h+th)*d}}
 else{C={x:att.x-Math.cos(h)*d,y:att.y-Math.sin(h)*d};P0={x:C.x-Math.cos(h-th)*d,y:C.y-Math.sin(h-th)*d};P2=att}
 const pts=[];for(let k=0;k<=16;k++){const t=k/16,u=1-t;pts.push({x:u*u*P0.x+2*u*t*C.x+t*t*P2.x,y:u*u*P0.y+2*u*t*C.y+t*t*P2.y})}
 return{r,n,pts,exit}}
const HINT0=$('hint').textContent;let hintT=0;
function toast(t){const d=$('hint');d.textContent=t;clearTimeout(hintT);hintT=setTimeout(()=>{d.textContent=HINT0;d.style.background=''},3500)}
function placeRamp(p){const g=rampAt(p);if(!g){toast('Наведіть курсор на дорогу зі смугами (з\'їзд ставиться біля неї; 0° — біля кінця дороги)');return}if(g.lv){S.roads.push({pts:g.pts,pk:g.pk,level:g.to,ramp:'level',sh:g.r.sh||0,from:g.r.level,attEnd:0,ys:[g.r.level*30,g.to*30]});buildGraph();return}const cur=PRESETS[S.preset],nm=g.exit?"З'їзд з магістралі":"В'їзд на магістраль";
 const pk=cur.f>0&&cur.b===0?S.preset:Object.keys(PRESETS).find(k=>PRESETS[k].n===nm);
 splitRoad(g.r,[g.n]);S.roads.push({pts:g.pts,pk,level:g.r.level,ramp:g.exit?'exit':'entry'});buildGraph();if(!S.roads[S.roads.length-1].linked)toast('Рампу поставлено, але вона не з\'єднана зі смугою. Спробуйте інше місце, далі від перехрестя.')}
$('ramp').onclick=()=>{S.rampMode=!S.rampMode;S.rampPrev=null;S.dirty=1;$('rampbox').classList.toggle('hidden',!S.rampMode);$('ramp').classList.toggle('ring-2',S.rampMode);S.pts=[]};
$('rang').oninput=()=>{const v=+$('rang').value;$('rangv').textContent=v+'°';$('rhint').textContent=v===0?'0° = пряма рампа міст↔земля (від кінця дороги)':''};
