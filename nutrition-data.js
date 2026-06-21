"use strict";

// Food Database with complete nutritional information
const FOOD_DATABASE = [
  // Breakfast Items
  { id: 1, name: "Three Sisters Porridge", category: "breakfast", calories: 380, protein: 14, carbs: 55, fat: 9, fiber: 7, sodium: 120, potassium: 480, calcium: 180, vitaminD: 100, vitaminC: 12, iron: 3, vegan: true, vegetarian: true, lowSodium: false },
  { id: 2, name: "Amaranth Porridge with Berries", category: "breakfast", calories: 320, protein: 12, carbs: 48, fat: 7, fiber: 6, sodium: 90, potassium: 420, calcium: 160, vitaminD: 80, vitaminC: 28, iron: 2, vegan: true, vegetarian: true, lowSodium: true },
  { id: 3, name: "Sweet Potato Pancakes", category: "breakfast", calories: 410, protein: 16, carbs: 60, fat: 10, fiber: 5, sodium: 280, potassium: 520, calcium: 200, vitaminD: 120, vitaminC: 18, iron: 4, vegan: false, vegetarian: true, lowSodium: false },
  { id: 4, name: "Quinoa Porridge with Tomatoes", category: "breakfast", calories: 350, protein: 18, carbs: 52, fat: 8, fiber: 8, sodium: 110, potassium: 480, calcium: 140, vitaminD: 90, vitaminC: 22, iron: 5, vegan: true, vegetarian: true, lowSodium: true },
  { id: 5, name: "Millet Porridge with Berries", category: "breakfast", calories: 340, protein: 13, carbs: 51, fat: 7, fiber: 7, sodium: 85, potassium: 450, calcium: 150, vitaminD: 85, vitaminC: 25, iron: 3, vegan: true, vegetarian: true, lowSodium: true },
  
  // Snack Items
  { id: 6, name: "Strawberries & Almonds", category: "snack", calories: 240, protein: 7, carbs: 22, fat: 14, fiber: 4, sodium: 30, potassium: 280, calcium: 100, vitaminD: 0, vitaminC: 35, iron: 1, vegan: true, vegetarian: true, lowSodium: true },
  { id: 7, name: "Soy Yogurt with Berries", category: "snack", calories: 180, protein: 8, carbs: 28, fat: 3, fiber: 3, sodium: 120, potassium: 220, calcium: 180, vitaminD: 100, vitaminC: 20, iron: 2, vegan: true, vegetarian: true, lowSodium: false },
  { id: 8, name: "Berry Smoothie", category: "snack", calories: 220, protein: 6, carbs: 42, fat: 2, fiber: 4, sodium: 100, potassium: 350, calcium: 140, vitaminD: 80, vitaminC: 45, iron: 1, vegan: true, vegetarian: true, lowSodium: true },
  { id: 9, name: "Baked Squash Chips", category: "snack", calories: 180, protein: 3, carbs: 38, fat: 2, fiber: 5, sodium: 220, potassium: 480, calcium: 60, vitaminD: 0, vitaminC: 15, iron: 1, vegan: true, vegetarian: true, lowSodium: false },
  { id: 10, name: "Roasted Sweet Potato", category: "snack", calories: 180, protein: 3, carbs: 40, fat: 0.5, fiber: 4, sodium: 55, potassium: 580, calcium: 40, vitaminD: 0, vitaminC: 25, iron: 1, vegan: true, vegetarian: true, lowSodium: true },
  
  // Lunch Items
  { id: 11, name: "Rice-Fish Bowl", category: "lunch", calories: 580, protein: 38, carbs: 72, fat: 16, fiber: 6, sodium: 420, potassium: 520, calcium: 120, vitaminD: 400, vitaminC: 8, iron: 3, vegan: false, vegetarian: false, lowSodium: false },
  { id: 12, name: "Chickpea & Spinach Curry", category: "lunch", calories: 520, protein: 28, carbs: 68, fat: 14, fiber: 10, sodium: 380, potassium: 640, calcium: 200, vitaminD: 0, vitaminC: 22, iron: 6, vegan: true, vegetarian: true, lowSodium: false },
  { id: 13, name: "Bean & Corn Bowl", category: "lunch", calories: 490, protein: 24, carbs: 70, fat: 10, fiber: 12, sodium: 280, potassium: 720, calcium: 160, vitaminD: 0, vitaminC: 18, iron: 5, vegan: true, vegetarian: true, lowSodium: true },
  { id: 14, name: "Lentil Rice with Greens", category: "lunch", calories: 510, protein: 26, carbs: 72, fat: 9, fiber: 11, sodium: 240, potassium: 680, calcium: 140, vitaminD: 0, vitaminC: 28, iron: 7, vegan: true, vegetarian: true, lowSodium: true },
  { id: 15, name: "Tilapia with Sweet Potato", category: "lunch", calories: 620, protein: 44, carbs: 68, fat: 16, fiber: 8, sodium: 380, potassium: 720, calcium: 140, vitaminD: 450, vitaminC: 20, iron: 4, vegan: false, vegetarian: false, lowSodium: false },
  
  // Main Courses
  { id: 16, name: "Three Sisters Stew", category: "dinner", calories: 720, protein: 32, carbs: 95, fat: 20, fiber: 14, sodium: 420, potassium: 860, calcium: 240, vitaminD: 0, vitaminC: 35, iron: 8, vegan: true, vegetarian: true, lowSodium: false },
  { id: 17, name: "Milpa Bowl", category: "dinner", calories: 680, protein: 28, carbs: 88, fat: 18, fiber: 13, sodium: 360, potassium: 800, calcium: 200, vitaminD: 0, vitaminC: 22, iron: 6, vegan: true, vegetarian: true, lowSodium: false },
  { id: 18, name: "Tilapia with Quinoa & Greens", category: "dinner", calories: 750, protein: 48, carbs: 82, fat: 18, fiber: 9, sodium: 420, potassium: 850, calcium: 220, vitaminD: 500, vitaminC: 30, iron: 5, vegan: false, vegetarian: false, lowSodium: false },
  { id: 19, name: "Sweet Potato Lentil Stew", category: "dinner", calories: 680, protein: 30, carbs: 92, fat: 14, fiber: 12, sodium: 380, potassium: 920, calcium: 180, vitaminD: 0, vitaminC: 28, iron: 8, vegan: true, vegetarian: true, lowSodium: false },
  { id: 20, name: "Quinoa Bean Bowl", category: "dinner", calories: 710, protein: 32, carbs: 90, fat: 16, fiber: 13, sodium: 340, potassium: 840, calcium: 200, vitaminD: 0, vitaminC: 25, iron: 7, vegan: true, vegetarian: true, lowSodium: true },
  { id: 21, name: "Fish with Vegetable Stir Fry", category: "dinner", calories: 590, protein: 42, carbs: 58, fat: 18, fiber: 8, sodium: 520, potassium: 720, calcium: 160, vitaminD: 480, vitaminC: 32, iron: 4, vegan: false, vegetarian: false, lowSodium: false },
  { id: 22, name: "Rice & Tofu Stir Fry", category: "dinner", calories: 640, protein: 26, carbs: 82, fat: 16, fiber: 7, sodium: 480, potassium: 620, calcium: 240, vitaminD: 0, vitaminC: 28, iron: 5, vegan: true, vegetarian: true, lowSodium: false },
  { id: 23, name: "Three Sisters Feast", category: "dinner", calories: 780, protein: 34, carbs: 102, fat: 22, fiber: 15, sodium: 460, potassium: 920, calcium: 260, vitaminD: 0, vitaminC: 38, iron: 9, vegan: true, vegetarian: true, lowSodium: false }
];

