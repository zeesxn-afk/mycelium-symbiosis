"use strict";

const NUTRITION_STORAGE_KEY = "tribalstar.nutrition-results.v1";

const MICRONUTRIENT_TARGETS = {
  vitaminD: 1000, // IU
  vitaminC: 90, // mg
  calcium: 1200, // mg
  magnesium: { male: 420, female: 320 }, // mg
  potassium: 4700, // mg
  sodium: 2300, // max mg
  iron: { male: 11, female: 18 } // mg
};

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "nutrition-calculator") {
    initCalculatorPage();
  }
});

function initCalculatorPage() {
  const form = document.getElementById("nutrition-form");
  form.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  const profile = {
    fullName: formData.get("fullName"),
    gender: formData.get("gender"),
    age: Number(formData.get("age")),
    height: Number(formData.get("height")),
    weight: Number(formData.get("weight")),
    activityLevel: formData.get("activityLevel"),
    missionType: formData.get("missionType"),
    goal: formData.get("goal"),
    restrictions: formData.getAll("restrictions"),
    allergies: formData.get("allergies")
  };

  const results = calculateNutritionRequirements(profile);
  displayResults(profile, results);
  saveResults(profile, results);
}

function calculateNutritionRequirements(profile) {
  // STEP 1: Calculate Daily Energy Requirement (EER)
  let eer = calculateEER(profile);
  
  // STEP 2: Apply Activity Multiplier
  const activityMultiplier = getActivityMultiplier(profile.activityLevel);
  let dailyCalories = eer * activityMultiplier;
  
  // Add +500 kcal on EVA days (NASA guideline)
  if (profile.activityLevel === "EVA Day") {
    dailyCalories += 500;
  }
  
  // STEP 3: Apply Goal Adjustment
  const goalAdjustment = getGoalAdjustment(profile.goal);
  dailyCalories += goalAdjustment;
  
  dailyCalories = Math.round(dailyCalories);
  
  // STEP 4: Calculate Macronutrient Distribution
  const macros = calculateMacronutrients(dailyCalories, profile.weight, profile.restrictions);
  
  // STEP 5: Calculate Water Requirement
  const waterIntake = calculateWaterRequirement(profile.weight, profile.activityLevel);
  
  // STEP 6: Calculate Micronutrient Targets
  const micronutrients = calculateMicronutrients(profile.gender, dailyCalories);
  
  // STEP 7: Health Warnings
  const warnings = generateHealthWarnings(profile, dailyCalories, macros.protein, waterIntake);
  
  return {
    dailyCalories,
    macros,
    waterIntake,
    micronutrients,
    warnings,
    calculatedAt: new Date().toISOString()
  };
}

function calculateEER(profile) {
  const { gender, age, height, weight } = profile;
  const heightMeters = height / 100;
  
  if (gender === "Male") {
    // Male: EER = 622 − (9.53 × Age) + 1.25 × ((15.9 × Weight) + (539.6 × HeightInMeters))
    return 622 - (9.53 * age) + 1.25 * ((15.9 * weight) + (539.6 * heightMeters));
  } else {
    // Female: EER = 354 − (6.91 × Age) + 1.25 × ((9.36 × Weight) + (726 × HeightInMeters))
    return 354 - (6.91 * age) + 1.25 * ((9.36 * weight) + (726 * heightMeters));
  }
}

function getActivityMultiplier(activityLevel) {
  const multipliers = {
    "Low": 1.00,
    "Moderate": 1.10,
    "High": 1.20,
    "EVA Day": 1.35
  };
  return multipliers[activityLevel] || 1.0;
}

function getGoalAdjustment(goal) {
  const adjustments = {
    "Maintain Weight": 0,
    "Gain Muscle": 300,
    "Lose Fat": -300
  };
  return adjustments[goal] || 0;
}

