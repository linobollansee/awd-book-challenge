// Interface für Verlagsinformationen
// Definiert die Struktur eines Verlags mit Name und URL
export interface Publisher {
  name: string; // Name des Verlags
  url: string; // Webseite des Verlags
}

// Interface für Buchinformationen
// Definiert die vollständige Struktur eines Buches mit allen relevanten Eigenschaften
export interface Book {
  id: string; // Eindeutige ID des Buches
  isbn: string; // ISBN-Nummer als eindeutiger Identifikator
  title: string; // Buchtitel
  subtitle?: string; // Optionaler Untertitel (? bedeutet optional)
  author: string; // Autor des Buches
  publisher: string; // Verlagsname als einfacher String
  abstract?: string; // Optionale Buchbeschreibung/Zusammenfassung
  numPages?: number; // Optionale Seitenanzahl
  price?: string; // Optionaler Preis als String
  cover?: string; // URL zum Buchcover-Bild
  userId?: number; // Benutzer-ID
}
