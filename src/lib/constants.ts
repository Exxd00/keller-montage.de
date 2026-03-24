/**
 * Business Information
 */
export const BUSINESS = {
  name: "KELLER",
  tagline: "DIE KÜCHENWELT",
  fullName: "KELLER – DIE KÜCHENWELT",
  companyName: "Keller Group GmbH",
  owner: "Kamo Keller",
  directors: "Kamo Keller und Koryun Ayrapetyan",
  domain: "keller-montage.de",
  phone: "+4991189314510",
  phoneDisplay: "0911 893 145 10",
  whatsapp: "491602255443",
  whatsappDisplay: "0160 2255443",
  whatsappMessage: "Hallo, ich interessiere mich für Ihre Dienstleistungen.",
  email: "info@keller-montage.de",
  address: "Hans Bunte Straße 26",
  postalCode: "90431",
  city: "Nürnberg",
  region: "Bayern",
  country: "Deutschland",
  fullAddress: "Hans Bunte Straße 26, 90431 Nürnberg",
  handelsregister: "Handelsregister B des Amtsgerichts Nürnberg unter Nummer 39667",
  ustIdNr: "DE352535508",
  serviceRadius: "Umgebung",
  openingHours: {
    weekdays: "Montag bis Freitag: 10:00 - 18:00",
    weekend: "Samstag & Sonntag: geschlossen",
    display: "Mo-Fr: 10:00 - 18:00",
  },
  description:
    "Professionelle Küchenmontage in Nürnberg und Umgebung. Ihr Spezialist für IKEA METOD und individuelle Küchenlösungen.",
  taglineServices: ["Küchenmontage", "Möbelmontage", "Lieferung"],
};

/**
 * Navigation Links
 */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/staedte", label: "Städte" },
  { href: "/arbeiten", label: "Arbeiten" },
  { href: "/kontakt", label: "Kontakt" },
];

/**
 * All Cities in the service area around Nürnberg
 */
