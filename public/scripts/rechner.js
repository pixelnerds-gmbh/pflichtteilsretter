/* Pflichtteilsrechner – läuft vollständig im Browser. Rechenkern: berechne() */
(function (root) {
  'use strict';

  // Gesetzlicher Erbteil der fragenden Person (vereinfachte Grundfälle)
  function erbteil(e) {
    var hinweise = [];
    var k = Math.max(0, Math.floor(e.kinder || 0));
    if (e.rolle === 'kind') {
      if (k < 1) k = 1;
      var s = 0;
      if (e.ehe === 'zugewinn') s = 1 / 2;
      else if (e.ehe === 'gemeinschaft') s = 1 / 4;
      else if (e.ehe === 'trennung') s = k === 1 ? 1 / 2 : k === 2 ? 1 / 3 : 1 / 4;
      return { quote: (1 - s) / k, hinweise: hinweise };
    }
    if (e.rolle === 'ehegatte') {
      var q;
      if (k >= 1) {
        q = e.gueter === 'trennung' ? (k === 1 ? 1 / 2 : k === 2 ? 1 / 3 : 1 / 4) : 1 / 4;
      } else if (e.eltern === 'keine') {
        q = 1;
      } else {
        q = 1 / 2;
      }
      if (e.gueter === 'zugewinn') {
        hinweise.push('Zugewinngemeinschaft: Als enterbter Ehegatte erhalten Sie den sogenannten kleinen Pflichtteil (berechnet) und können zusätzlich den tatsächlichen Zugewinnausgleich verlangen (§ 1371 Abs. 2 BGB). Der Zugewinnausgleich ist hier nicht berechnet und kann erheblich sein.');
      }
      if (k === 0 && e.eltern !== 'keine') {
        hinweise.push('Neben Großeltern oder bei besonderen Verwandtschaftsverhältnissen kann die Quote abweichen.');
      }
      return { quote: q, hinweise: hinweise };
    }
    if (e.rolle === 'elternteil') {
      if (k > 0) {
        return { quote: 0, hinweise: ['Eltern sind nicht pflichtteilsberechtigt, wenn die verstorbene Person Kinder oder Enkel hinterlässt (§ 2309 BGB).'] };
      }
      var se = 0;
      if (e.ehe === 'zugewinn') se = 3 / 4;
      else if (e.ehe === 'trennung' || e.ehe === 'gemeinschaft') se = 1 / 2;
      if (e.eltern === 'einer') {
        hinweise.push('Ist der andere Elternteil vorverstorben, geht sein Anteil auf dessen Kinder (Geschwister der verstorbenen Person) über; gibt es keine, erhöht sich Ihr Anteil. Berechnet ist der Fall mit Geschwistern.');
      }
      return { quote: (1 - se) / 2, hinweise: hinweise };
    }
    return { quote: 0, hinweise: hinweise };
  }

  // Abschmelzung nach § 2325 Abs. 3 BGB
  function faktor(schenkungsDatum, erbfallDatum, ausnahme) {
    if (!schenkungsDatum) return 1;
    var s = new Date(schenkungsDatum), t = new Date(erbfallDatum);
    if (isNaN(s) || isNaN(t) || s > t) return 0;
    if (ausnahme) return 1;
    // volle Jahre zwischen Schenkung und Erbfall
    var jahre = t.getFullYear() - s.getFullYear();
    if (t.getMonth() < s.getMonth() || (t.getMonth() === s.getMonth() && t.getDate() < s.getDate())) jahre--;
    if (jahre >= 10) return 0;
    return (10 - jahre) / 10;
  }

  function verjaehrung(erbfallDatum, heute) {
    if (!erbfallDatum) return null;
    var d = new Date(erbfallDatum);
    if (isNaN(d)) return null;
    var ende = new Date(d.getFullYear() + 3, 11, 31);
    var h = heute ? new Date(heute) : new Date();
    var tage = Math.round((ende - h) / 864e5);
    return { ende: ende, tage: tage };
  }

  function berechne(e) {
    var et = erbteil(e);
    var pq = et.quote / 2;
    var nachlass = Math.max(0, Number(e.nachlass) || 0);
    var erbfall = e.erbfall || new Date().toISOString().slice(0, 10);
    var hinweise = et.hinweise.slice();
    var zeilen = (e.schenkungen || []).filter(function (s) { return Number(s.wert) > 0; }).map(function (s) {
      var aus = !!(s.ehegatte || s.niessbrauch);
      var f = faktor(s.datum, erbfall, aus);
      return { wert: Number(s.wert), faktor: f, anrechenbar: Number(s.wert) * f, ausnahme: aus };
    });
    var summeSchenkungen = zeilen.reduce(function (a, z) { return a + z.anrechenbar; }, 0);
    if (zeilen.some(function (z) { return z.ausnahme; })) {
      hinweise.push('Bei Schenkungen an den Ehegatten oder mit vorbehaltenem Nießbrauch/Wohnrecht beginnt die 10-Jahres-Frist in der Regel nicht zu laufen; sie wurden voll angesetzt.');
    }
    if (e.rolle === 'ehegatte' && zeilen.some(function (z) { return z.ausnahme; })) {
      hinweise.push('Schenkungen, die Sie selbst erhalten haben, werden auf Ihren Ergänzungsanspruch angerechnet (§ 2327 BGB).');
    }
    var pflichtteil = pq * nachlass;
    var ergaenzung = pq * summeSchenkungen;
    return {
      erbteil: et.quote,
      pflichtteilsquote: pq,
      nachlass: nachlass,
      pflichtteil: pflichtteil,
      schenkungen: zeilen,
      ergaenzung: ergaenzung,
      gesamt: pflichtteil + ergaenzung,
      verjaehrung: verjaehrung(e.erbfall),
      hinweise: hinweise,
    };
  }

  function bruch(x) {
    if (x === 0) return '0';
    if (Math.abs(x - 1) < 1e-9) return '1';
    for (var d = 2; d <= 480; d++) {
      var n = Math.round(x * d);
      if (Math.abs(n / d - x) < 1e-9) return n + '/' + d;
    }
    return (x * 100).toFixed(2) + ' %';
  }

  var api = { berechne: berechne, faktor: faktor, erbteil: erbteil, bruch: bruch, verjaehrung: verjaehrung };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.Pflichtteil = api;

  if (typeof document === 'undefined') return;

  // ---------- UI ----------
  var form = document.getElementById('rechner');
  if (!form) return;
  var eur = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  var $ = function (s) { return form.querySelector(s); };
  var val = function (n) { var el = form.querySelector('input[name="' + n + '"]:checked'); return el ? el.value : null; };

  function updateVisibility() {
    var rolle = val('rolle');
    var kinder = Number($('#kinder').value) || 0;
    document.getElementById('f-ehe').classList.toggle('hidden', rolle === 'ehegatte');
    document.getElementById('f-gueter').classList.toggle('hidden', rolle !== 'ehegatte');
    var showEltern = rolle === 'elternteil' || (rolle === 'ehegatte' && kinder === 0);
    document.getElementById('f-eltern').classList.toggle('hidden', !showEltern);
    document.getElementById('eltern-keine-wrap').classList.toggle('hidden', rolle !== 'ehegatte');
    document.getElementById('kinder-hint').textContent =
      rolle === 'kind' ? '(einschließlich Ihnen; vorverstorbene Kinder mit eigenen Kindern mitzählen)' :
      rolle === 'elternteil' ? '(Eltern sind nur pflichtteilsberechtigt, wenn keine Kinder/Enkel vorhanden sind)' :
      '(auch Kinder aus früheren Beziehungen)';
    if (rolle === 'elternteil' && $('#kinder').value === '2') $('#kinder').value = '0';
  }
  form.addEventListener('change', updateVisibility);
  updateVisibility();

  // Nachlass aus Einzelposten
  var parts = form.querySelectorAll('.n-plus, .n-minus');
  parts.forEach(function (p) {
    p.addEventListener('input', function () {
      var sum = 0;
      form.querySelectorAll('.n-plus').forEach(function (x) { sum += Number(x.value) || 0; });
      form.querySelectorAll('.n-minus').forEach(function (x) { sum -= Number(x.value) || 0; });
      $('#nachlass').value = Math.max(0, sum);
    });
  });

  // Schenkungen
  var list = document.getElementById('schenkungen');
  var tpl = document.getElementById('tpl-schenkung');
  document.getElementById('add-schenkung').addEventListener('click', function () {
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector('.s-del').addEventListener('click', function () { node.remove(); });
    list.appendChild(node);
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var e = {
      rolle: val('rolle'), ehe: val('ehe'), gueter: val('gueter'), eltern: val('eltern'),
      kinder: Number($('#kinder').value) || 0,
      nachlass: Number($('#nachlass').value) || 0,
      erbfall: $('#erbfall').value || null,
      schenkungen: Array.prototype.map.call(list.children, function (c) {
        return {
          wert: c.querySelector('.s-wert').value, datum: c.querySelector('.s-datum').value,
          ehegatte: c.querySelector('.s-ehegatte').checked, niessbrauch: c.querySelector('.s-niess').checked,
        };
      }),
    };
    var r = berechne(e);
    var out = document.getElementById('ergebnis');
    var h = '';
    if (r.pflichtteilsquote === 0) {
      h += '<h2>Kein Pflichtteilsanspruch nach diesen Angaben</h2>';
    } else {
      h += '<p style="margin:0;opacity:.85">Ihr voraussichtlicher Anspruch</p><div class="big">' + eur.format(r.gesamt) + '</div>';
      h += '<table><tbody>';
      h += '<tr><td>Gesetzlicher Erbteil</td><td>' + bruch(r.erbteil) + '</td></tr>';
      h += '<tr><td>Pflichtteilsquote</td><td>' + bruch(r.pflichtteilsquote) + '</td></tr>';
      h += '<tr><td>Pflichtteil aus ' + eur.format(r.nachlass) + ' Nachlass</td><td>' + eur.format(r.pflichtteil) + '</td></tr>';
      r.schenkungen.forEach(function (z, i) {
        h += '<tr><td>Schenkung ' + (i + 1) + ': ' + eur.format(z.wert) + ' × ' + Math.round(z.faktor * 100) + ' %</td><td>+ ' + eur.format(z.anrechenbar * r.pflichtteilsquote) + '</td></tr>';
      });
      if (r.schenkungen.length) h += '<tr><td>Pflichtteilsergänzung gesamt</td><td>' + eur.format(r.ergaenzung) + '</td></tr>';
      h += '</tbody></table>';
    }
    if (r.verjaehrung) {
      var v = r.verjaehrung, endeStr = v.ende.toLocaleDateString('de-DE');
      if (v.tage < 0) h += '<div class="note"><strong>Achtung Verjährung:</strong> Wenn Sie im Jahr des Todesfalls davon erfahren haben, ist der Anspruch seit dem ' + endeStr + ' möglicherweise verjährt. Lassen Sie prüfen, ob die Verjährung gehemmt war.</div>';
      else if (v.tage < 365) h += '<div class="note"><strong>Frist läuft bald ab:</strong> Verjährung voraussichtlich am ' + endeStr + '. Handeln Sie jetzt.</div>';
      else h += '<div class="note">Verjährung voraussichtlich am ' + endeStr + ' (drei Jahre ab Jahresende der Kenntnis).</div>';
    }
    r.hinweise.forEach(function (t) { h += '<div class="note">' + t + '</div>'; });
    h += '<p class="small" style="opacity:.85;margin-top:14px">Unverbindliche Orientierung auf Basis Ihrer Angaben, keine Rechtsberatung. Bewertungsfragen, Anrechnungen und Sonderfälle können das Ergebnis deutlich verändern.</p>';
    h += '<a class="btn btn-cta" href="/anwalt-finden/#anfrage">Ergebnis von der Partnerkanzlei prüfen lassen</a>';
    out.innerHTML = h;
    out.classList.remove('hidden');
    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
    try {
      sessionStorage.setItem('ptr-rechner', 'Rechner-Ergebnis: ' + (r.pflichtteilsquote ? eur.format(r.gesamt) + ' (Quote ' + bruch(r.pflichtteilsquote) + ', Nachlass ' + eur.format(r.nachlass) + ')' : 'kein Anspruch') + '. Rolle: ' + e.rolle + (e.erbfall ? ', Todesfall: ' + e.erbfall : '') + '.');
    } catch (err) { /* ignore */ }
  });
})(typeof window !== 'undefined' ? window : globalThis);
