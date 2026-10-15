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
