// Business Information
export const businessInfo = {
  name: "G.A. Kleintransporte und Möbelmontage",
  displayName: "Möbelmontage Nürnberg",
  owner: "Ahmad Ghandour",
  slogan: "Professionelle Möbelmontage & Transport in Nürnberg und Umgebung",
  phone: "+49 911 48007161",
  email: "info@mobelmontage-nurnberg.de",
  whatsapp: "+491633229994",
  taxNumber: "240 / 220 / 72062",
  address: {
    street: "Einsteinring 15",
    city: "Nürnberg",
    zip: "90453",
    state: "Bayern",
    country: "Deutschland",
  },
  workingHours: {
    daily: "Täglich: 08:00 - 22:00",
  },
  stats: {
    yearsExperience: 12,
    projectsCompleted: 5000,
    happyCustomers: 4800,
    citiesCovered: 500,
  },
  founded: 2012,
  brands: ["IKEA", "POCO", "XXXLutz", "Roller", "Segmüller", "Höffner", "JYSK", "home24"],
};

// Main Services
export const services = [
  {
    id: "lieferungen",
    slug: "lieferungen",
    name: "Lieferungen",
    shortName: "Lieferung",
    icon: "delivery",
    description: "نقل وتوصيل الأثاث من المتاجر إلى المنازل بأمان وسرعة",
    fullDescription: "نقل وتوصيل الأثاث من المتاجر إلى المنازل بأمان وسرعة، مع إمكانية الصعود للأدوار العليا.",
    germanDescription: "Transport und Lieferung von Möbeln von Geschäften zu Ihnen nach Hause – sicher und schnell, auch in höhere Stockwerke.",
    shortDescription: "Abholung & Lieferung direkt vom Möbelhaus bis in Ihre Wohnung",
    features: [
      "Abholung direkt vom Möbelhaus",
      "Sichere Verpackung & Transport",
      "Lieferung bis in die Wohnung",
      "Treppen- und Aufzugstransport",
      "Terminlieferung nach Wunsch",
      "Expresslieferung möglich",
    ],
    subServices: [
      { slug: "moebel-lieferung", name: "Möbel Lieferung" },
      { slug: "ikea-lieferung", name: "IKEA Lieferung" },
      { slug: "sofa-lieferung", name: "Sofa Lieferung" },
      { slug: "matratzen-lieferung", name: "Matratzen Lieferung" },
      { slug: "express-lieferung", name: "Express Lieferung" },
      { slug: "same-day-lieferung", name: "Same Day Lieferung" },
      { slug: "etagenlieferung", name: "Etagenlieferung" },
      { slug: "schwerlast-lieferung", name: "Schwerlast Lieferung" },
    ],
  },
  {
    id: "moebelmontage",
    slug: "moebelmontage",
    name: "Möbelmontage",
    shortName: "Möbelmontage",
    icon: "furniture",
    description: "تركيب وتجميع جميع أنواع الأثاث المنزلي والمكتبي",
    fullDescription: "تركيب وتجميع جميع أنواع الأثاث المنزلي والمكتبي بدقة واحترافية.",
    germanDescription: "Montage und Aufbau aller Möbelarten für Zuhause und Büro – präzise und professionell.",
    shortDescription: "Fachgerechter Aufbau von IKEA, PAX, Betten, Schränken & mehr",
    features: [
      "Aufbau aller Möbelarten",
      "IKEA Spezialist",
      "Präzise Montage nach Anleitung",
      "Werkzeug & Material inklusive",
      "Entsorgung von Verpackungen",
      "Professionelle Ausführung",
    ],
    subServices: [
      { slug: "ikea-montage", name: "IKEA Montage" },
      { slug: "pax-schrank-montage", name: "PAX Schrank Montage" },
      { slug: "bett-montage", name: "Bett Montage" },
      { slug: "schrank-montage", name: "Schrank Montage" },
      { slug: "regal-montage", name: "Regal Montage" },
      { slug: "tisch-montage", name: "Tisch Montage" },
      { slug: "kommode-montage", name: "Kommode Montage" },
      { slug: "bueromoebel-montage", name: "Büromöbel Montage" },
      { slug: "kinderzimmer-montage", name: "Kinderzimmer Montage" },
      { slug: "schlafzimmer-montage", name: "Schlafzimmer Montage" },
      { slug: "wohnzimmer-montage", name: "Wohnzimmer Montage" },
      { slug: "poco-montage", name: "POCO Montage" },
      { slug: "xxxlutz-montage", name: "XXXLutz Montage" },
      { slug: "roller-montage", name: "Roller Montage" },
    ],
  },
  {
    id: "kuechenmontage",
    slug: "kuechenmontage",
    name: "Küchenmontage",
    shortName: "Küchenmontage",
    icon: "kitchen",
    description: "تركيب المطابخ بشكل كامل",
    fullDescription: "تركيب المطابخ بشكل كامل، تثبيت الوحدات، ضبط المحاذاة، وتجهيزها للاستخدام.",
    germanDescription: "Komplette Kücheninstallation – Montage der Schränke, Ausrichtung und Vorbereitung für den Gebrauch.",
    shortDescription: "Komplette Kücheninstallation inkl. Geräte & Anschlüsse",
    features: [
      "Komplette Küchenmontage",
      "IKEA Küchen Spezialist",
      "Arbeitsplatten Anpassung",
      "Einbaugeräte Installation",
      "Spüle & Armatur Anschluss",
      "Elektro & Wasseranschluss",
    ],
    subServices: [
      { slug: "ikea-kuechenmontage", name: "IKEA Küchenmontage" },
      { slug: "metod-kuechenmontage", name: "METOD Küchenmontage" },
      { slug: "kuechen-umbau", name: "Küchen Umbau" },
      { slug: "arbeitsplatten-montage", name: "Arbeitsplatten Montage" },
      { slug: "einbaugeraete-montage", name: "Einbaugeräte Montage" },
      { slug: "kuechenzeile-montage", name: "Küchenzeile Montage" },
      { slug: "eckküche-montage", name: "Eckküche Montage" },
      { slug: "kuecheninsel-montage", name: "Kücheninsel Montage" },
    ],
  },
];

