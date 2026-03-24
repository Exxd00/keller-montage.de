/**
 * MASSIVE pSEO DATA - Keller Montage
 * Generates 8,500+ landing pages
 */

// ===========================================
// SERVICE VARIATION TYPE
// ===========================================
export interface ServiceVariation {
  id: string;
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1Template: string;
  price: string;
  keywords: string[];
}

// ===========================================
// SERVICE VARIATIONS (13 variations)
// ===========================================
export const SERVICE_VARIATIONS: ServiceVariation[] = [
  {
    id: "kuechenmontage",
    slug: "kuechenmontage",
    name: "Küchenmontage",
    metaTitle: "Küchenmontage",
    metaDescription: "Professionelle Küchenmontage zum Festpreis in {city}. Komplette Installation inkl. Arbeitsplatten, Geräte, Wasser & Elektro.",
    h1Template: "Küchenmontage in {city}",
    price: "ab 149€",
    keywords: ["Küchenmontage", "Kücheneinbau", "Küche montieren"],
  },
  {
    id: "ikea-kuechenmontage",
    slug: "ikea-kuechenmontage",
    name: "IKEA Küchenmontage",
    metaTitle: "IKEA Küchenmontage",
    metaDescription: "IKEA METOD Küchenmontage vom Profi in {city}. Wir montieren Ihre IKEA Küche komplett inkl. aller Anschlüsse.",
    h1Template: "IKEA Küchenmontage in {city}",
    price: "ab 149€",
    keywords: ["IKEA Küchenmontage", "IKEA METOD Montage", "IKEA Küche aufbauen"],
  },
  {
    id: "moebelmontage",
    slug: "moebelmontage",
    name: "Möbelmontage",
    metaTitle: "Möbelmontage",
    metaDescription: "Professionelle Möbelmontage ab 59€ in {city}. IKEA, PAX, Betten, Schränke fachmännisch montiert.",
    h1Template: "Möbelmontage in {city}",
    price: "ab 59€",
    keywords: ["Möbelmontage", "Möbel aufbauen", "Möbelaufbau Service"],
  },
  {
    id: "pax-montage",
    slug: "pax-montage",
    name: "IKEA PAX Montage",
    metaTitle: "IKEA PAX Montage",
    metaDescription: "IKEA PAX Kleiderschrank Montage vom Profi in {city}. Installation mit Schiebetüren & Inneneinrichtung.",
    h1Template: "IKEA PAX Montage in {city}",
    price: "ab 79€",
    keywords: ["IKEA PAX Montage", "PAX Schrank aufbauen", "PAX Kleiderschrank"],
  },
  {
    id: "arbeitsplatten-montage",
    slug: "arbeitsplatten-montage",
    name: "Arbeitsplatten Montage",
    metaTitle: "Arbeitsplatten Montage & Zuschnitt",
    metaDescription: "Arbeitsplatten Montage in {city} inkl. Zuschnitt, Ausschnitte für Spüle & Kochfeld. Festpreis.",
    h1Template: "Arbeitsplatten Montage in {city}",
    price: "ab 99€",
    keywords: ["Arbeitsplatten Montage", "Arbeitsplatte zuschneiden"],
  },
  {
    id: "lieferung",
    slug: "lieferung",
    name: "Möbel Lieferung",
    metaTitle: "Möbel & Küchen Lieferung",
    metaDescription: "Lieferservice für Möbel & Küchen in {city}. Wir holen ab und liefern direkt zu Ihnen.",
    h1Template: "Möbel Lieferung in {city}",
    price: "ab 39€",
    keywords: ["Möbel Lieferung", "Küchen Lieferung", "IKEA Lieferung"],
  },
  {
    id: "schrankmontage",
    slug: "schrankmontage",
    name: "Schrankmontage",
    metaTitle: "Schrankmontage",
    metaDescription: "Professionelle Schrankmontage in {city}. Kleiderschränke, Einbauschränke & mehr.",
    h1Template: "Schrankmontage in {city}",
    price: "ab 59€",
    keywords: ["Schrankmontage", "Schrank aufbauen", "Kleiderschrank Montage"],
  },
  {
    id: "bettmontage",
    slug: "bettmontage",
    name: "Bettmontage",
    metaTitle: "Bettmontage",
    metaDescription: "Bettmontage in {city}: Boxspringbetten, Polsterbetten, IKEA Betten fachmännisch aufgebaut.",
    h1Template: "Bettmontage in {city}",
    price: "ab 49€",
    keywords: ["Bettmontage", "Bett aufbauen", "Boxspringbett Montage"],
  },
  {
    id: "einbaukueche-montage",
    slug: "einbaukueche-montage",
    name: "Einbauküche Montage",
    metaTitle: "Einbauküche Montage",
    metaDescription: "Komplette Einbauküche Montage in {city} inkl. aller Anschlüsse. Festpreis-Garantie.",
    h1Template: "Einbauküche Montage in {city}",
    price: "ab 199€",
    keywords: ["Einbauküche Montage", "Einbauküche aufbauen"],
  },
  {
    id: "kuechengeraete-installation",
    slug: "kuechengeraete-installation",
    name: "Küchengeräte Installation",
    metaTitle: "Küchengeräte Installation",
    metaDescription: "Küchengeräte Installation in {city}: Backofen, Herd, Spülmaschine, Kühlschrank & mehr.",
    h1Template: "Küchengeräte Installation in {city}",
    price: "ab 49€",
    keywords: ["Küchengeräte Installation", "Einbaugeräte Montage"],
  },
  {
    id: "nobilia-kuechenmontage",
    slug: "nobilia-kuechenmontage",
    name: "Nobilia Küchenmontage",
    metaTitle: "Nobilia Küchenmontage",
    metaDescription: "Nobilia Küchen professionell montiert in {city}. Spezialist für alle Nobilia Systeme.",
    h1Template: "Nobilia Küchenmontage in {city}",
    price: "ab 179€",
    keywords: ["Nobilia Montage", "Nobilia Küche aufbauen"],
  },
  {
    id: "kueche-demontage",
    slug: "kueche-demontage",
    name: "Küche Demontage",
    metaTitle: "Küchen Demontage & Abbau",
    metaDescription: "Alte Küche abbauen in {city}? Professionelle Demontage & Entsorgung Ihrer alten Küche.",
    h1Template: "Küchen Demontage in {city}",
    price: "ab 99€",
    keywords: ["Küche abbauen", "Küchen Demontage", "alte Küche entsorgen"],
  },
  {
    id: "express-montage",
    slug: "express-montage",
    name: "Express Montage",
    metaTitle: "Express Montage",
    metaDescription: "Express-Montage in {city}. Eilige Küchen- & Möbelmontage. Termin oft innerhalb 24h möglich.",
    h1Template: "Express Montage in {city}",
    price: "ab 199€",
    keywords: ["Express Montage", "schnelle Montage", "Notfall Montage"],
  },
];

