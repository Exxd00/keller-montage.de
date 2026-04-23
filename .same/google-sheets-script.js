// =====================================================
// KELLER-MONTAGE.DE - GOOGLE SHEETS SCRIPT
// Google Apps Script für Lead-Tracking
// =====================================================
//
// INSTALLATION:
// 1. Öffnen Sie Google Sheets → Erweiterungen → Apps Script
// 2. Löschen Sie den vorhandenen Code und fügen Sie diesen ein
// 3. Speichern und Bereitstellen → Neue Bereitstellung
// 4. Wählen Sie "Web-App" → Jeder kann zugreifen
// 5. Kopieren Sie die URL und fügen Sie sie in .env.local ein:
//    NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/...
//
// =====================================================

const CONFIG = {
  TIMEZONE: 'Europe/Berlin',
  COLORS: {
    PRIMARY: '#E63946',
    WHITE: '#FFFFFF',
    STATUS_NEU: '#FFF0F0',
    STATUS_KONTAKTIERT: '#FFE4E4',
    STATUS_TERMIN: '#FFDADA',
    STATUS_BESICHTIGT: '#FFD0D0',
    STATUS_ANGEBOT: '#FFC6C6',
    STATUS_ABSCHLUSS: '#D1FAE5',
    STATUS_WARTET: '#F3F4F6',
    STATUS_ABGELEHNT: '#FEE2E2',
    SOURCE_GOOGLE_ADS: '#DCFCE7',
    SOURCE_ORGANIC: '#DBEAFE',
    SOURCE_DIRECT: '#F3F4F6',
    SOURCE_SOCIAL: '#FEF3C7'
  }
};

// ⭐ Statusoptionen
const STATUS_OPTIONS = [
  '🆕 Neu',
  '📞 Kontaktiert',
  '📅 Termin',
  '👁️ Besichtigt',
  '💰 Angebot',
  '✅ Abgeschlossen',
  '⏳ Wartet',
  '❌ Abgelehnt'
];

// ⭐ Kontaktart-Optionen (Formular/Anruf/WhatsApp)
const KONTAKT_OPTIONS = [
  '📝 Formular',
  '📞 Anruf',
  '💬 WhatsApp'
];

// ⭐ Bewertungs-Optionen (Kundenqualität)
const BEWERTUNG_OPTIONS = [
  '👍 Gut',
  '⭐ Sehr Gut',
  '🌟 Super'
];

// ⭐ Service-Optionen
const SERVICE_OPTIONS = [
  '🍳 Küchenmontage',
  '🛋️ Möbelmontage',
  '🚚 Lieferung',
  '📦 Lieferung + Montage',
  '❓ Sonstiges'
];