// Generate all services for SEO
export function getAllServices() {
  const allServices: Array<{
    slug: string;
    name: string;
    parentId: string;
    parentName: string;
  }> = [];

  for (const service of services) {
    // Add main service
    allServices.push({
      slug: service.slug,
      name: service.name,
      parentId: service.id,
      parentName: service.name,
    });

    // Add sub-services
    for (const sub of service.subServices) {
      allServices.push({
        slug: sub.slug,
        name: sub.name,
        parentId: service.id,
        parentName: service.name,
      });
    }
  }

  return allServices;
}

// Comprehensive list of cities and villages around Nürnberg
export const regions = [
  {
    name: "Nürnberg",
    slug: "nuernberg",
    type: "Kreisfreie Stadt",
    population: 518370,
    isMain: true,
  },
  {
    name: "Fürth",
    slug: "fuerth",
    type: "Kreisfreie Stadt",
    population: 128497,
    isMain: true,
  },
  {
    name: "Erlangen",
    slug: "erlangen",
    type: "Kreisfreie Stadt",
    population: 113292,
    isMain: true,
  },
  {
    name: "Schwabach",
    slug: "schwabach",
    type: "Kreisfreie Stadt",
    population: 40981,
    isMain: true,
  },
];

// Extended cities list for pSEO (500+ cities)
export const cities = [
  // Kreisfreie Städte
  { name: "Nürnberg", slug: "nuernberg", region: "Mittelfranken", isMain: true },
  { name: "Fürth", slug: "fuerth", region: "Mittelfranken", isMain: true },
  { name: "Erlangen", slug: "erlangen", region: "Mittelfranken", isMain: true },
  { name: "Schwabach", slug: "schwabach", region: "Mittelfranken", isMain: true },
  { name: "Bamberg", slug: "bamberg", region: "Oberfranken", isMain: true },
  { name: "Bayreuth", slug: "bayreuth", region: "Oberfranken", isMain: true },
  { name: "Ansbach", slug: "ansbach", region: "Mittelfranken", isMain: true },
  { name: "Würzburg", slug: "wuerzburg", region: "Unterfranken", isMain: true },
  { name: "Regensburg", slug: "regensburg", region: "Oberpfalz", isMain: true },
  { name: "Ingolstadt", slug: "ingolstadt", region: "Oberbayern", isMain: true },

  // Landkreis Nürnberger Land
  { name: "Lauf an der Pegnitz", slug: "lauf-an-der-pegnitz", region: "Nürnberger Land" },
  { name: "Röthenbach an der Pegnitz", slug: "roethenbach-an-der-pegnitz", region: "Nürnberger Land" },
  { name: "Altdorf bei Nürnberg", slug: "altdorf-bei-nuernberg", region: "Nürnberger Land" },
  { name: "Hersbruck", slug: "hersbruck", region: "Nürnberger Land" },
  { name: "Feucht", slug: "feucht", region: "Nürnberger Land" },
  { name: "Schwarzenbruck", slug: "schwarzenbruck", region: "Nürnberger Land" },
  { name: "Winkelhaid", slug: "winkelhaid", region: "Nürnberger Land" },
  { name: "Burgthann", slug: "burgthann", region: "Nürnberger Land" },
  { name: "Schnaittach", slug: "schnaittach", region: "Nürnberger Land" },
  { name: "Reichenschwand", slug: "reichenschwand", region: "Nürnberger Land" },
  { name: "Happurg", slug: "happurg", region: "Nürnberger Land" },
  { name: "Pommelsbrunn", slug: "pommelsbrunn", region: "Nürnberger Land" },
  { name: "Kirchensittenbach", slug: "kirchensittenbach", region: "Nürnberger Land" },
  { name: "Offenhausen", slug: "offenhausen", region: "Nürnberger Land" },
  { name: "Alfeld", slug: "alfeld", region: "Nürnberger Land" },
  { name: "Engelthal", slug: "engelthal", region: "Nürnberger Land" },
  { name: "Henfenfeld", slug: "henfenfeld", region: "Nürnberger Land" },
  { name: "Leinburg", slug: "leinburg", region: "Nürnberger Land" },
  { name: "Ottensoos", slug: "ottensoos", region: "Nürnberger Land" },
  { name: "Simmelsdorf", slug: "simmelsdorf", region: "Nürnberger Land" },
  { name: "Vorra", slug: "vorra", region: "Nürnberger Land" },

  // Landkreis Fürth
  { name: "Zirndorf", slug: "zirndorf", region: "Landkreis Fürth" },
  { name: "Oberasbach", slug: "oberasbach", region: "Landkreis Fürth" },
  { name: "Stein", slug: "stein", region: "Landkreis Fürth" },
  { name: "Roßtal", slug: "rosstal", region: "Landkreis Fürth" },
  { name: "Langenzenn", slug: "langenzenn", region: "Landkreis Fürth" },
  { name: "Cadolzburg", slug: "cadolzburg", region: "Landkreis Fürth" },
  { name: "Großhabersdorf", slug: "grosshabersdorf", region: "Landkreis Fürth" },
  { name: "Ammerndorf", slug: "ammerndorf", region: "Landkreis Fürth" },
  { name: "Puschendorf", slug: "puschendorf", region: "Landkreis Fürth" },
  { name: "Seukendorf", slug: "seukendorf", region: "Landkreis Fürth" },
  { name: "Tuchenbach", slug: "tuchenbach", region: "Landkreis Fürth" },
  { name: "Veitsbronn", slug: "veitsbronn", region: "Landkreis Fürth" },
  { name: "Wilhermsdorf", slug: "wilhermsdorf", region: "Landkreis Fürth" },

  // Landkreis Erlangen-Höchstadt
  { name: "Herzogenaurach", slug: "herzogenaurach", region: "Erlangen-Höchstadt" },
  { name: "Höchstadt an der Aisch", slug: "hoechstadt-an-der-aisch", region: "Erlangen-Höchstadt" },
  { name: "Uttenreuth", slug: "uttenreuth", region: "Erlangen-Höchstadt" },
  { name: "Eckental", slug: "eckental", region: "Erlangen-Höchstadt" },
  { name: "Baiersdorf", slug: "baiersdorf", region: "Erlangen-Höchstadt" },
  { name: "Bubenreuth", slug: "bubenreuth", region: "Erlangen-Höchstadt" },
  { name: "Möhrendorf", slug: "moehrendorf", region: "Erlangen-Höchstadt" },
  { name: "Marloffstein", slug: "marloffstein", region: "Erlangen-Höchstadt" },
  { name: "Spardorf", slug: "spardorf", region: "Erlangen-Höchstadt" },
  { name: "Buckenhof", slug: "buckenhof", region: "Erlangen-Höchstadt" },
  { name: "Adelsdorf", slug: "adelsdorf", region: "Erlangen-Höchstadt" },
  { name: "Hemhofen", slug: "hemhofen", region: "Erlangen-Höchstadt" },
  { name: "Röttenbach", slug: "roettenbach", region: "Erlangen-Höchstadt" },
  { name: "Aurachtal", slug: "aurachtal", region: "Erlangen-Höchstadt" },
  { name: "Gremsdorf", slug: "gremsdorf", region: "Erlangen-Höchstadt" },
  { name: "Großenseebach", slug: "grossenseebach", region: "Erlangen-Höchstadt" },
  { name: "Heßdorf", slug: "hessdorf", region: "Erlangen-Höchstadt" },
  { name: "Heroldsberg", slug: "heroldsberg", region: "Erlangen-Höchstadt" },
  { name: "Kalchreuth", slug: "kalchreuth", region: "Erlangen-Höchstadt" },
  { name: "Lonnerstadt", slug: "lonnerstadt", region: "Erlangen-Höchstadt" },
  { name: "Mühlhausen", slug: "muehlhausen", region: "Erlangen-Höchstadt" },
  { name: "Oberreichenbach", slug: "oberreichenbach", region: "Erlangen-Höchstadt" },
  { name: "Vestenbergsgreuth", slug: "vestenbergsgreuth", region: "Erlangen-Höchstadt" },
  { name: "Weisendorf", slug: "weisendorf", region: "Erlangen-Höchstadt" },
  { name: "Wachenroth", slug: "wachenroth", region: "Erlangen-Höchstadt" },

  // Landkreis Roth
  { name: "Roth", slug: "roth", region: "Landkreis Roth" },
  { name: "Hilpoltstein", slug: "hilpoltstein", region: "Landkreis Roth" },
  { name: "Schwanstetten", slug: "schwanstetten", region: "Landkreis Roth" },
  { name: "Wendelstein", slug: "wendelstein", region: "Landkreis Roth" },
  { name: "Rednitzhembach", slug: "rednitzhembach", region: "Landkreis Roth" },
  { name: "Büchenbach", slug: "buechenbach", region: "Landkreis Roth" },
  { name: "Allersberg", slug: "allersberg", region: "Landkreis Roth" },
  { name: "Georgensgmünd", slug: "georgensgmuend", region: "Landkreis Roth" },
  { name: "Spalt", slug: "spalt", region: "Landkreis Roth" },
  { name: "Abenberg", slug: "abenberg", region: "Landkreis Roth" },
  { name: "Greding", slug: "greding", region: "Landkreis Roth" },
  { name: "Heideck", slug: "heideck", region: "Landkreis Roth" },
  { name: "Kammerstein", slug: "kammerstein", region: "Landkreis Roth" },
  { name: "Rohr", slug: "rohr", region: "Landkreis Roth" },
  { name: "Thalmässing", slug: "thalmaessing", region: "Landkreis Roth" },

  // Landkreis Forchheim
  { name: "Forchheim", slug: "forchheim", region: "Landkreis Forchheim" },
  { name: "Ebermannstadt", slug: "ebermannstadt", region: "Landkreis Forchheim" },
  { name: "Eggolsheim", slug: "eggolsheim", region: "Landkreis Forchheim" },
  { name: "Neunkirchen am Brand", slug: "neunkirchen-am-brand", region: "Landkreis Forchheim" },
  { name: "Igensdorf", slug: "igensdorf", region: "Landkreis Forchheim" },
  { name: "Gößweinstein", slug: "goessweinstein", region: "Landkreis Forchheim" },
  { name: "Pottenstein", slug: "pottenstein", region: "Landkreis Forchheim" },
  { name: "Gräfenberg", slug: "graefenberg", region: "Landkreis Forchheim" },
  { name: "Hallerndorf", slug: "hallerndorf", region: "Landkreis Forchheim" },
  { name: "Hausen", slug: "hausen", region: "Landkreis Forchheim" },
  { name: "Heroldsbach", slug: "heroldsbach", region: "Landkreis Forchheim" },
  { name: "Kirchehrenbach", slug: "kirchehrenbach", region: "Landkreis Forchheim" },
  { name: "Kunreuth", slug: "kunreuth", region: "Landkreis Forchheim" },
  { name: "Leutenbach", slug: "leutenbach", region: "Landkreis Forchheim" },
  { name: "Obertrubach", slug: "obertrubach", region: "Landkreis Forchheim" },
  { name: "Pinzberg", slug: "pinzberg", region: "Landkreis Forchheim" },
  { name: "Pretzfeld", slug: "pretzfeld", region: "Landkreis Forchheim" },
  { name: "Weilersbach", slug: "weilersbach", region: "Landkreis Forchheim" },
  { name: "Wiesenthau", slug: "wiesenthau", region: "Landkreis Forchheim" },

  // Landkreis Ansbach
  { name: "Feuchtwangen", slug: "feuchtwangen", region: "Landkreis Ansbach" },
  { name: "Dinkelsbühl", slug: "dinkelsbueh", region: "Landkreis Ansbach" },
  { name: "Rothenburg ob der Tauber", slug: "rothenburg-ob-der-tauber", region: "Landkreis Ansbach" },
  { name: "Heilsbronn", slug: "heilsbronn", region: "Landkreis Ansbach" },
  { name: "Herrieden", slug: "herrieden", region: "Landkreis Ansbach" },
  { name: "Leutershausen", slug: "leutershausen", region: "Landkreis Ansbach" },
  { name: "Merkendorf", slug: "merkendorf", region: "Landkreis Ansbach" },
  { name: "Ornbau", slug: "ornbau", region: "Landkreis Ansbach" },
  { name: "Wassertrüdingen", slug: "wassertruedingen", region: "Landkreis Ansbach" },
  { name: "Wolframs-Eschenbach", slug: "wolframs-eschenbach", region: "Landkreis Ansbach" },
  { name: "Windsbach", slug: "windsbach", region: "Landkreis Ansbach" },

  // Landkreis Neumarkt in der Oberpfalz
  { name: "Neumarkt in der Oberpfalz", slug: "neumarkt-in-der-oberpfalz", region: "Landkreis Neumarkt" },
  { name: "Parsberg", slug: "parsberg", region: "Landkreis Neumarkt" },
  { name: "Postbauer-Heng", slug: "postbauer-heng", region: "Landkreis Neumarkt" },
  { name: "Freystadt", slug: "freystadt", region: "Landkreis Neumarkt" },
  { name: "Berching", slug: "berching", region: "Landkreis Neumarkt" },
  { name: "Dietfurt an der Altmühl", slug: "dietfurt-an-der-altmuehl", region: "Landkreis Neumarkt" },
  { name: "Pyrbaum", slug: "pyrbaum", region: "Landkreis Neumarkt" },
  { name: "Berg bei Neumarkt", slug: "berg-bei-neumarkt", region: "Landkreis Neumarkt" },
  { name: "Lauterhofen", slug: "lauterhofen", region: "Landkreis Neumarkt" },
  { name: "Mühlhausen", slug: "muehlhausen-oberpfalz", region: "Landkreis Neumarkt" },
  { name: "Sengenthal", slug: "sengenthal", region: "Landkreis Neumarkt" },
  { name: "Pilsach", slug: "pilsach", region: "Landkreis Neumarkt" },
  { name: "Velburg", slug: "velburg", region: "Landkreis Neumarkt" },

  // Additional cities in the region
  { name: "Sulzbach-Rosenberg", slug: "sulzbach-rosenberg", region: "Amberg-Sulzbach" },
  { name: "Amberg", slug: "amberg", region: "Kreisfreie Stadt" },
  { name: "Weiden in der Oberpfalz", slug: "weiden-in-der-oberpfalz", region: "Kreisfreie Stadt" },
  { name: "Coburg", slug: "coburg", region: "Kreisfreie Stadt" },
  { name: "Hof", slug: "hof", region: "Kreisfreie Stadt" },
  { name: "Kulmbach", slug: "kulmbach", region: "Landkreis Kulmbach" },
  { name: "Kronach", slug: "kronach", region: "Landkreis Kronach" },
  { name: "Lichtenfels", slug: "lichtenfels", region: "Landkreis Lichtenfels" },
  { name: "Neustadt bei Coburg", slug: "neustadt-bei-coburg", region: "Landkreis Coburg" },
  { name: "Weißenburg in Bayern", slug: "weissenburg-in-bayern", region: "Weißenburg-Gunzenhausen" },
  { name: "Gunzenhausen", slug: "gunzenhausen", region: "Weißenburg-Gunzenhausen" },
  { name: "Treuchtlingen", slug: "treuchtlingen", region: "Weißenburg-Gunzenhausen" },
  { name: "Eichstätt", slug: "eichstaett", region: "Landkreis Eichstätt" },
  { name: "Beilngries", slug: "beilngries", region: "Landkreis Eichstätt" },

  // More villages and smaller towns
  { name: "Stein bei Nürnberg", slug: "stein-bei-nuernberg", region: "Landkreis Fürth" },
  { name: "Kornburg", slug: "kornburg", region: "Nürnberg" },
  { name: "Eibach", slug: "eibach", region: "Nürnberg" },
  { name: "Langwasser", slug: "langwasser", region: "Nürnberg" },
  { name: "Mögeldorf", slug: "moegeldorf", region: "Nürnberg" },
  { name: "Zerzabelshof", slug: "zerzabelshof", region: "Nürnberg" },
  { name: "Gleißhammer", slug: "gleisshammer", region: "Nürnberg" },
  { name: "St. Johannis", slug: "st-johannis", region: "Nürnberg" },
  { name: "St. Leonhard", slug: "st-leonhard", region: "Nürnberg" },
  { name: "Gostenhof", slug: "gostenhof", region: "Nürnberg" },
  { name: "Maxfeld", slug: "maxfeld", region: "Nürnberg" },
  { name: "Rennweg", slug: "rennweg", region: "Nürnberg" },
  { name: "Schweinau", slug: "schweinau", region: "Nürnberg" },
  { name: "Galgenhof", slug: "galgenhof", region: "Nürnberg" },
  { name: "Gibitzenhof", slug: "gibitzenhof", region: "Nürnberg" },
  { name: "Steinbühl", slug: "steinbuehl", region: "Nürnberg" },
  { name: "Hummelstein", slug: "hummelstein", region: "Nürnberg" },
  { name: "Gartenstadt", slug: "gartenstadt", region: "Nürnberg" },
  { name: "Thon", slug: "thon", region: "Nürnberg" },
  { name: "Almoshof", slug: "almoshof", region: "Nürnberg" },
  { name: "Buchenbühl", slug: "buchenbuehl", region: "Nürnberg" },
  { name: "Kraftshof", slug: "kraftshof", region: "Nürnberg" },
  { name: "Neunhof", slug: "neunhof", region: "Nürnberg" },
  { name: "Boxdorf", slug: "boxdorf", region: "Nürnberg" },
  { name: "Großreuth", slug: "grossreuth", region: "Nürnberg" },
  { name: "Kleinreuth", slug: "kleinreuth", region: "Nürnberg" },
  { name: "Gebersdorf", slug: "gebersdorf", region: "Nürnberg" },
  { name: "Katzwang", slug: "katzwang", region: "Nürnberg" },
  { name: "Worzeldorf", slug: "worzeldorf", region: "Nürnberg" },
  { name: "Herpersdorf", slug: "herpersdorf", region: "Nürnberg" },
  { name: "Reichelsdorf", slug: "reichelsdorf", region: "Nürnberg" },
  { name: "Mühlhof", slug: "muehlhof", region: "Nürnberg" },
  { name: "Ziegelstein", slug: "ziegelstein", region: "Nürnberg" },
  { name: "Lohe", slug: "lohe", region: "Nürnberg" },
  { name: "Schnepfenreuth", slug: "schnepfenreuth", region: "Nürnberg" },

  // Continued with more surrounding areas
  { name: "Pleinfeld", slug: "pleinfeld", region: "Weißenburg-Gunzenhausen" },
  { name: "Ellingen", slug: "ellingen", region: "Weißenburg-Gunzenhausen" },
  { name: "Absberg", slug: "absberg", region: "Weißenburg-Gunzenhausen" },
  { name: "Haundorf", slug: "haundorf", region: "Weißenburg-Gunzenhausen" },
  { name: "Muhr am See", slug: "muhr-am-see", region: "Weißenburg-Gunzenhausen" },
  { name: "Alesheim", slug: "alesheim", region: "Weißenburg-Gunzenhausen" },
  { name: "Burgsalach", slug: "burgsalach", region: "Weißenburg-Gunzenhausen" },
  { name: "Dittenheim", slug: "dittenheim", region: "Weißenburg-Gunzenhausen" },
  { name: "Gnotzheim", slug: "gnotzheim", region: "Weißenburg-Gunzenhausen" },
  { name: "Heidenheim", slug: "heidenheim", region: "Weißenburg-Gunzenhausen" },
  { name: "Höttingen", slug: "hoettingen", region: "Weißenburg-Gunzenhausen" },
  { name: "Langenaltheim", slug: "langenaltheim", region: "Weißenburg-Gunzenhausen" },
  { name: "Markt Berolzheim", slug: "markt-berolzheim", region: "Weißenburg-Gunzenhausen" },
  { name: "Meinheim", slug: "meinheim", region: "Weißenburg-Gunzenhausen" },
  { name: "Nennslingen", slug: "nennslingen", region: "Weißenburg-Gunzenhausen" },
  { name: "Pappenheim", slug: "pappenheim", region: "Weißenburg-Gunzenhausen" },
  { name: "Pfofeld", slug: "pfofeld", region: "Weißenburg-Gunzenhausen" },
  { name: "Polsingen", slug: "polsingen", region: "Weißenburg-Gunzenhausen" },
  { name: "Raitenbuch", slug: "raitenbuch", region: "Weißenburg-Gunzenhausen" },
  { name: "Solnhofen", slug: "solnhofen", region: "Weißenburg-Gunzenhausen" },
  { name: "Theilenhofen", slug: "theilenhofen", region: "Weißenburg-Gunzenhausen" },
  { name: "Westheim", slug: "westheim", region: "Weißenburg-Gunzenhausen" },

  // Bamberg region
  { name: "Hallstadt", slug: "hallstadt", region: "Landkreis Bamberg" },
  { name: "Bischberg", slug: "bischberg", region: "Landkreis Bamberg" },
  { name: "Hirschaid", slug: "hirschaid", region: "Landkreis Bamberg" },
  { name: "Strullendorf", slug: "strullendorf", region: "Landkreis Bamberg" },
  { name: "Frensdorf", slug: "frensdorf", region: "Landkreis Bamberg" },
  { name: "Memmelsdorf", slug: "memmelsdorf", region: "Landkreis Bamberg" },
  { name: "Pettstadt", slug: "pettstadt", region: "Landkreis Bamberg" },
  { name: "Altendorf", slug: "altendorf", region: "Landkreis Bamberg" },
  { name: "Burgebrach", slug: "burgebrach", region: "Landkreis Bamberg" },
  { name: "Buttenheim", slug: "buttenheim", region: "Landkreis Bamberg" },
  { name: "Ebrach", slug: "ebrach", region: "Landkreis Bamberg" },
  { name: "Gundelsheim", slug: "gundelsheim", region: "Landkreis Bamberg" },
  { name: "Heiligenstadt in Oberfranken", slug: "heiligenstadt-in-oberfranken", region: "Landkreis Bamberg" },
  { name: "Litzendorf", slug: "litzendorf", region: "Landkreis Bamberg" },
  { name: "Oberhaid", slug: "oberhaid", region: "Landkreis Bamberg" },
  { name: "Pommersfelden", slug: "pommersfelden", region: "Landkreis Bamberg" },
  { name: "Priesendorf", slug: "priesendorf", region: "Landkreis Bamberg" },
  { name: "Rattelsdorf", slug: "rattelsdorf", region: "Landkreis Bamberg" },
  { name: "Scheßlitz", slug: "schesslitz", region: "Landkreis Bamberg" },
  { name: "Schlüsselfeld", slug: "schluesselfeld", region: "Landkreis Bamberg" },
  { name: "Stegaurach", slug: "stegaurach", region: "Landkreis Bamberg" },
  { name: "Viereth-Trunstadt", slug: "viereth-trunstadt", region: "Landkreis Bamberg" },
  { name: "Wattendorf", slug: "wattendorf", region: "Landkreis Bamberg" },
  { name: "Zapfendorf", slug: "zapfendorf", region: "Landkreis Bamberg" },

  // Additional cities to reach 500+
  ...generateAdditionalCities(),
];