export const ALL_CITIES = [
  // Nürnberg & direkte Umgebung (0-15km)
  { name: "Nürnberg", slug: "nuernberg", region: "Mittelfranken", distance: 0 },
  { name: "Fürth", slug: "fuerth", region: "Mittelfranken", distance: 7 },
  { name: "Erlangen", slug: "erlangen", region: "Mittelfranken", distance: 17 },
  { name: "Schwabach", slug: "schwabach", region: "Mittelfranken", distance: 14 },
  { name: "Zirndorf", slug: "zirndorf", region: "Mittelfranken", distance: 10 },
  { name: "Oberasbach", slug: "oberasbach", region: "Mittelfranken", distance: 8 },
  { name: "Stein", slug: "stein", region: "Mittelfranken", distance: 9 },
  { name: "Herzogenaurach", slug: "herzogenaurach", region: "Mittelfranken", distance: 22 },
  { name: "Langenzenn", slug: "langenzenn", region: "Mittelfranken", distance: 20 },
  { name: "Cadolzburg", slug: "cadolzburg", region: "Mittelfranken", distance: 15 },
  { name: "Kornburg", slug: "kornburg", region: "Mittelfranken", distance: 12 },
  { name: "Reichelsdorf", slug: "reichelsdorf", region: "Mittelfranken", distance: 8 },
  { name: "Eibach", slug: "eibach", region: "Mittelfranken", distance: 7 },
  { name: "Mögeldorf", slug: "moegeldorf", region: "Mittelfranken", distance: 5 },

  // Nürnberger Land (15-40km)
  { name: "Lauf an der Pegnitz", slug: "lauf-an-der-pegnitz", region: "Nürnberger Land", distance: 20 },
  { name: "Altdorf bei Nürnberg", slug: "altdorf-bei-nuernberg", region: "Nürnberger Land", distance: 22 },
  { name: "Hersbruck", slug: "hersbruck", region: "Nürnberger Land", distance: 30 },
  { name: "Feucht", slug: "feucht", region: "Nürnberger Land", distance: 15 },
  { name: "Röthenbach an der Pegnitz", slug: "roethenbach-an-der-pegnitz", region: "Nürnberger Land", distance: 18 },
  { name: "Schwarzenbruck", slug: "schwarzenbruck", region: "Nürnberger Land", distance: 20 },
  { name: "Burgthann", slug: "burgthann", region: "Nürnberger Land", distance: 22 },
  { name: "Winkelhaid", slug: "winkelhaid", region: "Nürnberger Land", distance: 18 },
  { name: "Happurg", slug: "happurg", region: "Nürnberger Land", distance: 32 },
  { name: "Pommelsbrunn", slug: "pommelsbrunn", region: "Nürnberger Land", distance: 35 },
  { name: "Engelthal", slug: "engelthal", region: "Nürnberger Land", distance: 28 },
  { name: "Offenhausen", slug: "offenhausen", region: "Nürnberger Land", distance: 25 },
  { name: "Schnaittach", slug: "schnaittach", region: "Nürnberger Land", distance: 35 },
  { name: "Simmelsdorf", slug: "simmelsdorf", region: "Nürnberger Land", distance: 38 },
  { name: "Vorra", slug: "vorra", region: "Nürnberger Land", distance: 33 },
  { name: "Reichenschwand", slug: "reichenschwand", region: "Nürnberger Land", distance: 28 },

  // Mittelfranken (20-100km)
  { name: "Ansbach", slug: "ansbach", region: "Mittelfranken", distance: 42 },
  { name: "Roth", slug: "roth", region: "Mittelfranken", distance: 25 },
  { name: "Wendelstein", slug: "wendelstein", region: "Mittelfranken", distance: 15 },
  { name: "Hilpoltstein", slug: "hilpoltstein", region: "Mittelfranken", distance: 35 },
  { name: "Weißenburg", slug: "weissenburg", region: "Mittelfranken", distance: 50 },
  { name: "Gunzenhausen", slug: "gunzenhausen", region: "Mittelfranken", distance: 55 },
  { name: "Neustadt an der Aisch", slug: "neustadt-an-der-aisch", region: "Mittelfranken", distance: 40 },
  { name: "Bad Windsheim", slug: "bad-windsheim", region: "Mittelfranken", distance: 45 },
  { name: "Treuchtlingen", slug: "treuchtlingen", region: "Mittelfranken", distance: 65 },
  { name: "Georgensgmünd", slug: "georgensmuend", region: "Mittelfranken", distance: 30 },
  { name: "Abenberg", slug: "abenberg", region: "Mittelfranken", distance: 28 },
  { name: "Heilsbronn", slug: "heilsbronn", region: "Mittelfranken", distance: 30 },
  { name: "Windsbach", slug: "windsbach", region: "Mittelfranken", distance: 32 },
  { name: "Spalt", slug: "spalt", region: "Mittelfranken", distance: 32 },
  { name: "Thalmässing", slug: "thalmaessing", region: "Mittelfranken", distance: 40 },
  { name: "Pleinfeld", slug: "pleinfeld", region: "Mittelfranken", distance: 45 },
  { name: "Ellingen", slug: "ellingen", region: "Mittelfranken", distance: 48 },
  { name: "Pappenheim", slug: "pappenheim", region: "Mittelfranken", distance: 60 },
  { name: "Weißenburg in Bayern", slug: "weissenburg-in-bayern", region: "Mittelfranken", distance: 50 },
  { name: "Dinkelsbühl", slug: "dinkelsbuehl", region: "Mittelfranken", distance: 75 },
  { name: "Feuchtwangen", slug: "feuchtwangen", region: "Mittelfranken", distance: 65 },
  { name: "Rothenburg ob der Tauber", slug: "rothenburg-ob-der-tauber", region: "Mittelfranken", distance: 80 },
  { name: "Uffenheim", slug: "uffenheim", region: "Mittelfranken", distance: 55 },
  { name: "Leutershausen", slug: "leutershausen", region: "Mittelfranken", distance: 55 },
  { name: "Herrieden", slug: "herrieden", region: "Mittelfranken", distance: 48 },
  { name: "Wolframs-Eschenbach", slug: "wolframs-eschenbach", region: "Mittelfranken", distance: 38 },
  { name: "Lichtenau", slug: "lichtenau", region: "Mittelfranken", distance: 38 },
  { name: "Sachsen bei Ansbach", slug: "sachsen-bei-ansbach", region: "Mittelfranken", distance: 45 },
  { name: "Bechhofen", slug: "bechhofen", region: "Mittelfranken", distance: 60 },
  { name: "Lehrberg", slug: "lehrberg", region: "Mittelfranken", distance: 50 },
  { name: "Colmberg", slug: "colmberg", region: "Mittelfranken", distance: 52 },
  { name: "Burgoberbach", slug: "burgoberbach", region: "Mittelfranken", distance: 50 },
  { name: "Merkendorf", slug: "merkendorf", region: "Mittelfranken", distance: 45 },
  { name: "Ornbau", slug: "ornbau", region: "Mittelfranken", distance: 48 },

  // Fürther Land
  { name: "Veitsbronn", slug: "veitsbronn", region: "Fürth Land", distance: 12 },
  { name: "Seukendorf", slug: "seukendorf", region: "Fürth Land", distance: 15 },
  { name: "Puschendorf", slug: "puschendorf", region: "Fürth Land", distance: 18 },
  { name: "Tuchenbach", slug: "tuchenbach", region: "Fürth Land", distance: 14 },
  { name: "Wilhermsdorf", slug: "wilhermsdorf", region: "Fürth Land", distance: 25 },
  { name: "Großhabersdorf", slug: "grosshabersdorf", region: "Fürth Land", distance: 20 },
  { name: "Roßtal", slug: "rosstal", region: "Fürth Land", distance: 18 },
  { name: "Ammerndorf", slug: "ammerndorf", region: "Fürth Land", distance: 22 },

  // Erlangen-Höchstadt
  { name: "Höchstadt an der Aisch", slug: "hoechstadt-an-der-aisch", region: "Erlangen-Höchstadt", distance: 28 },
  { name: "Adelsdorf", slug: "adelsdorf", region: "Erlangen-Höchstadt", distance: 25 },
  { name: "Vestenbergsgreuth", slug: "vestenbergsgreuth", region: "Erlangen-Höchstadt", distance: 30 },
  { name: "Mühlhausen", slug: "muehlhausen", region: "Erlangen-Höchstadt", distance: 32 },
  { name: "Eckental", slug: "eckental", region: "Erlangen-Höchstadt", distance: 18 },
  { name: "Heroldsberg", slug: "heroldsberg", region: "Erlangen-Höchstadt", distance: 12 },
  { name: "Uttenreuth", slug: "uttenreuth", region: "Erlangen-Höchstadt", distance: 20 },
  { name: "Buckenhof", slug: "buckenhof", region: "Erlangen-Höchstadt", distance: 18 },
  { name: "Spardorf", slug: "spardorf", region: "Erlangen-Höchstadt", distance: 17 },
  { name: "Marloffstein", slug: "marloffstein", region: "Erlangen-Höchstadt", distance: 20 },
  { name: "Bubenreuth", slug: "bubenreuth", region: "Erlangen-Höchstadt", distance: 18 },
  { name: "Baiersdorf", slug: "baiersdorf", region: "Erlangen-Höchstadt", distance: 20 },
  { name: "Möhrendorf", slug: "moehrendorf", region: "Erlangen-Höchstadt", distance: 18 },
  { name: "Hemhofen", slug: "hemhofen", region: "Erlangen-Höchstadt", distance: 22 },
  { name: "Röttenbach", slug: "roettenbach", region: "Erlangen-Höchstadt", distance: 22 },
  { name: "Lonnerstadt", slug: "lonnerstadt", region: "Erlangen-Höchstadt", distance: 30 },
  { name: "Wachenroth", slug: "wachenroth", region: "Erlangen-Höchstadt", distance: 35 },

  // Oberfranken (40-100km)
  { name: "Forchheim", slug: "forchheim", region: "Oberfranken", distance: 30 },
  { name: "Bamberg", slug: "bamberg", region: "Oberfranken", distance: 55 },
  { name: "Ebermannstadt", slug: "ebermannstadt", region: "Oberfranken", distance: 40 },
  { name: "Hirschaid", slug: "hirschaid", region: "Oberfranken", distance: 40 },
  { name: "Pegnitz", slug: "pegnitz", region: "Oberfranken", distance: 55 },
  { name: "Bayreuth", slug: "bayreuth", region: "Oberfranken", distance: 75 },
  { name: "Hallstadt", slug: "hallstadt", region: "Oberfranken", distance: 58 },
  { name: "Strullendorf", slug: "strullendorf", region: "Oberfranken", distance: 50 },
  { name: "Bischberg", slug: "bischberg", region: "Oberfranken", distance: 55 },
  { name: "Gundelsheim", slug: "gundelsheim", region: "Oberfranken", distance: 52 },
  { name: "Eggolsheim", slug: "eggolsheim", region: "Oberfranken", distance: 35 },
  { name: "Buttenheim", slug: "buttenheim", region: "Oberfranken", distance: 42 },
  { name: "Pretzfeld", slug: "pretzfeld", region: "Oberfranken", distance: 38 },
  { name: "Gößweinstein", slug: "goessweinstein", region: "Oberfranken", distance: 48 },
  { name: "Pottenstein", slug: "pottenstein", region: "Oberfranken", distance: 52 },
  { name: "Waischenfeld", slug: "waischenfeld", region: "Oberfranken", distance: 55 },
  { name: "Ebermannstadt", slug: "ebermannstadt", region: "Oberfranken", distance: 40 },
  { name: "Wiesenttal", slug: "wiesenttal", region: "Oberfranken", distance: 42 },
  { name: "Ahorntal", slug: "ahorntal", region: "Oberfranken", distance: 50 },
  { name: "Hetzles", slug: "hetzles", region: "Oberfranken", distance: 25 },
  { name: "Effeltrich", slug: "effeltrich", region: "Oberfranken", distance: 25 },
  { name: "Poxdorf", slug: "poxdorf", region: "Oberfranken", distance: 28 },
  { name: "Pinzberg", slug: "pinzberg", region: "Oberfranken", distance: 32 },
  { name: "Weilersbach", slug: "weilersbach", region: "Oberfranken", distance: 35 },
  { name: "Kirchehrenbach", slug: "kirchehrenbach", region: "Oberfranken", distance: 35 },
  { name: "Leutenbach", slug: "leutenbach", region: "Oberfranken", distance: 32 },
  { name: "Kunreuth", slug: "kunreuth", region: "Oberfranken", distance: 30 },
  { name: "Dormitz", slug: "dormitz", region: "Oberfranken", distance: 22 },
  { name: "Kleinsendelbach", slug: "kleinsendelbach", region: "Oberfranken", distance: 20 },
  { name: "Neunkirchen am Brand", slug: "neunkirchen-am-brand", region: "Oberfranken", distance: 22 },

  // Oberpfalz (30-100km)
  { name: "Neumarkt in der Oberpfalz", slug: "neumarkt-in-der-oberpfalz", region: "Oberpfalz", distance: 40 },
  { name: "Amberg", slug: "amberg", region: "Oberpfalz", distance: 65 },
  { name: "Sulzbach-Rosenberg", slug: "sulzbach-rosenberg", region: "Oberpfalz", distance: 55 },
  { name: "Velburg", slug: "velburg", region: "Oberpfalz", distance: 55 },
  { name: "Parsberg", slug: "parsberg", region: "Oberpfalz", distance: 60 },
  { name: "Berching", slug: "berching", region: "Oberpfalz", distance: 50 },
  { name: "Freystadt", slug: "freystadt", region: "Oberpfalz", distance: 45 },
  { name: "Pyrbaum", slug: "pyrbaum", region: "Oberpfalz", distance: 35 },
  { name: "Postbauer-Heng", slug: "postbauer-heng", region: "Oberpfalz", distance: 35 },
  { name: "Berg bei Neumarkt", slug: "berg-bei-neumarkt", region: "Oberpfalz", distance: 42 },
  { name: "Dietfurt an der Altmühl", slug: "dietfurt-an-der-altmuehl", region: "Oberpfalz", distance: 65 },
  { name: "Seubersdorf in der Oberpfalz", slug: "seubersdorf-in-der-oberpfalz", region: "Oberpfalz", distance: 55 },
  { name: "Deining", slug: "deining", region: "Oberpfalz", distance: 48 },
  { name: "Mühlhausen", slug: "muehlhausen-oberpfalz", region: "Oberpfalz", distance: 45 },
  { name: "Lauterhofen", slug: "lauterhofen", region: "Oberpfalz", distance: 50 },
  { name: "Pilsach", slug: "pilsach", region: "Oberpfalz", distance: 45 },
  { name: "Sengenthal", slug: "sengenthal", region: "Oberpfalz", distance: 42 },
  { name: "Berngau", slug: "berngau", region: "Oberpfalz", distance: 40 },

  // Schwaben (80-100km)
  { name: "Donauwörth", slug: "donauwoerth", region: "Schwaben", distance: 90 },
  { name: "Nördlingen", slug: "noerdlingen", region: "Schwaben", distance: 85 },
  { name: "Oettingen in Bayern", slug: "oettingen-in-bayern", region: "Schwaben", distance: 75 },
  { name: "Harburg", slug: "harburg", region: "Schwaben", distance: 85 },
  { name: "Monheim", slug: "monheim", region: "Schwaben", distance: 80 },
  { name: "Wemding", slug: "wemding", region: "Schwaben", distance: 78 },

  // Oberbayern (80-100km)
  { name: "Ingolstadt", slug: "ingolstadt", region: "Oberbayern", distance: 85 },
  { name: "Eichstätt", slug: "eichstaett", region: "Oberbayern", distance: 70 },
  { name: "Beilngries", slug: "beilngries", region: "Oberbayern", distance: 65 },
  { name: "Kinding", slug: "kinding", region: "Oberbayern", distance: 60 },
  { name: "Kipfenberg", slug: "kipfenberg", region: "Oberbayern", distance: 65 },
  { name: "Denkendorf", slug: "denkendorf", region: "Oberbayern", distance: 58 },
  { name: "Altmannstein", slug: "altmannstein", region: "Oberbayern", distance: 75 },
  { name: "Stammham", slug: "stammham", region: "Oberbayern", distance: 82 },

  // Unterfranken (60-100km)
  { name: "Würzburg", slug: "wuerzburg", region: "Unterfranken", distance: 95 },
  { name: "Kitzingen", slug: "kitzingen", region: "Unterfranken", distance: 75 },
  { name: "Ochsenfurt", slug: "ochsenfurt", region: "Unterfranken", distance: 85 },
  { name: "Marktbreit", slug: "marktbreit", region: "Unterfranken", distance: 70 },
  { name: "Iphofen", slug: "iphofen", region: "Unterfranken", distance: 62 },
  { name: "Mainbernheim", slug: "mainbernheim", region: "Unterfranken", distance: 65 },
  { name: "Schwarzach am Main", slug: "schwarzach-am-main", region: "Unterfranken", distance: 68 },
  { name: "Dettelbach", slug: "dettelbach", region: "Unterfranken", distance: 72 },
  { name: "Volkach", slug: "volkach", region: "Unterfranken", distance: 78 },
  { name: "Gerolzhofen", slug: "gerolzhofen", region: "Unterfranken", distance: 85 },

  // Weitere Mittelfranken Städte
  { name: "Dietenhofen", slug: "dietenhofen", region: "Mittelfranken", distance: 35 },
  { name: "Neuendettelsau", slug: "neuendettelsau", region: "Mittelfranken", distance: 38 },
  { name: "Petersaurach", slug: "petersaurach", region: "Mittelfranken", distance: 35 },
  { name: "Vestenbergsgreuth", slug: "vestenbergsgreuth-mfr", region: "Mittelfranken", distance: 32 },
  { name: "Emskirchen", slug: "emskirchen", region: "Mittelfranken", distance: 28 },
  { name: "Diespeck", slug: "diespeck", region: "Mittelfranken", distance: 30 },
  { name: "Burgbernheim", slug: "burgbernheim", region: "Mittelfranken", distance: 42 },
  { name: "Markt Erlbach", slug: "markt-erlbach", region: "Mittelfranken", distance: 28 },
  { name: "Neuhof an der Zenn", slug: "neuhof-an-der-zenn", region: "Mittelfranken", distance: 24 },
  { name: "Obernzenn", slug: "obernzenn", region: "Mittelfranken", distance: 35 },
  { name: "Flachslanden", slug: "flachslanden", region: "Mittelfranken", distance: 38 },
  { name: "Lehrberg", slug: "lehrberg-mfr", region: "Mittelfranken", distance: 45 },
  { name: "Burk", slug: "burk", region: "Mittelfranken", distance: 40 },
  { name: "Büchenbach", slug: "buechenbach", region: "Mittelfranken", distance: 28 },
  { name: "Aurach", slug: "aurach", region: "Mittelfranken", distance: 42 },
  { name: "Weidenbach", slug: "weidenbach", region: "Mittelfranken", distance: 45 },
];

