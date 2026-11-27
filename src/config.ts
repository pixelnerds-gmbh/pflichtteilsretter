// Zentrale Angaben. Alles mit "TODO" vor dem Livegang ausfüllen bzw. prüfen.

export const SITE = {
  name: 'Pflichtteilsretter',
  url: 'https://pflichtteils-retter.de',
  claim: 'Ihr Pflichtteil ist Ihr Recht.',
  description:
    'Pflichtteil verständlich erklärt: Rechner, Quick-Check, Ratgeber und Musterschreiben. Mit fachlicher Prüfung durch unsere Partnerkanzlei.',
  email: 'info@pixelnerds.de', // auf info@pflichtteils-retter.de umstellen, sobald die Domain-Postfächer stehen
  // Suchmaschinen erst zum Livegang zulassen: in Netlify die Umgebungsvariable PUBLIC_LIVE=true setzen
  live: import.meta.env.PUBLIC_LIVE === 'true',
};

// Betreiber = Anbieter im Sinne von § 5 DDG (Angaben von pixelnerds.de/impressum)
export const BETREIBER = {
  firma: 'Pixelnerds GmbH',
  inhaber: 'Philip Leuchtenberg',
  strasse: 'Unterwallstraße 14',
  ort: '47441 Moers',
  telefon: '02841 7816780',
  email: 'info@pixelnerds.de',
  register: 'Registergericht Kleve, Handelsregister 13240',
  ustId: 'DE298216885',
  redaktion: 'Philip Leuchtenberg, Unterwallstraße 14, 47441 Moers',
};

// Partnerkanzlei (Angaben von rechtsanwaelte-gsp.de, Stand 25.11.2026)
export const KANZLEI = {
  name: 'Rechtsanwälte Scheidt Kalthoff', // für Überschriften und Labels
  nom: 'die Rechtsanwälte Scheidt Kalthoff', // im Satz: „… prüfen Ihren Fall“ (Plural!)
  dat: 'den Rechtsanwälten Scheidt Kalthoff', // „mit/von/bei …“
  akk: 'die Rechtsanwälte Scheidt Kalthoff', // „an …“
  rechtsform: 'Scheidt Kalthoff Rechtsanwälte PartG mbB',
  website: 'https://rechtsanwaelte-gsp.de',
  strasse: 'Koloniestraße 104',
  ort: '47057 Duisburg',
  telefon: '+49 203 70 90 360',
  telefonHref: '+492037090360',
  formularEmpfaenger: 'scheidt@rae-gsp.de', // in Netlify unter Forms → Notifications hinterlegt
  standorte: ['Duisburg (Hauptsitz)', 'Berlin', 'Bochum', 'Dortmund', 'Düsseldorf', 'Essen'],
  anwaelte: [
    { name: 'Matthias Kalthoff', rolle: 'Rechtsanwalt, Fachanwalt für Erbrecht, Partner' },
    { name: 'Lena Frescher', rolle: 'Rechtsanwältin, Fachanwältin für Erbrecht' },
    { name: 'Hannah Kluwig', rolle: 'Rechtsanwältin, Fachanwältin für Erbrecht' },
    { name: 'Mathias Scheidt', rolle: 'Rechtsanwalt, Fachanwalt für Steuerrecht, Geschäftsführender Partner' },
  ],
  // Erst auf true setzen, wenn die Kanzlei die Inhalte tatsächlich freigegeben hat.
  // Dann erscheint „Fachlich geprüft von …“ unter den Artikeln.
  inhalteGeprueft: false,
  pruefer: 'Matthias Kalthoff, Fachanwalt für Erbrecht', // TODO: von der Kanzlei bestätigen lassen
  schwerpunkte: [
    'Fachkanzlei für Erbrecht und Steuerrecht',
    'Pflichtteil durchsetzen oder unberechtigte Forderungen abwehren',
    'Auskunfts- und Wertermittlungsansprüche, Stufenklage',
    'Erbschaftsteuer im Pflichtteilsfall',
    'Lösungen zur Prozessfinanzierung',
  ],
  // Nur auf true setzen, wenn die Kanzlei das wirklich so anbietet:
  kostenloseErsteinschaetzung: false, // TODO: mit der Kanzlei klären
  antwortzeit: 'schnellstmöglich',
  bundesweit: true, // Videoberatung laut Kanzlei-Website
  bewertung: null as null | { quelle: string; url: string; wert: string; anzahl: number },
};

// Formular-Ziel. Standard: Netlify Forms. Alternativ eigener Endpoint (siehe README).
export const FORM = {
  provider: 'netlify' as 'netlify' | 'endpoint',
  endpoint: '', // z. B. https://kanzlei-crm.example/api/anfrage
};
