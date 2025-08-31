const express = require("express");
const bodyParser = require("body-parser");
const Tesseract = require("tesseract.js");

const app = express();
const recipes = [
  {
    "name": "Tomato Pasta",
    "ingredients": ["tomato", "pasta", "olive oil", "garlic"],
    "steps": ["Boil pasta", "Cook tomato sauce with garlic", "Mix and serve"],
    "nutrition": { "calories": 400, "protein": 12 },
    "difficulty": "easy",
    "cookingTime": 20,
    "dietary": "vegetarian"
  },
  {
    "name": "Fruit Salad",
    "ingredients": ["apple", "banana", "orange", "grapes"],
    "steps": ["Chop fruits", "Mix together", "Serve chilled"],
    "nutrition": { "calories": 150, "protein": 2 },
    "difficulty": "easy",
    "cookingTime": 10,
    "dietary": "vegan"
  },
  {
    "name": "Paneer Butter Masala",
    "ingredients": ["paneer", "tomato", "butter", "cream", "onion"],
    "steps": ["Cook onion-tomato gravy", "Add paneer & butter", "Finish with cream"],
    "nutrition": { "calories": 450, "protein": 15 },
    "difficulty": "medium",
    "cookingTime": 35,
    "dietary": "vegetarian"
  },
  {
    "name": "Vegetable Biryani",
    "ingredients": ["rice", "carrot", "peas", "beans", "onion", "spices"],
    "steps": ["Cook rice", "Prepare spiced vegetables", "Layer and steam"],
    "nutrition": { "calories": 500, "protein": 10 },
    "difficulty": "hard",
    "cookingTime": 60,
    "dietary": "vegetarian"
  },
  {
    "name": "Masala Dosa",
    "ingredients": ["rice", "urad dal", "potato", "onion"],
    "steps": ["Make dosa batter", "Prepare potato masala", "Cook dosa and stuff"],
    "nutrition": { "calories": 350, "protein": 8 },
    "difficulty": "medium",
    "cookingTime": 40,
    "dietary": "vegetarian"
  },
  {
    "name": "Aloo Paratha",
    "ingredients": ["wheat flour", "potato", "onion", "spices"],
    "steps": ["Prepare dough", "Make potato stuffing", "Roll and cook paratha"],
    "nutrition": { "calories": 320, "protein": 7 },
    "difficulty": "easy",
    "cookingTime": 25,
    "dietary": "vegetarian"
  },
  {
    "name": "Dal Tadka",
    "ingredients": ["lentils", "onion", "tomato", "garlic", "ghee"],
    "steps": ["Cook dal", "Prepare tadka with garlic", "Mix and serve"],
    "nutrition": { "calories": 280, "protein": 14 },
    "difficulty": "easy",
    "cookingTime": 30,
    "dietary": "vegetarian"
  },
  {
    "name": "Chole Bhature",
    "ingredients": ["chickpeas", "tomato", "onion", "flour", "spices"],
    "steps": ["Cook chole curry", "Prepare bhature dough", "Fry and serve"],
    "nutrition": { "calories": 600, "protein": 18 },
    "difficulty": "hard",
    "cookingTime": 70,
    "dietary": "vegetarian"
  },
  {
    "name": "Idli Sambhar",
    "ingredients": ["rice", "urad dal", "lentils", "tamarind", "vegetables"],
    "steps": ["Make idli batter", "Steam idlis", "Cook sambhar with veggies"],
    "nutrition": { "calories": 300, "protein": 9 },
    "difficulty": "medium",
    "cookingTime": 50,
    "dietary": "vegetarian"
  },
  {
    "name": "Chicken Curry",
    "ingredients": ["chicken", "onion", "tomato", "spices"],
    "steps": ["Cook onion-tomato masala", "Add chicken & spices", "Simmer till done"],
    "nutrition": { "calories": 480, "protein": 28 },
    "difficulty": "medium",
    "cookingTime": 45,
    "dietary": "non-vegetarian"
  },
  {
    "name": "Fish Fry",
    "ingredients": ["fish", "lemon", "spices", "oil"],
    "steps": ["Marinate fish with spices", "Shallow fry", "Serve hot"],
    "nutrition": { "calories": 350, "protein": 25 },
    "difficulty": "easy",
    "cookingTime": 25,
    "dietary": "non-vegetarian"
  },
  {
    "name": "Egg Curry",
    "ingredients": ["egg", "tomato", "onion", "spices"],
    "steps": ["Boil eggs", "Prepare onion-tomato gravy", "Add eggs and simmer"],
    "nutrition": { "calories": 300, "protein": 20 },
    "difficulty": "easy",
    "cookingTime": 30,
    "dietary": "non-vegetarian"
  },
  {
    "name": "Fried Rice",
    "ingredients": ["rice", "carrot", "beans", "capsicum", "soy sauce"],
    "steps": ["Cook rice", "Stir fry vegetables", "Mix with soy sauce"],
    "nutrition": { "calories": 400, "protein": 9 },
    "difficulty": "easy",
    "cookingTime": 25,
    "dietary": "vegan"
  },
  {
    "name": "Veg Momos",
    "ingredients": ["flour", "cabbage", "carrot", "onion", "garlic"],
    "steps": ["Prepare dough", "Make veg filling", "Steam momos"],
    "nutrition": { "calories": 260, "protein": 6 },
    "difficulty": "medium",
    "cookingTime": 40,
    "dietary": "vegan"
  },
  {
    "name": "Pav Bhaji",
    "ingredients": ["potato", "tomato", "peas", "butter", "bread"],
    "steps": ["Cook mashed vegetables", "Add spices and butter", "Serve with pav"],
    "nutrition": { "calories": 450, "protein": 11 },
    "difficulty": "medium",
    "cookingTime": 45,
    "dietary": "vegetarian"
  },
  {
    "name": "Veg Pulao",
    "ingredients": ["rice", "peas", "carrot", "beans", "spices"],
    "steps": ["Cook vegetables", "Add rice & spices", "Simmer till done"],
    "nutrition": { "calories": 380, "protein": 8 },
    "difficulty": "easy",
    "cookingTime": 30,
    "dietary": "vegan"
  },
  {
    "name": "Mushroom Curry",
    "ingredients": ["mushroom", "onion", "tomato", "cream", "spices"],
    "steps": ["Cook onion-tomato masala", "Add mushrooms", "Finish with cream"],
    "nutrition": { "calories": 340, "protein": 12 },
    "difficulty": "medium",
    "cookingTime": 35,
    "dietary": "vegetarian"
  },
  {
    "name": "Spring Rolls",
    "ingredients": ["flour", "cabbage", "carrot", "beans", "soy sauce"],
    "steps": ["Prepare veg filling", "Roll in sheets", "Deep fry"],
    "nutrition": { "calories": 310, "protein": 7 },
    "difficulty": "medium",
    "cookingTime": 40,
    "dietary": "vegan"
  },
  {
    "name": "Veg Sandwich",
    "ingredients": ["bread", "tomato", "cucumber", "lettuce", "cheese"],
    "steps": ["Assemble veggies on bread", "Add cheese", "Grill or serve plain"],
    "nutrition": { "calories": 280, "protein": 10 },
    "difficulty": "easy",
    "cookingTime": 15,
    "dietary": "vegetarian"
  },
  {
    "name": "Omelette",
    "ingredients": ["egg", "onion", "tomato", "capsicum"],
    "steps": ["Beat eggs", "Add veggies", "Cook on pan"],
    "nutrition": { "calories": 200, "protein": 14 },
    "difficulty": "easy",
    "cookingTime": 10,
    "dietary": "non-vegetarian"
  },
  {
    "name": "Maggi Masala",
    "ingredients": ["noodles", "masala", "vegetables"],
    "steps": ["Cook noodles", "Add veggies & masala", "Serve hot"],
    "nutrition": { "calories": 300, "protein": 6 },
    "difficulty": "easy",
    "cookingTime": 10,
    "dietary": "vegetarian"
  },
  {
    "name": "Chapati with Sabji",
    "ingredients": ["wheat flour", "potato", "onion", "spices"],
    "steps": ["Make chapati dough", "Cook vegetable sabji", "Serve together"],
    "nutrition": { "calories": 320, "protein": 8 },
    "difficulty": "easy",
    "cookingTime": 25,
    "dietary": "vegan"
  },
  {
    "name": "Kadhi Pakora",
    "ingredients": ["gram flour", "yogurt", "onion", "spices"],
    "steps": ["Make pakoras", "Prepare kadhi", "Mix and serve"],
    "nutrition": { "calories": 380, "protein": 12 },
    "difficulty": "medium",
    "cookingTime": 50,
    "dietary": "vegetarian"
  },
  {
    "name": "Vegetable Soup",
    "ingredients": ["carrot", "beans", "cabbage", "onion"],
    "steps": ["Boil vegetables", "Add spices", "Serve hot"],
    "nutrition": { "calories": 120, "protein": 3 },
    "difficulty": "easy",
    "cookingTime": 20,
    "dietary": "vegan"
  },
  {
    "name": "Chicken Biryani",
    "ingredients": ["chicken", "rice", "onion", "spices", "yogurt"],
    "steps": ["Cook chicken masala", "Layer with rice", "Dum cook"],
    "nutrition": { "calories": 600, "protein": 30 },
    "difficulty": "hard",
    "cookingTime": 75,
    "dietary": "non-vegetarian"
  }
]
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.raw({ type: "image/*", limit: "10mb" })
);