// Function to get recommended meals based on profile
function getMealRecommendations(profile, nutritionRequirements) {
  const recommendations = {
    breakfast: [],
    snacks: [],
    lunch: [],
    dinner: []
  };
  
  // Filter foods based on restrictions
  const availableFoods = FOOD_DATABASE.filter(food => {
    // Check vegan/vegetarian restrictions
    if (profile.restrictions.includes("Vegan") && !food.vegan) return false;
    if (profile.restrictions.includes("Vegetarian") && !food.vegetarian) return false;
    
    // Check sodium restriction
    if (profile.restrictions.includes("Low Sodium") && !food.lowSodium) return false;
    
    // Check allergies
    if (profile.allergies) {
      const allergies = profile.allergies.split(",").map(a => a.trim().toLowerCase());
      const foodName = food.name.toLowerCase();
      if (allergies.some(allergy => foodName.includes(allergy))) return false;
    }
    
    return true;
  });
  
  // Group by category
  const byCategory = {
    breakfast: availableFoods.filter(f => f.category === "breakfast"),
    snack: availableFoods.filter(f => f.category === "snack"),
    lunch: availableFoods.filter(f => f.category === "lunch"),
    dinner: availableFoods.filter(f => f.category === "dinner")
  };
  
  return byCategory;
}
