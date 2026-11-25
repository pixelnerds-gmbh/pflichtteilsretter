export const CLUSTERS = [
  {
    slug: 'grundlagen',
    name: 'Grundlagen',
    intro: 'Wer pflichtteilsberechtigt ist, wie hoch die Quote ist und was Sie nach einer Enterbung tun können.',
  },
  {
    slug: 'berechnung',
    name: 'Berechnung',
    intro: 'Wie der Pflichtteil berechnet wird, was zum Nachlass zählt und wie Immobilien bewertet werden.',
  },
  {
    slug: 'durchsetzung',
    name: 'Durchsetzung & Fristen',
    intro: 'Auskunft, Nachlassverzeichnis, Verjährung, Kosten: So kommen Sie an Ihr Geld.',
  },
  {
    slug: 'schenkungen',
    name: 'Schenkungen',
    intro: 'Pflichtteilsergänzung, 10-Jahres-Frist, Nießbrauch und Schenkungen an Ehegatten.',
  },
  {
    slug: 'erblasser',
    name: 'Für Erblasser',
    intro: 'Testament gestalten, Pflichtteilsverzicht, Berliner Testament: Was Erblasser wissen sollten.',
  },
  {
    slug: 'sonderfaelle',
    name: 'Sonderfälle',
    intro: 'Erbschaftsteuer, Patchwork, Auslandsbezug und andere besondere Konstellationen.',
  },
] as const;

export type ClusterSlug = (typeof CLUSTERS)[number]['slug'];
export const clusterBySlug = (s: string) => CLUSTERS.find((c) => c.slug === s)!;
