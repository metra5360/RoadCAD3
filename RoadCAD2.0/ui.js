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
 if(S.rampMode&&!e.altKey){placeRamp(p);return}
 if(e.altKey){let best=null,bd=40;for(const l of S.lanes)for(let s=0;s<l.len;s+=10){const q=at(l,s),d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;best={lane:l,s}}}if(best)S.obst.push(best);return}
 const g=40;S.pts.push({x:Math.round(p.x/g)*g,y:Math.round(p.y/g)*g})});
cv.addEventListener('mousemove',e=>{S.dirty=1;if(drag){S.cam.x=drag.cx-(e.clientX-drag.x)/S.cam.z;S.cam.y=drag.cy-(e.clientY-drag.y)/S.cam.z}
 const p=s2w(e.clientX,e.clientY);S.mouseRaw=p;if(S.rampMode)S.rampPrev=rampAt(p);S.mouse={x:Math.round(p.x/40)*40,y:Math.round(p.y/40)*40}});
addEventListener('mouseup',()=>drag=null);cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('dblclick',()=>{S.pts.pop();finish()});
cv.addEventListener('wheel',e=>{S.dirty=1;S.cam.z=Math.max(.3,Math.min(3,S.cam.z*(e.deltaY<0?1.1:.9)))});
addEventListener('keydown',e=>{S.dirty=1;if(e.key==='Enter')finish();if(e.key==='Escape')S.pts=[]});
$('sim').onclick=()=>{S.run=!S.run;$('sim').textContent=S.run?'⏸ Трафік':'▶ Трафік'};
$('clr').onclick=()=>{S.roads=[];S.pts=[];buildGraph()};