// ===== Helper: Clean OCR text =====
function parseIngredients(text) {
  return text
    .replace(/[^a-zA-Z0-9,\n\s]/g, "")  // remove special characters
    .split(/\n|,|;/)
    .map(i => i.toLowerCase().trim())
    .filter(Boolean);
}

// ===== Match Recipes =====
function matchRecipes(userIngredientsText) {
  const userIngredients = parseIngredients(userIngredientsText);

  return recipes
    .map(r => {
      const overlap = r.ingredients.filter(x =>
        userIngredients.includes(x.toLowerCase())
      );
      return { ...r, score: overlap.length };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

// ===== Endpoint: OCR Image =====
app.post("/analyze", async (req, res) => {
  try {
    const imageData = req.body;
    if (!imageData || !imageData.length) {
      return res.status(400).json({ error: "No image provided" });
    }

    const { data: { text } } = await Tesseract.recognize(imageData, "eng", {
      logger: m => console.log(m)
    });
   
    const matches = matchRecipes(text);
    res.json({ text, recipes: matches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Endpoint: Manual Search =====
app.post("/search", (req, res) => {
  const { ingredients } = req.body;
  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "No ingredients provided" });
  }

  const matches = matchRecipes(ingredients.join(","));
  res.json({ recipes: matches });
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));