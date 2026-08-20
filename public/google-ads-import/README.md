# Google Ads Import Files

Diese Dateien können in Google Ads Editor importiert werden, um Ihre Werbekampagnen einzurichten.

## 📁 Dateien

| Datei | Beschreibung |
|-------|-------------|
| `campaigns.csv` | Kampagnen-Einstellungen (Budget, Standort, etc.) |
| `ad-groups.csv` | Anzeigengruppen mit Gebotsstrategien |
| `keywords.csv` | Keywords für Search-Kampagnen |
| `negative-keywords.csv` | Ausschließende Keywords |
| `responsive-search-ads.csv` | Responsive Suchanzeigen (Texte) |
| `responsive-display-ads.csv` | Display-Anzeigen für Remarketing |
| `sitelinks.csv` | Sitelink-Erweiterungen |
| `callouts.csv` | Callout-Erweiterungen |

## 🎯 Standort-Targeting

Alle Kampagnen sind auf **Nürnberg + 65km Radius** eingestellt.

## 📥 Import-Anleitung

### Methode 1: Google Ads Editor (Empfohlen)

1. Laden Sie [Google Ads Editor](https://ads.google.com/intl/de_de/home/tools/ads-editor/) herunter
2. Melden Sie sich mit Ihrem Google Ads-Konto an
3. Gehen Sie zu **Konto** → **Importieren** → **Aus CSV-Datei importieren**
4. Importieren Sie die Dateien in dieser Reihenfolge:
   - `campaigns.csv`
   - `ad-groups.csv`
   - `keywords.csv`
   - `responsive-search-ads.csv`
5. Überprüfen Sie die Änderungen
6. Klicken Sie auf **Hochladen** um die Änderungen zu veröffentlichen

### Methode 2: Google Ads Web-Oberfläche

1. Gehen Sie zu [ads.google.com](https://ads.google.com)
2. Öffnen Sie **Tools & Einstellungen** → **Bulk-Aktionen** → **Uploads**
3. Laden Sie die CSV-Dateien hoch

## 🖼️ Display-Banner erstellen

Für die Display-Remarketing-Kampagne müssen Banner-Bilder manuell erstellt werden:

1. Besuchen Sie `/admin/banners` auf Ihrer Website
2. Wählen Sie Banner-Variante und Größe
3. Machen Sie Screenshots der Banner
4. Laden Sie die Bilder in Google Ads hoch

### Empfohlene Banner-Größen:
- **Landscape**: 1200 x 628 px (Pflicht)
- **Square**: 1200 x 1200 px (Pflicht)
- **Logo Landscape**: 512 x 128 px
- **Logo Square**: 128 x 128 px

## ⚠️ Wichtige Hinweise

- Ersetzen Sie die Account-ID `743-891-1939` durch Ihre eigene Google Ads Account-ID
- Passen Sie das Tagesbudget an Ihre Bedürfnisse an
- Überprüfen Sie alle URLs vor dem Veröffentlichen
- Testen Sie die Kampagnen zunächst mit einem niedrigen Budget

## 📞 Support

Bei Fragen wenden Sie sich an den Website-Administrator.