/**
 * Main Cities - Hauptstädte (most important)
 */
export const MAIN_CITIES = [
  { name: "Nürnberg", slug: "nuernberg", region: "Mittelfranken" },
  { name: "Fürth", slug: "fuerth", region: "Mittelfranken" },
  { name: "Erlangen", slug: "erlangen", region: "Mittelfranken" },
  { name: "Schwabach", slug: "schwabach", region: "Mittelfranken" },
  { name: "Ansbach", slug: "ansbach", region: "Mittelfranken" },
  { name: "Forchheim", slug: "forchheim", region: "Oberfranken" },
  { name: "Bamberg", slug: "bamberg", region: "Oberfranken" },
  { name: "Bayreuth", slug: "bayreuth", region: "Oberfranken" },
  { name: "Neumarkt in der Oberpfalz", slug: "neumarkt-in-der-oberpfalz", region: "Oberpfalz" },
  { name: "Roth", slug: "roth", region: "Mittelfranken" },
  { name: "Lauf an der Pegnitz", slug: "lauf-an-der-pegnitz", region: "Nürnberger Land" },
  { name: "Herzogenaurach", slug: "herzogenaurach", region: "Mittelfranken" },
];

/**
 * Services - KÜCHENMONTAGE ZUERST als Hauptleistung
 */
