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
