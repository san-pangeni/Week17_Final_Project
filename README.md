\# Precalculus Flashcards

This is an interactive flashcard application built with React and TypeScript, designed for studying precalculus concepts. It allows users to view, add, edit, and delete flashcards, filter by category, and search for specific terms or definitions.

## Features

* **Interactive Flashcards:** View terms on one side and definitions/examples on the other with a flip animation.
* **CRUD Operations:** Create, Read, Update, and Delete flashcards.
* **Category Filtering:** Filter the displayed flashcards based on predefined categories.
* **Search:** Search through flashcard terms and definitions.
* **Data Persistence:** Flashcard data is fetched from/saved to a MockAPI endpoint.

## Tech Stack

* **Frontend:** React, TypeScript
* **Build Tool:** Vite
* **Styling:** Bootstrap, React-Bootstrap, Custom CSS
* **API Client:** Axios
* **Routing:** React Router DOM
* **Linting/Formatting:** ESLint, TypeScript
* **API (Backend):** MockAPI (used via `flashcardApi.ts`)

## Core Concepts Explained

Here's a breakdown of the key parts of the application:

### 1. Project Setup & Structure

* **Foundation:** The project utilizes Vite for a fast development experience and optimized builds. React is employed for building the user interface through a component-based architecture, and TypeScript adds static typing for enhanced code quality and error detection.
* **Key Files/Folders:**
    * `index.html`: The main HTML file served to the browser.
    * `src/main.tsx` (Inferred): The entry point where the React application is mounted onto the DOM.
    * `src/App.tsx` (Inferred): The root component managing overall layout, state, and orchestration of other components.
    * `src/components/`: Contains reusable UI components like `Flashcard.tsx`, `FlashcardList.tsx`, `FlashcardForm.tsx`, and `Sidebar.tsx`.
    * `src/api/`: Houses the logic for interacting with the backend API, primarily in `flashcardApi.ts`.
    * `src/data/`: Includes TypeScript type definitions (`types.ts`) and potentially initial/sample data (`data.ts`).
    * `src/styles/`: Contains global CSS (`index.css`) and component-specific styles (`flashcard.css`).
    * `package.json`: Defines project metadata, dependencies, and runnable scripts like `npm run dev`.

### 2. Core Components

The UI is built using several key React components:

* **`App.tsx` (Root Component):** Manages the core application state (flashcards, filters, form visibility) and renders the main layout including the header, sidebar, and flashcard list. It passes down necessary data and callback functions to child components.
* **`FlashcardList.tsx`:** Receives the array of flashcards to display (potentially filtered by `App.tsx`) and maps over them, rendering an individual `Flashcard` component for each one. Uses Bootstrap for responsive grid layout.
* **`Flashcard.tsx`:** Represents a single interactive flashcard. It manages its "flipped" state internally using `useState`. Displays the term initially and reveals the definition/example upon clicking. Contains the Edit and Delete buttons, which trigger functions passed down from `App.tsx`. The flip animation is handled via custom CSS.
* **`FlashcardForm.tsx`:** A reusable form for both adding new flashcards and editing existing ones. It can be pre-filled with data for editing. Manages form input state and calls API functions provided by `App.tsx` upon submission.
* **`Sidebar.tsx`:** Displays available categories and allows users to click on one to filter the flashcards displayed in `FlashcardList.tsx`.

### 3. Data Handling & API Interaction

* **Data Structure:** Flashcards adhere to the `Flashcard` interface defined in `src/data/types.ts`, specifying fields like `id`, `category`, `term`, `definition`, and `example`.
* **API Layer:** Communication with the backend is handled through functions defined in `src/api/flashcardApi.ts`. This file uses the Axios library to perform HTTP requests (GET, POST, PUT, DELETE) to a MockAPI endpoint. Functions like `getFlashcards`, `createFlashcard`, `updateFlashcard`, and `deleteFlashcard` encapsulate the API calls.
* **MockAPI & Seeding:** The application is configured to work with MockAPI, a tool for simulating a backend. A script, `seedMockApi.js`, is provided to populate the MockAPI endpoint with sample data defined in `src/data.ts`.

### 4. State Management

* **React Hooks:** State is primarily managed using React's built-in hooks, `useState` and `useEffect`, within functional components.
* **Central State (`App.tsx`):** The main `App` component holds crucial state variables:
    * `flashcards`: An array storing all flashcard data, typically fetched from the API.
    * `selectedCategory`, `searchTerm`: Store the current filtering criteria applied by the user.
    * `showForm`, `editingCard`: Control the modal form's visibility and determine if it's in "add" or "edit" mode.
* **Data Fetching & Synchronization:** `useEffect` is used in `App.tsx` to fetch the initial list of flashcards from the API when the application loads. Subsequent updates (add, edit, delete) involve calling the appropriate API function and then updating the local `flashcards` state to keep the UI synchronized.
* **Derived State:** The list of flashcards actually displayed is often *derived* within `App.tsx` by filtering the main `flashcards` state based on the current `selectedCategory` and `searchTerm`, rather than storing the filtered list as separate state.

### 5. Styling

* **Bootstrap:** The application leverages Bootstrap and the React-Bootstrap library for base styling, responsive layout (grid), and common UI elements (buttons, forms, etc.).
* **Custom CSS:** Specific styling requirements are handled with CSS files:
    * `src/styles/index.css`: Contains global application styles.
    * `src/components/flashcard.css`: Defines the styles for the 3D flip animation using CSS properties like `transform`, `perspective`, and `backface-visibility`.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd precalc-flashcards
    ```
2.  **Install dependencies:** Use npm or yarn to install the packages listed in `package.json`.
    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

1.  **Run the development server:** Execute the `dev` script defined in `package.json`.
    ```bash
    npm run dev
    # or
    yarn dev
    ```
2.  Open your browser to the specified local address (e.g., `http://localhost:5173`).

## API Details

The application interacts with a MockAPI endpoint defined in `src/api/flashcardApi.ts`. Key operations include:

* Fetching all flashcards (`GET /flashcards`).
* Creating a flashcard (`POST /flashcards`).
* Updating a flashcard (`PUT /flashcards/:id`).
* Deleting a flashcard (`DELETE /flashcards/:id`).

## Seeding Mock API Data (Optional)

To populate your MockAPI endpoint with the sample data found in `src/data.ts`, you can run the provided seeding script:

```bash
node seedMockApi.js