export const SERVICES = [
  {
    id: "kuechenmontage",
    slug: "kuechenmontage",
    name: "Küchenmontage",
    shortName: "Küchenmontage",
    description:
      "Komplette Kücheninstallation, Anpassungen, Geräte, Wasser & Elektro",
    price: "ab 149€",
    priceValue: 149,
    icon: "kitchen",
    popular: true, // Hauptleistung
    badge: "Hauptleistung",
    features: [
      "Komplette Küchenmontage",
      "Arbeitsplatten Anpassung",
      "Geräte Installation",
      "Wasser & Elektro Anschluss",
      "IKEA METOD Spezialist",
    ],
    examples: "z.B.: IKEA Küche, METOD System, Küchenzeile, Eckküche",
  },
  {
    id: "moebelmontage",
    slug: "moebelmontage",
    name: "Möbelmontage",
    shortName: "Möbelmontage",
    description:
      "IKEA, PAX, Betten, Schränke und weitere Möbel professionell montiert",
    price: "ab 59€",
    priceValue: 59,
    icon: "wrench",
    features: [
      "Aufbau aller Möbelarten",
      "IKEA & PAX Spezialist",
      "Werkzeug inklusive",
      "Verpackungsentsorgung",
      "Professionelle Ausführung",
    ],
    examples: "z.B.: PAX Schrank, KALLAX Regal, MALM Bett, Büromöbel",
  },
  {
    id: "lieferungen",
    slug: "lieferungen",
    name: "Abholung & Lieferung",
    shortName: "Lieferung",
    description: "Abholung vom Möbelhaus und Lieferung bis in die Wohnung",
    price: "ab 39€",
    priceValue: 39,
    icon: "truck",
    features: [
      "Abholung direkt vom Möbelhaus",
      "Transport bis in die Wohnung",
      "Treppen & Aufzug inklusive",
      "Sichere Verpackung",
      "Expresslieferung möglich",
    ],
    examples:
      "z.B.: IKEA Abholung, Sofa Transport, Matratzen Lieferung, Same-Day Service",
  },
];