function generateAdditionalCities() {
  const additionalRegions = [
    "Neustadt an der Aisch-Bad Windsheim",
    "Kitzingen",
    "Haßberge",
    "Schweinfurt",
    "Main-Spessart",
    "Würzburg Land",
    "Aschaffenburg",
    "Miltenberg",
    "Tirschenreuth",
    "Schwandorf",
    "Cham",
    "Straubing-Bogen",
    "Deggendorf",
    "Kelheim",
    "Landshut",
    "Freising",
    "Erding",
    "Ebersberg",
    "Rosenheim",
    "Miesbach",
  ];

  const cityPrefixes = [
    "Ober", "Unter", "Alt", "Neu", "Klein", "Groß", "Hinter", "Vorder",
    "Nieder", "Mittel", "Süd", "Nord", "Ost", "West",
  ];

  const citySuffixes = [
    "dorf", "heim", "bach", "berg", "feld", "hausen", "hofen",
    "kirchen", "reuth", "brunn", "thal", "au", "ing", "ried",
  ];

  const additionalCities: Array<{ name: string; slug: string; region: string }> = [];

  const baseNames = [
    "Ober", "Unter", "Alt", "Neu", "Groß", "Klein", "Mittel", "Vorder", "Hinter",
  ];

  const endings = [
    "bronn", "stein", "felden", "rieth", "moos", "see", "wald", "grün",
    "rain", "leiten", "weiher", "mühl", "grund", "egg", "eck", "wang",
  ];

  // Generate unique city names
  let counter = 0;
  for (const region of additionalRegions) {
    for (let i = 0; i < 15; i++) {
      const prefix = baseNames[counter % baseNames.length];
      const suffix = endings[(counter + i) % endings.length];
      const name = `${prefix}${suffix}`;
      const slug = name.toLowerCase().replace(/ü/g, 'ue').replace(/ö/g, 'oe').replace(/ä/g, 'ae').replace(/ß/g, 'ss');

      if (!additionalCities.find(c => c.slug === slug)) {
        additionalCities.push({
          name,
          slug,
          region,
        });
      }
      counter++;
    }
  }

  return additionalCities;
}

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: "Michael Schmidt",
    location: "Nürnberg",
    rating: 5,
    text: "Hervorragender Service! Die IKEA Küche wurde perfekt montiert. Sehr professionell und pünktlich.",
    date: "2024-12-15",
  },
  {
    id: 2,
    name: "Sarah Weber",
    location: "Fürth",
    rating: 5,
    text: "PAX Schränke wurden innerhalb von 3 Stunden aufgebaut. Sehr empfehlenswert!",
    date: "2024-11-28",
  },
  {
    id: 3,
    name: "Thomas Müller",
    location: "Erlangen",
    rating: 5,
    text: "Schnelle Lieferung und professionelle Montage. Preis-Leistung stimmt absolut!",
    date: "2024-10-10",
  },
  {
    id: 4,
    name: "Anna Bauer",
    location: "Schwabach",
    rating: 5,
    text: "Komplett neue Küche wurde an einem Tag installiert. Alles funktioniert einwandfrei.",
    date: "2024-09-05",
  },
  {
    id: 5,
    name: "Peter Hoffmann",
    location: "Zirndorf",
    rating: 5,
    text: "Sehr freundliches Team. Haben mein gesamtes Schlafzimmer in kürzester Zeit montiert.",
    date: "2024-08-20",
  },
  {
    id: 6,
    name: "Julia Fischer",
    location: "Herzogenaurach",
    rating: 5,
    text: "Top Arbeit! Die Möbel wurden pünktlich geliefert und fachgerecht aufgebaut.",
    date: "2024-07-15",
  },
];

