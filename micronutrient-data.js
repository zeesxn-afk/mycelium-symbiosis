"use strict";

// Micronutrient profiles for each meal type
// Values based on typical preparations of lunar base meals
const MICRONUTRIENT_DATA = {
  // Breakfast meals
  "Three Sisters Porridge (Corn, Beans & Squash)": {
    calcium: 185,      // mg
    iron: 4.2,         // mg
    zinc: 2.1,         // mg
    vitaminA: 320,     // mcg RAE
    vitaminC: 8,       // mg
    vitaminD: 0,       // mcg
    vitaminB12: 0.1,   // mcg
    folate: 95,        // mcg DFE
    magnesium: 145,    // mg
    potassium: 420     // mg
  },
  "Amaranth Porridge with Strawberries": {
    calcium: 225,
    iron: 5.1,
    zinc: 2.8,
    vitaminA: 12,
    vitaminC: 35,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 125,
    magnesium: 165,
    potassium: 580
  },
  "Sweet Potato & Soy Pancakes": {
    calcium: 210,
    iron: 3.8,
    zinc: 1.9,
    vitaminA: 1050,
    vitaminC: 22,
    vitaminD: 0,
    vitaminB12: 0.3,
    folate: 88,
    magnesium: 130,
    potassium: 510
  },
  "Quinoa Porridge with Tomatoes": {
    calcium: 195,
    iron: 4.5,
    zinc: 2.4,
    vitaminA: 180,
    vitaminC: 18,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 110,
    magnesium: 155,
    potassium: 495
  },
  "Millet Porridge with Berries": {
    calcium: 175,
    iron: 3.9,
    zinc: 2.0,
    vitaminA: 45,
    vitaminC: 28,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 105,
    magnesium: 140,
    potassium: 430
  },
  "Cornmeal & Bean Cakes": {
    calcium: 215,
    iron: 4.6,
    zinc: 2.3,
    vitaminA: 280,
    vitaminC: 6,
    vitaminD: 0,
    vitaminB12: 0.1,
    folate: 98,
    magnesium: 150,
    potassium: 490
  },
  "Rice Cereal with Soy Milk": {
    calcium: 320,
    iron: 3.2,
    zinc: 1.8,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 1.5,
    vitaminB12: 1.2,
    folate: 75,
    magnesium: 110,
    potassium: 360
  },

  // Snacks
  "Strawberries & Almonds": {
    calcium: 95,
    iron: 1.2,
    zinc: 1.5,
    vitaminA: 8,
    vitaminC: 38,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 22,
    magnesium: 98,
    potassium: 285
  },
  "Soy Yogurt with Berries": {
    calcium: 340,
    iron: 1.8,
    zinc: 0.9,
    vitaminA: 15,
    vitaminC: 32,
    vitaminD: 0.8,
    vitaminB12: 1.5,
    folate: 45,
    magnesium: 78,
    potassium: 320
  },
  "Nuts & Dried Fruit": {
    calcium: 120,
    iron: 2.1,
    zinc: 2.8,
    vitaminA: 35,
    vitaminC: 8,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 32,
    magnesium: 125,
    potassium: 510
  },
  "Pumpkin Seeds & Strawberries": {
    calcium: 145,
    iron: 3.5,
    zinc: 3.2,
    vitaminA: 125,
    vitaminC: 42,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 35,
    magnesium: 155,
    potassium: 480
  },
  "Baked Squash Chips": {
    calcium: 68,
    iron: 0.8,
    zinc: 0.4,
    vitaminA: 580,
    vitaminC: 12,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 18,
    magnesium: 58,
    potassium: 420
  },
  "Sweet Potato Chips": {
    calcium: 72,
    iron: 0.9,
    zinc: 0.5,
    vitaminA: 720,
    vitaminC: 18,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 20,
    magnesium: 62,
    potassium: 450
  },
  "Strawberry Smoothie": {
    calcium: 285,
    iron: 1.5,
    zinc: 0.8,
    vitaminA: 22,
    vitaminC: 52,
    vitaminD: 0.5,
    vitaminB12: 0.9,
    folate: 55,
    magnesium: 88,
    potassium: 380
  },
  "Berry Smoothie": {
    calcium: 295,
    iron: 1.8,
    zinc: 0.9,
    vitaminA: 32,
    vitaminC: 58,
    vitaminD: 0.6,
    vitaminB12: 1.0,
    folate: 62,
    magnesium: 95,
    potassium: 410
  },
  "Roasted Corn": {
    calcium: 8,
    iron: 0.5,
    zinc: 0.6,
    vitaminA: 45,
    vitaminC: 10,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 38,
    magnesium: 45,
    potassium: 280
  },
  "Roasted Sweet Potato": {
    calcium: 42,
    iron: 0.7,
    zinc: 0.3,
    vitaminA: 850,
    vitaminC: 15,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 14,
    magnesium: 35,
    potassium: 390
  },
  "Soy Yogurt": {
    calcium: 280,
    iron: 1.2,
    zinc: 0.6,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0.8,
    vitaminB12: 1.2,
    folate: 28,
    magnesium: 62,
    potassium: 240
  },

  // Lunch/Dinner meals
  "Rice-Fish-Azolla Bowl": {
    calcium: 285,
    iron: 3.5,
    zinc: 3.2,
    vitaminA: 420,
    vitaminC: 28,
    vitaminD: 12,
    vitaminB12: 2.4,
    folate: 125,
    magnesium: 185,
    potassium: 620
  },
  "Chickpea & Spinach Curry": {
    calcium: 365,
    iron: 5.8,
    zinc: 2.9,
    vitaminA: 840,
    vitaminC: 32,
    vitaminD: 0,
    vitaminB12: 0.1,
    folate: 185,
    magnesium: 210,
    potassium: 580
  },
  "Bean & Corn Bowl": {
    calcium: 245,
    iron: 4.2,
    zinc: 2.1,
    vitaminA: 280,
    vitaminC: 12,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 145,
    magnesium: 165,
    potassium: 520
  },
  "Lentil Rice with Greens": {
    calcium: 320,
    iron: 6.1,
    zinc: 2.5,
    vitaminA: 620,
    vitaminC: 38,
    vitaminD: 0,
    vitaminB12: 0.1,
    folate: 195,
    magnesium: 195,
    potassium: 610
  },
  "Sweet Potato Lentil Stew": {
    calcium: 285,
    iron: 5.9,
    zinc: 2.3,
    vitaminA: 920,
    vitaminC: 35,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 165,
    magnesium: 180,
    potassium: 680
  },
  "Tilapia with Quinoa & Greens": {
    calcium: 315,
    iron: 4.2,
    zinc: 3.8,
    vitaminA: 480,
    vitaminC: 42,
    vitaminD: 15,
    vitaminB12: 2.8,
    folate: 135,
    magnesium: 205,
    potassium: 590
  },
  "Tilapia with Sweet Potato": {
    calcium: 295,
    iron: 3.9,
    zinc: 3.5,
    vitaminA: 950,
    vitaminC: 25,
    vitaminD: 14,
    vitaminB12: 2.6,
    folate: 95,
    magnesium: 180,
    potassium: 660
  },
  "Rice with Fish & Vegetables": {
    calcium: 305,
    iron: 4.5,
    zinc: 3.6,
    vitaminA: 520,
    vitaminC: 35,
    vitaminD: 13,
    vitaminB12: 2.5,
    folate: 125,
    magnesium: 190,
    potassium: 620
  },
  "Milpa Bowl (Corn, Beans & Squash)": {
    calcium: 235,
    iron: 4.0,
    zinc: 2.0,
    vitaminA: 380,
    vitaminC: 18,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 115,
    magnesium: 160,
    potassium: 550
  },
  "Three Sisters Stew": {
    calcium: 265,
    iron: 4.3,
    zinc: 2.2,
    vitaminA: 420,
    vitaminC: 22,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 128,
    magnesium: 175,
    potassium: 580
  },
  "Fish with Vegetable Stir Fry": {
    calcium: 335,
    iron: 4.8,
    zinc: 3.9,
    vitaminA: 680,
    vitaminC: 58,
    vitaminD: 14,
    vitaminB12: 2.7,
    folate: 145,
    magnesium: 220,
    potassium: 650
  },
  "Three Sisters Feast": {
    calcium: 290,
    iron: 4.6,
    zinc: 2.4,
    vitaminA: 450,
    vitaminC: 28,
    vitaminD: 0,
    vitaminB12: 0.1,
    folate: 140,
    magnesium: 185,
    potassium: 610
  },
  "Rice & Tofu Stir Fry": {
    calcium: 385,
    iron: 4.1,
    zinc: 2.3,
    vitaminA: 520,
    vitaminC: 45,
    vitaminD: 0.5,
    vitaminB12: 1.8,
    folate: 118,
    magnesium: 175,
    potassium: 570
  },
  "Quinoa Bean Bowl": {
    calcium: 275,
    iron: 4.8,
    zinc: 2.6,
    vitaminA: 285,
    vitaminC: 20,
    vitaminD: 0,
    vitaminB12: 0,
    folate: 155,
    magnesium: 195,
    potassium: 605
  }
};

