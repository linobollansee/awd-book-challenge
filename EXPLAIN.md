# EXPLAIN.md - Vollständige Erklärung der IT Book Library Codebase

## 📚 Inhaltsverzeichnis

1. [Projekt-Übersicht](#projekt-übersicht)
2. [Konfigurationsdateien](#konfigurationsdateien)
   - [package.json](#packagejson)
   - [tsconfig.json](#tsconfigjson)
3. [TypeScript-Dateien](#typescript-dateien)
   - [types.ts](#typests)
   - [index.ts](#indexts)
   - [favorite.ts](#favoritets)
   - [detail.ts](#detailts)
4. [HTML-Dateien](#html-dateien)
   - [index.html](#indexhtml)
   - [favorite.html](#favoritehtml)
   - [detail.html](#detailhtml)
5. [Styling](#styling)
   - [style.css](#stylecss)
6. [Wichtige Konzepte für Anfänger](#wichtige-konzepte-für-anfänger)

---

## Projekt-Übersicht

### Was macht diese Anwendung?

Die **IT Book Library** ist eine Webanwendung, mit der Benutzer:

- 📖 Eine Liste von IT-Büchern durchsuchen können
- 🔍 Nach Büchern filtern und suchen können
- ❤️ Bücher als Favoriten markieren können
- 📄 Detaillierte Informationen zu jedem Buch ansehen können
- 💾 Ihre Favoriten dauerhaft im Browser speichern können

### Verwendete Technologien

- **TypeScript**: Eine Erweiterung von JavaScript mit Typsicherheit
- **HTML5**: Für die Struktur der Webseiten
- **CSS3**: Für das Styling (mit Milligram CSS-Framework)
- **localStorage**: Browser-Speicher für Favoriten
- **Fetch API**: Zum Abrufen von Daten vom Server
- **DOM-Manipulation**: Direktes Arbeiten mit HTML-Elementen

### Projekt-Struktur

```
awd-book-challenge-main/
│
├── src/                          # Quellcode-Verzeichnis
│   ├── types.ts                 # TypeScript-Typdefinitionen
│   ├── index.html               # Hauptseite (Bücherliste)
│   ├── index.ts                 # Logik für Bücherliste
│   ├── favorite.html            # Favoriten-Seite
│   ├── favorite.ts              # Logik für Favoriten
│   ├── detail.html              # Detailseite für ein Buch
│   ├── detail.ts                # Logik für Detailseite
│   ├── style.css                # Eigene CSS-Styles
│   └── images/                  # Buchcover-Bilder
│
├── dist/                         # Kompilierte JavaScript-Dateien (generiert)
├── node_modules/                 # Installierte npm-Pakete (generiert)
│
├── package.json                  # Projekt-Konfiguration und Abhängigkeiten
├── tsconfig.json                # TypeScript-Konfiguration
├── README.md                    # Projekt-Dokumentation
└── CHALLENGE.md                 # Aufgabenbeschreibung
```

---

## Konfigurationsdateien

### package.json

Die `package.json` Datei ist das **Herzstück** jedes Node.js- und TypeScript-Projekts. Sie definiert:

- Projekt-Metadaten (Name, Version, Beschreibung)
- Abhängigkeiten (externe Bibliotheken)
- Skripte (Befehle zum Bauen, Testen, Starten)

#### Vollständiger Inhalt der Datei

```json
{
  "name": "it-book-library",
  "version": "1.0.0",
  "description": "IT Book Library - A simple book listing application",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "api": "npx bookmonkey-api",
    "serve": "npx http-server -p 8000",
    "start": "concurrently \"npm run api\" \"npm run serve\"",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "concurrently": "^9.2.1",
    "typescript": "^5.9.3"
  },
  "dependencies": {
    "bookmonkey-api": "^3.2.0"
  }
}
```

#### Erklärung der Felder

##### 1. Projekt-Metadaten

**`name`** - Der Projektname

```json
"name": "it-book-library"
```

- Muss **kleingeschrieben** sein
- Keine Leerzeichen erlaubt (verwende stattdessen `-` oder `_`)
- Wird verwendet, wenn das Projekt als npm-Paket veröffentlicht wird
- Andere Entwickler können es dann mit `npm install it-book-library` installieren

**`version`** - Die Versionsnummer

```json
"version": "1.0.0"
```

- Folgt dem **Semantic Versioning** Schema: `major.minor.patch`
  - **Major** (1): Breaking Changes - große Änderungen, die nicht rückwärtskompatibel sind
  - **Minor** (0): Neue Features - Funktionen hinzugefügt, aber rückwärtskompatibel
  - **Patch** (0): Bugfixes - kleine Fehlerbehebungen

**Beispiele für Versionierung:**

```
1.0.0  →  1.0.1  (Bugfix: Tippfehler korrigiert)
1.0.1  →  1.1.0  (Feature: Neue Suchfunktion hinzugefügt)
1.1.0  →  2.0.0  (Breaking Change: API komplett umgebaut)
```

**`description`** - Kurzbeschreibung

```json
"description": "IT Book Library - A simple book listing application"
```

- Eine kurze Beschreibung, was das Projekt macht
- Wird auf npmjs.com angezeigt, wenn das Paket veröffentlicht wird

---

##### 2. Scripts - Automatisierte Befehle

Das `scripts` Objekt enthält **benutzerdefinierte Befehle**, die mit `npm run <scriptname>` ausgeführt werden können.

**`build`** - TypeScript kompilieren

```json
"build": "tsc"
```

- **Befehl**: `npm run build`
- **Was passiert**: Führt den TypeScript-Compiler aus
- **Ergebnis**: Alle `.ts` Dateien werden zu `.js` Dateien kompiliert
- **Output**: Die kompilierten Dateien landen im `dist/` Ordner

**Beispiel:**

```bash
npm run build
# Kompiliert:
# src/index.ts     → dist/index.js
# src/types.ts     → dist/types.js
# src/favorite.ts  → dist/favorite.js
```

---

**`watch`** - Automatisch neu kompilieren bei Änderungen

```json
"watch": "tsc --watch"
```

- **Befehl**: `npm run watch`
- **Was passiert**: Startet den TypeScript-Compiler im Watch-Modus
- **Verhalten**:
  - Kompiliert sofort alle Dateien
  - Beobachtet dann alle `.ts` Dateien auf Änderungen
  - Kompiliert automatisch neu, sobald eine Datei gespeichert wird
- **Vorteil**: Du musst nicht jedes Mal manuell `npm run build` ausführen

**Workflow beim Entwickeln:**

```bash
# Terminal 1:
npm run watch    # Läuft im Hintergrund und beobachtet Änderungen

# Du bearbeitest index.ts und speicherst
# → TypeScript kompiliert automatisch zu index.js

# Du bearbeitest favorite.ts und speicherst
# → TypeScript kompiliert automatisch zu favorite.js
```

---

**`api`** - API-Server starten

```json
"api": "npx bookmonkey-api"
```

- **Befehl**: `npm run api`
- **Was passiert**: Startet die BookMonkey-API
- **npx**: Führt ein npm-Paket aus, ohne es global zu installieren
- **Port**: Die API läuft auf `http://localhost:4730`
- **Endpoints**:
  - `GET /books` - Alle Bücher abrufen
  - `GET /books/:isbn` - Ein spezifisches Buch abrufen

**Was ist eine API?**

Eine **API (Application Programming Interface)** ist eine Schnittstelle, über die Programme miteinander kommunizieren können. In unserem Fall:

- Die BookMonkey-API ist ein **Server**, der Buchdaten bereitstellt
- Unsere Webanwendung ist ein **Client**, der diese Daten abruft

```
Browser (Client)  →  HTTP Request  →  API (Server)
                 ←  JSON Response  ←
```

---

**`serve`** - Webserver starten

```json
"serve": "npx http-server -p 8000"
```

- **Befehl**: `npm run serve`
- **Was passiert**: Startet einen lokalen Webserver
- **http-server**: Ein einfacher statischer Webserver
- **-p 8000**: Port-Option - der Server läuft auf Port 8000
- **URL**: Die Anwendung ist dann unter `http://localhost:8000` erreichbar

**Warum brauchen wir einen Webserver?**

Man kann HTML-Dateien zwar direkt im Browser öffnen (`file:///C:/...`), aber:

- ❌ Module funktionieren nicht (CORS-Fehler)
- ❌ Fetch-API funktioniert nicht richtig
- ❌ Keine realistische Testumgebung

Mit einem Webserver:

- ✅ Module funktionieren einwandfrei
- ✅ Fetch-API funktioniert wie erwartet
- ✅ Simuliert echte Webserver-Umgebung

---

**`start`** - Alles gleichzeitig starten

```json
"start": "concurrently \"npm run api\" \"npm run serve\""
```

- **Befehl**: `npm start` (Kurzform ohne `run`)
- **Was passiert**: Startet API-Server UND Webserver gleichzeitig
- **concurrently**: npm-Paket, das mehrere Befehle parallel ausführt
- **Syntax**: `concurrently "befehl1" "befehl2"`

**Warum die Anführungszeichen mit Backslash `\"`?**

```json
"start": "concurrently \"npm run api\" \"npm run serve\""
```

**Erklärung:**

```json
"start": "concurrently \"npm run api\" \"npm run serve\""
```

- Die **äußeren `"`** (direkt nach `:` und ganz am Ende) = JSON-String-Grenzen
- Die **`\"`** = Escaped Quotes (Backslash + Anführungszeichen im String-Inhalt)
- Jedes `\"` wird zu einem `"` im tatsächlichen String-Wert

**Der String-Wert ist:**

```
concurrently "npm run api" "npm run serve"
```

In JSON müssen Anführungszeichen innerhalb eines Strings mit `\"` escaped werden.

**Was passiert beim Ausführen?**

```bash
npm start

# Terminal zeigt:
# [0] BookMonkey-API läuft auf http://localhost:4730
# [1] http-server läuft auf http://localhost:8000
# [0] GET /books 200 OK
# [1] GET /index.html 200 OK
```

Beide Prozesse laufen gleichzeitig und zeigen ihre Ausgaben im selben Terminal.

---

**`dev`** - Entwicklungsmodus

```json
"dev": "tsc --watch"
```

- **Befehl**: `npm run dev`
- **Was passiert**: Gleich wie `npm run watch`
- **Warum zwei identische Scripts?**
  - `watch` ist beschreibend (was es tut)
  - `dev` ist konventionell (in vielen Projekten üblich)
  - Beide Befehle können verwendet werden

**Typischer Entwicklungs-Workflow:**

```bash
# Terminal 1: TypeScript automatisch kompilieren
npm run dev

# Terminal 2: Server starten
npm start

# Browser öffnen: http://localhost:8000
# Code bearbeiten → Automatisch neu kompiliert → Browser neu laden
```

---

##### 3. Dependencies - Projekt-Abhängigkeiten

**Was sind Dependencies?**

Dependencies (Abhängigkeiten) sind **externe Bibliotheken oder Pakete**, die das Projekt zum Funktionieren braucht. Sie werden aus dem npm-Registry heruntergeladen.

Es gibt zwei Arten:

- **dependencies**: Werden in der fertigen Anwendung gebraucht
- **devDependencies**: Werden nur während der Entwicklung gebraucht

---

**`devDependencies`** - Entwicklungsabhängigkeiten

```json
"devDependencies": {
  "concurrently": "^9.2.1",
  "typescript": "^5.9.3"
}
```

**Was sind devDependencies?**

Pakete, die nur während der **Entwicklung** benötigt werden:

- Compiler (TypeScript)
- Build-Tools (Webpack, Vite)
- Test-Frameworks (Jest, Mocha)
- Linter (ESLint)

Sie werden **nicht** in der fertigen Anwendung ausgeliefert.

---

**concurrently** - Mehrere Befehle parallel ausführen

```json
"concurrently": "^9.2.1"
```

- **Version**: `^9.2.1` (siehe Versionierung unten)
- **Zweck**: Ermöglicht das parallele Ausführen mehrerer npm-Scripts
- **Verwendung**: Im `start` Script

**Beispiel ohne concurrently:**

```bash
npm run api      # Startet API
# Terminal ist blockiert, kann nichts anderes tun!
# Ctrl+C zum Beenden
npm run serve    # Kann erst jetzt gestartet werden
```

**Beispiel mit concurrently:**

```bash
npm start        # Startet API UND Webserver gleichzeitig
# Beide laufen parallel im selben Terminal
```

---

**typescript** - Der TypeScript-Compiler

```json
"typescript": "^5.9.3"
```

- **Version**: `^5.9.3` (siehe Versionierung unten)
- **Zweck**: Kompiliert TypeScript (`.ts`) zu JavaScript (`.js`)
- **Befehl**: `tsc` (TypeScript Compiler)
- **Konfiguration**: Liest Einstellungen aus `tsconfig.json`

**Warum TypeScript?**

```typescript
// JavaScript - Fehler erst zur Laufzeit
function add(a, b) {
  return a + b;
}
add(5, "10"); // "510" - Unerwartetes Verhalten!

// TypeScript - Fehler sofort beim Schreiben
function add(a: number, b: number): number {
  return a + b;
}
add(5, "10"); // ❌ FEHLER: Argument of type 'string' is not assignable to parameter of type 'number'
```

---

**Versions-Syntax mit `^` (Caret)**

```json
"typescript": "^5.9.3"
```

Das `^` Symbol definiert, welche Versionen erlaubt sind:

**`^5.9.3` bedeutet:**

- ✅ `5.9.3` - Exakt diese Version
- ✅ `5.9.4` - Patch-Updates erlaubt
- ✅ `5.10.0` - Minor-Updates erlaubt
- ✅ `5.99.99` - Alle Minor- und Patch-Updates erlaubt
- ❌ `6.0.0` - Major-Updates nicht erlaubt (Breaking Changes)

**Andere Versions-Symbole:**

```json
"^5.9.3"   // Kompatible Updates (5.x.x)
"~5.9.3"   // Nur Patch-Updates (5.9.x)
"5.9.3"    // Exakt diese Version
"*"        // Jede Version (gefährlich!)
">=5.9.3"  // Mindestens 5.9.3
```

**Warum `^` verwenden?**

```json
// ❌ Zu strikt - keine Bugfixes
"typescript": "5.9.3"

// ✅ Optimal - Bugfixes und Features, aber keine Breaking Changes
"typescript": "^5.9.3"

// ⚠️ Zu locker - könnte Breaking Changes einführen
"typescript": "*"
```

---

**`dependencies`** - Produktionsabhängigkeiten

```json
"dependencies": {
  "bookmonkey-api": "^3.2.0"
}
```

**Was sind dependencies?**

Pakete, die die Anwendung **zum Laufen** braucht:

- Bibliotheken (React, Vue, Angular)
- Utility-Pakete (Lodash, Moment.js)
- API-Server (in unserem Fall)

Sie werden **mit** der Anwendung ausgeliefert.

---

**bookmonkey-api** - Die Buch-Datenbank API

```json
"bookmonkey-api": "^3.2.0"
```

- **Version**: `^3.2.0`
- **Zweck**: Stellt eine REST-API mit Buchdaten bereit
- **Verwendung**: Wird mit `npm run api` gestartet
- **Daten**: Enthält eine vordefinierte Liste von IT-Büchern

**Wie funktioniert diese API?**

```bash
# API starten:
npm run api

# API-Endpoints:
GET http://localhost:4730/books
# Gibt alle Bücher zurück

GET http://localhost:4730/books/9783864907791
# Gibt das Buch mit dieser ISBN zurück
```

**Beispiel-Response von `/books`:**

```json
[
  {
    "isbn": "9783864907791",
    "title": "Angular",
    "subtitle": "Grundlagen, fortgeschrittene Themen und Best Practices",
    "author": "Ferdinand Malcher, Johannes Hoppe, Danny Koppenhagen",
    "publisher": "dpunkt.verlag",
    "abstract": "Mit Angular...",
    "numPages": 850,
    "price": "36.90",
    "cover": "angular.png"
  }
  // ... mehr Bücher
]
```

---

##### 4. Installation der Abhängigkeiten

**Erstmaliges Setup:**

```bash
# Alle Abhängigkeiten installieren:
npm install

# Was passiert:
# 1. npm liest package.json
# 2. Lädt alle dependencies und devDependencies herunter
# 3. Speichert sie im node_modules/ Ordner
# 4. Erstellt package-lock.json (speichert exakte Versionen)
```

**Nach dem Installieren:**

```
node_modules/
├── concurrently/
│   ├── index.js
│   └── package.json
├── typescript/
│   ├── lib/
│   ├── bin/
│   │   └── tsc
│   └── package.json
├── bookmonkey-api/
│   └── ...
└── ... (viele weitere Unter-Abhängigkeiten)
```

**`node_modules/` ist groß!**

Oft 100+ MB, weil jedes Paket seine eigenen Abhängigkeiten hat:

```
deine-app/package.json
└── typescript (dependency)
    └── @types/node (dependency von typescript)
        └── ... (dependency von @types/node)
```

**Deshalb steht `node_modules/` in `.gitignore`** - wird nicht ins Git-Repository eingecheckt!

---

##### 5. Zusammenfassung der Befehle

Hier sind alle npm-Befehle auf einen Blick:

```bash
# Abhängigkeiten installieren (einmalig):
npm install

# TypeScript einmalig kompilieren:
npm run build

# TypeScript im Watch-Modus (automatisch neu kompilieren):
npm run watch
# oder:
npm run dev

# API-Server starten:
npm run api

# Webserver starten:
npm run serve

# API + Webserver gleichzeitig starten:
npm start

# Typischer Entwicklungs-Workflow:
# Terminal 1:
npm run dev      # TypeScript Watch-Modus

# Terminal 2:
npm start        # API + Webserver

# Browser: http://localhost:8000
```

---

##### 6. package-lock.json

Wenn du `npm install` ausführst, wird automatisch eine `package-lock.json` Datei erstellt.

**Was macht package-lock.json?**

```json
// package.json sagt:
"typescript": "^5.9.3"  // Erlaubt 5.9.3 bis 5.99.99

// package-lock.json sagt:
"typescript": {
  "version": "5.9.3"     // Exakt diese Version wurde installiert
}
```

**Warum ist das wichtig?**

```bash
# Szenario: package-lock.json wird NICHT ins Git eingecheckt

# Entwickler A installiert im März 2024:
npm install
# Bekommt typescript@5.4.2 (neueste Version zu diesem Zeitpunkt)
# package-lock.json wird erstellt, aber NICHT committet

# Entwickler B klont Repository im Oktober 2024:
npm install
# Bekommt typescript@5.9.3 (neueste Version zu diesem Zeitpunkt)
# Erstellt eigene package-lock.json mit 5.9.3

# Problem: Unterschiedliche Versionen → Unterschiedliches Verhalten!
```

**Mit package-lock.json im Git:**

```bash
# Entwickler A installiert im März 2024:
npm install
# Bekommt typescript@5.4.2
# → package-lock.json wird mit Version 5.4.2 erstellt
git add package-lock.json && git commit && git push

# Entwickler B klont Repository im Oktober 2024:
npm install
# Bekommt typescript@5.4.2 (aus der commiteten package-lock.json!)
# → Konsistente Entwicklungsumgebung!
```

**Faustregel:**

- ✅ `package.json` → Ins Git-Repository einchecken
- ✅ `package-lock.json` → Ins Git-Repository einchecken
- ❌ `node_modules/` → NICHT ins Git-Repository (siehe `.gitignore`)

---

### tsconfig.json

Die `tsconfig.json` Datei ist die **Konfigurationsdatei für den TypeScript-Compiler**. Sie steuert, wie TypeScript-Code in JavaScript umgewandelt wird und welche Typ-Checks durchgeführt werden.

#### Vollständiger Inhalt der Datei

```json
{
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./dist",

    // Environment Settings
    "module": "ES2022",
    "target": "ES2023",
    "lib": ["ES2023", "DOM"],

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Recommended Options
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

#### Erklärung der Optionen

---

##### 1. File Layout - Datei-Struktur

Diese Optionen bestimmen, wo TypeScript nach Eingabedateien sucht und wohin die kompilierten Dateien geschrieben werden.

**`rootDir`** - Quellcode-Verzeichnis

```json
"rootDir": "./src"
```

- **Was es macht**: Definiert das **Wurzelverzeichnis** der TypeScript-Quelldateien
- **In unserem Projekt**: Alle `.ts` Dateien liegen in `src/`
- **Wichtig**: Die Ordnerstruktur wird im Output beibehalten

**Beispiel:**

```
Eingabe (rootDir: "./src"):
src/
├── index.ts
├── favorite.ts
└── types.ts

Ausgabe (outDir: "./dist"):
dist/
├── index.js
├── favorite.js
└── types.js
```

**Was passiert ohne rootDir?**

```typescript
// Ohne rootDir:
// TypeScript würde alle .ts Dateien im gesamten Projekt kompilieren
// Das könnte auch test-Dateien oder node_modules einschließen!

// Mit rootDir: "./src"
// TypeScript kompiliert NUR Dateien in src/
```

---

**`outDir`** - Ausgabe-Verzeichnis

```json
"outDir": "./dist"
```

- **Was es macht**: Definiert, wohin die kompilierten `.js` Dateien geschrieben werden
- **In unserem Projekt**: Alle `.js` Dateien landen in `dist/`
- **Vorteil**: Trennt Quellcode von kompiliertem Code

**Warum Trennung von src/ und dist/?**

```
✅ Mit Trennung:
src/           (Dein TypeScript-Code - editierbar)
├── index.ts
└── types.ts

dist/          (Generierter JavaScript-Code - nicht editieren!)
├── index.js
└── types.js

❌ Ohne Trennung (beide im selben Ordner):
src/
├── index.ts   (Welche Datei ist die Quelle?)
├── index.js   (Welche ist generiert?)
├── types.ts   (Kann verwirrend sein!)
└── types.js
```

**Workflow:**

```bash
# 1. Du schreibst TypeScript:
src/index.ts

# 2. Du führst den Compiler aus:
npm run build

# 3. TypeScript generiert JavaScript:
dist/index.js

# 4. Der Browser lädt:
<script src="../dist/index.js"></script>
```

---

##### 2. Environment Settings - Umgebungs-Einstellungen

Diese Optionen bestimmen, welche JavaScript-Version generiert wird und welche Features verfügbar sind.

**`module`** - Modul-System

```json
"module": "ES2022"
```

- **Was es macht**: Bestimmt, wie `import`/`export` Statements kompiliert werden
- **ES2022**: Moderne ECMAScript-Module (ESM)
- **Alternative**: `"CommonJS"` (für Node.js < Version 14)

**Was sind Module?**

Module ermöglichen es, Code in separate Dateien aufzuteilen:

```typescript
// types.ts
export interface Book { ... }

// index.ts
import { Book } from "./types.js";
```

**Verschiedene Modul-Systeme:**

```typescript
// TypeScript-Code (gleich für alle):
export const name = "Alice";

// Kompiliert zu ES2022:
export const name = "Alice";

// Kompiliert zu CommonJS:
const name = "Alice";
module.exports = { name };
```

**Warum ES2022?**

```typescript
// ✅ ES2022 (moderne Browser):
import { Book } from "./types.js";
// - Native Browser-Unterstützung
// - Kein Bundler nötig für Entwicklung
// - Bessere Performance

// ⚠️ CommonJS (Node.js):
const { Book } = require("./types");
// - Funktioniert nicht im Browser
// - Benötigt Bundler (Webpack, etc.)
```

---

**`target`** - Ziel-JavaScript-Version

```json
"target": "ES2023"
```

- **Was es macht**: Bestimmt, welche **JavaScript-Version** generiert wird
- **ES2023**: Sehr moderne Features
- **Alternative**: `"ES5"` (für alte Browser wie IE11)

**Was bedeutet das?**

TypeScript kann moderne Syntax in ältere Syntax umwandeln:

```typescript
// TypeScript-Code:
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);

// Kompiliert zu ES2023 (modern):
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
// → Fast identisch, Arrow Functions werden beibehalten

// Kompiliert zu ES5 (alt):
var numbers = [1, 2, 3];
var doubled = numbers.map(function (n) {
  return n * 2;
});
// → var statt const, function statt Arrow Function
```

**Weitere Beispiele:**

```typescript
// Optional Chaining (ES2020):
const title = book?.title;

// Kompiliert zu ES2023:
const title = book?.title; // Bleibt gleich

// Kompiliert zu ES5:
const title = book !== null && book !== void 0 ? book.title : void 0;
// Wird umgeschrieben für alte Browser
```

**Warum ES2023?**

Unsere Zielgruppe sind **moderne Browser**:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Für alte Browser (IE11) müssten wir `"target": "ES5"` verwenden.

---

**`lib`** - Verfügbare APIs

```json
"lib": ["ES2023", "DOM"]
```

- **Was es macht**: Definiert, welche **JavaScript-APIs** TypeScript kennt
- **ES2023**: Moderne JavaScript-Features (Array.at(), Promise.any(), etc.)
- **DOM**: Browser-APIs (document, window, fetch, localStorage, etc.)

**Was bedeutet das praktisch?**

TypeScript gibt dir nur dann Autovervollständigung und Typ-Checks für APIs, die in `lib` aufgelistet sind:

```typescript
// Mit "lib": ["ES2023", "DOM"]

// ✅ ES2023 Features funktionieren:
const arr = [1, 2, 3];
const last = arr.at(-1); // Array.at() ist in ES2023

// ✅ DOM-APIs funktionieren:
const element = document.querySelector(".button"); // document ist im DOM
const data = localStorage.getItem("key"); // localStorage ist im DOM

// ❌ Node.js-APIs funktionieren NICHT:
const fs = require("fs"); // ❌ FEHLER: 'require' is not defined
// Würde "node" in lib benötigen
```

**Unterschied zwischen Browser und Node.js:**

```typescript
// Browser (lib: ["DOM"]):
fetch("https://api.example.com"); // ✅ Funktioniert
process.exit(0); // ❌ Fehler: 'process' existiert nicht

// Node.js (lib: ["esnext"], types: ["node"]):
fetch("https://api.example.com"); // ❌ Fehler (außer mit Node 18+)
process.exit(0); // ✅ Funktioniert
```

**Was enthält ES2023?**

Moderne JavaScript-Features:

- `Array.at()` - Negativer Index: `arr.at(-1)` für letztes Element
- `Array.findLast()` - Sucht von hinten
- `Object.hasOwn()` - Bessere Alternative zu `hasOwnProperty`
- `Promise.any()` - Erste erfüllte Promise
- Und viele mehr...

**Was enthält DOM?**

Alle Browser-APIs:

- `document` - HTML-Dokument
- `window` - Browser-Fenster
- `localStorage` - Lokaler Speicher
- `fetch` - HTTP-Requests
- `Element`, `HTMLElement` - HTML-Elemente
- Event-APIs - `addEventListener`, etc.

---

##### 3. Other Outputs - Zusätzliche Ausgaben

Diese Optionen erzeugen zusätzliche Dateien neben den `.js` Dateien.

**`sourceMap`** - Source Maps für Debugging

```json
"sourceMap": true
```

- **Was es macht**: Erstellt `.js.map` Dateien
- **Zweck**: Ermöglicht Debugging des **TypeScript-Codes** im Browser

**Was ist eine Source Map?**

Eine Source Map ist eine Datei, die den kompilierten JavaScript-Code mit dem Original-TypeScript-Code verknüpft.

```
index.ts  ←──┐
             │ Source Map
index.js  ←──┘
index.js.map
```

**Warum ist das wichtig?**

```typescript
// TypeScript (index.ts) - Zeile 42:
const books = await fetchBooks();
console.log(books);

// Kompilierter JavaScript (index.js) - Zeile 87:
const books = await fetchBooks();
console.log(books);

// Im Browser siehst du normalerweise:
// ❌ "Fehler in index.js:87"
// Du musst im kompilierten Code suchen 😞

// Mit Source Map siehst du:
// ✅ "Fehler in index.ts:42"
// Du siehst direkt deinen TypeScript-Code! 😊
```

**Browser Developer Tools:**

```
Ohne Source Map:
Console → Fehler → index.js:87
// Du siehst kompilierten JavaScript-Code
// Schwer zu debuggen!

Mit Source Map:
Console → Fehler → index.ts:42
// Du siehst deinen Original-TypeScript-Code
// Einfach zu debuggen!
```

**Generierte Dateien:**

```bash
npm run build

# Erstellt:
dist/
├── index.js         # Kompilierter Code
├── index.js.map     # Source Map (Verbindung zu .ts)
├── favorite.js
├── favorite.js.map
├── types.js
└── types.js.map
```

---

**`declaration`** - TypeScript-Deklarationsdateien

```json
"declaration": true
```

- **Was es macht**: Erstellt `.d.ts` Dateien (Declaration Files)
- **Zweck**: Andere TypeScript-Projekte können deine Typen verwenden

**Was ist eine .d.ts Datei?**

Eine Declaration File enthält **nur die Typ-Definitionen**, keinen ausführbaren Code:

```typescript
// types.ts (Original):
export interface Book {
  id: string;
  title: string;
  author: string;
}

export function getBook(id: string): Book {
  // ... Implementation
}

// types.d.ts (Generiert):
export interface Book {
  id: string;
  title: string;
  author: string;
}

export declare function getBook(id: string): Book;
// Nur die Signatur, keine Implementation!
```

**Wofür braucht man das?**

```typescript
// Szenario: Du veröffentlichst dein Projekt als npm-Paket

// Ohne .d.ts:
import { Book } from "it-book-library";
const book: Book = ...;  // ❌ TypeScript kennt den Typ nicht

// Mit .d.ts:
import { Book } from "it-book-library";
const book: Book = ...;  // ✅ TypeScript kennt den Typ!
// Autovervollständigung funktioniert!
```

**Für unser Projekt:**

Da wir die Library nicht veröffentlichen, sind `.d.ts` Dateien nicht zwingend nötig. Sie können aber hilfreich sein für:

- Bessere Editor-Unterstützung
- Dokumentation der API
- Vorbereitung für spätere Veröffentlichung

---

**`declarationMap`** - Source Maps für Deklarationen

```json
"declarationMap": true
```

- **Was es macht**: Erstellt `.d.ts.map` Dateien
- **Zweck**: Verknüpft `.d.ts` Dateien mit den Original `.ts` Dateien

**Warum ist das nützlich?**

```typescript
// Wenn du in VS Code auf einen importierten Typ klickst:

// Ohne declarationMap:
// → Springt zu types.d.ts (nur Typ-Definition)

// Mit declarationMap:
// → Springt zu types.ts (Original-Datei mit Kommentaren)
```

**Generierte Dateien:**

```bash
npm run build

# Erstellt:
dist/
├── types.js
├── types.js.map        # Source Map für JavaScript
├── types.d.ts          # Typ-Deklarationen
└── types.d.ts.map      # Source Map für Deklarationen
```

---

##### 4. Stricter Typechecking Options - Strengere Typ-Checks

Diese Optionen aktivieren zusätzliche Sicherheitschecks über die `strict` Option hinaus.

**`noUncheckedIndexedAccess`** - Sichere Array-Zugriffe

```json
"noUncheckedIndexedAccess": true
```

- **Was es macht**: Array-Zugriffe können `undefined` zurückgeben
- **Zweck**: Verhindert Laufzeitfehler bei Array-Zugriffen

**Problem ohne diese Option:**

```typescript
const books: Book[] = [book1, book2];

// Ohne noUncheckedIndexedAccess:
const book = books[5];
console.log(book.title); // ❌ Laufzeitfehler: Cannot read property 'title' of undefined
// TypeScript denkt, book ist immer ein Book

// Mit noUncheckedIndexedAccess:
const book = books[5]; // Typ: Book | undefined
console.log(book.title); // ❌ TypeScript-Fehler: Object is possibly 'undefined'
// Du MUSST prüfen, ob book existiert!

// Korrekter Code:
const book = books[5];
if (book) {
  console.log(book.title); // ✅ Sicher!
}
```

**Warum ist das wichtig?**

```typescript
// Typisches Szenario:
function getFirstBook(books: Book[]): string {
  return books[0].title; // Was wenn books leer ist?
}

// Ohne noUncheckedIndexedAccess:
getFirstBook([]); // ❌ Crash! Cannot read property 'title' of undefined

// Mit noUncheckedIndexedAccess:
function getFirstBook(books: Book[]): string {
  return books[0].title; // ❌ Compile-Fehler!
  // TypeScript zwingt dich zu prüfen:
  if (books[0]) {
    return books[0].title; // ✅ Sicher!
  }
  return "Kein Buch gefunden";
}
```

---

**`exactOptionalPropertyTypes`** - Exakte optionale Properties

```json
"exactOptionalPropertyTypes": true
```

- **Was es macht**: Unterscheidet zwischen `undefined` und "nicht vorhanden"
- **Zweck**: Strengere Typ-Sicherheit bei optionalen Properties

**Problem ohne diese Option:**

```typescript
interface Book {
  title: string;
  subtitle?: string; // Optional
}

// Ohne exactOptionalPropertyTypes:
const book1: Book = {
  title: "JavaScript",
  subtitle: undefined, // ✅ Erlaubt
};

const book2: Book = {
  title: "JavaScript",
  // subtitle fehlt  // ✅ Auch erlaubt
};

// Mit exactOptionalPropertyTypes:
const book1: Book = {
  title: "JavaScript",
  subtitle: undefined, // ❌ FEHLER!
};

const book2: Book = {
  title: "JavaScript",
  // subtitle fehlt  // ✅ OK
};
```

**Warum ist das wichtig?**

```typescript
// Semantischer Unterschied:
interface Book {
  subtitle?: string;
}

// "Property fehlt" vs "Property ist undefined":
const book1 = {
  title: "JavaScript",
  // subtitle existiert nicht
};

const book2 = {
  title: "JavaScript",
  subtitle: undefined,
  // subtitle existiert, ist aber undefined
};

// In JSON wird nur book1 korrekt serialisiert:
JSON.stringify(book1); // {"title":"JavaScript"}
JSON.stringify(book2); // {"title":"JavaScript","subtitle":null}
```

**Praktisches Beispiel:**

```typescript
interface UpdateBookRequest {
  title?: string;
  author?: string;
}

// Ohne exactOptionalPropertyTypes:
const update: UpdateBookRequest = {
  title: undefined, // ✅ Erlaubt
};
// API bekommt: {"title": null}
// → Überschreibt den Titel mit null!

// Mit exactOptionalPropertyTypes:
const update: UpdateBookRequest = {
  title: undefined, // ❌ FEHLER
};
// Du musst entweder:
const update = {
  title: "Neuer Titel", // Property mit Wert
};
// oder:
const update = {
  // title fehlt komplett
};
// API bekommt: {}
// → Ändert den Titel nicht!
```

---

##### 5. Recommended Options - Empfohlene Optionen

Diese Optionen sind Best Practices und sollten fast immer aktiviert sein.

**`strict`** - Alle strikten Typ-Checks aktivieren

```json
"strict": true
```

- **Was es macht**: Aktiviert **ALLE** strikten TypeScript-Checks auf einmal
- **Wichtigste Option!** Sollte immer `true` sein
- **Aktiviert automatisch**:
  - `noImplicitAny` - Verbietet implizites `any`
  - `strictNullChecks` - `null` und `undefined` müssen explizit behandelt werden
  - `strictFunctionTypes` - Strengere Funktions-Typ-Checks
  - `strictBindCallApply` - Typ-Checks für `.bind()`, `.call()`, `.apply()`
  - `strictPropertyInitialization` - Class-Properties müssen initialisiert werden
  - `noImplicitThis` - `this` muss getypt sein
  - `alwaysStrict` - `"use strict"` in jeder Datei
  - `useUnknownInCatchVariables` - Catch-Variablen sind `unknown` statt `any`

**Beispiele für strikte Checks:**

**`noImplicitAny`** - Kein implizites `any`

```typescript
// Ohne strict:
function add(a, b) {
  // ✅ OK - a und b sind implizit 'any'
  return a + b;
}
add(5, "10"); // "510" - Unerwartetes Verhalten!

// Mit strict:
function add(a, b) {
  // ❌ FEHLER: Parameter 'a' implicitly has an 'any' type
  return a + b;
}

// Korrigiert:
function add(a: number, b: number): number {
  // ✅ Typen explizit
  return a + b;
}
add(5, "10"); // ❌ FEHLER: Argument of type 'string' is not assignable to parameter of type 'number'
```

**`strictNullChecks`** - Null/Undefined müssen behandelt werden

```typescript
// Ohne strict:
function getBookTitle(book: Book): string {
  return book.title; // ✅ OK
}
getBookTitle(null); // ❌ Laufzeitfehler: Cannot read property 'title' of null

// Mit strict:
function getBookTitle(book: Book): string {
  return book.title; // ✅ OK, wenn book nie null ist
}
getBookTitle(null); // ❌ Compile-Fehler: Argument of type 'null' is not assignable to parameter of type 'Book'

// Wenn book null sein kann:
function getBookTitle(book: Book | null): string {
  return book.title; // ❌ Compile-Fehler: Object is possibly 'null'
}

// Korrigiert:
function getBookTitle(book: Book | null): string {
  if (book) {
    return book.title; // ✅ Sicher!
  }
  return "Kein Buch";
}
```

**Warum `strict: true` so wichtig ist:**

```typescript
// Ohne strict - TypeScript ist wie JavaScript mit Kommentaren:
let x; // Typ: any
x = 5;
x = "hello";
x.foo.bar.baz(); // Kein Fehler! 😱

// Mit strict - TypeScript ist eine echte Typ-sichere Sprache:
let x; // ❌ FEHLER: Variable 'x' implicitly has an 'any' type

let x: number; // ✅ Expliziter Typ
x = 5;
x = "hello"; // ❌ FEHLER: Type 'string' is not assignable to type 'number'
```

---

**`esModuleInterop`** - Bessere Modul-Kompatibilität

```json
"esModuleInterop": true
```

- **Was es macht**: Verbessert die Kompatibilität zwischen ES-Modulen und CommonJS
- **Aktiviert automatisch**: `allowSyntheticDefaultImports`

**Problem ohne diese Option:**

```typescript
// CommonJS-Modul (z.B. ein npm-Paket):
module.exports = function doSomething() { ... };

// Import in TypeScript:
// Ohne esModuleInterop:
import * as something from "module";  // ✅ Funktioniert
something();  // ❌ something ist ein Objekt, keine Funktion!

import something from "module";  // ❌ FEHLER: Module has no default export

// Mit esModuleInterop:
import something from "module";  // ✅ Funktioniert!
something();  // ✅ Funktioniert!
```

**Praktisches Beispiel:**

```typescript
// Viele npm-Pakete verwenden CommonJS:
// lodash, express, etc.

// Ohne esModuleInterop - umständlich:
import * as _ from "lodash";
_.map([1, 2, 3], (n) => n * 2);

// Mit esModuleInterop - intuitiv:
import _ from "lodash";
_.map([1, 2, 3], (n) => n * 2);
```

---

**`skipLibCheck`** - Typ-Checks in .d.ts Dateien überspringen

```json
"skipLibCheck": true
```

- **Was es macht**: TypeScript prüft keine Typ-Fehler in `.d.ts` Dateien von npm-Paketen
- **Vorteil**: Schnellere Kompilierung
- **Nachteil**: Typ-Fehler in Dependencies werden nicht gefunden

**Warum aktivieren?**

```typescript
// Szenario: Du verwendest zwei npm-Pakete
// Paket A verwendet: @types/node@18
// Paket B verwendet: @types/node@16
// → Typ-Konflikte in den .d.ts Dateien!

// Ohne skipLibCheck:
// ❌ Compilation scheitert wegen Typ-Konflikten
// in node_modules/@types/...
// Du kannst nichts daran ändern!

// Mit skipLibCheck:
// ✅ TypeScript ignoriert Fehler in node_modules
// Prüft nur DEINEN Code
// → Dein Code kompiliert
```

**Performance:**

```bash
# Großes Projekt mit vielen Dependencies:

# Ohne skipLibCheck:
npm run build
# Dauer: 45 Sekunden
# Prüft ~5000 .d.ts Dateien in node_modules

# Mit skipLibCheck:
npm run build
# Dauer: 8 Sekunden
# Prüft nur eigene .ts Dateien
```

---

**`forceConsistentCasingInFileNames`** - Konsistente Groß-/Kleinschreibung

```json
"forceConsistentCasingInFileNames": true
```

- **Was es macht**: Erzwingt konsistente Groß-/Kleinschreibung bei Dateinamen
- **Zweck**: Verhindert Probleme beim Wechsel zwischen Betriebssystemen

**Problem ohne diese Option:**

```typescript
// Datei: types.ts

// Windows/Mac (case-insensitive):
import { Book } from "./Types.ts"; // ✅ Funktioniert (Types ≠ types)
import { Book } from "./types.ts"; // ✅ Funktioniert auch
import { Book } from "./TYPES.ts"; // ✅ Funktioniert auch

// Linux (case-sensitive):
import { Book } from "./Types.ts"; // ❌ Datei nicht gefunden!
import { Book } from "./types.ts"; // ✅ Funktioniert
```

**Mit dieser Option:**

```typescript
// Datei: types.ts

import { Book } from "./Types.ts"; // ❌ FEHLER in TypeScript!
// File name 'Types.ts' differs from already included file name 'types.ts' only in casing

import { Book } from "./types.ts"; // ✅ Korrekt
```

**Warum ist das wichtig?**

```bash
# Entwicklung auf Windows:
# Code funktioniert lokal ✅

# Deployment auf Linux-Server:
# Code bricht! ❌
# 404 Fehler beim Laden von Modulen

# Mit forceConsistentCasingInFileNames:
# Fehler wird SOFORT beim Entwickeln gefunden ✅
```

---

##### 6. Auskommentierte Style-Optionen

In der `tsconfig.json` sind einige Style-Optionen auskommentiert. Diese können bei Bedarf aktiviert werden:

```json
// "noImplicitReturns": true,
// "noImplicitOverride": true,
// "noUnusedLocals": true,
// "noUnusedParameters": true,
// "noFallthroughCasesInSwitch": true,
// "noPropertyAccessFromIndexSignature": true,
```

**Kurzerklärung:**

- **`noImplicitReturns`**: Alle Code-Pfade müssen einen Wert zurückgeben
- **`noImplicitOverride`**: Überschriebene Methoden brauchen `override` Keyword
- **`noUnusedLocals`**: Warnt bei ungenutzten lokalen Variablen
- **`noUnusedParameters`**: Warnt bei ungenutzten Funktionsparametern
- **`noFallthroughCasesInSwitch`**: Verbietet vergessene `break` in Switch-Cases
- **`noPropertyAccessFromIndexSignature`**: Erzwingt `obj["key"]` statt `obj.key` bei Index-Signaturen

---

##### 7. Zusammenfassung

**Wichtigste Einstellungen für unser Projekt:**

```json
{
  "compilerOptions": {
    // Wo sind die Dateien?
    "rootDir": "./src", // TypeScript-Dateien in src/
    "outDir": "./dist", // JavaScript-Dateien in dist/

    // Welche JavaScript-Version?
    "target": "ES2023", // Sehr modernes JavaScript
    "module": "ES2022", // ES-Module (import/export)
    "lib": ["ES2023", "DOM"], // Browser + moderne JS-Features

    // Debugging:
    "sourceMap": true, // TypeScript im Browser debuggen

    // Typ-Sicherheit:
    "strict": true, // Alle strikten Checks (WICHTIG!)
    "noUncheckedIndexedAccess": true, // Sichere Array-Zugriffe

    // Kompatibilität:
    "esModuleInterop": true, // Bessere npm-Paket-Imports
    "skipLibCheck": true, // Schnellere Kompilierung
    "forceConsistentCasingInFileNames": true // Keine Case-Probleme
  }
}
```

**Workflow:**

```bash
# 1. TypeScript-Code schreiben:
src/index.ts

# 2. Kompilieren:
npm run build

# 3. Generierte Dateien:
dist/index.js         # Ausführbarer Code
dist/index.js.map     # Für Debugging
dist/index.d.ts       # Typ-Definitionen
dist/index.d.ts.map   # Für "Go to Definition"

# 4. Browser lädt:
<script type="module" src="../dist/index.js"></script>
```

**Empfehlung für Anfänger:**

Diese `tsconfig.json` ist **sehr gut konfiguriert**:

- ✅ Strikte Typ-Checks finden Fehler früh
- ✅ Source Maps erleichtern Debugging
- ✅ Moderne JavaScript-Features werden unterstützt
- ✅ Gute Performance durch `skipLibCheck`

Du kannst diese Konfiguration als Vorlage für eigene Projekte verwenden!

---

## TypeScript-Dateien

### types.ts

Die Datei `types.ts` ist das **Herzstück der Typ-Definitionen** unserer Anwendung. Sie definiert die Datenstrukturen (Interfaces), die in der gesamten Anwendung verwendet werden.

#### Was sind TypeScript Interfaces?

Ein **Interface** ist wie ein **Bauplan** oder **Vertrag** für Objekte. Es legt fest:

- Welche Properties (Eigenschaften) ein Objekt haben muss
- Welche Datentypen diese Properties haben
- Welche Properties optional sind

#### Vollständiger Inhalt der Datei

```typescript
// Interface für Verlagsinformationen
export interface Publisher {
  name: string;
  url: string;
}

// Interface für Buchinformationen
export interface Book {
  id: string;
  isbn: string;
  title: string;
  subtitle?: string;
  author: string;
  publisher: string;
  abstract?: string;
  numPages?: number;
  price?: string;
  cover?: string;
  userId?: number;
}
```

---

#### Interface: Publisher

```typescript
export interface Publisher {
  name: string;
  url: string;
}
```

##### Zeile für Zeile erklärt

**`export`** - Export-Keyword

```typescript
export interface Publisher {
```

- **Was es macht**: Macht das Interface in anderen Dateien verfügbar
- **Ohne export**: Interface wäre nur in `types.ts` verfügbar
- **Mit export**: Andere Dateien können es mit `import` laden

**Beispiel:**

```typescript
// types.ts
export interface Publisher { ... }  // ✅ Kann importiert werden

interface Internal { ... }           // ❌ Nur in types.ts verfügbar

// index.ts
import { Publisher } from "./types.js";  // ✅ Funktioniert
import { Internal } from "./types.js";   // ❌ FEHLER: Not exported
```

---

**`interface`** - Interface-Keyword

```typescript
export interface Publisher {
```

- **Was es macht**: Deklariert einen neuen Typ (Interface)
- **Naming Convention**: PascalCase (erster Buchstabe groß)
- **Unterschied zu `type`**: Interfaces können erweitert werden

**Interface vs Type:**

```typescript
// Interface (kann erweitert werden):
interface Book {
  title: string;
}
interface Book {
  // Wird automatisch gemerged
  author: string;
}
// Ergebnis: Book hat title UND author

// Type (kann nicht erweitert werden):
type Book = {
  title: string;
};
type Book = {
  // ❌ FEHLER: Duplicate identifier
  author: string;
};
```

---

**`name: string`** - Property-Definition

```typescript
name: string;
```

- **Syntax**: `propertyName: type;`
- **name**: Der Name des Properties
- **string**: Der Datentyp (Text)
- **Semikolon**: Trennt Properties (optional, aber empfohlen)

**Was bedeutet `string`?**

```typescript
// ✅ Gültige Werte:
const name1: string = "O'Reilly";
const name2: string = "dpunkt.verlag";
const name3: string = ""; // Leerer String ist auch ein String

// ❌ Ungültige Werte:
const name4: string = 123; // FEHLER: Type 'number' is not assignable to type 'string'
const name5: string = null; // FEHLER: Type 'null' is not assignable to type 'string'
const name6: string = undefined; // FEHLER: Type 'undefined' is not assignable to type 'string'
```

---

**`url: string`** - Zweites Property

```typescript
url: string;
```

- Gleiches Format wie `name`
- Auch vom Typ `string`

**Hinweis**: Hier ist `url` ein einfacher String, kein spezieller URL-Typ. TypeScript hat keinen eingebauten URL-Typ.

```typescript
// Beide sind gültig:
const url1: string = "https://www.oreilly.com";
const url2: string = "nicht-eine-url"; // ✅ Auch gültig (nur ein String)

// Für echte URL-Validierung bräuchten wir:
// - Eine Validierungsfunktion
// - Oder ein Custom Type mit Validierung
```

---

##### Verwendung des Publisher Interface

```typescript
// Ein gültiges Publisher-Objekt:
const publisher: Publisher = {
  name: "O'Reilly",
  url: "https://www.oreilly.com",
};

// ❌ Fehler: Property 'name' fehlt
const publisher2: Publisher = {
  url: "https://example.com",
};

// ❌ Fehler: Property 'url' fehlt
const publisher3: Publisher = {
  name: "O'Reilly",
};

// ❌ Fehler: Falscher Typ
const publisher4: Publisher = {
  name: 123, // Sollte string sein
  url: "https://example.com",
};

// ❌ Fehler: Extra Property
const publisher5: Publisher = {
  name: "O'Reilly",
  url: "https://www.oreilly.com",
  email: "info@oreilly.com", // FEHLER: Property 'email' does not exist on type 'Publisher'
};
```

**Warum so strikt?**

TypeScript verhindert Tippfehler und Inkonsistenzen:

```typescript
// Ohne TypeScript (JavaScript):
const pub = {
  nme: "O'Reilly", // Tippfehler! Sollte 'name' sein
  url: "https://www.oreilly.com",
};
console.log(pub.name); // undefined - Fehler wird erst zur Laufzeit bemerkt!

// Mit TypeScript:
const pub: Publisher = {
  nme: "O'Reilly", // ❌ FEHLER: Object literal may only specify known properties
  url: "https://www.oreilly.com",
};
// Fehler wird SOFORT beim Schreiben gefunden!
```

---

#### Interface: Book

```typescript
export interface Book {
  id: string;
  isbn: string;
  title: string;
  subtitle?: string;
  author: string;
  publisher: string;
  abstract?: string;
  numPages?: number;
  price?: string;
  cover?: string;
  userId?: number;
}
```

Das `Book` Interface ist deutlich komplexer als `Publisher` und enthält sowohl **erforderliche** als auch **optionale** Properties.

---

##### Erforderliche Properties

Diese Properties **müssen** immer vorhanden sein:

**`id: string`** - Eindeutige Buch-ID

```typescript
id: string;
```

- Eindeutiger Identifikator für das Buch
- Typ: String (z.B. "1", "2", "abc123")
- Wird oft von der Datenbank/API generiert

**Beispiel:**

```typescript
const book: Book = {
  id: "123",
  // ... andere erforderliche Properties
};
```

---

**`isbn: string`** - ISBN-Nummer

```typescript
isbn: string;
```

- **ISBN**: International Standard Book Number
- Eindeutige Nummer für jedes Buch weltweit
- Typ: String (obwohl es Zahlen enthält)

**Warum String und nicht Number?**

```typescript
// ISBN-Nummern können:
// - Mit 0 beginnen: "0123456789"
// - Bindestriche enthalten: "978-3-86490-779-1"
// - Ein X am Ende haben (ISBN-10): "123456789X"

// Als Number würden wir Informationen verlieren:
const isbn: number = 0123456789;  // Führende 0 geht verloren!
console.log(isbn);  // 123456789 (ohne die 0!)

// Als String bleiben alle Zeichen erhalten:
const isbn: string = "0123456789";
console.log(isbn);  // "0123456789" ✅
```

---

**`title: string`** - Buchtitel

```typescript
title: string;
```

- Der Haupttitel des Buches
- Typ: String
- Erforderlich (jedes Buch muss einen Titel haben)

**Beispiel:**

```typescript
const book: Book = {
  // ...
  title: "JavaScript: The Definitive Guide",
  // ...
};
```

---

**`author: string`** - Autor(en)

```typescript
author: string;
```

- Der/die Autor(en) des Buches
- Typ: String
- Kann mehrere Autoren enthalten (kommagetrennt)

**Beispiel:**

```typescript
// Ein Autor:
author: "Douglas Crockford";

// Mehrere Autoren (als ein String):
author: "Ferdinand Malcher, Johannes Hoppe, Danny Koppenhagen";
```

**Hinweis**: In einer erweiterten Version könnte `author` auch ein Array sein:

```typescript
// Alternative Design-Entscheidung:
author: string[];  // Array von Strings
// Beispiel: ["Ferdinand Malcher", "Johannes Hoppe"]

// Oder:
authors: Author[];  // Array von Author-Objekten
// Beispiel: [{ name: "Max", bio: "..." }, { name: "Anna", bio: "..." }]
```

---

**`publisher: string`** - Verlagsname

```typescript
publisher: string;
```

- Der Name des Verlags
- Typ: String (einfacher Text)
- Erforderlich

**Interessant**: Wir haben ein `Publisher` Interface definiert, verwenden es aber nicht im `Book` Interface!

```typescript
// Aktuell:
interface Book {
  publisher: string;  // Nur der Name
}

// Alternative (komplexer):
interface Book {
  publisher: Publisher;  // Ganzes Objekt mit name + url
}

// Verwendung:
const book: Book = {
  // Aktuell:
  publisher: "O'Reilly"

  // Alternative:
  publisher: {
    name: "O'Reilly",
    url: "https://www.oreilly.com"
  }
};
```

**Warum nur ein String?**

- Einfacher für die API
- Die meisten Anwendungsfälle brauchen nur den Namen
- URL kann bei Bedarf separat nachgeschlagen werden

---

##### Optionale Properties

Diese Properties können vorhanden sein, müssen aber nicht. Sie werden mit einem **`?`** nach dem Property-Namen markiert.

**`subtitle?: string`** - Optionaler Untertitel

```typescript
subtitle?: string;
```

- **`?`**: Macht das Property optional
- Typ: `string | undefined`
- Bedeutung: Das Property kann fehlen ODER ein String sein

**Beispiel:**

```typescript
// ✅ Mit Untertitel:
const book1: Book = {
  // ... erforderliche Properties
  title: "Angular",
  subtitle: "Grundlagen, fortgeschrittene Themen und Best Practices",
};

// ✅ Ohne Untertitel:
const book2: Book = {
  // ... erforderliche Properties
  title: "JavaScript Basics",
  // subtitle fehlt komplett - OK!
};

// ✅ Explizit undefined:
const book3: Book = {
  // ... erforderliche Properties
  title: "TypeScript Handbook",
  subtitle: undefined, // Auch OK (aber nicht empfohlen)
};

// ❌ Falscher Typ:
const book4: Book = {
  // ... erforderliche Properties
  title: "Python Guide",
  subtitle: 123, // FEHLER: Type 'number' is not assignable to type 'string | undefined'
};
```

**Optionales Property prüfen:**

```typescript
function printBookTitle(book: Book): void {
  console.log(book.title);

  // ❌ Vorsicht bei optionalen Properties:
  console.log(book.subtitle.toUpperCase());
  // FEHLER: Object is possibly 'undefined'

  // ✅ Richtig - mit Check:
  if (book.subtitle) {
    console.log(book.subtitle.toUpperCase());
  }

  // ✅ Alternative - Optional Chaining:
  console.log(book.subtitle?.toUpperCase());
  // Gibt undefined zurück, wenn subtitle nicht existiert

  // ✅ Alternative - Nullish Coalescing:
  console.log(book.subtitle ?? "Kein Untertitel");
  // Gibt "Kein Untertitel" zurück, wenn subtitle undefined ist
}
```

---

**`abstract?: string`** - Optionale Buchbeschreibung

```typescript
abstract?: string;
```

- **abstract**: Zusammenfassung/Beschreibung des Buches
- Optional, da nicht alle Bücher eine Beschreibung haben
- Typ: `string | undefined`

**Beispiel:**

```typescript
const book: Book = {
  // ... andere Properties
  abstract: "Dieses Buch lehrt die Grundlagen von JavaScript und TypeScript...",
};

// Oder ohne abstract:
const book2: Book = {
  // ... andere Properties
  // abstract fehlt - OK!
};
```

---

**`numPages?: number`** - Optionale Seitenanzahl

```typescript
numPages?: number;
```

- Anzahl der Seiten im Buch
- Optional, da nicht immer bekannt
- Typ: `number | undefined`
- **Wichtig**: Hier verwenden wir `number`, nicht `string`!

**Was ist `number`?**

```typescript
// ✅ Gültige Werte:
const pages1: number = 850;
const pages2: number = 0;
const pages3: number = -5; // Auch negativ ist technisch gültig
const pages4: number = 3.14; // Auch Dezimalzahlen

// ❌ Ungültige Werte:
const pages5: number = "850"; // FEHLER: String ist kein number
const pages6: number = null; // FEHLER: null ist kein number
```

**Beispiel:**

```typescript
const book: Book = {
  // ... andere Properties
  numPages: 850,
};

// Rechnen mit numPages:
if (book.numPages) {
  const readingTime = book.numPages * 2; // 2 Minuten pro Seite
  console.log(`Lesezeit: ca. ${readingTime} Minuten`);
}
```

**String vs Number:**

```typescript
// Mit number (richtig):
const book: Book = { numPages: 850 };
const total = book.numPages + 50; // 900 ✅

// Mit string (falsch):
// const book: Book = { numPages: "850" };
// const total = book.numPages + 50;  // "85050" ❌ String-Konkatenation!
```

---

**`price?: string`** - Optionaler Preis

```typescript
price?: string;
```

- Preis des Buches
- Optional
- Typ: `string | undefined`
- **Überraschung**: Preis ist ein String, keine Zahl!

**Warum String für Preis?**

```typescript
// Problem mit number:
const price: number = 36.9;
console.log(price); // 36.9 (letzte 0 verschwindet!)

// Lösung mit string:
const price: string = "36.90";
console.log(price); // "36.90" ✅

// Weitere Vorteile von string:
const price1: string = "36.90"; // Dezimalpreis
const price2: string = "kostenlos"; // Text möglich
const price3: string = "€36.90"; // Mit Währungssymbol
const price4: string = "36,90 EUR"; // Mit Währungscode
```

**Von String zu Number konvertieren:**

```typescript
const book: Book = {
  // ... andere Properties
  price: "36.90",
};

// Wenn du rechnen möchtest:
if (book.price) {
  const priceNumber = parseFloat(book.price); // 36.9
  const withTax = priceNumber * 1.19; // 43.911
  console.log(`Mit MwSt: ${withTax.toFixed(2)}€`); // "43.91€"
}
```

---

**`cover?: string`** - Optionales Buchcover

```typescript
cover?: string;
```

- URL oder Pfad zum Buchcover-Bild
- Optional, da nicht alle Bücher ein Cover haben
- Typ: `string | undefined`

**Beispiel:**

```typescript
const book: Book = {
  // ... andere Properties
  cover: "images/angular.png",
  // Oder:
  // cover: "https://example.com/covers/angular.jpg"
};

// HTML:
if (book.cover) {
  const img = document.createElement("img");
  img.src = book.cover;
  img.alt = book.title;
}
```

**Hinweis**: In unserem Projekt verwenden wir lokale Bilder:

```
src/
└── images/
    ├── angular.png
    ├── javascript.png
    └── ...
```

Die API gibt nur den Dateinamen zurück, wir konstruieren dann den vollständigen Pfad:

```typescript
const book: Book = {
  isbn: "9783864907791",
  cover: "angular.png", // Nur der Dateiname
};

// Verwendung:
const fullPath = `images/${book.isbn}.png`; // "images/9783864907791.png"
```

---

**`userId?: number`** - Optionale Benutzer-ID

```typescript
userId?: number;
```

- ID des Benutzers, der das Buch erstellt/hochgeladen hat
- Optional
- Typ: `number | undefined`
- **In unserem Projekt nicht verwendet** (alle Bücher kommen von der API)

**Wofür könnte das verwendet werden?**

```typescript
// In einer erweiterten Version mit Benutzer-Verwaltung:
interface User {
  id: number;
  name: string;
}

interface Book {
  // ... andere Properties
  userId?: number; // Referenz zum User
}

// Buch einem Benutzer zuordnen:
const user: User = { id: 42, name: "Max Mustermann" };
const book: Book = {
  // ... andere Properties
  userId: user.id, // 42
};

// Später den Benutzer finden:
const bookOwner = users.find((u) => u.id === book.userId);
```

---

##### Zusammenfassung: Erforderlich vs Optional

```typescript
interface Book {
  // ✅ ERFORDERLICH (müssen immer vorhanden sein):
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;

  // ❓ OPTIONAL (können fehlen):
  subtitle?: string;
  abstract?: string;
  numPages?: number;
  price?: string;
  cover?: string;
  userId?: number;
}
```

**Minimales gültiges Book-Objekt:**

```typescript
const book: Book = {
  id: "1",
  isbn: "9783864907791",
  title: "Angular",
  author: "Ferdinand Malcher",
  publisher: "dpunkt.verlag",
  // Alle optionalen Properties können fehlen!
};
```

**Vollständiges Book-Objekt:**

```typescript
const book: Book = {
  id: "1",
  isbn: "9783864907791",
  title: "Angular",
  subtitle: "Grundlagen, fortgeschrittene Themen und Best Practices",
  author: "Ferdinand Malcher, Johannes Hoppe, Danny Koppenhagen",
  publisher: "dpunkt.verlag",
  abstract: "Mit Angular entwickeln Sie moderne Webanwendungen...",
  numPages: 850,
  price: "36.90",
  cover: "angular.png",
  userId: 1,
};
```

---

##### Verwendung der Interfaces in anderen Dateien

**Import in index.ts:**

```typescript
import type { Book } from "./types.js";

let allBooks: Book[] = []; // Array von Book-Objekten

async function fetchBooks(): Promise<void> {
  const response = await fetch("http://localhost:4730/books");
  const books: Book[] = await response.json(); // API gibt Book[] zurück
  allBooks = books;
}
```

**Type Safety in Aktion:**

```typescript
import type { Book } from "./types.js";

const book: Book = {
  id: "1",
  isbn: "123",
  title: "JavaScript Basics",
  author: "Max Mustermann",
  publisher: "Tech Verlag",
};

// ✅ TypeScript hilft mit Autovervollständigung:
console.log(book.title); // VS Code schlägt .title vor
console.log(book.author); // VS Code schlägt .author vor

// ❌ TypeScript verhindert Tippfehler:
console.log(book.titel); // FEHLER: Property 'titel' does not exist on type 'Book'
console.log(book.price.toFixed(2)); // FEHLER: Object is possibly 'undefined'

// ✅ Mit Optional Chaining:
console.log(book.price?.substring(0, 2)); // OK
```

---

##### Vorteile von Interfaces

**1. Autovervollständigung**

```typescript
const book: Book = {
  // VS Code zeigt dir ALLE Properties an
  // Du kannst Tab drücken zum Autovervollständigen
};

book.  // VS Code zeigt: id, isbn, title, author, publisher, ...
```

**2. Fehler früh erkennen**

```typescript
// ❌ Tippfehler wird sofort markiert:
const book: Book = {
  id: "1",
  isbn: "123",
  titel: "JavaScript", // Sollte 'title' sein
  // ...
};
// FEHLER: Object literal may only specify known properties
```

**3. Refactoring**

```typescript
// Wenn wir das Interface ändern:
interface Book {
  id: string;
  isbn: string;
  name: string; // Umbenannt von 'title' zu 'name'
  // ...
}

// TypeScript zeigt ALLE Stellen, die angepasst werden müssen:
console.log(book.title); // ❌ FEHLER: Property 'title' does not exist
// → Wir müssen zu book.name ändern
```

**4. Dokumentation**

```typescript
// Das Interface IST die Dokumentation!
// Andere Entwickler sehen sofort:
// - Welche Properties existieren
// - Welche Typen sie haben
// - Welche optional sind

interface Book {
  title: string; // Muss vorhanden sein
  subtitle?: string; // Kann fehlen
}
```

**5. Konsistenz**

```typescript
// Ohne Interface (JavaScript):
const book1 = { titel: "...", autor: "..." };
const book2 = { title: "...", author: "..." };
const book3 = { name: "...", writer: "..." };
// Jeder macht es anders! 😱

// Mit Interface (TypeScript):
const book1: Book = { title: "...", author: "..." };
const book2: Book = { title: "...", author: "..." };
const book3: Book = { title: "...", author: "..." };
// Alle folgen demselben Schema! 😊
```

---

##### Warum zwei separate Interfaces?

Wir haben `Publisher` UND `Book` definiert, aber `Book` verwendet `Publisher` nicht direkt. Warum?

**Aktuelles Design:**

```typescript
interface Publisher {
  name: string;
  url: string;
}

interface Book {
  publisher: string; // Nur der Name
}
```

**Alternatives Design:**

```typescript
interface Book {
  publisher: Publisher; // Ganzes Objekt
}

const book: Book = {
  // ...
  publisher: {
    name: "O'Reilly",
    url: "https://www.oreilly.com",
  },
};
```

**Gründe für das aktuelle Design:**

1. **API-Kompatibilität**: Die BookMonkey-API gibt nur den Verlagsnamen zurück
2. **Einfachheit**: Für die meisten Anwendungsfälle reicht der Name
3. **Flexibilität**: Publisher Interface kann für zukünftige Features verwendet werden
4. **Performance**: Weniger Daten müssen übertragen werden

---

##### Best Practices für Interfaces

**1. Aussagekräftige Namen**

```typescript
// ✅ Gut:
interface Book { ... }
interface User { ... }
interface Order { ... }

// ❌ Schlecht:
interface B { ... }
interface Data { ... }
interface Item { ... }
```

**2. Optional Properties sinnvoll einsetzen**

```typescript
// ✅ Gut - wichtige Daten sind erforderlich:
interface Book {
  id: string; // Erforderlich
  title: string; // Erforderlich
  subtitle?: string; // Optional
}

// ❌ Schlecht - zu viele optionale Properties:
interface Book {
  id?: string;
  title?: string;
  author?: string;
}
// Jetzt kann ein Buch OHNE Titel existieren!
```

**3. Richtige Typen wählen**

```typescript
// ✅ Gut:
interface Book {
  numPages: number; // Zahlen zum Rechnen
  price: string; // String für Formatierung
  published: Date; // Date für Datumswerte
}

// ❌ Schlecht:
interface Book {
  numPages: string; // "850" statt 850
  price: number; // 36.9 statt "36.90"
  published: string; // "2024-01-01" statt Date-Objekt
}
```

**4. Interfaces exportieren**

```typescript
// ✅ Gut - mit export:
export interface Book { ... }

// ❌ Schlecht - ohne export:
interface Book { ... }
// Kann nicht in anderen Dateien verwendet werden!
```

---

##### Zusammenfassung

Die `types.ts` Datei:

✅ Definiert zwei Interfaces: `Publisher` und `Book`
✅ Verwendet `export` um sie in anderen Dateien verfügbar zu machen
✅ Unterscheidet zwischen erforderlichen und optionalen Properties
✅ Verwendet passende Datentypen (`string`, `number`)
✅ Dient als zentrale Typ-Definition für die gesamte Anwendung

**Merke:**

- `property: type` = erforderlich
- `property?: type` = optional
- `export` = in anderen Dateien verwendbar
- Interfaces sind reine Typ-Definitionen (kein ausführbarer Code)

Diese Interfaces werden in allen anderen TypeScript-Dateien verwendet (`index.ts`, `favorite.ts`, `detail.ts`) um Typ-Sicherheit zu gewährleisten!

---

### index.ts

Die Datei `index.ts` ist die **Hauptlogik** der Bücherlisten-Seite (`index.html`). Sie enthält alle Funktionen zum:

- Laden der Bücher von der API
- Anzeigen der Bücher in einer Tabelle
- Filtern und Suchen von Büchern
- Verwalten von Favoriten

#### Vollständiger Überblick

Die Datei ist in folgende Abschnitte gegliedert:

1. **Imports und Konstanten** - Typen und Konfiguration
2. **Globale Variablen** - Speichert Buchdaten
3. **Favoriten-Verwaltung** - localStorage-Operationen
4. **Anzeige-Funktionen** - DOM-Manipulation
5. **Filter-Funktionen** - Such- und Filterlogik
6. **API-Funktionen** - Daten vom Server laden
7. **Initialisierung** - Setup beim Laden der Seite

---

#### 1. Imports und Konstanten

```typescript
import type { Book } from "./types.js";

const API_URL = "http://localhost:4730";
```

##### Import-Statement

```typescript
import type { Book } from "./types.js";
```

**Zeile für Zeile:**

- `import type`: Importiert **nur einen Typ** (keine ausführbare Funktion)
  - `type` ist ein TypeScript-Keyword
  - Wird beim Kompilieren komplett entfernt
  - Kein JavaScript-Code wird generiert

**Warum `type` verwenden?**

```typescript
// Mit 'type' - nur für TypeScript:
import type { Book } from "./types.js";
// Wird kompiliert zu: (nichts - wird entfernt)

// Ohne 'type' - regulärer Import:
import { Book } from "./types.js";
// Würde zur Laufzeit versuchen, Book zu importieren
// ❌ FEHLER: Book ist kein Wert, sondern ein Typ!
```

**Das Book Interface:**

Erinnere dich an die Definition aus `types.ts`:

```typescript
interface Book {
  id: string;
  isbn: string;
  title: string;
  subtitle?: string;
  author: string;
  publisher: string;
  abstract?: string;
  numPages?: number;
  price?: string;
  cover?: string;
  userId?: number;
}
```

**Verwendung in index.ts:**

```typescript
let allBooks: Book[] = []; // Array vom Typ Book[]
```

##### API-URL Konstante

```typescript
const API_URL = "http://localhost:4730";
```

**Erklärung:**

- `const`: Konstante (kann nicht geändert werden)
- `API_URL`: Naming Convention - Konstanten in GROSSBUCHSTABEN
- `"http://localhost:4730"`: Die BookMonkey-API Adresse
  - `localhost`: Der lokale Computer
  - `4730`: Port-Nummer der API

**Warum eine Konstante?**

```typescript
// ❌ Ohne Konstante - URL mehrfach wiederholt:
fetch("http://localhost:4730/books");
fetch("http://localhost:4730/publishers");
// Bei Änderung muss man überall suchen!

// ✅ Mit Konstante - zentrale Definition:
const API_URL = "http://localhost:4730";
fetch(`${API_URL}/books`);
fetch(`${API_URL}/publishers`);
// Bei Änderung nur eine Stelle!
```

**Template Strings mit `${}` :**

```typescript
const url = `${API_URL}/books`;
// Ergibt: "http://localhost:4730/books"

// Ohne Template String:
const url = API_URL + "/books";
// Gleiches Ergebnis, aber weniger lesbar
```

---

#### 2. Globale Variablen

```typescript
let allBooks: Book[] = [];
let filteredBooks: Book[] = [];
```

##### allBooks - Alle geladenen Bücher

```typescript
let allBooks: Book[] = [];
```

**Erklärung:**

- `let`: Variable (kann geändert werden)
- `allBooks`: Variablenname (camelCase)
- `: Book[]`: Typ-Annotation
  - `Book`: Das Interface aus types.ts
  - `[]`: Array-Syntax
  - Bedeutet: "Array von Book-Objekten"
- `= []`: Initialisierung mit leerem Array

**Was ist `Book[]` ?**

```typescript
// Book[] ist die Kurzschreibweise für:
Array<Book>;

// Beide sind identisch:
let books1: Book[] = [];
let books2: Array<Book> = [];

// Beispiel-Wert:
allBooks = [
  {
    id: "1",
    isbn: "123",
    title: "JavaScript",
    author: "Max",
    publisher: "Tech",
  },
  {
    id: "2",
    isbn: "456",
    title: "TypeScript",
    author: "Anna",
    publisher: "Code",
  },
];
```

**Zweck von allBooks:**

```typescript
// allBooks speichert ALLE Bücher vom Server
// Wird einmal beim Laden befüllt
// Bleibt unverändert, auch beim Filtern

fetchBooks(); // Lädt Bücher in allBooks
// allBooks = [book1, book2, book3, ..., book100]

filterBooks(); // Ändert allBooks NICHT
// allBooks = [book1, book2, book3, ..., book100]  // Unverändert!
```

##### filteredBooks - Gefilterte Bücher

```typescript
let filteredBooks: Book[] = [];
```

**Zweck von filteredBooks:**

```typescript
// filteredBooks enthält die AKTUELL ANGEZEIGTEN Bücher
// Ändert sich bei jeder Suche/Filterung

// Anfangs: Alle Bücher anzeigen
filteredBooks = allBooks;

// Nach Suche nach "JavaScript":
filteredBooks = allBooks.filter((book) => book.title.includes("JavaScript"));
// filteredBooks = [book1, book15, book42]  // Nur 3 Bücher

// Nach Suche nach "Python":
filteredBooks = allBooks.filter((book) => book.title.includes("Python"));
// filteredBooks = [book5, book23]  // Nur 2 Bücher
```

**Unterschied allBooks vs filteredBooks:**

```typescript
// Szenario: 100 Bücher geladen

allBooks.length; // 100 (immer gleich)
filteredBooks.length; // 100 (ohne Filter)

// Nach Suche:
allBooks.length; // 100 (unverändert)
filteredBooks.length; // 5   (nur passende Bücher)

// renderBooks() zeigt nur filteredBooks an!
```

---

#### 3. Favoriten-Verwaltung

##### getFavorites() - Favoriten laden

```typescript
function getFavorites(): string[] {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
}
```

**Was macht diese Funktion?**

Lädt die Liste der Favoriten-ISBN-Nummern aus dem Browser-Speicher.

**Zeile für Zeile:**

```typescript
function getFavorites(): string[] {
```

- `function`: Funktionsdeklaration
- `getFavorites`: Funktionsname (Verb + Substantiv)
- `()`: Keine Parameter
- `: string[]`: Rückgabetyp - Array von Strings

```typescript
const favs = localStorage.getItem("favorites");
```

**Was ist localStorage?**

```typescript
// localStorage ist ein Browser-Speicher:
// - Key-Value-Speicher (wie ein Objekt)
// - Speichert nur Strings
// - Daten bleiben nach Browser-Neustart
// - Pro Domain separater Speicher

// Methoden:
localStorage.setItem("key", "value"); // Speichern
localStorage.getItem("key"); // Lesen
localStorage.removeItem("key"); // Löschen
localStorage.clear(); // Alles löschen
```

**Die Methode `.getItem()`:**

```typescript
localStorage.getItem("favorites");
// Rückgabe: string | null
// - string: Wenn der Schlüssel existiert
// - null: Wenn der Schlüssel nicht existiert
```

**Beispiel:**

```typescript
// Beim ersten Besuch:
const favs = localStorage.getItem("favorites");
console.log(favs); // null

// Nach dem Speichern von Favoriten:
localStorage.setItem("favorites", '["123", "456"]');
const favs = localStorage.getItem("favorites");
console.log(favs); // '["123", "456"]' (JSON-String)
```

```typescript
return favs ? JSON.parse(favs) : [];
```

**Ternärer Operator:**

```typescript
// Syntax: bedingung ? wertWennTrue : wertWennFalse

// Ausgeschrieben:
if (favs) {
  return JSON.parse(favs);
} else {
  return [];
}

// Kurz:
return favs ? JSON.parse(favs) : [];
```

**JSON.parse():**

```typescript
// Konvertiert JSON-String zu JavaScript-Objekt/Array

const jsonString = '["123", "456", "789"]';
const array = JSON.parse(jsonString);
console.log(array); // ["123", "456", "789"]

// Ohne JSON.parse:
console.log(jsonString); // '["123", "456", "789"]' (String!)
console.log(jsonString[0]); // '[' (erstes Zeichen)

// Mit JSON.parse:
console.log(array); // ["123", "456", "789"] (Array!)
console.log(array[0]); // "123" (erstes Element)
```

**Komplettes Beispiel:**

```typescript
// Szenario 1: Keine Favoriten gespeichert
localStorage.getItem("favorites")  // null
favs = null
favs ? ... : []  // false → gibt [] zurück

// Szenario 2: Favoriten sind gespeichert
localStorage.getItem("favorites")  // '["123", "456"]'
favs = '["123", "456"]'
favs ? JSON.parse(favs) : ...  // true → gibt ["123", "456"] zurück
```

---

##### saveFavorites() - Favoriten speichern

```typescript
function saveFavorites(favorites: string[]): void {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
```

**Was macht diese Funktion?**

Speichert das Favoriten-Array im localStorage.

**Zeile für Zeile:**

```typescript
function saveFavorites(favorites: string[]): void {
```

- `favorites: string[]`: Parameter - Array von Strings
- `: void`: Gibt nichts zurück

```typescript
localStorage.setItem("favorites", JSON.stringify(favorites));
```

**Die Methode `.setItem()`:**

```typescript
localStorage.setItem(key, value);
// - key: String (Schlüssel)
// - value: String (Wert)
// Beide Parameter MÜSSEN Strings sein!
```

**JSON.stringify():**

```typescript
// Konvertiert JavaScript-Objekt/Array zu JSON-String

const array = ["123", "456", "789"];
const jsonString = JSON.stringify(array);
console.log(jsonString); // '["123","456","789"]'

// Warum nötig? localStorage kann nur Strings speichern!
localStorage.setItem("favorites", array); // ❌ Wird zu "[object Array]"
localStorage.setItem("favorites", JSON.stringify(array)); // ✅ Korrekt
```

**Komplettes Beispiel:**

```typescript
// Favoriten hinzufügen:
const favorites = ["123", "456"];
saveFavorites(favorites);

// Was passiert im localStorage:
// Key: "favorites"
// Value: '["123","456"]' (JSON-String)

// Später wieder auslesen:
const loaded = getFavorites();
console.log(loaded); // ["123", "456"] (JavaScript-Array)
```

---

##### toggleFavorite() - Favorit umschalten

```typescript
function toggleFavorite(isbn: string): void {
  const favorites = getFavorites();
  const index = favorites.indexOf(isbn);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(isbn);
  }

  saveFavorites(favorites);
  updateFavoriteCount();
  renderBooks();
}
```

**Was macht diese Funktion?**

Schaltet den Favoriten-Status eines Buches um (toggle = umschalten):

- Wenn Buch ein Favorit ist → entfernen
- Wenn Buch kein Favorit ist → hinzufügen

**Zeile für Zeile:**

```typescript
const favorites = getFavorites();
```

- Lädt aktuelle Favoriten: `["123", "456", "789"]`

```typescript
const index = favorites.indexOf(isbn);
```

**Die Methode `.indexOf()`:**

```typescript
// Sucht Element im Array und gibt Index zurück

const array = ["123", "456", "789"];
array.indexOf("456"); // 1 (gefunden an Position 1)
array.indexOf("999"); // -1 (nicht gefunden)

// Array-Indizes starten bei 0:
// Index:  0      1      2
// Wert:  "123"  "456"  "789"
```

```typescript
if (index > -1) {
  favorites.splice(index, 1);
} else {
  favorites.push(isbn);
}
```

**Teil 1: Entfernen (wenn gefunden)**

```typescript
if (index > -1) {
  // Wenn gefunden
  favorites.splice(index, 1);
}
```

**Die Methode `.splice()`:**

```typescript
// array.splice(startIndex, deleteCount)
// Entfernt Elemente aus Array

const favorites = ["123", "456", "789"];
favorites.splice(1, 1); // Entfernt 1 Element ab Index 1
console.log(favorites); // ["123", "789"]

// Detailliert:
// Vorher: ["123", "456", "789"]
//  Index:   0      1      2
// splice(1, 1) entfernt Index 1
// Nachher: ["123", "789"]
//  Index:   0      1
```

**Teil 2: Hinzufügen (wenn nicht gefunden)**

```typescript
else {
  favorites.push(isbn);
}
```

**Die Methode `.push()`:**

```typescript
// Fügt Element am Ende hinzu

const favorites = ["123", "456"];
favorites.push("789");
console.log(favorites); // ["123", "456", "789"]
```

**Komplettes Beispiel:**

```typescript
// Szenario 1: ISBN "456" ist bereits Favorit
const favorites = ["123", "456", "789"];
toggleFavorite("456");
// indexOf("456") → 1 (gefunden)
// splice(1, 1) → entfernt "456"
// Ergebnis: ["123", "789"]

// Szenario 2: ISBN "999" ist noch kein Favorit
const favorites = ["123", "456"];
toggleFavorite("999");
// indexOf("999") → -1 (nicht gefunden)
// push("999") → fügt hinzu
// Ergebnis: ["123", "456", "999"]
```

```typescript
saveFavorites(favorites);
updateFavoriteCount();
renderBooks();
```

**Was passiert hier?**

1. `saveFavorites(favorites)`: Speichert die aktualisierte Liste im localStorage
2. `updateFavoriteCount()`: Aktualisiert die Zahl im Header (z.B. "Favorites **3**")
3. `renderBooks()`: Rendert die Tabelle neu (Herz-Icon ändert sich)

---

##### updateFavoriteCount() - Anzahl im Header aktualisieren

```typescript
function updateFavoriteCount(): void {
  const favorites = getFavorites();
  const countElement = document.querySelector(".mainnav-number");
  if (countElement) {
    countElement.textContent = favorites.length.toString();
  }
}
```

**Was macht diese Funktion?**

Aktualisiert die Zahl neben "Favorites" im Header.

**Zeile für Zeile:**

```typescript
const countElement = document.querySelector(".mainnav-number");
```

**Die Methode `.querySelector()`:**

```typescript
// Findet das ERSTE Element mit dem CSS-Selektor

document.querySelector(".mainnav-number"); // Klasse
document.querySelector("#search"); // ID
document.querySelector("h1"); // Tag
document.querySelector("header .logo"); // Verschachtelt

// Rückgabe: Element | null
```

**HTML-Kontext:**

```html
<a href="favorite.html"> Favorites <span class="mainnav-number">2</span> </a>
```

```typescript
if (countElement) {
  countElement.textContent = favorites.length.toString();
}
```

**Warum der if-Check?**

```typescript
// querySelector kann null zurückgeben!

const element = document.querySelector(".nicht-vorhanden");
console.log(element); // null

element.textContent = "Test"; // ❌ FEHLER: Cannot read property of null

// Mit if-Check:
if (element) {
  element.textContent = "Test"; // ✅ Nur wenn element existiert
}
```

**Die Property `.textContent`:**

```typescript
// Setzt oder liest den Text-Inhalt eines Elements

const element = document.querySelector("h1");
element.textContent = "Neuer Titel";

// HTML:
// <h1>Neuer Titel</h1>
```

**Die Methode `.toString()`:**

```typescript
// Konvertiert Zahl zu String

const num = 42;
num.toString(); // "42"

favorites.length; // 3 (number)
favorites.length.toString(); // "3" (string)

// Warum nötig? textContent erwartet einen String!
```

**Komplettes Beispiel:**

```typescript
// HTML: <span class="mainnav-number">0</span>
// Favoriten: ["123", "456", "789"]

updateFavoriteCount();

// favorites.length = 3
// favorites.length.toString() = "3"
// countElement.textContent = "3"

// HTML: <span class="mainnav-number">3</span>
```

---

#### 4. Anzeige-Funktionen

##### renderBooks() - Bücher-Tabelle anzeigen

Diese Funktion ist sehr umfangreich und das **Herzstück der Darstellung**. Ich werde sie in Teilen erklären.

```typescript
function renderBooks(): void {
  const tbody = document.querySelector("tbody");
  if (!tbody) return;

  const favorites = getFavorites();
  tbody.innerHTML = "";

  filteredBooks.forEach((book) => {
    // ... Bücher anzeigen
  });

  // ... Event-Listener hinzufügen
  // ... Anzahl aktualisieren
}
```

**Teil 1: Vorbereitung**

```typescript
const tbody = document.querySelector("tbody");
if (!tbody) return;
```

**Was ist `<tbody>`?**

```html
<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
    </tr>
  </thead>
  <tbody>
    <!-- Datenzeilen kommen hier rein -->
  </tbody>
</table>
```

**Early Return Pattern:**

```typescript
if (!tbody) return;
// Wenn tbody nicht existiert, beende Funktion sofort
// Verhindert Fehler bei tbody.innerHTML
```

```typescript
const favorites = getFavorites();
tbody.innerHTML = "";
```

**Die Property `.innerHTML`:**

```typescript
// Setzt oder liest den HTML-Inhalt

tbody.innerHTML = ""; // Leert die Tabelle
tbody.innerHTML = "<tr><td>Test</td></tr>"; // Setzt HTML
```

**Warum leeren?**

```typescript
// Ohne Leeren:
renderBooks(); // 10 Zeilen
renderBooks(); // 20 Zeilen (10 alte + 10 neue)
renderBooks(); // 30 Zeilen (20 alte + 10 neue)

// Mit Leeren:
renderBooks(); // 10 Zeilen
renderBooks(); // 10 Zeilen (alte gelöscht, 10 neue)
renderBooks(); // 10 Zeilen (alte gelöscht, 10 neue)
```

**Teil 2: Bücher durchlaufen**

```typescript
filteredBooks.forEach((book) => {
  const isFavorite = favorites.includes(book.isbn);
  const tr = document.createElement("tr");

  tr.innerHTML = `...`; // HTML-Content

  tbody.appendChild(tr);
});
```

**Die Methode `.forEach()`:**

```typescript
// Führt Funktion für jedes Element aus

const numbers = [1, 2, 3];
numbers.forEach((num) => {
  console.log(num * 2);
});
// Ausgabe: 2, 4, 6
```

**Arrow Function:**

```typescript
// Lange Schreibweise:
filteredBooks.forEach(function (book) {
  console.log(book.title);
});

// Kurze Schreibweise (Arrow Function):
filteredBooks.forEach((book) => {
  console.log(book.title);
});

// Extra kurz (bei nur einem Parameter):
filteredBooks.forEach((book) => {
  console.log(book.title);
});
```

```typescript
const isFavorite = favorites.includes(book.isbn);
```

**Die Methode `.includes()`:**

```typescript
// Prüft, ob Element im Array enthalten ist

const favorites = ["123", "456"];
favorites.includes("456"); // true
favorites.includes("999"); // false
```

```typescript
const tr = document.createElement("tr");
```

**Die Methode `.createElement()`:**

```typescript
// Erstellt ein neues HTML-Element

const tr = document.createElement("tr"); // <tr></tr>
const td = document.createElement("td"); // <td></td>
const button = document.createElement("button"); // <button></button>

// Element ist erstellt, aber noch nicht im DOM!
```

**Teil 3: HTML-Inhalt erstellen**

```typescript
tr.innerHTML = `
  <td>
    <button class="button button-clear fav-btn" data-isbn="${book.isbn}">
      <svg ...>...</svg>
    </button>
  </td>
  <td>${book.title}</td>
  <td>${book.isbn}</td>
  <td>${book.author}</td>
  <td>${book.publisher}</td>
  <td>
    <button class="button" onclick="location.href='detail.html?isbn=${book.isbn}'">
      Detail
    </button>
  </td>
`;
```

**Template Strings (Backticks):**

```typescript
// Mit Template String (``):
const html = `<div>${book.title}</div>`;
// Vort eile:
// - Mehrzeilig möglich
// - Variable mit ${} einfügen
// - Lesbar

// Ohne Template String:
const html = "<div>" + book.title + "</div>";
// Nachteile:
// - Nur einzeilig
// - Unübersichtlich
```

**data-isbn Attribut:**

```html
<button data-isbn="${book.isbn}"></button>
```

**Was sind data-Attribute?**

```html
<!-- HTML5 data-Attribute: Eigene Daten speichern -->
<button data-isbn="123456" data-price="39.90">Buy</button>

<!-- Später mit JavaScript auslesen: -->
<script>
  const isbn = button.getAttribute("data-isbn"); // "123456"
  const price = button.dataset.price; // "39.90"
</script>
```

**Bedingtes SVG (Ternärer Operator):**

```typescript
${
  isFavorite
    ? 'viewBox="0 0 24 24" fill="currentColor"'  // Gefülltes Herz
    : 'fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"'  // Leeres Herz
}
```

**Erklärung:**

```typescript
// Wenn isFavorite true ist:
<svg viewBox="0 0 24 24" fill="currentColor">

// Wenn isFavorite false ist:
<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
```

**Detail-Button:**

```html
<button onclick="location.href='detail.html?isbn=${book.isbn}'">Detail</button>
```

**Erklärung:**

```javascript
// onclick: Wird ausgeführt bei Klick
// location.href: Navigiert zu neuer Seite
// 'detail.html?isbn=123': URL mit Parameter

// Beispiel:
// Wenn book.isbn = "9783864907791"
// Dann: location.href='detail.html?isbn=9783864907791'
// → Browser lädt detail.html mit ISBN als Parameter
```

**Teil 4: Element hinzufügen**

```typescript
tbody.appendChild(tr);
```

**Die Methode `.appendChild()`:**

```typescript
// Fügt Element als letztes Kind hinzu

const parent = document.querySelector("tbody");
const child = document.createElement("tr");
parent.appendChild(child);

// Vorher:
// <tbody></tbody>

// Nachher:
// <tbody>
//   <tr></tr>
// </tbody>
```

**Teil 5: Event-Listener hinzufügen**

```typescript
const favButtons = tbody.querySelectorAll(".fav-btn");
favButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isbn = (button as HTMLElement).getAttribute("data-isbn");
    if (isbn) {
      toggleFavorite(isbn);
    }
  });
});
```

**Die Methode `.querySelectorAll()`:**

```typescript
// Findet ALLE Elemente (im Gegensatz zu querySelector)

const buttons = document.querySelectorAll(".fav-btn");
// Rückgabe: NodeList (ähnlich Array)

// Unterschied:
querySelector(".fav-btn"); // Erstes Element
querySelectorAll(".fav-btn"); // Alle Elemente
```

**Die Methode `.addEventListener()`:**

```typescript
// Registriert Event-Handler

button.addEventListener("click", () => {
  console.log("Button geklickt!");
});

// Syntax:
element.addEventListener(eventType, callbackFunction);
// - eventType: "click", "input", "change", etc.
// - callbackFunction: Wird bei Event ausgeführt
```

**Type Assertion `as HTMLElement`:**

```typescript
const isbn = (button as HTMLElement).getAttribute("data-isbn");
```

**Warum Type Assertion?**

```typescript
// button hat Typ Element
// getAttribute() existiert auf Element
// Aber TypeScript ist manchmal zu vorsichtig

// Ohne as:
const isbn = button.getAttribute("data-isbn"); // Könnte Fehler geben

// Mit as:
const isbn = (button as HTMLElement).getAttribute("data-isbn"); // ✅ OK

// as sagt TypeScript: "Vertraue mir, das ist ein HTMLElement"
```

**Teil 6: Anzahl aktualisieren**

```typescript
const countElement = document.querySelector("main h2");
if (countElement) {
  countElement.textContent = `${filteredBooks.length} Books displayed`;
}
```

**CSS-Selektor `"main h2"`:**

```typescript
// Findet h2 innerhalb von main

// HTML:
// <main>
//   <h2>10 Books displayed</h2>
// </main>

// Selektor:
document.querySelector("main h2"); // Findet das h2
```

---

#### 5. Filter-Funktionen

##### filterBooks() - Bücher filtern

```typescript
function filterBooks(): void {
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const publisherSelect = document.getElementById(
    "by-publisher"
  ) as HTMLSelectElement;

  const searchTerm = searchInput?.value.toLowerCase() || "";
  const publisher = publisherSelect?.value || "-";

  filteredBooks = allBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm);
    const matchesPublisher = publisher === "-" || book.publisher === publisher;
    return matchesSearch && matchesPublisher;
  });

  renderBooks();
}
```

**Was macht diese Funktion?**

Filtert die Bücher basierend auf:

1. Suchbegriff im Titel
2. Gewählter Verlag im Dropdown

**Teil 1: Eingabefelder holen**

```typescript
const searchInput = document.getElementById("search") as HTMLInputElement;
const publisherSelect = document.getElementById(
  "by-publisher"
) as HTMLSelectElement;
```

**Die Methode `.getElementById()`:**

```typescript
// Findet Element anhand der ID

// HTML:
// <input id="search" type="text">

document.getElementById("search"); // Findet das input-Element

// Unterschied zu querySelector:
document.getElementById("search"); // Nur ID
document.querySelector("#search"); // CSS-Selektor (# für ID)
```

**Type Assertions:**

```typescript
as HTMLInputElement   // Für <input>-Elemente
as HTMLSelectElement  // Für <select>-Elemente
as HTMLButtonElement  // Für <button>-Elemente

// Warum? Zugriff auf spezifische Properties:
searchInput.value       // Nur auf HTMLInputElement
publisherSelect.options // Nur auf HTMLSelectElement
```

**Teil 2: Werte auslesen**

```typescript
const searchTerm = searchInput?.value.toLowerCase() || "";
const publisher = publisherSelect?.value || "-";
```

**Optional Chaining `?.`:**

```typescript
// Syntax: object?.property

// Ohne Optional Chaining:
const value = searchInput !== null ? searchInput.value : undefined;

// Mit Optional Chaining:
const value = searchInput?.value;

// Vorteil: Kürzer und sicherer
// Wenn searchInput null ist, gibt es undefined zurück (kein Fehler)
```

**Nullish Coalescing `||`:**

```typescript
// Syntax: value || fallback

const searchTerm = searchInput?.value.toLowerCase() || "";
// Wenn searchInput?.value.toLowerCase() falsy ist, nutze ""

// Falsy-Werte in JavaScript:
// - undefined
// - null
// - "" (leerer String)
// - 0
// - false
// - NaN
```

**Die Methode `.toLowerCase()`:**

```typescript
// Konvertiert String zu Kleinbuchstaben

"JavaScript".toLowerCase(); // "javascript"
"TYPESCRIPT".toLowerCase(); // "typescript"
"Hello World".toLowerCase(); // "hello world"

// Warum? Case-insensitive Suche:
"JavaScript".includes("script"); // false
"JavaScript".toLowerCase().includes("script"); // true
```

**Teil 3: Filtern**

```typescript
filteredBooks = allBooks.filter((book) => {
  const matchesSearch = book.title.toLowerCase().includes(searchTerm);
  const matchesPublisher = publisher === "-" || book.publisher === publisher;
  return matchesSearch && matchesPublisher;
});
```

**Die Methode `.filter()`:**

```typescript
// Erstellt neues Array mit Elementen, die Test bestehen

const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter((n) => n % 2 === 0);
console.log(evenNumbers); // [2, 4]

// Original bleibt unverändert:
console.log(numbers); // [1, 2, 3, 4, 5]
```

**matchesSearch:**

```typescript
const matchesSearch = book.title.toLowerCase().includes(searchTerm);
```

**Beispiele:**

```typescript
// book.title = "JavaScript Basics"
// searchTerm = "script"

book.title
  .toLowerCase() // "javascript basics"
  .includes(searchTerm); // .includes("script")
// Ergebnis: true

// book.title = "Python Guide"
// searchTerm = "script"

book.title
  .toLowerCase() // "python guide"
  .includes(searchTerm); // .includes("script")
// Ergebnis: false
```

**matchesPublisher:**

```typescript
const matchesPublisher = publisher === "-" || book.publisher === publisher;
```

**Logische ODER-Verknüpfung `||`:**

```typescript
// Syntax: bedingung1 || bedingung2
// Gibt true zurück, wenn EINE der Bedingungen true ist

publisher === "-"; // true  → Alle Verlage
book.publisher === publisher; // false → Spezifischer Verlag

// Wenn publisher = "-":
true || false; // true (mindestens eine Bedingung erfüllt)

// Wenn publisher = "O'Reilly" und book.publisher = "O'Reilly":
false || true; // true (mindestens eine Bedingung erfüllt)

// Wenn publisher = "O'Reilly" und book.publisher = "dpunkt":
false || false; // false (keine Bedingung erfüllt)
```

**return Statement:**

```typescript
return matchesSearch && matchesPublisher;
```

**Logische UND-Verknüpfung `&&`:**

```typescript
// Syntax: bedingung1 && bedingung2
// Gibt nur true zurück, wenn BEIDE Bedingungen true sind

matchesSearch && matchesPublisher;
true && true; // true  → Buch wird angezeigt
true && false; // false → Buch wird nicht angezeigt
false && true; // false → Buch wird nicht angezeigt
false && false; // false → Buch wird nicht angezeigt
```

**Komplettes Beispiel:**

```typescript
// Bücher:
// 1. { title: "JavaScript Basics", publisher: "O'Reilly" }
// 2. { title: "Python Guide", publisher: "O'Reilly" }
// 3. { title: "JavaScript Advanced", publisher: "dpunkt" }

// Filter:
// searchTerm = "javascript"
// publisher = "O'Reilly"

// Buch 1:
matchesSearch: "javascript basics".includes("javascript"); // true
matchesPublisher: "O'Reilly" === "O'Reilly"; // true
return true && true; // true → ANGEZEIGT

// Buch 2:
matchesSearch: "python guide".includes("javascript"); // false
matchesPublisher: "O'Reilly" === "O'Reilly"; // true
return false && true; // false → NICHT ANGEZEIGT

// Buch 3:
matchesSearch: "javascript advanced".includes("javascript"); // true
matchesPublisher: "dpunkt" === "O'Reilly"; // false
return true && false; // false → NICHT ANGEZEIGT

// Ergebnis: Nur Buch 1 wird angezeigt
```

**Teil 4: Neu rendern**

```typescript
renderBooks();
```

- Zeigt die gefilterten Bücher in der Tabelle an

---

#### 6. API-Funktionen

##### fetchBooks() - Bücher vom Server laden

```typescript
async function fetchBooks(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    allBooks = await response.json();
    filteredBooks = allBooks;

    const publishers = Array.from(
      new Set(allBooks.map((book) => book.publisher))
    );
    const publisherSelect = document.getElementById(
      "by-publisher"
    ) as HTMLSelectElement;

    if (publisherSelect) {
      publisherSelect.innerHTML = '<option value="-">-</option>';
      publishers.forEach((publisher) => {
        const option = document.createElement("option");
        option.value = publisher;
        option.textContent = publisher;
        publisherSelect.appendChild(option);
      });
    }

    renderBooks();
  } catch (error) {
    console.error("Error fetching books:", error);
    const tbody = document.querySelector("tbody");
    if (tbody) {
      tbody.innerHTML =
        '<tr><td colspan="6">Failed to load books. Make sure the API server is running.</td></tr>';
    }
  }
}
```

**Was macht diese Funktion?**

Lädt alle Bücher von der API und befüllt das Verlags-Dropdown.

**async/await Erklärung:**

```typescript
async function fetchBooks(): Promise<void> {
```

**Was ist `async`?**

```typescript
// Normale Funktion:
function normal() {
  return 42;
}

// Async-Funktion:
async function async() {
  return 42;
}

// Unterschied:
normal(); // 42
async(); // Promise { 42 }

// async-Funktionen geben immer ein Promise zurück
```

**Was ist `Promise<void>`?**

```typescript
// Promise<T> ist ein Typ für asynchrone Operationen
// Promise<void> bedeutet: Kein Rückgabewert, aber asynchron

async function fetchBooks(): Promise<void> {
  // Kein return-Statement
}

async function getNumber(): Promise<number> {
  return 42; // Gibt Promise<number> zurück
}
```

**try-catch Block:**

```typescript
try {
  // Code, der einen Fehler werfen könnte
  const result = await fetch(url);
} catch (error) {
  // Code für Fehlerbehandlung
  console.error("Fehler:", error);
}
```

**Teil 1: HTTP-Request**

```typescript
const response = await fetch(`${API_URL}/books`);
```

**Was ist `fetch()`?**

```typescript
// fetch() führt HTTP-Requests aus

fetch(url); // GET-Request
// Rückgabe: Promise<Response>

// Ohne await (Promise):
const promise = fetch(url);
console.log(promise); // Promise { <pending> }

// Mit await (Warte auf Ergebnis):
const response = await fetch(url);
console.log(response); // Response { status: 200, ... }
```

**Template String mit API_URL:**

```typescript
`${API_URL}/books`;
// API_URL = "http://localhost:4730"
// Ergebnis: "http://localhost:4730/books"
```

**Teil 2: Fehlerprüfung**

```typescript
if (!response.ok) {
  throw new Error("Failed to fetch books");
}
```

**Die Property `.ok`:**

```typescript
// response.ok ist true bei Status 200-299

response.status = 200; // response.ok = true  (Erfolg)
response.status = 404; // response.ok = false (Not Found)
response.status = 500; // response.ok = false (Server Error)
```

**throw new Error():**

```typescript
// Wirft einen Fehler
// Springt sofort zum catch-Block

if (!response.ok) {
  throw new Error("Failed to fetch books");  // Fehler werfen
}
console.log("Dieser Code wird nicht erreicht");

// Im catch-Block:
catch (error) {
  console.error(error);  // Error: Failed to fetch books
}
```

**Teil 3: JSON parsen**

```typescript
allBooks = await response.json();
filteredBooks = allBooks;
```

**Die Methode `.json()`:**

```typescript
// Parst JSON-Response zu JavaScript-Objekt/Array

const response = await fetch(url);
const data = await response.json();

// Auch asynchron → await nötig!
```

**Teil 4: Verlags-Dropdown befüllen**

```typescript
const publishers = Array.from(new Set(allBooks.map((book) => book.publisher)));
```

**Schritt für Schritt:**

```typescript
// 1. .map() - Extrahiere alle Verlagsnamen
allBooks.map(book => book.publisher)
// ["dpunkt", "O'Reilly", "dpunkt", "Leanpub", "O'Reilly"]

// 2. new Set() - Entferne Duplikate
new Set(["dpunkt", "O'Reilly", "dpunkt"])
// Set { "dpunkt", "O'Reilly" }

// 3. Array.from() - Konvertiere Set zu Array
Array.from(Set { "dpunkt", "O'Reilly" })
// ["dpunkt", "O'Reilly"]
```

**Die Methode `.map()`:**

```typescript
// Transformiert jedes Element

const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6]

// Für Bücher:
const titles = allBooks.map((book) => book.title);
// ["Angular", "React", "Vue", ...]
```

**Set-Datenstruktur:**

```typescript
// Set speichert nur eindeutige Werte

const set = new Set();
set.add("A");
set.add("B");
set.add("A"); // Wird ignoriert (schon vorhanden)
console.log(set); // Set { "A", "B" }

// Array zu Set:
const array = ["A", "B", "A", "C", "B"];
const unique = new Set(array);
console.log(unique); // Set { "A", "B", "C" }
```

**Teil 5: Dropdown-Optionen erstellen**

```typescript
publisherSelect.innerHTML = '<option value="-">-</option>';
publishers.forEach((publisher) => {
  const option = document.createElement("option");
  option.value = publisher;
  option.textContent = publisher;
  publisherSelect.appendChild(option);
});
```

**HTML-Ergebnis:**

```html
<select id="by-publisher">
  <option value="-">-</option>
  <option value="dpunkt">dpunkt</option>
  <option value="O'Reilly">O'Reilly</option>
  <option value="Leanpub">Leanpub</option>
</select>
```

**Teil 6: Fehlerbehandlung**

```typescript
catch (error) {
  console.error("Error fetching books:", error);
  const tbody = document.querySelector("tbody");
  if (tbody) {
    tbody.innerHTML = '<tr><td colspan="6">Failed to load books...</td></tr>';
  }
}
```

**console.error():**

```typescript
// Gibt Fehlermeldung in der Browser-Konsole aus

console.log("Normal"); // Schwarz
console.warn("Warnung"); // Gelb
console.error("Fehler"); // Rot
```

**colspan="6":**

```html
<!-- colspan verbindet mehrere Spalten -->
<tr>
  <td colspan="6">Nachricht über alle 6 Spalten</td>
</tr>

<!-- Ohne colspan: -->
<tr>
  <td>Spalte 1</td>
  <td>Spalte 2</td>
  <td>Spalte 3</td>
  <td>Spalte 4</td>
  <td>Spalte 5</td>
  <td>Spalte 6</td>
</tr>
```

---

#### 7. Initialisierung

```typescript
document.addEventListener("DOMContentLoaded", () => {
  updateFavoriteCount();
  fetchBooks();

  const searchInput = document.getElementById("search");
  const publisherSelect = document.getElementById("by-publisher");

  searchInput?.addEventListener("input", filterBooks);
  publisherSelect?.addEventListener("change", filterBooks);
});
```

**Was macht dieser Code?**

Initialisiert die Anwendung, sobald die Seite geladen ist.

**DOMContentLoaded Event:**

```typescript
document.addEventListener("DOMContentLoaded", () => {
  // Code hier wird ausgeführt, sobald HTML fertig geladen ist
});
```

**Warum DOMContentLoaded?**

```typescript
// Problem ohne DOMContentLoaded:
const element = document.querySelector("#search");
// ❌ null - HTML noch nicht geladen!

// Lösung mit DOMContentLoaded:
document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector("#search");
  // ✅ Element existiert jetzt
});
```

**Initialisierungs-Reihenfolge:**

```typescript
// 1. Favoriten-Anzahl aktualisieren
updateFavoriteCount();

// 2. Bücher von API laden
fetchBooks();
// → Lädt allBooks
// → Befüllt Dropdown
// → Ruft renderBooks() auf

// 3. Event-Listener registrieren
searchInput?.addEventListener("input", filterBooks);
publisherSelect?.addEventListener("change", filterBooks);
```

**Event-Typen:**

```typescript
// "input" - Bei jeder Eingabe
searchInput.addEventListener("input", filterBooks);
// Wird gefeuert: Jedes Mal beim Tippen

// "change" - Bei Verlassen des Feldes
searchInput.addEventListener("change", filterBooks);
// Wird gefeuert: Nur beim Verlassen (Blur)

// "change" - Bei Auswahl-Änderung
publisherSelect.addEventListener("change", filterBooks);
// Wird gefeuert: Wenn neue Option gewählt wird
```

---

#### Zusammenfassung

Die `index.ts` Datei orchestriert die gesamte Bücherlisten-Seite:

**Datenfluss:**

```
1. Seite lädt → DOMContentLoaded
   ↓
2. updateFavoriteCount() → Zeigt Favoriten-Anzahl
   ↓
3. fetchBooks() → Lädt Bücher von API
   ↓
4. allBooks befüllt
   ↓
5. filteredBooks = allBooks
   ↓
6. renderBooks() → Zeigt Bücher in Tabelle
   ↓
7. Event-Listener registriert
   ↓
8. Benutzer sucht/filtert
   ↓
9. filterBooks() → Filtert allBooks
   ↓
10. renderBooks() → Zeigt gefilterte Bücher
```

**Wichtige Konzepte:**

✅ **localStorage** - Favoriten dauerhaft speichern
✅ **async/await** - Asynchrone API-Aufrufe
✅ **DOM-Manipulation** - HTML dynamisch erstellen
✅ **Event-Listener** - Auf Benutzer-Interaktionen reagieren
✅ **Array-Methoden** - filter(), map(), forEach()
✅ **Template Strings** - HTML mit Variablen erstellen
✅ **Type Annotations** - TypeScript-Typsicherheit

Diese Datei ist ein perfektes Beispiel für moderne JavaScript/TypeScript-Webanwendungen!

---

### favorite.ts

Die Datei `favorite.ts` ist die **Hauptlogik** der Favoriten-Seite (`favorite.html`). Sie ist sehr ähnlich zu `index.ts`, hat aber spezielle Funktionen für:

- Laden nur der favorisierten Bücher
- Entfernen von Favoriten
- Anzeigen einer leeren Liste, wenn keine Favoriten vorhanden sind

#### Vollständiger Überblick

Die Datei ist in folgende Abschnitte gegliedert:

1. **Imports und Konstanten** - Typen und Konfiguration
2. **Globale Variablen** - Speichert Favoriten-Buchdaten
3. **Favoriten-Verwaltung** - localStorage-Operationen
4. **Anzeige-Funktionen** - DOM-Manipulation für Favoriten
5. **Filter-Funktionen** - Such- und Filterlogik für Favoriten
6. **Lade-Funktionen** - Nur Favoriten von der API laden
7. **Initialisierung** - Setup beim Laden der Seite

---

#### 1. Imports und Konstanten

```typescript
import type { Book } from "./types.js";

const API_URL = "http://localhost:4730";
```

**Diese Zeilen sind identisch zu `index.ts`:**

- `import type { Book }`: Importiert nur den Typ (keine Funktion)
- `API_URL`: Die BookMonkey-API Adresse

**Warum die gleichen Konstanten?**

```typescript
// Beide Dateien (index.ts und favorite.ts) brauchen:
// 1. Das Book-Interface für Typ-Sicherheit
// 2. Die API-URL für HTTP-Requests

// Vorteil: Jede Datei ist eigenständig
// Nachteil: Duplikation (könnte in gemeinsame Datei)
```

---

#### 2. Globale Variablen

```typescript
let allBooks: Book[] = [];
let filteredBooks: Book[] = [];
```

**Unterschied zu index.ts:**

```typescript
// In index.ts:
allBooks = [alle 100 Bücher vom Server]

// In favorite.ts:
allBooks = [nur die favorisierten Bücher]
// z.B. nur 5 von 100 Büchern
```

**Beispiel:**

```typescript
// Favoriten-ISBNs: ["123", "456", "789"]

// Alle Bücher vom Server: 100 Bücher
// allBooks in favorite.ts: Nur 3 Bücher (mit ISBN 123, 456, 789)
// filteredBooks: Die 3 Bücher (oder weniger nach Filterung)
```

---

#### 3. Favoriten-Verwaltung

##### getFavorites() und saveFavorites()

```typescript
function getFavorites(): string[] {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
}

function saveFavorites(favorites: string[]): void {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
```

**Diese Funktionen sind identisch zu index.ts:**

Sie wurden bereits in der index.ts-Sektion erklärt. Der Code ist derselbe, weil beide Seiten auf die gleichen Favoriten-Daten zugreifen müssen.

---

##### removeFavorite() - Favorit entfernen

```typescript
function removeFavorite(isbn: string): void {
  const favorites = getFavorites();
  const index = favorites.indexOf(isbn);

  if (index > -1) {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);
  updateFavoriteCount();
  loadFavorites();
}
```

**Was macht diese Funktion?**

Entfernt ein Buch aus der Favoritenliste und lädt die Seite neu.

**Unterschied zu toggleFavorite() in index.ts:**

```typescript
// In index.ts - toggleFavorite():
if (index > -1) {
  favorites.splice(index, 1); // Entfernen
} else {
  favorites.push(isbn); // ODER Hinzufügen
}
renderBooks(); // Nur neu rendern

// In favorite.ts - removeFavorite():
if (index > -1) {
  favorites.splice(index, 1); // NUR Entfernen
}
// KEIN else-Block (kein Hinzufügen möglich)
loadFavorites(); // Komplett neu laden!
```

**Warum loadFavorites() statt renderBooks()?**

```typescript
// Szenario: 5 Favoriten angezeigt
// Benutzer entfernt 1 Favorit

// Mit renderBooks():
// - allBooks bleibt bei 5 Büchern
// - Aber favorites hat nur noch 4 ISBNs
// - ❌ Inkonsistenz!

// Mit loadFavorites():
// - Lädt Favoriten neu vom Server
// - allBooks wird auf 4 Bücher reduziert
// - ✅ Konsistent!
```

**Zeile für Zeile:**

```typescript
const favorites = getFavorites();
```

- Lädt aktuelle Favoriten: `["123", "456", "789"]`

```typescript
const index = favorites.indexOf(isbn);
```

- Sucht Position der ISBN im Array

```typescript
if (index > -1) {
  favorites.splice(index, 1);
}
```

- Wenn gefunden: Entferne aus Array
- Wenn nicht gefunden: Nichts tun (sollte nicht vorkommen)

**Warum "sollte nicht vorkommen"?**

```typescript
// Diese Funktion wird nur aufgerufen, wenn:
// 1. Das Buch in der Favoriten-TABELLE angezeigt wird
// 2. Der Benutzer auf den Entfernen-Button klickt
// → Das Buch MUSS ein Favorit sein
// → indexOf() sollte immer etwas finden

// Aber: Sicherheitscheck ist trotzdem gut!
```

```typescript
saveFavorites(favorites);
```

- Speichert aktualisierte Liste im localStorage

```typescript
updateFavoriteCount();
```

- Aktualisiert die Zahl im Header (z.B. "Favorites **4**" statt "Favorites **5**")

```typescript
loadFavorites();
```

- Lädt Favoriten komplett neu
- Holt Bücher vom Server
- Filtert nur Favoriten
- Rendert Tabelle neu

**Komplettes Beispiel:**

```typescript
// Ausgangssituation:
// localStorage: ["123", "456", "789"]
// allBooks: [book123, book456, book789]
// Tabelle zeigt: 3 Bücher

// Benutzer klickt auf X bei Buch "456"
removeFavorite("456");

// 1. getFavorites() → ["123", "456", "789"]
// 2. indexOf("456") → 1
// 3. splice(1, 1) → ["123", "789"]
// 4. saveFavorites(["123", "789"])
// 5. updateFavoriteCount() → Header zeigt "2"
// 6. loadFavorites() → Lädt book123, book789 vom Server
//    → Tabelle zeigt: 2 Bücher
```

---

##### updateFavoriteCount() - Anzahl im Header aktualisieren

```typescript
function updateFavoriteCount(): void {
  const favorites = getFavorites();
  const countElement = document.querySelector(".mainnav-number");
  if (countElement) {
    countElement.textContent = favorites.length.toString();
  }
}
```

**Diese Funktion ist identisch zu index.ts:**

Sie wurde bereits in der index.ts-Sektion erklärt. Beide Seiten zeigen die gleiche Favoriten-Anzahl im Header.

---

#### 4. Anzeige-Funktionen

##### renderBooks() - Favoriten-Tabelle anzeigen

```typescript
function renderBooks(): void {
  const tbody = document.querySelector("tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const countElement = document.querySelector("main h2");
  if (countElement) {
    countElement.textContent = `${filteredBooks.length} Favorites on your list`;
  }

  if (filteredBooks.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">No favorite books found.</td></tr>';
    return;
  }

  filteredBooks.forEach((book) => {
    // ... Bücher anzeigen
  });

  // ... Event-Listener hinzufügen
}
```

**Unterschiede zu index.ts:**

##### 1. Überschrift-Text

```typescript
// In index.ts:
countElement.textContent = `${filteredBooks.length} Books displayed`;

// In favorite.ts:
countElement.textContent = `${filteredBooks.length} Favorites on your list`;
```

##### 2. Leere-Liste-Meldung

```typescript
if (filteredBooks.length === 0) {
  tbody.innerHTML = '<tr><td colspan="6">No favorite books found.</td></tr>';
  return;
}
```

**Warum dieser Check?**

```typescript
// In index.ts:
// - Es gibt IMMER Bücher (vom Server geladen)
// - Leere Liste bedeutet nur: Filter passt auf kein Buch
// - Meldung: "0 Books displayed" (aber Dropdown hat Optionen)

// In favorite.ts:
// - Es kann wirklich keine Favoriten geben!
// - Leere Liste bedeutet: Benutzer hat keine Favoriten gewählt
// - Meldung: "No favorite books found." (klare Aussage)
```

**Early Return:**

```typescript
if (filteredBooks.length === 0) {
  tbody.innerHTML = '<tr><td colspan="6">No favorite books found.</td></tr>';
  return; // Beende Funktion hier
}

// Code hier wird nur ausgeführt, wenn Favoriten vorhanden sind
filteredBooks.forEach((book) => {
  // ...
});
```

##### 3. SVG-Icon (X im Kreis)

```typescript
// In index.ts:
// Herz-Icon (gefüllt oder leer)
<svg>
  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 ...">
    <!-- Herz-Form -->
  </path>
</svg>

// In favorite.ts:
// Kreis mit X (immer gefüllt)
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 ...">
    <!-- Kreis mit X-Form -->
  </path>
</svg>
```

**Warum unterschiedliche Icons?**

```typescript
// index.ts:
// - Zeigt ALLE Bücher
// - Herz = "Zu Favoriten hinzufügen/entfernen"
// - Toggle-Funktion

// favorite.ts:
// - Zeigt NUR Favoriten
// - X im Kreis = "Von Favoriten entfernen"
// - Nur Entfernen-Funktion
```

**SVG-Details:**

```html
<!-- Kreis mit X -->
<svg viewBox="0 0 24 24" fill="currentColor">
  <path
    fill-rule="evenodd"
    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
  />
</svg>
```

**Was bedeutet der Path?**

```typescript
// SVG-Pfad besteht aus zwei Teilen:

// Teil 1: Kreis zeichnen
// "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75..."
// → Zeichnet einen Kreis um Punkt (12, 12)

// Teil 2: X zeichnen
// "zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72..."
// → Zeichnet zwei sich kreuzende Linien (X)

// fill="currentColor" → Nutzt die Text-Farbe
// viewBox="0 0 24 24" → Koordinatensystem 24x24
```

##### 4. Event-Listener

```typescript
// In index.ts:
button.addEventListener("click", () => {
  const isbn = (button as HTMLElement).getAttribute("data-isbn");
  if (isbn) {
    toggleFavorite(isbn); // Toggle (hinzufügen/entfernen)
  }
});

// In favorite.ts:
button.addEventListener("click", () => {
  const isbn = (button as HTMLElement).getAttribute("data-isbn");
  if (isbn) {
    removeFavorite(isbn); // Nur entfernen
  }
});
```

**Komplettes Beispiel:**

```typescript
// HTML-Ergebnis in favorite.ts:
<tbody>
  <tr>
    <td>
      <button class="button button-clear fav-btn" data-isbn="123">
        <svg><!-- X im Kreis --></svg>
      </button>
    </td>
    <td>JavaScript Basics</td>
    <td>123</td>
    <td>Max Mustermann</td>
    <td>O'Reilly</td>
    <td>
      <button onclick="location.href='detail.html?isbn=123'">
        Detail
      </button>
    </td>
  </tr>
</tbody>

// Bei Klick auf X:
// 1. Event-Listener wird ausgelöst
// 2. getAttribute("data-isbn") → "123"
// 3. removeFavorite("123")
// 4. Buch wird aus Favoriten entfernt
// 5. loadFavorites() lädt Seite neu
// 6. Buch verschwindet aus der Tabelle
```

---

#### 5. Filter-Funktionen

##### filterBooks() - Favoriten filtern

```typescript
function filterBooks(): void {
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const publisherSelect = document.getElementById(
    "by-publisher"
  ) as HTMLSelectElement;

  const searchTerm = searchInput?.value.toLowerCase() || "";
  const publisher = publisherSelect?.value || "-";

  filteredBooks = allBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm);
    const matchesPublisher = publisher === "-" || book.publisher === publisher;
    return matchesSearch && matchesPublisher;
  });

  renderBooks();
}
```

**Diese Funktion ist identisch zu index.ts:**

Die Filter-Logik ist die gleiche:

- Suche im Titel
- Filter nach Verlag
- Zeige nur passende Bücher

**Unterschied im Kontext:**

```typescript
// In index.ts:
// allBooks = [alle 100 Bücher vom Server]
// filterBooks() filtert aus 100 Büchern

// In favorite.ts:
// allBooks = [nur favorisierte Bücher, z.B. 5]
// filterBooks() filtert aus 5 Büchern
```

**Beispiel:**

```typescript
// Favoriten: 5 Bücher
// allBooks = [book1, book2, book3, book4, book5]

// Benutzer sucht "Java":
filterBooks();
// matchesSearch für jedes Buch prüfen:
// book1.title = "JavaScript Basics" → includes("java") → true
// book2.title = "Python Guide" → includes("java") → false
// book3.title = "Java Advanced" → includes("java") → true
// book4.title = "React Handbook" → includes("java") → false
// book5.title = "JavaScript Pro" → includes("java") → true

// filteredBooks = [book1, book3, book5]
// renderBooks() zeigt nur diese 3 Bücher
```

---

#### 6. Lade-Funktionen

##### loadFavorites() - Nur Favoriten laden

Diese Funktion ist das **Herzstück von favorite.ts** und unterscheidet sich deutlich von `fetchBooks()` in index.ts.

```typescript
async function loadFavorites(): Promise<void> {
  const favorites = getFavorites();

  if (favorites.length === 0) {
    allBooks = [];
    filteredBooks = [];

    const publisherSelect = document.getElementById(
      "by-publisher"
    ) as HTMLSelectElement;
    if (publisherSelect) {
      publisherSelect.innerHTML = '<option value="-">-</option>';
    }

    renderBooks();
    return;
  }

  try {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const books: Book[] = await response.json();

    allBooks = books.filter((book) => favorites.includes(book.isbn));
    filteredBooks = allBooks;

    // ... Dropdown befüllen
    // ... renderBooks()
  } catch (error) {
    // ... Fehlerbehandlung
  }
}
```

**Teil 1: Favoriten-Check**

```typescript
const favorites = getFavorites();
```

- Lädt Favoriten-ISBNs aus localStorage: `["123", "456", "789"]`

```typescript
if (favorites.length === 0) {
  allBooks = [];
  filteredBooks = [];

  const publisherSelect = document.getElementById(
    "by-publisher"
  ) as HTMLSelectElement;
  if (publisherSelect) {
    publisherSelect.innerHTML = '<option value="-">-</option>';
  }

  renderBooks();
  return;
}
```

**Was passiert hier?**

```typescript
// Wenn KEINE Favoriten vorhanden:
// 1. Leere alle Arrays
// 2. Leere das Dropdown (nur "-" Option)
// 3. Zeige leere Tabelle mit Meldung
// 4. Beende Funktion (kein API-Call nötig!)
```

**Warum Dropdown leeren?**

```typescript
// Szenario: Benutzer entfernt alle Favoriten

// Ohne Dropdown-Leeren:
// - Tabelle leer: "No favorite books found."
// - Dropdown zeigt: "O'Reilly", "dpunkt", "Leanpub"
// - ❌ Verwirrend: Warum gibt es Optionen, wenn keine Bücher?

// Mit Dropdown-Leeren:
// - Tabelle leer: "No favorite books found."
// - Dropdown zeigt: nur "-"
// - ✅ Konsistent: Keine Bücher = keine Verlags-Optionen
```

**Teil 2: Bücher vom Server laden**

```typescript
const response = await fetch(`${API_URL}/books`);
if (!response.ok) {
  throw new Error("Failed to fetch books");
}
const books: Book[] = await response.json();
```

**Diese Zeilen sind identisch zu index.ts:**

Lädt alle Bücher von der API. Aber der nächste Schritt ist anders!

**Teil 3: Nur Favoriten filtern**

```typescript
allBooks = books.filter((book) => favorites.includes(book.isbn));
filteredBooks = allBooks;
```

**Hier ist der große Unterschied zu index.ts!**

```typescript
// In index.ts (fetchBooks):
allBooks = await response.json();
// → Speichert ALLE Bücher

// In favorite.ts (loadFavorites):
allBooks = books.filter((book) => favorites.includes(book.isbn));
// → Filtert NUR Favoriten
```

**Detaillierte Erklärung:**

```typescript
books.filter((book) => favorites.includes(book.isbn));
```

**Schritt für Schritt:**

```typescript
// 1. books = [alle 100 Bücher vom Server]
const books = await response.json();

// 2. favorites = ["123", "456", "789"] (aus localStorage)
const favorites = getFavorites();

// 3. Für jedes Buch prüfen:
books.filter((book) => {
  // Ist die ISBN des Buches in der Favoriten-Liste?
  return favorites.includes(book.isbn);
});

// 4. Nur Bücher behalten, wo includes() true zurückgibt
```

**Die Methode `.includes()` nochmal:**

```typescript
const favorites = ["123", "456", "789"];

favorites.includes("123"); // true  → Buch wird behalten
favorites.includes("999"); // false → Buch wird aussortiert
```

**Komplettes Beispiel:**

```typescript
// Favoriten-ISBNs:
const favorites = ["123", "456", "789"];

// Alle Bücher vom Server (vereinfacht):
const books = [
  { isbn: "123", title: "JavaScript" },
  { isbn: "456", title: "TypeScript" },
  { isbn: "789", title: "React" },
  { isbn: "999", title: "Angular" },
  { isbn: "111", title: "Vue" },
];

// Filter-Prozess:
// Buch 1: isbn="123" → favorites.includes("123") → true  ✅
// Buch 2: isbn="456" → favorites.includes("456") → true  ✅
// Buch 3: isbn="789" → favorites.includes("789") → true  ✅
// Buch 4: isbn="999" → favorites.includes("999") → false ❌
// Buch 5: isbn="111" → favorites.includes("111") → false ❌

// Ergebnis:
allBooks = [
  { isbn: "123", title: "JavaScript" },
  { isbn: "456", title: "TypeScript" },
  { isbn: "789", title: "React" },
];
// Nur 3 von 5 Büchern!
```

**Teil 4: Dropdown befüllen**

```typescript
const publishers = Array.from(new Set(allBooks.map((book) => book.publisher)));
const publisherSelect = document.getElementById(
  "by-publisher"
) as HTMLSelectElement;

if (publisherSelect) {
  publisherSelect.innerHTML = '<option value="-">-</option>';
  publishers.forEach((publisherName) => {
    const option = document.createElement("option");
    option.value = publisherName;
    option.textContent = publisherName;
    publisherSelect.appendChild(option);
  });
}
```

**Diese Zeilen sind fast identisch zu index.ts:**

Einziger Unterschied: Variable heißt `publisherName` statt `publisher` (nur Namensänderung, keine funktionale Änderung).

**Wichtig:**

```typescript
// Das Dropdown enthält nur Verlage von Favoriten-Büchern!

// Beispiel:
// Alle Bücher haben Verlage: "O'Reilly", "dpunkt", "Leanpub", "Packt"
// Favoriten haben nur: "O'Reilly", "dpunkt"
// → Dropdown zeigt nur: "-", "O'Reilly", "dpunkt"
```

**Teil 5: Fehlerbehandlung**

```typescript
catch (error) {
  console.error("Error fetching books:", error);
  const tbody = document.querySelector("tbody");
  if (tbody) {
    tbody.innerHTML = '<tr><td colspan="6">Failed to load books. Make sure the API server is running.</td></tr>';
  }
}
```

**Diese Zeilen sind identisch zu index.ts:**

Zeigt Fehlermeldung, wenn API nicht erreichbar ist.

---

#### 7. Initialisierung

```typescript
document.addEventListener("DOMContentLoaded", () => {
  updateFavoriteCount();
  loadFavorites();

  const searchInput = document.getElementById("search");
  const publisherSelect = document.getElementById("by-publisher");

  searchInput?.addEventListener("input", filterBooks);
  publisherSelect?.addEventListener("change", filterBooks);
});
```

**Unterschied zu index.ts:**

```typescript
// In index.ts:
updateFavoriteCount();
fetchBooks(); // Lädt ALLE Bücher

// In favorite.ts:
updateFavoriteCount();
loadFavorites(); // Lädt NUR Favoriten
```

**Initialisierungs-Reihenfolge:**

```typescript
// 1. Favoriten-Anzahl im Header aktualisieren
updateFavoriteCount(); // → "Favorites 3"

// 2. Favoriten-Bücher laden
loadFavorites();
// → Lädt Favoriten-ISBNs aus localStorage
// → Lädt alle Bücher vom Server
// → Filtert nur Favoriten
// → Befüllt Dropdown
// → Zeigt Favoriten-Tabelle

// 3. Event-Listener registrieren
searchInput?.addEventListener("input", filterBooks);
publisherSelect?.addEventListener("change", filterBooks);
// → Benutzer kann suchen/filtern
```

---

#### Zusammenfassung

Die `favorite.ts` Datei ist eine **spezialisierte Version** von `index.ts`:

**Hauptunterschiede:**

| Feature             | index.ts               | favorite.ts                |
| ------------------- | ---------------------- | -------------------------- |
| **Datenquelle**     | Alle Bücher vom Server | Nur favorisierte Bücher    |
| **allBooks**        | 100 Bücher (alle)      | 5 Bücher (nur Favoriten)   |
| **Icon**            | Herz (gefüllt/leer)    | X im Kreis (immer gefüllt) |
| **Button-Funktion** | toggleFavorite()       | removeFavorite()           |
| **Lade-Funktion**   | fetchBooks()           | loadFavorites()            |
| **Leere Liste**     | "0 Books displayed"    | "No favorite books found." |
| **Dropdown**        | Alle Verlage           | Nur Verlage von Favoriten  |

**Datenfluss:**

```
1. Seite lädt → DOMContentLoaded
   ↓
2. updateFavoriteCount() → Zeigt Favoriten-Anzahl
   ↓
3. loadFavorites() → Lädt Favoriten-ISBNs aus localStorage
   ↓
4. getFavorites() → z.B. ["123", "456", "789"]
   ↓
5. Prüfung: Favoriten vorhanden?
   │
   ├─ Nein → allBooks = [], renderBooks() → "No favorite books found."
   │
   └─ Ja → Weiter
       ↓
6. fetch("/books") → Alle Bücher vom Server
   ↓
7. books.filter() → Nur Favoriten behalten
   ↓
8. allBooks = [3 Bücher mit ISBN 123, 456, 789]
   ↓
9. Dropdown befüllen (nur Verlage der 3 Bücher)
   ↓
10. renderBooks() → Zeigt 3 Favoriten in Tabelle
   ↓
11. Event-Listener registriert
   ↓
12. Benutzer klickt X bei Buch "456"
   ↓
13. removeFavorite("456")
   ↓
14. Favoriten-Liste: ["123", "789"] (ohne "456")
   ↓
15. loadFavorites() → Lädt neu (nur noch 2 Bücher)
   ↓
16. renderBooks() → Zeigt 2 Favoriten
```

**Wichtige Konzepte:**

✅ **Selektives Laden** - Nur benötigte Daten vom Server filtern
✅ **Konsistenz** - Bei Änderung komplette Neuladen (loadFavorites)
✅ **User Experience** - Klare Meldungen bei leerer Liste
✅ **Code-Wiederverwendung** - Viele Funktionen identisch zu index.ts
✅ **State-Management** - localStorage als Single Source of Truth

**Vergleich der Lade-Funktionen:**

```typescript
// index.ts - fetchBooks():
async function fetchBooks() {
  const books = await fetch("/books").then((r) => r.json());
  allBooks = books; // ALLE Bücher speichern
  // ...
}

// favorite.ts - loadFavorites():
async function loadFavorites() {
  const favorites = getFavorites(); // ISBNs aus localStorage
  const books = await fetch("/books").then((r) => r.json());
  allBooks = books.filter((b) => favorites.includes(b.isbn)); // NUR Favoriten
  // ...
}
```

Diese Datei zeigt perfekt, wie man **Code-Duplikation mit spezialisierten Funktionen** kombiniert. Viele Funktionen sind identisch (getFavorites, saveFavorites, filterBooks, renderBooks), aber die Lade-Logik ist spezialisiert auf Favoriten.

---

### detail.ts

Die Datei `detail.ts` ist die **Hauptlogik** der Detail-Seite (`detail.html`). Diese Seite zeigt die **vollständigen Informationen eines einzelnen Buches** an. Sie hat spezielle Funktionen für:

- Auslesen der ISBN aus der URL (Query-Parameter)
- Laden der Buchdetails von der API
- Anzeigen von Cover, Titel, Beschreibung und Metadaten
- Fehlerbehandlung für ungültige ISBNs oder fehlende Bilder

#### Vollständiger Überblick

Die Datei ist in folgende Abschnitte gegliedert:

1. **Imports und Konstanten** - Typen und Konfiguration
2. **Favoriten-Anzeige** - updateFavoriteCount()
3. **Detail-Lade-Funktion** - loadBookDetails()
4. **URL-Parameter-Handling** - URLSearchParams
5. **DOM-Manipulation** - Buchdetails anzeigen
6. **Bild-Fehlerbehandlung** - onerror für fehlende Cover
7. **Initialisierung** - Setup beim Laden der Seite

---

#### 1. Imports und Konstanten

```typescript
import type { Book } from "./types.js";

const API_URL = "http://localhost:4730";
```

**Diese Zeilen sind identisch zu index.ts und favorite.ts:**

- `import type { Book }`: Importiert nur den Typ für TypeScript
- `API_URL`: Die BookMonkey-API Adresse

**Warum braucht detail.ts das Book-Interface?**

```typescript
// Die Funktion empfängt ein Book-Objekt von der API:
const book: Book = await response.json();

// TypeScript prüft dann:
book.title; // ✅ Existiert im Book-Interface
book.subtitle; // ✅ Existiert (optional)
book.description; // ❌ FEHLER: Existiert nicht im Book-Interface
// Sollte book.abstract heißen
```

---

#### 2. Favoriten-Anzeige

##### updateFavoriteCount() - Anzahl im Header aktualisieren

```typescript
function updateFavoriteCount(): void {
  const favorites = localStorage.getItem("favorites");
  const favList = favorites ? JSON.parse(favorites) : [];
  const countElement = document.querySelector(".mainnav-number");
  if (countElement) {
    countElement.textContent = favList.length.toString();
  }
}
```

**Unterschied zu index.ts und favorite.ts:**

```typescript
// In index.ts / favorite.ts:
function updateFavoriteCount(): void {
  const favorites = getFavorites(); // Nutzt getFavorites()-Funktion
  const countElement = document.querySelector(".mainnav-number");
  if (countElement) {
    countElement.textContent = favorites.length.toString();
  }
}

// In detail.ts:
function updateFavoriteCount(): void {
  const favorites = localStorage.getItem("favorites"); // Direkter localStorage-Zugriff
  const favList = favorites ? JSON.parse(favorites) : [];
  const countElement = document.querySelector(".mainnav-number");
  if (countElement) {
    countElement.textContent = favList.length.toString();
  }
}
```

**Warum direkter localStorage-Zugriff?**

```typescript
// detail.ts hat KEINE getFavorites()-Funktion
// Weil: Die Seite braucht keine Favoriten-Verwaltung
// Sie zeigt nur die Anzahl im Header

// Option 1: getFavorites() duplizieren
// ❌ Code-Duplikation

// Option 2: Direkt localStorage.getItem() nutzen
// ✅ Funktioniert, da nur ein Aufruf nötig ist

// Option 3: Gemeinsame Utility-Datei
// ✅ Best Practice für größere Projekte
// Für dieses kleine Projekt: Option 2 ist OK
```

**Zeile für Zeile:**

```typescript
const favorites = localStorage.getItem("favorites");
```

- Liest Favoriten aus localStorage
- Rückgabe: `string | null`

```typescript
const favList = favorites ? JSON.parse(favorites) : [];
```

**Ternärer Operator:**

```typescript
// Wenn favorites existiert (nicht null):
favorites ? JSON.parse(favorites) : [];
// → JSON.parse(favorites) → ["123", "456", "789"]

// Wenn favorites null ist (keine Favoriten gespeichert):
favorites ? JSON.parse(favorites) : [];
// → [] (leeres Array)
```

**Variablenname `favList` statt `favorites`:**

```typescript
// Warum anderer Name?
const favorites = localStorage.getItem("favorites"); // string | null
const favList = favorites ? JSON.parse(favorites) : []; // string[]

// favorites: Der JSON-String aus localStorage
// favList: Das geparste Array

// Beispiel:
favorites = '["123", "456"]'; // string
favList = ["123", "456"]; // Array
```

---

#### 3. Detail-Lade-Funktion

##### loadBookDetails() - Buchdetails laden und anzeigen

Diese Funktion ist das **Herzstück von detail.ts**. Sie ist komplexer als die Lade-Funktionen in index.ts und favorite.ts, weil sie:

1. ISBN aus der URL auslesen muss
2. Nur EIN Buch (nicht viele) lädt
3. Viele verschiedene DOM-Elemente aktualisiert
4. Spezielle Fehlerbehandlung hat

```typescript
async function loadBookDetails(): Promise<void> {
  const urlParams = new URLSearchParams(window.location.search);
  const isbn = urlParams.get("isbn");

  if (!isbn) {
    const main = document.querySelector("main");
    if (main) {
      main.innerHTML = "<h1>Book not found</h1><p>No ISBN provided.</p>";
    }
    return;
  }

  try {
    const response = await fetch(`${API_URL}/books/${isbn}`);
    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }
    const book: Book = await response.json();

    // ... DOM aktualisieren
  } catch (error) {
    // ... Fehlerbehandlung
  }
}
```

**Teil 1: URL-Parameter auslesen**

```typescript
const urlParams = new URLSearchParams(window.location.search);
const isbn = urlParams.get("isbn");
```

**Was ist URLSearchParams?**

```typescript
// URLSearchParams ist eine Browser-API zum Parsen von Query-Parametern

// Beispiel-URL: detail.html?isbn=9783864907791&page=1

// window.location.search gibt Query-String zurück:
window.location.search; // "?isbn=9783864907791&page=1"

// URLSearchParams parst diesen String:
const urlParams = new URLSearchParams("?isbn=9783864907791&page=1");

// .get() holt einen Parameter:
urlParams.get("isbn"); // "9783864907791"
urlParams.get("page"); // "1"
urlParams.get("author"); // null (nicht vorhanden)
```

**window.location erklärt:**

```typescript
// window.location enthält Info über die aktuelle URL

// URL: http://localhost:3000/detail.html?isbn=123

window.location.href; // "http://localhost:3000/detail.html?isbn=123"
window.location.protocol; // "http:"
window.location.host; // "localhost:3000"
window.location.pathname; // "/detail.html"
window.location.search; // "?isbn=123"
window.location.hash; // "" (z.B. "#section1" bei Ankern)
```

**Komplettes Beispiel:**

```typescript
// Benutzer klickt auf "Detail" in index.html:
<button onclick="location.href='detail.html?isbn=9783864907791'">
  Detail
</button>;

// Browser navigiert zu:
// http://localhost:3000/detail.html?isbn=9783864907791

// detail.ts läuft:
window.location.search; // "?isbn=9783864907791"

const urlParams = new URLSearchParams(window.location.search);
// urlParams enthält: { isbn: "9783864907791" }

const isbn = urlParams.get("isbn");
// isbn = "9783864907791"
```

**Weitere URLSearchParams-Methoden:**

```typescript
// URL: detail.html?isbn=123&author=Max&lang=de

const urlParams = new URLSearchParams(window.location.search);

// .get() - Einen Parameter holen
urlParams.get("isbn"); // "123"
urlParams.get("author"); // "Max"
urlParams.get("missing"); // null

// .has() - Prüfen ob Parameter existiert
urlParams.has("isbn"); // true
urlParams.has("missing"); // false

// .getAll() - Alle Werte eines Parameters (bei mehrfachen Werten)
// URL: detail.html?tag=fiction&tag=bestseller
urlParams.getAll("tag"); // ["fiction", "bestseller"]

// .toString() - Zurück zu Query-String
urlParams.toString(); // "isbn=123&author=Max&lang=de"
```

**Teil 2: ISBN-Validierung**

```typescript
if (!isbn) {
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = "<h1>Book not found</h1><p>No ISBN provided.</p>";
  }
  return;
}
```

**Warum dieser Check?**

```typescript
// Szenario 1: Normale Navigation
// Von index.html: <button onclick="location.href='detail.html?isbn=123'">
// → isbn = "123" → Check bestanden

// Szenario 2: Direkte URL-Eingabe ohne Parameter
// Benutzer tippt: http://localhost:3000/detail.html
// → window.location.search = ""
// → urlParams.get("isbn") = null
// → isbn = null → Check schlägt fehl
```

**Fehlerbehandlung:**

```typescript
if (!isbn) {
  // 1. Finde das main-Element
  const main = document.querySelector("main");

  // 2. Wenn gefunden, setze innerHTML
  if (main) {
    main.innerHTML = "<h1>Book not found</h1><p>No ISBN provided.</p>";
  }

  // 3. Beende Funktion vorzeitig (Early Return)
  return;
}

// Code hier wird nur ausgeführt, wenn isbn vorhanden ist
```

**Warum .innerHTML statt .textContent?**

```typescript
// Mit .textContent:
main.textContent = "<h1>Book not found</h1><p>No ISBN provided.</p>";
// Anzeige: <h1>Book not found</h1><p>No ISBN provided.</p>
// → HTML-Tags werden als Text angezeigt!

// Mit .innerHTML:
main.innerHTML = "<h1>Book not found</h1><p>No ISBN provided.</p>";
// Anzeige:
// Book not found (als h1)
// No ISBN provided. (als p)
// → HTML-Tags werden als HTML interpretiert!
```

**Sicherheitshinweis zu innerHTML:**

```typescript
// ⚠️ VORSICHT: innerHTML kann XSS-Anfällig sein!

// Gefährlich:
const userInput = urlParams.get("message");
main.innerHTML = userInput; // ❌ Benutzer könnte <script> einfügen!

// Sicher:
main.textContent = userInput; // ✅ HTML wird escaped

// In unserem Fall OK:
main.innerHTML = "<h1>Book not found</h1>"; // ✅ Fester String, kein User-Input
```

**Teil 3: API-Request**

```typescript
try {
  const response = await fetch(`${API_URL}/books/${isbn}`);
  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }
  const book: Book = await response.json();

  // ... DOM aktualisieren
} catch (error) {
  // ... Fehlerbehandlung
}
```

**Unterschied zu index.ts und favorite.ts:**

```typescript
// In index.ts / favorite.ts:
const response = await fetch(`${API_URL}/books`);
// Endpoint: /books → Gibt ALLE Bücher zurück
// Rückgabe: Book[] (Array)

// In detail.ts:
const response = await fetch(`${API_URL}/books/${isbn}`);
// Endpoint: /books/9783864907791 → Gibt EIN Buch zurück
// Rückgabe: Book (Objekt, kein Array!)
```

**API-Endpoint-Erklärung:**

```typescript
// REST-API-Konventionen:

// Alle Ressourcen holen:
GET / books;
// → [{ id: "1", ... }, { id: "2", ... }]

// Eine spezifische Ressource holen:
GET / books / 9783864907791;
// → { id: "9783864907791", title: "Angular", ... }

// Ähnlich wie:
GET / users; // Alle Benutzer
GET / users / 123; // Benutzer mit ID 123
```

**Template String mit ISBN:**

```typescript
const isbn = "9783864907791";
const url = `${API_URL}/books/${isbn}`;
// url = "http://localhost:4730/books/9783864907791"

// Ohne Template String:
const url = API_URL + "/books/" + isbn;
// Weniger lesbar
```

**Type Annotation für book:**

```typescript
const book: Book = await response.json();
```

**Warum `: Book` hinzufügen?**

```typescript
// Ohne Type Annotation:
const book = await response.json();
// TypeScript weiß: book ist vom Typ 'any'
// → Keine Typ-Prüfung!
book.titel; // ❌ Tippfehler, aber kein Fehler in TypeScript
book.anything; // ❌ Existiert nicht, aber kein Fehler

// Mit Type Annotation:
const book: Book = await response.json();
// TypeScript weiß: book ist vom Typ 'Book'
// → Typ-Prüfung aktiv!
book.titel; // ❌ FEHLER: Property 'titel' does not exist
book.title; // ✅ OK
book.anything; // ❌ FEHLER: Property 'anything' does not exist
```

**Teil 4: DOM aktualisieren - Titel**

```typescript
const titleElement = document.querySelector("main h1");
if (titleElement) {
  titleElement.innerHTML = `${book.title}<br /><small>${
    book.subtitle || ""
  }</small>`;
}
```

**HTML-Kontext:**

```html
<!-- detail.html: -->
<main>
  <h1></h1>
  <!-- Wird von TypeScript gefüllt -->
</main>
```

**Zeile für Zeile:**

```typescript
const titleElement = document.querySelector("main h1");
```

**CSS-Selektor `"main h1"`:**

```typescript
// Findet das h1-Element INNERHALB von main

// HTML-Struktur:
// <main>
//   <h1></h1>       ← Dieses Element wird gefunden
// </main>
// <footer>
//   <h1></h1>       ← Dieses Element wird NICHT gefunden
// </footer>

// Unterschied zu:
document.querySelector("h1"); // Erstes h1 im Dokument
document.querySelector("main h1"); // h1 innerhalb von main
```

```typescript
titleElement.innerHTML = `${book.title}<br /><small>${
  book.subtitle || ""
}</small>`;
```

**Template String mit mehreren Variablen:**

```typescript
// Beispiel-Buch:
const book = {
  title: "Angular",
  subtitle: "Grundlagen, fortgeschrittene Themen und Best Practices",
};

// Template String:
`${book.title}<br /><small>${book.subtitle || ""}</small>`;

// Ergebnis:
("Angular<br /><small>Grundlagen, fortgeschrittene Themen und Best Practices</small>");

// Im Browser wird angezeigt:
// Angular
// Grundlagen, fortgeschrittene Themen und Best Practices (kleiner)
```

**Das `<small>`-Element:**

```html
<!-- <small> macht Text kleiner -->
<h1>
  Angular<br />
  <small>Grundlagen und Best Practices</small>
</h1>

<!-- Visuelle Darstellung:
Angular                               (groß, normal)
Grundlagen und Best Practices         (groß, aber kleiner als Angular)
-->
```

**Das `<br />`-Element:**

```html
<!-- <br /> ist ein Zeilenumbruch -->
<h1>Angular<br />Subtitle</h1>

<!-- Ohne <br />: -->
<h1>AngularSubtitle</h1>

<!-- Mit <br />: -->
<h1>Angular Subtitle</h1>
```

**Nullish Coalescing `|| ""`:**

```typescript
book.subtitle || "";
```

**Warum nötig?**

```typescript
// subtitle ist optional im Book-Interface:
interface Book {
  title: string;
  subtitle?: string; // Optional!
  // ...
}

// Zwei Szenarien:

// 1. Buch HAT subtitle:
book.subtitle = "Grundlagen und Best Practices";
book.subtitle || ""; // "Grundlagen und Best Practices"

// 2. Buch HAT KEINEN subtitle:
book.subtitle = undefined;
book.subtitle ||
  "" // Ohne || "": // "" (leerer String)
  `<small>${book.subtitle}</small>` // Mit || "": // Bei undefined: <small>undefined</small>  ❌ Zeigt "undefined" an!
  `<small>${book.subtitle || ""}</small>`;
// Bei undefined: <small></small>  ✅ Zeigt nichts an
```

**Komplettes Beispiel:**

```typescript
// Buch 1: Mit Subtitle
const book1 = {
  title: "Angular",
  subtitle: "Grundlagen und Best Practices",
};
titleElement.innerHTML = `${book1.title}<br /><small>${
  book1.subtitle || ""
}</small>`;
// HTML:
// <h1>Angular<br /><small>Grundlagen und Best Practices</small></h1>

// Buch 2: Ohne Subtitle
const book2 = {
  title: "React",
  subtitle: undefined,
};
titleElement.innerHTML = `${book2.title}<br /><small>${
  book2.subtitle || ""
}</small>`;
// HTML:
// <h1>React<br /><small></small></h1>
```

**Teil 5: DOM aktualisieren - Beschreibung**

```typescript
const abstractElement = document.querySelector("main p");
if (abstractElement) {
  abstractElement.textContent = book.abstract || "No description available.";
}
```

**Zeile für Zeile:**

```typescript
const abstractElement = document.querySelector("main p");
```

- Findet das `<p>`-Element innerhalb von `<main>`
- Dort wird die Buchbeschreibung angezeigt

```typescript
abstractElement.textContent = book.abstract || "No description available.";
```

**Warum .textContent statt .innerHTML?**

```typescript
// Die Buchbeschreibung ist reiner Text (kein HTML)

// Mit .textContent:
abstractElement.textContent = book.abstract;
// → Sicher, HTML wird escaped

// Mit .innerHTML:
abstractElement.innerHTML = book.abstract;
// → Unsicher, wenn API HTML zurückgibt
// → Könnte <script> enthalten (XSS-Risiko)
```

**Nullish Coalescing für abstract:**

```typescript
book.abstract || "No description available.";

// abstract ist optional:
interface Book {
  abstract?: string; // Optional!
}

// Wenn abstract undefined:
undefined || "No description available."; // "No description available."

// Wenn abstract vorhanden:
"Ein spannendes Buch..." || "No description available."; // "Ein spannendes Buch..."
```

**Teil 6: DOM aktualisieren - Details-Liste**

```typescript
const detailsList = document.querySelector("main ul");
if (detailsList) {
  detailsList.innerHTML = `
    <li><strong>Author:</strong> ${book.author}</li>
    <li><strong>Publisher:</strong> ${book.publisher}</li>
    <li><strong>Pages:</strong> ${book.numPages || "N/A"}</li>
  `;
}
```

**HTML-Kontext:**

```html
<!-- detail.html: -->
<main>
  <ul></ul>
  <!-- Wird von TypeScript gefüllt -->
</main>
```

**Das `<strong>`-Element:**

```html
<!-- <strong> macht Text fett -->
<li><strong>Author:</strong> Max Mustermann</li>

<!-- Visuelle Darstellung:
Author: Max Mustermann
^^^     (fett)
-->
```

**Template String mit Listenelementen:**

```typescript
// Beispiel-Buch:
const book = {
  author: "Ferdinand Malcher",
  publisher: "dpunkt.verlag",
  numPages: 850
};

// Template String:
`
  <li><strong>Author:</strong> ${book.author}</li>
  <li><strong>Publisher:</strong> ${book.publisher}</li>
  <li><strong>Pages:</strong> ${book.numPages || "N/A"}</li>
`

// Ergebnis (HTML):
<ul>
  <li><strong>Author:</strong> Ferdinand Malcher</li>
  <li><strong>Publisher:</strong> dpunkt.verlag</li>
  <li><strong>Pages:</strong> 850</li>
</ul>
```

**Nullish Coalescing für numPages:**

```typescript
book.numPages || "N/A";

// numPages ist optional:
interface Book {
  numPages?: number; // Optional!
}

// Wenn numPages undefined:
undefined || "N/A"; // "N/A"

// Wenn numPages vorhanden:
850 || "N/A"; // 850

// Edge Case - Wenn numPages = 0:
0 || "N/A"; // "N/A"  ← Problematisch!
// 0 ist falsy, also wird "N/A" zurückgegeben
// Bessere Lösung: book.numPages ?? "N/A" (Nullish Coalescing Operator)
```

**Unterschied `||` vs `??`:**

```typescript
// || prüft auf falsy (false, 0, "", null, undefined, NaN)
0 || "N/A"; // "N/A"
"" || "N/A"; // "N/A"
false || "N/A"; // "N/A"
null || "N/A"; // "N/A"
undefined || "N/A"; // "N/A"

// ?? prüft nur auf null/undefined
0 ?? "N/A"; // 0
"" ?? "N/A"; // ""
false ?? "N/A"; // false
null ?? "N/A"; // "N/A"
undefined ?? "N/A"; // "N/A"

// Für numPages besser:
book.numPages ?? "N/A";
// → Zeigt 0, wenn Buch 0 Seiten hat (theoretisch)
// → Zeigt "N/A", wenn numPages undefined/null ist
```

**Warum wird hier `||` statt `??` verwendet?**

```typescript
// In der Praxis haben Bücher nie 0 Seiten
// Also ist || OK und einfacher
// ?? wäre technisch korrekter, aber nicht nötig
```

**Teil 7: DOM aktualisieren - Buchcover**

```typescript
const imgElement = document.querySelector("main img") as HTMLImageElement;
if (imgElement) {
  imgElement.src = `images/${book.isbn}.png`;
  imgElement.alt = book.title;
  imgElement.onerror = () => {
    imgElement.style.display = "none";
  };
}
```

**Type Assertion `as HTMLImageElement`:**

```typescript
const imgElement = document.querySelector("main img") as HTMLImageElement;
```

**Warum nötig?**

```typescript
// querySelector gibt Element | null zurück
// Element hat keine .src, .alt Properties
// Nur HTMLImageElement hat diese Properties

// Ohne Type Assertion:
const imgElement = document.querySelector("main img");
imgElement.src = "..."; // ❌ FEHLER: Property 'src' does not exist on type 'Element'

// Mit Type Assertion:
const imgElement = document.querySelector("main img") as HTMLImageElement;
imgElement.src = "..."; // ✅ OK
```

**Die Property `.src`:**

```typescript
imgElement.src = `images/${book.isbn}.png`;
```

**Beispiel:**

```typescript
// Wenn book.isbn = "9783864907791"
imgElement.src = `images/9783864907791.png`;

// HTML:
<img src="images/9783864907791.png">

// Erwartet Bild-Datei:
// src/images/9783864907791.png
```

**Relativer Pfad:**

```typescript
// URL: http://localhost:3000/detail.html
// src="images/..." ist relativ zur HTML-Datei

// Wird aufgelöst zu:
// http://localhost:3000/images/9783864907791.png

// Projekt-Struktur:
// src/
//   detail.html
//   images/
//     9783864907791.png
```

**Die Property `.alt`:**

```typescript
imgElement.alt = book.title;
```

**Was ist alt?**

```html
<!-- alt = Alternativ-Text -->
<img src="book.png" alt="Angular - Grundlagen" />

<!-- Wird angezeigt, wenn:
1. Bild nicht geladen werden kann
2. Screenreader für Blinde
3. Bilder im Browser deaktiviert
-->
```

**Die Property `.onerror`:**

```typescript
imgElement.onerror = () => {
  imgElement.style.display = "none";
};
```

**Was ist onerror?**

```typescript
// onerror ist ein Event-Handler
// Wird ausgeführt, wenn Bild nicht geladen werden kann

// Szenario 1: Bild existiert
// src="images/9783864907791.png"
// → Bild wird geladen
// → onerror wird NICHT aufgerufen

// Szenario 2: Bild existiert nicht
// src="images/9999999999999.png"
// → Bild kann nicht geladen werden
// → onerror wird aufgerufen
// → imgElement.style.display = "none"
// → Bild wird versteckt
```

**Arrow Function für onerror:**

```typescript
// Kurze Schreibweise:
imgElement.onerror = () => {
  imgElement.style.display = "none";
};

// Lange Schreibweise:
imgElement.onerror = function() {
  imgElement.style.display = "none";
};

// Inline (direkt im HTML):
<img onerror="this.style.display='none'">
```

**Die Property `.style.display`:**

```typescript
imgElement.style.display = "none";
```

**Was macht display: none?**

```css
/* CSS */
img {
  display: none; /* Element wird komplett versteckt */
}

/* Alternativen: */
img {
  visibility: hidden; /* Element bleibt im Layout, ist aber unsichtbar */
  opacity: 0; /* Element ist transparent */
}
```

```html
<!-- Ohne display: none -->
<img src="nicht-gefunden.png" alt="Buch" />
<!-- Zeigt: [Broken Image Icon] + alt-Text -->

<!-- Mit display: none -->
<img src="nicht-gefunden.png" alt="Buch" style="display: none" />
<!-- Zeigt: Nichts (Element ist komplett weg) -->
```

**Warum nicht das img-Element entfernen?**

```typescript
// Option 1: display: none (verwendet)
imgElement.style.display = "none";
// ✅ Einfach
// ✅ Schnell
// ❌ Element bleibt im DOM

// Option 2: Element entfernen
imgElement.remove();
// ✅ Element komplett aus DOM entfernt
// ✅ Sauberer
// ❌ Kann nicht wieder hinzugefügt werden

// Für diesen Anwendungsfall: Option 1 ist ausreichend
```

**Komplettes Beispiel:**

```typescript
// Buch 1: Cover existiert
book.isbn = "9783864907791";
imgElement.src = "images/9783864907791.png"; // ✅ Datei existiert
// → Bild wird angezeigt
// → onerror wird nicht aufgerufen

// Buch 2: Cover existiert nicht
book.isbn = "9999999999999";
imgElement.src = "images/9999999999999.png"; // ❌ Datei existiert nicht
// → Bild kann nicht geladen werden
// → onerror wird aufgerufen
// → imgElement.style.display = "none"
// → Bild wird versteckt (zeigt nichts an)
```

**Teil 8: Fehlerbehandlung**

```typescript
catch (error) {
  console.error("Error fetching book:", error);
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML = "<h1>Error</h1><p>Failed to load book details. Make sure the API server is running.</p>";
  }
}
```

**Wann wird catch ausgeführt?**

```typescript
try {
  // Mögliche Fehler:

  // 1. Netzwerkfehler (API nicht erreichbar)
  const response = await fetch(`${API_URL}/books/${isbn}`);

  // 2. HTTP-Fehler (404 Not Found, 500 Server Error)
  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }

  // 3. JSON-Parse-Fehler (API gibt kein valides JSON zurück)
  const book: Book = await response.json();
} catch (error) {
  // Alle Fehler werden hier abgefangen
  console.error("Error fetching book:", error);
  // ...
}
```

**Fehler-Szenarien:**

```typescript
// Szenario 1: API-Server läuft nicht
// fetch() wirft Fehler
// → catch-Block wird ausgeführt
// → Zeigt: "Failed to load book details. Make sure the API server is running."

// Szenario 2: Buch existiert nicht
// fetch() erfolgreich, aber response.status = 404
// → if (!response.ok) wirft Fehler
// → catch-Block wird ausgeführt
// → Zeigt: "Failed to load book details..."

// Szenario 3: API gibt ungültiges JSON zurück
// response.json() wirft Fehler
// → catch-Block wird ausgeführt
// → Zeigt: "Failed to load book details..."
```

**Unterschied zu "No ISBN provided":**

```typescript
// Fehler 1: Keine ISBN in URL
if (!isbn) {
  main.innerHTML = "<h1>Book not found</h1><p>No ISBN provided.</p>";
  return;
}
// → Benutzer-Fehler (falsche URL)

// Fehler 2: API-Problem
catch (error) {
  main.innerHTML = "<h1>Error</h1><p>Failed to load book details...</p>";
}
// → Technischer Fehler (Server/Netzwerk)
```

---

#### 4. Initialisierung

```typescript
document.addEventListener("DOMContentLoaded", () => {
  updateFavoriteCount();
  loadBookDetails();
});
```

**Initialisierungs-Reihenfolge:**

```typescript
// 1. Favoriten-Anzahl im Header aktualisieren
updateFavoriteCount(); // → "Favorites 3"

// 2. Buchdetails laden
loadBookDetails();
// → ISBN aus URL auslesen
// → Buch von API laden
// → DOM aktualisieren (Titel, Beschreibung, Cover, etc.)
```

**Kein Event-Listener für Suche/Filter:**

```typescript
// In index.ts / favorite.ts:
document.addEventListener("DOMContentLoaded", () => {
  updateFavoriteCount();
  fetchBooks() / loadFavorites();

  // Event-Listener für Suche/Filter
  searchInput?.addEventListener("input", filterBooks);
  publisherSelect?.addEventListener("change", filterBooks);
});

// In detail.ts:
document.addEventListener("DOMContentLoaded", () => {
  updateFavoriteCount();
  loadBookDetails();

  // KEINE Event-Listener
  // Detail-Seite hat keine Suche/Filter-Funktionalität
});
```

---

#### Zusammenfassung

Die `detail.ts` Datei zeigt die **vollständigen Informationen eines einzelnen Buches**:

**Hauptunterschiede zu index.ts / favorite.ts:**

| Feature              | index.ts / favorite.ts     | detail.ts                        |
| -------------------- | -------------------------- | -------------------------------- |
| **Datenquelle**      | Alle / Favorisierte Bücher | Ein einzelnes Buch               |
| **API-Endpoint**     | `/books`                   | `/books/:isbn`                   |
| **Rückgabe-Typ**     | `Book[]` (Array)           | `Book` (Objekt)                  |
| **URL-Parameter**    | Keine                      | `?isbn=...`                      |
| **DOM-Updates**      | Tabelle mit Zeilen         | Mehrere einzelne Elemente        |
| **Suche/Filter**     | Ja                         | Nein                             |
| **Fehlerbehandlung** | API nicht erreichbar       | + Ungültige ISBN, Fehlendes Bild |

**Datenfluss:**

```
1. Seite lädt → DOMContentLoaded
   ↓
2. updateFavoriteCount() → Zeigt Favoriten-Anzahl
   ↓
3. loadBookDetails()
   ↓
4. URL-Parameter auslesen
   window.location.search → "?isbn=9783864907791"
   URLSearchParams.get("isbn") → "9783864907791"
   ↓
5. Validierung: ISBN vorhanden?
   │
   ├─ Nein → Zeige "Book not found"
   │
   └─ Ja → Weiter
       ↓
6. API-Request
   fetch(`${API_URL}/books/9783864907791`)
   ↓
7. Response verarbeiten
   const book: Book = await response.json()
   ↓
8. DOM aktualisieren
   ├─ Titel + Subtitle → <h1>
   ├─ Beschreibung → <p>
   ├─ Details-Liste → <ul>
   └─ Buchcover → <img>
   ↓
9. Bild-Fehlerbehandlung
   onerror → display: none (wenn Bild nicht gefunden)
   ↓
10. Seite vollständig angezeigt
```

**Wichtige Konzepte:**

✅ **URLSearchParams** - Query-Parameter aus URL auslesen
✅ **REST-API-Patterns** - `/books/:id` für einzelne Ressourcen
✅ **Type Assertions** - `as HTMLImageElement` für spezifische DOM-Elemente
✅ **Fehlerbehandlung** - Mehrere Fehlerszenarien abdecken
✅ **Bild-Events** - `onerror` für fehlende Bilder
✅ **Optionale Properties** - `book.subtitle || ""` für undefined-Handling
✅ **Template Strings** - Komplexes HTML mit mehreren Variablen
✅ **DOM-Manipulation** - Unterschiedliche Elemente gleichzeitig aktualisieren

**Navigation zwischen Seiten:**

```typescript
// Von index.html zu detail.html:
<button onclick="location.href='detail.html?isbn=${book.isbn}'">
  Detail
</button>

// In detail.html:
// 1. URL: detail.html?isbn=9783864907791
// 2. URLSearchParams extrahiert: isbn = "9783864907791"
// 3. API-Call: fetch("/books/9783864907791")
// 4. Buchdetails werden angezeigt

// Zurück zu index.html:
<a href="index.html">Zurück zur Liste</a>
```

**Best Practices in detail.ts:**

✅ **Early Return** - Bei fehlender ISBN sofort abbrechen
✅ **Fallback-Werte** - `|| "N/A"` für fehlende Daten
✅ **Fehler-UX** - Klare Fehlermeldungen für Benutzer
✅ **Bildoptimierung** - Fehlendes Cover verstecken statt Broken Image Icon
✅ **Type Safety** - Type Assertions für DOM-Elemente

Diese Datei demonstriert perfekt, wie man **URL-Parameter verarbeitet** und **einzelne Ressourcen von einer REST-API** lädt und anzeigt!

---

## HTML-Dateien

### index.html

Die Datei `index.html` ist die **Hauptseite** der Anwendung und zeigt die **Bücherliste** mit Such- und Filter-Funktionen an. Diese Seite ist die erste, die der Benutzer sieht, wenn er die Anwendung öffnet.

#### Vollständiger Überblick

Die HTML-Datei ist in folgende Abschnitte gegliedert:

1. **DOCTYPE und HTML-Root** - Dokumenttyp und Sprache
2. **Head-Bereich** - Meta-Tags, CSS-Links, Titel
3. **Body-Struktur** - Haupt-Layout
4. **Header** - Navigation und Logo
5. **Main-Bereich** - Suchformulare und Büchertabelle
6. **Script-Tag** - JavaScript-Einbindung

---

#### 1. DOCTYPE und HTML-Root

```html
<!DOCTYPE html>
<html lang="en"></html>
```

##### DOCTYPE-Deklaration

```html
<!DOCTYPE html>
```

**Was ist DOCTYPE?**

```html
<!-- DOCTYPE teilt dem Browser mit, welche HTML-Version verwendet wird -->

<!-- HTML5 (modern, empfohlen): -->
<!DOCTYPE html>

<!-- Alte HTML4-Version (veraltet): -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!-- XHTML (veraltet): -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

**Warum ist DOCTYPE wichtig?**

```html
<!-- Mit DOCTYPE: -->
<!DOCTYPE html>
<html>
  ...
</html>
<!-- → Browser nutzt "Standards Mode"
     → Moderne HTML5-Features verfügbar
     → CSS funktioniert korrekt -->

<!-- Ohne DOCTYPE: -->
<html>
  ...
</html>
<!-- → Browser nutzt "Quirks Mode"
     → Alte Browser-Bugs werden emuliert
     → CSS kann anders dargestellt werden -->
```

##### HTML-Element mit lang-Attribut

```html
<html lang="en"></html>
```

**Was bedeutet `lang="en"`?**

```html
<!-- lang = language (Sprache des Inhalts) -->

<html lang="en">
  <!-- Englisch -->
  <html lang="de">
    <!-- Deutsch -->
    <html lang="fr">
      <!-- Französisch -->
      <html lang="es">
        <!-- Spanisch -->
      </html>
    </html>
  </html>
</html>
```

**Warum ist das lang-Attribut wichtig?**

```html
<!-- Vorteile: -->

<!-- 1. Screenreader (für Blinde): -->
<html lang="en">
  <p>Hello World</p>
  <!-- Wird mit englischer Aussprache vorgelesen -->
</html>

<!-- 2. Suchmaschinen (SEO): -->
<html lang="de">
  <!-- Google weiß: Diese Seite ist auf Deutsch -->
</html>

<!-- 3. Browser-Übersetzung: -->
<html lang="en">
  <!-- Chrome bietet an: "Diese Seite übersetzen?" -->
</html>

<!-- 4. CSS-Sprachabhängig: -->
:lang(en) { quotes: """ """; } /* Englische Anführungszeichen */ :lang(de) {
quotes: "„" """; } /* Deutsche Anführungszeichen */
```

---

#### 2. Head-Bereich

```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Google Fonts -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"
  />
  <!-- CSS Reset -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
  />
  <!-- Milligram CSS -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"
  />
  <link rel="stylesheet" href="style.css" />
  <title>IT Book Library</title>
</head>
```

##### Meta-Tags

**Meta charset="UTF-8"**

```html
<meta charset="UTF-8" />
```

**Was ist charset?**

```html
<!-- charset = character set (Zeichensatz) -->
<!-- Definiert, wie Text kodiert wird -->

<!-- UTF-8 (empfohlen): -->
<meta charset="UTF-8" />
<!-- Unterstützt ALLE Zeichen:
     - Deutsch: äöüßÄÖÜ
     - Französisch: éèêëÉÈÊË
     - Chinesisch: 中文
     - Emoji: 😀🎉 -->

<!-- ISO-8859-1 (veraltet): -->
<meta charset="ISO-8859-1" />
<!-- Nur westeuropäische Zeichen -->
```

**Was passiert ohne charset?**

```html
<!-- Ohne charset: -->
<html>
  <body>
    <p>Schöne Grüße</p>
  </body>
</html>
<!-- Browser rät Kodierung → Kann falsch sein
     Anzeige: "SchÃ¶ne GrÃ¼Ãe" (Mojibake) -->

<!-- Mit charset: -->
<meta charset="UTF-8" />
<!-- Anzeige: "Schöne Grüße" ✓ -->
```

**Meta http-equiv="X-UA-Compatible"**

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```

**Was bedeutet das?**

```html
<!-- Speziell für Internet Explorer (veraltet) -->

<!-- content="IE=edge": -->
<!-- → Nutze die NEUSTE IE-Engine
     → Nicht den "Kompatibilitätsmodus" -->

<!-- Beispiel:
     IE11 kann im IE7-Modus laufen (für alte Seiten)
     Dieses Meta-Tag sagt: "Nutze IE11-Modus!" -->

<!-- Heute weniger wichtig, da IE eingestellt wurde
     Aber schadet nicht, es zu haben -->
```

**Meta viewport**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**Was ist viewport?**

```html
<!-- viewport = Sichtbarer Bereich des Browsers -->

<!-- Ohne viewport (auf Mobilgeräten):
     Website wird wie auf Desktop angezeigt
     → Sehr klein und gezoomt
     → Benutzer muss hineinzoomen -->

<!-- Mit viewport:
     Website passt sich an Bildschirmgröße an
     → Responsive Design funktioniert -->
```

**Attribute im Detail:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- width=device-width:
     → Viewport-Breite = Gerätebreite
     → Auf Handy (375px): Viewport ist 375px breit
     → Auf Tablet (768px): Viewport ist 768px breit -->

<!-- initial-scale=1.0:
     → Kein Zoom beim Laden
     → 1.0 = 100% (normale Größe)
     → 2.0 = 200% (doppelt so groß) -->
```

**Weitere Viewport-Optionen:**

```html
<!-- Minimaler/Maximaler Zoom: -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
/>

<!-- Zoom verbieten (nicht empfohlen für Barrierefreiheit): -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, user-scalable=no"
/>
```

##### CSS-Links

**Google Fonts**

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"
/>
```

**Was macht das?**

```html
<!-- Lädt die Schriftart "Roboto" von Google Fonts -->

<!-- Parameter:
     - family=Roboto: Schriftfamilie
     - 300: Leichte Schrift (Light)
     - 300italic: Leichte Kursivschrift
     - 700: Fette Schrift (Bold)
     - 700italic: Fette Kursivschrift -->

<!-- Verwendung in CSS: -->
body { font-family: 'Roboto', sans-serif; font-weight: 300; /* Light */ } h1 {
font-weight: 700; /* Bold */ }
```

**Schriftgewichte:**

```css
/* 100 = Thin */
/* 200 = Extra Light */
/* 300 = Light */
/* 400 = Normal (Standard) */
/* 500 = Medium */
/* 600 = Semi Bold */
/* 700 = Bold */
/* 800 = Extra Bold */
/* 900 = Black */
```

**Warum Google Fonts?**

```html
<!-- Vorteile:
     ✅ Professionelle Schriftarten
     ✅ Kostenlos
     ✅ CDN (schnell weltweit)
     ✅ Keine lokale Installation nötig

     Nachteile:
     ❌ Google kann Nutzer tracken
     ❌ Externe Abhängigkeit (wenn Google down ist)
     ❌ DSGVO-Bedenken in EU -->
```

**Normalize.css**

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
/>
```

**Was ist Normalize.css?**

```html
<!-- CSS Reset Library:
     Standardisiert Browser-Styles
     Entfernt Inkonsistenzen zwischen Browsern -->

<!-- Problem ohne Reset:
     Chrome: <h1> hat 32px margin
     Firefox: <h1> hat 21.44px margin
     Safari: <h1> hat 22px margin

     Mit Normalize:
     Alle Browser: <h1> hat gleichen margin -->
```

**Normalize vs Reset:**

```css
/* Reset.css (alte Methode):
   Entfernt ALLE Styles */
* {
  margin: 0;
  padding: 0;
  border: 0;
}
/* → Alles bei 0 starten
   → Viel Arbeit, alles neu zu stylen */

/* Normalize.css (moderne Methode):
   Behält sinnvolle Styles bei
   Korrigiert nur Inkonsistenzen */
/* → h1 ist immer noch größer als p
   → Aber in allen Browsern gleich */
```

**Milligram CSS**

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"
/>
```

**Was ist Milligram?**

```html
<!-- Minimales CSS-Framework:
     - Nur 2KB (komprimiert)
     - Liefert grundlegendes Styling
     - Alternative zu Bootstrap (viel kleiner) -->

<!-- Milligram styled automatisch:
     - Buttons
     - Forms (Eingabefelder)
     - Tables (Tabellen)
     - Grid (Spalten-Layout)
     - Typography (Schrift) -->
```

**Beispiel-Styles von Milligram:**

```html
<!-- Button -->
<button class="button">Click me</button>
<!-- → Automatisch schön gestylt -->

<!-- Table -->
<table>
  <thead>
    ...
  </thead>
  <tbody>
    ...
  </tbody>
</table>
<!-- → Automatisch mit Border, Padding, Hover-Effekt -->

<!-- Container -->
<div class="container">...</div>
<!-- → Zentriert, max-width: 1120px -->

<!-- Grid -->
<div class="row">
  <div class="column">Spalte 1</div>
  <div class="column">Spalte 2</div>
</div>
<!-- → Automatisches Spalten-Layout -->
```

**Eigene CSS-Datei**

```html
<link rel="stylesheet" href="style.css" />
```

**Wichtig: Reihenfolge der CSS-Dateien!**

```html
<!-- Richtige Reihenfolge: -->
<link rel="stylesheet" href="normalize.css" />
<!-- 1. Reset -->
<link rel="stylesheet" href="milligram.css" />
<!-- 2. Framework -->
<link rel="stylesheet" href="style.css" />
<!-- 3. Eigene Styles -->

<!-- Warum?
     CSS wird von oben nach unten geladen
     Spätere Regeln überschreiben frühere Regeln

     style.css kann Milligram-Styles überschreiben
     Milligram kann Normalize-Styles überschreiben -->
```

**Beispiel:**

```css
/* milligram.css: */
button {
  background-color: #9b4dca; /* Lila */
}

/* style.css: */
button {
  background-color: #007bff; /* Blau */
}

/* Ergebnis: Buttons sind blau (style.css gewinnt) */
```

##### Title-Tag

```html
<title>IT Book Library</title>
```

**Was macht das title-Tag?**

```html
<!-- Setzt den Titel der Browser-Tab -->

<title>IT Book Library</title>
<!-- Browser-Tab zeigt: "IT Book Library" -->

<!-- Auch wichtig für:
     - Bookmarks (Lesezeichen)
     - Suchmaschinen (SEO)
     - Browser-History -->
```

**Best Practices für Titel:**

```html
<!-- ✅ Gut: Kurz und beschreibend -->
<title>IT Book Library</title>

<!-- ✅ Mit Page-Info: -->
<title>Books - IT Book Library</title>

<!-- ❌ Zu lang: -->
<title>
  Willkommen auf der IT Book Library Webseite wo Sie viele Bücher finden können
</title>

<!-- ❌ Zu kurz: -->
<title>Home</title>
```

---

#### 3. Body-Struktur

```html
<body>
  <header class="header">...</header>
  <main class="container">...</main>
  <script type="module" src="../dist/index.js"></script>
</body>
```

**Semantische HTML-Struktur:**

```html
<!-- Semantisches HTML (HTML5): -->
<body>
  <header>  <!-- Kopfbereich -->
  <main>    <!-- Hauptinhalt -->
  <footer>  <!-- Fußbereich (nicht in diesem Projekt) -->
</body>

<!-- Warum semantisch?
     ✅ Screenreader verstehen die Struktur
     ✅ Suchmaschinen verstehen die Struktur
     ✅ Code ist lesbarer
     ✅ CSS ist einfacher (main { ... }) -->

<!-- Nicht-semantisch (veraltet): -->
<body>
  <div id="header">
  <div id="main">
  <div id="footer">
</body>
<!-- Funktioniert, aber weniger gut für Barrierefreiheit -->
```

---

#### 4. Header-Bereich

```html
<header class="header">
  <div class="container">
    <div class="row">
      <div class="column"><p class="logo">IT.Book.Library</p></div>
      <div class="column">
        <nav class="mainnav">
          <a href="index.html" class="mainnav-link mainnav-link--active"
            >Books</a
          >
          <a href="favorite.html" class="mainnav-link">
            Favorites <span class="mainnav-number">2</span>
          </a>
        </nav>
      </div>
    </div>
  </div>
</header>
```

##### Header-Struktur

**header-Element:**

```html
<header class="header"></header>
```

**Warum `<header>` statt `<div>`?**

```html
<!-- Semantisch (HTML5): -->
<header>
  <nav>...</nav>
</header>

<!-- Nicht-semantisch: -->
<div class="header">
  <div class="nav">...</div>
</div>

<!-- Unterschied:
     - <header> hat semantische Bedeutung
     - Screenreader erkennen: "Das ist der Kopfbereich"
     - SEO: Suchmaschinen verstehen die Struktur -->
```

##### Milligram-Grid-System

**container:**

```html
<div class="container"></div>
```

**Was macht die container-Klasse?**

```css
/* Milligram CSS: */
.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Effekt:
   - Inhalt ist maximal 1120px breit
   - Zentriert auf der Seite (margin: 0 auto)
   - Padding links/rechts (auf Mobilgeräten) */
```

**Visuell:**

```
Ohne container:
|-----------------------------------|
| Inhalt über gesamte Breite        |
|-----------------------------------|

Mit container:
|-----------------------------------|
|     |---Inhalt (max 1120px)---|  |
|     |                          |  |
|-----------------------------------|
       ↑ Zentriert              ↑
```

**row:**

```html
<div class="row"></div>
```

**Was macht die row-Klasse?**

```css
/* Milligram CSS: */
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

/* Effekt:
   - Kinder werden nebeneinander angeordnet (Flexbox)
   - Automatischer Umbruch bei kleinen Bildschirmen */
```

**column:**

```html
<div class="column"></div>
```

**Was macht die column-Klasse?**

```css
/* Milligram CSS: */
.column {
  flex: 1;
}

/* Effekt:
   - Spalte nimmt verfügbaren Platz ein
   - Mehrere .column teilen sich den Platz gleichmäßig */
```

**Beispiel:**

```html
<!-- Zwei gleich große Spalten: -->
<div class="row">
  <div class="column">Spalte 1</div>
  <div class="column">Spalte 2</div>
</div>

<!-- Visuelle Darstellung:
|------------------|------------------|
|    Spalte 1      |    Spalte 2      |
|     (50%)        |     (50%)        |
|------------------|------------------| -->

<!-- Eine große, eine kleine Spalte: -->
<div class="row">
  <div class="column">Spalte 1 (66%)</div>
  <div class="column column-33">Spalte 2 (33%)</div>
</div>
```

##### Logo

```html
<div class="column"><p class="logo">IT.Book.Library</p></div>
```

**Warum `<p>` für das Logo?**

```html
<!-- Option 1: <p> (verwendet) -->
<p class="logo">IT.Book.Library</p>
<!-- ✅ Einfach
   ✅ Schnell -->

<!-- Option 2: <h1> (semantisch besser) -->
<h1 class="logo">IT.Book.Library</h1>
<!-- ✅ Semantisch korrekt (Hauptüberschrift)
   ❌ Sollte nur einmal pro Seite verwendet werden -->

<!-- Option 3: <img> (wenn Logo ein Bild ist) -->
<img src="logo.png" alt="IT Book Library" class="logo" />
<!-- ✅ Für grafische Logos -->

<!-- Option 4: <a> (wenn Logo klickbar) -->
<a href="index.html" class="logo">IT.Book.Library</a>
<!-- ✅ Logo navigiert zur Startseite (gängige Praxis) -->
```

##### Navigation

**nav-Element:**

```html
<nav class="mainnav"></nav>
```

**Warum `<nav>` statt `<div>`?**

```html
<!-- Semantisch (HTML5): -->
<nav>
  <a href="...">Link</a>
</nav>

<!-- Nicht-semantisch: -->
<div class="navigation">
  <a href="...">Link</a>
</div>

<!-- Unterschied:
     - <nav> signalisiert: "Das ist die Navigation"
     - Screenreader können zur Navigation springen
     - SEO: Suchmaschinen verstehen die Struktur -->
```

**Navigations-Links:**

```html
<a href="index.html" class="mainnav-link mainnav-link--active">Books</a>
<a href="favorite.html" class="mainnav-link">
  Favorites <span class="mainnav-number">2</span>
</a>
```

**BEM-Naming-Convention:**

```html
<!-- BEM = Block Element Modifier -->

<!-- Block: -->
<nav class="mainnav">
  <!-- Element: -->
  <a class="mainnav-link">
    <!-- Modifier: -->
    <a class="mainnav-link mainnav-link--active">
      <!-- Syntax:
     .block           → mainnav
     .block__element  → mainnav__item (nicht verwendet hier)
     .block--modifier → mainnav--large (nicht verwendet hier)
     .block__element--modifier → mainnav-link--active
--></a
    ></a
  >
</nav>
```

**Warum BEM?**

```css
/* Mit BEM: */
.mainnav {
}
.mainnav-link {
}
.mainnav-link--active {
}

/* Vorteile:
   ✅ Klare Hierarchie
   ✅ Keine Namenskonflikte
   ✅ CSS ist unabhängig von HTML-Struktur */

/* Ohne BEM: */
nav a {
}
nav a.active {
}

/* Nachteile:
   ❌ Abhängig von HTML-Struktur
   ❌ Schwer zu überschreiben
   ❌ Spezifitätsprobleme */
```

**Favoriten-Zahl (Badge):**

```html
<span class="mainnav-number">2</span>
```

**Was macht das?**

```html
<!-- Zeigt die Anzahl der Favoriten an -->

<!-- Wird von JavaScript aktualisiert:
     updateFavoriteCount() in index.ts
     → Liest aus localStorage
     → Setzt textContent -->

<!-- Visuell:
     Favorites 2
              ↑ (Zahl in Kreis oder Badge) -->
```

**CSS für Badge (typisch):**

```css
.mainnav-number {
  display: inline-block;
  background-color: #9b4dca;
  color: white;
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: bold;
}
```

---

#### 5. Main-Bereich

```html
<main class="container">
  <h2>2 Books displayed</h2>
  <section class="row filter-search">...</section>
  <section class="row">...</section>
</main>
```

##### main-Element

```html
<main class="container"></main>
```

**Was ist `<main>`?**

```html
<!-- main = Hauptinhalt der Seite -->

<body>
  <header>Navigation</header>
  <main>
    <!-- DER EIGENTLICHE INHALT -->
  </main>
  <footer>Fußzeile</footer>
</body>

<!-- Regeln:
     - Nur EINMAL pro Seite
     - Enthält den einzigartigen Inhalt
     - NICHT für Header, Footer, Sidebar -->
```

**Warum wichtig?**

```html
<!-- Screenreader:
     Tastenkombination "Skip to main content"
     → Springt direkt zu <main> -->

<!-- SEO:
     Suchmaschinen wissen: Das ist der wichtige Inhalt -->
```

##### Überschrift

```html
<h2>2 Books displayed</h2>
```

**Wird von JavaScript aktualisiert:**

```typescript
// In index.ts / favorite.ts:
const countElement = document.querySelector("main h2");
if (countElement) {
  countElement.textContent = `${filteredBooks.length} Books displayed`;
}

// Beispiele:
// 10 Books displayed
// 1 Books displayed  (grammatisch nicht perfekt, könnte "Book" sein)
// 0 Books displayed
```

**Warum `<h2>` statt `<h1>`?**

```html
<!-- HTML-Überschriften-Hierarchie: -->

<h1>Hauptüberschrift (nur einmal pro Seite)</h1>
<h2>Unterüberschrift</h2>
<h3>Unter-Unterüberschrift</h3>
<h4>...</h4>

<!-- In dieser Anwendung:
     - Kein <h1> (könnte Logo sein)
     - <h2> für Seitentitel
     - Semantisch OK -->
```

##### Such- und Filter-Bereich

```html
<section class="row filter-search">
  <form action="#" class="column">
    <label for="search">Search by Title</label>
    <input type="text" id="search" />
  </form>

  <form action="#" class="column column-33">
    <label for="by-publisher">Filter by Publisher</label>
    <select id="by-publisher">
      <option value="-">-</option>
      <option value="leanpub">Leanpub</option>
      <option value="leanpub">McGraw-Hill</option>
    </select>
  </form>
</section>
```

**section-Element:**

```html
<section class="row filter-search"></section>
```

**Was ist `<section>`?**

```html
<!-- section = Thematischer Abschnitt -->

<main>
  <section>Suche und Filter</section>
  <section>Büchertabelle</section>
</main>

<!-- Alternative: <div>
     Funktioniert gleich, aber weniger semantisch -->
```

**Formular-Struktur:**

```html
<form action="#" class="column"></form>
```

**Was bedeutet `action="#"`?**

```html
<!-- action = Wohin werden Formulardaten gesendet -->

<!-- action="#": -->
<!-- → Sendet zur aktuellen Seite
     → Lädt Seite neu (nicht gewünscht hier) -->

<!-- In dieser Anwendung:
     - Formulare werden NICHT abgesendet
     - JavaScript reagiert auf Eingaben (Event-Listener)
     - action="#" ist Platzhalter -->

<!-- Bessere Alternative: -->
<form action="#" onsubmit="return false;">
  <!-- oder in JavaScript:
     form.addEventListener('submit', (e) => e.preventDefault()); -->
</form>
```

**Label und Input:**

```html
<label for="search">Search by Title</label> <input type="text" id="search" />
```

**Warum Label mit `for`-Attribut?**

```html
<!-- for="search" verbindet Label mit Input (id="search") -->

<label for="search">Search by Title</label>
<input type="text" id="search" />

<!-- Vorteile:
     ✅ Klick auf Label fokussiert Input
     ✅ Screenreader lesen Label beim Input vor
     ✅ Bessere Barrierefreiheit -->

<!-- Ohne for: -->
<label>Search by Title</label>
<input type="text" id="search" />
<!-- ❌ Klick auf Label macht nichts -->
```

**Alternative: Label umschließt Input:**

```html
<!-- Implizite Verbindung: -->
<label>
  Search by Title
  <input type="text" />
</label>

<!-- for-Attribut nicht nötig
     Aber weniger flexibel für CSS -->
```

**Select-Element (Dropdown):**

```html
<select id="by-publisher">
  <option value="-">-</option>
  <option value="leanpub">Leanpub</option>
  <option value="leanpub">McGraw-Hill</option>
</select>
```

**Struktur:**

```html
<select id="by-publisher">
  <!-- Jede Option ist ein Eintrag im Dropdown -->
  <option value="-">-</option>
  <!-- value="-": Wert, den JavaScript erhält
       Textinhalt "-": Was der Benutzer sieht -->
</select>
```

**JavaScript-Interaktion:**

```typescript
// In index.ts:
const publisherSelect = document.getElementById(
  "by-publisher"
) as HTMLSelectElement;
const publisher = publisherSelect.value;

// Benutzer wählt "Leanpub":
// publisher = "leanpub"

// Benutzer wählt "-":
// publisher = "-" (bedeutet: alle Verlage)
```

**Hinweis: Fehler im HTML!**

```html
<option value="leanpub">Leanpub</option>
<option value="leanpub">McGraw-Hill</option>
<!--           ^^^^^^^^ Sollte "mcgraw-hill" sein! -->
```

**Richtig sollte es sein:**

```html
<option value="leanpub">Leanpub</option>
<option value="mcgraw-hill">McGraw-Hill</option>
```

**Wird von JavaScript dynamisch befüllt:**

```typescript
// In index.ts:
publishers.forEach((publisher) => {
  const option = document.createElement("option");
  option.value = publisher;
  option.textContent = publisher;
  publisherSelect.appendChild(option);
});

// Überschreibt die statischen Optionen aus dem HTML
```

**column-33:**

```html
<form action="#" class="column column-33"></form>
```

**Was macht `column-33`?**

```css
/* Milligram CSS: */
.column-33 {
  flex: 0 0 33.3333%;
}

/* Effekt:
   - Spalte nimmt 33.3% der Breite ein
   - Andere Spalte(n) teilen sich verbleibende 66.7% */
```

**Layout:**

```html
<div class="row">
  <form class="column">
    <!-- 66.7% Breite -->
    Suchfeld
  </form>
  <form class="column column-33">
    <!-- 33.3% Breite -->
    Dropdown
  </form>
</div>

<!-- Visuelle Darstellung:
|--------------------------------|---------------|
|        Suchfeld (66.7%)        |  Dropdown     |
|                                |   (33.3%)     |
|--------------------------------|---------------| -->
```

---

#### 6. Büchertabelle

```html
<section class="row">
  <div class="column">
    <table>
      <thead>
        ...
      </thead>
      <tbody>
        ...
      </tbody>
    </table>
  </div>
</section>
```

##### Tabellen-Struktur

**HTML-Tabelle:**

```html
<table>
  <thead>
    <!-- Kopfzeile -->
    <tr>
      <th>Spalte 1</th>
      <th>Spalte 2</th>
    </tr>
  </thead>
  <tbody>
    <!-- Datenzeilen -->
    <tr>
      <td>Daten 1</td>
      <td>Daten 2</td>
    </tr>
  </tbody>
</table>
```

**Elemente erklärt:**

```html
<table>
  <!-- Umschließt gesamte Tabelle -->
  <thead>
    <!-- Table Head (Kopfbereich) -->
  </thead>
  <tbody>
    <!-- Table Body (Datenbereich) -->
    <tr>
      <!-- Table Row (Zeile) -->
      <th><!-- Table Header (Kopfzelle) --></th>
      <td><!-- Table Data (Datenzelle) --></td>
    </tr>
  </tbody>
</table>
```

##### Tabellenkopf (thead)

```html
<thead>
  <tr>
    <th class="first-col">&nbsp;</th>
    <th>Title</th>
    <th>ISBN</th>
    <th>Author</th>
    <th>Publisher</th>
    <th>&nbsp;</th>
  </tr>
</thead>
```

**Was ist `&nbsp;`?**

```html
<!-- &nbsp; = Non-Breaking Space (geschütztes Leerzeichen) -->

<th>&nbsp;</th>
<!-- Leere Zelle, aber nicht komplett leer
     Verhindert, dass Browser die Zelle ignoriert -->

<!-- Alternativen: -->
<th></th>
<!-- Kann von Browsern anders gerendert werden -->
<th></th>
<!-- Normales Leerzeichen (kann entfernt werden) -->
<th>&nbsp;</th>
<!-- Sicheres Leerzeichen -->
```

**Warum leere Kopfzellen?**

```html
<!-- Erste Spalte: Favoriten-Button -->
<th class="first-col">&nbsp;</th>
<!-- Kein Text, da Icon selbsterklärend ist -->

<!-- Letzte Spalte: Detail-Button -->
<th>&nbsp;</th>
<!-- Kein Text, da Button selbst sagt "Detail" -->
```

##### Tabellenkörper (tbody)

```html
<tbody>
  <tr>
    <td>...</td>
    <!-- Favoriten-Button -->
    <td>Java Web Scraping Handbook</td>
    <!-- Titel -->
    <td>1001606140805</td>
    <!-- ISBN -->
    <td>Kevin Sahin</td>
    <!-- Autor -->
    <td>Leanpub</td>
    <!-- Verlag -->
    <td>...</td>
    <!-- Detail-Button -->
  </tr>
</tbody>
```

**Wird von JavaScript dynamisch gefüllt:**

```typescript
// In index.ts:
tbody.innerHTML = ""; // Leeren

filteredBooks.forEach((book) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>Favoriten-Button</td>
    <td>${book.title}</td>
    <td>${book.isbn}</td>
    <td>${book.author}</td>
    <td>${book.publisher}</td>
    <td>Detail-Button</td>
  `;
  tbody.appendChild(tr);
});
```

##### Favoriten-Button

```html
<td>
  <button class="button button-clear fav-btn">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="fav"
    >
      <path
        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
      />
    </svg>
  </button>
</td>
```

**Button-Klassen:**

```html
<button class="button button-clear fav-btn"></button>
```

**Milligram-Klassen:**

```css
/* .button: */
.button {
  background-color: #9b4dca;
  color: white;
  border: none;
  padding: 0 30px;
  height: 38px;
  /* ... */
}

/* .button-clear: */
.button.button-clear {
  background-color: transparent;
  color: #9b4dca;
  border: none;
}
/* Überschreibt .button → Transparenter Button */
```

**Eigene Klasse:**

```css
/* .fav-btn: */
/* Eigene Styles für Favoriten-Button (in style.css) */
```

**SVG-Icon:**

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  class="fav"
>
  <path d="..." />
</svg>
```

**Was ist SVG?**

```html
<!-- SVG = Scalable Vector Graphics -->
<!-- Vektorformat: Kann ohne Qualitätsverlust skaliert werden -->

<!-- Vorteile:
     ✅ Scharfe Darstellung auf allen Bildschirmen
     ✅ Klein (nur Pfad-Daten)
     ✅ Mit CSS stylebar (fill, stroke, size)
     ✅ Keine separate Bilddatei nötig -->

<!-- Alternative: Bild-Datei -->
<img src="heart.png" alt="Favorite" />
<!-- ❌ Pixelig bei Vergrößerung
     ❌ Separate Datei nötig
     ❌ Schwerer zu stylen -->
```

**SVG-Attribute:**

```html
<svg xmlns="http://www.w3.org/2000/svg" <!-- XML-Namespace (immer gleich) -->
  viewBox="0 0 24 24"
  <!-- Koordinatensystem: 24x24 -->
  fill="currentColor"
  <!-- Füllfarbe = aktuelle Textfarbe -->
  class="fav"
  <!-- CSS-Klasse -->
  >
</svg>
```

**viewBox erklärt:**

```html
<svg viewBox="0 0 24 24">
  <!-- viewBox="minX minY width height"
     0 0 24 24 = Koordinaten von (0,0) bis (24,24)
     Icon wird in diesem 24x24-Raster gezeichnet -->

  <!-- SVG kann beliebig groß dargestellt werden: -->
  <svg viewBox="0 0 24 24" width="16" height="16">
    <!-- Klein -->
    <svg viewBox="0 0 24 24" width="64" height="64">
      <!-- Groß -->
      <!-- Koordinaten bleiben 0-24, aber Anzeigegröße variiert -->
    </svg>
  </svg>
</svg>
```

**fill="currentColor":**

```css
/* CSS: */
button {
  color: purple;
}

/* SVG: */
<svg fill="currentColor">
  <!-- fill übernimmt color vom Button → purple -->
</svg>

/* Vorteil:
   Icon passt sich automatisch an Textfarbe an */
```

**path-Element:**

```html
<path d="M11.645 20.91l-.007-.003-.022-.012a15.247..." />
```

**Was ist der path?**

```html
<!-- path = Zeichenpfad (Vektorpfad) -->
<!-- d-Attribut enthält Zeichenanweisungen: -->

<!-- Kommandos:
     M = Move to (Stift bewegen ohne zeichnen)
     L = Line to (Linie zeichnen)
     C = Curve (Kurve)
     Z = Close path (Pfad schließen)

     Beispiel vereinfacht:
     M 10,10  → Stift zu Position (10,10)
     L 20,20  → Linie von (10,10) zu (20,20)
     -->

<!-- Der lange d-String zeichnet ein Herz -->
```

**Zwei SVG-Varianten im HTML:**

```html
<!-- Variante 1: Gefülltes Herz (Favorit) -->
<svg fill="currentColor">
  <path d="M11.645 20.91l..." />
</svg>

<!-- Variante 2: Leeres Herz (kein Favorit) -->
<svg fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M21 8.25c0-2.485..." />
</svg>
```

**Unterschied:**

```html
<!-- Gefüllt: -->
fill="currentColor"
<!-- → Herz ist ausgefüllt ❤️ -->

<!-- Leer: -->
fill="none" stroke="currentColor"
<!-- → Nur Umriss gezeichnet 🤍 -->
```

##### Detail-Button

```html
<td>
  <button class="button" onclick="location.href='detail.html'">Detail</button>
</td>
```

**onclick-Attribut:**

```html
onclick="location.href='detail.html'"
```

**Was macht das?**

```javascript
// onclick = Event-Handler (wird bei Klick ausgeführt)
// location.href = Navigiert zu neuer Seite

// Äquivalent zu:
<button class="button" onclick="window.location.href='detail.html'">
```

**Unterschied zu JavaScript Event-Listener:**

```html
<!-- Mit onclick (inline): -->
<button onclick="location.href='detail.html'">Detail</button>

<!-- Mit Event-Listener (in JavaScript): -->
<button class="detail-btn">Detail</button>
<script>
  button.addEventListener("click", () => {
    location.href = "detail.html";
  });
</script>

<!-- Inline ist kürzer, aber:
     ❌ HTML und JavaScript vermischt
     ❌ Schwerer zu testen
     ❌ CSP (Content Security Policy) kann es blockieren -->
```

**Wird von JavaScript überschrieben:**

```typescript
// In index.ts:
tr.innerHTML = `
  <td>
    <button class="button" onclick="location.href='detail.html?isbn=${book.isbn}'">
      Detail
    </button>
  </td>
`;

// Fügt ISBN als Parameter hinzu: detail.html?isbn=9783864907791
```

---

#### 7. Script-Tag

```html
<script type="module" src="../dist/index.js"></script>
```

**Position: Am Ende von `<body>`**

```html
<body>
  <header>...</header>
  <main>...</main>
  <script src="..."></script>
  <!-- Ganz am Ende -->
</body>
```

**Warum am Ende?**

```html
<!-- Script am Anfang: -->
<head>
  <script src="app.js"></script>
</head>
<body>
  <div id="content">...</div>
</body>

<!-- Problem:
     JavaScript läuft, BEVOR HTML geladen ist
     document.getElementById('content') = null ❌ -->

<!-- Script am Ende: -->
<body>
  <div id="content">...</div>
  <script src="app.js"></script>
  <!-- HTML ist bereits geladen -->
</body>

<!-- ✅ HTML ist vollständig geladen
     ✅ JavaScript kann auf Elemente zugreifen -->

<!-- Alternative: defer-Attribut -->
<head>
  <script src="app.js" defer></script>
</head>
<!-- defer wartet bis HTML geladen ist -->
```

**type="module":**

```html
<script type="module" src="../dist/index.js"></script>
```

**Was ist type="module"?**

```javascript
// Ermöglicht ES6-Module:

// In index.ts:
import type { Book } from "./types.js";

// Ohne type="module":
// ❌ FEHLER: import statements not supported

// Mit type="module":
// ✅ import/export funktioniert
```

**Unterschied zu normalem Script:**

```html
<!-- Normale Scripts: -->
<script src="app.js"></script>
<!-- - Keine import/export
     - Läuft sofort
     - Globaler Scope -->

<!-- Module Scripts: -->
<script type="module" src="app.js"></script>
<!-- - import/export möglich
     - defer-Verhalten automatisch
     - Eigener Scope (keine globalen Variablen) -->
```

**Module-Features:**

```javascript
// 1. Eigener Scope:
<script type="module">
  const x = 10;
  // x ist NICHT global verfügbar
</script>

// 2. Automatisches defer:
<script type="module" src="app.js">
// Wartet automatisch bis HTML geladen ist

// 3. Strict Mode:
// 'use strict' ist automatisch aktiv

// 4. import/export:
import { func } from './other.js';
export const data = [...];
```

**Pfad: ../dist/index.js**

```
Verzeichnis-Struktur:
src/
  index.html           ← Wir sind hier
  index.ts
  dist/
    index.js           ← Kompiliertes JavaScript
```

**Pfad-Erklärung:**

```html
<script src="../dist/index.js"></script>

<!-- ../: Gehe ein Verzeichnis hoch (von src/ nach root)
     dist/: Gehe in dist/-Verzeichnis
     index.js: Datei -->

<!-- Absoluter Pfad wäre:
     /src/dist/index.js
     Aber relativer Pfad ist flexibler -->
```

**Warum dist/ und nicht direkt index.ts?**

```
Build-Prozess:
index.ts (TypeScript)
   ↓ tsc (TypeScript Compiler)
index.js (JavaScript)
   ↓ gespeichert in
dist/index.js

Browser kann nur JavaScript ausführen, kein TypeScript!
```

---

#### Zusammenfassung

Die `index.html` Datei ist die **Einstiegsseite** der Anwendung:

**HTML-Struktur:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta-Tags, CSS, Title -->
  </head>
  <body>
    <header>
      <!-- Logo + Navigation -->
    </header>
    <main>
      <!-- Suche + Filter -->
      <!-- Büchertabelle -->
    </main>
    <script type="module" src="../dist/index.js"></script>
  </body>
</html>
```

**Wichtige HTML-Konzepte:**

✅ **Semantisches HTML** - `<header>`, `<main>`, `<nav>`, `<section>`
✅ **Meta-Tags** - charset, viewport, http-equiv
✅ **CSS-Framework** - Milligram für Basis-Styling
✅ **Grid-System** - container, row, column
✅ **Formulare** - label + input, select + option
✅ **Tabellen** - thead, tbody, tr, th, td
✅ **SVG-Icons** - Skalierbare Vektorgrafiken
✅ **ES6-Module** - type="module" für import/export

**JavaScript-Integration:**

- HTML enthält Platzhalter-Daten (2 Buch-Zeilen)
- `index.ts` ersetzt diese beim Laden:
  - Lädt Bücher von API
  - Befüllt Dropdown mit Verlagen
  - Rendert Tabelle dynamisch
  - Fügt Event-Listener hinzu

**CSS-Stack:**

1. **Normalize.css** - Browser-Inkonsistenzen beseitigen
2. **Milligram** - Minimales Framework für Basis-Styling
3. **style.css** - Eigene Anpassungen

**Responsive Design:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- Passt sich an Bildschirmgröße an
- Milligram-Grid ist responsive
- Auf Mobilgeräten stapeln sich Spalten

**Best Practices:**

✅ **Semantisches HTML** - Bessere Barrierefreiheit und SEO
✅ **Labels für Inputs** - for-Attribut verbindet Label mit Input
✅ **Alt-Text für Bilder** - (nicht in SVGs, aber wichtig für `<img>`)
✅ **Script am Ende** - Oder mit defer-Attribut
✅ **type="module"** - Moderne JavaScript-Module

Diese HTML-Datei ist das **statische Grundgerüst**, das von `index.ts` **dynamisch mit Leben gefüllt** wird!

---

### favorite.html

Die Datei `favorite.html` ist die **Favoriten-Seite** der Anwendung und zeigt nur die vom Benutzer **als Favoriten markierten Bücher** an. Diese Seite ist **fast identisch** zu `index.html`, hat aber einige wichtige Unterschiede.

#### Vollständiger Überblick

Die HTML-Datei ist in folgende Abschnitte gegliedert:

1. **Head-Bereich** - Unterschied im Titel
2. **Header** - Aktive Navigation ist anders
3. **Main-Bereich** - Andere Überschrift
4. **Favoriten-Button** - X-Icon statt Herz
5. **Script-Tag** - Lädt favorite.js statt index.js

---

#### Vergleich: favorite.html vs index.html

Die beiden Dateien sind **strukturell identisch**, unterscheiden sich aber in **Details**:

| Element               | index.html                        | favorite.html                 |
| --------------------- | --------------------------------- | ----------------------------- |
| **Title**             | "IT Book Library"                 | "Favorites - IT Book Library" |
| **Aktive Navigation** | "Books"                           | "Favorites"                   |
| **Überschrift**       | "2 Books displayed"               | "2 Favorites on your list"    |
| **Icon**              | Herz (gefüllt/leer)               | X im Kreis (gefüllt)          |
| **Icon-Bedeutung**    | Zu Favoriten hinzufügen/entfernen | Von Favoriten entfernen       |
| **Script**            | "../dist/index.js"                | "../dist/favorite.js"         |
| **Such-Label**        | "Search by Title"                 | "Search"                      |

---

#### 1. Head-Bereich - Unterschied im Titel

```html
<title>Favorites - IT Book Library</title>
```

**Vergleich:**

```html
<!-- index.html: -->
<title>IT Book Library</title>

<!-- favorite.html: -->
<title>Favorites - IT Book Library</title>
```

**Warum ist der Titel wichtig?**

```html
<!-- Browser-Tab: -->
<!-- index.html zeigt: "IT Book Library" -->
<!-- favorite.html zeigt: "Favorites - IT Book Library" -->

<!-- Vorteile:
     ✅ Benutzer sieht sofort, auf welcher Seite er ist
     ✅ Bei mehreren Tabs leicht unterscheidbar
     ✅ Browser-History zeigt klare Namen
     ✅ SEO: Suchmaschinen verstehen den Kontext -->
```

**Best Practice für Titel:**

```html
<!-- Pattern: [Seitenname] - [App-Name] -->

<title>Books - IT Book Library</title>
<title>Favorites - IT Book Library</title>
<title>Detail - IT Book Library</title>

<!-- Alternative Pattern: [App-Name] | [Seitenname] -->
<title>IT Book Library | Books</title>
<title>IT Book Library | Favorites</title>

<!-- Beide sind OK, wichtig ist Konsistenz -->
```

---

#### 2. Header - Aktive Navigation

```html
<nav class="mainnav">
  <a href="index.html" class="mainnav-link">Books</a>
  <a href="favorite.html" class="mainnav-link mainnav-link--active"
    >Favorites <span class="mainnav-number">2</span></a
  >
</nav>
```

**Vergleich:**

```html
<!-- index.html: -->
<nav class="mainnav">
  <a href="index.html" class="mainnav-link mainnav-link--active">Books</a>
  <!--                                     ^^^^^^^^^^^^^^^^ Aktiv -->
  <a href="favorite.html" class="mainnav-link">
    Favorites <span class="mainnav-number">2</span>
  </a>
</nav>

<!-- favorite.html: -->
<nav class="mainnav">
  <a href="index.html" class="mainnav-link">Books</a>
  <a href="favorite.html" class="mainnav-link mainnav-link--active">
    <!--                                        ^^^^^^^^^^^^^^^^ Aktiv -->
    Favorites <span class="mainnav-number">2</span>
  </a>
</nav>
```

**Was macht `mainnav-link--active`?**

```css
/* Typisches CSS für aktive Navigation: */
.mainnav-link {
  color: #606c76; /* Grau */
}

.mainnav-link--active {
  color: #9b4dca; /* Lila */
  font-weight: bold;
}

/* Visuell:
   Books          Favorites
   ^^^^^          ^^^^^^^^
   (normal)       (fett, lila) */
```

**Warum ist das wichtig?**

```html
<!-- User Experience:
     Benutzer sieht sofort, auf welcher Seite er ist
     "Ich bin auf der Favorites-Seite" -->

<!-- Barrierefreiheit:
     Screenreader können "aktuelle Seite" ansagen
     aria-current="page" wäre noch besser: -->

<a href="favorite.html" class="mainnav-link--active" aria-current="page">
  Favorites
</a>
```

---

#### 3. Main-Bereich - Überschrift

```html
<h2>2 Favorites on your list</h2>
```

**Vergleich:**

```html
<!-- index.html: -->
<h2>2 Books displayed</h2>

<!-- favorite.html: -->
<h2>2 Favorites on your list</h2>
```

**Wird von JavaScript aktualisiert:**

```typescript
// In index.ts:
countElement.textContent = `${filteredBooks.length} Books displayed`;

// In favorite.ts:
countElement.textContent = `${filteredBooks.length} Favorites on your list`;
```

**Warum unterschiedliche Texte?**

```typescript
// index.html:
// → Zeigt ALLE Bücher an
// → "Books displayed" ist allgemein

// favorite.html:
// → Zeigt nur FAVORITEN an
// → "Favorites on your list" ist persönlicher
// → "your list" betont, dass es die persönliche Auswahl ist
```

**Grammatik-Verbesserung möglich:**

```typescript
// Aktuell (grammatisch nicht perfekt):
"1 Books displayed"; // Sollte "Book" sein
"1 Favorites on your list"; // Sollte "Favorite" sein

// Bessere Implementierung:
const bookText = filteredBooks.length === 1 ? "Book" : "Books";
countElement.textContent = `${filteredBooks.length} ${bookText} displayed`;

// Oder für Favoriten:
const favText = filteredBooks.length === 1 ? "Favorite" : "Favorites";
countElement.textContent = `${filteredBooks.length} ${favText} on your list`;
```

---

#### 4. Such-Label

```html
<label for="search">Search</label>
```

**Vergleich:**

```html
<!-- index.html: -->
<label for="search">Search by Title</label>

<!-- favorite.html: -->
<label for="search">Search</label>
```

**Warum kürzer?**

```html
<!-- Beide Labels machen das Gleiche:
     Suche im Buchtitel

     index.html:
     → "Search by Title" ist beschreibender
     → Gut für neue Benutzer

     favorite.html:
     → "Search" ist kürzer
     → Kontext ist klar (nur Favoriten)
     → Platzsparend -->

<!-- Inkonsistenz:
     Eigentlich sollten beide gleich sein
     Für Konsistenz: Beide "Search by Title" oder beide "Search" -->
```

---

#### 5. Favoriten-Button - X-Icon

```html
<td>
  <button class="button button-clear fav-btn">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="fav"
    >
      <path
        fill-rule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</td>
```

**Das ist der HAUPTUNTERSCHIED zu index.html!**

##### Vergleich: Herz vs X-Icon

**index.html - Herz-Icon:**

```html
<!-- Zwei Varianten: -->

<!-- 1. Gefülltes Herz (ist Favorit) -->
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M11.645 20.91l..." />
  <!-- Herz-Form -->
</svg>

<!-- 2. Leeres Herz (kein Favorit) -->
<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
  <path d="M21 8.25c0-2.485..." />
  <!-- Herz-Umriss -->
</svg>

<!-- Bedeutung:
     → Klick: Zu Favoriten hinzufügen ODER entfernen (Toggle) -->
```

**favorite.html - X-Icon:**

```html
<!-- Nur eine Variante: -->

<svg viewBox="0 0 24 24" fill="currentColor">
  <path
    fill-rule="evenodd"
    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
  />
</svg>

<!-- Bedeutung:
     → Klick: Von Favoriten entfernen (nur Entfernen, kein Toggle) -->
```

##### SVG-Analyse: X im Kreis

**fill-rule und clip-rule:**

```html
<path fill-rule="evenodd" clip-rule="evenodd" d="..." />
```

**Was sind fill-rule und clip-rule?**

```html
<!-- fill-rule="evenodd":
     Regel zum Füllen von Pfaden
     "evenodd" = Even-Odd-Rule (Gerade-Ungerade-Regel)

     Beispiel:
     Kreis mit Loch in der Mitte:
     Außenring wird gefüllt, Innenring nicht

     Alternative: fill-rule="nonzero" -->

<!-- clip-rule="evenodd":
     Gleich wie fill-rule, aber für Clipping
     (Nicht relevant in diesem einfachen Fall) -->
```

**Path-Daten analysiert:**

```html
d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365
9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72
1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06
12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"

<!-- Zwei Teile: -->

<!-- 1. Kreis zeichnen: -->
<!-- M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z -->
<!-- → Zeichnet einen gefüllten Kreis um (12, 12) -->

<!-- 2. X zeichnen: -->
<!-- m-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z -->
<!-- → Zeichnet zwei sich kreuzende Linien (X) im Kreis -->
```

**Visueller Vergleich:**

```
index.html:
┌─────────────┐
│  ❤️  ❤️     │  Herz gefüllt = Favorit
│  🤍  🤍     │  Herz leer = Kein Favorit
└─────────────┘

favorite.html:
┌─────────────┐
│  ⊗  ⊗      │  X im Kreis = Entfernen
│  ⊗  ⊗      │  Immer gleich (alle sind Favoriten)
└─────────────┘
```

##### Warum unterschiedliche Icons?

**index.html:**

```html
<!-- Kontext: Zeigt ALLE Bücher -->
<!-- Funktion: Favoriten hinzufügen/entfernen (Toggle) -->
<!-- Icon: Herz -->
<!-- Bedeutung:
     Gefülltes Herz ❤️  = "Das ist ein Favorit"
     Leeres Herz 🤍   = "Das ist kein Favorit"
     Intuitiv: Herz = Liebe = Favorit -->
```

**favorite.html:**

```html
<!-- Kontext: Zeigt NUR Favoriten -->
<!-- Funktion: Favoriten entfernen (nur Entfernen) -->
<!-- Icon: X im Kreis -->
<!-- Bedeutung:
     X ⊗ = "Entfernen", "Löschen", "Schließen"
     Kreis = Button-Rahmen
     Intuitiv: X = Schließen/Entfernen -->
```

**UX-Überlegung:**

```
Warum nicht Herz auch auf favorite.html?

Option 1: Herz auf beiden Seiten
→ index.html: Herz leer/gefüllt
→ favorite.html: Herz gefüllt (immer)
❌ Verwirrend: Warum ist das Herz immer gefüllt?
❌ Unklar: Was passiert beim Klick?

Option 2: X auf favorite.html (verwendet)
→ index.html: Herz leer/gefüllt
→ favorite.html: X im Kreis
✅ Klar: X bedeutet "entfernen"
✅ Visuell unterschiedlich = unterschiedliche Funktion
```

---

#### 6. Script-Tag

```html
<script type="module" src="../dist/favorite.js"></script>
```

**Vergleich:**

```html
<!-- index.html: -->
<script type="module" src="../dist/index.js"></script>

<!-- favorite.html: -->
<script type="module" src="../dist/favorite.js"></script>
```

**Warum separate JavaScript-Dateien?**

```typescript
// index.js:
// - Lädt ALLE Bücher von API
// - Funktion: toggleFavorite() (hinzufügen/entfernen)
// - Icon: Herz (gefüllt/leer)

// favorite.js:
// - Lädt nur FAVORITEN von API
// - Funktion: removeFavorite() (nur entfernen)
// - Icon: X im Kreis (immer gleich)
```

**Alternative Ansätze:**

```html
<!-- Alternative 1: Eine JavaScript-Datei für beide Seiten -->
<script type="module" src="../dist/app.js"></script>

<!-- JavaScript erkennt Seite: -->
<script>
  if (window.location.pathname.includes("favorite.html")) {
    // Favoriten-Logik
  } else {
    // Index-Logik
  }
</script>

<!-- ❌ Komplexer Code
     ❌ Lädt unnötigen Code
     ❌ Schwerer zu warten -->

<!-- Alternative 2: Separate Dateien (verwendet) -->
<!-- index.html → index.js -->
<!-- favorite.html → favorite.js -->

<!-- ✅ Klare Trennung
     ✅ Nur benötigter Code geladen
     ✅ Einfacher zu verstehen -->
```

**Build-Prozess:**

```
TypeScript-Dateien:
- src/index.ts    → dist/index.js
- src/favorite.ts → dist/favorite.js
- src/detail.ts   → dist/detail.js

Jede HTML-Datei lädt ihr eigenes JavaScript
```

---

#### 7. Statische Tabellendaten

**Beide Dateien haben Platzhalter-Daten:**

```html
<tbody>
  <tr>
    <td>...</td>
    <td>Java Web Scraping Handbook</td>
    <td>1001606140805</td>
    <td>Kevin Sahin</td>
    <td>Leanpub</td>
    <td>...</td>
  </tr>
  <!-- Zweite Zeile identisch -->
</tbody>
```

**Warum Platzhalter-Daten?**

```html
<!-- Während Entwicklung:
     → HTML kann ohne JavaScript angeschaut werden
     → Designer sieht Layout/Styling
     → Hilft beim CSS-Schreiben -->

<!-- Zur Laufzeit:
     → JavaScript ersetzt komplett (tbody.innerHTML = "")
     → Lädt echte Daten von API
     → Platzhalter werden nie angezeigt -->
```

**Progressive Enhancement:**

```html
<!-- Konzept: Progressive Enhancement
     1. HTML funktioniert ohne JavaScript (Basis)
     2. CSS macht es schön
     3. JavaScript fügt Interaktivität hinzu

     In dieser App:
     Ohne JavaScript: Platzhalter-Daten sichtbar
     Mit JavaScript: Echte Daten von API

     Nicht optimal (benötigt API), aber OK für diese App -->
```

---

#### Zusammenfassung

Die `favorite.html` Datei ist **fast identisch** zu `index.html`, mit wichtigen **Unterschieden für die Favoriten-Seite**:

**Hauptunterschiede:**

| Aspekt                | index.html                    | favorite.html                                  |
| --------------------- | ----------------------------- | ---------------------------------------------- |
| **Zweck**             | Alle Bücher anzeigen          | Nur Favoriten anzeigen                         |
| **Titel**             | "IT Book Library"             | "Favorites - IT Book Library"                  |
| **Aktive Navigation** | "Books"                       | "Favorites"                                    |
| **Überschrift**       | "X Books displayed"           | "X Favorites on your list"                     |
| **Button-Icon**       | Herz (gefüllt/leer)           | X im Kreis (gefüllt)                           |
| **Button-Funktion**   | Toggle (hinzufügen/entfernen) | Entfernen                                      |
| **JavaScript**        | index.js → fetchBooks()       | favorite.js → loadFavorites()                  |
| **Datenquelle**       | Alle Bücher von API           | Gefilterte Bücher (nur ISBNs aus localStorage) |

**Code-Duplikation:**

```html
<!-- favorite.html ist 95% identisch zu index.html -->

<!-- Vorteile:
     ✅ Jede Seite ist eigenständig
     ✅ Einfach zu verstehen
     ✅ Keine komplexe Logik nötig -->

<!-- Nachteile:
     ❌ Code-Duplikation (Header, CSS-Links, etc.)
     ❌ Änderungen müssen in beiden Dateien gemacht werden
     ❌ Fehleranfällig bei Updates -->

<!-- Alternative für größere Projekte:
     - Template-Engine (Handlebars, EJS, Pug)
     - Component-Framework (React, Vue, Angular)
     - Server-Side-Rendering (SSR)
     - Partials/Includes -->
```

**Workflow zwischen den Seiten:**

```
1. Benutzer öffnet index.html
   ↓
2. Sieht ALLE Bücher
   ↓
3. Klickt Herz bei einem Buch
   ↓
4. Buch wird zu localStorage hinzugefügt
   ↓
5. Favoriten-Zahl im Header aktualisiert sich (z.B. "3")
   ↓
6. Benutzer klickt "Favorites" in Navigation
   ↓
7. Browser lädt favorite.html
   ↓
8. favorite.js läuft:
   - Liest ISBNs aus localStorage
   - Lädt nur diese Bücher von API
   - Zeigt nur Favoriten in Tabelle
   ↓
9. Benutzer klickt X bei einem Favoriten
   ↓
10. Buch wird aus localStorage entfernt
   ↓
11. favorite.js lädt Seite neu
   ↓
12. Favorit ist verschwunden
```

**Best Practices umgesetzt:**

✅ **Konsistente Struktur** - Gleicher Aufbau wie index.html
✅ **Klare Navigation** - Aktive Seite ist markiert
✅ **Aussagekräftiger Titel** - "Favorites" im Browser-Tab
✅ **Intuitive Icons** - X bedeutet universell "entfernen"
✅ **Semantisches HTML** - Gleiche semantische Tags
✅ **Responsive Design** - Milligram-Grid funktioniert gleich

**Verbesserungsmöglichkeiten:**

💡 **Template-System** - Basis-HTML nur einmal definieren
💡 **Konsistente Labels** - "Search by Title" vs "Search"
💡 **aria-current** - Bessere Barrierefreiheit für aktive Navigation
💡 **Empty State** - Spezielle Meldung wenn keine Favoriten
💡 **Grammatik** - "1 Favorite" statt "1 Favorites"

Diese HTML-Datei ist das **statische Grundgerüst** für die Favoriten-Seite, das von `favorite.ts` **dynamisch mit Favoriten-Daten gefüllt** wird!

---

### detail.html

Die Datei `detail.html` ist die **Detail-Seite** der Anwendung und zeigt die **vollständigen Informationen eines einzelnen Buches** an. Diese Seite hat eine **völlig andere Struktur** als `index.html` und `favorite.html`.

#### Vollständiger Überblick

Die HTML-Datei ist in folgende Abschnitte gegliedert:

1. **Head-Bereich** - Titel mit "Book Detail"
2. **Header** - Identisch zu anderen Seiten
3. **Main-Bereich** - Komplett anderes Layout
4. **Zwei-Spalten-Layout** - 67% Text, 33% Bild
5. **Buchdetails** - Titel, Abstract, Details, Bild
6. **Zurück-Button** - Statt weiterer Tabelle
7. **Script-Tag** - Lädt detail.js

---

#### Vergleich: detail.html vs index.html / favorite.html

Die drei HTML-Dateien haben unterschiedliche Zwecke und Layouts:

| Element         | index.html / favorite.html      | detail.html                       |
| --------------- | ------------------------------- | --------------------------------- |
| **Zweck**       | Liste von Büchern               | Ein einzelnes Buch                |
| **Layout**      | Tabelle mit Zeilen              | Zwei-Spalten-Layout               |
| **Titel**       | "IT Book Library" / "Favorites" | "Book Detail - IT Book Library"   |
| **Navigation**  | "Books" / "Favorites" aktiv     | "Books" aktiv (keine eigene Nav)  |
| **Hauptinhalt** | Suchfeld + Tabelle              | Titel + Abstract + Details + Bild |
| **Interaktion** | Suchen, Filtern, Favoriten      | Nur Anzeigen, Zurück-Button       |
| **Script**      | index.js / favorite.js          | detail.js                         |

---

#### 1. Head-Bereich - Titel

```html
<title>Book Detail - IT Book Library</title>
```

**Vergleich:**

```html
<!-- index.html: -->
<title>IT Book Library</title>

<!-- favorite.html: -->
<title>Favorites - IT Book Library</title>

<!-- detail.html: -->
<title>Book Detail - IT Book Library</title>
```

**Wird von JavaScript aktualisiert?**

```typescript
// In index.ts / favorite.ts:
// → Titel bleibt statisch

// In detail.ts:
// → Könnte dynamisch aktualisiert werden:
document.title = `${book.title} - IT Book Library`;
// → Zeigt Buchtitel im Browser-Tab

// Aber: Nicht in diesem Projekt implementiert
// → Titel bleibt "Book Detail - IT Book Library"
```

**Best Practice:**

```typescript
// Dynamischer Titel ist besser für UX:

// Statisch:
document.title = "Book Detail - IT Book Library";
// Tab zeigt: "Book Detail - IT..."

// Dynamisch:
document.title = `${book.title} - IT Book Library`;
// Tab zeigt: "Angular - IT Book Library"
// ✅ Benutzer sieht, welches Buch er ansieht
```

---

#### 2. Header - Navigation ohne aktive Detail-Seite

```html
<nav class="mainnav">
  <a href="index.html" class="mainnav-link mainnav-link--active">Books</a>
  <a href="favorite.html" class="mainnav-link">
    Favorites <span class="mainnav-number">2</span>
  </a>
</nav>
```

**Warum ist "Books" aktiv?**

```html
<!-- Navigation hat nur 2 Links:
     - Books
     - Favorites

     Detail-Seite ist KEINE separate Navigation
     → "Books" bleibt aktiv
     → User kommt von Books-Seite
     → Zurück-Button führt zu Books -->

<!-- Alternative (nicht implementiert):
     Keine aktive Navigation auf Detail-Seite -->
<nav class="mainnav">
  <a href="index.html" class="mainnav-link">Books</a>
  <a href="favorite.html" class="mainnav-link">Favorites...</a>
</nav>
```

**Navigation-Pattern:**

```
Benutzer-Flow:
1. index.html → Klickt "Detail"-Button
2. detail.html?isbn=123 → Sieht Buchdetails
3. Klickt "Back" oder "Books" in Nav
4. Zurück zu index.html
```

---

#### 3. Main-Bereich - Komplett anders

```html
<main class="container">
  <h1>
    Java Web Scraping Handbook<br />
    <small>Learn advanced Web Scraping techniques</small>
  </h1>
  <section class="row">
    <div class="column column-67">...</div>
    <div class="column column-33">...</div>
  </section>
</main>
```

**Strukturvergleich:**

```html
<!-- index.html / favorite.html: -->
<main class="container">
  <h2>X Books displayed</h2>
  <section class="row filter-search">
    <form>Suchfeld</form>
    <form>Dropdown</form>
  </section>
  <section class="row">
    <table>
      Büchertabelle
    </table>
  </section>
</main>

<!-- detail.html: -->
<main class="container">
  <h1>Buchtitel<br /><small>Untertitel</small></h1>
  <section class="row">
    <div class="column-67">Abstract + Details</div>
    <div class="column-33">Buchcover</div>
  </section>
</main>
```

**Hauptunterschiede:**

| Aspekt            | Liste-Seiten      | Detail-Seite         |
| ----------------- | ----------------- | -------------------- |
| **Überschrift**   | `<h2>` mit Anzahl | `<h1>` mit Buchtitel |
| **Suchformulare** | Ja (2 Formulare)  | Nein                 |
| **Tabelle**       | Ja (alle Bücher)  | Nein                 |
| **Zwei-Spalten**  | Nein              | Ja (Text + Bild)     |
| **Zurück-Button** | Nein              | Ja                   |

---

#### 4. Hauptüberschrift mit Untertitel

```html
<h1>
  Java Web Scraping Handbook<br />
  <small>Learn advanced Web Scraping techniques</small>
</h1>
```

##### h1-Element

**Warum `<h1>` statt `<h2>`?**

```html
<!-- index.html / favorite.html: -->
<h2>2 Books displayed</h2>
<!-- → Unterüberschrift (keine <h1> vorhanden) -->

<!-- detail.html: -->
<h1>Java Web Scraping Handbook</h1>
<!-- → Hauptüberschrift (wichtigster Text der Seite) -->

<!-- HTML-Hierarchie:
     <h1> = Wichtigste Überschrift (nur einmal pro Seite)
     <h2> = Unterüberschrift
     <h3> = Unter-Unterüberschrift
     usw. -->
```

**SEO und Barrierefreiheit:**

```html
<!-- Suchmaschinen (Google):
     <h1> ist der wichtigste Text
     → Sollte das Hauptthema der Seite enthalten
     → Auf Detail-Seite: Buchtitel -->

<!-- Screenreader:
     Können zur <h1> springen
     → Blinde Benutzer hören zuerst den Buchtitel -->
```

##### br-Element

```html
<br />
```

**Was macht `<br />`?**

```html
<!-- br = line break (Zeilenumbruch) -->

<h1>
  Java Web Scraping Handbook<br />
  <small>Learn advanced Web Scraping techniques</small>
</h1>

<!-- Visuelle Darstellung:
Java Web Scraping Handbook
Learn advanced Web Scraping techniques
                                        (kleiner) -->

<!-- Ohne <br />: -->
<h1>
  Java Web Scraping Handbook
  <small>Learn advanced Web Scraping techniques</small>
</h1>
<!-- Darstellung:
Java Web Scraping Handbook Learn advanced Web Scraping techniques
                           (alles in einer Zeile) -->
```

**Selbstschließendes Tag:**

```html
<!-- HTML5: Beide sind korrekt -->
<br />
<!-- XHTML-Style (selbstschließend) -->
<br />
<!-- HTML5-Style -->

<!-- Projekt nutzt: <br /> (konsistent mit XHTML/XML) -->
```

##### small-Element

```html
<small>Learn advanced Web Scraping techniques</small>
```

**Was macht `<small>`?**

```html
<!-- small = Kleinerer Text (semantisch: Nebensächlich) -->

<h1>
  Haupttitel
  <small>Untertitel</small>
</h1>

/* CSS (automatisch vom Browser): */ small { font-size: 80%; /* Kleiner als
normaler Text */ }
```

**Semantische Bedeutung:**

```html
<!-- <small> bedeutet:
     "Dieser Text ist weniger wichtig als der Haupttext"

     Perfekt für:
     - Untertitel
     - Copyright-Hinweise
     - Disclaimer
     - Fußnoten -->

<!-- Alternative ohne Semantik: -->
<h1>
  Haupttitel
  <span style="font-size: 80%;">Untertitel</span>
</h1>
<!-- Funktioniert gleich, aber weniger semantisch -->
```

**Wird von JavaScript befüllt:**

```typescript
// In detail.ts:
titleElement.innerHTML = `${book.title}<br /><small>${
  book.subtitle || ""
}</small>`;

// Beispiel:
// book.title = "Angular"
// book.subtitle = "Grundlagen, fortgeschrittene Themen und Best Practices"

// HTML-Ergebnis:
// <h1>
//   Angular<br />
//   <small>Grundlagen, fortgeschrittene Themen und Best Practices</small>
// </h1>
```

---

#### 5. Zwei-Spalten-Layout

```html
<section class="row">
  <div class="column column-67">
    <!-- 67% Breite: Text -->
  </div>
  <div class="column column-33">
    <!-- 33% Breite: Bild -->
  </div>
</section>
```

##### Milligram-Grid-System

**column-67 und column-33:**

```css
/* Milligram CSS: */
.column-67 {
  flex: 0 0 66.6666%;
}

.column-33 {
  flex: 0 0 33.3333%;
}
```

**Visuelle Darstellung:**

```
Desktop (breiter Bildschirm):
┌────────────────────────────────────┬──────────────────┐
│                                    │                  │
│  Abstract                          │    Buchcover     │
│  Lorem ipsum dolor sit amet...     │                  │
│                                    │    [IMG]         │
│  Details                           │                  │
│  - Author: ...                     │                  │
│  - Publisher: ...                  │                  │
│                                    │                  │
│  [Back Button]                     │                  │
│                                    │                  │
│         (67% Breite)               │   (33% Breite)   │
└────────────────────────────────────┴──────────────────┘
```

**Responsive Verhalten:**

```
Tablet/Mobile (schmaler Bildschirm):
┌────────────────────────────────────┐
│  Abstract                          │
│  Lorem ipsum dolor sit amet...     │
│                                    │
│  Details                           │
│  - Author: ...                     │
│                                    │
│  [Back Button]                     │
│         (100% Breite)              │
├────────────────────────────────────┤
│                                    │
│         [IMG]                      │
│                                    │
│         (100% Breite)              │
└────────────────────────────────────┘

Milligram stapelt Spalten automatisch auf kleinen Bildschirmen
```

**Warum 67/33 statt 50/50?**

```html
<!-- 50/50 (gleich groß): -->
<div class="column">Text</div>
<div class="column">Bild</div>

<!-- 67/33 (Text größer): -->
<div class="column column-67">Text</div>
<div class="column column-33">Bild</div>

<!-- Warum?
     ✅ Text ist wichtiger als Bild
     ✅ Abstract und Details brauchen mehr Platz
     ✅ Bild ist eher illustrativ
     ✅ Bessere Lesbarkeit für lange Texte -->
```

**Andere Milligram-Spalten:**

```html
<!-- Verfügbare Breiten: -->
<div class="column">
  <!-- Flex: Auto (gleichmäßig) -->
  <div class="column-10">
    <!-- 10% -->
    <div class="column-20">
      <!-- 20% -->
      <div class="column-25">
        <!-- 25% -->
        <div class="column-33">
          <!-- 33.33% -->
          <div class="column-40">
            <!-- 40% -->
            <div class="column-50">
              <!-- 50% -->
              <div class="column-60">
                <!-- 60% -->
                <div class="column-67">
                  <!-- 66.66% -->
                  <div class="column-75">
                    <!-- 75% -->
                    <div class="column-80">
                      <!-- 80% -->
                      <div class="column-90"><!-- 90% --></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

#### 6. Abstract-Bereich

```html
<div class="column column-67">
  <h3>Abstract</h3>
  <p>
    Web scraping or crawling is the art of fetching data from a third party
    website by downloading and parsing the HTML code to extract the data you
    want. It can be hard. From bad HTML code to heavy Javascript use and
    anti-bot techniques, it is often tricky. Lots of companies use it to obtain
    knowledge ...
  </p>
</div>
```

##### h3-Element

```html
<h3>Abstract</h3>
```

**Überschriften-Hierarchie:**

```html
<h1>Buchtitel</h1>
<!-- Hauptüberschrift -->
<h2>Kapitel</h2>
<!-- (nicht vorhanden) -->
<h3>Abstract</h3>
<!-- Unterüberschrift -->
<h4>Details</h4>
<!-- Unter-Unterüberschrift -->

<!-- Sollte immer aufsteigend sein:
     ✅ h1 → h3 → h4 (OK, wenn h2 nicht nötig)
     ❌ h1 → h4 (Sprung von h1 zu h4 nicht ideal) -->
```

**Semantische Bedeutung:**

```html
<!-- "Abstract" ist eine Sektion innerhalb des Buches
     → <h3> ist passend
     → Zeigt Hierarchie: Buchtitel > Abstract -->
```

##### p-Element mit langem Text

```html
<p>
  Web scraping or crawling is the art of fetching data from a third party
  website by downloading and parsing the HTML code to extract the data you want.
  It can be hard. From bad HTML code to heavy Javascript use and anti-bot
  techniques, it is often tricky. Lots of companies use it to obtain knowledge
  ...
</p>
```

**Wird von JavaScript ersetzt:**

```typescript
// In detail.ts:
const abstractElement = document.querySelector("main p");
if (abstractElement) {
  abstractElement.textContent = book.abstract || "No description available.";
}

// Platzhalter-Text im HTML wird komplett ersetzt
```

**Warum Platzhalter-Text?**

```html
<!-- Während Entwicklung:
     → Designer sieht, wie langer Text aussieht
     → Layout kann getestet werden
     → CSS kann für Textumbruch optimiert werden -->

<!-- Zur Laufzeit:
     → JavaScript ersetzt mit echtem Abstract
     → Platzhalter wird nie angezeigt (außer JavaScript ist aus) -->
```

---

#### 7. Details-Bereich

```html
<h4>Details</h4>
<ul>
  <li><strong>Author:</strong> Kevin Sahin</li>
  <li><strong>Publisher:</strong> Leanpub</li>
  <li><strong>Pages:</strong> 115</li>
</ul>
```

##### h4-Element

```html
<h4>Details</h4>
```

**Überschriften-Hierarchie:**

```html
<h1>Buchtitel</h1>
<!-- Ebene 1 -->
<h3>Abstract</h3>
<!-- Ebene 2 (h2 übersprungen) -->
<h4>Details</h4>
<!-- Ebene 3 -->

<!-- h4 ist kleiner als h3
     → Zeigt, dass "Details" untergeordnet ist -->
```

##### ul-Element mit Metadaten

```html
<ul>
  <li><strong>Author:</strong> Kevin Sahin</li>
  <li><strong>Publisher:</strong> Leanpub</li>
  <li><strong>Pages:</strong> 115</li>
</ul>
```

**Was ist `<ul>`?**

```html
<!-- ul = unordered list (unsortierte Liste) -->
<!-- Jedes <li> ist ein Listeneintrag -->

<ul>
  <li>Punkt 1</li>
  <li>Punkt 2</li>
  <li>Punkt 3</li>
</ul>

<!-- Visuelle Darstellung (Standard):
     • Punkt 1
     • Punkt 2
     • Punkt 3 -->
```

**Alternative: ol (ordered list):**

```html
<!-- ol = ordered list (sortierte Liste) -->
<ol>
  <li>Erster</li>
  <li>Zweiter</li>
  <li>Dritter</li>
</ol>

<!-- Visuelle Darstellung:
     1. Erster
     2. Zweiter
     3. Dritter -->

<!-- In diesem Fall: ul ist richtig
     → Reihenfolge ist nicht wichtig
     → Nur eine Liste von Eigenschaften -->
```

**strong-Element:**

```html
<strong>Author:</strong>
```

**Was macht `<strong>`?**

```html
<!-- strong = Betonung (semantisch wichtig) -->
<!-- Macht Text fett -->

<li><strong>Author:</strong> Kevin Sahin</li>
<!-- Darstellung:
     Author: Kevin Sahin
     ^^^^^^ (fett)    (normal) -->

/* Browser-Default-CSS: */ strong { font-weight: bold; }
```

**Semantische Bedeutung:**

```html
<!-- <strong> vs <b>: -->

<strong>Wichtiger Text</strong>
<!-- Semantisch: "Dieser Text ist wichtig"
     Screenreader: Betonen den Text -->

<b>Fetter Text</b>
<!-- Nur visuell: "Dieser Text ist fett"
     Keine semantische Bedeutung -->

<!-- Best Practice: <strong> nutzen
     → Bessere Barrierefreiheit
     → Bessere Semantik -->
```

**Wird von JavaScript befüllt:**

```typescript
// In detail.ts:
const detailsList = document.querySelector("main ul");
if (detailsList) {
  detailsList.innerHTML = `
    <li><strong>Author:</strong> ${book.author}</li>
    <li><strong>Publisher:</strong> ${book.publisher}</li>
    <li><strong>Pages:</strong> ${book.numPages || "N/A"}</li>
  `;
}

// Platzhalter-Werte werden ersetzt
```

**Alternative Darstellungen:**

```html
<!-- Option 1: Liste (verwendet) -->
<ul>
  <li><strong>Author:</strong> Kevin Sahin</li>
  <li><strong>Publisher:</strong> Leanpub</li>
  <li><strong>Pages:</strong> 115</li>
</ul>

<!-- Option 2: Definition List (semantischer) -->
<dl>
  <dt>Author</dt>
  <dd>Kevin Sahin</dd>
  <dt>Publisher</dt>
  <dd>Leanpub</dd>
  <dt>Pages</dt>
  <dd>115</dd>
</dl>

<!-- Option 3: Tabelle -->
<table>
  <tr>
    <th>Author</th>
    <td>Kevin Sahin</td>
  </tr>
  <tr>
    <th>Publisher</th>
    <td>Leanpub</td>
  </tr>
  <tr>
    <th>Pages</th>
    <td>115</td>
  </tr>
</table>

<!-- <ul> ist OK, aber <dl> wäre semantisch besser -->
```

**Was ist `<dl>`?**

```html
<!-- dl = definition list (Definitionsliste) -->
<!-- Perfekt für Key-Value-Paare -->

<dl>
  <dt>Term</dt>
  <!-- Definition Term (Schlüssel) -->
  <dd>Definition</dd>
  <!-- Definition Description (Wert) -->
</dl>

<!-- Beispiel: -->
<dl>
  <dt>Author</dt>
  <dd>Kevin Sahin</dd>
  <dt>Publisher</dt>
  <dd>Leanpub</dd>
</dl>

<!-- ✅ Semantisch korrekt für Key-Value
     ✅ Screenreader verstehen Zusammenhang
     ❌ Weniger bekannt als <ul> -->
```

---

#### 8. Zurück-Button

```html
<button class="button button-outline" onclick="location.href='index.html'">
  Back
</button>
```

##### button-outline Klasse

```html
<button class="button button-outline"></button>
```

**Milligram-Button-Styles:**

```css
/* .button: Normaler Button */
.button {
  background-color: #9b4dca; /* Lila */
  color: white;
  border: none;
}

/* .button-outline: Umriss-Button */
.button.button-outline {
  background-color: transparent;
  color: #9b4dca;
  border: 0.1rem solid #9b4dca;
}
```

**Visueller Vergleich:**

```
Normal (.button):
┌─────────────┐
│    Back     │  Gefüllt (lila Hintergrund)
└─────────────┘

Outline (.button-outline):
┌─────────────┐
│    Back     │  Nur Rahmen (transparenter Hintergrund)
└─────────────┘
```

**Warum outline?**

```html
<!-- Primary Action (wichtigste Aktion): -->
<button class="button">Detail</button>
<!-- → Gefüllter Button (fällt mehr auf) -->

<!-- Secondary Action (weniger wichtige Aktion): -->
<button class="button button-outline">Back</button>
<!-- → Outline-Button (fällt weniger auf) -->

<!-- UX-Prinzip:
     Primäre Aktion: Gefüllt
     Sekundäre Aktion: Outline
     Tertiäre Aktion: Clear (transparent) -->
```

**Andere Button-Stile in Milligram:**

```html
<!-- Normal -->
<button class="button">Normal</button>

<!-- Outline -->
<button class="button button-outline">Outline</button>

<!-- Clear (transparent) -->
<button class="button button-clear">Clear</button>
```

##### onclick für Navigation

```html
onclick="location.href='index.html'"
```

**Was macht das?**

```javascript
// onclick: Event-Handler (wird bei Klick ausgeführt)
// location.href: Navigiert zu neuer Seite

// Äquivalent zu:
window.location.href = "index.html";
// → Browser lädt index.html
```

**Alternative Implementierungen:**

```html
<!-- Option 1: Inline onclick (verwendet) -->
<button onclick="location.href='index.html'">Back</button>

<!-- Option 2: Event-Listener in JavaScript -->
<button id="back-btn">Back</button>
<script>
  document.getElementById("back-btn").addEventListener("click", () => {
    location.href = "index.html";
  });
</script>

<!-- Option 3: Link als Button -->
<a href="index.html" class="button button-outline">Back</a>
<!-- ✅ Semantisch korrekt (Navigation = Link)
     ✅ Funktioniert ohne JavaScript
     ✅ Kann mit Rechtsklick "In neuem Tab öffnen" -->

<!-- Option 3 wäre am besten! -->
```

**Warum Button statt Link?**

```html
<!-- Button: -->
<button onclick="...">Back</button>
<!-- ❌ Semantisch: Button = Aktion, nicht Navigation
     ❌ Funktioniert nicht ohne JavaScript
     ❌ Kann nicht in neuem Tab geöffnet werden -->

<!-- Link: -->
<a href="index.html">Back</a>
<!-- ✅ Semantisch: Link = Navigation
     ✅ Funktioniert ohne JavaScript
     ✅ Kann in neuem Tab geöffnet werden -->

<!-- Link mit Button-Styling: -->
<a href="index.html" class="button button-outline">Back</a>
<!-- ✅ Beste Lösung: Semantisch + Styling -->
```

**Browser-History:**

```javascript
// Aktuelle Implementierung:
location.href = "index.html";
// → Geht zu index.html (neue History-Einträge)

// Alternative: Browser zurück:
history.back();
// → Geht zur vorherigen Seite in Browser-History
// ✅ Behält Scroll-Position
// ✅ Behält Formular-Daten
// ❌ Funktioniert nicht, wenn direkt zu detail.html navigiert
```

---

#### 9. Buchcover-Bild

```html
<div class="column column-33">
  <img src="images/1001606140805.png" alt="" />
</div>
```

##### img-Element

```html
<img src="images/1001606140805.png" alt="" />
```

**Attribute:**

**src (source):**

```html
src="images/1001606140805.png"
```

**Pfad-Erklärung:**

```
Verzeichnis-Struktur:
src/
  detail.html           ← Wir sind hier
  images/
    1001606140805.png   ← Bild ist hier

Relativer Pfad:
images/1001606140805.png

Absoluter Pfad (zur Laufzeit):
http://localhost:3000/images/1001606140805.png
```

**Wird von JavaScript aktualisiert:**

```typescript
// In detail.ts:
const imgElement = document.querySelector("main img") as HTMLImageElement;
if (imgElement) {
  imgElement.src = `images/${book.isbn}.png`;
  imgElement.alt = book.title;
}

// Beispiel:
// book.isbn = "9783864907791"
// imgElement.src = "images/9783864907791.png"
// imgElement.alt = "Angular"
```

**alt (alternative text):**

```html
alt=""
```

**Was ist alt?**

```html
<!-- alt = Alternativ-Text für Bilder -->

<!-- Mit Text: -->
<img src="book.png" alt="Angular Buch Cover" />
<!-- Wird angezeigt, wenn:
     - Bild nicht geladen werden kann
     - Screenreader für Blinde (liest Text vor)
     - Bilder im Browser deaktiviert -->

<!-- Leer (wie hier): -->
<img src="book.png" alt="" />
<!-- Bedeutet: "Bild ist rein dekorativ"
     → Screenreader ignorieren das Bild
     → OK für Cover, da Titel schon im Text steht -->
```

**Best Practice für alt:**

```html
<!-- Beschreibendes alt: -->
<img src="cover.png" alt="Angular Buch Cover" />
<!-- ✅ Für wichtige Bilder -->

<!-- Leeres alt: -->
<img src="cover.png" alt="" />
<!-- ✅ Für dekorative Bilder
     ✅ Wenn Bildinhalt schon im Text beschrieben ist -->

<!-- Fehlendes alt: -->
<img src="cover.png" />
<!-- ❌ Screenreader lesen Dateinamen vor
     ❌ Schlechte Barrierefreiheit -->
```

**In diesem Fall:**

```html
<img src="images/1001606140805.png" alt="" />

<!-- Warum alt=""?
     → Buchtitel steht schon im <h1>
     → Cover ist nur visuelle Ergänzung
     → Screenreader müssen nicht "Buchcover" sagen

     Wird von JavaScript auf alt="Buchtitel" gesetzt
     → Dann ist es beschreibend -->
```

##### Selbstschließendes Tag

```html
<img src="..." alt="" />
```

**Unterschied:**

```html
<!-- XHTML/XML-Style (selbstschließend): -->
<img src="..." alt="" />

<!-- HTML5-Style: -->
<img src="..." alt="" />

<!-- Beide sind korrekt in HTML5
     Projekt nutzt: /> (konsistent) -->
```

##### Fehlerbehandlung im JavaScript

```typescript
// In detail.ts:
imgElement.onerror = () => {
  imgElement.style.display = "none";
};

// Wenn Bild nicht gefunden wird:
// → onerror wird ausgelöst
// → Bild wird versteckt (kein Broken-Image-Icon)
```

**Visuell:**

```
Bild existiert:
┌──────────────┐
│              │
│   [Buch-     │
│    Cover]    │
│              │
└──────────────┘

Bild existiert nicht (ohne onerror):
┌──────────────┐
│  [X]  Bild   │  ← Broken Image Icon
│   nicht      │
│   gefunden   │
└──────────────┘

Bild existiert nicht (mit onerror):
(Nichts wird angezeigt - Bild ist versteckt)
```

---

#### 10. Script-Tag

```html
<script type="module" src="../dist/detail.js"></script>
```

**Vergleich:**

```html
<!-- index.html: -->
<script type="module" src="../dist/index.js"></script>

<!-- favorite.html: -->
<script type="module" src="../dist/favorite.js"></script>

<!-- detail.html: -->
<script type="module" src="../dist/detail.js"></script>
```

**Was macht detail.js?**

```typescript
// In detail.ts → kompiliert zu detail.js:

// 1. ISBN aus URL auslesen
const urlParams = new URLSearchParams(window.location.search);
const isbn = urlParams.get("isbn");

// 2. Buchdetails von API laden
const response = await fetch(`${API_URL}/books/${isbn}`);
const book: Book = await response.json();

// 3. DOM aktualisieren
titleElement.innerHTML = `${book.title}<br /><small>${
  book.subtitle || ""
}</small>`;
abstractElement.textContent = book.abstract || "No description available.";
detailsList.innerHTML = `<li>...</li>`;
imgElement.src = `images/${book.isbn}.png`;
```

---

#### Zusammenfassung

Die `detail.html` Datei hat eine **völlig andere Struktur** als die Listen-Seiten:

**Hauptunterschiede zu index.html / favorite.html:**

| Aspekt                 | Listen-Seiten                | Detail-Seite                    |
| ---------------------- | ---------------------------- | ------------------------------- |
| **Zweck**              | Viele Bücher auflisten       | Ein Buch detailliert anzeigen   |
| **Layout**             | Tabelle                      | Zwei-Spalten (Text + Bild)      |
| **Überschrift**        | `<h2>` mit Anzahl            | `<h1>` mit Buchtitel            |
| **Such-/Filterformen** | Ja                           | Nein                            |
| **Tabelle**            | Ja                           | Nein                            |
| **Details**            | Minimal (Titel, ISBN, Autor) | Ausführlich (Abstract, Details) |
| **Buchcover**          | Nein                         | Ja (großes Bild)                |
| **Interaktion**        | Suchen, Filtern, Favoriten   | Nur Lesen, Zurück               |
| **Navigation**         | "Books"/"Favorites" aktiv    | "Books" aktiv                   |
| **Button**             | "Detail" → detail.html       | "Back" → index.html             |

**HTML-Struktur:**

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Meta-Tags, CSS (identisch) -->
    <title>Book Detail - IT Book Library</title>
  </head>
  <body>
    <header>
      <!-- Logo + Navigation (identisch) -->
    </header>

    <main class="container">
      <!-- Buchtitel mit Untertitel -->
      <h1>Title<br /><small>Subtitle</small></h1>

      <!-- Zwei-Spalten-Layout -->
      <section class="row">
        <!-- Linke Spalte: Text (67%) -->
        <div class="column-67">
          <h3>Abstract</h3>
          <p>Beschreibung...</p>

          <h4>Details</h4>
          <ul>
            <li><strong>Author:</strong> ...</li>
            <li><strong>Publisher:</strong> ...</li>
            <li><strong>Pages:</strong> ...</li>
          </ul>

          <button class="button-outline">Back</button>
        </div>

        <!-- Rechte Spalte: Bild (33%) -->
        <div class="column-33">
          <img src="images/..." alt="" />
        </div>
      </section>
    </main>

    <script type="module" src="../dist/detail.js"></script>
  </body>
</html>
```

**Wichtige HTML-Konzepte:**

✅ **Zwei-Spalten-Layout** - column-67 / column-33 (67%/33%)
✅ **Überschriften-Hierarchie** - h1 > h3 > h4
✅ **Semantische Tags** - `<h1>`, `<small>`, `<strong>`, `<ul>`
✅ **Button-Stile** - button-outline für sekundäre Aktionen
✅ **Responsive Design** - Spalten stapeln sich auf Mobilgeräten
✅ **Bilddarstellung** - img mit alt-Attribut
✅ **Navigation** - Zurück-Button zur vorherigen Seite

**Responsive Verhalten:**

```css
/* Desktop (> 768px): */
/* Zwei Spalten nebeneinander */
.column-67 {
  width: 67%;
}
.column-33 {
  width: 33%;
}

/* Tablet/Mobile (< 768px): */
/* Spalten stapeln sich */
.column-67 {
  width: 100%;
}
.column-33 {
  width: 100%;
}

/* Milligram macht das automatisch */
```

**Verbesserungsmöglichkeiten:**

💡 **Link statt Button** - `<a href="index.html" class="button-outline">Back</a>`
💡 **Definition List** - `<dl>` statt `<ul>` für Details
💡 **Dynamischer Titel** - `document.title = book.title`
💡 **Breadcrumb-Navigation** - Home > Books > Buchtitel
💡 **Share-Buttons** - Social Media Sharing
💡 **Related Books** - Ähnliche Bücher anzeigen
💡 **Rating-System** - Sterne-Bewertung

**Best Practices umgesetzt:**

✅ **Semantisches HTML** - h1, h3, h4, strong, ul
✅ **Responsive Grid** - Milligram-Spalten
✅ **Outline-Button** - Für sekundäre Aktionen
✅ **Alt-Attribut** - Barrierefreiheit (auch wenn leer)
✅ **Klare Hierarchie** - Überschriften in logischer Reihenfolge

Diese HTML-Datei ist das **statische Grundgerüst** für die Detail-Seite, das von `detail.ts` **mit einem spezifischen Buch gefüllt** wird!

---

## Styling

### style.css

Die Datei `style.css` enthält das **benutzerdefinierte CSS** der Anwendung. Während **Milligram** das grundlegende Styling bereitstellt, überschreibt und erweitert diese Datei das Framework für **spezifische Anforderungen**.

#### Vollständiger Überblick

Die CSS-Datei ist in folgende Bereiche gegliedert:

1. **CSS Custom Properties** - Farb-Variablen (`:root`)
2. **Header-Styling** - Logo und Hintergrund
3. **Navigation** - Links mit Hover und aktiv-Zustand
4. **Favoriten-Badge** - Runde Zahl-Anzeige
5. **Favoriten-Button** - SVG-Icons im Tabellen-Layout
6. **Spalten-Breite** - Erste Tabellenspalte

---

#### 1. CSS Custom Properties (Variablen)

```css
:root {
  --primary: #9b4dca;
  --secondary: #606c76;
}
```

##### Was ist :root?

```css
:root {
  /* Hier werden globale Variablen definiert */
}
```

**Erklärung:**

```css
/* :root ist eine Pseudo-Klasse
   Sie selektiert das oberste Element im DOM (= <html>)
   
   Warum :root statt html?
   → :root hat höhere Spezifität
   → Standard für CSS Custom Properties
   → Funktioniert auch in SVG */

/* Äquivalent: */
html {
  --primary: #9b4dca;
}

/* Aber :root ist die Konvention */
```

##### CSS Custom Properties (Variablen)

```css
--primary: #9b4dca;
--secondary: #606c76;
```

**Syntax:**

```css
/* Definition: */
--variable-name: value;

/* Verwendung: */
color: var(--variable-name);

/* Mit Fallback: */
color: var(--variable-name, #000);
/* Falls --variable-name nicht definiert, nutze #000 */
```

**Beispiel:**

```css
/* Definition: */
:root {
  --primary: #9b4dca; /* Lila */
  --secondary: #606c76; /* Grau */
}

/* Verwendung im gesamten CSS: */
.mainnav-link.mainnav-link--active {
  color: var(--primary); /* = #9b4dca */
}

.mainnav-number {
  background-color: var(--primary); /* = #9b4dca */
}
```

**Vorteile:**

```css
/* Ohne Variablen: */
.button {
  background: #9b4dca;
}
.link--active {
  color: #9b4dca;
}
.badge {
  background: #9b4dca;
}
/* Problem: Farbe 3x wiederholt
   → Ändern müsste an 3 Stellen passieren */

/* Mit Variablen: */
:root {
  --primary: #9b4dca;
}
.button {
  background: var(--primary);
}
.link--active {
  color: var(--primary);
}
.badge {
  background: var(--primary);
}
/* ✅ Farbe zentral definiert
   ✅ Ändern an einer Stelle
   ✅ Konsistenz garantiert */
```

**JavaScript-Zugriff:**

```javascript
// CSS-Variable aus JavaScript auslesen:
const primary = getComputedStyle(document.documentElement).getPropertyValue(
  "--primary"
);
console.log(primary); // "#9b4dca"

// CSS-Variable ändern:
document.documentElement.style.setProperty("--primary", "#ff0000");
// → Alle Elemente mit var(--primary) werden rot
```

##### Farbwerte

```css
--primary: #9b4dca; /* Lila */
--secondary: #606c76; /* Grau */
```

**Was bedeuten diese Hex-Farben?**

```css
/* Hex-Farben: #RRGGBB */
--primary: #9b4dca;
/*         ││ ││ ││
           ││ ││ └└─ BB = Blue (Blau)
           ││ └└───── GG = Green (Grün)
           └└─────── RR = Red (Rot) */

/* Umrechnung: */
#9b4dca
  RR = 9b = 155 (von 0-255)
  GG = 4d = 77
  BB = ca = 202
  → Viel Blau, mittel Rot, wenig Grün = Lila

#606c76
  RR = 60 = 96
  GG = 6c = 108
  BB = 76 = 118
  → Ähnliche Werte = Grau
```

**Visuelle Darstellung:**

```
--primary: #9b4dca
┌────────────┐
│            │
│    LILA    │  ← Milligram Primary Color
│            │     (Button, Links, etc.)
└────────────┘

--secondary: #606c76
┌────────────┐
│            │
│    GRAU    │  ← Milligram Secondary Color
│            │     (Text, Rahmen, etc.)
└────────────┘
```

**Warum diese Farben?**

```css
/* Milligram Framework nutzt diese Farben:
   → --primary (#9b4dca) für Buttons, Links
   → --secondary (#606c76) für Text, Borders
   
   Durch Variablen kann das Theme angepasst werden:
   → Einmal ändern, überall wirksam */
```

**Alternative Farbformate:**

```css
/* Hex (verwendet): */
--primary: #9b4dca;

/* RGB: */
--primary: rgb(155, 77, 202);

/* HSL (Hue, Saturation, Lightness): */
--primary: hsl(276, 50%, 55%);

/* Alle 3 sind identisch, nur unterschiedliche Schreibweise */
```

---

#### 2. Header-Styling

```css
.header {
  background: #f4f5f6;
  padding-top: 25px;
  margin-bottom: 40px;
}
```

##### Klassen-Selektor

```css
.header {
  /* Selektiert alle Elemente mit class="header" */
}
```

**HTML-Verwendung:**

```html
<header class="header">
  <!-- Header-Inhalt -->
</header>
```

##### background-Eigenschaft

```css
background: #f4f5f6;
```

**Was macht das?**

```css
/* Shorthand-Property für: */
background-color: #f4f5f6;
background-image: none;
background-repeat: repeat;
background-position: 0% 0%;
background-size: auto auto;
background-attachment: scroll;

/* Hier wird nur Farbe gesetzt: */
background: #f4f5f6; /* Helles Grau */
```

**Farbwert #f4f5f6:**

```css
#f4f5f6
  RR = f4 = 244
  GG = f5 = 245
  BB = f6 = 246
  → Fast weiß (sehr helle Grautöne)
```

**Visueller Effekt:**

```
Standard (ohne background):
┌────────────────────────────────────┐
│  📚 IT Book Library   Books | Fav  │  ← Weißer Hintergrund
└────────────────────────────────────┘

Mit background: #f4f5f6:
┌────────────────────────────────────┐
│  📚 IT Book Library   Books | Fav  │  ← Leicht grauer Hintergrund
└────────────────────────────────────┘
↑ Hebt den Header vom Rest ab
```

##### padding-top

```css
padding-top: 25px;
```

**Was ist padding?**

```css
/* Box-Model: */
┌─────────────────────────────┐
│ margin (außen)              │
│  ┌──────────────────────┐   │
│  │ border (Rahmen)      │   │
│  │  ┌───────────────┐   │   │
│  │  │ padding (innen)│   │   │
│  │  │  ┌─────────┐  │   │   │
│  │  │  │ content │  │   │   │
│  │  │  └─────────┘  │   │   │
│  │  └───────────────┘   │   │
│  └──────────────────────┘   │
└─────────────────────────────┘
```

**padding-top erklärt:**

```css
/* Nur oben Innenabstand: */
padding-top: 25px;

/* Visuell: */
┌────────────────────────┐
│ ← 25px Abstand nach oben
│  📚 IT Book Library    │
│  Books | Favorites     │
└────────────────────────┘
```

**Alternative Schreibweisen:**

```css
/* Einzeln: */
padding-top: 25px;
padding-right: 0;
padding-bottom: 0;
padding-left: 0;

/* Shorthand (alle Seiten): */
padding: 25px 0 0 0;
/*       top right bottom left (Uhrzeigersinn) */

/* Nur top (verwendet): */
padding-top: 25px;
```

##### margin-bottom

```css
margin-bottom: 40px;
```

**Was ist margin?**

```css
/* margin = Außenabstand zu anderen Elementen */

/* Visuell: */
┌────────────────────────┐
│  Header                │
└────────────────────────┘
  ↓ 40px Abstand nach unten
┌────────────────────────┐
│  Main-Inhalt           │
└────────────────────────┘
```

**padding vs margin:**

```css
/* padding = Innenabstand (innerhalb des Elements) */
.header {
  padding-top: 25px;  /* Mehr Platz INNERHALB */
}
┌──────────────────────┐
│ ← 25px               │ ← Hintergrund erstreckt sich
│  Inhalt              │
└──────────────────────┘

/* margin = Außenabstand (zwischen Elementen) */
.header {
  margin-bottom: 40px;  /* Mehr Platz AUSSERHALB */
}
┌──────────────────────┐
│  Inhalt              │
└──────────────────────┘
  ↓ 40px               ← Kein Hintergrund hier
┌──────────────────────┐
│  Nächstes Element    │
└──────────────────────┘
```

**Zusammenfassung:**

```css
.header {
  background: #f4f5f6; /* Leicht grauer Hintergrund */
  padding-top: 25px; /* 25px Innenabstand oben */
  margin-bottom: 40px; /* 40px Außenabstand unten */
}

/* Effekt:
   ✅ Header hebt sich durch grauen Hintergrund ab
   ✅ Logo/Navigation haben Abstand vom oberen Rand
   ✅ Main-Inhalt hat Abstand vom Header */
```

---

#### 3. Logo-Styling

```css
.logo {
  font-weight: bold;
  font-size: 2.7rem;
}
```

##### font-weight

```css
font-weight: bold;
```

**Was ist font-weight?**

```css
/* font-weight = Schriftstärke (Dicke) */

/* Werte: */
font-weight: normal; /* = 400 (Standard) */
font-weight: bold; /* = 700 (Fett) */
font-weight: lighter; /* Dünner als Eltern */
font-weight: bolder; /* Dicker als Eltern */

/* Numerisch (100-900): */
font-weight: 100; /* Thin */
font-weight: 300; /* Light */
font-weight: 400; /* Normal */
font-weight: 500; /* Medium */
font-weight: 700; /* Bold */
font-weight: 900; /* Black */
```

**Visueller Vergleich:**

```
font-weight: normal (400)
📚 IT Book Library

font-weight: bold (700)
📚 IT Book Library
   (deutlich dicker)
```

##### font-size mit rem

```css
font-size: 2.7rem;
```

**Was ist rem?**

```css
/* rem = "root em"
   Relativ zur Schriftgröße des <html>-Elements

   Standard: html { font-size: 16px; }

   1rem = 16px
   2rem = 32px
   2.7rem = 43.2px */

/* Berechnung: */
2.7rem × 16px = 43.2px
```

**Einheiten-Vergleich:**

```css
/* Absolute Einheiten: */
font-size: 43px; /* Pixel (fest) */

/* Relative Einheiten: */
font-size: 2.7rem; /* Relativ zu <html> */
font-size: 2.7em; /* Relativ zu Eltern-Element */

/* Unterschied em vs rem: */
html {
  font-size: 16px;
}
.parent {
  font-size: 20px;
}

.child {
  font-size: 2em; /* = 2 × 20px = 40px */
  font-size: 2rem; /* = 2 × 16px = 32px */
}
/* rem ist unabhängig von Eltern-Schriftgröße */
```

**Warum rem statt px?**

```css
/* Mit px: */
.logo {
  font-size: 43px;
}
/* ❌ Nicht skalierbar
   ❌ Benutzer kann Schriftgröße nicht ändern */

/* Mit rem: */
.logo {
  font-size: 2.7rem;
}
/* ✅ Skaliert mit Browser-Einstellungen
   ✅ Barrierefreiheit (Nutzer mit Sehschwäche) */

/* Beispiel:
   Nutzer erhöht Browser-Schriftgröße auf 20px:
   → 2.7rem × 20px = 54px (Logo wächst mit) */
```

**Zusammenfassung:**

```css
.logo {
  font-weight: bold;     /* Fett */
  font-size: 2.7rem;     /* 43.2px (bei Standard-Größe) */
}

/* HTML: */
<a class="logo" href="index.html">
  📚 IT Book Library
</a>

/* Ergebnis:
   📚 IT Book Library
   (sehr groß und fett) */
```

---

#### 4. Navigation-Container

```css
.mainnav {
  display: flex;
  justify-content: flex-end;
}
```

##### display: flex

```css
display: flex;
```

**Was ist Flexbox?**

```css
/* Flexbox = Layout-System für flexible Anordnung

   Container (Eltern):
   display: flex;

   Items (Kinder):
   Werden automatisch horizontal angeordnet */

/* Beispiel: */
<nav class="mainnav">
  <a>Books</a>
  <a>Favorites</a>
</nav>

/* Ohne Flexbox (display: block): */
┌─────────────┐
│ Books       │
├─────────────┤
│ Favorites   │
└─────────────┘
(untereinander)

/* Mit Flexbox (display: flex): */
┌──────────────────────┐
│ Books | Favorites    │
└──────────────────────┘
(nebeneinander)
```

**Flexbox-Achsen:**

```
Main Axis (Hauptachse) →
┌─────────┬─────────┬─────────┐
│ Item 1  │ Item 2  │ Item 3  │
└─────────┴─────────┴─────────┘
     ↓          ↓          ↓
Cross Axis (Querachse)

flex-direction: row (Standard)
→ Items horizontal angeordnet
```

##### justify-content: flex-end

```css
justify-content: flex-end;
```

**Was macht justify-content?**

```css
/* justify-content = Ausrichtung auf der Hauptachse (horizontal)
   
   Mögliche Werte: */
justify-content: flex-start; /* Links (Standard) */
justify-content: flex-end; /* Rechts */
justify-content: center; /* Zentriert */
justify-content: space-between; /* Gleichmäßiger Abstand */
justify-content: space-around; /* Abstand um Items */
```

**Visueller Vergleich:**

```css
/* flex-start (Standard): */
┌────────────────────────────────┐
│ Books | Favorites              │
└────────────────────────────────┘

/* flex-end (verwendet): */
┌────────────────────────────────┐
│              Books | Favorites │
└────────────────────────────────┘
                          ↑ rechts

/* center: */
┌────────────────────────────────┐
│        Books | Favorites       │
└────────────────────────────────┘

/* space-between: */
┌────────────────────────────────┐
│ Books              Favorites   │
└────────────────────────────────┘
```

**Zusammenfassung:**

```css
.mainnav {
  display: flex;            /* Items nebeneinander */
  justify-content: flex-end;/* Ausrichtung rechts */
}

/* HTML: */
<nav class="mainnav">
  <a href="index.html">Books</a>
  <a href="favorite.html">Favorites</a>
</nav>

/* Ergebnis:
┌────────────────────────────────────┐
│ 📚 IT Book Library  Books | Favorites │
└────────────────────────────────────┘
   ↑ Logo links       Navigation rechts ↑
*/
```

---

#### 5. Navigation-Links

```css
.mainnav-link {
  margin: 0 10px;
  line-height: 4.7rem;
  color: var(--secondary);
  border-bottom: 3px solid transparent;
}
```

##### margin mit zwei Werten

```css
margin: 0 10px;
```

**Shorthand-Syntax:**

```css
/* 4 Werte: */
margin: 10px 20px 30px 40px;
/*      top right bottom left (Uhrzeigersinn) */

/* 3 Werte: */
margin: 10px 20px 30px;
/*      top left/right bottom */

/* 2 Werte: */
margin: 0 10px;
/*      top/bottom left/right */

/* 1 Wert: */
margin: 10px;
/*      alle Seiten gleich */
```

**In diesem Fall:**

```css
margin: 0 10px;
/* = margin-top: 0;
     margin-right: 10px;
     margin-bottom: 0;
     margin-left: 10px; */

/* Visuell: */
┌──────┐  ←10px→  ┌──────────┐  ←10px→  ┌──────┐
│Books │          │ Favorites│          │      │
└──────┘          └──────────┘          └──────┘
```

##### line-height

```css
line-height: 4.7rem;
```

**Was ist line-height?**

```css
/* line-height = Zeilenhöhe (Abstand zwischen Zeilen)
   Aber: Auch für vertikale Zentrierung nutzbar */

/* Beispiel: */
.link {
  height: 4.7rem;        /* Container-Höhe */
  line-height: 4.7rem;   /* Text-Höhe */
}
/* → Text wird vertikal zentriert */

/* Visuell: */
┌──────────────┐  ↑
│              │  │ 4.7rem
│    Books     │  │ (Text mittig)
│              │  ↓
└──────────────┘
```

**Warum 4.7rem?**

```css
/* Vermutlich:
   - Header hat bestimmte Höhe
   - Links sollen vertikal zentriert sein
   - 4.7rem = ca. 75px (bei 16px Standard) */

/* Alternative zur Zentrierung: */
display: flex;
align-items: center;
```

##### color mit Variable

```css
color: var(--secondary);
```

**Erklärung:**

```css
/* Verwendet CSS-Variable: */
:root {
  --secondary: #606c76; /* Grau */
}

.mainnav-link {
  color: var(--secondary); /* = #606c76 */
}

/* Links sind standardmäßig grau
   → Nicht aufgedrängt (dezent)
   → Wird lila bei :hover oder --active */
```

##### border-bottom mit transparent

```css
border-bottom: 3px solid transparent;
```

**Warum transparent?**

```css
/* Trick für konsistente Höhe:
   
   Inaktiver Link (transparent): */
border-bottom: 3px solid transparent;
/* ← Rahmen ist da, aber unsichtbar */

/* Aktiver Link (lila): */
border-bottom: 3px solid var(--primary);
/* ← Rahmen wird sichtbar */

/* Vorteil:
   ✅ Höhe bleibt gleich (kein "Springen")
   ❌ Ohne transparent würde Link 3px wachsen */
```

**Visueller Vergleich:**

```css
/* Ohne transparent-Trick: */
/* Inaktiv: */
Books
/* Aktiv: */
Books
_____  ← 3px hinzugefügt
(Link springt nach unten)

/* Mit transparent-Trick: */
/* Inaktiv: */
Books
_____  ← 3px transparent (da, aber unsichtbar)
/* Aktiv: */
Books
_____  ← 3px lila (sichtbar)
(Höhe bleibt gleich)
```

**border-bottom Syntax:**

```css
border-bottom: 3px solid transparent;
/*             │   │     │
               │   │     └─ color (Farbe)
               │   └─────── style (Stil)
               └─────────── width (Breite) */

/* Ausgeschrieben: */
border-bottom-width: 3px;
border-bottom-style: solid;
border-bottom-color: transparent;
```

**border-style Werte:**

```css
border-style: solid; /* ───── Durchgezogen */
border-style: dashed; /* - - - Gestrichelt */
border-style: dotted; /* ····· Gepunktet */
border-style: double; /* ═════ Doppelt */
border-style: none; /*       Kein Rahmen */
```

---

#### 6. Navigation-Links Hover

```css
.mainnav-link:hover {
  color: var(--primary);
}
```

##### :hover Pseudo-Klasse

```css
.mainnav-link:hover {
  /* Gilt, wenn Maus über dem Element ist */
}
```

**Was ist eine Pseudo-Klasse?**

```css
/* Pseudo-Klassen = Spezielle Zustände von Elementen
   Syntax: element:pseudo-class { } */

/* Häufige Pseudo-Klassen: */
:hover     /* Maus ist über Element */
:active    /* Element wird geklickt */
:focus     /* Element hat Fokus (z.B. Tab-Navigation) */
:visited   /* Link wurde besucht */
:first-child  /* Erstes Kind-Element */
:last-child   /* Letztes Kind-Element */
:nth-child(n) /* n-tes Kind-Element */
```

**Beispiele:**

```css
/* Normal: */
.link {
  color: gray;
}

/* Bei Hover: */
.link:hover {
  color: purple;
}

/* Bei Klick: */
.link:active {
  color: red;
}

/* Bei Fokus (Tab-Navigation): */
.link:focus {
  outline: 2px solid blue;
}
```

**Hover-Effekt visuell:**

```
Normal (kein Hover):
┌──────────────────────────────────┐
│         Books | Favorites         │ ← Grau (#606c76)
└──────────────────────────────────┘

Hover über "Books":
┌──────────────────────────────────┐
│         Books | Favorites         │ ← Books: Lila (#9b4dca)
└──────────────────────────────────┘
            ↑ Maus
```

**Barrierefreiheit:**

```css
/* Problem: Nur Hover funktioniert nicht für Tastatur-Nutzer */
.link:hover {
  color: var(--primary);
}

/* Lösung: Auch :focus unterstützen */
.link:hover,
.link:focus {
  color: var(--primary);
}

/* ✅ Maus-Nutzer: Hover
   ✅ Tastatur-Nutzer: Tab → Focus */
```

---

#### 7. Aktiver Navigation-Link

```css
.mainnav-link.mainnav-link--active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}
```

##### Verkettete Klassen

```css
.mainnav-link.mainnav-link--active {
  /* Selektiert Elemente mit BEIDEN Klassen */
}
```

**Unterschied:**

```css
/* Mit Leerzeichen (Nachfahre): */
.mainnav-link .mainnav-link--active {
  /* <div class="mainnav-link">
       <span class="mainnav-link--active">
     Element INNERHALB */
}

/* Ohne Leerzeichen (verkettetet): */
.mainnav-link.mainnav-link--active {
  /* <div class="mainnav-link mainnav-link--active">
     BEIDE Klassen auf EINEM Element */
}
```

**HTML-Verwendung:**

```html
<!-- Inaktiv (nur .mainnav-link): -->
<a href="favorite.html" class="mainnav-link"> Favorites </a>

<!-- Aktiv (beide Klassen): -->
<a href="index.html" class="mainnav-link mainnav-link--active"> Books </a>
```

##### BEM-Naming (Block Element Modifier)

```css
.mainnav-link--active/*  │      │     │
    │      │     └─ Modifier (Variante)
    │      └─────── Element
    └────────────── Block */;
```

**BEM-Konvention:**

```css
/* Block (Hauptkomponente): */
.mainnav {
}

/* Element (Teil des Blocks): */
.mainnav__link {
} /* Unterstrich: Teil von */

/* Modifier (Variante): */
.mainnav__link--active {
} /* Doppelminus: Zustand */

/* In diesem Projekt:
   Keine strenge BEM-Syntax
   Aber: -- deutet auf Modifier hin */
```

**Weitere Beispiele:**

```css
/* Strict BEM: */
.button {
} /* Block */
.button__icon {
} /* Element */
.button--primary {
} /* Modifier */
.button--disabled {
} /* Modifier */

/* Dieses Projekt: */
.mainnav {
}
.mainnav-link {
} /* - statt __ */
.mainnav-link--active {
} /* -- für Modifier */
```

##### border-bottom-color

```css
border-bottom-color: var(--primary);
```

**Einzelne Border-Eigenschaft:**

```css
/* Vorher definiert: */
border-bottom: 3px solid transparent;

/* Jetzt nur Farbe ändern: */
border-bottom-color: var(--primary);
/* → Breite (3px) und Stil (solid) bleiben */

/* Ergebnis: */
border-bottom: 3px solid #9b4dca;
```

**Warum nicht alles neu definieren?**

```css
/* Ineffizient: */
.mainnav-link {
  border-bottom: 3px solid transparent;
}
.mainnav-link--active {
  border-bottom: 3px solid var(--primary);
}

/* Effizienter (verwendet): */
.mainnav-link {
  border-bottom: 3px solid transparent;
}
.mainnav-link--active {
  border-bottom-color: var(--primary);
}
/* ✅ Nur Farbe wird überschrieben
   ✅ DRY (Don't Repeat Yourself) */
```

**Zusammenfassung:**

```css
.mainnav-link.mainnav-link--active {
  color: var(--primary);                /* Text: Lila */
  border-bottom-color: var(--primary);  /* Unterstrich: Lila */
}

/* Visuell: */
┌──────────────────────────────────┐
│         Books | Favorites         │
│         ─────                     │ ← Lila Unterstrich
└──────────────────────────────────┘
            ↑ Aktiv
```

---

#### 8. Favoriten-Zahl-Badge

```css
.mainnav-number {
  background-color: var(--primary);
  color: #f4f5f6;
  padding: 0 5px;
  border-radius: 50%;
}
```

##### HTML-Struktur

```html
<a href="favorite.html" class="mainnav-link">
  Favorites <span class="mainnav-number">2</span>
</a>
```

##### background-color mit Variable

```css
background-color: var(--primary);
```

**Warum background-color statt background?**

```css
/* background: Shorthand (überschreibt alles) */
background: var(--primary);
/* Überschreibt auch:
   background-image, background-repeat, etc. */

/* background-color: Nur Farbe */
background-color: var(--primary);
/* Ändert nur Farbe
   ✅ Spezifischer
   ✅ Klarer Intent */
```

##### color

```css
color: #f4f5f6;
```

**Kontrast:**

```css
/* Hintergrund: */
background-color: #9b4dca; /* Lila (dunkel) */

/* Text: */
color: #f4f5f6; /* Fast weiß (hell) */

/* → Hoher Kontrast
   ✅ Gut lesbar
   ✅ Barrierefreiheit (WCAG) */
```

##### padding mit zwei Werten

```css
padding: 0 5px;
/*       │  │
         │  └─ links/rechts: 5px
         └──── oben/unten: 0 */
```

**Visuell:**

```
padding: 0 5px;
┌────────┐
│←5px→ 2 ←5px→│  ← Kein Padding oben/unten
└────────┘      ← 5px links und rechts
```

##### border-radius: 50%

```css
border-radius: 50%;
```

**Was macht border-radius?**

```css
/* border-radius = Runde Ecken
   
   Werte: */
border-radius: 0; /* Eckig (Standard) */
border-radius: 5px; /* Leicht rund */
border-radius: 50%; /* Kreis/Ellipse */
border-radius: 100%; /* Auch Kreis (gleich wie 50%) */
```

**Visueller Vergleich:**

```css
/* 0 (eckig): */
┌─────┐
│  2  │
└─────┘

/* 5px (leicht rund): */
╭─────╮
│  2  │
╰─────╯

/* 50% (Kreis): */
  ╭─╮
 │ 2 │
  ╰─╯
```

**Warum 50%?**

```css
/* border-radius: 50% macht aus Rechteck einen Kreis
   
   Quadrat (gleiche Breite/Höhe):
   → Kreis
   
   Rechteck (unterschiedliche Breite/Höhe):
   → Ellipse */

/* In diesem Fall:
   padding: 0 5px; → Rechteck
   border-radius: 50%; → Ellipse (oval) */
```

**Alternative für perfekten Kreis:**

```css
/* Option 1: 50% (verwendet) */
.mainnav-number {
  padding: 0 5px;
  border-radius: 50%;
}
/* → Oval (weil Rechteck) */

/* Option 2: Feste Größe */
.mainnav-number {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* → Perfekter Kreis (weil Quadrat) */
```

**Zusammenfassung:**

```css
.mainnav-number {
  background-color: var(--primary);  /* Lila Hintergrund */
  color: #f4f5f6;                    /* Weißer Text */
  padding: 0 5px;                    /* 5px links/rechts */
  border-radius: 50%;                /* Runde Form */
}

/* Visuell: */
Favorites  ◯2◯
           ↑ Lila Badge mit weißer Zahl
```

---

#### 9. Favoriten-Button in Tabelle

```css
main .fav-btn {
  padding: 0;
  margin-bottom: -45px;
}
```

##### Nachfahren-Selektor

```css
main .fav-btn {
  /* Selektiert .fav-btn INNERHALB von main */
}
```

**Unterschied zu .fav-btn allein:**

```css
/* Ohne Kontext: */
.fav-btn {
  /* Gilt für ALLE .fav-btn */
}

/* Mit Kontext: */
main .fav-btn {
  /* Gilt NUR für .fav-btn in <main> */
}

/* Warum?
   → Falls .fav-btn auch woanders verwendet wird
   → Spezifisches Styling nur in Tabelle */
```

**Spezifität:**

```css
/* Spezifität-Wert: */
.fav-btn {
  /* 0, 0, 1, 0 (eine Klasse) */
}

main .fav-btn {
  /* 0, 0, 1, 1 (Element + Klasse) */
  /* → Höhere Spezifität
     → Überschreibt .fav-btn */
}
```

##### padding: 0

```css
padding: 0;
```

**Warum padding entfernen?**

```css
/* Milligram Button hat Standard-Padding: */
.button {
  padding: 11px 15px; /* Milligram-Default */
}

/* Problem für Icon-Button:
   Padding macht Button unnötig groß */

/* Lösung: */
main .fav-btn {
  padding: 0; /* Kein Padding */
}
/* → Button ist so groß wie Icon (24×24px) */
```

**Visueller Vergleich:**

```
Mit Padding (Standard):
┌───────────────┐
│               │
│   ♥ Icon      │
│               │
└───────────────┘
(zu groß für Tabelle)

Ohne Padding (padding: 0):
┌──────┐
│  ♥   │
└──────┘
(kompakt, passt in Tabellenzelle)
```

##### margin-bottom: -45px (negativer Margin!)

```css
margin-bottom: -45px;
```

**Was macht negativer Margin?**

```css
/* Positiver Margin: */
margin-bottom: 20px;
/* → Element schiebt folgende Elemente nach unten */

/* Negativer Margin: */
margin-bottom: -45px;
/* → Element zieht folgende Elemente nach oben
   → Überlappung! */
```

**Visueller Effekt:**

```
Ohne negativen Margin:
┌──────────┐
│ Button   │
└──────────┘
     ↓ 10px normaler Abstand
┌──────────┐
│ Nächste  │
│ Zeile    │
└──────────┘

Mit margin-bottom: -45px:
┌──────────┐
│ Button   │
└──────────┘
     ↓ -45px (überlappend)
┌──────────┐
│ Nächste  │  ← 45px nach oben verschoben
│ Zeile    │
└──────────┘
```

**Warum -45px?**

```css
/* Kontext: Tabelle mit Button

   HTML: */
<tr>
  <td>
    <button class="fav-btn">
      <svg>Icon</svg>
    </button>
  </td>
</tr>

/* Problem:
   Button hat Höhe (z.B. 50px)
   Tablenzelle wird zu hoch

   Lösung:
   margin-bottom: -45px;
   → Button "überlappen" lassen
   → Tabellenzelle bleibt kompakt */
```

**Best Practice?**

```css
/* Negativer Margin ist oft ein "Hack"
   Besser: */
.fav-btn {
  padding: 0;
  height: auto; /* Automatische Höhe */
  min-height: 0; /* Keine Mindesthöhe */
}

/* Oder: */
.fav-btn {
  padding: 5px; /* Kleines Padding */
}

/* Aber: Funktioniert hier offenbar */
```

---

#### 10. Favoriten-SVG-Icon

```css
.fav {
  width: 100%;
  height: 100%;
}
```

**HTML-Kontext:**

```html
<button class="button button-clear fav-btn">
  <svg class="fav" ...>
    <!-- SVG-Pfade -->
  </svg>
</button>
```

##### width/height: 100%

```css
width: 100%;
height: 100%;
```

**Was bedeutet 100%?**

```css
/* 100% = Volle Größe des Eltern-Elements

   Eltern: <button class="fav-btn">
   Kind: <svg class="fav"> */

/* SVG füllt Button komplett aus: */
┌──────────────┐
│ ┌──────────┐ │ ← Button
│ │   SVG    │ │ ← SVG (100% von Button)
│ └──────────┘ │
└──────────────┘
```

**Warum nicht feste Größe?**

```css
/* Feste Größe: */
.fav {
  width: 24px;
  height: 24px;
}
/* ❌ Icon hat feste Größe
   ❌ Skaliert nicht mit Button */

/* Relative Größe (verwendet): */
.fav {
  width: 100%;
  height: 100%;
}
/* ✅ Icon skaliert mit Button
   ✅ Flexibler */

/* Aber: Button muss Größe haben! */
```

**Button-Größe:**

```html
<!-- SVG hat viewBox: -->
<svg class="fav" viewBox="0 0 24 24">
  <!-- Definiert intrinsische Größe 24×24 -->
</svg>

<!-- Mit width/height: 100% wird SVG so groß wie Button
     Button-Größe kommt von:
     - padding (entfernt via padding: 0)
     - SVG viewBox (24×24)
     → Button ist 24×24px -->
```

---

#### 11. Erste Tabellenspalte

```css
.first-col {
  width: 5%;
}
```

**HTML-Kontext:**

```html
<table>
  <thead>
    <tr>
      <th class="first-col"></th>
      <!-- Leerer Header -->
      <th>Title</th>
      <th>ISBN</th>
      <th>Author</th>
      <th>Publisher</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="first-col">
        <!-- Favoriten-Button -->
        <button class="fav-btn">♥</button>
      </td>
      <td>Angular</td>
      <td>9783864907791</td>
      <td>Ferdinand Malcher, ...</td>
      <td>dpunkt.verlag GmbH</td>
      <td>
        <a href="detail.html?isbn=...">Detail</a>
      </td>
    </tr>
  </tbody>
</table>
```

##### width: 5%

```css
width: 5%;
```

**Warum nur 5%?**

```css
/* Tabellenspalten:
   1. Favoriten-Icon: 5% (sehr schmal)
   2. Title: Auto (flexibel, nimmt Rest)
   3. ISBN: Auto
   4. Author: Auto
   5. Publisher: Auto
   6. Detail-Button: Auto (schmal)
   
   5% ist minimal, nur für Icon */
```

**Visuell:**

```
┌─┬─────────────┬──────────┬──────────┬──────────┬──────┐
│♥│ Title       │ ISBN     │ Author   │Publisher │Detail│
└─┴─────────────┴──────────┴──────────┴──────────┴──────┘
 ↑
5% (nur für Icon)
```

**Responsive Probleme:**

```css
/* Problem auf schmalen Bildschirmen:
   width: 5%;
   → Kann zu schmal sein für Touch-Targets */

/* Besser: Mindestbreite */
.first-col {
  width: 5%;
  min-width: 40px; /* Mindestens 40px für Touch */
}

/* Oder: Feste Breite */
.first-col {
  width: 40px;
}
```

---

#### CSS-Zusammenfassung

**Struktur:**

```css
/* 1. Variablen */
:root { --primary, --secondary }

/* 2. Layout */
.header { background, padding, margin }
.logo { font-weight, font-size }

/* 3. Navigation */
.mainnav { display: flex, justify-content }
.mainnav-link { margin, line-height, color, border-bottom }
.mainnav-link:hover { color }
.mainnav-link.mainnav-link--active { color, border-bottom-color }
.mainnav-number { background, color, padding, border-radius }

/* 4. Favoriten */
main .fav-btn { padding, margin-bottom (negativ!) }
.fav { width, height }

/* 5. Tabelle */
.first-col { width }
```

**Wichtige CSS-Konzepte:**

✅ **Custom Properties** - Wiederverwendbare Variablen (`:root`)
✅ **Flexbox** - Moderne Layout-Methode (`display: flex`)
✅ **Pseudo-Klassen** - Zustände (`:hover`, `:active`)
✅ **BEM-Naming** - Strukturierte Klassennamen (`--active`)
✅ **Shorthand-Properties** - Kompakte Schreibweise (`margin: 0 10px`)
✅ **Relative Einheiten** - `rem` für Skalierbarkeit
✅ **Selektoren** - Klassen, Nachfahren, verkettete Klassen
✅ **Border-Trick** - `transparent` für konsistente Höhe
✅ **Negativer Margin** - Überlappung (-45px)
✅ **Prozent-Größen** - Responsive Spalten (5%, 100%)

**Best Practices umgesetzt:**

✅ **CSS-Variablen** - Zentrale Farbdefinition
✅ **Flexbox** - Moderne Navigation-Ausrichtung
✅ **Hover-Effekte** - Bessere UX
✅ **Aktiv-Zustand** - Visuelle Orientierung
✅ **Kompakte Icons** - padding: 0 für Icon-Buttons
✅ **Responsive Einheiten** - rem statt px

**Verbesserungsmöglichkeiten:**

💡 **:focus unterstützen** - Für Tastatur-Navigation
💡 **Transitions** - Sanfte Hover-Effekte
💡 **Media Queries** - Responsive Anpassungen
💡 **min-width für .first-col** - Touch-Targets
💡 **Bessere Icon-Button-Höhe** - Statt negativem Margin
💡 **CSS Grid** - Alternative zu Flexbox für komplexe Layouts

**CSS-Tricks erklärt:**

```css
/* 1. Transparent Border-Trick: */
border-bottom: 3px solid transparent; /* Platzhalter */
border-bottom-color: var(--primary); /* Nur Farbe ändern */
/* → Höhe bleibt gleich */

/* 2. Flexbox-Ausrichtung: */
display: flex;
justify-content: flex-end;
/* → Navigation rechts */

/* 3. Vertikale Zentrierung: */
line-height: 4.7rem; /* = Container-Höhe */
/* → Text mittig */

/* 4. Badge-Design: */
border-radius: 50%; /* Runde Form */
padding: 0 5px; /* Kompakt */
/* → Moderne Badge */

/* 5. Icon-Button: */
padding: 0; /* Kein Padding */
margin-bottom: -45px; /* Überlappung */
/* → Kompakter Button in Tabelle */
```

Diese CSS-Datei zeigt **moderne CSS-Techniken** und erweitert das Milligram-Framework um **benutzerdefiniertes Styling** für die spezifischen Anforderungen der IT Book Library!

---

## Wichtige Konzepte für Anfänger

### 1. Was ist TypeScript?

TypeScript ist eine **Programmiersprache**, die auf JavaScript aufbaut und **statische Typen** hinzufügt. TypeScript wurde von Microsoft entwickelt und ist eine **Erweiterung von JavaScript** – jeder gültige JavaScript-Code ist auch gültiger TypeScript-Code.

#### Was bedeutet "statische Typen"?

In JavaScript kennt eine Variable **keinen festen Typ**:

```javascript
// JavaScript (ohne Typen):
let name = "Angular"; // String
name = 42; // Jetzt eine Zahl - kein Fehler!
name = true; // Jetzt ein Boolean - auch kein Fehler!
name.toUpperCase(); // ❌ RUNTIME ERROR: toUpperCase is not a function
```

**Problem:** Der Fehler wird erst **zur Laufzeit** entdeckt (wenn der Code ausgeführt wird).

In TypeScript wird der Typ **beim Schreiben des Codes** festgelegt:

```typescript
// TypeScript (mit Typen):
let name: string = "Angular"; // name ist vom Typ string
name = 42; // ❌ COMPILE ERROR: Type 'number' is not assignable to type 'string'
name = true; // ❌ COMPILE ERROR
name.toUpperCase(); // ✅ OK - TypeScript weiß: name ist string
```

**Vorteil:** Fehler werden **beim Kompilieren** entdeckt (bevor der Code ausgeführt wird).

---

#### Warum TypeScript statt JavaScript?

**JavaScript-Probleme:**

```javascript
// JavaScript:
function add(a, b) {
  return a + b;
}

add(5, 10); // 15 ✅
add("5", "10"); // "510" ❌ (String-Konkatenation statt Addition)
add(5); // NaN ❌ (b ist undefined)
add(5, 10, 20); // 15 (20 wird ignoriert)
```

**Keine Fehler-Meldungen!** JavaScript führt einfach aus und produziert unerwartete Ergebnisse.

**TypeScript-Lösung:**

```typescript
// TypeScript:
function add(a: number, b: number): number {
  return a + b;
}

add(5, 10); // 15 ✅
add("5", "10"); // ❌ COMPILE ERROR: Argument of type 'string' is not assignable to parameter of type 'number'
add(5); // ❌ COMPILE ERROR: Expected 2 arguments, but got 1
add(5, 10, 20); // ❌ COMPILE ERROR: Expected 2 arguments, but got 3
```

**TypeScript erkennt alle Fehler beim Kompilieren!**

---

#### TypeScript-Vorteile im Überblick

| Aspekt                | JavaScript     | TypeScript                |
| --------------------- | -------------- | ------------------------- |
| **Fehler-Erkennung**  | Zur Laufzeit   | Beim Kompilieren          |
| **Typsicherheit**     | Keine          | Ja                        |
| **IDE-Unterstützung** | Begrenzt       | Excellent (Auto-Complete) |
| **Refactoring**       | Riskant        | Sicher                    |
| **Dokumentation**     | Extern nötig   | Im Code (Typen)           |
| **Team-Arbeit**       | Fehleranfällig | Typ-Verträge              |

**Beispiele:**

**1. Auto-Complete (IntelliSense):**

```typescript
// TypeScript weiß, welche Methoden string hat:
let title: string = "Angular";
title.  // IDE zeigt: toUpperCase(), toLowerCase(), substring(), ...
        // ✅ Entwickler sieht alle Möglichkeiten

// JavaScript:
let title = "Angular";
title.  // IDE weiß nicht, was title ist
        // ❌ Keine oder ungenaue Vorschläge
```

**2. Refactoring:**

```typescript
// Umbenennen einer Funktion:
function calculateTotal(price: number): number {
  return price * 1.19;
}

// Alle Aufrufe können sicher umbenannt werden
calculateTotal(100); // IDE findet alle Stellen

// In JavaScript: Suchen & Ersetzen kann andere Dinge treffen
```

**3. Dokumentation:**

```typescript
// TypeScript:
interface Book {
  title: string;
  author: string;
  isbn: string;
}

function displayBook(book: Book): void {
  // book. → IDE zeigt: title, author, isbn
  // Typen dokumentieren den Code!
}

// JavaScript:
function displayBook(book) {
  // Was ist book? Welche Eigenschaften hat es?
  // → Externe Dokumentation nötig
}
```

---

#### Grundlegende TypeScript-Typen

TypeScript bietet viele **primitive Typen**:

```typescript
// Primitive Typen:
let isDone: boolean = false; // true/false
let count: number = 42; // Zahlen (int, float, ...)
let name: string = "Angular"; // Text
let items: any = "alles möglich"; // Beliebiger Typ (vermeiden!)
let nothing: void = undefined; // Kein Rückgabewert
let empty: null = null; // Null
let notDefined: undefined = undefined; // Undefined

// Arrays:
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Anna", "Bob", "Charlie"];

// Tupel (feste Länge und Typen):
let tuple: [string, number] = ["Angular", 5];

// Enum (Aufzählung):
enum Color {
  Red,
  Green,
  Blue,
}
let color: Color = Color.Red;

// Union Types (mehrere Typen):
let value: string | number = "text";
value = 42; // ✅ Auch OK

// Literal Types:
let direction: "left" | "right" | "up" | "down" = "left";
direction = "right"; // ✅ OK
direction = "diagonal"; // ❌ ERROR
```

---

#### Typen in diesem Projekt

**1. Primitive Typen:**

```typescript
// In types.ts:
interface Book {
  isbn: string; // ← string
  title: string; // ← string
  author: string; // ← string
  publisher: string; // ← string
  subtitle?: string; // ← string | undefined (optional)
  abstract?: string; // ← string | undefined
  numPages?: number; // ← number | undefined
}
```

**2. Interface-Typen:**

```typescript
// types.ts:
interface Publisher {
  name: string;
  url: string;
}

interface Book {
  // ...
  publisher: Publisher; // ← Verschachtelter Typ
}

// Verwendung:
const book: Book = {
  isbn: "123",
  title: "Angular",
  author: "Max",
  publisher: {
    name: "dpunkt",
    url: "https://...",
  },
};
```

**3. Array-Typen:**

```typescript
// In index.ts:
let books: Book[] = []; // Array von Book-Objekten

// Alternative Schreibweise:
let books: Array<Book> = [];
```

**4. DOM-Typen:**

```typescript
// TypeScript kennt DOM-Typen:
const input: HTMLInputElement = document.querySelector(
  "#search"
) as HTMLInputElement;
const table: HTMLTableElement = document.querySelector(
  "table"
) as HTMLTableElement;
const button: HTMLButtonElement = document.querySelector(
  "button"
) as HTMLButtonElement;

// Mit Typen weiß TypeScript, welche Eigenschaften existieren:
input.value; // ✅ OK - HTMLInputElement hat .value
input.innerHTML; // ❌ ERROR - HTMLInputElement hat kein .innerHTML
table.innerHTML; // ✅ OK - HTMLTableElement hat .innerHTML
```

**5. Function-Typen:**

```typescript
// Funktion mit Typ-Annotations:
function fetchBooks(): Promise<Book[]> {
  // Gibt Promise zurück, das Book-Array enthält
  return fetch(API_URL + "/books").then((response) => response.json());
}

// Arrow Function:
const renderBooks = (books: Book[]): void => {
  // Parameter: Book-Array
  // Rückgabe: void (nichts)
  books.forEach((book) => {
    // book ist vom Typ Book
    console.log(book.title); // ✅ TypeScript weiß: book hat .title
  });
};
```

**6. Type Assertion (Typ-Behauptung):**

```typescript
// TypeScript weiß nicht, welches Element zurückkommt:
const element = document.querySelector("#search");
// element ist vom Typ: Element | null

// Type Assertion sagt: "Ich weiß, es ist ein HTMLInputElement"
const input = document.querySelector("#search") as HTMLInputElement;
// input ist vom Typ: HTMLInputElement

// Jetzt funktioniert:
input.value = "Angular"; // ✅ OK

// Ohne Assertion:
element.value = "Angular"; // ❌ ERROR: Property 'value' does not exist on type 'Element'
```

---

#### Optional Properties (Optionale Eigenschaften)

```typescript
// Mit ? markierte Eigenschaften sind optional:
interface Book {
  isbn: string; // Pflichtfeld
  title: string; // Pflichtfeld
  subtitle?: string; // Optional (kann undefined sein)
  abstract?: string; // Optional
  numPages?: number; // Optional
}

// Gültige Book-Objekte:
const book1: Book = {
  isbn: "123",
  title: "Angular",
  // subtitle, abstract, numPages fehlen - ✅ OK
};

const book2: Book = {
  isbn: "456",
  title: "React",
  subtitle: "A JavaScript library",
  numPages: 200,
  // abstract fehlt - ✅ OK
};

const book3: Book = {
  isbn: "789",
  title: "Vue",
  // ❌ ERROR: Property 'author' is missing
};
```

**Verwendung mit optional chaining:**

```typescript
// Ohne optional chaining:
if (book.subtitle) {
  console.log(book.subtitle.toUpperCase());
}

// Mit optional chaining:
console.log(book.subtitle?.toUpperCase());
// Falls subtitle undefined ist: undefined (kein Fehler)

// Nullish coalescing:
const pages = book.numPages ?? "N/A";
// Falls numPages undefined/null: "N/A"
```

---

#### Union Types (Vereinigungs-Typen)

```typescript
// Variable kann mehrere Typen haben:
let value: string | number;
value = "Text"; // ✅ OK
value = 42; // ✅ OK
value = true; // ❌ ERROR

// Nützlich für Funktionen:
function printId(id: string | number): void {
  console.log("ID:", id);
}

printId("abc123"); // ✅ OK
printId(123); // ✅ OK
printId(true); // ❌ ERROR

// Type Narrowing (Typ-Eingrenzung):
function processValue(value: string | number): void {
  if (typeof value === "string") {
    // Hier weiß TypeScript: value ist string
    console.log(value.toUpperCase());
  } else {
    // Hier weiß TypeScript: value ist number
    console.log(value.toFixed(2));
  }
}
```

---

#### Type Inference (Typ-Inferenz)

TypeScript kann Typen **automatisch ableiten**:

```typescript
// Explizite Typ-Annotation:
let name: string = "Angular";

// Typ-Inferenz (TypeScript erkennt Typ):
let name = "Angular"; // TypeScript weiß: name ist string
name = 42; // ❌ ERROR: Type 'number' is not assignable to type 'string'

// Bei Funktionen:
function add(a: number, b: number) {
  return a + b; // TypeScript inferiert Rückgabe-Typ: number
}

const result = add(5, 10); // result ist number
result.toFixed(2); // ✅ OK
result.toUpperCase(); // ❌ ERROR
```

**Best Practice:**

```typescript
// Einfache Fälle: Inferenz nutzen
let count = 0; // Klar, dass es number ist

// Komplexe Fälle: Explizite Typen
function fetchBooks(): Promise<Book[]> {
  // ← Explizit für Klarheit
  return fetch(API_URL).then((r) => r.json());
}

// Parameter: Immer explizit
function processBook(book: Book): void {
  // ← Pflicht für Parameter
  // ...
}
```

---

#### Typen vs. Interfaces

TypeScript bietet **zwei Wege** für Objekt-Typen:

```typescript
// Mit Interface (verwendet in diesem Projekt):
interface Book {
  isbn: string;
  title: string;
}

// Mit Type Alias:
type Book = {
  isbn: string;
  title: string;
};
```

**Unterschiede:**

| Feature                 | Interface        | Type                    |
| ----------------------- | ---------------- | ----------------------- |
| **Erweiterung**         | `extends`        | `&` (Intersection)      |
| **Declaration Merging** | Ja               | Nein                    |
| **Union Types**         | Nein             | Ja                      |
| **Verwendung**          | Objekte, Klassen | Alles (auch Primitives) |

**Beispiele:**

```typescript
// Interface erweitern:
interface Book {
  isbn: string;
  title: string;
}

interface EBook extends Book {
  fileFormat: string; // Zusätzliche Eigenschaft
}

// Type mit Intersection:
type Book = {
  isbn: string;
  title: string;
};

type EBook = Book & {
  fileFormat: string;
};

// Declaration Merging (nur Interface):
interface Book {
  isbn: string;
}

interface Book {
  title: string; // Wird zusammengeführt
}

// Ergebnis: Book hat isbn UND title

// Union Types (nur Type):
type Status = "loading" | "success" | "error";
type Result = Book | Error;
```

**Best Practice:** Für Objekte → Interface (wie in diesem Projekt)

---

#### any vs. unknown vs. never

```typescript
// any: Beliebiger Typ (Typ-Prüfung wird deaktiviert)
let value: any = "text";
value = 42;
value = true;
value.toUpperCase(); // ✅ Kein Fehler (aber Runtime-Error möglich!)
// ❌ Vermeiden - macht TypeScript nutzlos

// unknown: Typ ist unbekannt (sicherer als any)
let value: unknown = "text";
value.toUpperCase(); // ❌ ERROR - Typ muss erst geprüft werden

if (typeof value === "string") {
  value.toUpperCase(); // ✅ OK - Typ wurde geprüft
}

// never: Typ, der nie auftritt
function throwError(message: string): never {
  throw new Error(message);
  // Funktion gibt nie zurück (wirft immer Error)
}

function infiniteLoop(): never {
  while (true) {
    // Endlosschleife - gibt nie zurück
  }
}
```

---

#### Generics (Generische Typen)

Generics ermöglichen **flexible, wiederverwendbare Typen**:

```typescript
// Ohne Generics:
function getFirstString(arr: string[]): string {
  return arr[0];
}

function getFirstNumber(arr: number[]): number {
  return arr[0];
}

// Mit Generics:
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// Verwendung:
const firstString = getFirst<string>(["a", "b", "c"]); // string
const firstNumber = getFirst<number>([1, 2, 3]); // number
const firstBook = getFirst<Book>([book1, book2]); // Book

// TypeScript inferiert oft den Generic-Typ:
const first = getFirst([1, 2, 3]); // TypeScript erkennt: number[]
```

**Generics in diesem Projekt:**

```typescript
// Array ist ein Generic:
let books: Array<Book> = [];
// = books: Book[]

// Promise ist ein Generic:
async function fetchBooks(): Promise<Book[]> {
  // Promise<Book[]> bedeutet: Promise, das Book[] enthält
  const response = await fetch(API_URL);
  return response.json(); // Rückgabe: Book[]
}

// fetch gibt Promise<Response> zurück:
fetch(API_URL) // Promise<Response>
  .then((r) => r.json()); // Promise<any> (leider kein Typ)
```

---

#### Zusammenfassung

**TypeScript ist JavaScript mit Typen:**

```typescript
// JavaScript:
function add(a, b) {
  return a + b;
}

// TypeScript:
function add(a: number, b: number): number {
  return a + b;
}
```

**Hauptvorteile:**

✅ **Fehler beim Kompilieren** statt zur Laufzeit
✅ **Auto-Complete** in IDE (IntelliSense)
✅ **Sicheres Refactoring**
✅ **Selbst-dokumentierender Code** (Typen = Dokumentation)
✅ **Bessere Teamarbeit** (Typ-Verträge)
✅ **Weniger Bugs** in Produktion

**In diesem Projekt:**

- **Interfaces** für Book und Publisher (`types.ts`)
- **Typ-Annotationen** für Funktionen und Variablen
- **DOM-Typen** für HTML-Elemente (`HTMLInputElement`, etc.)
- **Array-Typen** für Buch-Listen (`Book[]`)
- **Promise-Typen** für asynchrone Operationen (`Promise<Book[]>`)
- **Optional Properties** für optionale Buch-Eigenschaften (`subtitle?`)

**Wichtig für Anfänger:**

🎯 TypeScript schreibt sich fast wie JavaScript – nur mit Typen
🎯 Typen helfen, Fehler früh zu finden
🎯 IDE wird viel hilfreicher (Auto-Complete!)
🎯 Typen sind Dokumentation im Code

**Nächster Schritt:** TypeScript-Code muss zu JavaScript **kompiliert** werden → Siehe Abschnitt "Kompilierung"

### 2. Kompilierung

**Kompilierung** ist der Prozess, bei dem **TypeScript-Code in JavaScript-Code umgewandelt** wird. Browser können TypeScript nicht direkt ausführen – nur JavaScript. Deshalb muss TypeScript zuerst **kompiliert** (übersetzt) werden.

#### Warum muss TypeScript kompiliert werden?

**Browser verstehen nur JavaScript:**

```typescript
// TypeScript-Code (browser.ts):
const name: string = "Angular";
const version: number = 17;

interface Book {
  title: string;
  author: string;
}

const book: Book = {
  title: "TypeScript Basics",
  author: "Max Mustermann",
};
```

**Browser sagt:**

```
❌ SyntaxError: Unexpected token ':'
❌ Browser versteht keine Typen (: string, : number, interface)
```

**Lösung: Kompilierung zu JavaScript:**

```javascript
// Kompiliertes JavaScript (browser.js):
const name = "Angular";
const version = 17;

const book = {
  title: "TypeScript Basics",
  author: "Max Mustermann",
};

// ✅ Typen wurden entfernt
// ✅ Interface wurde entfernt
// ✅ Browser kann diesen Code ausführen
```

---

#### Der TypeScript-Compiler (tsc)

Der **TypeScript-Compiler** heißt `tsc` (TypeScript Compiler).

**Installation:**

```powershell
# Global installieren:
npm install -g typescript

# Im Projekt installieren (wie hier):
npm install --save-dev typescript

# Version prüfen:
npx tsc --version
# Output: Version 5.9.3
```

**Verwendung:**

```powershell
# Einzelne Datei kompilieren:
npx tsc index.ts
# Erstellt: index.js

# Alle Dateien im Projekt kompilieren:
npx tsc
# Verwendet tsconfig.json
```

---

#### Der Kompilierungsprozess

**Schritt-für-Schritt:**

```
1. TypeScript-Quellcode schreiben
   ├─ src/index.ts
   ├─ src/types.ts
   └─ src/favorite.ts

2. TypeScript-Compiler ausführen
   npm run build
   → npx tsc

3. Compiler liest tsconfig.json
   - Welche Dateien?
   - Welche Compiler-Optionen?
   - Wohin mit den Ausgabedateien?

4. Compiler prüft Typen
   ✅ Alle Typen korrekt?
   ❌ Fehler gefunden → Kompilierung stoppt

5. Compiler generiert JavaScript
   ├─ dist/index.js
   ├─ dist/types.js
   └─ dist/favorite.js

6. HTML lädt JavaScript
   <script src="../dist/index.js"></script>

7. Browser führt JavaScript aus
   ✅ Code läuft im Browser
```

---

#### Compiler-Optionen (tsconfig.json)

Die Datei `tsconfig.json` steuert den Compiler:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFilenames": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**Wichtige Optionen erklärt:**

##### target

```json
"target": "ES2020"
```

**Was macht target?**

Gibt an, **welche JavaScript-Version** generiert werden soll.

```typescript
// TypeScript-Code:
const greet = (name: string): string => `Hello, ${name}!`;
```

**Mit target: ES5 (alt):**

```javascript
// Kompiliertes JavaScript (ES5):
var greet = function (name) {
  return "Hello, " + name + "!";
};

// ❌ const → var
// ❌ Arrow Function → function
// ❌ Template Literal → String-Konkatenation
```

**Mit target: ES2020 (modern):**

```javascript
// Kompiliertes JavaScript (ES2020):
const greet = (name) => `Hello, ${name}!`;

// ✅ const bleibt
// ✅ Arrow Function bleibt
// ✅ Template Literal bleibt
```

**Verfügbare Targets:**

```
ES3    → Internet Explorer 8 (sehr alt)
ES5    → Internet Explorer 11
ES6    → Moderne Browser (2015)
ES2016 → Noch moderner
ES2017 → async/await
ES2018 → ...
ES2019 → ...
ES2020 → Optional Chaining (?.), Nullish Coalescing (??)
ES2021 → ...
ES2022 → ...
ESNext → Neueste Features
```

**Best Practice:**

```json
// Für moderne Browser:
"target": "ES2020"

// Für maximale Kompatibilität:
"target": "ES5"

// In diesem Projekt: ES2020
// → Unterstützt alle modernen Features
// → Browser ab ca. 2020
```

##### module

```json
"module": "ES2020"
```

**Was macht module?**

Gibt an, **welches Modul-System** verwendet werden soll.

**Modul-Systeme:**

```javascript
// ES2020 (ESM - ES Modules):
import { Book } from "./types";
export const books: Book[] = [];

// CommonJS (Node.js):
const { Book } = require("./types");
module.exports = { books: [] };

// AMD (RequireJS):
define(["./types"], function (types) {
  return { books: [] };
});

// UMD (Universal Module Definition):
// Funktioniert überall
```

**In diesem Projekt:**

```json
"module": "ES2020"
```

**Bedeutet:**

```typescript
// TypeScript bleibt so:
import type { Book, Publisher } from "./types";
export const API_URL = "...";

// JavaScript bleibt auch so:
import { Book, Publisher } from "./types";
export const API_URL = "...";

// ✅ Browser verstehen ES Modules (mit type="module")
```

**HTML-Integration:**

```html
<!-- Ohne Module: -->
<script src="index.js"></script>
<!-- ❌ Browser versteht kein import/export -->

<!-- Mit Module: -->
<script type="module" src="index.js"></script>
<!-- ✅ Browser versteht ES Modules -->
```

##### outDir

```json
"outDir": "./dist"
```

**Was macht outDir?**

Gibt an, **wohin die kompilierten JavaScript-Dateien** gespeichert werden.

```
Projekt-Struktur:

src/                    dist/
  ├─ index.ts    →      ├─ index.js
  ├─ types.ts    →      ├─ types.js
  └─ favorite.ts →      └─ favorite.js

        ↑ Kompilierung ↑

TypeScript-Quellcode → JavaScript-Ausgabe
```

**Ohne outDir:**

```
src/
  ├─ index.ts
  ├─ index.js      ← Neben Quellcode (unordentlich)
  ├─ types.ts
  └─ types.js
```

**Mit outDir: "./dist":**

```
src/              dist/
  ├─ index.ts       ├─ index.js     ← Sauber getrennt
  ├─ types.ts       ├─ types.js
  └─ favorite.ts    └─ favorite.js
```

##### rootDir

```json
"rootDir": "./src"
```

**Was macht rootDir?**

Gibt an, **wo die TypeScript-Quellcode-Dateien liegen**.

**Zusammenspiel mit outDir:**

```json
{
  "rootDir": "./src",
  "outDir": "./dist"
}
```

**Verzeichnis-Struktur wird beibehalten:**

```
src/                        dist/
  ├─ index.ts        →        ├─ index.js
  ├─ types.ts        →        ├─ types.js
  └─ utils/          →        └─ utils/
      └─ helper.ts   →            └─ helper.js

Die Struktur bleibt gleich!
```

**Ohne rootDir:**

```typescript
// Wenn TypeScript-Dateien überall liegen:
project/
  ├─ index.ts
  ├─ src/
  │   └─ types.ts
  └─ utils/
      └─ helper.ts

// Kompilierung:
dist/
  ├─ index.js           ← Flache Struktur
  ├─ src/
  │   └─ types.js
  └─ utils/
      └─ helper.js
```

##### strict

```json
"strict": true
```

**Was macht strict?**

Aktiviert **alle strengen Typ-Prüfungen**. Dies ist eine "Master"-Option, die mehrere Optionen gleichzeitig aktiviert:

```json
// "strict": true aktiviert automatisch:
{
  "noImplicitAny": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "strictBindCallApply": true,
  "strictPropertyInitialization": true,
  "noImplicitThis": true,
  "alwaysStrict": true
}
```

**Beispiele:**

**1. noImplicitAny:**

```typescript
// strict: false (erlaubt):
function add(a, b) {
  // a und b haben implizit Typ 'any'
  return a + b;
}

// strict: true (Fehler):
function add(a, b) {
  // ❌ Parameter 'a' implicitly has an 'any' type
  return a + b;
}

// Lösung:
function add(a: number, b: number): number {
  return a + b;
}
```

**2. strictNullChecks:**

```typescript
// strict: false (erlaubt):
let name: string = null;
// ✅ Kein Fehler (aber gefährlich!)

// strict: true (Fehler):
let name: string = null;
// ❌ Type 'null' is not assignable to type 'string'

// Lösung:
let name: string | null = null; // Explizit erlauben
```

**3. strictFunctionTypes:**

```typescript
// Überprüft Funktions-Parameter strenger
interface Handler {
  (value: string | number): void;
}

const handler: Handler = (value: string) => {
  // ❌ strict: true verbietet dies (zu restriktiv)
};
```

**Best Practice:**

```json
// Immer strict: true verwenden!
"strict": true
```

**Vorteile:**

✅ Fängt mehr Fehler beim Kompilieren
✅ Erzwingt saubereren Code
✅ Verhindert null/undefined-Fehler
✅ Bessere Typ-Sicherheit

**In diesem Projekt:**

```json
"strict": true
```

→ Maximale Typ-Sicherheit!

##### include / exclude

```json
"include": ["src/**/*"],
"exclude": ["node_modules"]
```

**Was machen include/exclude?**

Geben an, **welche Dateien kompiliert werden** sollen.

**include:**

```json
"include": ["src/**/*"]
```

**Bedeutung:**

```
src/**/*
│   │  │
│   │  └─ * = Alle Dateien
│   └──── ** = Alle Unterverzeichnisse (rekursiv)
└──────── src = Verzeichnis

Kompiliert:
✅ src/index.ts
✅ src/types.ts
✅ src/utils/helper.ts
✅ src/components/button.ts
✅ Alle .ts-Dateien in src/ und Unterordnern

Ignoriert:
❌ test/test.ts (nicht in src/)
❌ docs/example.ts (nicht in src/)
```

**exclude:**

```json
"exclude": ["node_modules"]
```

**Bedeutung:**

```
Ignoriert:
❌ node_modules/ (alle npm-Pakete)
❌ node_modules/typescript/lib/typescript.ts

Warum?
→ npm-Pakete sind bereits kompiliert
→ Würde Kompilierung verlangsamen
→ Keine Änderungen nötig
```

**Weitere Beispiele:**

```json
{
  "include": [
    "src/**/*", // Alle Dateien in src/
    "types/**/*" // Alle Dateien in types/
  ],
  "exclude": [
    "node_modules", // npm-Pakete
    "dist", // Ausgabe-Verzeichnis
    "**/*.spec.ts", // Test-Dateien
    "**/*.test.ts" // Test-Dateien
  ]
}
```

---

#### Kompilierung im Projekt

**package.json:**

```json
{
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch"
  }
}
```

**1. Build (einmalig kompilieren):**

```powershell
npm run build
```

**Was passiert:**

```
1. npm führt aus: npx tsc

2. tsc liest tsconfig.json:
   ├─ Kompiliere src/**/*
   ├─ Ziel: ES2020
   ├─ Module: ES2020
   └─ Ausgabe: dist/

3. tsc kompiliert:
   src/index.ts → dist/index.js
   src/types.ts → dist/types.js
   src/favorite.ts → dist/favorite.js
   src/detail.ts → dist/detail.js

4. Fertig! dist/ enthält JavaScript
```

**2. Watch (automatisch kompilieren):**

```powershell
npm run watch
```

**Was passiert:**

```
1. npm führt aus: npx tsc --watch

2. tsc kompiliert einmal (wie build)

3. tsc bleibt aktiv und überwacht Dateien

4. Bei Änderung:
   - Datei gespeichert: src/index.ts
   - tsc erkennt Änderung
   - tsc kompiliert neu: dist/index.js
   - Output: "File change detected. Starting incremental compilation..."

5. Entwickler kann sofort testen
   (kein manuelles "npm run build" nötig)
```

**Visuell:**

```
Watch-Modus:

Terminal 1:                Terminal 2:
┌────────────────┐        ┌────────────────┐
│ npm run watch  │        │ Editor         │
│                │        │                │
│ Watching...    │        │ Bearbeite:     │
│                │   ←──  │ src/index.ts   │
│ Kompiliere...  │        │                │
│ Success!       │   ──→  │ Speichern      │
│                │        │                │
│ Watching...    │        │ Test im Browser│
└────────────────┘        └────────────────┘
     ↑                           │
     └───────────────────────────┘
      Automatische Kompilierung!
```

---

#### Fehlerbehandlung beim Kompilieren

**Typ-Fehler:**

```typescript
// src/index.ts:
const count: number = "text";
```

**Kompilierung:**

```powershell
npm run build
```

**Output:**

```
src/index.ts:1:7 - error TS2322: Type 'string' is not assignable to type 'number'.

1 const count: number = "text";
        ~~~~~

Found 1 error in src/index.ts:1

❌ Kompilierung fehlgeschlagen
❌ Keine JavaScript-Dateien erstellt
```

**Lösung:**

```typescript
// Fehler beheben:
const count: number = 42; // ✅ Richtig

// Oder:
const count: string = "text"; // ✅ Typ anpassen
```

**Fehlende Eigenschaften:**

```typescript
// types.ts:
interface Book {
  isbn: string;
  title: string;
  author: string;
}

// index.ts:
const book: Book = {
  isbn: "123",
  title: "Angular",
  // author fehlt!
};
```

**Kompilierung:**

```
src/index.ts:3:7 - error TS2741: Property 'author' is missing in type '{ isbn: string; title: string; }' but required in type 'Book'.

3 const book: Book = {
        ~~~~

Found 1 error in src/index.ts:3

❌ Kompilierung fehlgeschlagen
```

**Lösung:**

```typescript
// Eigenschaft hinzufügen:
const book: Book = {
  isbn: "123",
  title: "Angular",
  author: "Ferdinand Malcher", // ✅ Jetzt vollständig
};

// Oder: Optional machen
interface Book {
  isbn: string;
  title: string;
  author?: string; // Optional
}
```

---

#### Source Maps

**Was sind Source Maps?**

Source Maps ermöglichen **Debugging von TypeScript im Browser**, obwohl der Browser JavaScript ausführt.

**Ohne Source Maps:**

```
Browser führt aus: dist/index.js (JavaScript)
Fehler in Zeile 42 von index.js

Developer Tools zeigen:
❌ index.js:42 (JavaScript-Code)
❌ Schwer zu debuggen (kompilierter Code)
```

**Mit Source Maps:**

```
Browser führt aus: dist/index.js (JavaScript)
Fehler in Zeile 42 von index.js

Developer Tools zeigen:
✅ src/index.ts:25 (TypeScript-Code)
✅ Einfach zu debuggen (Original-Code)
```

**Aktivieren:**

```json
// tsconfig.json:
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

**Kompilierung:**

```powershell
npm run build
```

**Ausgabe:**

```
dist/
  ├─ index.js        ← JavaScript
  ├─ index.js.map    ← Source Map (Mapping)
  ├─ types.js
  └─ types.js.map
```

**index.js.map enthält:**

```json
{
  "version": 3,
  "file": "index.js",
  "sourceRoot": "",
  "sources": ["../src/index.ts"],
  "mappings": "AAAA;AACA;AACA;..."
}
```

**Mapping:**

```
JavaScript (index.js)     TypeScript (index.ts)
Zeile 1, Spalte 5    →    Zeile 1, Spalte 5
Zeile 10, Spalte 12  →    Zeile 8, Spalte 8
...
```

**Browser nutzt Source Map automatisch:**

```javascript
// Browser lädt:
<script type="module" src="../dist/index.js"></script>

// Browser liest:
//# sourceMappingURL=index.js.map

// Browser lädt auch:
index.js.map

// Developer Tools zeigen:
✅ TypeScript-Code statt JavaScript
✅ Original-Zeilennummern
✅ Original-Dateinamen
```

---

#### Inkrementelle Kompilierung

TypeScript kompiliert nur **geänderte Dateien** (nicht alle):

**Erste Kompilierung (alle Dateien):**

```powershell
npm run build
```

```
Kompiliere:
  ├─ src/index.ts → dist/index.js
  ├─ src/types.ts → dist/types.js
  ├─ src/favorite.ts → dist/favorite.js
  └─ src/detail.ts → dist/detail.js

Zeit: 2 Sekunden
```

**Datei ändern:**

```typescript
// Ändere nur src/index.ts
```

**Zweite Kompilierung (nur geänderte Datei):**

```powershell
npm run build
```

```
Kompiliere:
  └─ src/index.ts → dist/index.js
     (types.ts, favorite.ts, detail.ts unverändert)

Zeit: 0.3 Sekunden ✅ Viel schneller!
```

**TypeScript speichert Info:**

```
node_modules/.cache/
  └─ typescript/
      └─ incremental-info
         (Welche Dateien wurden wann kompiliert?)
```

---

#### Zusammenfassung

**Kompilierung ist notwendig, weil:**

❌ Browser verstehen kein TypeScript
❌ Browser kennen keine Typen (: string, interface, etc.)
✅ Browser verstehen JavaScript
✅ Typen werden zu reinem JavaScript

**Der Prozess:**

```
1. TypeScript schreiben (src/*.ts)
2. Compiler ausführen (npm run build)
3. JavaScript generieren (dist/*.js)
4. HTML lädt JavaScript (<script src="dist/index.js">)
5. Browser führt JavaScript aus
```

**Wichtige Compiler-Optionen:**

| Option      | Bedeutung                | Wert in diesem Projekt |
| ----------- | ------------------------ | ---------------------- |
| **target**  | JavaScript-Version       | ES2020 (modern)        |
| **module**  | Modul-System             | ES2020 (ESM)           |
| **outDir**  | Ausgabe-Verzeichnis      | ./dist                 |
| **rootDir** | Quellcode-Verzeichnis    | ./src                  |
| **strict**  | Strenge Typ-Prüfung      | true (empfohlen)       |
| **include** | Zu kompilierende Dateien | src/\*_/_              |
| **exclude** | Zu ignorierende Dateien  | node_modules           |

**Scripts:**

```json
{
  "build": "tsc", // Einmalig kompilieren
  "watch": "tsc --watch" // Automatisch bei Änderungen
}
```

**Development-Workflow:**

```powershell
# Terminal 1: Watch-Modus starten
npm run watch

# Terminal 2: Development-Server starten
npm run dev
# oder
python -m http.server 3000

# Browser:
http://localhost:3000/src/index.html

# Änderungen in TypeScript werden automatisch kompiliert!
```

**Best Practices:**

✅ **strict: true** - Maximale Typ-Sicherheit
✅ **Watch-Modus** - Automatische Kompilierung während Entwicklung
✅ **Source Maps** - Debugging von TypeScript im Browser
✅ **outDir** - Trennung von Quellcode und Ausgabe
✅ **Klare Verzeichnis-Struktur** - src/ für TypeScript, dist/ für JavaScript

**Typische Fehler:**

❌ Vergessen zu kompilieren nach Änderungen
❌ HTML lädt TypeScript statt JavaScript
❌ Falsche Pfade (src/ statt dist/)
❌ strict: false (weniger Fehler-Erkennung)

**Nächster Schritt:** TypeScript verwendet **Module** (import/export) → Siehe Abschnitt "Module"

### 3. Module (import/export)

**Module** sind eine Möglichkeit, **Code in separate Dateien aufzuteilen** und zwischen diesen Dateien zu **teilen**. Statt alles in einer riesigen Datei zu schreiben, kann man Code in kleinere, wiederverwendbare Module organisieren.

#### Das Problem ohne Module

**Früher (ohne Module):**

```html
<!-- index.html -->
<script src="config.js"></script>
<script src="utils.js"></script>
<script src="types.js"></script>
<script src="index.js"></script>
```

```javascript
// config.js:
var API_URL = "https://api.angular.schule";

// utils.js:
function formatDate(date) {
  return date.toLocaleDateString();
}

// types.js:
// Keine echten Typen möglich

// index.js:
console.log(API_URL); // Nutzt globale Variable
formatDate(new Date()); // Nutzt globale Funktion
```

**Probleme:**

❌ **Globaler Namespace** - Alles ist global verfügbar
❌ **Namenskonflikte** - `var API_URL` kann überschrieben werden
❌ **Keine Abhängigkeiten** - Reihenfolge der Scripts wichtig
❌ **Kein Tree-Shaking** - Alles wird geladen (auch ungenutzt)
❌ **Schwer wartbar** - Unklare Abhängigkeiten

```javascript
// config.js:
var API_URL = "https://api.angular.schule";

// andere-datei.js:
var API_URL = "https://other.api"; // ❌ Überschreibt API_URL!

// index.js:
console.log(API_URL); // Welche URL? Unklar!
```

---

#### Die Lösung: ES Modules (ESM)

**Modern (mit ES Modules):**

```typescript
// config.ts:
export const API_URL = "https://api.angular.schule";

// utils.ts:
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// types.ts:
export interface Book {
  title: string;
  author: string;
}

// index.ts:
import { API_URL } from "./config";
import { formatDate } from "./utils";
import type { Book } from "./types";

console.log(API_URL);
const today = formatDate(new Date());
```

**Vorteile:**

✅ **Kein globaler Namespace** - Exports müssen importiert werden
✅ **Keine Namenskonflikte** - Jedes Modul ist isoliert
✅ **Klare Abhängigkeiten** - `import` zeigt, was benötigt wird
✅ **Tree-Shaking** - Ungenutzte Exports werden nicht geladen
✅ **Wartbar** - Klare Modul-Struktur

---

#### export - Code bereitstellen

Mit `export` macht man **Variablen, Funktionen, Klassen oder Typen** in anderen Dateien verfügbar.

##### Named Exports (Benannte Exports)

**Export beim Definieren:**

```typescript
// types.ts:
export interface Publisher {
  name: string;
  url: string;
}

export interface Book {
  isbn: string;
  title: string;
  author: string;
  publisher: Publisher;
}

export const MAX_BOOKS = 100;

export function validateISBN(isbn: string): boolean {
  return isbn.length === 13;
}
```

**Export nach Definition:**

```typescript
// config.ts:
const API_URL = "https://api.angular.schule";
const API_KEY = "secret123";

// Am Ende exportieren:
export { API_URL, API_KEY };
```

**Export mit Umbenennung:**

```typescript
// utils.ts:
function formatDateInternal(date: Date): string {
  return date.toLocaleDateString();
}

// Mit anderem Namen exportieren:
export { formatDateInternal as formatDate };
```

##### Default Export (Standard-Export)

**Nur ein Default-Export pro Datei:**

```typescript
// book.ts:
export default interface Book {
  isbn: string;
  title: string;
}

// Oder:
interface Book {
  isbn: string;
  title: string;
}
export default Book;
```

**Named vs Default Export:**

| Aspekt          | Named Export                     | Default Export               |
| --------------- | -------------------------------- | ---------------------------- |
| **Anzahl**      | Mehrere pro Datei                | Einer pro Datei              |
| **Syntax**      | `export const x`                 | `export default x`           |
| **Import**      | `import { x }`                   | `import x`                   |
| **Umbenennung** | Beim Import: `import { x as y }` | Automatisch: `import myName` |

**Beispiel:**

```typescript
// types.ts (Named Exports):
export interface Book {}
export interface Publisher {}

// import:
import { Book, Publisher } from "./types";

// book-class.ts (Default Export):
export default class Book {}

// import:
import Book from "./book-class";
import MyBook from "./book-class"; // ✅ Beliebiger Name
```

**Best Practice:**

```typescript
// ✅ Verwende Named Exports (wie in diesem Projekt):
export interface Book {}
export const API_URL = "...";

// Warum?
// → Konsistente Namen
// → Bessere IDE-Unterstützung
// → Refactoring-sicherer

// ❌ Default Exports nur für Hauptkomponente:
// React-Komponenten, Klassen, etc.
```

---

#### import - Code verwenden

Mit `import` holt man **exportierte Werte** aus anderen Modulen.

##### Named Imports

```typescript
// Einzelne Imports:
import { Book } from "./types";

// Mehrere Imports:
import { Book, Publisher } from "./types";

// Mit Umbenennung:
import { Book as BookType } from "./types";

// Alles importieren:
import * as Types from "./types";
// Verwendung: Types.Book, Types.Publisher
```

##### Type-Only Imports (TypeScript)

```typescript
// Nur Typ importieren (wird zur Laufzeit entfernt):
import type { Book } from "./types";

// Oder einzeln:
import { type Book, API_URL } from "./types";
//       ^^^^           ^^^^^
//       Typ            Wert

// Warum type?
// → Macht klar: Nur für TypeScript
// → Wird beim Kompilieren entfernt
// → Keine Laufzeit-Abhängigkeit
```

**Vergleich:**

```typescript
// Ohne 'type':
import { Book } from "./types";
// → TypeScript weiß nicht: Typ oder Wert?
// → Könnte zur Laufzeit gebraucht werden

// Mit 'type':
import type { Book } from "./types";
// → TypeScript weiß: Nur Typ
// → Wird garantiert entfernt beim Kompilieren
```

**Kompilierung:**

```typescript
// TypeScript:
import type { Book } from "./types";
const book: Book = { ... };

// JavaScript (kompiliert):
// import wurde entfernt (Book ist nur Typ)
const book = { ... };
```

##### Default Imports

```typescript
// Default Import:
import Book from "./book-class";

// Beliebiger Name möglich:
import MyBook from "./book-class";
import B from "./book-class";
```

##### Kombinierte Imports

```typescript
// Default + Named:
import React, { useState, useEffect } from "react";
//     ^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^^
//     Default  Named

// Im Projekt (würde so aussehen, wenn types.ts Default hätte):
import BookType, { Publisher } from "./types";
```

---

#### Module in diesem Projekt

##### types.ts - Interface-Definitionen exportieren

```typescript
// types.ts:
export interface Publisher {
  name: string;
  url: string;
}

export interface Book {
  isbn: string;
  title: string;
  author: string;
  publisher: Publisher;
  subtitle?: string;
  abstract?: string;
  numPages?: number;
}
```

**Zwei Interfaces werden exportiert:**

- `Publisher` - Verlagsinformationen
- `Book` - Buchinformationen

##### index.ts - Interfaces importieren

```typescript
// index.ts:
import type { Book } from "./types";
//     ^^^^  ^^^^^^
//     Typ   Name

// Verwendung:
let allBooks: Book[] = [];
```

**Warum `import type`?**

```typescript
// Book ist nur ein Interface (Typ):
interface Book { ... }

// Interfaces existieren nur in TypeScript
// → Zur Laufzeit gibt es kein Book
// → import type macht das klar

// Kompiliert zu:
// (import wird entfernt)
let allBooks = [];
```

##### favorite.ts - Ebenfalls Book importieren

```typescript
// favorite.ts:
import type { Book } from "./types";

// Jede Datei importiert, was sie braucht
// → Klare Abhängigkeiten
```

##### detail.ts - Book und API_URL importieren

```typescript
// detail.ts:
import type { Book } from "./types";

const API_URL = "https://api.angular.schule";

// Nutzt Book-Interface für Typ-Prüfung
async function fetchBook(isbn: string): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${isbn}`);
  return response.json();
}
```

**Modul-Graphen:**

```
types.ts (exportiert: Book, Publisher)
   ↓
   ├─→ index.ts (importiert: Book)
   ├─→ favorite.ts (importiert: Book)
   └─→ detail.ts (importiert: Book)

Abhängigkeiten sind klar!
```

---

#### Relative vs. Absolute Imports

##### Relative Imports (verwendet in diesem Projekt)

```typescript
// Beginnen mit ./ oder ../:
import { Book } from "./types"; // Gleicher Ordner
import { Book } from "../types"; // Ein Ordner höher
import { Book } from "./utils/types"; // Unterordner
```

**Pfad-Navigation:**

```
src/
  ├─ index.ts           (wir sind hier)
  ├─ types.ts
  └─ utils/
      └─ helper.ts

// Von index.ts:
import { Book } from "./types";              // ✅ types.ts
import { helper } from "./utils/helper";     // ✅ utils/helper.ts

// Von utils/helper.ts:
import { Book } from "../types";             // ✅ types.ts (ein Ordner höher)
```

##### Absolute Imports (nicht in diesem Projekt)

```typescript
// Beginnen NICHT mit ./ oder ../:
import { Book } from "types";
import { Book } from "src/types";

// Benötigt Konfiguration in tsconfig.json:
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "types": ["types.ts"],
      "@utils/*": ["utils/*"]
    }
  }
}
```

**Best Practice:**

```typescript
// ✅ Relative Imports für eigene Dateien:
import { Book } from "./types";

// ✅ Absolute Imports für npm-Pakete:
import React from "react";
import { format } from "date-fns";
```

---

#### Datei-Endungen (.ts vs .js)

```typescript
// Import ohne Endung:
import { Book } from "./types";
// → TypeScript sucht automatisch:
//   1. types.ts
//   2. types.tsx
//   3. types.d.ts

// Import mit Endung:
import { Book } from "./types.ts"; // ❌ Funktioniert nicht in allen Tools
import { Book } from "./types.js"; // ✅ Node.js ESM erfordert .js

// Best Practice:
// → Ohne Endung (TypeScript ergänzt automatisch)
import { Book } from "./types";
```

---

#### Circular Dependencies (Zirkuläre Abhängigkeiten)

**Problem:**

```typescript
// book.ts:
import { Author } from "./author";

export interface Book {
  title: string;
  author: Author;
}

// author.ts:
import { Book } from "./book";

export interface Author {
  name: string;
  books: Book[];
}

// ❌ Zirkuläre Abhängigkeit:
// book.ts → author.ts → book.ts → ...
```

**Lösung 1: Types in separate Datei:**

```typescript
// types.ts:
export interface Author {
  name: string;
  books: Book[];
}

export interface Book {
  title: string;
  author: Author;
}

// book.ts:
import type { Book, Author } from "./types";

// author.ts:
import type { Book, Author } from "./types";

// ✅ Keine zirkuläre Abhängigkeit
```

**Lösung 2: Interface inline:**

```typescript
// book.ts:
export interface Author {
  name: string;
}

export interface Book {
  title: string;
  author: Author;
}

// author.ts:
import type { Book } from "./book";
// ✅ Nur eine Richtung
```

---

#### Tree-Shaking

**Was ist Tree-Shaking?**

Tree-Shaking entfernt **ungenutzten Code** beim Bundeln (z.B. mit Webpack, Vite).

**Ohne Module:**

```javascript
// utils.js (alles wird geladen):
function usedFunction() {}
function unusedFunction() {} // ❌ Wird geladen, obwohl ungenutzt

// index.js:
usedFunction();
```

**Mit Modules:**

```typescript
// utils.ts:
export function usedFunction() {}
export function unusedFunction() {}

// index.ts:
import { usedFunction } from "./utils";
usedFunction();
// ✅ Bundler sieht: unusedFunction wird nicht importiert
// ✅ unusedFunction wird nicht in Bundle aufgenommen
```

**Bundle-Größe:**

```
Ohne Tree-Shaking:
bundle.js: 100 KB (beide Funktionen)

Mit Tree-Shaking:
bundle.js: 50 KB (nur usedFunction)
✅ 50% kleiner!
```

---

#### Dynamic Imports (Dynamische Imports)

**Lazy Loading** - Module erst bei Bedarf laden:

```typescript
// Statischer Import (zur Kompilierzeit):
import { Book } from "./types";
// → Wird sofort geladen

// Dynamischer Import (zur Laufzeit):
const typesModule = await import("./types");
const book: typesModule.Book = { ... };

// Oder mit Destructuring:
const { Book } = await import("./types");
```

**Use Case:**

```typescript
// Nur laden, wenn Nutzer auf Button klickt:
button.addEventListener("click", async () => {
  const { heavyFunction } = await import("./heavy-module");
  heavyFunction();
  // ✅ heavy-module.js wird erst jetzt geladen
});

// Statischer Import würde sofort laden:
import { heavyFunction } from "./heavy-module";
// ❌ Wird beim Seitenaufruf geladen (langsam)
```

**Nicht in diesem Projekt verwendet** (zu einfach für Dynamic Imports).

---

#### Side Effects (Nebeneffekte)

**Module mit Nebeneffekten:**

```typescript
// polyfills.ts:
import "core-js/stable";
import "regenerator-runtime/runtime";

// Kein Export, nur Nebeneffekte
// → Erweitert globale Objekte
```

**Import ohne Destrukturierung:**

```typescript
// Nur ausführen, keine Imports:
import "./polyfills";
import "./styles.css";

// Äquivalent zu:
import * as _ from "./polyfills"; // ❌ Nicht nötig
```

---

#### Re-Exports (Weiterleitende Exports)

**Modul als "Barrel" (Sammel-Export):**

```typescript
// models/book.ts:
export interface Book {}

// models/publisher.ts:
export interface Publisher {}

// models/index.ts (Barrel):
export { Book } from "./book";
export { Publisher } from "./publisher";
export * from "./author"; // Alle Exports von author

// Verwendung:
import { Book, Publisher } from "./models";
// Statt:
import { Book } from "./models/book";
import { Publisher } from "./models/publisher";
```

**Vorteil:**

✅ Einfacherer Import (ein Pfad statt mehrere)
✅ Änderungen nur in index.ts nötig

**Nicht in diesem Projekt** (zu wenige Dateien).

---

#### Module im Browser

**HTML mit Modules:**

```html
<!-- index.html -->
<script type="module" src="../dist/index.js"></script>
```

**Wichtig: `type="module"`**

```html
<!-- Ohne type="module": -->
<script src="../dist/index.js"></script>
<!-- ❌ Browser versteht kein import/export -->

<!-- Mit type="module": -->
<script type="module" src="../dist/index.js"></script>
<!-- ✅ Browser versteht ES Modules -->
```

**Was macht `type="module"`?**

✅ **import/export funktioniert** - Browser lädt Abhängigkeiten
✅ **Automatisch defer** - Script wird nach DOM geladen
✅ **Strict Mode** - Automatisch `"use strict"`
✅ **Eigener Scope** - Keine globalen Variablen
✅ **CORS-Prüfung** - Muss vom gleichen Origin sein

**Browser lädt automatisch Abhängigkeiten:**

```javascript
// index.js:
import { Book } from "./types.js";
// → Browser lädt automatisch types.js

import { formatDate } from "./utils.js";
// → Browser lädt automatisch utils.js

// Modul-Graph wird vom Browser aufgebaut
```

---

#### Zusammenfassung

**Module teilen Code in separate Dateien:**

```typescript
// types.ts (exportieren):
export interface Book {
  title: string;
  author: string;
}

// index.ts (importieren):
import type { Book } from "./types";

const book: Book = {
  title: "Angular",
  author: "Ferdinand Malcher",
};
```

**Wichtige Konzepte:**

| Konzept             | Erklärung                    | Beispiel                         |
| ------------------- | ---------------------------- | -------------------------------- |
| **export**          | Werte verfügbar machen       | `export interface Book`          |
| **import**          | Werte verwenden              | `import { Book } from "./types"` |
| **Named Export**    | Mit Name exportieren         | `export const x = 5`             |
| **Default Export**  | Standard-Export              | `export default class`           |
| **Type Import**     | Nur Typ importieren          | `import type { Book }`           |
| **Relative Import** | Pfad mit ./                  | `import { x } from "./file"`     |
| **Tree-Shaking**    | Ungenutzte Exports entfernen | Automatisch im Bundler           |

**Vorteile von Modules:**

✅ **Code-Organisation** - Logische Aufteilung in Dateien
✅ **Wiederverwendbarkeit** - Module können mehrfach importiert werden
✅ **Namespace-Isolation** - Keine globalen Variablen
✅ **Klare Abhängigkeiten** - `import` zeigt, was benötigt wird
✅ **Tree-Shaking** - Ungenutzer Code wird entfernt
✅ **Wartbarkeit** - Einfacheres Refactoring

**In diesem Projekt:**

```
types.ts
  ↓ export interface Book, Publisher

index.ts, favorite.ts, detail.ts
  ↓ import type { Book }

Jede Datei importiert nur, was sie braucht
```

**Best Practices:**

✅ **Named Exports** bevorzugen (außer Hauptkomponente)
✅ **type-only imports** für TypeScript-Typen (`import type`)
✅ **Relative Imports** für eigene Dateien (`./types`)
✅ **Keine Circular Dependencies** (Typen in gemeinsame Datei)
✅ **Kleine, fokussierte Module** (Single Responsibility)

**HTML-Integration:**

```html
<script type="module" src="../dist/index.js"></script>
^^^^^^^^^^^^ Wichtig für import/export!
```

**Nächster Schritt:** Module können **asynchronen Code** enthalten → Siehe Abschnitt "Asynchroner Code (async/await)"

### 4. Asynchroner Code (async/await)

**Asynchroner Code** ist Code, der **nicht sofort ausgeführt wird**, sondern auf ein Ergebnis **wartet** (z.B. auf eine Antwort vom Server). JavaScript ist **single-threaded** (ein einziger Ausführungs-Thread), aber durch asynchrone Programmierung kann der Browser **andere Aufgaben erledigen**, während er auf Daten wartet.

#### Das Problem: Synchroner Code blockiert

**Synchroner Code (blockierend):**

```javascript
console.log("1. Start");

// ❌ Angenommen, dieser Server-Request dauert 3 Sekunden:
const data = fetchDataFromServer(); // 3 Sekunden Wartezeit
// Browser ist blockiert! Nichts passiert!
// User kann nicht klicken, scrollen, nichts!

console.log("2. Ende");
```

**Problem:**

```
Zeitachse:
0s    → "1. Start"
0s-3s → Warten... (Browser eingefroren ❌)
3s    → data empfangen
3s    → "2. Ende"

Browser reagiert 3 Sekunden nicht!
```

**Asynchroner Code (nicht-blockierend):**

```javascript
console.log("1. Start");

// ✅ Asynchroner Request:
fetchDataFromServer().then((data) => {
  console.log("3. Daten empfangen:", data);
});

console.log("2. Ende");
```

**Ausführung:**

```
Zeitachse:
0s    → "1. Start"
0s    → Request gestartet (läuft im Hintergrund)
0s    → "2. Ende" (sofort!)
0s-3s → Browser ist reaktionsfähig ✅
3s    → "3. Daten empfangen: ..."

Browser reagiert die ganze Zeit!
```

---

#### Asynchrone Programmierung: Evolution

JavaScript hat drei Hauptmethoden für asynchronen Code:

##### 1. Callbacks (veraltet, aber wichtig zu verstehen)

```javascript
// Callback = Funktion, die später aufgerufen wird
fetchDataFromServer(function (error, data) {
  if (error) {
    console.error("Fehler:", error);
  } else {
    console.log("Daten:", data);
  }
});
```

**Problem: Callback Hell**

```javascript
// ❌ Verschachtelte Callbacks (unlesbar):
fetchUser(function (error, user) {
  if (error) {
    console.error(error);
  } else {
    fetchPosts(user.id, function (error, posts) {
      if (error) {
        console.error(error);
      } else {
        fetchComments(posts[0].id, function (error, comments) {
          if (error) {
            console.error(error);
          } else {
            console.log(comments);
          }
        });
      }
    });
  }
});

// "Pyramid of Doom" - schwer zu lesen und zu warten
```

##### 2. Promises (besser)

```javascript
// Promise = Versprechen für ein zukünftiges Ergebnis
fetchDataFromServer()
  .then((data) => {
    console.log("Daten:", data);
    return processData(data);
  })
  .then((processed) => {
    console.log("Verarbeitet:", processed);
  })
  .catch((error) => {
    console.error("Fehler:", error);
  });
```

**Vorteile:**

✅ Besser lesbar (keine Verschachtelung)
✅ Fehlerbehandlung mit `.catch()`
✅ Verkettbar (chaining)

**Immer noch etwas umständlich:**

```javascript
// Mehrere asynchrone Operationen:
fetchUser()
  .then((user) => {
    return fetchPosts(user.id);
  })
  .then((posts) => {
    return fetchComments(posts[0].id);
  })
  .then((comments) => {
    console.log(comments);
  })
  .catch((error) => {
    console.error(error);
  });
```

##### 3. async/await (modern, verwendet in diesem Projekt)

```javascript
// ✅ async/await macht asynchronen Code wie synchronen Code:
async function loadData() {
  try {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    console.log(comments);
  } catch (error) {
    console.error("Fehler:", error);
  }
}
```

**Vorteile:**

✅ **Sieht aus wie synchroner Code** (leicht zu lesen)
✅ **try/catch für Fehler** (wie bei normalem Code)
✅ **await wartet auf Promise** (kein `.then()`)
✅ **Weniger verschachtelt** (flache Struktur)

---

#### async/await im Detail

##### async-Funktionen

**Was macht `async`?**

```javascript
// Normale Funktion:
function getData() {
  return "data";
}
const result = getData();
console.log(result); // "data"

// async-Funktion:
async function getData() {
  return "data";
}
const result = getData();
console.log(result); // Promise { "data" }

// async-Funktion gibt IMMER ein Promise zurück!
```

**Verwendung:**

```javascript
// async Function Declaration:
async function fetchData() {
  return "data";
}

// async Arrow Function:
const fetchData = async () => {
  return "data";
};

// async Method:
const obj = {
  async fetchData() {
    return "data";
  },
};
```

##### await-Operator

**Was macht `await`?**

```javascript
// Promise ohne await:
function getData() {
  const promise = fetchDataFromServer();
  console.log(promise); // Promise { <pending> }
  // ❌ Promise-Objekt, nicht die Daten!
}

// Promise mit await:
async function getData() {
  const data = await fetchDataFromServer();
  console.log(data); // { books: [...] }
  // ✅ Die tatsächlichen Daten!
}
```

**await:**

- **Wartet**, bis Promise erfüllt ist
- **Gibt den Wert** des Promises zurück (nicht das Promise selbst)
- **Kann nur in async-Funktionen** verwendet werden

**Fehler:**

```javascript
// ❌ await außerhalb von async-Funktion:
const data = await fetchData();
// SyntaxError: await is only valid in async functions

// ✅ await innerhalb von async-Funktion:
async function loadData() {
  const data = await fetchData(); // ✅ OK
}
```

---

#### Promises verstehen

Um `async/await` zu verstehen, muss man **Promises** verstehen.

##### Was ist ein Promise?

Ein Promise ist ein **Platzhalter für ein zukünftiges Ergebnis**.

```javascript
// Promise hat 3 Zustände:
const promise = fetchData();

// 1. pending (ausstehend):
// → Promise wurde erstellt, aber noch nicht erfüllt

// 2. fulfilled (erfüllt):
// → Promise wurde erfolgreich abgeschlossen
// → Ergebnis ist verfügbar

// 3. rejected (abgelehnt):
// → Promise ist fehlgeschlagen
// → Fehler ist verfügbar
```

**Visualisierung:**

```
Promise erstellen:
┌──────────────┐
│   pending    │ ← Promise wurde gestartet
└──────────────┘
       │
       ├─→ Erfolg: fulfilled   ┌─────────┐
       │                        │ result  │
       │                        └─────────┘
       │
       └─→ Fehler: rejected     ┌─────────┐
                                 │ error   │
                                 └─────────┘
```

##### Promise erstellen

```javascript
// Promise von Hand erstellen:
const promise = new Promise((resolve, reject) => {
  // Asynchrone Operation:
  setTimeout(() => {
    const success = true;

    if (success) {
      resolve("Erfolg!"); // Promise wird fulfilled
    } else {
      reject("Fehler!"); // Promise wird rejected
    }
  }, 1000);
});

// Promise verwenden:
promise
  .then((result) => console.log(result)) // "Erfolg!" (nach 1 Sekunde)
  .catch((error) => console.error(error));
```

##### fetch gibt Promise zurück

```javascript
// fetch() gibt ein Promise zurück:
const promise = fetch("https://api.example.com/data");
console.log(promise); // Promise { <pending> }

// Promise wird fulfilled, wenn Antwort da ist:
promise.then((response) => {
  console.log(response); // Response-Objekt
});

// Mit await (eleganter):
const response = await fetch("https://api.example.com/data");
console.log(response); // Response-Objekt (kein Promise!)
```

---

#### async/await in diesem Projekt

##### index.ts - Bücher von API laden

```typescript
async function loadBooks(): Promise<void> {
  const response = await fetch(`${API_URL}/books`);
  const books: Book[] = await response.json();
  allBooks = books;
  renderBooks(allBooks);
}

// Aufrufen:
loadBooks();
```

**Schritt-für-Schritt:**

```typescript
// 1. async markiert Funktion als asynchron:
async function loadBooks(): Promise<void> {
  // ↑ Gibt Promise<void> zurück (void = kein Rückgabewert)

  // 2. await wartet auf fetch (HTTP-Request):
  const response = await fetch(`${API_URL}/books`);
  // → fetch gibt Promise<Response> zurück
  // → await wartet, bis Promise fulfilled ist
  // → response ist Response-Objekt (kein Promise!)

  // 3. await wartet auf json() (JSON-Parsing):
  const books: Book[] = await response.json();
  // → response.json() gibt Promise<any> zurück
  // → await wartet, bis Promise fulfilled ist
  // → books ist Book[] (kein Promise!)

  // 4. Daten verarbeiten (synchron):
  allBooks = books;
  renderBooks(allBooks);
}
```

**Zeitachse:**

```
0ms    → loadBooks() aufrufen
0ms    → fetch() starten (Request an Server)
0ms-500ms → Warten auf Server (Browser ist reaktionsfähig!)
500ms  → Response empfangen
500ms  → response.json() starten (JSON parsen)
500-510ms → JSON parsen
510ms  → books verfügbar
510ms  → allBooks = books
510ms  → renderBooks(allBooks)
```

##### Ohne async/await (zum Vergleich)

```typescript
// Mit Promises (umständlicher):
function loadBooks(): Promise<void> {
  return fetch(`${API_URL}/books`)
    .then((response) => response.json())
    .then((books: Book[]) => {
      allBooks = books;
      renderBooks(allBooks);
    });
}

// Mit async/await (eleganter):
async function loadBooks(): Promise<void> {
  const response = await fetch(`${API_URL}/books`);
  const books: Book[] = await response.json();
  allBooks = books;
  renderBooks(allBooks);
}
```

##### detail.ts - Einzelnes Buch laden

```typescript
async function loadBook(): Promise<void> {
  const urlParams = new URLSearchParams(window.location.search);
  const isbn = urlParams.get("isbn");

  if (!isbn) {
    alert("No ISBN provided");
    return;
  }

  const response = await fetch(`${API_URL}/books/${isbn}`);
  const book: Book = await response.json();

  // DOM aktualisieren mit Buch-Daten
  displayBook(book);
}
```

**Wichtig:** `await` nur innerhalb von `async function`!

---

#### Fehlerbehandlung mit try/catch

##### Ohne Fehlerbehandlung (gefährlich)

```typescript
async function loadBooks(): Promise<void> {
  const response = await fetch(`${API_URL}/books`);
  // ❌ Was, wenn Server nicht erreichbar?
  // ❌ Was, wenn 404 Not Found?
  // ❌ Was, wenn JSON ungültig?

  const books: Book[] = await response.json();
  renderBooks(books);
}

// Bei Fehler: Unbehandelte Promise-Rejection
// → Seite bleibt leer, User sieht nichts
```

##### Mit try/catch (sicher)

```typescript
async function loadBooks(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/books`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const books: Book[] = await response.json();
    renderBooks(books);
  } catch (error) {
    console.error("Fehler beim Laden der Bücher:", error);
    alert("Bücher konnten nicht geladen werden");
    // Optional: Fallback anzeigen
  }
}
```

**Mögliche Fehler:**

```typescript
try {
  // 1. Netzwerk-Fehler (Server nicht erreichbar):
  const response = await fetch("https://offline-server.com/api");
  // → Wirft TypeError: Failed to fetch

  // 2. HTTP-Fehler (404, 500, etc.):
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  // → response.ok ist false bei 4xx/5xx

  // 3. JSON-Parse-Fehler (ungültiges JSON):
  const data = await response.json();
  // → Wirft SyntaxError: Unexpected token
} catch (error) {
  // Alle Fehler werden hier gefangen
  console.error("Fehler:", error);
}
```

---

#### Parallele vs. Sequenzielle Ausführung

##### Sequenziell (nacheinander)

```typescript
async function loadData() {
  // ❌ Langsam (3 Sekunden):
  const books = await fetch("/api/books"); // 1 Sekunde
  const authors = await fetch("/api/authors"); // 1 Sekunde
  const publishers = await fetch("/api/publishers"); // 1 Sekunde

  // Gesamt: 3 Sekunden (nacheinander)
}
```

**Zeitachse:**

```
0s-1s → books laden
1s-2s → authors laden (wartet auf books)
2s-3s → publishers laden (wartet auf authors)

Gesamt: 3 Sekunden
```

##### Parallel (gleichzeitig)

```typescript
async function loadData() {
  // ✅ Schnell (1 Sekunde):
  const [booksResponse, authorsResponse, publishersResponse] =
    await Promise.all([
      fetch("/api/books"), // Alle drei parallel
      fetch("/api/authors"),
      fetch("/api/publishers"),
    ]);

  const books = await booksResponse.json();
  const authors = await authorsResponse.json();
  const publishers = await publishersResponse.json();

  // Gesamt: 1 Sekunde (parallel)
}
```

**Zeitachse:**

```
0s-1s → books, authors, publishers laden (alle parallel)

Gesamt: 1 Sekunde ✅
```

##### Promise.all

```typescript
// Promise.all wartet auf alle Promises:
const promises = [
  fetch("/api/books"),
  fetch("/api/authors"),
  fetch("/api/publishers"),
];

const results = await Promise.all(promises);
// → Alle drei sind fertig

// Falls ein Promise fehlschlägt:
try {
  const results = await Promise.all(promises);
} catch (error) {
  // Ein oder mehrere Promises sind fehlgeschlagen
  console.error("Mindestens ein Request fehlgeschlagen:", error);
}
```

##### Promise.allSettled

```typescript
// Promise.allSettled wartet auf alle, auch bei Fehlern:
const results = await Promise.allSettled([
  fetch("/api/books"), // ✅ Erfolgreich
  fetch("/api/invalid"), // ❌ Fehler
  fetch("/api/authors"), // ✅ Erfolgreich
]);

results.forEach((result) => {
  if (result.status === "fulfilled") {
    console.log("Erfolg:", result.value);
  } else {
    console.error("Fehler:", result.reason);
  }
});

// ✅ Alle sind fertig, auch wenn manche fehlschlagen
```

---

#### Top-Level await (TypeScript 4.0+)

**Früher:**

```typescript
// ❌ await nur in async-Funktionen:
const data = await fetch("/api/data"); // Error!

// ✅ Mit async-Funktion:
(async () => {
  const data = await fetch("/api/data");
})();
```

**Jetzt (Top-Level await):**

```typescript
// ✅ await direkt im Modul (ohne async-Funktion):
const response = await fetch("/api/data");
const data = await response.json();

console.log(data);

// Funktioniert in ES2022+ Modules
```

**In diesem Projekt nicht verwendet** (Browser-Kompatibilität).

---

#### Häufige Fehler und Lösungen

##### 1. await vergessen

```typescript
// ❌ Falsch (await vergessen):
async function loadBooks() {
  const response = fetch(`${API_URL}/books`); // Kein await!
  console.log(response); // Promise { <pending> } ❌
  const books = response.json(); // ❌ response.json is not a function
}

// ✅ Richtig (await verwenden):
async function loadBooks() {
  const response = await fetch(`${API_URL}/books`);
  console.log(response); // Response-Objekt ✅
  const books = await response.json(); // ✅ Funktioniert
}
```

##### 2. await außerhalb von async

```typescript
// ❌ Falsch (await außerhalb):
function loadBooks() {
  const response = await fetch(`${API_URL}/books`); // Error!
}

// ✅ Richtig (async hinzufügen):
async function loadBooks() {
  const response = await fetch(`${API_URL}/books`);
}
```

##### 3. Promise-Rückgabewert ignorieren

```typescript
// ❌ Falsch (Promise wird nicht gewartet):
async function loadBooks() {
  return fetch(`${API_URL}/books`); // Gibt Promise zurück
}

loadBooks().then((response) => {
  // response ist Response, nicht Book[]
  console.log(response);
});

// ✅ Richtig (await innerhalb):
async function loadBooks() {
  const response = await fetch(`${API_URL}/books`);
  const books = await response.json();
  return books; // Gibt Book[] zurück (im Promise)
}

const books = await loadBooks(); // ✅ books ist Book[]
```

##### 4. try/catch für jedes await (unnötig)

```typescript
// ❌ Umständlich (try/catch für jeden await):
async function loadBooks() {
  try {
    const response = await fetch(`${API_URL}/books`);
  } catch (error) {
    console.error("Fetch-Fehler:", error);
  }

  try {
    const books = await response.json();
  } catch (error) {
    console.error("JSON-Fehler:", error);
  }
}

// ✅ Eleganter (ein try/catch für alles):
async function loadBooks() {
  try {
    const response = await fetch(`${API_URL}/books`);
    const books = await response.json();
    return books;
  } catch (error) {
    console.error("Fehler:", error);
  }
}
```

---

#### Zusammenfassung

**Asynchroner Code ist nötig für:**

- **HTTP-Requests** (fetch, APIs)
- **Datei-Operationen** (File API)
- **Datenbank-Abfragen**
- **Timer** (setTimeout, setInterval)
- **Animations** (requestAnimationFrame)

**async/await Syntax:**

```typescript
// async-Funktion deklarieren:
async function loadData(): Promise<Book[]> {
  // await wartet auf Promise:
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

// async-Funktion aufrufen:
const books = await loadData();  // In anderer async-Funktion
// Oder:
loadData().then(books => { ... });  // Mit .then()
```

**Wichtige Konzepte:**

| Konzept         | Erklärung                            | Beispiel                      |
| --------------- | ------------------------------------ | ----------------------------- |
| **async**       | Markiert Funktion als asynchron      | `async function f() { }`      |
| **await**       | Wartet auf Promise                   | `await fetch()`               |
| **Promise**     | Platzhalter für zukünftiges Ergebnis | `new Promise(...)`            |
| **try/catch**   | Fehlerbehandlung                     | `try { await ... } catch { }` |
| **Promise.all** | Parallel warten                      | `await Promise.all([...])`    |
| **.then()**     | Promise-Verkettung                   | `promise.then(...)`           |
| **.catch()**    | Fehler abfangen                      | `promise.catch(...)`          |

**Vorteile von async/await:**

✅ **Lesbar** - Sieht aus wie synchroner Code
✅ **Wartbar** - Keine tief verschachtelten Callbacks
✅ **Fehlerbehandlung** - try/catch wie bei normalem Code
✅ **Debugging** - Einfacher als bei Promises/Callbacks

**In diesem Projekt:**

```typescript
// index.ts:
async function loadBooks(): Promise<void> {
  const response = await fetch(`${API_URL}/books`);
  const books: Book[] = await response.json();
  renderBooks(books);
}

// detail.ts:
async function loadBook(): Promise<void> {
  const response = await fetch(`${API_URL}/books/${isbn}`);
  const book: Book = await response.json();
  displayBook(book);
}
```

**Best Practices:**

✅ **Immer async bei await** verwenden
✅ **try/catch für Fehlerbehandlung** hinzufügen
✅ **Promise.all für parallele Requests** nutzen
✅ **await nicht vergessen** (sonst Promise statt Wert)
✅ **HTTP-Status prüfen** (`response.ok`)

**Nächster Schritt:** Mit den geladenen Daten wird das **DOM manipuliert** → Siehe Abschnitt "DOM-Manipulation"

### 5. DOM-Manipulation

**DOM** steht für **Document Object Model** und ist die **Programmierschnittstelle** zwischen JavaScript und HTML. Mit DOM-Manipulation kann man **HTML-Elemente ändern, erstellen, löschen** und die Webseite **dynamisch aktualisieren**.

#### Was ist das DOM?

**HTML-Dokument:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Meine Seite</title>
  </head>
  <body>
    <h1>Überschrift</h1>
    <p>Text</p>
  </body>
</html>
```

**DOM-Baum (Browser-Repräsentation):**

```
Document
  └─ html
      ├─ head
      │   └─ title
      │       └─ "Meine Seite" (Text)
      ├─ body
          ├─ h1
          │   └─ "Überschrift" (Text)
          └─ p
              └─ "Text" (Text)
```

**JavaScript kann auf diesen Baum zugreifen:**

```javascript
// Element finden:
const heading = document.querySelector("h1");

// Inhalt ändern:
heading.textContent = "Neue Überschrift";

// HTML-Änderung wird sofort sichtbar!
```

---

#### DOM-Elemente finden (Selektoren)

##### document.querySelector()

```typescript
// Findet das ERSTE Element, das dem Selektor entspricht:
const element = document.querySelector("#myId"); // ID
const element = document.querySelector(".myClass"); // Klasse
const element = document.querySelector("div"); // Tag
const element = document.querySelector("div.myClass"); // Tag + Klasse
const element = document.querySelector('[name="search"]'); // Attribut

// Gibt null zurück, wenn nichts gefunden:
const element = document.querySelector("#notExist");
console.log(element); // null
```

**CSS-Selektoren funktionieren:**

```typescript
// Komplexe Selektoren:
document.querySelector("table tbody tr"); // Nachfahre
document.querySelector("div > p"); // Direktes Kind
document.querySelector("h1 + p"); // Nächstes Geschwister
document.querySelector("input[type='text']"); // Attribut
document.querySelector("li:first-child"); // Pseudo-Klasse
document.querySelector("tr:nth-child(odd)"); // Ungerade Zeilen
```

##### document.querySelectorAll()

```typescript
// Findet ALLE Elemente, die dem Selektor entsprechen:
const elements = document.querySelectorAll(".myClass");
console.log(elements); // NodeList [<div>, <div>, <div>]

// NodeList ist array-ähnlich (aber kein echtes Array):
elements.forEach((element) => {
  console.log(element);
});

// Oder: In Array umwandeln:
const array = Array.from(elements);
```

##### Andere Selektoren (älter)

```typescript
// getElementById (nur ID):
const element = document.getElementById("myId"); // Ohne #

// getElementsByClassName (mehrere):
const elements = document.getElementsByClassName("myClass"); // Ohne .
// Gibt HTMLCollection zurück (kein Array!)

// getElementsByTagName (mehrere):
const elements = document.getElementsByTagName("div");

// ⚠️ querySelector/querySelectorAll sind moderner und flexibler!
```

---

#### Type Assertions für DOM-Elemente

**Problem:**

```typescript
// TypeScript weiß nicht, welcher Element-Typ:
const input = document.querySelector("#search");
// input hat Typ: Element | null

input.value = "Angular";
// ❌ Error: Property 'value' does not exist on type 'Element'
```

**Lösung: Type Assertion**

```typescript
// Type Assertion mit 'as':
const input = document.querySelector("#search") as HTMLInputElement;
// input hat Typ: HTMLInputElement

input.value = "Angular"; // ✅ OK

// Warum funktioniert das?
// HTMLInputElement hat .value Property
// Element hat .value NICHT
```

**Häufige DOM-Typen:**

```typescript
// Input-Felder:
const input = document.querySelector("input") as HTMLInputElement;
input.value;
input.checked;
input.disabled;

// Textareas:
const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
textarea.value;

// Select-Felder:
const select = document.querySelector("select") as HTMLSelectElement;
select.value;
select.selectedIndex;

// Buttons:
const button = document.querySelector("button") as HTMLButtonElement;
button.disabled;

// Links:
const link = document.querySelector("a") as HTMLAnchorElement;
link.href;

// Images:
const img = document.querySelector("img") as HTMLImageElement;
img.src;
img.alt;

// Tabellen:
const table = document.querySelector("table") as HTMLTableElement;
const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
const tr = document.querySelector("tr") as HTMLTableRowElement;

// Generisch:
const div = document.querySelector("div") as HTMLDivElement;
const span = document.querySelector("span") as HTMLSpanElement;
```

---

#### DOM-Manipulation in diesem Projekt

##### index.ts - Tabelle mit Büchern füllen

```typescript
function renderBooks(books: Book[]): void {
  // 1. tbody finden:
  const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

  // 2. tbody leeren:
  tbody.innerHTML = "";

  // 3. Für jedes Buch eine Zeile erstellen:
  books.forEach((book) => {
    const row = createBookRow(book);
    tbody.appendChild(row);
  });
}
```

**Schritt-für-Schritt:**

**1. Element finden:**

```typescript
const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
```

**HTML:**

```html
<table>
  <thead>
    ...
  </thead>
  <tbody>
    <!-- Hier werden Zeilen eingefügt -->
  </tbody>
</table>
```

**2. Inhalt leeren:**

```typescript
tbody.innerHTML = "";
```

**Was macht innerHTML = ""?**

```html
<!-- Vorher: -->
<tbody>
  <tr>
    <td>Altes Buch</td>
  </tr>
  <tr>
    <td>Noch ein Buch</td>
  </tr>
</tbody>

<!-- Nach tbody.innerHTML = "": -->
<tbody>
  <!-- Leer -->
</tbody>
```

**3. Neue Zeilen erstellen:**

```typescript
books.forEach((book) => {
  const row = createBookRow(book);
  tbody.appendChild(row);
});
```

---

##### Zeile erstellen mit innerHTML

```typescript
function createBookRow(book: Book): HTMLTableRowElement {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td class="first-col">
      <button class="button button-clear fav-btn">
        ${getFavoriteIcon(book)}
      </button>
    </td>
    <td>${book.title}</td>
    <td>${book.isbn}</td>
    <td>${book.author}</td>
    <td>${book.publisher.name}</td>
    <td>
      <a href="detail.html?isbn=${book.isbn}" class="button button-outline">
        Detail
      </a>
    </td>
  `;

  return tr;
}
```

##### createElement()

```typescript
const tr = document.createElement("tr");
```

**Was macht createElement?**

```typescript
// Erstellt ein neues HTML-Element (im Speicher):
const tr = document.createElement("tr");
console.log(tr); // <tr></tr>

// Element ist noch NICHT im DOM (nicht sichtbar)!
// Erst appendChild() fügt es hinzu
```

**Andere Elemente erstellen:**

```typescript
const div = document.createElement("div");
const p = document.createElement("p");
const span = document.createElement("span");
const img = document.createElement("img");
const a = document.createElement("a");
```

##### innerHTML

```typescript
tr.innerHTML = `<td>Inhalt</td>`;
```

**Was macht innerHTML?**

```typescript
// Setzt den HTML-Inhalt eines Elements:
const div = document.createElement("div");
div.innerHTML = "<p>Hallo <strong>Welt</strong>!</p>";

console.log(div);
// <div>
//   <p>Hallo <strong>Welt</strong>!</p>
// </div>
```

**innerHTML vs. textContent:**

```typescript
const div = document.createElement("div");

// innerHTML (HTML wird geparst):
div.innerHTML = "<strong>Bold</strong>";
console.log(div); // <div><strong>Bold</strong></div>
// → <strong> wird als HTML-Element erstellt

// textContent (Text wird escaped):
div.textContent = "<strong>Bold</strong>";
console.log(div); // <div>&lt;strong&gt;Bold&lt;/strong&gt;</div>
// → <strong> wird als Text angezeigt (nicht als HTML)
```

**Visuell:**

```
innerHTML:
<div>Bold</div>  (fett dargestellt)

textContent:
<div><strong>Bold</strong></div>  (als Text dargestellt)
```

**Sicherheit (XSS):**

```typescript
// ❌ Gefährlich (User-Input direkt in innerHTML):
const userInput = "<img src=x onerror=\"alert('XSS')\">";
div.innerHTML = userInput; // Script wird ausgeführt!

// ✅ Sicher (User-Input in textContent):
div.textContent = userInput; // Script wird als Text angezeigt

// ✅ Oder: Input validieren/escapen
```

**In diesem Projekt:**

```typescript
// Book-Daten stammen von API (vertrauenswürdig)
// Trotzdem: Besser escapen
tr.innerHTML = `<td>${book.title}</td>`;
// Falls book.title = "<script>alert('XSS')</script>"
// → Würde ausgeführt werden!

// Besser:
const td = document.createElement("td");
td.textContent = book.title; // Escaped automatisch
```

##### Template Literals für HTML

```typescript
tr.innerHTML = `
  <td>${book.title}</td>
  <td>${book.isbn}</td>
`;
```

**Vorteile:**

✅ **Lesbar** - HTML-Struktur klar erkennbar
✅ **Dynamisch** - ${variable} einfügen
✅ **Mehrzeilig** - Keine String-Konkatenation

**Alternative (umständlich):**

```typescript
// Ohne Template Literals:
tr.innerHTML = "<td>" + book.title + "</td>" + "<td>" + book.isbn + "</td>";

// Mit Template Literals:
tr.innerHTML = `
  <td>${book.title}</td>
  <td>${book.isbn}</td>
`;
```

##### appendChild()

```typescript
tbody.appendChild(tr);
```

**Was macht appendChild?**

```typescript
// Fügt Element als Kind hinzu:
const parent = document.querySelector("tbody");
const child = document.createElement("tr");

parent.appendChild(child);

// HTML vorher:
// <tbody></tbody>

// HTML nachher:
// <tbody>
//   <tr></tr>
// </tbody>
```

**Mehrere Kinder hinzufügen:**

```typescript
books.forEach((book) => {
  const tr = createBookRow(book);
  tbody.appendChild(tr); // Jede Zeile wird hinzugefügt
});

// Ergebnis:
// <tbody>
//   <tr>Buch 1</tr>
//   <tr>Buch 2</tr>
//   <tr>Buch 3</tr>
// </tbody>
```

---

#### Weitere DOM-Manipulations-Methoden

##### textContent

```typescript
// Text setzen/lesen:
const h1 = document.querySelector("h1") as HTMLHeadingElement;
h1.textContent = "Neue Überschrift";

console.log(h1.textContent); // "Neue Überschrift"
```

##### innerText vs textContent

```typescript
const div = document.createElement("div");
div.innerHTML = "Hallo <span style='display:none'>Welt</span>!";

console.log(div.textContent); // "Hallo Welt!"
console.log(div.innerText); // "Hallo !"

// textContent: Gesamter Text (auch versteckte Elemente)
// innerText: Nur sichtbarer Text
```

##### setAttribute / getAttribute

```typescript
// Attribut setzen:
const img = document.querySelector("img") as HTMLImageElement;
img.setAttribute("src", "images/book.png");
img.setAttribute("alt", "Buch-Cover");

// Attribut lesen:
const src = img.getAttribute("src");
console.log(src); // "images/book.png"

// Direkter Zugriff (moderner):
img.src = "images/book.png";
img.alt = "Buch-Cover";
```

##### classList (Klassen hinzufügen/entfernen)

```typescript
const button = document.querySelector("button") as HTMLButtonElement;

// Klasse hinzufügen:
button.classList.add("active");
// <button class="active">

// Klasse entfernen:
button.classList.remove("active");
// <button class="">

// Klasse togglen (an/aus):
button.classList.toggle("active");
// Falls vorhanden: entfernen
// Falls nicht vorhanden: hinzufügen

// Klasse prüfen:
if (button.classList.contains("active")) {
  console.log("Button ist aktiv");
}

// Mehrere Klassen:
button.classList.add("btn", "btn-primary", "btn-lg");
```

**In diesem Projekt:**

```typescript
// Navigation-Link aktiv setzen:
const link = document.querySelector(".mainnav-link") as HTMLAnchorElement;
link.classList.add("mainnav-link--active");
// <a class="mainnav-link mainnav-link--active">
```

##### style (Inline-Styles)

```typescript
const div = document.querySelector("div") as HTMLDivElement;

// Style setzen:
div.style.color = "red";
div.style.backgroundColor = "blue"; // camelCase!
div.style.fontSize = "20px";

// HTML-Ergebnis:
// <div style="color: red; background-color: blue; font-size: 20px;">
```

**CSS-Property-Namen:**

```css
/* CSS: */
background-color: blue;
font-size: 20px;

// JavaScript (camelCase):
backgroundColor = "blue";
fontSize = "20px";
```

**In diesem Projekt:**

```typescript
// Bild verstecken bei Fehler:
imgElement.style.display = "none";
```

##### remove()

```typescript
// Element aus DOM entfernen:
const element = document.querySelector(".to-remove");
element?.remove();

// HTML vorher:
// <div class="to-remove">...</div>

// HTML nachher:
// (Element ist weg)
```

##### insertAdjacentHTML()

```typescript
// HTML an verschiedenen Positionen einfügen:
const div = document.querySelector("div") as HTMLDivElement;

div.insertAdjacentHTML("beforebegin", "<p>Vor dem Element</p>");
div.insertAdjacentHTML("afterbegin", "<p>Am Anfang des Elements</p>");
div.insertAdjacentHTML("beforeend", "<p>Am Ende des Elements</p>");
div.insertAdjacentHTML("afterend", "<p>Nach dem Element</p>");
```

**Positionen:**

```html
<!-- beforebegin -->
<div>
  <!-- afterbegin -->
  Inhalt
  <!-- beforeend -->
</div>
<!-- afterend -->
```

---

#### Event-Listener in der DOM-Manipulation

##### Favoriten-Button Event-Listener hinzufügen

```typescript
function createBookRow(book: Book): HTMLTableRowElement {
  const tr = document.createElement("tr");
  tr.innerHTML = `...`;

  // Event-Listener für Favoriten-Button:
  const favBtn = tr.querySelector(".fav-btn") as HTMLButtonElement;
  favBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFavorite(book);
  });

  return tr;
}
```

**Warum in der Funktion?**

```typescript
// ❌ Nach appendChild würde nicht funktionieren:
tbody.innerHTML = ""; // Alle Event-Listener weg!

// ✅ Event-Listener direkt beim Erstellen hinzufügen:
const tr = createBookRow(book); // Mit Event-Listener
tbody.appendChild(tr); // Event-Listener bleibt
```

---

#### Performance-Optimierung

##### DocumentFragment

```typescript
// ❌ Langsam (jedes appendChild triggert Reflow):
books.forEach((book) => {
  const tr = createBookRow(book);
  tbody.appendChild(tr); // 100x Reflow bei 100 Büchern
});

// ✅ Schnell (nur ein Reflow):
const fragment = document.createDocumentFragment();
books.forEach((book) => {
  const tr = createBookRow(book);
  fragment.appendChild(tr); // Im Speicher (kein Reflow)
});
tbody.appendChild(fragment); // Nur 1x Reflow
```

**DocumentFragment:**

- Leichtgewichtiger Container
- Nicht im DOM sichtbar
- Wird beim appendChild "ausgepackt"
- Bessere Performance bei vielen Elementen

##### innerHTML für alle Zeilen auf einmal

```typescript
// Alternative: HTML-String bauen:
const html = books
  .map(
    (book) => `
  <tr>
    <td>${book.title}</td>
    <td>${book.isbn}</td>
  </tr>
`
  )
  .join("");

tbody.innerHTML = html; // Nur 1x Reflow

// ❌ Nachteil: Event-Listener müssen danach hinzugefügt werden
```

---

#### Häufige Fehler

##### 1. Element nicht gefunden (null)

```typescript
// ❌ Element existiert nicht:
const element = document.querySelector("#notExist");
element.textContent = "Text"; // ❌ TypeError: Cannot read property 'textContent' of null

// ✅ Prüfen, ob Element existiert:
const element = document.querySelector("#notExist");
if (element) {
  element.textContent = "Text";
}

// Oder mit Optional Chaining:
element?.textContent = "Text";
```

##### 2. Script vor DOM-Element

```html
<!-- ❌ Falsch: Script vor Element -->
<script>
  const div = document.querySelector("div");
  console.log(div); // null (div existiert noch nicht!)
</script>

<div>Inhalt</div>

<!-- ✅ Richtig: Script nach Element -->
<div>Inhalt</div>

<script>
  const div = document.querySelector("div");
  console.log(div); // <div>Inhalt</div> ✅
</script>

<!-- ✅ Oder: type="module" (automatisch defer) -->
<script type="module" src="index.js"></script>
```

##### 3. innerHTML löscht Event-Listener

```typescript
// Event-Listener hinzufügen:
const button = document.querySelector("button");
button.addEventListener("click", () => console.log("Click!"));

// innerHTML löschen:
const parent = button.parentElement;
parent.innerHTML = ""; // ❌ Event-Listener ist weg!

// Bessere Alternative:
parent.textContent = ""; // Kinder entfernen
// Oder:
while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
}
```

##### 4. querySelectorAll ist nicht Array

```typescript
const elements = document.querySelectorAll("div");

// ❌ Keine Array-Methoden:
elements.map((el) => el.textContent); // Error!
elements.filter((el) => el.classList.contains("active")); // Error!

// ✅ In Array umwandeln:
const array = Array.from(elements);
array.map((el) => el.textContent); // ✅ Funktioniert

// Oder: forEach nutzen (funktioniert):
elements.forEach((el) => console.log(el));
```

---

#### Zusammenfassung

**DOM-Manipulation ermöglicht:**

✅ **Elemente finden** - `querySelector()`, `querySelectorAll()`
✅ **Inhalte ändern** - `textContent`, `innerHTML`
✅ **Elemente erstellen** - `createElement()`
✅ **Elemente hinzufügen** - `appendChild()`
✅ **Attribute ändern** - `setAttribute()`, direkter Zugriff
✅ **Klassen ändern** - `classList.add()`, `classList.remove()`
✅ **Styles ändern** - `style.property`
✅ **Elemente entfernen** - `remove()`

**Wichtige Methoden:**

| Methode                | Beschreibung          | Beispiel                           |
| ---------------------- | --------------------- | ---------------------------------- |
| **querySelector()**    | Erstes Element finden | `document.querySelector("div")`    |
| **querySelectorAll()** | Alle Elemente finden  | `document.querySelectorAll("div")` |
| **createElement()**    | Element erstellen     | `document.createElement("tr")`     |
| **appendChild()**      | Element hinzufügen    | `parent.appendChild(child)`        |
| **innerHTML**          | HTML setzen/lesen     | `element.innerHTML = "<p>..."`     |
| **textContent**        | Text setzen/lesen     | `element.textContent = "Text"`     |
| **classList**          | Klassen verwalten     | `element.classList.add("active")`  |
| **setAttribute()**     | Attribut setzen       | `img.setAttribute("src", "...")`   |
| **remove()**           | Element entfernen     | `element.remove()`                 |

**In diesem Projekt:**

```typescript
// 1. Bücher-Tabelle füllen:
const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
tbody.innerHTML = "";
books.forEach((book) => {
  const tr = createBookRow(book);
  tbody.appendChild(tr);
});

// 2. Zeile erstellen:
const tr = document.createElement("tr");
tr.innerHTML = `<td>${book.title}</td>...`;

// 3. Detail-Seite füllen:
const titleElement = document.querySelector("h1") as HTMLHeadingElement;
titleElement.innerHTML = `${book.title}<br /><small>${book.subtitle}</small>`;
```

**Best Practices:**

✅ **Type Assertions** für DOM-Typen verwenden
✅ **textContent statt innerHTML** für User-Input (Sicherheit)
✅ **Optional Chaining** bei unsicheren Elementen (`element?.textContent`)
✅ **DocumentFragment** für viele Elemente (Performance)
✅ **classList** statt className (einfacher)
✅ **Direkte Properties** statt setAttribute (moderner)

**Nächster Schritt:** DOM-Elemente können **Event-Listener** haben → Siehe Abschnitt "Event-Listener"

### 6. Event-Listener

**Event-Listener** sind Funktionen, die auf **Benutzer-Interaktionen** reagieren (Klicks, Tastatur-Eingaben, Mausbewegungen, etc.). Sie ermöglichen es, **interaktive Webseiten** zu erstellen, die auf Benutzer-Aktionen reagieren.

#### Was sind Events?

**Events** sind **Ereignisse**, die im Browser passieren:

```
User-Events:
├─ click        → Benutzer klickt auf Element
├─ dblclick     → Doppelklick
├─ input        → Eingabe in Textfeld
├─ change       → Wert wurde geändert
├─ submit       → Formular abgeschickt
├─ keydown      → Taste gedrückt
├─ keyup        → Taste losgelassen
├─ mouseover    → Maus über Element
├─ mouseout     → Maus verlässt Element
└─ scroll       → Seite wird gescrollt

Browser-Events:
├─ load         → Seite/Bild geladen
├─ DOMContentLoaded → DOM ist bereit
├─ resize       → Fenster-Größe geändert
└─ error        → Fehler aufgetreten
```

---

#### Event-Listener hinzufügen

##### addEventListener()

```typescript
// Element finden:
const button = document.querySelector("button") as HTMLButtonElement;

// Event-Listener hinzufügen:
button.addEventListener("click", function () {
  console.log("Button wurde geklickt!");
});

// Oder mit Arrow Function:
button.addEventListener("click", () => {
  console.log("Button wurde geklickt!");
});
```

**Syntax:**

```typescript
element.addEventListener(eventType, callback, options?);
//                       │           │         │
//                       │           │         └─ Optional: Optionen
//                       │           └─────────── Callback-Funktion
//                       └─────────────────────── Event-Typ (String)
```

##### Callback-Funktion

```typescript
// Callback erhält Event-Objekt:
button.addEventListener("click", (event) => {
  console.log(event); // MouseEvent { ... }
  console.log(event.target); // <button>...</button>
  console.log(event.type); // "click"
});
```

**Event-Objekt enthält:**

```typescript
interface MouseEvent {
  target: Element; // Element, auf das geklickt wurde
  currentTarget: Element; // Element mit Event-Listener
  type: string; // Event-Typ ("click")
  clientX: number; // Maus X-Position
  clientY: number; // Maus Y-Position
  button: number; // Welche Maustaste (0=links, 1=mitte, 2=rechts)
  shiftKey: boolean; // Shift-Taste gedrückt?
  ctrlKey: boolean; // Strg-Taste gedrückt?
  // ... und viele mehr
}
```

---

#### Event-Listener in diesem Projekt

##### 1. Search-Input (Suche)

```typescript
// index.ts:
const searchInput = document.querySelector(
  '[name="search"]'
) as HTMLInputElement;

searchInput.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  searchTerm = target.value;
  filterAndRenderBooks();
});
```

**Schritt-für-Schritt:**

```typescript
// 1. Input-Feld finden:
const searchInput = document.querySelector(
  '[name="search"]'
) as HTMLInputElement;
// HTML: <input type="text" name="search" placeholder="Search...">

// 2. Event-Listener für 'input' Event:
searchInput.addEventListener("input", (event) => {
  // 'input' Event wird bei jeder Änderung gefeuert
  // (jeder Tastendruck, Paste, etc.)

  // 3. Aktuellen Wert auslesen:
  const target = event.target as HTMLInputElement;
  searchTerm = target.value;

  // 4. Bücher filtern und neu rendern:
  filterAndRenderBooks();
});
```

**Warum 'input' statt 'change'?**

```typescript
// 'input' Event (sofort bei jeder Änderung):
searchInput.addEventListener("input", () => {
  console.log("Input geändert");
  // User tippt: "A" → Event
  // User tippt: "n" → Event
  // User tippt: "g" → Event
  // ✅ Live-Suche (sofort)
});

// 'change' Event (nur bei Verlassen des Feldes):
searchInput.addEventListener("change", () => {
  console.log("Input geändert");
  // User tippt: "Angular"
  // User klickt außerhalb des Feldes → Event
  // ❌ Nur beim Verlassen (verzögert)
});
```

##### 2. Publisher-Filter (Dropdown)

```typescript
// index.ts:
const publisherFilter = document.querySelector(
  '[name="publisher"]'
) as HTMLSelectElement;

publisherFilter.addEventListener("change", (event) => {
  const target = event.target as HTMLSelectElement;
  selectedPublisher = target.value;
  filterAndRenderBooks();
});
```

**Für Select-Felder passt 'change':**

```typescript
// Select: Wert ändert sich bei Auswahl
// → 'change' ist passend (wird bei Auswahl gefeuert)

// HTML:
// <select name="publisher">
//   <option value="">All Publishers</option>
//   <option value="dpunkt.verlag GmbH">dpunkt</option>
// </select>

// User wählt "dpunkt" → change Event → selectedPublisher = "dpunkt.verlag GmbH"
```

##### 3. Favoriten-Button (Herz-Icon)

```typescript
// index.ts - in createBookRow():
const favBtn = tr.querySelector(".fav-btn") as HTMLButtonElement;

favBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleFavorite(book);
});
```

**event.stopPropagation():**

```typescript
event.stopPropagation();
```

**Was macht stopPropagation?**

```html
<!-- Event Bubbling: -->
<tr onclick="console.log('Zeile geklickt')">
  <td>
    <button onclick="console.log('Button geklickt')">Favorit</button>
  </td>
</tr>
```

**Ohne stopPropagation:**

```
User klickt auf Button:
1. Button-Event wird gefeuert → "Button geklickt"
2. Event "bubbelt" nach oben zu <tr> → "Zeile geklickt"

❌ Beide Events werden gefeuert (ungewollt)
```

**Mit stopPropagation:**

```typescript
button.addEventListener("click", (event) => {
  event.stopPropagation(); // Stoppt Event-Propagierung
  console.log("Button geklickt");
});
```

```
User klickt auf Button:
1. Button-Event wird gefeuert → "Button geklickt"
2. Event wird NICHT nach oben propagiert

✅ Nur Button-Event (gewollt)
```

**Event-Bubbling visualisiert:**

```
Event-Fluss (ohne stopPropagation):
Click auf Button
    ↓
<button> Event         ← 1. Target Phase
    ↓ Bubbling
<td> Event             ← 2. Bubbling
    ↓ Bubbling
<tr> Event             ← 3. Bubbling
    ↓ Bubbling
<tbody> Event
    ↓ Bubbling
<table> Event
    ↓ Bubbling
...

Event-Fluss (mit stopPropagation):
Click auf Button
    ↓
<button> Event         ← 1. Target Phase
    ✋ stopPropagation() → STOP!
(Keine weiteren Events)
```

##### 4. Detail-Link (onClick in HTML)

```html
<!-- detail.html -->
<button class="button button-outline" onclick="location.href='index.html'">
  Back
</button>
```

**onclick-Attribut (Inline-Handler):**

```html
<!-- Inline-Handler: -->
<button onclick="alert('Klick!')">Click</button>

<!-- Äquivalent zu: -->
<button id="btn">Click</button>
<script>
  document.getElementById("btn").addEventListener("click", () => {
    alert("Klick!");
  });
</script>
```

**Warum addEventListener besser ist:**

```typescript
// ❌ Inline onclick (nur ein Handler):
<button onclick="doSomething()">Click</button>;

// ❌ Überschreiben:
button.onclick = function () {
  console.log("1");
};
button.onclick = function () {
  console.log("2");
};
// → Nur "2" wird ausgeführt (1 wurde überschrieben)

// ✅ addEventListener (mehrere Handler):
button.addEventListener("click", () => console.log("1"));
button.addEventListener("click", () => console.log("2"));
// → Beide werden ausgeführt ("1" und "2")
```

---

#### Event-Typen im Detail

##### Click-Events

```typescript
// click - Einfacher Klick:
element.addEventListener("click", (event) => {
  console.log("Geklickt");
});

// dblclick - Doppelklick:
element.addEventListener("dblclick", (event) => {
  console.log("Doppelt geklickt");
});

// contextmenu - Rechtsklick:
element.addEventListener("contextmenu", (event) => {
  event.preventDefault(); // Standard-Kontextmenü verhindern
  console.log("Rechtsklick");
});
```

##### Keyboard-Events

```typescript
// keydown - Taste wird gedrückt:
document.addEventListener("keydown", (event) => {
  console.log("Taste:", event.key);

  if (event.key === "Enter") {
    console.log("Enter gedrückt");
  }

  if (event.key === "Escape") {
    console.log("Escape gedrückt");
  }
});

// keyup - Taste wird losgelassen:
document.addEventListener("keyup", (event) => {
  console.log("Taste losgelassen:", event.key);
});

// keypress - Taste gedrückt (veraltet, nicht verwenden):
// → keydown verwenden statt keypress
```

**KeyboardEvent-Properties:**

```typescript
document.addEventListener("keydown", (event: KeyboardEvent) => {
  console.log(event.key); // "a", "Enter", "ArrowUp"
  console.log(event.code); // "KeyA", "Enter", "ArrowUp"
  console.log(event.keyCode); // 65 (veraltet)
  console.log(event.shiftKey); // true/false (Shift gedrückt?)
  console.log(event.ctrlKey); // true/false (Strg gedrückt?)
  console.log(event.altKey); // true/false (Alt gedrückt?)
});
```

**Tastenkombinationen:**

```typescript
document.addEventListener("keydown", (event) => {
  // Strg + S (Speichern):
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // Standard "Speichern"-Dialog verhindern
    console.log("Speichern...");
  }

  // Strg + F (Suchen):
  if (event.ctrlKey && event.key === "f") {
    event.preventDefault();
    console.log("Suchen...");
  }
});
```

##### Form-Events

```typescript
// submit - Formular abgeschickt:
const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Standard-Submit verhindern

  const formData = new FormData(form);
  console.log("Formular-Daten:", formData);
});

// input - Eingabe geändert:
const input = document.querySelector("input") as HTMLInputElement;
input.addEventListener("input", (event) => {
  console.log("Neuer Wert:", input.value);
});

// change - Wert geändert (bei Blur):
input.addEventListener("change", (event) => {
  console.log("Wert geändert:", input.value);
});

// focus - Element erhält Fokus:
input.addEventListener("focus", (event) => {
  console.log("Input hat Fokus");
});

// blur - Element verliert Fokus:
input.addEventListener("blur", (event) => {
  console.log("Input verliert Fokus");
});
```

##### Mouse-Events

```typescript
// mouseover - Maus über Element:
element.addEventListener("mouseover", (event) => {
  console.log("Maus über Element");
});

// mouseout - Maus verlässt Element:
element.addEventListener("mouseout", (event) => {
  console.log("Maus verlässt Element");
});

// mouseenter - Maus betritt Element (kein Bubbling):
element.addEventListener("mouseenter", (event) => {
  console.log("Maus betritt");
});

// mouseleave - Maus verlässt Element (kein Bubbling):
element.addEventListener("mouseleave", (event) => {
  console.log("Maus verlässt");
});

// mousemove - Maus bewegt sich:
element.addEventListener("mousemove", (event) => {
  console.log("Maus-Position:", event.clientX, event.clientY);
});
```

---

#### Event Delegation

**Problem: Viele Event-Listener**

```typescript
// ❌ Ineffizient (100 Bücher = 100 Event-Listener):
books.forEach((book) => {
  const tr = createBookRow(book);
  const favBtn = tr.querySelector(".fav-btn");
  favBtn.addEventListener("click", () => {
    toggleFavorite(book);
  });
  tbody.appendChild(tr);
});
```

**Lösung: Event Delegation**

```typescript
// ✅ Effizienter (nur 1 Event-Listener):
tbody.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  // Prüfen, ob Favoriten-Button geklickt wurde:
  const favBtn = target.closest(".fav-btn");
  if (favBtn) {
    // ISBN aus Daten-Attribut lesen:
    const isbn = favBtn.getAttribute("data-isbn");
    const book = allBooks.find((b) => b.isbn === isbn);
    if (book) {
      toggleFavorite(book);
    }
  }
});
```

**Vorteile:**

✅ **Weniger Event-Listener** (bessere Performance)
✅ **Funktioniert für dynamische Elemente** (neu hinzugefügte)
✅ **Weniger Speicher-Verbrauch**

**closest() Methode:**

```typescript
// closest() findet nächsten Vorfahren, der passt:
const button = event.target as HTMLElement;
const favBtn = button.closest(".fav-btn");

// Funktioniert auch, wenn auf SVG-Icon geklickt wurde:
<button class="fav-btn">
  <svg>
    <path></path> ← User klickt hier
  </svg>
</button>;

// button.closest(".fav-btn") findet <button>
```

---

#### Event-Listener entfernen

##### removeEventListener()

```typescript
// Callback-Funktion definieren:
function handleClick() {
  console.log("Geklickt");
}

// Event-Listener hinzufügen:
button.addEventListener("click", handleClick);

// Event-Listener entfernen:
button.removeEventListener("click", handleClick);

// ⚠️ Muss dieselbe Funktion sein!
```

**Problem mit Arrow Functions:**

```typescript
// ❌ Funktioniert NICHT (neue Funktion bei jedem Aufruf):
button.addEventListener("click", () => console.log("Klick"));
button.removeEventListener("click", () => console.log("Klick"));
// → Event-Listener wird NICHT entfernt (unterschiedliche Funktionen)

// ✅ Funktioniert (gleiche Funktion):
const handleClick = () => console.log("Klick");
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```

##### once-Option

```typescript
// Event-Listener, der nur einmal ausgeführt wird:
button.addEventListener(
  "click",
  () => {
    console.log("Nur einmal!");
  },
  { once: true }
);

// Nach dem ersten Klick wird Listener automatisch entfernt
```

---

#### Event-Options

```typescript
element.addEventListener("click", callback, options);
//                                          ^^^^^^^^
//                                          Optional
```

**Verfügbare Optionen:**

```typescript
{
  capture: boolean; // Capturing-Phase statt Bubbling
  once: boolean; // Nur einmal ausführen
  passive: boolean; // preventDefault() deaktivieren (Performance)
  signal: AbortSignal; // Event-Listener per Signal entfernen
}
```

##### capture (Capturing vs. Bubbling)

```typescript
// Bubbling (Standard - von innen nach außen):
parent.addEventListener("click", () => console.log("Parent"), false);
child.addEventListener("click", () => console.log("Child"), false);
// Click auf Child: "Child" → "Parent"

// Capturing (von außen nach innen):
parent.addEventListener("click", () => console.log("Parent"), true);
child.addEventListener("click", () => console.log("Child"), true);
// Click auf Child: "Parent" → "Child"
```

##### passive (für Scroll-Performance)

```typescript
// Passive Event-Listener (kann preventDefault() nicht aufrufen):
document.addEventListener(
  "scroll",
  (event) => {
    // event.preventDefault(); ❌ Funktioniert nicht
    console.log("Gescrollt");
  },
  { passive: true }
);

// Warum?
// → Browser kann Scrolling optimieren
// → Weiß, dass preventDefault() nicht aufgerufen wird
// → Bessere Performance
```

##### signal (AbortController)

```typescript
// Event-Listener mit AbortController entfernen:
const controller = new AbortController();

button.addEventListener(
  "click",
  () => {
    console.log("Klick");
  },
  { signal: controller.signal }
);

// Event-Listener entfernen:
controller.abort();
// → Alle Listener mit diesem Signal werden entfernt
```

---

#### preventDefault() und stopPropagation()

##### preventDefault()

```typescript
// Standard-Verhalten verhindern:

// Link-Click verhindern:
link.addEventListener("click", (event) => {
  event.preventDefault(); // Link wird nicht geöffnet
  console.log("Link geklickt, aber nicht geöffnet");
});

// Formular-Submit verhindern:
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Seite wird nicht neu geladen
  console.log("Formular abgeschickt, aber nicht neu geladen");
});

// Kontextmenü verhindern:
element.addEventListener("contextmenu", (event) => {
  event.preventDefault(); // Standard-Kontextmenü wird nicht geöffnet
  console.log("Eigenes Kontextmenü anzeigen");
});
```

##### stopPropagation()

```typescript
// Event-Propagierung stoppen:
child.addEventListener("click", (event) => {
  event.stopPropagation(); // Event bubbelt nicht zu Parent
  console.log("Child geklickt");
});

parent.addEventListener("click", () => {
  console.log("Parent geklickt"); // Wird NICHT ausgeführt
});
```

##### stopImmediatePropagation()

```typescript
// Alle weiteren Event-Listener stoppen:
button.addEventListener("click", (event) => {
  event.stopImmediatePropagation();
  console.log("Erster Listener");
});

button.addEventListener("click", () => {
  console.log("Zweiter Listener"); // Wird NICHT ausgeführt
});
```

---

#### Custom Events

**Eigene Events erstellen:**

```typescript
// Custom Event erstellen:
const customEvent = new CustomEvent("bookAdded", {
  detail: { book: { title: "Angular" } },
});

// Event-Listener für Custom Event:
document.addEventListener("bookAdded", (event: CustomEvent) => {
  console.log("Buch hinzugefügt:", event.detail.book);
});

// Custom Event auslösen:
document.dispatchEvent(customEvent);
```

**Use Case:**

```typescript
// Komponente kommuniziert über Custom Events:
class BookList {
  addBook(book: Book) {
    // ... Buch hinzufügen

    // Custom Event auslösen:
    const event = new CustomEvent("bookAdded", { detail: { book } });
    document.dispatchEvent(event);
  }
}

// Andere Komponente reagiert:
document.addEventListener("bookAdded", (event: CustomEvent) => {
  console.log("Neues Buch:", event.detail.book.title);
  updateStatistics();
});
```

---

#### Häufige Fehler

##### 1. Event-Listener wird mehrfach hinzugefügt

```typescript
// ❌ Bei jedem Render wird neuer Listener hinzugefügt:
function renderBooks() {
  books.forEach((book) => {
    const button = createButton(book);
    button.addEventListener("click", () => handleClick(book));
    // Jedes Mal neuer Listener!
  });
}

// ✅ Nur einmal Listener hinzufügen:
function renderBooks() {
  books.forEach((book) => {
    const button = createButton(book);
    // Button neu erstellen → hat noch keinen Listener
    button.addEventListener("click", () => handleClick(book));
  });
}

// ✅ Oder: Event Delegation verwenden
```

##### 2. this in Event-Listener

```typescript
class BookList {
  books: Book[] = [];

  // ❌ 'this' ist falsch (zeigt auf event.target):
  init() {
    button.addEventListener("click", function () {
      console.log(this.books); // undefined! (this ist button)
    });
  }

  // ✅ Arrow Function (this ist BookList):
  init() {
    button.addEventListener("click", () => {
      console.log(this.books); // ✅ Funktioniert
    });
  }
}
```

##### 3. preventDefault() vergessen

```typescript
// ❌ Formular wird abgeschickt (Seite neu geladen):
form.addEventListener("submit", (event) => {
  const data = new FormData(form);
  sendToServer(data);
  // Seite wird neu geladen!
});

// ✅ preventDefault() verhindert Neu-Laden:
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  sendToServer(data);
});
```

---

#### Zusammenfassung

**Event-Listener ermöglichen Interaktivität:**

✅ **Auf Benutzer-Aktionen reagieren** - Klicks, Eingaben, etc.
✅ **Event-Objekt** - Enthält Details über Event
✅ **Multiple Listener** - Mehrere pro Element möglich
✅ **Event Bubbling** - Events propagieren nach oben
✅ **Event Delegation** - Ein Listener für viele Elemente

**Wichtige Methoden:**

| Methode                   | Beschreibung                  | Beispiel                                  |
| ------------------------- | ----------------------------- | ----------------------------------------- |
| **addEventListener()**    | Event-Listener hinzufügen     | `button.addEventListener("click", ...)`   |
| **removeEventListener()** | Event-Listener entfernen      | `button.removeEventListener("click", fn)` |
| **preventDefault()**      | Standard-Verhalten verhindern | `event.preventDefault()`                  |
| **stopPropagation()**     | Event-Bubbling stoppen        | `event.stopPropagation()`                 |
| **dispatchEvent()**       | Custom Event auslösen         | `element.dispatchEvent(event)`            |

**Wichtige Events:**

| Event         | Wann                 | Use Case                |
| ------------- | -------------------- | ----------------------- |
| **click**     | Element geklickt     | Buttons, Links          |
| **input**     | Eingabe geändert     | Live-Suche              |
| **change**    | Wert geändert        | Dropdowns, Checkboxen   |
| **submit**    | Formular abgeschickt | Form-Validierung        |
| **keydown**   | Taste gedrückt       | Tastatur-Shortcuts      |
| **mouseover** | Maus über Element    | Tooltips, Hover-Effekte |

**In diesem Projekt:**

```typescript
// 1. Such-Eingabe (Live-Suche):
searchInput.addEventListener("input", (event) => {
  searchTerm = (event.target as HTMLInputElement).value;
  filterAndRenderBooks();
});

// 2. Publisher-Filter:
publisherFilter.addEventListener("change", (event) => {
  selectedPublisher = (event.target as HTMLSelectElement).value;
  filterAndRenderBooks();
});

// 3. Favoriten-Button:
favBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleFavorite(book);
});
```

**Best Practices:**

✅ **addEventListener statt onclick** - Mehrere Listener möglich
✅ **Arrow Functions** - Für korrektes `this`
✅ **preventDefault()** bei Forms - Seite nicht neu laden
✅ **stopPropagation()** bei verschachtelten Events
✅ **Event Delegation** für dynamische Elemente
✅ **removeEventListener()** bei Cleanup

**Nächster Schritt:** Favoriten werden in **localStorage** gespeichert → Siehe Abschnitt "localStorage"

### 7. localStorage

**localStorage** ist eine Browser-API zum **dauerhaften Speichern** von Daten im Browser. Die Daten bleiben **auch nach dem Schließen** des Browsers erhalten und können später wieder abgerufen werden.

#### Was ist localStorage?

**localStorage** ermöglicht es, **Key-Value-Paare** im Browser zu speichern:

```typescript
// Daten speichern:
localStorage.setItem("name", "Angular");

// Daten abrufen:
const name = localStorage.getItem("name");
console.log(name); // "Angular"

// Daten löschen:
localStorage.removeItem("name");

// Alle Daten löschen:
localStorage.clear();
```

---

#### Eigenschaften von localStorage

| Eigenschaft     | Wert                                  |
| --------------- | ------------------------------------- |
| **Speicherort** | Browser (lokal)                       |
| **Größe**       | ~5-10 MB (je nach Browser)            |
| **Datentyp**    | Nur Strings                           |
| **Lebensdauer** | Permanent (bis manuell gelöscht)      |
| **Scope**       | Pro Origin (Domain + Protocol + Port) |
| **Zugriff**     | Synchron (blockierend)                |

**Origin-Scope:**

```
Verschiedene Origins (getrennte localStorage):
https://example.com       → eigener localStorage
https://api.example.com   → eigener localStorage (Subdomain)
http://example.com        → eigener localStorage (anderes Protocol)
https://example.com:8080  → eigener localStorage (anderer Port)

Gleiche Origin (gemeinsamer localStorage):
https://example.com/page1
https://example.com/page2
https://example.com/admin
→ Alle teilen denselben localStorage
```

---

#### localStorage API

##### setItem() - Daten speichern

```typescript
// String speichern:
localStorage.setItem("key", "value");

// Beispiele:
localStorage.setItem("username", "Max");
localStorage.setItem("theme", "dark");
localStorage.setItem("language", "de");
```

**Überschreiben:**

```typescript
// Erstes Mal:
localStorage.setItem("count", "1");
console.log(localStorage.getItem("count")); // "1"

// Zweites Mal (überschreibt):
localStorage.setItem("count", "2");
console.log(localStorage.getItem("count")); // "2"
```

##### getItem() - Daten abrufen

```typescript
// Daten abrufen:
const value = localStorage.getItem("key");

// Wenn Key nicht existiert:
const missing = localStorage.getItem("notExist");
console.log(missing); // null

// Sicherer Check:
const value = localStorage.getItem("key");
if (value !== null) {
  console.log("Gefunden:", value);
} else {
  console.log("Nicht gefunden");
}

// Mit Nullish Coalescing:
const value = localStorage.getItem("key") ?? "default";
```

##### removeItem() - Einzelnen Eintrag löschen

```typescript
// Eintrag löschen:
localStorage.removeItem("key");

// Prüfen:
console.log(localStorage.getItem("key")); // null
```

##### clear() - Alle Einträge löschen

```typescript
// Alle Einträge löschen:
localStorage.clear();

// localStorage ist leer:
console.log(localStorage.length); // 0
```

##### key() und length - Iteration

```typescript
// Anzahl der Einträge:
console.log(localStorage.length); // z.B. 3

// Alle Keys durchgehen:
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(`${key}: ${value}`);
}
```

---

#### Nur Strings speichern

**Problem:** localStorage speichert nur Strings!

```typescript
// ❌ Zahlen werden zu Strings:
localStorage.setItem("count", 42);
const count = localStorage.getItem("count");
console.log(typeof count); // "string" (nicht number!)
console.log(count); // "42" (String)

// ❌ Objekte werden zu "[object Object]":
const user = { name: "Max", age: 30 };
localStorage.setItem("user", user);
console.log(localStorage.getItem("user")); // "[object Object]" ❌
```

**Lösung: JSON.stringify() und JSON.parse()**

```typescript
// ✅ Objekt speichern mit JSON.stringify():
const user = { name: "Max", age: 30 };
localStorage.setItem("user", JSON.stringify(user));

// ✅ Objekt abrufen mit JSON.parse():
const userString = localStorage.getItem("user");
if (userString) {
  const user = JSON.parse(userString);
  console.log(user); // { name: "Max", age: 30 }
  console.log(typeof user); // "object"
}
```

**Array speichern:**

```typescript
// Array speichern:
const numbers = [1, 2, 3, 4, 5];
localStorage.setItem("numbers", JSON.stringify(numbers));

// Array abrufen:
const numbersString = localStorage.getItem("numbers");
if (numbersString) {
  const numbers = JSON.parse(numbersString);
  console.log(numbers); // [1, 2, 3, 4, 5]
  console.log(Array.isArray(numbers)); // true
}
```

---

#### localStorage in diesem Projekt

##### Favoriten speichern

```typescript
// index.ts:
function saveFavorites(): void {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
```

**Schritt-für-Schritt:**

```typescript
// 1. favorites ist ein Array von ISBNs:
const favorites: string[] = ["9783864907791", "9783864906466"];

// 2. JSON.stringify() wandelt Array in String:
const favoritesString = JSON.stringify(favorites);
console.log(favoritesString); // '["9783864907791","9783864906466"]'

// 3. String wird in localStorage gespeichert:
localStorage.setItem("favorites", favoritesString);
```

**Browser Developer Tools:**

```
Application → Storage → Local Storage → http://localhost:3000

Key: favorites
Value: ["9783864907791","9783864906466"]
```

##### Favoriten laden

```typescript
// index.ts:
function loadFavorites(): void {
  const favoritesString = localStorage.getItem("favorites");
  if (favoritesString) {
    favorites = JSON.parse(favoritesString);
  }
}
```

**Schritt-für-Schritt:**

```typescript
// 1. String aus localStorage abrufen:
const favoritesString = localStorage.getItem("favorites");
// → '["9783864907791","9783864906466"]' oder null

// 2. Prüfen, ob Daten vorhanden:
if (favoritesString) {
  // 3. JSON.parse() wandelt String zurück in Array:
  favorites = JSON.parse(favoritesString);
  // → ["9783864907791", "9783864906466"]
}

// Falls nicht vorhanden:
if (favoritesString === null) {
  favorites = []; // Leeres Array (Standardwert)
}
```

##### Favorit hinzufügen/entfernen

```typescript
function toggleFavorite(book: Book): void {
  const index = favorites.indexOf(book.isbn);

  if (index > -1) {
    // Favorit entfernen:
    favorites.splice(index, 1);
  } else {
    // Favorit hinzufügen:
    favorites.push(book.isbn);
  }

  // ✅ In localStorage speichern:
  saveFavorites();

  // UI aktualisieren:
  renderBooks(allBooks);
}
```

**Workflow:**

```
1. User klickt auf Herz-Icon
   ↓
2. toggleFavorite(book) wird aufgerufen
   ↓
3. favorites-Array wird aktualisiert (push/splice)
   ↓
4. saveFavorites() speichert in localStorage
   ↓
5. renderBooks() aktualisiert UI

Bei nächstem Seitenaufruf:
1. loadFavorites() lädt Daten aus localStorage
   ↓
2. favorites-Array ist wieder befüllt
   ↓
3. Favoriten-Icons werden korrekt angezeigt
```

---

#### localStorage vs. sessionStorage

JavaScript bietet zwei Web Storage APIs:

| Feature         | localStorage               | sessionStorage        |
| --------------- | -------------------------- | --------------------- |
| **Lebensdauer** | Permanent                  | Nur Session           |
| **Löschen**     | Manuell oder Browser-Clear | Browser-Tab schließen |
| **Scope**       | Alle Tabs/Fenster          | Nur aktueller Tab     |
| **Use Case**    | Dauerhafte Einstellungen   | Temporäre Daten       |

**Beispiel sessionStorage:**

```typescript
// sessionStorage (gleiche API wie localStorage):
sessionStorage.setItem("tempData", "value");
const data = sessionStorage.getItem("tempData");
sessionStorage.removeItem("tempData");
sessionStorage.clear();

// Daten verschwinden beim Schließen des Tabs
```

**Use Cases:**

```typescript
// localStorage (permanent):
localStorage.setItem("theme", "dark"); // Theme-Einstellung
localStorage.setItem("language", "de"); // Sprache
localStorage.setItem("favorites", JSON.stringify(favs)); // Favoriten

// sessionStorage (temporär):
sessionStorage.setItem("formData", JSON.stringify(data)); // Formular-Zwischenspeicher
sessionStorage.setItem("scrollPosition", "1200"); // Scroll-Position
sessionStorage.setItem("filters", JSON.stringify(filters)); // Aktive Filter
```

---

#### Fehlerbehandlung

##### QuotaExceededError

```typescript
// ❌ localStorage ist voll (5-10 MB):
try {
  localStorage.setItem("huge", "x".repeat(10_000_000));
} catch (error) {
  if (error instanceof DOMException && error.name === "QuotaExceededError") {
    console.error("localStorage ist voll!");
    // Lösung: Alte Daten löschen oder weniger speichern
  }
}
```

##### localStorage nicht verfügbar

```typescript
// Private/Inkognito-Modus oder localStorage deaktiviert:
function isLocalStorageAvailable(): boolean {
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}

if (!isLocalStorageAvailable()) {
  console.warn("localStorage nicht verfügbar");
  // Fallback: In-Memory-Storage oder Cookie
}
```

##### JSON.parse() Fehler

```typescript
// ❌ Ungültiges JSON:
try {
  const data = JSON.parse(localStorage.getItem("data") || "");
} catch (error) {
  console.error("JSON.parse() Fehler:", error);
  // Fallback: Standardwert verwenden
  const data = [];
}

// ✅ Sicherer:
function getStoredData(key: string, defaultValue: any): any {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Fehler beim Laden von", key, error);
    return defaultValue;
  }
}

const favorites = getStoredData("favorites", []);
```

---

#### Browser Developer Tools

**localStorage inspizieren:**

```
Chrome/Edge:
F12 → Application Tab → Storage → Local Storage → http://localhost:3000

Firefox:
F12 → Storage Tab → Local Storage → http://localhost:3000

Safari:
Cmd+Option+C → Storage → Local Storage
```

**localStorage bearbeiten:**

```
1. Key anklicken → Wert ändern
2. Rechtsklick → Delete (Eintrag löschen)
3. Clear All (alle Einträge löschen)
```

**Console:**

```javascript
// Alle Einträge anzeigen:
console.table(localStorage);

// Einzelner Eintrag:
console.log(localStorage.getItem("favorites"));

// Manuell ändern:
localStorage.setItem("favorites", '["123", "456"]');
```

---

#### Sicherheit und Datenschutz

##### Keine sensiblen Daten speichern

```typescript
// ❌ NIEMALS sensible Daten speichern:
localStorage.setItem("password", "geheim123"); // ❌
localStorage.setItem("creditCard", "1234-5678"); // ❌
localStorage.setItem("apiToken", "secret_token"); // ❌

// localStorage ist NICHT verschlüsselt!
// Jeder mit Zugriff auf den Browser kann Daten lesen!

// ✅ Nur unkritische Daten:
localStorage.setItem("theme", "dark"); // ✅
localStorage.setItem("favorites", JSON.stringify([])); // ✅
localStorage.setItem("lastVisit", new Date().toISOString()); // ✅
```

##### XSS-Angriffe

```typescript
// ❌ User-Input direkt speichern und ausgeben:
const userInput = prompt("Name?");
localStorage.setItem("name", userInput);

const name = localStorage.getItem("name");
document.innerHTML = `<h1>${name}</h1>`; // XSS möglich!

// Falls userInput = "<script>alert('XSS')</script>"
// → Script wird ausgeführt!

// ✅ Input validieren/escapen:
const name = localStorage.getItem("name");
document.textContent = name; // Escaped automatisch
```

---

#### localStorage Events

**storage-Event** wird gefeuert, wenn localStorage in **anderem Tab/Fenster** geändert wird:

```typescript
// Tab 1: Listener hinzufügen
window.addEventListener("storage", (event) => {
  console.log("localStorage wurde geändert:");
  console.log("Key:", event.key);
  console.log("Alter Wert:", event.oldValue);
  console.log("Neuer Wert:", event.newValue);
  console.log("URL:", event.url);
});

// Tab 2: localStorage ändern
localStorage.setItem("favorites", '["123"]');

// Tab 1: storage-Event wird gefeuert
// → Key: "favorites"
// → Alter Wert: null
// → Neuer Wert: '["123"]'
```

**Use Case: Sync zwischen Tabs**

```typescript
// Favoriten zwischen Tabs synchronisieren:
window.addEventListener("storage", (event) => {
  if (event.key === "favorites") {
    // Favoriten neu laden:
    loadFavorites();
    renderBooks(allBooks);
  }
});

// User fügt in Tab A Favorit hinzu
// → Tab B wird automatisch aktualisiert
```

---

#### Alternativen zu localStorage

##### 1. sessionStorage (temporär)

```typescript
// Nur für Session:
sessionStorage.setItem("key", "value");
```

##### 2. Cookies (mit Server-Zugriff)

```typescript
// Cookie setzen:
document.cookie = "username=Max; max-age=86400; path=/";

// Cookie lesen (umständlich):
const cookies = document.cookie.split("; ");
const usernameCookie = cookies.find((c) => c.startsWith("username="));
const username = usernameCookie?.split("=")[1];

// Vorteile:
// ✅ Server kann Cookies lesen
// ✅ Ablaufdatum (max-age, expires)
// ✅ httpOnly-Flag (vor JavaScript geschützt)

// Nachteile:
// ❌ Komplizierter als localStorage
// ❌ Nur 4 KB Speicher
// ❌ Bei jedem HTTP-Request mitgeschickt
```

##### 3. IndexedDB (große Datenmengen)

```typescript
// IndexedDB für große Datenbanken:
// - Kann MB/GB speichern
// - Asynchron (nicht-blockierend)
// - Komplex zu verwenden

// Beispiel (vereinfacht):
const request = indexedDB.open("myDatabase", 1);
request.onsuccess = (event) => {
  const db = event.target.result;
  // ... Daten speichern/abrufen
};
```

##### 4. Cache API (für Service Workers)

```typescript
// Cache API für Offline-Apps:
caches.open("v1").then((cache) => {
  cache.add("/index.html");
  cache.add("/styles.css");
});
```

---

#### Best Practices

##### 1. Immer try/catch verwenden

```typescript
// ✅ Mit try/catch:
function saveFavorites(favorites: string[]): void {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
    // Fallback oder User benachrichtigen
  }
}
```

##### 2. Validierung nach dem Laden

```typescript
// ✅ Daten validieren:
function loadFavorites(): string[] {
  try {
    const data = localStorage.getItem("favorites");
    if (!data) return [];

    const parsed = JSON.parse(data);

    // Validieren:
    if (!Array.isArray(parsed)) {
      console.warn("Ungültige Daten in localStorage");
      return [];
    }

    // Prüfen, ob alle Einträge Strings sind:
    if (!parsed.every((item) => typeof item === "string")) {
      console.warn("Ungültige ISBN-Einträge");
      return [];
    }

    return parsed;
  } catch (error) {
    console.error("Fehler beim Laden:", error);
    return [];
  }
}
```

##### 3. Namespacing verwenden

```typescript
// ❌ Ohne Namespace (könnte kollidieren):
localStorage.setItem("favorites", "...");
localStorage.setItem("settings", "...");

// ✅ Mit Namespace (klar strukturiert):
localStorage.setItem("bookApp:favorites", "...");
localStorage.setItem("bookApp:settings", "...");
localStorage.setItem("bookApp:theme", "...");

// Helper-Funktionen:
const STORAGE_PREFIX = "bookApp:";

function setItem(key: string, value: any): void {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
}

function getItem(key: string): any {
  const data = localStorage.getItem(STORAGE_PREFIX + key);
  return data ? JSON.parse(data) : null;
}
```

##### 4. Versionierung für Datenformat

```typescript
// Datenformat kann sich ändern:
interface StorageData {
  version: number;
  favorites: string[];
}

function saveFavorites(favorites: string[]): void {
  const data: StorageData = {
    version: 1,
    favorites,
  };
  localStorage.setItem("bookApp:data", JSON.stringify(data));
}

function loadFavorites(): string[] {
  const dataString = localStorage.getItem("bookApp:data");
  if (!dataString) return [];

  const data: StorageData = JSON.parse(dataString);

  // Version prüfen:
  if (data.version === 1) {
    return data.favorites;
  } else {
    // Migration für alte Versionen:
    console.warn("Alte Datenversion, migriere...");
    return [];
  }
}
```

---

#### Zusammenfassung

**localStorage ermöglicht:**

✅ **Permanente Speicherung** - Daten bleiben nach Browser-Neustart
✅ **Einfache API** - setItem, getItem, removeItem, clear
✅ **Client-seitig** - Keine Server-Kommunikation nötig
✅ **Pro Origin** - Daten sind isoliert pro Domain
✅ **Synchron** - Sofort verfügbar (kein async/await)

**Wichtige Methoden:**

| Methode          | Beschreibung    | Beispiel                               |
| ---------------- | --------------- | -------------------------------------- |
| **setItem()**    | Daten speichern | `localStorage.setItem("key", "value")` |
| **getItem()**    | Daten abrufen   | `localStorage.getItem("key")`          |
| **removeItem()** | Eintrag löschen | `localStorage.removeItem("key")`       |
| **clear()**      | Alle löschen    | `localStorage.clear()`                 |
| **key()**        | Key an Index    | `localStorage.key(0)`                  |

**Mit JSON für Objekte/Arrays:**

```typescript
// Speichern:
localStorage.setItem("data", JSON.stringify(object));

// Abrufen:
const object = JSON.parse(localStorage.getItem("data") || "{}");
```

**In diesem Projekt:**

```typescript
// Favoriten speichern:
localStorage.setItem("favorites", JSON.stringify(favorites));

// Favoriten laden:
const favoritesString = localStorage.getItem("favorites");
if (favoritesString) {
  favorites = JSON.parse(favoritesString);
}

// Favorit hinzufügen/entfernen → speichern:
function toggleFavorite(book: Book): void {
  // ... Array aktualisieren
  saveFavorites(); // In localStorage speichern
}
```

**Best Practices:**

✅ **try/catch** für Fehlerbehandlung
✅ **JSON.stringify/parse** für Objekte/Arrays
✅ **Validierung** nach dem Laden
✅ **Namespacing** (z.B. "app:key")
✅ **Keine sensiblen Daten** (Passwörter, Tokens)
✅ **Verfügbarkeit prüfen** (Inkognito-Modus)

**Nächster Schritt:** Bücher werden mit **Array-Methoden** gefiltert → Siehe Abschnitt "Array-Methoden"

### 8. Array-Methoden

**Array-Methoden** sind eingebaute Funktionen, die auf Arrays operieren. Sie ermöglichen das **Filtern, Suchen, Transformieren und Iterieren** von Arrays ohne manuelle Schleifen.

#### Überblick der verwendeten Methoden

In diesem Projekt werden folgende Array-Methoden verwendet:

| Methode        | Beschreibung                         | Return                   | Verändert Original? |
| -------------- | ------------------------------------ | ------------------------ | ------------------- |
| **forEach()**  | Führt Funktion für jedes Element aus | `undefined`              | Nein                |
| **filter()**   | Filtert Elemente nach Bedingung      | Neues Array              | Nein                |
| **find()**     | Findet erstes Element nach Bedingung | Element oder `undefined` | Nein                |
| **includes()** | Prüft, ob Element enthalten          | `boolean`                | Nein                |
| **indexOf()**  | Findet Index eines Elements          | Index oder `-1`          | Nein                |
| **push()**     | Fügt Element am Ende hinzu           | Neue Länge               | **Ja**              |
| **splice()**   | Entfernt/Ersetzt Elemente            | Entfernte Elemente       | **Ja**              |

---

#### forEach() - Iteration über Array

**forEach()** führt eine Funktion für **jedes Element** im Array aus:

```typescript
// Syntax:
array.forEach((element, index, array) => {
  // Code für jedes Element
});
```

**Einfaches Beispiel:**

```typescript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => {
  console.log(num);
});

// Ausgabe:
// 1
// 2
// 3
// 4
// 5
```

**Mit Index:**

```typescript
const fruits = ["Apfel", "Banane", "Orange"];

fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});

// Ausgabe:
// 0: Apfel
// 1: Banane
// 2: Orange
```

##### forEach() in diesem Projekt

```typescript
// index.ts - Bücher rendern:
function renderBooks(books: Book[]): void {
  container.innerHTML = "";
  books.forEach((book) => {
    const bookItem = createBookItem(book);
    container.appendChild(bookItem);
  });
}
```

**Schritt-für-Schritt:**

```typescript
const books: Book[] = [
  { isbn: "123", title: "Angular" /* ... */ },
  { isbn: "456", title: "React" /* ... */ },
  { isbn: "789", title: "Vue" /* ... */ },
];

// 1. Durchlauf: book = { isbn: "123", title: "Angular", ... }
//    → createBookItem(book) erstellt HTML
//    → appendChild() fügt ins DOM ein

// 2. Durchlauf: book = { isbn: "456", title: "React", ... }
//    → createBookItem(book) erstellt HTML
//    → appendChild() fügt ins DOM ein

// 3. Durchlauf: book = { isbn: "789", title: "Vue", ... }
//    → createBookItem(book) erstellt HTML
//    → appendChild() fügt ins DOM ein
```

**Alternative (ohne forEach):**

```typescript
// ❌ Mit for-Schleife (umständlicher):
for (let i = 0; i < books.length; i++) {
  const book = books[i];
  const bookItem = createBookItem(book);
  container.appendChild(bookItem);
}

// ✅ Mit forEach (kürzer und lesbarer):
books.forEach((book) => {
  const bookItem = createBookItem(book);
  container.appendChild(bookItem);
});
```

**forEach() vs. for-Schleife:**

| Feature            | forEach()                            | for-Schleife        |
| ------------------ | ------------------------------------ | ------------------- |
| **Syntax**         | Kurz und lesbar                      | Länger              |
| **break/continue** | ❌ Nicht möglich                     | ✅ Möglich          |
| **return**         | Beendet nur Callback, nicht Funktion | ✅ Beendet Funktion |
| **Use Case**       | Alle Elemente verarbeiten            | Komplexe Kontrolle  |

---

#### filter() - Array filtern

**filter()** erstellt ein **neues Array** mit allen Elementen, die eine Bedingung erfüllen:

```typescript
// Syntax:
const filtered = array.filter((element, index, array) => {
  return boolean; // true = behalten, false = rausfiltern
});
```

**Einfaches Beispiel:**

```typescript
const numbers = [1, 2, 3, 4, 5, 6];

// Nur gerade Zahlen:
const even = numbers.filter((num) => num % 2 === 0);
console.log(even); // [2, 4, 6]

// Original unverändert:
console.log(numbers); // [1, 2, 3, 4, 5, 6]
```

**Objekte filtern:**

```typescript
const users = [
  { name: "Max", age: 25 },
  { name: "Lisa", age: 30 },
  { name: "Tom", age: 17 },
];

// Nur Erwachsene (age >= 18):
const adults = users.filter((user) => user.age >= 18);
console.log(adults);
// [{ name: "Max", age: 25 }, { name: "Lisa", age: 30 }]
```

##### filter() in diesem Projekt

```typescript
// index.ts - Bücher nach Suchbegriff filtern:
function filterBooks(): void {
  const searchText = searchInput.value.toLowerCase();

  let filtered = allBooks.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchText) ||
      book.subtitle.toLowerCase().includes(searchText) ||
      book.isbn.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText)
    );
  });

  renderBooks(filtered);
}
```

**Schritt-für-Schritt:**

```typescript
// User tippt "Angular" in Suchfeld:
const searchText = "angular";

const allBooks: Book[] = [
  { title: "Angular", subtitle: "Das große Handbuch" /* ... */ },
  { title: "React", subtitle: "Die Dokumentation" /* ... */ },
  { title: "Vue.js", subtitle: "Angular Alternative" /* ... */ },
];

// filter() prüft jedes Buch:

// 1. Buch: "Angular"
//    book.title.toLowerCase().includes("angular") → true
//    → Bedingung erfüllt → BEHALTEN

// 2. Buch: "React"
//    book.title.toLowerCase().includes("angular") → false
//    book.subtitle.toLowerCase().includes("angular") → false
//    book.isbn.toLowerCase().includes("angular") → false
//    book.author.toLowerCase().includes("angular") → false
//    → Bedingung nicht erfüllt → RAUSFILTERN

// 3. Buch: "Vue.js"
//    book.subtitle.toLowerCase().includes("angular") → true
//    → Bedingung erfüllt → BEHALTEN

// Ergebnis:
const filtered = [
  { title: "Angular" /* ... */ },
  { title: "Vue.js", subtitle: "Angular Alternative" /* ... */ },
];
```

**Filter-Chain (mehrere Filter):**

```typescript
// favorite.ts - Nur Favoriten anzeigen:
function loadAndRenderFavorites(): void {
  const favoritesString = localStorage.getItem("favorites");

  if (favoritesString) {
    const favoriteISBNs: string[] = JSON.parse(favoritesString);

    // Filtere alle Bücher:
    const favoriteBooks = allBooks.filter((book) => {
      return favoriteISBNs.includes(book.isbn);
    });

    renderBooks(favoriteBooks);
  }
}
```

**Visualisierung:**

```
Alle Bücher:          favoriteISBNs:      Ergebnis:
[                     ["123", "789"]      [
  { isbn: "123" },                          { isbn: "123" },  ✅
  { isbn: "456" },                          { isbn: "789" }   ✅
  { isbn: "789" },                        ]
  { isbn: "999" }
]

filter() prüft:
- isbn "123" in ["123", "789"]? → JA → behalten
- isbn "456" in ["123", "789"]? → NEIN → rausfiltern
- isbn "789" in ["123", "789"]? → JA → behalten
- isbn "999" in ["123", "789"]? → NEIN → rausfiltern
```

---

#### find() - Erstes Element finden

**find()** gibt das **erste Element** zurück, das eine Bedingung erfüllt:

```typescript
// Syntax:
const element = array.find((element, index, array) => {
  return boolean; // true = gefunden
});
// Rückgabe: Element oder undefined
```

**Einfaches Beispiel:**

```typescript
const numbers = [1, 2, 3, 4, 5];

// Erste Zahl > 3:
const result = numbers.find((num) => num > 3);
console.log(result); // 4 (nicht 5, nur erstes!)

// Nicht gefunden:
const missing = numbers.find((num) => num > 10);
console.log(missing); // undefined
```

**Objekte durchsuchen:**

```typescript
const users = [
  { id: 1, name: "Max" },
  { id: 2, name: "Lisa" },
  { id: 3, name: "Tom" },
];

// User mit id = 2:
const user = users.find((u) => u.id === 2);
console.log(user); // { id: 2, name: "Lisa" }

// Sicherer Check:
if (user) {
  console.log(user.name); // "Lisa"
} else {
  console.log("Nicht gefunden");
}
```

##### find() in diesem Projekt

```typescript
// detail.ts - Buch anhand ISBN finden:
const params = new URLSearchParams(window.location.search);
const isbn = params.get("isbn");

if (isbn) {
  const book = allBooks.find((b) => b.isbn === isbn);

  if (book) {
    renderBookDetail(book);
  } else {
    showError();
  }
}
```

**Schritt-für-Schritt:**

```typescript
// URL: detail.html?isbn=9783864907791

// 1. ISBN aus URL extrahieren:
const isbn = "9783864907791";

// 2. Bücher durchsuchen:
const allBooks: Book[] = [
  { isbn: "9783864906466", title: "React" /* ... */ },
  { isbn: "9783864907791", title: "Angular" /* ... */ },
  { isbn: "9783864905520", title: "Vue" /* ... */ },
];

// find() prüft:
// 1. Buch: "9783864906466" === "9783864907791"? → false → weiter
// 2. Buch: "9783864907791" === "9783864907791"? → true → GEFUNDEN!
// → find() gibt dieses Buch zurück und stoppt

const book = { isbn: "9783864907791", title: "Angular" /* ... */ };

// 3. Buch wird nie geprüft (find stoppt nach Fund)
```

**find() vs. filter():**

| Feature         | find()                          | filter()               |
| --------------- | ------------------------------- | ---------------------- |
| **Rückgabe**    | Erstes Element oder `undefined` | Array (kann leer sein) |
| **Stoppt nach** | Erstem Match                    | Nie (prüft alle)       |
| **Use Case**    | Ein bestimmtes Element          | Mehrere Elemente       |

```typescript
// find() - nur ein Element:
const book = books.find((b) => b.isbn === "123");
// → { isbn: "123", ... } oder undefined

// filter() - alle passenden:
const books = allBooks.filter((b) => b.rating >= 4);
// → [{ rating: 4.5, ... }, { rating: 5, ... }]
```

---

#### includes() - Prüfen ob Element enthalten

**includes()** prüft, ob ein Wert im Array enthalten ist:

```typescript
// Syntax:
const exists = array.includes(searchElement);
// Rückgabe: true oder false
```

**Einfaches Beispiel:**

```typescript
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.includes(3)); // true
console.log(numbers.includes(10)); // false

const fruits = ["Apfel", "Banane", "Orange"];
console.log(fruits.includes("Banane")); // true
console.log(fruits.includes("Kiwi")); // false
```

**Case-sensitive bei Strings:**

```typescript
const words = ["Hello", "World"];

console.log(words.includes("hello")); // false (kleingeschrieben!)
console.log(words.includes("Hello")); // true
```

##### includes() in diesem Projekt

**1. String-Suche (String.prototype.includes):**

```typescript
// index.ts - Prüfen ob Suchtext in Titel vorkommt:
function filterBooks(): void {
  const searchText = searchInput.value.toLowerCase();

  let filtered = allBooks.filter((book) => {
    return book.title.toLowerCase().includes(searchText);
  });

  renderBooks(filtered);
}
```

**Hinweis:** `book.title.includes()` ist **String.includes()**, nicht Array.includes()!

```typescript
// String.includes() (auf String-Objekt):
const title = "Angular - Das große Handbuch";
console.log(title.includes("Angular")); // true
console.log(title.includes("React")); // false

// Array.includes() (auf Array):
const tags = ["angular", "typescript", "web"];
console.log(tags.includes("angular")); // true
console.log(tags.includes("react")); // false
```

**2. ISBN-Check (Array.includes):**

```typescript
// favorite.ts - Prüfen ob ISBN in Favoriten:
const favoriteISBNs: string[] = ["123", "456", "789"];

const favoriteBooks = allBooks.filter((book) => {
  return favoriteISBNs.includes(book.isbn);
});
```

**Schritt-für-Schritt:**

```typescript
const favoriteISBNs = ["9783864907791", "9783864906466"];

// Buch 1:
const book1 = { isbn: "9783864907791" /* ... */ };
favoriteISBNs.includes("9783864907791"); // true → behalten

// Buch 2:
const book2 = { isbn: "9783898646420" /* ... */ };
favoriteISBNs.includes("9783898646420"); // false → rausfiltern

// Buch 3:
const book3 = { isbn: "9783864906466" /* ... */ };
favoriteISBNs.includes("9783864906466"); // true → behalten
```

**includes() vs. indexOf():**

```typescript
// includes() (modern, lesbar):
if (favoriteISBNs.includes(book.isbn)) {
  console.log("Ist Favorit");
}

// indexOf() (alt, umständlich):
if (favoriteISBNs.indexOf(book.isbn) !== -1) {
  console.log("Ist Favorit");
}

// ✅ includes() ist besser lesbar!
```

---

#### indexOf() - Index eines Elements

**indexOf()** gibt den **Index** eines Elements zurück:

```typescript
// Syntax:
const index = array.indexOf(searchElement);
// Rückgabe: Index (0-basiert) oder -1 (nicht gefunden)
```

**Einfaches Beispiel:**

```typescript
const fruits = ["Apfel", "Banane", "Orange", "Banane"];

console.log(fruits.indexOf("Banane")); // 1 (erste Position)
console.log(fruits.indexOf("Orange")); // 2
console.log(fruits.indexOf("Kiwi")); // -1 (nicht gefunden)
```

**Index als Zahl:**

```typescript
const numbers = [10, 20, 30, 40];

const index = numbers.indexOf(30);
console.log(index); // 2

// Element an diesem Index:
console.log(numbers[index]); // 30
```

##### indexOf() in diesem Projekt

```typescript
// index.ts - Favorit hinzufügen/entfernen:
function toggleFavorite(book: Book): void {
  const index = favorites.indexOf(book.isbn);

  if (index > -1) {
    // Favorit vorhanden → entfernen
    favorites.splice(index, 1);
  } else {
    // Favorit nicht vorhanden → hinzufügen
    favorites.push(book.isbn);
  }

  saveFavorites();
  renderBooks(allBooks);
}
```

**Schritt-für-Schritt:**

```typescript
const favorites = ["9783864907791", "9783864906466"];

// User klickt auf Favorit-Herz von Buch mit isbn "9783864906466":

// 1. Index suchen:
const index = favorites.indexOf("9783864906466");
// → 1 (an zweiter Position)

// 2. Prüfen ob gefunden:
if (index > -1) {
  // 1 > -1 → true
  // 3. An diesem Index entfernen:
  favorites.splice(1, 1);
  // → favorites ist jetzt ["9783864907791"]
}

// ---

// User klickt auf Herz von neuem Buch mit isbn "9783898646420":

// 1. Index suchen:
const index = favorites.indexOf("9783898646420");
// → -1 (nicht gefunden)

// 2. Prüfen ob gefunden:
if (index > -1) {
  // -1 > -1 → false
  // Wird nicht ausgeführt
} else {
  // 3. Hinzufügen:
  favorites.push("9783898646420");
  // → favorites ist jetzt ["9783864907791", "9783898646420"]
}
```

**Warum `index > -1`?**

```typescript
// ✅ Standard-Pattern:
if (index > -1) {
  /* gefunden */
}

// ✅ Alternative:
if (index !== -1) {
  /* gefunden */
}

// ❌ FALSCH (0 ist falsy!):
if (index) {
  /* ... */
}
// Problem: index = 0 ist auch ein gültiger Index!

const arr = ["a", "b", "c"];
const idx = arr.indexOf("a"); // 0
if (idx) {
  // 0 ist falsy → false ❌
  console.log("Gefunden"); // Wird nicht ausgeführt!
}
```

---

#### push() - Element hinzufügen

**push()** fügt ein oder mehrere Elemente **am Ende** des Arrays hinzu:

```typescript
// Syntax:
const newLength = array.push(element1, element2, ...);
// Rückgabe: Neue Länge des Arrays
```

**Einfaches Beispiel:**

```typescript
const numbers = [1, 2, 3];

numbers.push(4);
console.log(numbers); // [1, 2, 3, 4]

numbers.push(5, 6);
console.log(numbers); // [1, 2, 3, 4, 5, 6]

// Rückgabewert:
const length = numbers.push(7);
console.log(length); // 7 (neue Länge)
```

**⚠️ Mutiert das Array:**

```typescript
const original = [1, 2, 3];
original.push(4);
// original ist jetzt verändert: [1, 2, 3, 4]
```

##### push() in diesem Projekt

```typescript
// index.ts - Favorit hinzufügen:
function toggleFavorite(book: Book): void {
  const index = favorites.indexOf(book.isbn);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    // Favorit hinzufügen:
    favorites.push(book.isbn);
  }

  saveFavorites();
}
```

**Schritt-für-Schritt:**

```typescript
const favorites: string[] = ["9783864907791"];

// User fügt Buch mit ISBN "9783864906466" zu Favoriten hinzu:

// Vorher:
console.log(favorites); // ["9783864907791"]

// push():
favorites.push("9783864906466");

// Nachher:
console.log(favorites); // ["9783864907791", "9783864906466"]
```

**Alternativen zu push():**

```typescript
// 1. push() (mutiert):
const arr = [1, 2, 3];
arr.push(4);
// → [1, 2, 3, 4]

// 2. Spread-Operator (nicht-mutierend):
const arr = [1, 2, 3];
const newArr = [...arr, 4];
// → arr bleibt [1, 2, 3]
// → newArr ist [1, 2, 3, 4]

// 3. concat() (nicht-mutierend):
const arr = [1, 2, 3];
const newArr = arr.concat(4);
// → arr bleibt [1, 2, 3]
// → newArr ist [1, 2, 3, 4]
```

**In diesem Projekt ist push() OK:**

```typescript
// favorites wird mutiert, aber das ist beabsichtigt:
favorites.push(book.isbn);
saveFavorites(); // Speichert mutiertes Array
```

---

#### splice() - Elemente entfernen/ersetzen

**splice()** entfernt oder ersetzt Elemente im Array:

```typescript
// Syntax:
const removed = array.splice(start, deleteCount, item1, item2, ...);
// start: Index, wo geändert werden soll
// deleteCount: Anzahl zu löschender Elemente
// item1, item2: Optional - neue Elemente einfügen
// Rückgabe: Array der entfernten Elemente
```

**Einfaches Beispiel:**

```typescript
const numbers = [1, 2, 3, 4, 5];

// An Index 2 ein Element entfernen:
numbers.splice(2, 1);
console.log(numbers); // [1, 2, 4, 5]

// An Index 1 zwei Elemente entfernen:
const removed = numbers.splice(1, 2);
console.log(numbers); // [1, 5]
console.log(removed); // [2, 4]
```

**Elemente einfügen:**

```typescript
const arr = [1, 2, 5];

// An Index 2 nichts löschen, aber 3 und 4 einfügen:
arr.splice(2, 0, 3, 4);
console.log(arr); // [1, 2, 3, 4, 5]
```

**Elemente ersetzen:**

```typescript
const arr = [1, 2, 3, 4, 5];

// An Index 2 ein Element löschen und durch 99 ersetzen:
arr.splice(2, 1, 99);
console.log(arr); // [1, 2, 99, 4, 5]
```

**⚠️ Mutiert das Array:**

```typescript
const original = [1, 2, 3, 4, 5];
original.splice(2, 1);
// original ist jetzt verändert: [1, 2, 4, 5]
```

##### splice() in diesem Projekt

```typescript
// index.ts - Favorit entfernen:
function toggleFavorite(book: Book): void {
  const index = favorites.indexOf(book.isbn);

  if (index > -1) {
    // An diesem Index 1 Element entfernen:
    favorites.splice(index, 1);
  } else {
    favorites.push(book.isbn);
  }

  saveFavorites();
}
```

**Schritt-für-Schritt:**

```typescript
const favorites = ["9783864907791", "9783864906466", "9783898646420"];

// User entfernt Favorit mit ISBN "9783864906466":

// 1. Index finden:
const index = favorites.indexOf("9783864906466");
// → 1 (zweite Position)

// 2. Prüfen ob gefunden:
if (index > -1) {
  // 1 > -1 → true
  // 3. An Index 1 ein Element entfernen:
  favorites.splice(1, 1);
}

// Vorher:  ["9783864907791", "9783864906466", "9783898646420"]
//                Index 0           Index 1          Index 2

// Nachher: ["9783864907791", "9783898646420"]
//                Index 0           Index 1
```

**Visualisierung:**

```
Vorher:
Index: 0              1              2
       ┌─────────────┬──────────────┬──────────────┐
       │ ...907791   │ ...906466    │ ...646420    │
       └─────────────┴──────────────┴──────────────┘
                          ↑
                     splice(1, 1)
                     "Entferne 1 Element an Index 1"

Nachher:
Index: 0              1
       ┌─────────────┬──────────────┐
       │ ...907791   │ ...646420    │
       └─────────────┴──────────────┘
```

**splice() vs. slice():**

```typescript
// splice() - MUTIERT (entfernt Elemente):
const arr1 = [1, 2, 3, 4, 5];
arr1.splice(2, 2); // Entfernt 2 Elemente ab Index 2
console.log(arr1); // [1, 2, 5] - VERÄNDERT!

// slice() - NICHT-MUTIEREND (kopiert Bereich):
const arr2 = [1, 2, 3, 4, 5];
const sliced = arr2.slice(2, 4); // Kopiert von Index 2 bis 4 (exklusiv)
console.log(arr2); // [1, 2, 3, 4, 5] - UNVERÄNDERT
console.log(sliced); // [3, 4] - Neues Array
```

---

#### Weitere wichtige Array-Methoden

Diese Methoden werden in diesem Projekt nicht verwendet, sind aber wichtig zu kennen:

##### map() - Array transformieren

```typescript
const numbers = [1, 2, 3, 4, 5];

// Jedes Element verdoppeln:
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Objekte transformieren:
const books = [
  { title: "Angular", pages: 500 },
  { title: "React", pages: 400 },
];

const titles = books.map((book) => book.title);
console.log(titles); // ["Angular", "React"]
```

##### reduce() - Array zu Wert reduzieren

```typescript
const numbers = [1, 2, 3, 4, 5];

// Summe berechnen:
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// Erklärung:
// 1. Durchlauf: total = 0,  num = 1 → return 0 + 1 = 1
// 2. Durchlauf: total = 1,  num = 2 → return 1 + 2 = 3
// 3. Durchlauf: total = 3,  num = 3 → return 3 + 3 = 6
// 4. Durchlauf: total = 6,  num = 4 → return 6 + 4 = 10
// 5. Durchlauf: total = 10, num = 5 → return 10 + 5 = 15
```

##### some() und every() - Bedingungen prüfen

```typescript
const numbers = [1, 2, 3, 4, 5];

// some() - mindestens eins erfüllt Bedingung:
const hasEven = numbers.some((num) => num % 2 === 0);
console.log(hasEven); // true (2 und 4 sind gerade)

// every() - alle erfüllen Bedingung:
const allPositive = numbers.every((num) => num > 0);
console.log(allPositive); // true (alle > 0)

const allEven = numbers.every((num) => num % 2 === 0);
console.log(allEven); // false (nicht alle gerade)
```

##### sort() - Array sortieren

```typescript
const numbers = [5, 2, 8, 1, 9];

// Aufsteigend sortieren:
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 5, 8, 9]

// Absteigend sortieren:
numbers.sort((a, b) => b - a);
console.log(numbers); // [9, 8, 5, 2, 1]

// Strings sortieren:
const words = ["Zebra", "Apfel", "Banane"];
words.sort();
console.log(words); // ["Apfel", "Banane", "Zebra"]
```

---

#### Method Chaining - Methoden verketten

**Method Chaining** ermöglicht es, mehrere Array-Methoden hintereinander auszuführen:

```typescript
const books = [
  { title: "Angular", rating: 4.5, price: 40 },
  { title: "React", rating: 4.8, price: 35 },
  { title: "Vue", rating: 4.2, price: 30 },
  { title: "Svelte", rating: 4.6, price: 25 },
];

// 1. Nur Bücher mit rating >= 4.5
// 2. Sortiere nach Preis
// 3. Extrahiere nur Titel
const result = books
  .filter((book) => book.rating >= 4.5)
  .sort((a, b) => a.price - b.price)
  .map((book) => book.title);

console.log(result); // ["Svelte", "React", "Angular"]
```

**Schritt-für-Schritt:**

```typescript
// Original:
const books = [
  { title: "Angular", rating: 4.5, price: 40 },
  { title: "React", rating: 4.8, price: 35 },
  { title: "Vue", rating: 4.2, price: 30 },
  { title: "Svelte", rating: 4.6, price: 25 },
];

// Nach filter():
[
  { title: "Angular", rating: 4.5, price: 40 },
  { title: "React", rating: 4.8, price: 35 },
  { title: "Svelte", rating: 4.6, price: 25 },
][
  // Nach sort():
  ({ title: "Svelte", rating: 4.6, price: 25 },
  { title: "React", rating: 4.8, price: 35 },
  { title: "Angular", rating: 4.5, price: 40 })
][
  // Nach map():
  ("Svelte", "React", "Angular")
];
```

**Beispiel aus diesem Projekt (hypothetisch):**

```typescript
// Favoriten mit Rating >= 4 nach Titel sortiert:
const topFavorites = allBooks
  .filter((book) => favorites.includes(book.isbn))
  .filter((book) => book.rating >= 4)
  .sort((a, b) => a.title.localeCompare(b.title))
  .map((book) => book.title);
```

---

#### Performance-Überlegungen

##### forEach vs. for-Schleife

```typescript
const arr = [1, 2, 3 /* ... 1000 Elemente */];

// for-Schleife (schneller):
for (let i = 0; i < arr.length; i++) {
  // ...
}

// forEach (langsamer, aber lesbarer):
arr.forEach((item) => {
  // ...
});

// ✅ Für normale Anwendungen: forEach ist OK
// ✅ Für Performance-kritisch: for-Schleife
```

##### Mehrfaches Filtern vermeiden

```typescript
// ❌ Ineffizient (3x durchlaufen):
const step1 = books.filter((b) => b.rating >= 4);
const step2 = step1.filter((b) => b.price <= 50);
const step3 = step2.filter((b) => b.available);

// ✅ Effizienter (1x durchlaufen):
const result = books.filter((b) => {
  return b.rating >= 4 && b.price <= 50 && b.available;
});
```

##### Frühzeitig abbrechen mit find()

```typescript
// ❌ filter() prüft ALLE Elemente:
const result = books.filter((b) => b.isbn === "123");
// → Prüft alle 1000 Bücher, auch wenn erstes schon passt

// ✅ find() stoppt nach erstem Fund:
const result = books.find((b) => b.isbn === "123");
// → Stoppt nach Fund, prüft nicht alle 1000 Bücher
```

---

#### Zusammenfassung

**Array-Methoden in diesem Projekt:**

| Methode        | Use Case            | Beispiel                                      |
| -------------- | ------------------- | --------------------------------------------- |
| **forEach()**  | Alle Bücher rendern | `books.forEach(book => render(book))`         |
| **filter()**   | Bücher filtern      | `books.filter(b => b.title.includes(search))` |
| **find()**     | Ein Buch finden     | `books.find(b => b.isbn === "123")`           |
| **includes()** | ISBN in Favoriten?  | `favoriteISBNs.includes(book.isbn)`           |
| **indexOf()**  | Index von ISBN      | `favorites.indexOf(book.isbn)`                |
| **push()**     | Favorit hinzufügen  | `favorites.push(book.isbn)`                   |
| **splice()**   | Favorit entfernen   | `favorites.splice(index, 1)`                  |

**Wichtigste Unterschiede:**

| Feature            | Mutierend                   | Nicht-Mutierend            |
| ------------------ | --------------------------- | -------------------------- |
| **Methoden**       | push, splice, sort, reverse | forEach, filter, find, map |
| **Original-Array** | Wird verändert              | Bleibt unverändert         |
| **Rückgabe**       | Meist neue Länge            | Neues Array                |

**Best Practices:**

✅ **forEach()** statt for-Schleife für Lesbarkeit
✅ **filter()** für mehrere Ergebnisse, **find()** für ein Ergebnis
✅ **includes()** statt indexOf() für Existenz-Check
✅ **Method Chaining** für komplexe Transformationen
✅ **TypeScript-Typen** nutzen für Sicherheit

**Workflow in diesem Projekt:**

```
1. Bücher laden (fetch)
   ↓
2. In allBooks speichern (Array)
   ↓
3. Nach Suchbegriff filtern (filter)
   ↓
4. Nach Favoriten filtern (filter + includes)
   ↓
5. Jedes Buch rendern (forEach)
   ↓
6. Favorit togglen (indexOf + splice/push)
   ↓
7. In localStorage speichern
```

**Nächster Schritt:** Verstehen wie Daten durch die Anwendung fließen → Siehe Abschnitt "Datenfluss der Anwendung"

---

## Datenfluss der Anwendung

### Beim Laden der Hauptseite (index.html)

In diesem Abschnitt verfolgen wir Schritt für Schritt, was beim Laden der Startseite passiert – vom Moment, in dem das HTML fertig geparst ist, bis hin zur vollständig gerenderten Bücherliste. Ziel ist, den gesamten Ablauf verständlich zu machen und die wichtigsten Funktionen in ihrer Reihenfolge einzuordnen.

#### Kurzüberblick des Flows

1. Browser lädt HTML, CSS und die gebundelte JavaScript/TypeScript-Datei
2. Event „DOMContentLoaded“ feuert, sobald das DOM bereit ist
3. Initialisierung: `updateFavoriteCount()` und `fetchBooks()` werden aufgerufen
4. `fetchBooks()` lädt Daten von der API, setzt `allBooks` und `filteredBooks`, füllt das Verlags-Dropdown und ruft `renderBooks()` auf
5. `renderBooks()` baut die Tabellenzeilen, markiert Favoriten, hängt Events an Buttons und aktualisiert die Anzeige der Anzahl
6. Event-Listener für Suche und Verlagsfilter werden aktiviert

Visualisiert als Sequenz:

```
DOM fertig → DOMContentLoaded
  ├─ updateFavoriteCount()
  ├─ fetchBooks()
  │   ├─ fetch("/books")
  │   ├─ allBooks = response.json()
  │   ├─ filteredBooks = allBooks
  │   ├─ Publisher-Dropdown befüllen
  │   └─ renderBooks()
  │       ├─ favorites = getFavorites()
  │       ├─ tbody leeren, Zeilen erstellen
  │       ├─ Favoriten-Buttons verknüpfen
  │       └─ Überschrift mit Anzahl aktualisieren
  └─ Event-Listener: search.input → filterBooks, by-publisher.change → filterBooks
```

---

#### 1) DOMContentLoaded und Initialisierung

Im `index.ts` wird ein Listener auf `DOMContentLoaded` registriert. Dieser Event feuert, sobald das HTML-Dokument vollständig geparst wurde (externe Ressourcen wie Bilder dürfen noch laden). Der Code darin ist unser Startpunkt:

```typescript
document.addEventListener("DOMContentLoaded", () => {
  updateFavoriteCount(); // Favoriten-Anzahl im Header anzeigen
  fetchBooks(); // Bücher von der API laden und rendern

  // Suche und Filter aktivieren
  const searchInput = document.getElementById("search");
  const publisherSelect = document.getElementById("by-publisher");

  searchInput?.addEventListener("input", filterBooks);
  publisherSelect?.addEventListener("change", filterBooks);
});
```

Wichtig:

- `updateFavoriteCount()` liest die Favoriten aus dem `localStorage` und setzt die Zahl im Header.
- `fetchBooks()` startet den asynchronen Ladevorgang der Bücherliste.
- Erst nachdem die Elemente existieren, binden wir Events an Suchfeld und Dropdown.

---

#### 2) Favoriten-Anzahl initial anzeigen (`updateFavoriteCount`)

Die Favoriten werden dauerhaft in `localStorage` gespeichert. Beim Laden der Seite brauchen wir sofort die aktuelle Anzahl:

```typescript
function updateFavoriteCount(): void {
  const favorites = getFavorites(); // ['978...','978...']
  const countElement = document.querySelector(".mainnav-number");
  if (countElement) countElement.textContent = favorites.length.toString();
}
```

`getFavorites()` kapselt das sichere Laden und JSON-Parsing:

```typescript
function getFavorites(): string[] {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
}
```

Edge Cases und Verhalten:

- Wenn es noch keine Favoriten gibt, liefert `getFavorites()` ein leeres Array → Anzeige „0“.
- Falls der `localStorage` leer ist oder manipuliert wurde, verhindert das Fallback `[]` einen Fehler.

---

#### 3) Bücher laden (`fetchBooks`) und Dropdown befüllen

Die Bücherliste wird von einem lokalen API-Server geladen. Der gesamte Ablauf ist asynchron und robust gegen Fehler gebaut:

```typescript
async function fetchBooks(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) throw new Error("Failed to fetch books");

    allBooks = await response.json();
    filteredBooks = allBooks; // Start: alle Bücher anzeigen

    // Eindeutige Verlage bestimmen und Dropdown befüllen
    const publishers = Array.from(new Set(allBooks.map((b) => b.publisher)));
    const publisherSelect = document.getElementById(
      "by-publisher"
    ) as HTMLSelectElement;
    if (publisherSelect) {
      publisherSelect.innerHTML = '<option value="-">-</option>';
      publishers.forEach((publisher) => {
        const option = document.createElement("option");
        option.value = publisher;
        option.textContent = publisher;
        publisherSelect.appendChild(option);
      });
    }

    renderBooks();
  } catch (error) {
    console.error("Error fetching books:", error);
    const tbody = document.querySelector("tbody");
    if (tbody) {
      tbody.innerHTML =
        '<tr><td colspan="6">Failed to load books. Make sure the API server is running.</td></tr>';
    }
  }
}
```

Highlights und Best Practices:

- `await fetch(...)` und Status-Prüfung mit `response.ok` für saubere Fehlerbehandlung.
- Entduplizieren der Verlage mit `new Set(...)` und anschließendes Befüllen des `<select>`.
- Aufruf von `renderBooks()` erst, wenn Daten da sind – so bleibt die Seite reaktiv.

Fehlerfall (z. B. API nicht erreichbar):

- Es wird eine verständliche Fehlermeldung in die Tabelle geschrieben, statt die UI leer zu lassen.
- Der Fehler wird zusätzlich in der Konsole geloggt, um das Debugging zu erleichtern.

---

#### 4) Bücher rendern (`renderBooks`)

Das Rendern basiert immer auf dem aktuellen Zustand von `filteredBooks` und den Favoriten aus `localStorage`:

```typescript
function renderBooks(): void {
  const tbody = document.querySelector("tbody");
  if (!tbody) return; // Defensive Guard: kein tbody gefunden

  const favorites = getFavorites(); // Aktuelle Favoriten
  tbody.innerHTML = ""; // Vorhandene Zeilen leeren

  filteredBooks.forEach((book) => {
    const isFavorite = favorites.includes(book.isbn);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <button class="button button-clear fav-btn" data-isbn="${book.isbn}">
          <!-- Herz-Icon, gefüllt wenn Favorit -->
          ...
        </button>
      </td>
      <td>${book.title}</td>
      <td>${book.isbn}</td>
      <td>${book.author}</td>
      <td>${book.publisher}</td>
      <td>
        <button class="button" onclick="location.href='detail.html?isbn=${book.isbn}'">
          Detail
        </button>
      </td>`;
    tbody.appendChild(tr);
  });

  // Click-Events für Favoriten-Buttons verbinden
  const favButtons = tbody.querySelectorAll(".fav-btn");
  favButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isbn = (button as HTMLElement).getAttribute("data-isbn");
      if (isbn) toggleFavorite(isbn);
    });
  });

  // Überschrift mit Anzahl aktualisieren
  const countElement = document.querySelector("main h2");
  if (countElement)
    countElement.textContent = `${filteredBooks.length} Books displayed`;
}
```

Wichtig zu beachten:

- Das Herz-Icon wird abhängig von `isFavorite` gefüllt oder nur umrandet dargestellt.
- Durch erneutes Aufrufen von `renderBooks()` nach Änderungen bleibt die UI konsistent.
- Events werden nach jedem Neu-Rendern frisch gebunden, weil die DOM-Knoten neu erstellt werden.

---

#### 5) Favorit-Status ändern (`toggleFavorite`) und Zähler updaten

Die Funktion zum Ein-/Ausschalten eines Favoriten ist bewusst simpel gehalten und übernimmt auch das Update der UI:

```typescript
function toggleFavorite(isbn: string): void {
  const favorites = getFavorites();
  const index = favorites.indexOf(isbn);
  if (index > -1) favorites.splice(index, 1);
  else favorites.push(isbn);
  saveFavorites(favorites);
  updateFavoriteCount(); // Header-Zahl sofort anpassen
  renderBooks(); // Liste neu zeichnen → Icon-Status aktualisiert
}
```

Warum hier neu rendern?

- Damit das entsprechende Herz-Icon unmittelbar den neuen Zustand (Favorit ja/nein) zeigt.
- Gleichzeitig werden die Event-Listener korrekt an die neu erstellten Zeilen gebunden.

---

#### 6) Event-Listener für Suche und Filter

Schon beim Initialisieren werden die Listener gesetzt. Jede Eingabe/Änderung führt zu einem Re-Filter und anschließendem Rendern:

```typescript
searchInput?.addEventListener("input", filterBooks);
publisherSelect?.addEventListener("change", filterBooks);
```

`filterBooks()`:

```typescript
function filterBooks(): void {
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const publisherSelect = document.getElementById(
    "by-publisher"
  ) as HTMLSelectElement;
  const searchTerm = searchInput?.value.toLowerCase() || "";
  const publisher = publisherSelect?.value || "-";

  filteredBooks = allBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm);
    const matchesPublisher = publisher === "-" || book.publisher === publisher;
    return matchesSearch && matchesPublisher;
  });

  renderBooks();
}
```

Effekt:

- Das UI reagiert sofort auf Nutzeraktionen, ohne die Seite neu zu laden.
- `filteredBooks` ist unsere einzige Quelle für das Rendering – klar und vorhersehbar.

---

#### Happy Path vs. Fehlerpfad

Happy Path (alles läuft):

1. DOMContentLoaded → `updateFavoriteCount()` und `fetchBooks()`
2. API antwortet → `allBooks` + `filteredBooks` gesetzt
3. Dropdown befüllt → `renderBooks()` zeichnet Tabelle
4. Nutzer interagiert → `filterBooks()` und `toggleFavorite()` aktualisieren State und UI

Fehlerpfad (API down oder Netzwerkfehler):

1. DOMContentLoaded → `fetchBooks()`
2. `fetch` schlägt fehl oder `!response.ok`
3. Fehler wird geloggt, Tabelle zeigt klare Fehlermeldung an
4. Suche/Filter sind zwar aktiv, aber ohne Daten bleibt die Liste leer

---

#### Zusammenfassung des Start-Flows

- Ein zentraler Initialisierungsblock nach `DOMContentLoaded` startet alles Wichtige.
- Serverdaten werden klar von UI-Logik getrennt: `allBooks`/`filteredBooks` vs. `renderBooks()`.
- Favoriten bleiben dank `localStorage` zwischen Sitzungen erhalten; die Header-Anzeige ist sofort korrekt.
- Jede Nutzeraktion ruft deterministisch `filterBooks()` oder `toggleFavorite()` auf → `renderBooks()` hält die UI aktuell.

### Beim Suchen/Filtern

Beim Suchen/Filtern reagiert die Anwendung live auf Nutzereingaben. Zwei Event-Quellen stoßen den Prozess an: das Suchfeld (`input`) und das Verlags-Dropdown (`change`). In beiden Fällen ruft die Seite `filterBooks()` auf, die den Zustand `filteredBooks` neu berechnet und anschließend `renderBooks()` aufruft.

#### Event-Quellen

Im Initialisierungsblock werden die Listener gesetzt:

```typescript
const searchInput = document.getElementById("search");
const publisherSelect = document.getElementById("by-publisher");

searchInput?.addEventListener("input", filterBooks); // bei jeder Eingabe
publisherSelect?.addEventListener("change", filterBooks); // bei Auswahlwechsel
```

So entsteht ein reaktives Verhalten: Jede Änderung startet den Filter-Flow.

---

#### Filterlogik in `filterBooks()`

```typescript
function filterBooks(): void {
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const publisherSelect = document.getElementById(
    "by-publisher"
  ) as HTMLSelectElement;

  const searchTerm = searchInput?.value.toLowerCase() || ""; // leere Suche → alle
  const publisher = publisherSelect?.value || "-"; // '-' bedeutet "alle Verlage"

  filteredBooks = allBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm);
    const matchesPublisher = publisher === "-" || book.publisher === publisher;
    return matchesSearch && matchesPublisher; // UND-Verknüpfung
  });

  renderBooks();
}
```

Erläuterungen:

- `toLowerCase()` + `includes()` → Fallunabhängige Suche im Titel.
- Wenn `searchTerm` leer ist, erfüllt jedes Buch `matchesSearch` (weil `""` in jedem String enthalten ist).
- Wenn `publisher === "-"`, wird keine Verlagsfilterung angewandt.
- Die UND-Verknüpfung stellt sicher, dass beide Kriterien gleichzeitig passen müssen.
- Nach jedem Re-Filtern erfolgt sofort ein Re-Rendern der Liste.

---

#### Schritt-für-Schritt-Beispiel

Ausgangsdaten:

```typescript
allBooks = [
  { title: "Angular", publisher: "dpunkt", isbn: "111" },
  { title: "React", publisher: "O'Reilly", isbn: "222" },
  { title: "Vue Basics", publisher: "dpunkt", isbn: "333" },
];
```

1. Nutzer tippt ins Suchfeld: `"vue"`

```typescript
searchTerm = "vue";
publisher = "-";

filteredBooks = allBooks.filter(
  (b) =>
    b.title.toLowerCase().includes("vue") &&
    ("-" === "-" || b.publisher === "-")
);
// → [ { title: "Vue Basics", publisher: "dpunkt" } ]
```

2. Nutzer wählt im Dropdown: `"dpunkt"`

```typescript
searchTerm = "vue";
publisher = "dpunkt";

filteredBooks = allBooks.filter(
  (b) => b.title.toLowerCase().includes("vue") && b.publisher === "dpunkt"
);
// → unverändert, da "Vue Basics" bereits dpunkt ist
```

3. Nutzer löscht Suche (leeres Suchfeld)

```typescript
searchTerm = "";
publisher = "dpunkt";

filteredBooks = allBooks.filter(
  (b) =>
    // "" ist in jedem Titel enthalten → true
    true && b.publisher === "dpunkt"
);
// → ["Angular", "Vue Basics"]
```

Nach jedem Schritt ruft `filterBooks()` `renderBooks()` auf, wodurch die Tabelle und die Display-Anzahl aktualisiert werden.

---

#### Edge Cases und UX-Aspekte

- Leere Suche: zeigt alle Bücher des gewählten Verlags (oder alle, wenn `-`).
- Kein Treffer: `filteredBooks` wird leer, `renderBooks()` zeigt dann 0 Elemente und die Überschrift „0 Books displayed“.
- Groß-/Kleinschreibung: Wird durch `.toLowerCase()` neutralisiert.
- Verlagswechsel ohne Daten: Dropdown ist erst nach erfolgreichem Fetch befüllt; bis dahin ändert sich nichts.

Optional (Verbesserungen bei großen Datenmengen):

- Debouncing der Suche (z. B. 150–300 ms), um nicht bei jedem Tastendruck zu filtern.
- Clientseitiges Caching ist bereits gegeben (in `allBooks`).
- Weitere Kriterien ließen sich als zusätzliche UND-Bedingungen ergänzen.

### Beim Hinzufügen/Entfernen von Favoriten

Das Markieren als Favorit ist vollständig clientseitig implementiert. Beim Klick auf das Herz-Symbol einer Buchzeile wird der Favoritenstatus für die entsprechende ISBN umgeschaltet („toggle“). Dabei werden die Daten im `localStorage` aktualisiert, die Anzeige im Header refreshed und die Liste neu gerendert, sodass das Icon sofort den neuen Zustand zeigt.

#### Event-Quelle: Klick auf Herz-Button

Die Buttons werden in `renderBooks()` pro Zeile erzeugt. Danach werden ihre Click-Events verknüpft:

```typescript
const favButtons = tbody.querySelectorAll(".fav-btn");
favButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isbn = (button as HTMLElement).getAttribute("data-isbn");
    if (isbn) toggleFavorite(isbn);
  });
});
```

Warum hier (nach dem Rendern)? Weil die Tabellenzeilen neu erstellt werden. Würden wir die Events vorher setzen, gäbe es die Ziel-Elemente noch nicht.

---

#### Favoriten-Array laden/speichern

Zwei Hilfsfunktionen kapseln den Zugriff auf `localStorage`:

```typescript
function getFavorites(): string[] {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
}

function saveFavorites(favorites: string[]): void {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
```

Vorteile dieser Kapselung:

- Klare zentrale Stelle für Format/Validierung der Daten.
- Einfache spätere Erweiterung (z. B. Versionierung, Namespacing, Fehlerbehandlung).

---

#### Toggle-Logik im Detail

```typescript
function toggleFavorite(isbn: string): void {
  const favorites = getFavorites();
  const index = favorites.indexOf(isbn);

  if (index > -1) {
    // Buch war Favorit → entfernen
    favorites.splice(index, 1);
  } else {
    // Buch war kein Favorit → hinzufügen
    favorites.push(isbn);
  }

  saveFavorites(favorites); // Persistieren
  updateFavoriteCount(); // Anzeige im Header aktualisieren
  renderBooks(); // Tabelle neu zeichnen (Icon ändert sich)
}
```

Wichtige Punkte:

- `indexOf()` liefert `-1`, wenn die ISBN nicht enthalten ist – genau das Kriterium für „hinzufügen“.
- `splice(index, 1)` entfernt exakt die ISBN an der gefundenen Position.
- Durch `updateFavoriteCount()` spiegelt der Header sofort die korrekte Anzahl.
- `renderBooks()` rekonstruiert die Zeilen samt Icon-Zustand und Event-Handlern.

---

#### Ablauf als Diagramm

```
Klick auf Herz → toggleFavorite(isbn)
  ├─ favorites = getFavorites()        // aus localStorage
  ├─ index = favorites.indexOf(isbn)
  ├─ if (index > -1) → splice entfernen
  │     else         → push hinzufügen
  ├─ saveFavorites(favorites)          // nach localStorage schreiben
  ├─ updateFavoriteCount()             // Header-Zahl neu setzen
  └─ renderBooks()                     // Liste neu aufbauen → Icon aktualisiert
```

---

#### Beispiel mit konkreten Werten

Ausgangszustand im localStorage:

```json
favorites = ["9783864907791", "9783864906466"]
```

1. Nutzer klickt auf Herz von `"9783864906466"` (bereits Favorit)

```typescript
favorites.indexOf("9783864906466"); // → 1
favorites.splice(1, 1); // → entfernt Eintrag an Position 1
saveFavorites(["9783864907791"]); // Persistenz
updateFavoriteCount(); // Header zeigt 1
renderBooks(); // Icon jetzt ungefüllt
```

2. Nutzer klickt auf Herz von `"9783898646420"` (noch kein Favorit)

```typescript
favorites.indexOf("9783898646420"); // → -1
favorites.push("9783898646420"); // → hinzufügen
saveFavorites(["9783864907791", "9783898646420"]); // speichern
updateFavoriteCount(); // Header zeigt 2
renderBooks(); // Icon jetzt gefüllt
```

---

#### UI-Konsistenz und Re-Rendering

Warum wird nach jedem Toggle die gesamte Liste neu gerendert?

- Das Icon in der betroffenen Zeile muss seinen Zustand ändern (gefüllt/Outline).
- Die Event-Listener werden an die neu erzeugten DOM-Knoten gebunden.
- Die Anzeige „X Books displayed“ bleibt konsistent zu `filteredBooks`.

Alternative wäre das gezielte Aktualisieren nur der betroffenen Zeile. Für diese Challenge ist das vollständige Neu-Rendern jedoch einfacher und zuverlässig.

---

#### Optional: Synchronisation über mehrere Tabs

Wenn die Anwendung in mehreren Tabs geöffnet ist, könnten Änderungen am `localStorage` per `storage`-Event synchronisiert werden:

```typescript
window.addEventListener("storage", (event) => {
  if (event.key === "favorites") {
    updateFavoriteCount();
    renderBooks();
  }
});
```

Damit würde ein Toggle in Tab A auch in Tab B automatisch sichtbar.

### Beim Öffnen der Detailseite

Die Detailseite zeigt Informationen zu einem einzigen Buch an. Welche Daten geladen werden, entscheidet der Query-Parameter `isbn` in der URL, z. B. `detail.html?isbn=9783864907791`.

#### Initialisierung

Beim Laden der Seite werden – genau wie auf der Startseite – zwei Schritte ausgeführt:

```typescript
document.addEventListener("DOMContentLoaded", () => {
  updateFavoriteCount(); // Header-Zahl aus localStorage
  loadBookDetails(); // Buchdetails per ISBN laden
});
```

`updateFavoriteCount()` ist identisch zum Index-Flow: Es liest die Favoriten aus dem `localStorage` und aktualisiert die Zahl im Header.

---

#### ISBN aus der URL lesen

```typescript
const urlParams = new URLSearchParams(window.location.search);
const isbn = urlParams.get("isbn");

if (!isbn) {
  const main = document.querySelector("main");
  if (main) main.innerHTML = "<h1>Book not found</h1><p>No ISBN provided.</p>";
  return;
}
```

Ohne `isbn`-Parameter kann die Seite kein Buch laden. Stattdessen zeigt sie eine verständliche Meldung an und beendet die Funktion früh.

---

#### Buch aus der API laden

```typescript
try {
  const response = await fetch(`${API_URL}/books/${isbn}`);
  if (!response.ok) throw new Error("Failed to fetch book");
  const book: Book = await response.json();
  // ... DOM aktualisieren (siehe unten)
} catch (error) {
  console.error("Error fetching book:", error);
  const main = document.querySelector("main");
  if (main) {
    main.innerHTML =
      "<h1>Error</h1><p>Failed to load book details. Make sure the API server is running.</p>";
  }
}
```

Wie auf der Startseite gibt es saubere Fehlerbehandlung: Bei Problemen erscheint eine erklärende Fehlermeldung im `main`-Bereich.

---

#### DOM mit Buchdaten füllen

Nach erfolgreichem Fetch werden die relevanten Elemente mit Daten bestückt:

1. Titel + Untertitel

```typescript
const titleElement = document.querySelector("main h1");
if (titleElement) {
  titleElement.innerHTML = `${book.title}<br /><small>${
    book.subtitle || ""
  }</small>`;
}
```

2. Beschreibung (Abstract)

```typescript
const abstractElement = document.querySelector("main p");
if (abstractElement) {
  abstractElement.textContent = book.abstract || "No description available.";
}
```

3. Details-Liste (Autor, Verlag, Seiten)

```typescript
const detailsList = document.querySelector("main ul");
if (detailsList) {
  detailsList.innerHTML = `
    <li><strong>Author:</strong> ${book.author}</li>
    <li><strong>Publisher:</strong> ${book.publisher}</li>
    <li><strong>Pages:</strong> ${book.numPages || "N/A"}</li>
  `;
}
```

4. Buchcover (mit Fallback)

```typescript
const imgElement = document.querySelector("main img") as HTMLImageElement;
if (imgElement) {
  imgElement.src = `images/${book.isbn}.png`;
  imgElement.alt = book.title;
  imgElement.onerror = () => {
    imgElement.style.display = "none";
  };
}
```

Hinweise:

- `subtitle` und `numPages` können fehlen – darum gibt es Fallbacks (`|| ""`, `|| "N/A"`).
- Wenn das Cover-Bild nicht vorhanden ist, versteckt `onerror` das `<img>`-Element elegant, statt ein defektes Bildsymbol zu zeigen.

---

#### Datenfluss als Sequenz

```
Seite lädt → DOMContentLoaded
  ├─ updateFavoriteCount()
  └─ loadBookDetails()
      ├─ isbn = URLSearchParams.get("isbn")
      ├─ if (!isbn) → Meldung anzeigen, return
      ├─ fetch(`/books/${isbn}`)
      ├─ if (!ok) → Fehlermeldung in <main>
      └─ else: DOM befüllen
           ├─ <h1> Titel + Untertitel
           ├─ <p>  Abstract
           ├─ <ul> Details (Author/Publisher/Pages)
           └─ <img> Cover (mit onerror-Fallback)
```

---

#### Zusammenfassung Detailseite

- Die `isbn` in der URL bestimmt, welches Buch angezeigt wird.
- Robuste Fehlerbehandlung sorgt für klare Meldungen, wenn Daten fehlen oder die API nicht läuft.
- Das DOM wird selektiv und semantisch sinnvoll befüllt.
- Die Favoriten-Anzahl im Header bleibt mit der Startseite konsistent.

---

_Diese Dokumentation ist für Programmier-Anfänger geschrieben und erklärt jeden Aspekt des Codes im Detail._
