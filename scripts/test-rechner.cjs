// Testfälle für den Pflichtteilsrechner: npm test
const fs = require('fs'); const vm = require('vm'); const path = require('path');
const ctx = { console }; ctx.globalThis = ctx; ctx.window = ctx;
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../public/scripts/rechner.js'), 'utf8'), ctx);
const P = ctx.Pflichtteil;
const faelle = [
  ['Kind, Ehe Zugewinn, 2 Kinder, 400k + 100k an Ehefrau', { rolle: 'kind', ehe: 'zugewinn', kinder: 2, nachlass: 400000, erbfall: '2025-06-01', schenkungen: [{ wert: 100000, datum: '2021-12-01', ehegatte: true }] }, 62500],
  ['Kind, Schenkung an Dritten vor 3,5 J. (70 %)', { rolle: 'kind', ehe: 'zugewinn', kinder: 2, nachlass: 400000, erbfall: '2025-06-01', schenkungen: [{ wert: 100000, datum: '2021-12-01' }] }, 58750],
  ['Einzelkind, Erblasser ledig', { rolle: 'kind', ehe: 'nein', kinder: 1, nachlass: 100000 }, 50000],
  ['Kind, Gütertrennung, 2 Kinder', { rolle: 'kind', ehe: 'trennung', kinder: 2, nachlass: 300000 }, 50000],
  ['Ehegatte Zugewinn, 2 Kinder (kleiner PT 1/8)', { rolle: 'ehegatte', gueter: 'zugewinn', kinder: 2, nachlass: 400000 }, 50000],
  ['Ehegatte ohne Kinder, Eltern leben', { rolle: 'ehegatte', gueter: 'trennung', kinder: 0, eltern: 'beide', nachlass: 400000 }, 100000],
  ['Elternteil, Erblasser ledig', { rolle: 'elternteil', ehe: 'nein', kinder: 0, eltern: 'beide', nachlass: 200000 }, 50000],
  ['Elternteil, Erblasser verheiratet (Zugewinn)', { rolle: 'elternteil', ehe: 'zugewinn', kinder: 0, eltern: 'beide', nachlass: 400000 }, 25000],
  ['Elternteil, Erblasser hat Kinder -> 0', { rolle: 'elternteil', ehe: 'nein', kinder: 1, nachlass: 200000 }, 0],
  ['Ratgeber-Beispiel Berechnung (90.000)', { rolle: 'kind', ehe: 'nein', kinder: 2, nachlass: 300000, erbfall: '2025-06-01', schenkungen: [{ wert: 100000, datum: '2021-03-01' }] }, 90000],
  ['Ratgeber-Beispiel Ergänzung (45.000)', { rolle: 'kind', ehe: 'nein', kinder: 2, nachlass: 100000, erbfall: '2025-06-01', schenkungen: [{ wert: 200000, datum: '2019-02-01' }] }, 45000],
  ['Schenkung über 10 J.', { rolle: 'kind', ehe: 'nein', kinder: 1, nachlass: 0, erbfall: '2025-06-01', schenkungen: [{ wert: 100000, datum: '2015-05-01' }] }, 0],
  ['Schenkung 9 J. (10 %)', { rolle: 'kind', ehe: 'nein', kinder: 1, nachlass: 0, erbfall: '2025-06-01', schenkungen: [{ wert: 100000, datum: '2016-05-01' }] }, 5000],
];
let fail = 0;
for (const [name, e, exp] of faelle) {
  const r = P.berechne(e); const ok = Math.abs(r.gesamt - exp) < 0.01; if (!ok) fail++;
  console.log(ok ? 'OK  ' : 'FAIL', name, '→', Math.round(r.gesamt), '(erwartet', exp + ')');
}
process.exit(fail ? 1 : 0);