/**
 * Price Examples
 */
export const PRICE_EXAMPLES = [
  { service: "IKEA Küche (10 Schränke)", price: "ab 349€", duration: "~1 Tag" },
  { service: "Küchenzeile komplett", price: "ab 249€", duration: "~6 Std." },
  { service: "PAX Schrank (2m)", price: "ab 89€", duration: "~2 Std." },
  { service: "KALLAX Regal", price: "ab 35€", duration: "~30 Min." },
  { service: "MALM Bett (160cm)", price: "ab 59€", duration: "~1 Std." },
  { service: "Lieferung + Montage PAX", price: "ab 149€", duration: "~3 Std." },
];

/**
 * Features / Benefits - Fokus auf Küchenmontage
 */
export const FEATURES = [
  {
    title: "Fachgerechte Küchenmontage",
    description:
      "Präzise Installation Ihrer Küche inkl. Geräte, Wasser- und Elektroanschluss",
    icon: "kitchen",
  },
  {
    title: "Saubere Ausführung",
    description:
      "Ordentliche, professionelle Arbeit ohne Chaos – wir hinterlassen Ihre Küche bezugsfertig",
    icon: "wrench",
  },
  {
    title: "Erfahrenes Team",
    description:
      "Über 12 Jahre Erfahrung mit IKEA METOD und individuellen Küchenlösungen",
    icon: "users",
  },
];

