# IT Book Library

A simple book listing application built with TypeScript and vanilla JavaScript for DOM manipulation. This project allows users to browse IT books, view details, and manage a favorites list.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## 🚀 Getting Started

### Installation

Install all project dependencies:

```powershell
npm install
```

### Build Commands

Compile TypeScript to JavaScript:

```powershell
npm run build
```

Watch mode (automatically rebuild on file changes):

```powershell
npm run watch
```

Alternative watch mode:

```powershell
npm run dev
```

### Running the Application

Start the API server:

```powershell
npm run api
```

Start a local HTTP server:

```powershell
npm run serve
```

Start both API and HTTP server concurrently:

```powershell
npm start
```

### Manual Commands

Run the BookMonkey API directly:

```powershell
npx bookmonkey-api
```

Run an HTTP server on port 8000:

```powershell
npx http-server -p 8000
```

Compile TypeScript manually:

```powershell
npx tsc
```

Compile TypeScript in watch mode manually:

```powershell
npx tsc --watch
```

## 🔧 Development Workflow

### Recommended Development Setup

1. **Terminal 1**: Start the watch mode to auto-compile TypeScript

   ```powershell
   npm run watch
   ```

2. **Terminal 2**: Start the API and HTTP server

   ```powershell
   npm start
   ```

3. Open your browser and navigate to `http://localhost:8000/src/`

### Alternative Setup

If you prefer separate control:

1. **Terminal 1**: Watch TypeScript changes

   ```powershell
   npm run dev
   ```

2. **Terminal 2**: Run the API server

   ```powershell
   npm run api
   ```

3. **Terminal 3**: Run the HTTP server
   ```powershell
   npm run serve
   ```

## 📁 Project Structure

```
awd-book-challenge-main/
├── src/                    # Source files
│   ├── index.html         # Main book listing page
│   ├── detail.html        # Book detail page
│   ├── favorite.html      # Favorites page
│   ├── index.ts           # Book listing logic
│   ├── detail.ts          # Detail page logic
│   ├── favorite.ts        # Favorites page logic
│   ├── types.ts           # TypeScript type definitions
│   ├── style.css          # Styles
│   └── images/            # Image assets
├── dist/                   # Compiled JavaScript output
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── CHALLENGE.md           # Project requirements
└── README.md              # This file
```

## 🌐 API Information

The BookMonkey API runs on: `http://localhost:4730`

Available endpoints:

- `GET http://localhost:4730/books` - Fetch all books
- `GET http://localhost:4730/book/:isbn` - Fetch single book by ISBN

## 📦 Package Management

Install a new package:

```powershell
npm install <package-name>
```

Install a development dependency:

```powershell
npm install -D <package-name>
```

Update all packages:

```powershell
npm update
```

Check for outdated packages:

```powershell
npm outdated
```

## 🛠️ Troubleshooting Commands

Clean install (remove node_modules and reinstall):

```powershell
Remove-Item -Recurse -Force node_modules; Remove-Item -Force package-lock.json; npm install
```

Check TypeScript version:

```powershell
npx tsc --version
```

Verify TypeScript configuration:

```powershell
npx tsc --showConfig
```

Check for TypeScript errors without emitting files:

```powershell
npx tsc --noEmit
```

## 🎯 Features

- ✅ Filterable book listing with search by title
- ✅ Filter books by publisher
- ✅ Book detail page with complete information
- ✅ Favorites list with localStorage persistence
- ✅ Responsive design with Milligram CSS
- ✅ TypeScript for type safety
- ✅ Plain JavaScript DOM manipulation (no frameworks)

## 💻 Technology Stack

- **TypeScript** - Type-safe JavaScript
- **ES2022 Modules** - Modern module system
- **Fetch API** - HTTP requests
- **localStorage** - Client-side data persistence
- **Milligram CSS** - Minimal CSS framework
- **BookMonkey API** - REST API for book data

## 📝 License

This is a challenge project for learning purposes.
