# Fahrradgeschäft-Anwendung

Dieses Vue.js-Projekt wurde entwickelt, um Fahrradprodukte für ein Fahrradgeschäft zu verwalten. Es umfasst Funktionen zum Auflisten von Fahrrädern, Hinzufügen neuer Produkte, Bearbeiten bestehender Einträge und Löschen derselben. Die Anwendung nutzt ein modernes Frontend-Framework, Vue.js, mit einem Vite-Build-Tool für eine schnelle Entwicklungsumgebung.

## Funktionen

- **Fahrräder auflisten**: Alle verfügbaren Fahrräder im Geschäft anzeigen.
- **Fahrrad hinzufügen**: Neue Fahrradeinträge zum Inventar hinzufügen.
- **Fahrrad bearbeiten**: Details vorhandener Fahrräder aktualisieren.
- **Fahrrad löschen**: Fahrräder aus dem Inventar entfernen.
- **Dunkelmodus**: Dunkelmodus für bessere Sichtbarkeit bei schlechten Lichtverhältnissen umschalten.

## Technologien
- **Suchfunktion**: Schnelles Auffinden von Fahrrädern durch Eingabe von Schlüsselwörtern.
- **Sortierung**: Sortieren von Fahrrädern nach Preis oder Namen in auf- oder absteigender Reihenfolge.
- **Filterung**: Filtern von Fahrrädern nach Kategorie oder Preisbereich.
- **Validierung**: Eingabeüberprüfung für Formulare, um sicherzustellen, dass nur gültige Daten gespeichert werden.
- **Benachrichtigungen**: Anzeigen von Benachrichtigungen für Benutzeraktionen wie Hinzufügen, Bearbeiten oder Löschen von Fahrrädern.
- **Lokalisierung**: Unterstützung für mehrere Sprachen, um die Anwendung in verschiedenen Regionen zu verwenden.
- **Zustandsverwaltung**: Verwendung von Vuex für die zentrale Speicherung von Anwendungsdaten.
- **Routing**: Verwendung von Vue Router für die Navigation zwischen verschiedenen Ansichten.


## Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass Sie folgendes installiert haben:
- [Node.js](https://nodejs.org/de/) (Version 12.x oder höher)
- [npm](https://www.npmjs.com/) (Kommt in der Regel mit Node.js)

## Empfohlene IDE-Einrichtung

Für die beste Entwicklungserfahrung verwenden Sie [Visual Studio Code](https://code.visualstudio.com/) mit der Erweiterung [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (deaktivieren Sie Vetur für Vue 3-Projekte).

## Installation

Folgen Sie diesen Schritten, um die Umgebung einzurichten:

1. **Repository klonen:**
   ```sh
   git clone https://github.com/Ihr-Benutzername/bikeshop-frontend.git
   cd bikeshop-frontend
   ```

2. **Abhängigkeiten installieren:**
   ```sh
   npm install
   ```

3. **Umgebungsvariablen einrichten:**
    - Kopieren Sie die Datei `.env.example` in `.env` und passen Sie die Backend-URL an, um auf Ihren Backend-Service zu zeigen.

## Die Anwendung betreiben

Um die Anwendung lokal zu betreiben:

1. **Entwicklungsserver starten:**
   ```sh
   npm run dev
   ```
   Dieser Befehl führt die App im Entwicklungsmodus aus. Öffnen Sie http://localhost:3000, um sie im Browser zu sehen. Die Seite wird automatisch neu geladen, wenn Sie Änderungen vornehmen.

2. **Für die Produktion bauen:**
   ```sh
   npm run build
   ```
   Erstellt die App für die Produktion im `dist`-Ordner. Es optimiert das Build für die beste Leistung.

3. **Produktionsbuild voranschauen:**
   ```sh
   npm run preview
   ```

## Tests

Führen Sie Ihre Unit-Tests mit folgendem Befehl aus:
```sh
npm run test:unit
```

## Linting

Linten und Dateien korrigieren mit:
```sh
npm run lint
```

## Bereitstellung

Stellen Sie das Produktions-Build bereit, indem Sie den Inhalt des `dist`-Ordners auf Ihren bevorzugten Anbieter für statisches Hosting hochladen (z.B. Netlify, Vercel, Amazon S3).

## Mitwirken

Beiträge sind immer willkommen! Sehen Sie `contributing.md` für Möglichkeiten, um anzufangen. Bitte halten Sie sich an den `Code of Conduct` dieses Projekts.

## Lizenz

Verteilt unter der MIT-Lizenz. Siehe `LICENSE` für weitere Informationen.