// ===========================================
// BRAND TYPE
// ===========================================
export interface Brand {
  id: string;
  slug: string;
  name: string;
  fullName: string;
  description: string;
  products: string[];
}

// ===========================================
// BRANDS (8 brands)
// ===========================================
export const BRANDS: Brand[] = [
  {
    id: "ikea",
    slug: "ikea-montage",
    name: "IKEA",
    fullName: "IKEA Möbel & Küchen",
    description: "Spezialist für IKEA: METOD Küchen, PAX Schränke, BESTA, KALLAX und mehr.",
    products: ["METOD", "PAX", "BESTA", "KALLAX", "MALM", "HEMNES", "BILLY"],
  },
  {
    id: "nobilia",
    slug: "nobilia-montage",
    name: "Nobilia",
    fullName: "Nobilia Küchen",
    description: "Erfahrener Nobilia Küchenmonteur für alle Nobilia Systeme.",
    products: ["Nobilia Küchen", "Nobilia Fronten", "Nobilia Schränke"],
  },
  {
    id: "nolte",
    slug: "nolte-montage",
    name: "Nolte",
    fullName: "Nolte Küchen",
    description: "Nolte Küchenmontage vom Profi. Alle Nolte Systeme.",
    products: ["Nolte Küchen", "Nolte Matrix", "Nolte Grifflos"],
  },
  {
    id: "poco",
    slug: "poco-montage",
    name: "POCO",
    fullName: "POCO Möbel",
    description: "POCO Möbelmontage: Küchen, Schränke und mehr.",
    products: ["POCO Küchen", "POCO Schränke", "POCO Möbel"],
  },
  {
    id: "roller",
    slug: "roller-montage",
    name: "Roller",
    fullName: "Roller Möbel",
    description: "Roller Möbelmontage. Aufbau aller Roller Produkte.",
    products: ["Roller Küchen", "Roller Möbel", "Roller Schränke"],
  },
  {
    id: "xxxlutz",
    slug: "xxxlutz-montage",
    name: "XXXLutz",
    fullName: "XXXLutz Möbel",
    description: "XXXLutz Möbelmontage: Küchen, Schlafzimmer, Wohnzimmer.",
    products: ["XXXLutz Küchen", "XXXLutz Möbel"],
  },
  {
    id: "segmueller",
    slug: "segmueller-montage",
    name: "Segmüller",
    fullName: "Segmüller Möbel & Küchen",
    description: "Segmüller Montage Service für Küchen und Möbel.",
    products: ["Segmüller Küchen", "Segmüller Möbel"],
  },
  {
    id: "huelsta",
    slug: "huelsta-montage",
    name: "Hülsta",
    fullName: "Hülsta Möbel",
    description: "Hülsta Möbelmontage. Premium-Service für hochwertige Möbel.",
    products: ["Hülsta Schränke", "Hülsta Betten", "Hülsta Wohnwände"],
  },
];