function calculateMacronutrients(calories, weight, restrictions) {
  // ISS nutritional recommendations
  const carbCalories = calories * 0.52;
  const proteinCalories = calories * 0.18;
  const fatCalories = calories * 0.30;
  
  let protein = proteinCalories / 4;
  const carbs = carbCalories / 4;
  const fat = fatCalories / 9;
  
  // Minimum protein: 1.6 g × body weight (kg)
  const minProtein = 1.6 * weight;
  if (protein < minProtein) {
    protein = minProtein;
  }
  
  // Adjust for restrictions
  if (restrictions.includes("High Protein")) {
    // Increase protein to 25% of calories
    return {
      protein: Math.round((calories * 0.25 / 4) + minProtein) / 2,
      carbs: Math.round(carbCalories / 4),
      fat: Math.round(fatCalories / 9)
    };
  }
  
  return {
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat)
  };
}

function calculateWaterRequirement(weight, activityLevel) {
  // Base: 35 mL × body weight (kg)
  let waterMl = weight * 35;
  
  // Space Environment Bonus: +500 mL
  waterMl += 500;
  
  // EVA Day Bonus: +1000 mL
  if (activityLevel === "EVA Day") {
    waterMl += 1000;
  }
  
  // Minimum: 2.5 liters/day
  waterMl = Math.max(2500, waterMl);
  
  return waterMl / 1000; // Convert to liters
}

function calculateMicronutrients(gender, calories) {
  const fiberPerKcal = 14 / 1000;
  
  return {
    vitaminD: MICRONUTRIENT_TARGETS.vitaminD,
    vitaminC: MICRONUTRIENT_TARGETS.vitaminC,
    calcium: MICRONUTRIENT_TARGETS.calcium,
    magnesium: MICRONUTRIENT_TARGETS.magnesium[gender.toLowerCase()] || 420,
    potassium: MICRONUTRIENT_TARGETS.potassium,
    sodium: MICRONUTRIENT_TARGETS.sodium,
    iron: MICRONUTRIENT_TARGETS.iron[gender.toLowerCase()] || 11,
    fiber: Math.round(calories * fiberPerKcal)
  };
}

function generateHealthWarnings(profile, calories, protein, waterLiters) {
  const warnings = [];
  const baseCalories = calculateEER(profile) * getActivityMultiplier(profile.activityLevel);
  
  if (calories < baseCalories * 0.85) {
    warnings.push({
      type: "critical",
      message: "Nutritional intake below mission requirements. Long-term performance and physiological adaptation may be affected."
    });
  }
  
  if (protein < profile.weight * 1.6 * 0.9) {
    warnings.push({
      type: "warning",
      message: "Protein intake below recommended minimum. Muscle recovery may be compromised during extended missions."
    });
  }
  
  if (waterLiters < 2.0) {
    warnings.push({
      type: "warning",
      message: "Water intake below recommended minimum. Ensure adequate hydration for mission performance."
    });
  }
  
  if (profile.restrictions.includes("Low Sodium") && calories > 2500) {
    warnings.push({
      type: "info",
      message: "Low sodium restriction detected. Carefully monitor meal selections to maintain sodium limits."
    });
  }
  
  return warnings;
}