// Daily value recommendations for adults on lunar missions
// Adjusted for higher activity and cosmic radiation stress
const DAILY_VALUE_TARGETS = {
  calcium: 1200,      // mg - higher for bone density in low-G
  iron: 18,           // mg - standard RDA
  zinc: 11,           // mg - immune support for radiation
  vitaminA: 900,      // mcg RAE - vision health
  vitaminC: 120,      // mg - increased for radiation protection
  vitaminD: 25,       // mcg - bone health, immune function
  vitaminB12: 2.4,    // mcg - energy metabolism
  folate: 400,        // mcg DFE - cell division
  magnesium: 420,     // mg - muscle function
  potassium: 3400     // mg - cardiovascular health
};

// Activity-adjusted micronutrient recommendations
const ACTIVITY_ADJUSTED_TARGETS = {
  sedentary: {
    calcium: 1000,
    iron: 18,
    zinc: 11,
    vitaminA: 900,
    vitaminC: 90,
    vitaminD: 20,
    vitaminB12: 2.4,
    folate: 400,
    magnesium: 400,
    potassium: 3400
  },
  low: {
    calcium: 1050,
    iron: 18,
    zinc: 11,
    vitaminA: 900,
    vitaminC: 100,
    vitaminD: 22,
    vitaminB12: 2.4,
    folate: 400,
    magnesium: 410,
    potassium: 3500
  },
  moderate: {
    calcium: 1100,
    iron: 19,
    zinc: 12,
    vitaminA: 900,
    vitaminC: 110,
    vitaminD: 23,
    vitaminB12: 2.5,
    folate: 410,
    magnesium: 420,
    potassium: 3600
  },
  high: {
    calcium: 1200,
    iron: 21,
    zinc: 13,
    vitaminA: 950,
    vitaminC: 140,
    vitaminD: 25,
    vitaminB12: 2.6,
    folate: 425,
    magnesium: 450,
    potassium: 3800
  },
  "very-high": {
    calcium: 1250,
    iron: 23,
    zinc: 14,
    vitaminA: 1000,
    vitaminC: 160,
    vitaminD: 30,
    vitaminB12: 2.8,
    folate: 440,
    magnesium: 480,
    potassium: 4000
  }
};