// ===========================================
// NEIGHBORHOOD TYPE
// ===========================================
export interface Neighborhood {
  name: string;
  slug: string;
  plz: string;
}

// ===========================================
// NÜRNBERG NEIGHBORHOODS (59)
// ===========================================
export const NUERNBERG_NEIGHBORHOODS: Neighborhood[] = [
  { name: "Altstadt", slug: "nuernberg-altstadt", plz: "90403" },
  { name: "Gostenhof", slug: "nuernberg-gostenhof", plz: "90429" },
  { name: "St. Johannis", slug: "nuernberg-st-johannis", plz: "90419" },
  { name: "St. Leonhard", slug: "nuernberg-st-leonhard", plz: "90439" },
  { name: "Maxfeld", slug: "nuernberg-maxfeld", plz: "90409" },
  { name: "Gibitzenhof", slug: "nuernberg-gibitzenhof", plz: "90443" },
  { name: "Schweinau", slug: "nuernberg-schweinau", plz: "90431" },
  { name: "Sündersbühl", slug: "nuernberg-sundersbuhl", plz: "90439" },
  { name: "Glockenhof", slug: "nuernberg-glockenhof", plz: "90478" },
  { name: "Steinbühl", slug: "nuernberg-steinbuhl", plz: "90443" },
  { name: "Galgenhof", slug: "nuernberg-galgenhof", plz: "90459" },
  { name: "Hasenbuck", slug: "nuernberg-hasenbuck", plz: "90461" },
  { name: "Gleißhammer", slug: "nuernberg-gleisshammer", plz: "90461" },
  { name: "Dutzendteich", slug: "nuernberg-dutzendteich", plz: "90471" },
  { name: "Mögeldorf", slug: "nuernberg-moegeldorf", plz: "90482" },
  { name: "Laufamholz", slug: "nuernberg-laufamholz", plz: "90482" },
  { name: "Zerzabelshof", slug: "nuernberg-zerzabelshof", plz: "90480" },
  { name: "Jobst", slug: "nuernberg-jobst", plz: "90482" },
  { name: "Erlenstegen", slug: "nuernberg-erlenstegen", plz: "90491" },
  { name: "Schoppershof", slug: "nuernberg-schoppershof", plz: "90489" },
  { name: "Thon", slug: "nuernberg-thon", plz: "90425" },
  { name: "Almoshof", slug: "nuernberg-almoshof", plz: "90427" },
  { name: "Buchenbühl", slug: "nuernberg-buchenbuhl", plz: "90411" },
  { name: "Ziegelstein", slug: "nuernberg-ziegelstein", plz: "90411" },
  { name: "Leyh", slug: "nuernberg-leyh", plz: "90431" },
  { name: "Eberhardshof", slug: "nuernberg-eberhardshof", plz: "90429" },
  { name: "Muggenhof", slug: "nuernberg-muggenhof", plz: "90429" },
  { name: "Doos", slug: "nuernberg-doos", plz: "90427" },
  { name: "Wetzendorf", slug: "nuernberg-wetzendorf", plz: "90425" },
  { name: "Schniegling", slug: "nuernberg-schniegling", plz: "90427" },
  { name: "Kraftshof", slug: "nuernberg-kraftshof", plz: "90427" },
  { name: "Neunhof", slug: "nuernberg-neunhof", plz: "90427" },
  { name: "Boxdorf", slug: "nuernberg-boxdorf", plz: "90427" },
  { name: "Großgründlach", slug: "nuernberg-grossgruendlach", plz: "90427" },
  { name: "Eibach", slug: "nuernberg-eibach", plz: "90451" },
  { name: "Reichelsdorf", slug: "nuernberg-reichelsdorf", plz: "90453" },
  { name: "Katzwang", slug: "nuernberg-katzwang", plz: "90453" },
  { name: "Kornburg", slug: "nuernberg-kornburg", plz: "90455" },
  { name: "Worzeldorf", slug: "nuernberg-worzeldorf", plz: "90455" },
  { name: "Pillenreuth", slug: "nuernberg-pillenreuth", plz: "90459" },
  { name: "Gartenstadt", slug: "nuernberg-gartenstadt", plz: "90469" },
  { name: "Werderau", slug: "nuernberg-werderau", plz: "90441" },
  { name: "Gebersdorf", slug: "nuernberg-gebersdorf", plz: "90449" },
  { name: "Röthenbach", slug: "nuernberg-roethenbach", plz: "90449" },
];

