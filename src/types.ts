// Interface für Verlagsinformationen (v2.0.0 - nicht mehr in v3.2.0 verwendet)
// Definiert die Struktur eines Verlags mit Name und URL
export interface Publisher {
  name: string; // Name des Verlags
  url: string; // Webseite des Verlags
}

// Interface für Buchinformationen
// Definiert die vollständige Struktur eines Buches mit allen relevanten Eigenschaften
// Aktualisiert für BookMonkey API v3.2.0
export interface Book {
  id: string; // Eindeutige ID des Buches (neu in v3.2.0)
  isbn: string; // ISBN-Nummer als eindeutiger Identifikator
  title: string; // Buchtitel
  subtitle?: string; // Optionaler Untertitel (? bedeutet optional)
  author: string; // Autor des Buches
  publisher: string; // Verlagsname als einfacher String (geändert in v3.2.0)
  abstract?: string; // Optionale Buchbeschreibung/Zusammenfassung
  numPages?: number; // Optionale Seitenanzahl
  price?: string; // Optionaler Preis als String
  cover?: string; // URL zum Buchcover-Bild (neu in v3.2.0)
  userId?: number; // Benutzer-ID (neu in v3.2.0)
}