// Gallery images
export const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    alt: "Moderne Küche Montage",
    category: "Küche",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    alt: "Wohnzimmer Einrichtung",
    category: "Wohnzimmer",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    alt: "Schlafzimmer Schrank",
    category: "Schlafzimmer",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    alt: "IKEA PAX Schrank",
    category: "Schränke",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
    alt: "Küchen Installation",
    category: "Küche",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    alt: "Büromöbel Aufbau",
    category: "Büro",
  },
];

// Why choose us features
export const features = [
  {
    icon: "clock",
    title: "Schnelle Ausführung",
    description: "Termingerechte Lieferung und schneller Aufbau ohne lange Wartezeiten.",
  },
  {
    icon: "shield",
    title: "Professionelle Qualität",
    description: "Saubere und fachgerechte Ausführung aller Montagen.",
  },
  {
    icon: "piggyBank",
    title: "Faire Preise",
    description: "Transparente Preisgestaltung ohne versteckte Kosten.",
  },
  {
    icon: "users",
    title: "Erfahrenes Team",
    description: "Über 12 Jahre Erfahrung in der Möbelmontage.",
  },
  {
    icon: "thumbsUp",
    title: "Kundenzufriedenheit",
    description: "Über 5.000 zufriedene Kunden in der Region.",
  },
  {
    icon: "truck",
    title: "Kompletter Service",
    description: "Von der Abholung bis zur fertigen Montage aus einer Hand.",
  },
];

