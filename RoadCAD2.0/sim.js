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
function leader(c){const lane=c.lane,a=gapAhead(lane,c.s,c);if(a.o||!lane.next.length)return a;
 if(!c.route||!lane.next.includes(c.route))c.route=pickNext(lane);
 const nx=c.route,rest=lane.len-c.s,f=nx.cars[0];
 if(f)return{o:f,gap:rest+f.s-bumper(f)};
 if(nx.next.length===1){const f2=nx.next[0].cars[0];if(f2)return{o:f2,gap:rest+nx.len+f2.s-bumper(f2)}}
 return a}

function spawnCars(){
 if(SIM.rev!==S.rev){SIM.spawnLanes=S.lanes.filter(l=>!l.conn&&!l.hasIn);SIM.rev=S.rev}
 const sp=SIM.spawnLanes;if(!sp.length||Math.random()>=SIM.spawnP||S.cars.length>=Math.min(SIM.maxCars,S.lanes.length*SIM.perLane))return;
 const l=sp[(Math.random()*sp.length)|0];if(l.cars[0]&&l.cars[0].s<40)return;
 const p=at(l,5);S.cars.push({lane:l,s:5,v:0,lat:0,col:`hsl(${Math.random()*360|0},60%,55%)`,vm:.8+Math.random()*.3,want:null,route:null,x:p.x,y:p.y,a:p.a})}

/** Перестроювання: обганяємо повільного лідера, якщо в сусідній смузі є вільне місце попереду й позаду. */
function tryLaneChange(c,L){
 for(const nb of c.lane.nb){const s2=c.s*nb.len/c.lane.len,f=gapAhead(nb,s2,null),bk=lastBehind(nb,s2);
  if(f.gap>L.gap+20&&f.gap>35&&!(bk&&s2-bk.s<34&&bk.v>c.v*.9)){c.want=nb;return}}}
function advanceLaneChange(c,dt){const nb=c.want,lw=PRESETS[roadOf(c.lane).pk].lw,tgt=-(nb.idx-c.lane.idx)*lw; // lat>0 — ліворуч
 c.lat+=Math.sign(tgt)*dt*40*(c.v>.1?1:0);
 if(Math.abs(c.lat)>=Math.abs(tgt)-.5){c.s=c.s*nb.len/c.lane.len;c.lane=nb;c.lat=0;c.want=null;c.route=null}}
/** Перехід на наступну смугу (до 4 коротких з'єднань за крок); немає продовження → авто зникає. */
function advanceLane(c){let g=0;while(c.s>=c.lane.len&&g++<4){const n=c.route&&c.lane.next.includes(c.route)?c.route:pickNext(c.lane);
 if(!n){c.dead=true;return}c.s-=c.lane.len;c.lane=n;c.route=null;c.lat=0;c.want=null}}

function updateCar(c,dt){
 const pr=PRESETS[roadOf(c.lane).pk],vmax=pr.v*c.vm,L=leader(c),dv=L.o?c.v-L.o.v:0;
 const sStar=12+Math.max(0,c.v*8+c.v*dv*8/(2*Math.sqrt(.06*.12)));
 const acc=.06*(1-Math.pow(c.v/vmax,4)-(L.o?Math.pow(sStar/Math.max(L.gap,1),2):0));
 c.v=Math.max(0,c.v+acc*dt*30);
 if(!c.want&&c.lane.nb.length&&L.o&&L.gap<60&&L.o.v<vmax*.7)tryLaneChange(c,L);
 if(c.want)advanceLaneChange(c,dt);
 c.s+=c.v*dt*60;if(c.s>=c.lane.len)advanceLane(c);if(c.dead)return;
 const p=at(c.lane,c.s);c.x=p.x+Math.sin(p.a)*c.lat;c.y=p.y-Math.cos(p.a)*c.lat;
 c.a+=(((p.a-c.a+Math.PI*3)%(Math.PI*2))-Math.PI)*.25}

/** Один фіксований крок симуляції. Мертві авто видаляються на місці (без нових масивів → менше GC). */
function step(dt){indexCars();spawnCars();const cs=S.cars;let w=0;for(let i=0;i<cs.length;i++){const c=cs[i];updateCar(c,dt);if(!c.dead)cs[w++]=c}cs.length=w}