function displayResults(profile, results) {
  const resultsSection = document.getElementById("results-section");
  
  // Show results section
  resultsSection.hidden = false;
  resultsSection.scrollIntoView({ behavior: "smooth" });
  
  // Display astronaut summary
  displayAstronautSummary(profile);
  
  // Display main requirements
  document.getElementById("daily-calories").textContent = results.dailyCalories.toLocaleString();
  document.getElementById("daily-protein").textContent = results.macros.protein;
  document.getElementById("daily-carbs").textContent = results.macros.carbs;
  document.getElementById("daily-fat").textContent = results.macros.fat;
  document.getElementById("daily-water").textContent = results.waterIntake.toFixed(1);
  document.getElementById("daily-fiber").textContent = results.micronutrients.fiber;
  
  // Display calculation notes
  const eer = calculateEER(profile);
  const multiplier = getActivityMultiplier(profile.activityLevel);
  document.getElementById("calories-note").innerHTML = `
    <small>EER: ${Math.round(eer)} kcal × ${multiplier} (${profile.activityLevel}) + ${getGoalAdjustment(profile.goal)} kcal (${profile.goal})</small>
  `;
  
  document.getElementById("protein-mini").textContent = `${(results.macros.protein / results.dailyCalories * 100).toFixed(1)}% of calories`;
  document.getElementById("carbs-mini").textContent = `${(results.macros.carbs / results.dailyCalories * 100).toFixed(1)}% of calories`;
  document.getElementById("fat-mini").textContent = `${(results.macros.fat / results.dailyCalories * 100).toFixed(1)}% of calories`;
  
  document.getElementById("water-note").innerHTML = `
    <small>${(profile.weight * 35 / 1000).toFixed(1)}L base + 0.5L space + ${profile.activityLevel === 'EVA Day' ? '1.0L EVA' : '0L'}</small>
  `;
  
  // Display macronutrient visual
  displayMacroVisual(results.macros, results.dailyCalories);
  
  // Display micronutrients
  displayMicronutrients(results.micronutrients);
  
  // Display warnings
  displayWarnings(results.warnings);
  
  // Setup buttons
  document.getElementById("save-results-btn").addEventListener("click", () => {
    saveResults(profile, results);
    alert("Nutrition requirements saved to profile!");
  });
  
  document.getElementById("download-results-btn").addEventListener("click", () => {
    downloadReport(profile, results);
  });
}

function displayAstronautSummary(profile) {
  const summary = document.getElementById("astronaut-summary");
  summary.innerHTML = `
    <div class="summary-grid">
      <div class="summary-item">
        <span>Name</span>
        <strong>${profile.fullName}</strong>
      </div>
      <div class="summary-item">
        <span>Gender</span>
        <strong>${profile.gender}</strong>
      </div>
      <div class="summary-item">
        <span>Age</span>
        <strong>${profile.age} years</strong>
      </div>
      <div class="summary-item">
        <span>Height × Weight</span>
        <strong>${profile.height} cm × ${profile.weight} kg</strong>
      </div>
      <div class="summary-item">
        <span>Activity Level</span>
        <strong>${profile.activityLevel}</strong>
      </div>
      <div class="summary-item">
        <span>Mission Type</span>
        <strong>${profile.missionType}</strong>
      </div>
      <div class="summary-item">
        <span>Goal</span>
        <strong>${profile.goal}</strong>
      </div>
    </div>
  `;
}

function displayMacroVisual(macros, totalCalories) {
  const proteinPercent = (macros.protein * 4 / totalCalories) * 100;
  const carbsPercent = (macros.carbs * 4 / totalCalories) * 100;
  const fatPercent = (macros.fat * 9 / totalCalories) * 100;
  
  document.getElementById("macro-visual").innerHTML = `
    <div class="macro-bars">
      <div class="macro-bar-item">
        <div class="bar-label">Protein</div>
        <div class="bar-container">
          <div class="bar-fill protein-bar" style="width: ${proteinPercent}%"></div>
        </div>
        <div class="bar-value">${proteinPercent.toFixed(1)}%</div>
      </div>
      <div class="macro-bar-item">
        <div class="bar-label">Carbs</div>
        <div class="bar-container">
          <div class="bar-fill carbs-bar" style="width: ${carbsPercent}%"></div>
        </div>
        <div class="bar-value">${carbsPercent.toFixed(1)}%</div>
      </div>
      <div class="macro-bar-item">
        <div class="bar-label">Fat</div>
        <div class="bar-container">
          <div class="bar-fill fat-bar" style="width: ${fatPercent}%"></div>
        </div>
        <div class="bar-value">${fatPercent.toFixed(1)}%</div>
      </div>
    </div>
  `;
}