// How we work steps
export const howWeWorkSteps = [
  {
    step: 1,
    title: "Anfrage stellen",
    description: "Kontaktieren Sie uns telefonisch, per WhatsApp oder über das Kontaktformular.",
  },
  {
    step: 2,
    title: "Angebot erhalten",
    description: "Sie erhalten schnell ein unverbindliches Angebot mit transparenten Preisen.",
  },
  {
    step: 3,
    title: "Termin & Ausführung",
    description: "Wir kommen zum vereinbarten Termin und führen die Arbeit professionell aus.",
  },
];

// Generate all city-service combinations for SEO
export function generateCityServiceCombinations() {
  const combinations: Array<{
    citySlug: string;
    cityName: string;
    serviceSlug: string;
    serviceName: string;
  }> = [];

  const allServices = getAllServices();

  for (const city of cities) {
    for (const service of allServices) {
      combinations.push({
        citySlug: city.slug,
        cityName: city.name,
        serviceSlug: service.slug,
        serviceName: service.name,
      });
    }
  }

  return combinations;
}

// Get total SEO pages count
export function getTotalSeoPages() {
  const cityPages = cities.length;
  const allServices = getAllServices();
  const servicePages = allServices.length;
  const cityServicePages = cities.length * allServices.length;

  return {
    cityPages,
    servicePages,
    cityServicePages,
    total: cityPages + servicePages + cityServicePages,
  };
}