export const BENEFITS = [
  "Fachgerechte Küchenmontage mit Erfahrung",
  "Saubere und präzise Ausführung",
  "Transparente Festpreise ohne versteckte Kosten",
  "Schnelle Terminvergabe in Nürnberg und Umgebung",
  "Erfahrung mit IKEA METOD und individuellen Küchenlösungen",
  "Rechnung mit ausgewiesener MwSt.",
];

/**
 * Steps - Fokus auf Küchenmontage
 */
export const STEPS = [
  {
    number: 1,
    title: "Anfrage senden",
    description: "Gerne mit Fotos oder Infos zu Ihrer Küche",
  },
  {
    number: 2,
    title: "Festpreis-Angebot",
    description: "Innerhalb von 24 Stunden transparent und verbindlich",
  },
  {
    number: 3,
    title: "Termin & Montage",
    description: "Professionelle, saubere Küchenmontage vor Ort",
  },
];

/**
 * Testimonials - Echte Google Maps Bewertungen
 */
export const TESTIMONIALS = [
  {
    text: "Ich bin sehr glücklich über meine neue Küche! Von der ersten Beratung bis hin zum Einbau war alles perfekt. Frau Salgin hat mich mit ihrem Engagement und ihren Fachkenntnisse bei der Entscheidung zum Kauf der Küche klasse unterstützt.",
    author: "Christianna Flesch",
    location: "Nürnberg",
    rating: 5,
    category: "Küche",
    link: "https://maps.app.goo.gl/1AZYifnbpUjHLGJu9",
  },
  {
    text: "Ich habe vor einigen Wochen meine absolute Traumküche hier erworben. Der Services sowie die ganzen Mitarbeiter sind super hilfsbereit und sehr nett. Alles ist reibungslos verlaufen ohne Probleme.",
    author: "Jessica Stein",
    location: "Nürnberg",
    rating: 5,
    category: "Küche",
    link: "https://maps.app.goo.gl/oPgo3w9uWFFaTfc66",
  },
  {
    text: "Sehr nettes und kompetentes Personal, die Beratung war top. Die ausgestellten Beispielküchen in den verschiedenen Preisklassen waren eine super Inspiration für unsere Traumküche. Nur zu empfehlen.",
    author: "Akın Gürkan",
    location: "Nürnberg",
    rating: 5,
    category: "Küche",
    link: "https://maps.app.goo.gl/eTvFfCY5rTNwC8po7",
  },
];

