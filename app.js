<!DOCTYPE html>
<html lang="uk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>RoadCAD Lanes</title>
<style id="css">/*CSS-START*/
:root{--bg:#0f1520;--panel:rgba(24,30,42,.94);--panel2:#273043;--acc:#4f7cff;--acc2:#2b4fb3;--tx:#e8edf7;--mut:#8b97ad}
*{box-sizing:border-box}
html,body{margin:0;height:100%;overflow:hidden;background:var(--bg);color:var(--tx);font:13px/1.35 system-ui,Segoe UI,Roboto,sans-serif;user-select:none}
canvas#c2d{position:absolute;inset:0;width:100%;height:100%;z-index:0}
.hidden{display:none!important}
button{font:inherit;color:var(--tx);background:var(--panel2);border:1px solid #38445c;border-radius:8px;padding:6px 10px;cursor:pointer}
button:hover{background:#334057}
button.on,.seg button.on,.card.on{background:var(--acc2);border-color:var(--acc)}
/* верхня панель типів */
#top{position:absolute;top:0;left:0;right:0;height:54px;z-index:5;display:flex;align-items:center;gap:14px;padding:0 12px;background:var(--panel);border-bottom:1px solid #2b3447}
#brand{font-weight:700;letter-spacing:.3px;white-space:nowrap}
#cats{flex:1;display:flex;gap:6px;justify-content:center;flex-wrap:nowrap;overflow-x:auto}
#cats button{display:flex;flex-direction:column;align-items:center;gap:1px;min-width:92px;padding:5px 10px;font-size:12px}
#cats button .ic{font-size:20px;line-height:1}
#acts{display:flex;gap:6px}
#acts button{min-width:36px}
/* панель підтипів (динамічна) */
#sub{position:absolute;top:62px;left:250px;z-index:6;width:min(980px,calc(100vw - 270px));max-height:calc(100vh - 150px);overflow:auto;background:var(--panel);border:1px solid #34405a;border-radius:12px;padding:10px 12px;box-shadow:0 12px 40px rgba(0,0,0,.45)}
#subtitle{font-weight:600;margin:0 0 8px;color:var(--mut)}
.gt{margin:10px 0 6px;color:var(--mut);font-size:12px;text-transform:uppercase;letter-spacing:.6px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px}
.card{display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px;background:var(--panel2);border:1px solid #38445c;border-radius:10px;cursor:pointer;text-align:center;font-size:11.5px}
.card:hover{background:#334057}
.card canvas{width:100%;height:56px;border-radius:6px;display:block}
/* ліва панель інструментів */
#tools{position:absolute;left:12px;top:70px;z-index:4;width:224px;display:flex;flex-direction:column;gap:8px}
.grp{background:var(--panel);border:1px solid #2b3447;border-radius:12px;padding:8px 10px}
.row{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:5px 0}
.row label{color:var(--mut)}
.seg{display:flex}.seg button{border-radius:0;padding:5px 12px}.seg button:first-child{border-radius:8px 0 0 8px}.seg button:last-child{border-radius:0 8px 8px 0}
.sw{width:42px;height:22px;border-radius:12px;padding:0;position:relative}
.sw::after{content:"";position:absolute;top:2px;left:3px;width:16px;height:16px;border-radius:50%;background:#aab3c5;transition:.15s}
.sw.on::after{left:22px;background:#fff}
.wide{width:100%}
#mk-name{font-weight:600;margin-bottom:6px}
#mk-par input,#mk-par select{width:92px;background:#1a2231;color:var(--tx);border:1px solid #38445c;border-radius:6px;padding:4px 6px}
#mk-par input[type=range]{width:92px;padding:0}
#hint{position:absolute;left:12px;bottom:10px;max-width:calc(100vw - 24px);z-index:5;font-size:12px;color:var(--mut);background:rgba(15,21,32,.8);border-radius:8px;padding:5px 9px}
 
/*CSS-END*/</style>
<script>addEventListener("error",function(e){var t=e.target;if(t&&t.src&&/app\.js/.test(t.src)){document.body.insertAdjacentHTML("afterbegin","<pre style=\"position:fixed;top:0;left:0;right:0;z-index:99;margin:0;padding:10px;background:#7f1d1d;color:#fff;font:13px monospace\">Не знайдено app.js — покладіть його в одну папку з index.html (або відкрийте RoadCAD-single.html).</pre>")}},true)</script>
</head>
<body>
<canvas id="c2d"></canvas>
<header id="top">
  <div id="brand">🛣️ RoadCAD</div>
  <nav id="cats"></nav>
  <div id="acts">
    <button id="sim" title="Пуск / пауза трафіку">▶ Трафік</button>
    <button id="undo" title="Скасувати (Ctrl+Z)">↶</button>
    <button id="save" title="Зберегти у файл">💾</button>
    <button id="load" title="Відкрити файл">📂</button>
    <button id="clr" title="Очистити все (можна скасувати)">🗑️</button>
  </div>
</header>
<section id="sub" class="hidden"><div id="subtitle"></div><div id="subbody"></div></section>
<aside id="tools">
  <div class="grp" id="g-road">
    <div class="row"><label>Режим</label><div class="seg" id="s-mode"><button data-v="line" title="Пряма">╱</button><button data-v="spline" title="Крива">⌒</button></div></div>
    <div class="row"><label>Висота</label><div class="seg" id="s-level"><button data-v="-1" title="Тунель">⤓</button><button data-v="0" title="Земля">▬</button><button data-v="1" title="Міст">⤒</button></div></div>
    <div class="row"><label>Паралельно</label><button class="sw" id="t-par"></button></div>
    <div class="row"><label>Додавати смугу</label><button class="sw" id="t-mrg"></button></div>
  </div>
  <div class="grp" id="g-snap">
    <div class="row"><label>Сітка 40</label><button class="sw" id="t-grid"></button></div>
    <div class="row"><label>Прив'язка до смуг</label><button class="sw" id="t-snap"></button></div>
  </div>
  <div class="grp hidden" id="g-mark">
    <div id="mk-name"></div><div id="mk-par"></div>
    <div class="row"><button id="mk-erase" class="wide">🧽 Гумка розмітки</button></div>
  </div>
</aside>
<div id="hint">ЛКМ — точка · Enter/дубл.клік — завершити · Esc — скасувати · ПКМ+тягнути — панорама · колесо — масштаб · Alt+клік — аварія · Ctrl+Z — скасувати · [ ] — кут розмітки</div>
<input type="file" id="file" accept="application/json,.json" hidden>
<script src="app.js"></script>
</body></html>
