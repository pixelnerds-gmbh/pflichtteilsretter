// Zentrale Angaben. Alles mit "TODO" vor dem Livegang ausfüllen bzw. prüfen.

export const SITE = {
  name: 'Pflichtteilsretter',
  url: 'https://www.pflichtteilsretter.de',
  claim: 'Ihr Pflichtteil ist Ihr Recht.',
  description:
    'Pflichtteil verständlich erklärt: Rechner, Quick-Check, Ratgeber und Musterschreiben. Mit fachlicher Prüfung durch unsere Partnerkanzlei.',
  email: 'info@pflichtteilsretter.de',
};

// Betreiber = Anbieter im Sinne von § 5 DDG
export const BETREIBER = {
  firma: 'Pixelnerds', // TODO: vollständiger Firmenname inkl. Rechtsform
  inhaber: 'TODO: Vertretungsberechtigte Person(en)',
  strasse: 'TODO: Straße Hausnummer',
  ort: 'TODO: PLZ Ort',
  telefon: 'TODO: Telefon',
  email: 'TODO: E-Mail',
  register: '', // z. B. 'Amtsgericht Duisburg, HRB 12345' – leer lassen, falls nicht vorhanden
  ustId: '', // z. B. 'DE123456789'
  redaktion: 'TODO: Name, Anschrift (verantwortlich nach § 18 Abs. 2 MStV)',
};

// Partnerkanzlei – Angaben aus dem Prototyp übernommen, von GSP prüfen lassen
export const KANZLEI = {
  name: 'Rechtsanwälte GSP',
  website: 'https://www.rechtsanwaelte-gsp.de',
  strasse: 'Koloniestraße 104', // TODO prüfen
  ort: '47057 Duisburg', // TODO prüfen
  telefon: '+49 203 94 19 31 00', // TODO prüfen
  telefonHref: '+4920394193100',
  anwaelte: [
    // TODO: echte Anwälte eintragen; Fachanwaltstitel nur, wenn tatsächlich geführt
    { name: 'RA Scheidt', rolle: 'Rechtsanwalt, Schwerpunkt Erbrecht', pruefer: true },
  ],
  pruefer: 'RA Scheidt, Rechtsanwälte GSP', // erscheint als „Geprüft von“ unter Artikeln
  schwerpunkte: [
    'Pflichtteil und Pflichtteilsergänzung',
    'Auskunfts- und Wertermittlungsansprüche',
    'Außergerichtliche Einigung mit Erben',
    'Stufenklage und Prozessvertretung',
    'Gestaltung für Erblasser (Testament, Pflichtteilsverzicht)',
  ],
  // Nur auf true setzen, wenn GSP das wirklich so anbietet:
  kostenloseErsteinschaetzung: true, // TODO bestätigen
  antwortzeit: 'in der Regel innerhalb eines Werktags', // TODO bestätigen
  bundesweit: true, // TODO bestätigen
  bewertung: null as null | { quelle: string; url: string; wert: string; anzahl: number },
};

// Formular-Ziel. Standard: Netlify Forms. Alternativ eigener Endpoint (siehe README).
export const FORM = {
  provider: 'netlify' as 'netlify' | 'endpoint',
  endpoint: '', // z. B. https://kanzlei-crm.example/api/anfrage
};
