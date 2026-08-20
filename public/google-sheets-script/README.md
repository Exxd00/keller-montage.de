# 📊 Möbelmontage Nürnberg - Google Sheets Integration

## 🚀 Schnellstart

### Schritt 1: Google Sheet erstellen
1. Öffne [Google Sheets](https://sheets.google.com)
2. Erstelle eine neue Tabelle
3. Benenne sie z.B. "Möbelmontage Anfragen"

### Schritt 2: Apps Script einrichten
1. Klicke auf **Erweiterungen** → **Apps Script**
2. Lösche den vorhandenen Code
3. Kopiere den gesamten Inhalt von `script.gs`
4. Füge ihn ein
5. Speichere mit **Strg+S**

### Schritt 3: Web-App bereitstellen
1. Klicke auf **Bereitstellen** → **Neue Bereitstellung**
2. Klicke auf das Zahnrad ⚙️ → **Web-App**
3. Einstellungen:
   - **Beschreibung**: Möbelmontage API
   - **Ausführen als**: Ich
   - **Zugriff**: Jeder
4. Klicke auf **Bereitstellen**
5. **Autorisierung**: Klicke "Zugriff prüfen" → Wähle dein Konto → "Erweitert" → "Zu [Projekt] wechseln" → "Zulassen"
6. **Kopiere die Web-App URL**

### Schritt 4: Umgebungsvariable setzen
Füge die URL als Umgebungsvariable hinzu:
```
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/DEINE_ID/exec
```

## 📋 Spalten-Übersicht

| Spalte | Inhalt | Beschreibung |
|--------|--------|--------------|
| A | Datum | Zeitstempel der Anfrage |
| B | Status | Bearbeitungsstatus (Dropdown) |
| C | Priorität | Dringlichkeit (automatisch erkannt) |
| D | Dienstleistung | Art der Anfrage |
| E | Name | Kundenname |
| F | Telefon | Klickbare Telefonnummer |
| G | E-Mail | Klickbare E-Mail |
| H | Details | Alle Service-spezifischen Infos |
| I | Nachricht | Freitext vom Kunden |
| J | Dateien | Anzahl hochgeladener Dateien |
| K | Datei-Links | URLs zu den Dateien |
| L | Notizen | Für manuelle Notizen |
| M | Bewertung | Kundenbewertung (Dropdown) |

## 🎨 Farbcodierung

### Status
- 🟠 **Orange Töne**: In Bearbeitung
- 🟢 **Grün**: Abgeschlossen
- ⚪ **Grau**: Wartet
- 🔴 **Rot**: Abgelehnt

### Priorität
- 🔴 **SOFORT/Express**: Rot - Sofortige Aufmerksamkeit
- 🟡 **Hoch**: Gelb - Diese Woche
- 🟢 **Normal**: Grün - Standard
- 🔵 **Flexibel**: Blau - Keine Eile

### Dienstleistung
- 🔵 **Küchenmontage**: Hellblau
- 🟢 **Möbelmontage**: Hellgrün
- 🟡 **Lieferung**: Hellgelb
- 🟣 **Umzug**: Helllila
- 🌸 **Entrümpelung**: Hellrosa

## 🧪 Testen

1. Öffne das Google Sheet
2. Klicke auf **🏠 Möbelmontage Nürnberg** im Menü
3. Wähle einen der Test-Einträge:
   - 🧪 Test: Küchenmontage
   - 🧪 Test: Möbelmontage
   - 🧪 Test: Lieferung
   - etc.

## 📊 Statistiken

Klicke auf **🏠 Möbelmontage Nürnberg** → **📊 Statistiken** um eine Übersicht zu sehen.

## ⚠️ Fehlerbehebung

### Webhook funktioniert nicht
1. Prüfe, ob die URL korrekt kopiert wurde
2. Stelle sicher, dass die Bereitstellung "Jeder" als Zugriff hat
3. Prüfe die Ausführungsprotokolle in Apps Script

### Berechtigungsfehler
1. Gehe zu Apps Script
2. Klicke auf **Bereitstellen** → **Bereitstellungen verwalten**
3. Bearbeite die aktive Bereitstellung
4. Autorisiere erneut

## 📞 Support

Bei Fragen: support@mobelmontage-nurnberg.de