/**
 * FAQs - Küchenmontage priorisiert
 */
export const FAQS = [
  {
    question: "Was kostet die Küchenmontage wirklich?",
    answer:
      "Unsere Küchenmontage startet ab 149€. Sie erhalten immer ein verbindliches Festpreis-Angebot ohne versteckte Zusatzkosten. Der Endpreis hängt von der Größe Ihrer Küche und den gewünschten Anschlüssen ab.",
  },
  {
    question: "Wie schnell bekomme ich einen Termin?",
    answer:
      "In der Regel innerhalb von 24-48 Stunden – auch am Wochenende. Für dringende Küchenmontagen bieten wir Express-Termine an.",
  },
  {
    question: "Montieren Sie IKEA Küchen / METOD?",
    answer:
      "Ja, wir sind spezialisiert auf IKEA METOD Küchen. Wir übernehmen die komplette Montage inkl. Arbeitsplatten-Anpassung, Geräteinstallation und Anschlüsse.",
  },
  {
    question: "Sind Wasser- und Elektroanschlüsse möglich?",
    answer:
      "Ja, wir übernehmen den fachgerechten Anschluss von Spüle, Spülmaschine, Backofen und Kochfeld. Alle Arbeiten werden sauber und sicher ausgeführt.",
  },
  {
    question: "Montieren Sie auch andere Möbel?",
    answer:
      "Ja, neben Küchen montieren wir auch alle gängigen Möbel: IKEA PAX, Betten, Schränke, Regale und mehr. Möbelmontage ab 59€.",
  },
  {
    question: "Muss ich während der Montage anwesend sein?",
    answer:
      "In der Regel ja, zumindest zu Beginn und Ende der Montage. Alternativ kann eine Schlüsselübergabe vereinbart werden.",
  },
];