// ===========================================
// ERLANGEN NEIGHBORHOODS (14)
// ===========================================
export const ERLANGEN_NEIGHBORHOODS: Neighborhood[] = [
  { name: "Altstadt", slug: "erlangen-altstadt", plz: "91054" },
  { name: "Innenstadt", slug: "erlangen-innenstadt", plz: "91052" },
  { name: "Anger", slug: "erlangen-anger", plz: "91052" },
  { name: "Bruck", slug: "erlangen-bruck", plz: "91058" },
  { name: "Büchenbach", slug: "erlangen-buechenbach", plz: "91056" },
  { name: "Eltersdorf", slug: "erlangen-eltersdorf", plz: "91058" },
  { name: "Frauenaurach", slug: "erlangen-frauenaurach", plz: "91056" },
  { name: "Häusling", slug: "erlangen-haeusling", plz: "91056" },
  { name: "Kosbach", slug: "erlangen-kosbach", plz: "91056" },
  { name: "Sieglitzhof", slug: "erlangen-sieglitzhof", plz: "91054" },
  { name: "Tennenlohe", slug: "erlangen-tennenlohe", plz: "91058" },
];

// ===========================================
// FÜRTH NEIGHBORHOODS (14)
// ===========================================
export const FUERTH_NEIGHBORHOODS: Neighborhood[] = [
  { name: "Altstadt", slug: "fuerth-altstadt", plz: "90762" },
  { name: "Innenstadt", slug: "fuerth-innenstadt", plz: "90762" },
  { name: "Südstadt", slug: "fuerth-suedstadt", plz: "90763" },
  { name: "Hardhöhe", slug: "fuerth-hardhoehe", plz: "90768" },
  { name: "Ronhof", slug: "fuerth-ronhof", plz: "90765" },
  { name: "Poppenreuth", slug: "fuerth-poppenreuth", plz: "90765" },
  { name: "Stadeln", slug: "fuerth-stadeln", plz: "90765" },
  { name: "Dambach", slug: "fuerth-dambach", plz: "90768" },
  { name: "Unterfarrnbach", slug: "fuerth-unterfarrnbach", plz: "90768" },
  { name: "Oberfürberg", slug: "fuerth-oberfuerberg", plz: "90768" },
  { name: "Burgfarrnbach", slug: "fuerth-burgfarrnbach", plz: "90768" },
  { name: "Vach", slug: "fuerth-vach", plz: "90768" },
];