function doPost(e) {
  var data = {};

  try {
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
  } catch(err) {
    Logger.log('Parse error: ' + err);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  ensureHeaders(sheet);

  // Daten extrahieren
  var name = data.name || '-';
  var phone = data.phone || '-';
  var email = data.email || '-';
  var city = data.city || '-';
  var service = data.service || '-';
  var message = data.message || '-';

  // ⭐ Kontaktart (Formular/Anruf/WhatsApp)
  var contactType = data.contact_type || '📝 Formular';

  // ⭐ Tracking-Daten
  var source = data.source || 'Direct';
  var gclid = data.gclid || '-';
  var pageUrl = data.page_url || '-';

  var dateTime = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'dd.MM.yyyy HH:mm:ss');

  // ⭐ Service formatieren
  var serviceFormatted = formatService(service);

  // ⭐ Priorität basierend auf Nachricht
  var priority = '🟢 Normal';
  var msg = (message || '').toLowerCase();
  if (msg.indexOf('sofort') > -1 || msg.indexOf('dringend') > -1 || msg.indexOf('heute') > -1 || msg.indexOf('express') > -1) {
    priority = '🔴 SOFORT';
  } else if (msg.indexOf('schnell') > -1 || msg.indexOf('bald') > -1 || msg.indexOf('diese woche') > -1) {
    priority = '🟡 Hoch';
  }

  // ⭐ Quelle formatieren
  var sourceFormatted = formatSource(source);

  // ⭐ Neuer Datensatz - 14 Spalten
  var row = [
    dateTime,           // 1. Datum
    '🆕 Neu',           // 2. Status
    contactType,        // 3. Kontaktart (📝/📞/💬)
    name,               // 4. Name
    phone,              // 5. Telefon
    email,              // 6. E-Mail
    city,               // 7. Stadt
    serviceFormatted,   // 8. Dienstleistung
    priority,           // 9. Priorität
    message,            // 10. Nachricht
    sourceFormatted,    // 11. Quelle
    gclid,              // 12. GCLID
    pageUrl,            // 13. Seite
    ''                  // 14. Bewertung (leer für Dropdown)
  ];

  sheet.appendRow(row);
  var lastRow = sheet.getLastRow();

  // ⭐ Dropdowns hinzufügen
  addDropdowns(sheet, lastRow);

  // ⭐ Farbcodierung
  colorSourceCell(sheet, lastRow, source);
  sheet.getRange(lastRow, 1, 1, row.length).setBackground(CONFIG.COLORS.STATUS_NEU);

  Logger.log('✅ Lead: ' + name + ' | Kontakt: ' + contactType + ' | Source: ' + source);

  return ContentService.createTextOutput(JSON.stringify({success: true, row: lastRow}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput('✅ Keller-Montage.de API aktiv!');
}

// ⭐ Service formatieren
function formatService(service) {
  var icons = {
    'kuechenmontage': '🍳 Küchenmontage',
    'moebelmontage': '🛋️ Möbelmontage',
    'lieferung': '🚚 Lieferung',
    'lieferung-montage': '📦 Lieferung + Montage',
    'sonstiges': '❓ Sonstiges'
  };
  return icons[service] || service || '❓ Sonstiges';
}

// ⭐ Quelle formatieren
function formatSource(source) {
  switch(source) {
    case 'Google Ads': return '🎯 Google Ads';
    case 'Organic': return '🔍 Organic';
    case 'Direct': return '🔗 Direct';
    case 'Social': return '📱 Social';
    case 'Referral': return '🔗 Referral';
    default: return '🌐 ' + source;
  }
}

// ⭐ Quellen-Zelle farblich markieren
function colorSourceCell(sheet, row, source) {
  var cell = sheet.getRange(row, 11); // Spalte 11 = Quelle
  var color = CONFIG.COLORS.SOURCE_DIRECT;

  if (source === 'Google Ads') color = CONFIG.COLORS.SOURCE_GOOGLE_ADS;
  else if (source === 'Organic') color = CONFIG.COLORS.SOURCE_ORGANIC;
  else if (source === 'Social') color = CONFIG.COLORS.SOURCE_SOCIAL;

  cell.setBackground(color);
}

// ⭐ Spaltenüberschriften erstellen
function ensureHeaders(sheet) {
  var currentHeader = sheet.getRange('A1').getValue();

  if (currentHeader !== 'Datum' || sheet.getLastColumn() < 14) {
    sheet.clear();

    var headers = [
      'Datum',        // 1
      'Status',       // 2
      'Kontaktart',   // 3 ⭐ Formular/Anruf/WhatsApp
      'Name',         // 4
      'Telefon',      // 5
      'E-Mail',       // 6
      'Stadt',        // 7
      'Dienstleistung', // 8
      'Priorität',    // 9
      'Nachricht',    // 10
      'Quelle',       // 11
      'GCLID',        // 12 ⭐ Google Ads Tracking
      'Seite',        // 13
      'Bewertung'     // 14 ⭐ Kundenqualität
    ];

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground(CONFIG.COLORS.PRIMARY)
      .setFontColor(CONFIG.COLORS.WHITE)
      .setFontWeight('bold')
      .setHorizontalAlignment('center');

    sheet.setFrozenRows(1);

    // Spaltenbreiten anpassen
    sheet.setColumnWidth(1, 150);  // Datum
    sheet.setColumnWidth(2, 130);  // Status
    sheet.setColumnWidth(3, 120);  // Kontaktart
    sheet.setColumnWidth(4, 150);  // Name
    sheet.setColumnWidth(5, 140);  // Telefon
    sheet.setColumnWidth(6, 180);  // E-Mail
    sheet.setColumnWidth(7, 100);  // Stadt
    sheet.setColumnWidth(8, 150);  // Dienstleistung
    sheet.setColumnWidth(9, 100);  // Priorität
    sheet.setColumnWidth(10, 300); // Nachricht
    sheet.setColumnWidth(11, 120); // Quelle
    sheet.setColumnWidth(12, 200); // GCLID
    sheet.setColumnWidth(13, 150); // Seite
    sheet.setColumnWidth(14, 120); // Bewertung
  }
}

// ⭐ Dropdown-Listen hinzufügen
function addDropdowns(sheet, row) {
  // 1. Status-Dropdown (Spalte 2)
  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_OPTIONS, true)
    .build();
  sheet.getRange(row, 2).setDataValidation(statusRule);

  // 2. Kontaktart-Dropdown (Spalte 3) - Formular/Anruf/WhatsApp
  var kontaktRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(KONTAKT_OPTIONS, true)
    .build();
  sheet.getRange(row, 3).setDataValidation(kontaktRule);

  // 3. Bewertungs-Dropdown (Spalte 14) - Gut/Sehr Gut/Super
  var bewertungRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(BEWERTUNG_OPTIONS, true)
    .build();
  sheet.getRange(row, 14).setDataValidation(bewertungRule);
}

// ⭐ Bei Statusänderung Farbe aktualisieren
function onEdit(e) {
  var r = e.range;
  var row = r.getRow();
  var col = r.getColumn();

  if (row <= 1) return;

  // Statusänderung (Spalte 2)
  if (col === 2) {
    var colors = {
      '🆕 Neu': CONFIG.COLORS.STATUS_NEU,
      '📞 Kontaktiert': CONFIG.COLORS.STATUS_KONTAKTIERT,
      '📅 Termin': CONFIG.COLORS.STATUS_TERMIN,
      '👁️ Besichtigt': CONFIG.COLORS.STATUS_BESICHTIGT,
      '💰 Angebot': CONFIG.COLORS.STATUS_ANGEBOT,
      '✅ Abgeschlossen': CONFIG.COLORS.STATUS_ABSCHLUSS,
      '⏳ Wartet': CONFIG.COLORS.STATUS_WARTET,
      '❌ Abgelehnt': CONFIG.COLORS.STATUS_ABGELEHNT
    };

    var bgColor = colors[r.getValue()] || '#FFFFFF';
    e.source.getActiveSheet().getRange(row, 1, 1, 14).setBackground(bgColor);

    // Quellen-Farbe beibehalten
    var sourceCell = e.source.getActiveSheet().getRange(row, 11);
    var sourceValue = sourceCell.getValue();

    if (sourceValue.indexOf('Google Ads') > -1) {
      sourceCell.setBackground(CONFIG.COLORS.SOURCE_GOOGLE_ADS);
    } else if (sourceValue.indexOf('Organic') > -1) {
      sourceCell.setBackground(CONFIG.COLORS.SOURCE_ORGANIC);
    } else if (sourceValue.indexOf('Social') > -1) {
      sourceCell.setBackground(CONFIG.COLORS.SOURCE_SOCIAL);
    }
  }
}

// ⭐ Menü erstellen
function onOpen() {
  SpreadsheetApp.getUi().createMenu('🏠 Keller Montage')
    .addItem('📋 Setup (Neu starten)', 'setupSheet')
    .addSeparator()
    .addItem('🧪 Test: Formular-Lead', 'testFormular')
    .addItem('🧪 Test: Anruf-Lead', 'testAnruf')
    .addItem('🧪 Test: WhatsApp-Lead', 'testWhatsApp')
    .addItem('🧪 Test: Google Ads Lead', 'testGoogleAds')
    .addToUi();
}

// ⭐ Sheet neu einrichten
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  ensureHeaders(sheet);
  SpreadsheetApp.getUi().alert('✅ Sheet eingerichtet!\n\n• Kontaktart: Formular / Anruf / WhatsApp\n• Bewertung: Gut / Sehr Gut / Super\n• GCLID-Tracking aktiv');
}

