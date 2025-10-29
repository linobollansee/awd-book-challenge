// Importiere das Book-Interface aus der types.js Datei
// 'type' wird verwendet, da es nur für TypeScript-Typen ist
import type { Book } from "./types.js";

// Konstante für die API-Basis-URL des lokalen Servers
const API_URL = "http://localhost:4730";

// Array für alle geladenen Bücher vom Server
let allBooks: Book[] = [];
// Array für gefilterte Bücher basierend auf Suche/Filter
let filteredBooks: Book[] = [];

// Funktion zum Abrufen der Favoriten aus dem localStorage
// Rückgabewert: Array von ISBN-Nummern als Strings
function getFavorites(): string[] {
  // Versuche die Favoriten aus dem localStorage zu laden
  const favs = localStorage.getItem("favorites");
  // Wenn Favoriten existieren, parse JSON, sonst gib leeres Array zurück
  return favs ? JSON.parse(favs) : [];
}

// Funktion zum Speichern der Favoriten in den localStorage
// Parameter: Array von ISBN-Nummern, Rückgabe: void (nichts)
function saveFavorites(favorites: string[]): void {
  // Konvertiere Array zu JSON-String und speichere im localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Funktion zum Umschalten des Favoriten-Status eines Buches
// Wenn Buch bereits Favorit ist, wird es entfernt, sonst hinzugefügt
function toggleFavorite(isbn: string): void {
  // Lade aktuelle Favoritenliste
  const favorites = getFavorites();
  // Suche nach der Position der ISBN im Array
  const index = favorites.indexOf(isbn);

  if (index > -1) {
    // ISBN gefunden -> entferne sie aus der Liste (splice entfernt 1 Element)
    favorites.splice(index, 1);
  } else {
    // ISBN nicht gefunden -> füge sie zur Liste hinzu
    favorites.push(isbn);
  }

  // Speichere aktualisierte Liste
  saveFavorites(favorites);
  // Aktualisiere die Anzeige der Favoriten-Anzahl im Header
  updateFavoriteCount();
  // Rendere die Bücherliste neu, um die Änderungen anzuzeigen
  renderBooks();
}

// Funktion zum Aktualisieren der Favoriten-Anzahl im Seitenkopf
function updateFavoriteCount(): void {
  // Lade aktuelle Favoritenliste
  const favorites = getFavorites();
  // Suche das HTML-Element mit der Klasse "mainnav-number"
  const countElement = document.querySelector(".mainnav-number");
  if (countElement) {
    // Setze den Textinhalt auf die Anzahl der Favoriten (konvertiert zu String)
    countElement.textContent = favorites.length.toString();
  }
}

// Funktion zum Rendern (Anzeigen) der Bücher in der Tabelle
function renderBooks(): void {
  // Suche das tbody-Element der Tabelle im DOM
  const tbody = document.querySelector("tbody");
  // Wenn kein tbody vorhanden, beende die Funktion vorzeitig
  if (!tbody) return;

  // Lade aktuelle Favoritenliste
  const favorites = getFavorites();

  // Lösche den aktuellen Tabelleninhalt (alle Zeilen)
  tbody.innerHTML = "";

  // Iteriere über jedes Buch im gefilterten Array
  filteredBooks.forEach((book) => {
    // Prüfe, ob das aktuelle Buch ein Favorit ist
    const isFavorite = favorites.includes(book.isbn);
    // Erstelle eine neue Tabellenzeile (tr = table row)
    const tr = document.createElement("tr");

    // Setze den HTML-Inhalt der Tabellenzeile mit Template-String
    // Template-String ermöglicht mehrzeilige Strings und Variable-Interpolation mit ${}
    tr.innerHTML = `
      <td>
        <button class="button button-clear fav-btn" data-isbn="${book.isbn}">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            ${
              isFavorite
                ? 'viewBox="0 0 24 24" fill="currentColor"'
                : 'fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"'
            }
            class="fav"
          >
            <path
              ${
                isFavorite
                  ? ""
                  : 'stroke-linecap="round" stroke-linejoin="round"'
              }
              d="${
                isFavorite
                  ? "M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                  : "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              }"
            />
          </svg>
        </button>
      </td>
      <td>${book.title}</td>
      <td>${book.isbn}</td>
      <td>${book.author}</td>
      <td>${book.publisher.name}</td>
      <td>
        <button class="button" onclick="location.href='detail.html?isbn=${
          book.isbn
        }'">
          Detail
        </button>
      </td>
    `;

    // Füge die neue Zeile zum tbody hinzu
    tbody.appendChild(tr);
  });

  // Füge Event-Listener zu allen Favoriten-Buttons hinzu
  const favButtons = tbody.querySelectorAll(".fav-btn");
  // Iteriere über alle gefundenen Buttons
  favButtons.forEach((button) => {
    // Füge einen Click-Listener hinzu mit Arrow-Function
    button.addEventListener("click", () => {
      // Hole die ISBN aus dem data-isbn Attribut (Type-Assertion zu HTMLElement)
      const isbn = (button as HTMLElement).getAttribute("data-isbn");
      if (isbn) {
        // Wenn ISBN vorhanden, toggle den Favoriten-Status
        toggleFavorite(isbn);
      }
    });
  });

  // Aktualisiere die Anzeige der Anzahl der dargestellten Bücher
  const countElement = document.querySelector("main h2");
  if (countElement) {
    // Template-String mit der Anzahl der gefilterten Bücher
    countElement.textContent = `${filteredBooks.length} Books displayed`;
  }
}

// Funktion zum Filtern der Bücher nach Suchbegriff und Verlag
function filterBooks(): void {
  // Hole das Suchfeld und caste es zu HTMLInputElement (Type-Assertion)
  const searchInput = document.getElementById("search") as HTMLInputElement;
  // Hole das Verlags-Dropdown und caste es zu HTMLSelectElement
  const publisherSelect = document.getElementById(
    "by-publisher"
  ) as HTMLSelectElement;

  // Hole den Suchbegriff in Kleinbuchstaben, oder leeren String falls null
  // ?. ist Optional Chaining: greift nur auf value zu, wenn searchInput existiert
  const searchTerm = searchInput?.value.toLowerCase() || "";
  // Hole den gewählten Verlag oder "-" als Standard
  const publisher = publisherSelect?.value || "-";

  // Filtere das allBooks-Array basierend auf den Kriterien
  filteredBooks = allBooks.filter((book) => {
    // Prüfe ob der Buchtitel den Suchbegriff enthält (case-insensitive)
    const matchesSearch = book.title.toLowerCase().includes(searchTerm);
    // Prüfe ob der Verlag übereinstimmt (oder "-" für alle Verlage gewählt ist)
    const matchesPublisher =
      publisher === "-" || book.publisher.name === publisher;
    // Nur Bücher zurückgeben, die beide Kriterien erfüllen (UND-Verknüpfung)
    return matchesSearch && matchesPublisher;
  });

  // Zeige die gefilterten Bücher an
  renderBooks();
}

// Asynchrone Funktion zum Laden der Bücher von der API
// async ermöglicht die Verwendung von await, Promise<void> bedeutet keine Rückgabe
async function fetchBooks(): Promise<void> {
  try {
    // Führe HTTP-GET-Request aus und warte auf Antwort (await)
    const response = await fetch(`${API_URL}/books`);
    // Prüfe ob die Response erfolgreich war (Status 200-299)
    if (!response.ok) {
      // Werfe einen Fehler, der vom catch-Block gefangen wird
      throw new Error("Failed to fetch books");
    }
    // Parse die JSON-Antwort und warte darauf (await)
    allBooks = await response.json();
    // Anfangs sind alle Bücher auch die gefilterten Bücher
    filteredBooks = allBooks;

    // Befülle das Verlags-Dropdown mit eindeutigen Verlagsnamen
    // map() erstellt Array mit allen Verlagsnamen
    // new Set() entfernt Duplikate
    // Array.from() konvertiert das Set zurück zu einem Array
    const publishers = Array.from(
      new Set(allBooks.map((book) => book.publisher.name))
    );
    const publisherSelect = document.getElementById(
      "by-publisher"
    ) as HTMLSelectElement;

    if (publisherSelect) {
      // Setze Standardoption "-" für "alle Verlage"
      publisherSelect.innerHTML = '<option value="-">-</option>';
      // Füge für jeden Verlag eine Option hinzu
      publishers.forEach((publisher) => {
        const option = document.createElement("option");
        option.value = publisher;
        option.textContent = publisher;
        publisherSelect.appendChild(option);
      });
    }

    // Zeige die Bücher an
    renderBooks();
  } catch (error) {
    // Fehlerbehandlung: logge den Fehler in der Konsole
    console.error("Error fetching books:", error);
    const tbody = document.querySelector("tbody");
    if (tbody) {
      // Zeige Fehlermeldung in der Tabelle an (colspan="6" verbindet 6 Spalten)
      tbody.innerHTML =
        '<tr><td colspan="6">Failed to load books. Make sure the API server is running.</td></tr>';
    }
  }
}

// Initialisierung: Code wird ausgeführt, sobald das DOM vollständig geladen ist
// DOMContentLoaded-Event wird gefeuert, wenn HTML geparst wurde
document.addEventListener("DOMContentLoaded", () => {
  // Aktualisiere die Favoriten-Anzahl im Header
  updateFavoriteCount();
  // Lade die Bücher von der API
  fetchBooks();

  // Füge Event-Listener für Suche und Filter hinzu
  const searchInput = document.getElementById("search");
  const publisherSelect = document.getElementById("by-publisher");

  // Bei Eingabe im Suchfeld: filtere Bücher (Optional Chaining ?.)
  searchInput?.addEventListener("input", filterBooks);
  // Bei Änderung des Verlags-Dropdowns: filtere Bücher
  publisherSelect?.addEventListener("change", filterBooks);
});