// ===========================================
// USE CASE TYPE
// ===========================================
export interface UseCase {
  id: string;
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

// ===========================================
// USE CASES (8)
// ===========================================
export const USE_CASES: UseCase[] = [
  {
    id: "neubau-kueche",
    slug: "neubau-kuechenmontage",
    name: "Neubau Küchenmontage",
    description: "Küchenmontage für Neubau und Erstbezug.",
    keywords: ["Neubau Küche", "Erstbezug Küchenmontage"],
  },
  {
    id: "umzug-kueche",
    slug: "umzug-kuechenmontage",
    name: "Umzug Küchenmontage",
    description: "Küche abbauen, transportieren und aufbauen.",
    keywords: ["Umzug Küche", "Küche umziehen"],
  },
  {
    id: "renovierung",
    slug: "renovierung-kuechenmontage",
    name: "Renovierung Küchenmontage",
    description: "Neue Küche bei Renovierung.",
    keywords: ["Renovierung Küche", "Küchenrenovierung"],
  },
  {
    id: "wochenende",
    slug: "wochenend-montage",
    name: "Wochenend-Montage",
    description: "Montage auch am Wochenende.",
    keywords: ["Wochenende Montage", "Samstag Montage"],
  },
  {
    id: "abends",
    slug: "abend-montage",
    name: "Abend-Montage",
    description: "Montage nach Feierabend.",
    keywords: ["Abend Montage", "Feierabend Montage"],
  },
  {
    id: "senioren",
    slug: "senioren-montageservice",
    name: "Senioren Montageservice",
    description: "Freundlicher Service für Senioren.",
    keywords: ["Senioren Montage", "Montage für Rentner"],
  },
  {
    id: "gewerbe",
    slug: "gewerbe-kuechenmontage",
    name: "Gewerbe Küchenmontage",
    description: "Küchenmontage für Gewerbe.",
    keywords: ["Gewerbeküche", "Büroküche Montage"],
  },
  {
    id: "grossauftrag",
    slug: "grossauftrag-montage",
    name: "Großaufträge",
    description: "Großaufträge für Bauträger & Vermieter.",
    keywords: ["Großauftrag Montage", "Bauträger Küchenmontage"],
  },
];

// ===========================================
// LONG-TAIL KEYWORD TYPE
// ===========================================
export interface LongTailKeyword {
  slug: string;
  question: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
}

// ===========================================
// LONG-TAIL KEYWORDS (10)
// ===========================================
export const LONG_TAIL_KEYWORDS: LongTailKeyword[] = [
  {
    slug: "was-kostet-kuechenmontage",
    question: "Was kostet Küchenmontage?",
    h1: "Was kostet Küchenmontage in {city}?",
    metaTitle: "Was kostet Küchenmontage in {city}? Preise 2026",
    metaDescription: "Küchenmontage Preise: Ab 149€ Festpreis in {city}.",
  },
  {
    slug: "ikea-kueche-aufbauen-lassen-kosten",
    question: "IKEA Küche aufbauen lassen Kosten",
    h1: "IKEA Küche aufbauen lassen Kosten in {city}",
    metaTitle: "IKEA Küche aufbauen lassen Kosten {city}",
    metaDescription: "IKEA Küche aufbauen lassen ab 149€ in {city}.",
  },
  {
    slug: "kuechenmonteur-in-der-naehe",
    question: "Küchenmonteur in der Nähe",
    h1: "Küchenmonteur in der Nähe von {city}",
    metaTitle: "Küchenmonteur in der Nähe von {city}",
    metaDescription: "Küchenmonteur in {city}. Termin in 24h.",
  },
  {
    slug: "moebelmontage-in-der-naehe",
    question: "Möbelmontage in der Nähe",
    h1: "Möbelmontage in der Nähe von {city}",
    metaTitle: "Möbelmontage in der Nähe von {city}",
    metaDescription: "Möbelmontage ab 59€ in {city}.",
  },
  {
    slug: "wer-baut-ikea-kuechen-auf",
    question: "Wer baut IKEA Küchen auf?",
    h1: "Wer baut IKEA Küchen auf in {city}?",
    metaTitle: "Wer baut IKEA Küchen auf in {city}?",
    metaDescription: "IKEA Küchen Aufbau Service in {city}.",
  },
  {
    slug: "pax-schrank-aufbauen-lassen",
    question: "PAX Schrank aufbauen lassen",
    h1: "IKEA PAX aufbauen lassen in {city}",
    metaTitle: "IKEA PAX aufbauen lassen {city}",
    metaDescription: "IKEA PAX ab 79€ in {city}.",
  },
  {
    slug: "arbeitsplatte-zuschneiden-lassen",
    question: "Arbeitsplatte zuschneiden lassen",
    h1: "Arbeitsplatte zuschneiden in {city}",
    metaTitle: "Arbeitsplatte zuschneiden {city}",
    metaDescription: "Arbeitsplatte zuschneiden und montieren in {city}.",
  },
  {
    slug: "kuechenmontage-festpreis",
    question: "Küchenmontage Festpreis",
    h1: "Küchenmontage zum Festpreis in {city}",
    metaTitle: "Küchenmontage Festpreis {city}",
    metaDescription: "Küchenmontage ab 149€ Festpreis in {city}.",
  },
  {
    slug: "kueche-anschliessen-lassen",
    question: "Küche anschließen lassen",
    h1: "Küche anschließen lassen in {city}",
    metaTitle: "Küche anschließen lassen {city}",
    metaDescription: "Küche anschließen: Wasser & Strom in {city}.",
  },
  {
    slug: "guenstige-kuechenmontage",
    question: "Günstige Küchenmontage",
    h1: "Günstige Küchenmontage in {city}",
    metaTitle: "Günstige Küchenmontage {city}",
    metaDescription: "Günstige Küchenmontage ab 149€ in {city}.",
  },
];

// ===========================================
// ALL NEIGHBORHOODS
// ===========================================
export const ALL_NEIGHBORHOODS: Neighborhood[] = [
  ...NUERNBERG_NEIGHBORHOODS,
  ...ERLANGEN_NEIGHBORHOODS,
  ...FUERTH_NEIGHBORHOODS,
];
