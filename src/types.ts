// Interface für Verlagsinformationen
// Definiert die Struktur eines Verlags mit Name und URL
export interface Publisher {
  name: string; // Name des Verlags
  url: string; // Webseite des Verlags
}

// Interface für Buchinformationen
// Definiert die vollständige Struktur eines Buches mit allen relevanten Eigenschaften
export interface Book {
  isbn: string; // ISBN-Nummer als eindeutiger Identifikator
  title: string; // Buchtitel
  subtitle?: string; // Optionaler Untertitel (? bedeutet optional)
  author: string; // Autor des Buches
  publisher: Publisher; // Verlagsinformationen als verschachteltes Objekt
  abstract?: string; // Optionale Buchbeschreibung/Zusammenfassung
  numPages?: number; // Optionale Seitenanzahl
  price?: string; // Optionaler Preis als String
}
