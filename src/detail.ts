// Importiere das Book-Interface aus der types.js Datei
import type { Book } from "./types.js";

// Konstante für die API-Basis-URL des lokalen Servers
const API_URL = "http://localhost:4730";

// Funktion zum Aktualisieren der Favoriten-Anzahl im Seitenkopf
function updateFavoriteCount(): void {
  // Lade die Favoritenliste aus dem localStorage (kann null sein)
  const favorites = localStorage.getItem("favorites");
  // Parse JSON zu Array, oder erstelle leeres Array falls keine Favoriten vorhanden
  const favList = favorites ? JSON.parse(favorites) : [];
  // Suche das HTML-Element mit der Klasse "mainnav-number"
  const countElement = document.querySelector(".mainnav-number");
  if (countElement) {
    // Setze den Textinhalt auf die Anzahl der Favoriten (konvertiert zu String)
    countElement.textContent = favList.length.toString();
  }
}

// Asynchrone Funktion zum Laden und Anzeigen der Buchdetails
async function loadBookDetails(): Promise<void> {
  // Erstelle URLSearchParams-Objekt aus den Query-Parametern der aktuellen URL
  const urlParams = new URLSearchParams(window.location.search);
  // Hole den ISBN-Parameter aus der URL (z.B. detail.html?isbn=123456)
  const isbn = urlParams.get("isbn");

  // Wenn keine ISBN angegeben wurde, zeige Fehlermeldung
  if (!isbn) {
    const main = document.querySelector("main");
    if (main) {
      // Setze den Inhalt des main-Elements auf eine Fehlermeldung
      main.innerHTML = "<h1>Book not found</h1><p>No ISBN provided.</p>";
    }
    return; // Beende die Funktion vorzeitig
  }

  try {
    // Führe HTTP-GET-Request aus, um Buchdetails zu laden (await wartet auf Antwort)
    const response = await fetch(`${API_URL}/books/${isbn}`);
    // Prüfe ob die Response erfolgreich war
    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }
    // Parse die JSON-Antwort zu einem Book-Objekt
    const book: Book = await response.json();

    // Aktualisiere den Seitentitel mit Buchtitel und Untertitel
    const titleElement = document.querySelector("main h1");
    if (titleElement) {
      // Template-String mit <br /> für Zeilenumbruch zwischen Titel und Untertitel
      // || "" sorgt für leeren String, falls subtitle undefined ist
      titleElement.innerHTML = `${book.title}<br /><small>${
        book.subtitle || ""
      }</small>`;
    }

    // Aktualisiere die Buchbeschreibung
    const abstractElement = document.querySelector("main p");
    if (abstractElement) {
      // Zeige abstract oder Standardtext, falls keiner vorhanden
      abstractElement.textContent =
        book.abstract || "No description available.";
    }

    // Aktualisiere die Detailliste mit Buchinformationen
    const detailsList = document.querySelector("main ul");
    if (detailsList) {
      // Erstelle HTML-Liste mit Autor, Verlag und Seitenzahl
      // || "N/A" zeigt "N/A" an, falls numPages undefined ist
      detailsList.innerHTML = `
        <li><strong>Author:</strong> ${book.author}</li>
        <li><strong>Publisher:</strong> ${book.publisher.name}</li>
        <li><strong>Pages:</strong> ${book.numPages || "N/A"}</li>
      `;
    }

    // Aktualisiere das Buchcover-Bild
    const imgElement = document.querySelector("main img") as HTMLImageElement;
    if (imgElement) {
      // Setze die Bildquelle auf den Pfad zum Buchcover (basierend auf ISBN)
      imgElement.src = `images/${book.isbn}.png`;
      imgElement.alt = book.title;
      // Fehlerbehandlung für fehlende Bilder
      // onerror wird aufgerufen, wenn das Bild nicht geladen werden kann
      imgElement.onerror = () => {
        imgElement.style.display = "none"; // Verstecke das Bild
      };
    }
  } catch (error) {
    // Fehlerbehandlung: logge den Fehler in der Konsole
    console.error("Error fetching book:", error);
    const main = document.querySelector("main");
    if (main) {
      // Zeige Fehlermeldung an
      main.innerHTML =
        "<h1>Error</h1><p>Failed to load book details. Make sure the API server is running.</p>";
    }
  }
}

// Initialisierung: Code wird ausgeführt, sobald das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", () => {
  // Aktualisiere die Favoriten-Anzahl im Header
  updateFavoriteCount();
  // Lade und zeige die Buchdetails an
  loadBookDetails();
});
