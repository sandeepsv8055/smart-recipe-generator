# Smart Recipe Generator

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# Github link -> https://github.com/sandeepsv8055/smart-recipe-generator
# render link -> https://smart-recipe-generator-3ena.onrender.com/
.............................................................................................................................................





A full-stack application that leverages OCR and ingredient-based search to recommend recipes. Built with Node.js, Express, and Tesseract.js, it enables users to upload images of ingredient lists or manually enter ingredients to discover matching recipes with nutritional and dietary information.

## Table of Contents
- [Features](#features)
- [Architecture & Approach](#architecture--approach)
- [Logic & Implementation](#logic--implementation)
- [API Endpoints](#api-endpoints)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **OCR-based Ingredient Extraction:** Upload an image containing ingredients; the app extracts text using Tesseract.js.
- **Manual Ingredient Search:** Enter ingredients manually to get recipe recommendations.
- **Recipe Matching:** Finds recipes based on ingredient overlap, sorted by relevance.
- **Nutritional & Dietary Info:** Each recipe includes calories, protein, cooking time, difficulty, and dietary type.
- **RESTful API:** Well-defined endpoints for image analysis and ingredient search.

## Architecture & Approach
- **Backend:** Node.js with Express.js for REST API and static file serving.
- **OCR:** Tesseract.js processes uploaded images to extract text.
- **Recipe Logic:** Recipes are stored in-memory (can be extended to DB). Matching is based on ingredient overlap.
- **Frontend:** Static HTML/CSS/JS (in `public/`) for user interaction.

### Flow Diagram
1. **User uploads image or enters ingredients**
2. **Backend extracts/receives ingredients**
3. **Ingredients are cleaned and parsed**
4. **Recipe matching algorithm finds best matches**
5. **Results (recipes) returned to frontend**

## Logic & Implementation
### 1. OCR & Ingredient Parsing
- Uses Tesseract.js to extract text from images (`/analyze` endpoint).
- `parseIngredients(text)` cleans OCR output, removes special characters, splits by comma/newline/semicolon, lowercases, trims, and filters out empty entries.

### 2. Recipe Matching
- `matchRecipes(userIngredientsText)`:
  - Parses user ingredients.
  - For each recipe, calculates overlap score (number of matching ingredients).
  - Filters recipes with at least one match.
  - Sorts recipes by score (most relevant first).

### 3. API Endpoints
- **POST `/analyze`**
  - Accepts raw image data (`image/*`).
  - Runs OCR, parses ingredients, matches recipes.
  - Returns extracted text and matching recipes.
- **POST `/search`**
  - Accepts JSON `{ ingredients: ["ingredient1", "ingredient2", ...] }`
  - Matches recipes and returns results.

### 4. Error Handling
- Validates input (image or ingredients).
- Returns appropriate HTTP status codes and error messages.

## API Endpoints
### 1. `/analyze` (POST)
- **Description:** Analyze uploaded image for ingredients and return matching recipes.
- **Request:**
  - Content-Type: `image/*`
  - Body: Raw image data
- **Response:**
  ```json
  {
    "text": "Extracted text from image",
    "recipes": [ { ...recipeObject } ]
  }
  ```

### 2. `/search` (POST)
- **Description:** Search recipes by manually entered ingredients.
- **Request:**
  - Content-Type: `application/json`
  - Body: `{ "ingredients": ["ingredient1", "ingredient2"] }`
- **Response:**
  ```json
  {
    "recipes": [ { ...recipeObject } ]
  }
  ```

## Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd smartRecipeGenerator
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the server:**
   ```sh
   node app.js
   ```
4. **Access the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- **Image Upload:** Use the frontend to upload an image of ingredients. The backend extracts text and returns matching recipes.
- **Manual Search:** Enter ingredients manually to get recipe recommendations.
- **View Results:** Recipes are displayed with nutritional info, cooking time, difficulty, and dietary type.

## Folder Structure
```
smartRecipeGenerator/
├── app.js              # Main server logic
├── package.json        # Project metadata & dependencies
├── recipes.json        # (Optional) External recipe data
├── public/             # Frontend static files
│   ├── index.html      # Main UI
│   └── style.css       # Styles
├── eng.traineddata     # Tesseract language data
└── README.md           # Project documentation
```

## Contributing
- Fork the repository
- Create a feature branch
- Submit a pull request with clear description
- Ensure code is well-documented and tested

## License
This project is licensed under the MIT License.