// =====================================================
// TEST-FUNKTIONEN
// =====================================================

// ⭐ Test: Formular-Lead
function testFormular() {
  doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Max Mustermann',
        phone: '0911 123 456',
        email: 'test@example.de',
        city: 'Nürnberg',
        service: 'kuechenmontage',
        message: 'IKEA Küche, 12 Schränke, nächste Woche',
        contact_type: '📝 Formular',
        source: 'Direct',
        gclid: '-',
        page_url: 'keller-montage.de/kontakt'
      })
    }
  });
  SpreadsheetApp.getUi().alert('✅ Test: Formular-Lead erstellt!');
}

// ⭐ Test: Anruf-Lead
function testAnruf() {
  doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Telefonkunde',
        phone: '0176 98765432',
        email: '-',
        city: 'Fürth',
        service: 'moebelmontage',
        message: 'PAX Schrank aufbauen, dringend',
        contact_type: '📞 Anruf',
        source: 'Direct',
        gclid: '-',
        page_url: '-'
      })
    }
  });
  SpreadsheetApp.getUi().alert('✅ Test: Anruf-Lead erstellt!');
}

// ⭐ Test: WhatsApp-Lead
function testWhatsApp() {
  doPost({
    postData: {
      contents: JSON.stringify({
        name: 'WhatsApp Kunde',
        phone: '0160 55555555',
        email: '-',
        city: 'Erlangen',
        service: 'lieferung-montage',
        message: 'Küche abholen und aufbauen',
        contact_type: '💬 WhatsApp',
        source: 'Organic',
        gclid: '-',
        page_url: 'keller-montage.de'
      })
    }
  });
  SpreadsheetApp.getUi().alert('✅ Test: WhatsApp-Lead erstellt!');
}