/**
 * Service Types for Form - Küchenmontage zuerst und vorausgewählt
 */
export const SERVICE_TYPES = [
  { value: "kuechenmontage", label: "Küchenmontage", default: true },
  { value: "moebelmontage", label: "Möbelmontage" },
  { value: "lieferung", label: "Lieferung / Transport" },
  { value: "lieferung-montage", label: "Lieferung + Montage" },
  { value: "sonstiges", label: "Sonstiges" },
];

/**
 * Gallery Images - Küchen zuerst (Echte Fotos von Keller Küchenwelt)
 */
export const GALLERY_IMAGES = [
  {
    src: "https://keller-kuechenwelt.de/wp-content/uploads/2024/11/047_01_07_BAHIA_1080.jpg",
    alt: "Moderne Küche mit dunklen Schränken - Keller Küchenwelt",
    category: "Küche",
  },
  {
    src: "https://keller-kuechenwelt.de/wp-content/uploads/2025/03/Kpchen_beispiel-02-1024x576.png",
    alt: "Luxusküche mit Meerblick - Keller Küchenwelt",
    category: "Küche",
  },
  {
    src: "https://keller-kuechenwelt.de/wp-content/uploads/2025/03/068_01_10_FotoproduktionA_041a-1024x576.jpg",
    alt: "Elegante Holzküche - Keller Küchenwelt",
    category: "Küche",
  },
  {
    src: "/images/projekt1-ikea-nachher.jpg",
    alt: "IKEA METOD Küchenmontage - Fertig",
    category: "IKEA Küche",
  },
  {
    src: "/images/projekt2-wohnung-nachher.jpg",
    alt: "Wohnungsküche Montage - Fertig",
    category: "Küche",
  },
  {
    src: "/images/projekt3-familie-montage.jpg",
    alt: "Familienküche Montage",
    category: "Küche",
  },
];

/**
 * Meta Information - Küchenmontage als Hauptfokus
 */
export const META = {
  title: "Professionelle Küchenmontage in Nürnberg | KELLER – DIE KÜCHENWELT",
  description:
    "Professionelle Küchenmontage in Nürnberg zum Festpreis. IKEA METOD Spezialist, Geräteinstallation, Wasser- & Elektroanschluss. Schnell, sauber, zuverlässig. Jetzt kostenlos anfragen!",
  keywords:
    "Küchenmontage Nürnberg, IKEA Küche montieren, METOD Montage, Küche aufbauen, Kücheninstallation, Möbelmontage",
};
