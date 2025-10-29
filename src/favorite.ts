// Importiere das Book-Interface aus der types.js Datei
import type { Book } from "./types.js";

// Konstante für die API-Basis-URL des lokalen Servers
const API_URL = "http://localhost:4730";

// Array für alle geladenen Favoriten-Bücher vom Server
let allBooks: Book[] = [];
// Array für gefilterte Bücher basierend auf Suche/Filter
let filteredBooks: Book[] = [];

// Funktion zum Abrufen der Favoriten aus dem localStorage
// Rückgabewert: Array von ISBN-Nummern als Strings
function getFavorites(): string[] {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
}

// Funktion zum Speichern der Favoriten in den localStorage
function saveFavorites(favorites: string[]): void {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Funktion zum Entfernen eines Buches aus den Favoriten
function removeFavorite(isbn: string): void {
  // Lade aktuelle Favoritenliste
  const favorites = getFavorites();
  // Suche nach der Position der ISBN im Array
  const index = favorites.indexOf(isbn);

  if (index > -1) {
    // ISBN gefunden -> entferne sie aus der Liste (splice entfernt 1 Element)
    favorites.splice(index, 1);
  }

  // Speichere aktualisierte Liste
  saveFavorites(favorites);
  // Aktualisiere die Favoriten-Anzahl im Header
  updateFavoriteCount();
  // Lade die Favoritenliste neu, um die Änderungen anzuzeigen
  loadFavorites();
}

// Funktion zum Aktualisieren der Favoriten-Anzahl im Seitenkopf
function updateFavoriteCount(): void {
  const favorites = getFavorites();
  const countElement = document.querySelector(".mainnav-number");
  if (countElement) {
    countElement.textContent = favorites.length.toString();
  }
}

// Funktion zum Rendern (Anzeigen) der Favoriten-Bücher in der Tabelle
function renderBooks(): void {
  const tbody = document.querySelector("tbody");
  if (!tbody) return;

  // Lösche den aktuellen Tabelleninhalt
  tbody.innerHTML = "";

  // Aktualisiere die Anzeige der Anzahl der Favoriten (muss immer passieren)
  const countElement = document.querySelector("main h2");
  if (countElement) {
    countElement.textContent = `${filteredBooks.length} Favorites on your list`;
  }

  // Wenn keine Favoriten vorhanden sind, zeige entsprechende Meldung
  if (filteredBooks.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">No favorite books found.</td></tr>';
    return;
  }

  // Iteriere über jedes Favoriten-Buch
  filteredBooks.forEach((book) => {
    const tr = document.createElement("tr");

    // Erstelle Tabellenzeile mit Entfernen-Button (X-Symbol in Kreis)
    // Das SVG zeigt einen Kreis mit X drin (gefüllt, da es ein Favorit ist)
    tr.innerHTML = `
      <td>
        <button class="button button-clear fav-btn" data-isbn="${book.isbn}">
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

    tbody.appendChild(tr);
  });

  // Füge Event-Listener zu allen Entfernen-Buttons hinzu
  const favButtons = tbody.querySelectorAll(".fav-btn");
  favButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Hole die ISBN aus dem data-isbn Attribut
      const isbn = (button as HTMLElement).getAttribute("data-isbn");
      if (isbn) {
        // Entferne das Buch aus den Favoriten
        removeFavorite(isbn);
      }
    });
  });
}

// Funktion zum Filtern der Favoriten-Bücher nach Suchbegriff und Verlag
function filterBooks(): void {
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const publisherSelect = document.getElementById(
    "by-publisher"
  ) as HTMLSelectElement;

  const searchTerm = searchInput?.value.toLowerCase() || "";
  const publisher = publisherSelect?.value || "-";

  // Filtere die Favoriten-Bücher basierend auf den Kriterien
  filteredBooks = allBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm);
    const matchesPublisher = publisher === "-" || book.publisher === publisher;
    return matchesSearch && matchesPublisher;
  });

  renderBooks();
}

// Asynchrone Funktion zum Laden der Favoriten-Bücher
async function loadFavorites(): Promise<void> {
  // Lade die Liste der Favoriten-ISBNs aus dem localStorage
  const favorites = getFavorites();

  // Wenn keine Favoriten vorhanden sind, leere die Arrays und zeige leere Tabelle
  if (favorites.length === 0) {
    allBooks = [];
    filteredBooks = [];

    // Leere auch das Verlags-Dropdown, da keine Favoriten-Bücher existieren
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
    // Lade alle Bücher von der API
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const books: Book[] = await response.json();

    // Filtere nur die Bücher, deren ISBN in der Favoritenliste enthalten ist
    // filter() erstellt ein neues Array mit nur den passenden Büchern
    // includes() prüft, ob die ISBN im favorites-Array vorkommt
    allBooks = books.filter((book) => favorites.includes(book.isbn));
    filteredBooks = allBooks;

    // Befülle das Verlags-Dropdown mit den Verlagen der Favoriten-Bücher
    const publishers = Array.from(
      new Set(allBooks.map((book) => book.publisher))
    );
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

// Initialisierung: Code wird ausgeführt, sobald das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", () => {
  // Aktualisiere die Favoriten-Anzahl im Header
  updateFavoriteCount();
  // Lade die Favoriten-Bücher
  loadFavorites();

  // Füge Event-Listener für Suche und Filter hinzu
  const searchInput = document.getElementById("search");
  const publisherSelect = document.getElementById("by-publisher");

  searchInput?.addEventListener("input", filterBooks);
  publisherSelect?.addEventListener("change", filterBooks);
});
