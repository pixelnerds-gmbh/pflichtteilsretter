# Pflichtteilsretter

Ratgeber- und Vergleichsportal zum Pflichtteilsrecht. Betrieben von den Pixelnerds, in Kooperation mit Rechtsanwälte GSP.

Statische Website mit [Astro](https://astro.build): schnell, SEO-freundlich, ohne Datenbank.

## Lokal starten

```bash
npm install
npm run dev      # Entwicklungsserver auf http://localhost:4321
npm run build    # baut die fertige Seite nach dist/
npm test         # prüft den Pflichtteilsrechner mit Testfällen
```

## Wo was liegt

| Was | Datei |
| --- | --- |
| Betreiber-, Kanzlei- und Formular-Angaben | `src/config.ts` |
| Ratgeber-Artikel (Markdown) | `src/content/artikel/*.md` |
| Themencluster | `src/data/clusters.ts` |
| Glossar | `src/data/glossar.ts` |
| Pflichtteilsrechner (Rechenlogik + UI) | `public/scripts/rechner.js` |
| Quick-Check | `public/scripts/quickcheck.js` |
| Seiten | `src/pages/` |
| Design | `src/styles/global.css` |

## Neuen Artikel anlegen

Neue Datei in `src/content/artikel/`, Dateiname = URL-Slug (z. B. `pflichtteil-enkel.md`). Kopfbereich:

```yaml
---
title: "Pflichtteil der Enkel"
description: "Meta-Description, ca. 150 Zeichen"
cluster: grundlagen        # grundlagen | berechnung | durchsetzung | schenkungen | erblasser | sonderfaelle
order: 5                   # Reihenfolge
lesezeit: 5
stand: 2026-12-01
cta: rechner               # rechner | quickcheck | anfrage (Seitenleiste)
kurzantwort: "2–3 Sätze, die die Suchfrage direkt beantworten."
faq:
  - q: "Frage?"
    a: "Antwort."
verwandt: ["pflichtteil-kinder"]   # optional, Dateinamen ohne .md
---
```

Danach Fließtext in Markdown mit `##`-Überschriften (werden automatisch zum Inhaltsverzeichnis). Jeder Artikel braucht vor Veröffentlichung die fachliche Freigabe durch GSP.

## Vor dem Livegang (TODO)

- [ ] `src/config.ts`: Impressumsdaten der Pixelnerds, redaktionell Verantwortlicher
- [ ] `src/config.ts`: Anwälte von GSP, Prüfer-Name, Adresse/Telefon bestätigen, Fachanwaltstitel nur falls vorhanden
- [ ] Bestätigen: kostenlose Ersteinschätzung, Antwortzeit, bundesweit
- [ ] Echte Bewertungen (Quelle + Link) in `KANZLEI.bewertung` eintragen oder leer lassen
- [ ] Datenschutzerklärung an Hosting, Formular-Dienst und ggf. Analytics anpassen und prüfen lassen
- [ ] AV-Vertrag und Verschwiegenheitsvereinbarung GSP ↔ Pixelnerds
- [ ] Alle Artikel, Rechenlogik und Quick-Check fachlich durch GSP freigeben
- [ ] Domain verbinden, Google Search Console einrichten, Sitemap einreichen
- [ ] **Livegang:** in Netlify unter Site configuration → Environment variables `PUBLIC_LIVE` = `true` setzen und neu deployen. Ohne diese Variable ist jede Seite auf `noindex` (Schutz der Testversion).

## Hosting & Deployment

Empfohlen: Netlify (Konfiguration in `netlify.toml`). Repo verbinden, Build-Befehl `npm run build`, Verzeichnis `dist`. Jeder Push auf `main` geht automatisch live.

**Anfrageformular:** Standardmäßig über Netlify Forms (Benachrichtigung per E-Mail an GSP in den Netlify-Einstellungen hinterlegen). Bei anderem Hosting in `src/config.ts` `FORM.provider = 'endpoint'` setzen und `FORM.endpoint` auf einen eigenen Formular-Endpunkt der Kanzlei zeigen lassen. Wegen der Verschwiegenheit: Daten nicht dauerhaft bei den Pixelnerds speichern.

Alternativ funktionieren Cloudflare Pages, Vercel oder jeder Webserver (Inhalt von `dist/` hochladen).

## Rechtliche Leitplanken für Inhalte

- Die Kooperation mit GSP bleibt überall sichtbar (Kopfzeile, Footer, Anfrage, Über uns).
- Keine Begriffe wie „unabhängig“, „Testsieger“, „100 % Rechtssicherheit“, unbelegte Erfolgsquoten.
- Keine anderen Kanzleien namentlich bewerten.
- Pixelnerds beraten nicht im Einzelfall; individuelle Fragen gehen an GSP.