// Micronutrient categories for display
const MICRONUTRIENT_CATEGORIES = {
  minerals: {
    calcium: { icon: "🥛", label: "Calcium", unit: "mg", color: "#9af0be" },
    iron: { icon: "🩸", label: "Iron", unit: "mg", color: "#ff8a8a" },
    zinc: { icon: "⚡", label: "Zinc", unit: "mg", color: "#f6c06a" },
    magnesium: { icon: "💪", label: "Magnesium", unit: "mg", color: "#86e7ff" },
    potassium: { icon: "🍌", label: "Potassium", unit: "mg", color: "#9af0be" }
  },
  vitamins: {
    vitaminA: { icon: "👁️", label: "Vitamin A", unit: "mcg", color: "#f6c06a" },
    vitaminC: { icon: "🍊", label: "Vitamin C", unit: "mg", color: "#ff8a8a" },
    vitaminD: { icon: "☀️", label: "Vitamin D", unit: "mcg", color: "#f6c06a" },
    vitaminB12: { icon: "⚙️", label: "B12", unit: "mcg", color: "#86e7ff" },
    folate: { icon: "🌱", label: "Folate", unit: "mcg", color: "#9af0be" }
  }
};

/**
 * Get micronutrient data for a specific meal
 * @param {string} mealName - Name of the meal
 * @returns {object} Micronutrient values or empty object if not found
 */
function getMicronutrientData(mealName) {
  return MICRONUTRIENT_DATA[mealName] || {};
}

/**
 * Calculate total micronutrients from array of meals
 * @param {array} meals - Array of meal objects with names
 * @returns {object} Total micronutrient values
 */
function calculateTotalMicronutrients(meals) {
  const totals = {};
  
  Object.keys(DAILY_VALUE_TARGETS).forEach(key => {
    totals[key] = 0;
  });

  meals.forEach(meal => {
    const data = getMicronutrientData(meal.name);
    Object.entries(data).forEach(([key, value]) => {
      totals[key] = (totals[key] || 0) + value;
    });
  });

  return totals;
}

/**
 * Calculate percentage of daily value for micronutrients
 * @param {object} totals - Total micronutrient values
 * @param {object} targets - Target values
 * @returns {object} Percentage of daily value
 */
function calculateDVPercentage(totals, targets) {
  const percentages = {};
  
  Object.entries(targets).forEach(([key, target]) => {
    const total = totals[key] || 0;
    percentages[key] = Math.round((total / target) * 100);
  });

  return percentages;
}

/**
 * Get status indicator (deficient, borderline, adequate, excess)
 * @param {number} percentage - Percentage of daily value
 * @returns {object} Status with emoji and label
 */
function getMicronutrientStatus(percentage) {
  if (percentage < 50) {
    return { emoji: "🔴", label: "Deficient", color: "#ff8a8a" };
  } else if (percentage < 80) {
    return { emoji: "🟡", label: "Borderline", color: "#f6c06a" };
  } else if (percentage <= 120) {
    return { emoji: "🟢", label: "Adequate", color: "#9af0be" };
  } else {
    return { emoji: "🔵", label: "Excess", color: "#86e7ff" };
  }
}

/**
 * Get key micronutrients for a meal (top 3-4 most important)
 * @param {string} mealName - Name of the meal
 * @returns {array} Array of top micronutrients
 */
function getTopMicronutrients(mealName, limit = 4) {
  const data = getMicronutrientData(mealName);
  const entries = Object.entries(data)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
  
  return entries;
}