function displayMicronutrients(micronutrients) {
  const grid = document.getElementById("micronutrient-grid");
  const items = [
    { label: "Vitamin D", value: micronutrients.vitaminD, unit: "IU" },
    { label: "Vitamin C", value: micronutrients.vitaminC, unit: "mg" },
    { label: "Calcium", value: micronutrients.calcium, unit: "mg" },
    { label: "Magnesium", value: micronutrients.magnesium, unit: "mg" },
    { label: "Potassium", value: micronutrients.potassium, unit: "mg" },
    { label: "Sodium (max)", value: micronutrients.sodium, unit: "mg" },
    { label: "Iron", value: micronutrients.iron, unit: "mg" },
    { label: "Fiber", value: micronutrients.fiber, unit: "g" }
  ];
  
  grid.innerHTML = items.map(item => `
    <div class="micronutrient-item">
      <span class="micro-label">${item.label}</span>
      <strong class="micro-value">${item.value} ${item.unit}</strong>
    </div>
  `).join("");
}

function displayWarnings(warnings) {
  const container = document.getElementById("warnings-container");
  
  if (warnings.length === 0) {
    container.innerHTML = '<div class="alert alert-success">✓ All nutritional targets are within optimal ranges.</div>';
    return;
  }
  
  container.innerHTML = warnings.map(warning => `
    <div class="alert alert-${warning.type}">
      ${warning.message}
    </div>
  `).join("");
}

function saveResults(profile, results) {
  const saved = {
    profile,
    results,
    savedAt: new Date().toISOString()
  };
  localStorage.setItem(NUTRITION_STORAGE_KEY, JSON.stringify(saved));
}

function downloadReport(profile, results) {
  const report = `
ASTRONAUT NUTRITION REQUIREMENTS REPORT
TribalStar Mycelium Symbiosis System
${'='.repeat(60)}

ASTRONAUT PROFILE
${'-'.repeat(60)}
Name: ${profile.fullName}
Gender: ${profile.gender}
Age: ${profile.age} years
Height: ${profile.height} cm
Weight: ${profile.weight} kg
Activity Level: ${profile.activityLevel}
Mission Type: ${profile.missionType}
Goal: ${profile.goal}

HEALTH RESTRICTIONS: ${profile.restrictions.length > 0 ? profile.restrictions.join(", ") : "None"}
ALLERGIES: ${profile.allergies || "None specified"}


DAILY NUTRITIONAL REQUIREMENTS
${'-'.repeat(60)}
Calories: ${results.dailyCalories} kcal/day

MACRONUTRIENTS:
  Protein: ${results.macros.protein}g (18% of calories)
  Carbohydrates: ${results.macros.carbs}g (52% of calories)
  Fat: ${results.macros.fat}g (30% of calories)

HYDRATION:
  Water Intake: ${results.waterIntake.toFixed(1)} liters/day

FIBER:
  Daily Fiber: ${results.micronutrients.fiber}g


MICRONUTRIENT TARGETS
${'-'.repeat(60)}
Vitamin D: ${results.micronutrients.vitaminD} IU
Vitamin C: ${results.micronutrients.vitaminC} mg
Calcium: ${results.micronutrients.calcium} mg
Magnesium: ${results.micronutrients.magnesium} mg
Potassium: ${results.micronutrients.potassium} mg
Sodium (max): ${results.micronutrient.sodium} mg
Iron: ${results.micronutrients.iron} mg


HEALTH ALERTS
${'-'.repeat(60)}
${results.warnings.length > 0 ? results.warnings.map(w => `[${w.type.toUpperCase()}] ${w.message}`).join("\n") : "All parameters within optimal ranges."}


Generated: ${new Date().toLocaleString()}
System: TribalStar Mycelium Symbiosis v1.0
  `;
  
  const blob = new Blob([report], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Nutrition-Report-${profile.fullName.replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
