# Maher Objektservice online stellen

Der lokale Link `http://127.0.0.1:4173/` funktioniert nur auf dem eigenen Rechner.
Damit Freunde, Kunden oder Kontakte die Website per WhatsApp oder E-Mail sehen können,
muss die Seite bei einem Hosting-Anbieter veröffentlicht werden.

## Was veröffentlicht werden muss

Diese Dateien und Ordner gehören zusammen:

- `index.html`
- `styles.css`
- `script.js`
- `assets/`
- `bild-lizenzen.md` als Nachweis der verwendeten Bildquellen

## Einfachster Ablauf

1. Die ZIP-Datei `maher-objektservice-webseite.zip` entpacken.
2. Den entpackten Ordner bei einem Anbieter für statische Webseiten hochladen.
3. Den dort erzeugten öffentlichen Link per WhatsApp oder E-Mail teilen.

## Geeignete Optionen

- Ein bestehender Webspace, zum Beispiel bei IONOS, Strato, All-Inkl oder ähnlichen Anbietern.
- Ein Static-Site-Hoster wie Netlify, Vercel oder GitHub Pages.
- Eine eigene Domain, sobald die Seite dauerhaft genutzt werden soll.

## Noch offen

- Tally-Link in `index.html` bei `data-tally-url=""` eintragen.
- Eigene Bilder unter `assets/eigene-bilder/` ablegen.
- Optional Impressum und Datenschutz ergänzen, bevor die Seite öffentlich beworben wird.
