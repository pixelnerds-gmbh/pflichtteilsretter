(function () {
  'use strict';
  var form = document.getElementById('qc');
  if (!form) return;
  var out = document.getElementById('qc-result');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var d = {};
    new FormData(form).forEach(function (v, k) { d[k] = v; });
    var fehlt = ['rolle', 'testament', 'zeit', 'schenkung', 'verzicht', 'kooperation'].filter(function (k) { return !d[k]; });
    if (fehlt.length) { alertBox('Bitte beantworten Sie alle Fragen.'); return; }

    var stufe = 'gruen', titel, text, schritte = [], links = [];

    if (d.rolle === 'andere') {
      stufe = 'rot-info';
      titel = 'Nach Ihren Angaben besteht kein Pflichtteilsrecht';
      text = 'Pflichtteilsberechtigt sind nur Kinder (und deren Abkömmlinge), Ehegatten bzw. eingetragene Lebenspartner und – wenn keine Kinder vorhanden sind – die Eltern. Geschwister und Lebensgefährten haben keinen Pflichtteil.';
      links.push(['/ratgeber/grundlagen/pflichtteil/', 'Wer pflichtteilsberechtigt ist']);
    } else if (d.verzicht === 'ja') {
      stufe = 'gelb';
      titel = 'Ein Pflichtteilsverzicht schließt den Anspruch meist aus';
      text = 'Ein notariell beurkundeter Pflichtteilsverzicht ist in der Regel wirksam. In Ausnahmefällen (z. B. sittenwidrige Umstände, Formfehler) lohnt eine Prüfung des Vertrags.';
      schritte.push('Verzichtsvertrag heraussuchen und prüfen lassen');
    } else if (d.testament === 'erbe') {
      stufe = 'gelb';
      titel = 'Als Erbe haben Sie grundsätzlich keinen Pflichtteil';
      text = 'Ist Ihr Erbteil kleiner als die Hälfte Ihres gesetzlichen Erbteils, steht Ihnen ein Zusatzpflichtteil zu (§ 2305 BGB). Bei Beschränkungen wie Testamentsvollstreckung kann auch das Ausschlagen sinnvoll sein – dafür gelten sehr kurze Fristen (meist sechs Wochen).';
      schritte.push('Ausschlagungsfrist prüfen (in der Regel 6 Wochen ab Kenntnis)');
      links.push(['/ratgeber/grundlagen/enterbt-was-tun/', 'Enterbt oder benachteiligt: was tun?']);
    } else {
      titel = 'Sie haben voraussichtlich einen Pflichtteilsanspruch';
      text = 'Nach Ihren Angaben sind Sie pflichtteilsberechtigt und wurden nicht oder nur gering bedacht.';
      if (d.testament === 'unklar') { stufe = 'gelb'; text += ' Klären Sie zuerst, ob ein Testament existiert und was darin steht (Nachlassgericht).'; }
      if (d.verzicht === 'unklar') { stufe = 'gelb'; schritte.push('Klären, ob ein Pflichtteilsverzicht existiert'); }
      schritte.push('Auskunft über den Nachlass schriftlich vom Erben verlangen (§ 2314 BGB)');
      schritte.push('Pflichtteil mit dem Rechner überschlagen');
      links.push(['/rechner/', 'Zum Pflichtteilsrechner']);
      links.push(['/ratgeber/durchsetzung/pflichtteil-einfordern/', 'Pflichtteil einfordern: Schritt für Schritt']);
    }

    if (d.rolle !== 'andere') {
      if (d.zeit === 'alt') {
        stufe = 'rot';
        titel = 'Dringend: Ihr Anspruch könnte bereits verjährt sein';
        text = 'Der Pflichtteil verjährt drei Jahre nach Ende des Jahres, in dem Sie vom Erbfall und Ihrer Enterbung erfahren haben. Ob die Verjährung gehemmt oder später begonnen hat, muss sofort geprüft werden.';
        schritte.unshift('Sofort anwaltlich prüfen lassen, ob noch Ansprüche bestehen');
        links.push(['/ratgeber/durchsetzung/pflichtteil-verjaehrung/', 'Verjährung des Pflichtteils']);
      } else if (d.zeit === 'mittel') {
        if (stufe !== 'rot-info') stufe = 'rot';
        titel = 'Handeln Sie jetzt: Die Verjährungsfrist läuft';
        schritte.unshift('Verjährungsende berechnen und Hemmung sichern (z. B. Klage, Mahnbescheid, Verhandlungen)');
        links.push(['/ratgeber/durchsetzung/pflichtteil-verjaehrung/', 'Verjährung des Pflichtteils']);
      }
      if (d.schenkung === 'ja' || d.schenkung === 'unklar') {
        schritte.push('Schenkungen der letzten 10 Jahre in die Auskunft einbeziehen (Pflichtteilsergänzung)');
        links.push(['/ratgeber/schenkungen/pflichtteilsergaenzung/', 'Pflichtteilsergänzung bei Schenkungen']);
      }
      if (d.kooperation === 'block' || d.kooperation === 'zaeh') {
        if (stufe === 'gruen') stufe = 'gelb';
        schritte.push('Notarielles Nachlassverzeichnis verlangen; bei Blockade Stufenklage');
        links.push(['/ratgeber/durchsetzung/nachlassverzeichnis/', 'Auskunftsanspruch und Nachlassverzeichnis']);
      }
    }

    var klasse = stufe === 'gruen' ? 'ampel-gruen' : stufe === 'gelb' ? 'ampel-gelb' : 'ampel-rot';
    var label = stufe === 'gruen' ? 'Grün' : stufe === 'gelb' ? 'Gelb: Details klären' : stufe === 'rot' ? 'Rot: Frist beachten' : 'Kein Anspruch';
    var h = '<div class="ampel ' + klasse + '"><span class="badge">' + label + '</span><h2 style="margin-top:10px">' + titel + '</h2><p>' + text + '</p>';
    if (schritte.length) h += '<h3>Ihre nächsten Schritte</h3><ol class="steps">' + schritte.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>';
    if (links.length) h += '<h3>Weiterlesen</h3><ul>' + links.map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + '</a></li>'; }).join('') + '</ul>';
    if (d.rolle !== 'andere') h += '<p style="margin-top:18px"><a class="btn btn-cta" href="/anwalt-finden/#anfrage">Fall von der Partnerkanzlei prüfen lassen</a></p>';
    h += '<p class="small muted" style="margin:12px 0 0">Allgemeine Einschätzung auf Basis Ihrer Angaben, keine Rechtsberatung.</p></div>';
    out.innerHTML = h;
    out.classList.remove('hidden');
    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
    try { sessionStorage.setItem('ptr-quickcheck', 'Quick-Check: ' + label + ' – ' + titel); } catch (e) { /* ignore */ }
  });
  function alertBox(t) {
    out.innerHTML = '<div class="ampel ampel-gelb"><p style="margin:0">' + t + '</p></div>';
    out.classList.remove('hidden');
  }
})();