// ⭐ Test: Google Ads Lead
function testGoogleAds() {
  doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Google Ads Kunde',
        phone: '0911 11111111',
        email: 'gads@test.de',
        city: 'München',
        service: 'kuechenmontage',
        message: 'Neue IKEA Küche, sofort aufbauen!',
        contact_type: '📝 Formular',
        source: 'Google Ads',
        gclid: 'CjwKCAjw_KELLER_TEST_123456789',
        page_url: 'keller-montage.de/?gclid=CjwKCAjw_KELLER_TEST_123456789'
      })
    }
  });
  SpreadsheetApp.getUi().alert('✅ Test: Google Ads Lead erstellt!');
}

// =====================================================
// STATISTIK-FUNKTIONEN
// =====================================================

// ⭐ Statistik anzeigen
function showStats() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    SpreadsheetApp.getUi().alert('Keine Daten vorhanden.');
    return;
  }

  var data = sheet.getRange(2, 1, lastRow - 1, 14).getValues();

  var stats = {
    total: data.length,
    formular: 0,
    anruf: 0,
    whatsapp: 0,
    googleAds: 0,
    organic: 0,
    direct: 0,
    abgeschlossen: 0
  };

  for (var i = 0; i < data.length; i++) {
    var kontaktart = data[i][2];
    var quelle = data[i][10];
    var status = data[i][1];

    if (kontaktart.indexOf('Formular') > -1) stats.formular++;
    if (kontaktart.indexOf('Anruf') > -1) stats.anruf++;
    if (kontaktart.indexOf('WhatsApp') > -1) stats.whatsapp++;

    if (quelle.indexOf('Google Ads') > -1) stats.googleAds++;
    if (quelle.indexOf('Organic') > -1) stats.organic++;
    if (quelle.indexOf('Direct') > -1) stats.direct++;

    if (status.indexOf('Abgeschlossen') > -1) stats.abgeschlossen++;
  }

  var message = '📊 LEAD-STATISTIK\n\n' +
    '📬 Gesamt: ' + stats.total + '\n\n' +
    '--- KONTAKTART ---\n' +
    '📝 Formular: ' + stats.formular + '\n' +
    '📞 Anruf: ' + stats.anruf + '\n' +
    '💬 WhatsApp: ' + stats.whatsapp + '\n\n' +
    '--- QUELLE ---\n' +
    '🎯 Google Ads: ' + stats.googleAds + '\n' +
    '🔍 Organic: ' + stats.organic + '\n' +
    '🔗 Direct: ' + stats.direct + '\n\n' +
    '--- STATUS ---\n' +
    '✅ Abgeschlossen: ' + stats.abgeschlossen + ' (' + Math.round(stats.abgeschlossen / stats.total * 100) + '%)';

  SpreadsheetApp.getUi().alert(message);
}
