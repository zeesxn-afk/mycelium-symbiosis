"use strict";

const STORAGE_KEYS = {
  profile: "tribalstar.profile.v1",
  hydration: "tribalstar.hydration.v1",
  mode: "tribalstar.mode.v1"
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_TYPES = ["Breakfast", "Mid-morning snack", "Lunch", "Evening snack", "Dinner"];
const DAY_MEAL_NAMES = {
  Monday: ["Three Sisters Porridge (Corn, Beans & Squash)", "Strawberries & Almonds", "Rice-Fish-Azolla Bowl", "Roasted Sweet Potato", "Tilapia with Quinoa & Greens"],
  Tuesday: ["Amaranth Porridge with Strawberries", "Soy Yogurt with Berries", "Chickpea & Spinach Curry", "Berry Smoothie", "Milpa Bowl (Corn, Beans & Squash)"],
  Wednesday: ["Sweet Potato & Soy Pancakes", "Nuts & Dried Fruit", "Bean & Corn Bowl", "Baked Squash Chips", "Rice with Fish & Vegetables"],
  Thursday: ["Quinoa Porridge with Tomatoes", "Soy Yogurt with Tomatoes", "Lentil Rice with Greens", "Sweet Potato Chips", "Sweet Potato Lentil Stew"],
  Friday: ["Millet Porridge with Berries", "Pumpkin Seeds & Strawberries", "Tilapia with Sweet Potato", "Soy Yogurt", "Quinoa Bean Bowl"],
  Saturday: ["Cornmeal & Bean Cakes", "Mixed Nuts", "Three Sisters Stew", "Strawberry Smoothie", "Fish with Vegetable Stir Fry"],
  Sunday: ["Rice Cereal with Soy Milk", "Soy Yogurt with Berries", "Rice & Tofu Stir Fry", "Roasted Corn", "Three Sisters Feast"]
};

const MEAL_PLAN_VALUES = {
  standard: {
    title: "Standard Meal Plan",
    label: "Standard",
    totals: {
      Monday: [2914, 126, 384, 83],
      Tuesday: [2948, 128, 389, 84],
      Wednesday: [2986, 130, 396, 86],
      Thursday: [2927, 127, 386, 84],
      Friday: [2994, 132, 399, 88],
      Saturday: [2961, 129, 392, 86],
      Sunday: [2933, 127, 387, 84]
    },
    values: {
      Monday: [[513, 22, 74, 12], [276, 8, 25, 15], [839, 44, 104, 24], [247, 3, 49, 2], [1039, 49, 132, 30]],
      Tuesday: [[492, 20, 69, 11], [295, 10, 27, 14], [807, 39, 109, 20], [256, 5, 47, 3], [1098, 54, 137, 36]],
      Wednesday: [[510, 21, 72, 12], [290, 9, 24, 16], [840, 42, 115, 22], [240, 4, 45, 2], [1106, 54, 140, 34]],
      Thursday: [[530, 23, 75, 12], [270, 10, 22, 13], [830, 41, 108, 21], [250, 3, 50, 2], [1047, 50, 131, 36]],
      Friday: [[507, 20, 71, 11], [284, 9, 25, 15], [872, 47, 106, 24], [264, 8, 30, 6], [1067, 48, 167, 32]],
      Saturday: [[514, 22, 71, 13], [297, 10, 24, 16], [831, 42, 111, 22], [247, 5, 44, 3], [1072, 50, 142, 32]],
      Sunday: [[499, 20, 70, 11], [289, 10, 26, 14], [819, 40, 110, 20], [239, 5, 48, 2], [1087, 52, 133, 37]]
    }
  },
  low: {
    title: "Low Activity Day",
    label: "Low Activity",
    totals: {
      Monday: [2518, 112, 328, 71],
      Tuesday: [2576, 115, 336, 73],
      Wednesday: [2641, 118, 345, 75],
      Thursday: [2534, 113, 331, 72],
      Friday: [2637, 120, 352, 77],
      Saturday: [2612, 117, 341, 74],
      Sunday: [2558, 114, 334, 73]
    },
    values: {
      Monday: [[444, 19, 64, 10], [239, 7, 21, 13], [726, 38, 90, 21], [214, 3, 43, 2], [895, 45, 110, 25]],
      Tuesday: [[430, 17, 60, 10], [258, 9, 24, 12], [705, 34, 95, 17], [224, 4, 41, 2], [959, 51, 116, 32]],
      Wednesday: [[451, 19, 64, 11], [257, 8, 21, 14], [742, 37, 102, 19], [212, 4, 40, 2], [979, 50, 118, 29]],
      Thursday: [[458, 20, 65, 10], [233, 9, 19, 11], [714, 35, 93, 18], [215, 3, 43, 2], [914, 46, 111, 31]],
      Friday: [[455, 18, 64, 10], [255, 8, 23, 14], [782, 42, 96, 22], [236, 7, 27, 5], [959, 45, 142, 26]],
      Saturday: [[453, 19, 63, 11], [261, 9, 21, 14], [731, 37, 97, 19], [218, 4, 39, 3], [949, 48, 121, 27]],
      Sunday: [[435, 17, 61, 10], [252, 9, 23, 12], [714, 35, 96, 17], [209, 4, 42, 2], [948, 49, 112, 32]]
    }
  },
  high: {
    title: "High Activity Day",
    label: "High Activity",
    totals: {
      Monday: [3213, 148, 438, 97],
      Tuesday: [3247, 151, 443, 98],
      Wednesday: [3289, 154, 451, 100],
      Thursday: [3231, 150, 441, 98],
      Friday: [3296, 156, 454, 101],
      Saturday: [3264, 153, 448, 99],
      Sunday: [3225, 149, 440, 97]
    },
    values: {
      Monday: [[566, 25, 81, 13], [305, 9, 27, 16], [924, 49, 114, 26], [272, 4, 54, 2], [1146, 61, 162, 40]],
      Tuesday: [[542, 23, 76, 12], [325, 11, 30, 15], [889, 43, 120, 22], [282, 6, 52, 3], [1209, 68, 165, 46]],
      Wednesday: [[561, 23, 79, 13], [319, 10, 26, 18], [924, 46, 127, 24], [264, 4, 50, 2], [1221, 71, 169, 43]],
      Thursday: [[585, 25, 83, 13], [298, 11, 24, 14], [916, 45, 119, 23], [276, 4, 55, 2], [1156, 65, 160, 46]],
      Friday: [[558, 22, 78, 12], [313, 10, 28, 17], [960, 51, 117, 27], [290, 9, 33, 7], [1175, 64, 198, 38]],
      Saturday: [[566, 24, 78, 14], [327, 11, 26, 18], [915, 46, 122, 24], [272, 5, 49, 3], [1184, 67, 173, 40]],
      Sunday: [[549, 22, 77, 12], [318, 11, 29, 15], [901, 44, 121, 22], [263, 5, 53, 2], [1194, 67, 160, 46]]
    }
  },
  eva: {
    title: "Extravehicular Activity (EVA)",
    label: "EVA",
    totals: {
      Monday: [3412, 158, 466, 103],
      Tuesday: [3448, 161, 472, 104],
      Wednesday: [3489, 164, 478, 106],
      Thursday: [3431, 160, 469, 104],
      Friday: [3496, 166, 481, 107],
      Saturday: [3464, 163, 476, 105],
      Sunday: [3425, 159, 468, 103]
    },
    values: {
      Monday: [[601, 27, 86, 14], [323, 9, 29, 17], [981, 52, 121, 28], [289, 4, 58, 2], [1218, 66, 172, 42]],
      Tuesday: [[575, 24, 81, 13], [345, 12, 32, 16], [944, 46, 128, 23], [299, 6, 55, 3], [1285, 73, 176, 49]],
      Wednesday: [[595, 24, 84, 14], [339, 11, 28, 19], [980, 49, 135, 25], [280, 5, 45, 2], [1295, 75, 178, 46]],
      Thursday: [[621, 27, 88, 14], [317, 12, 26, 15], [973, 48, 126, 24], [293, 4, 59, 2], [1227, 69, 170, 49]],
      Friday: [[592, 24, 83, 13], [332, 11, 30, 18], [1018, 54, 124, 29], [308, 10, 35, 7], [1246, 67, 209, 40]],
      Saturday: [[601, 25, 83, 15], [347, 12, 28, 19], [971, 49, 129, 25], [289, 6, 52, 3], [1256, 71, 184, 43]],
      Sunday: [[583, 23, 82, 13], [338, 12, 31, 16], [957, 47, 128, 23], [279, 6, 56, 2], [1268, 71, 171, 49]]
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "profile") {
    initProfilePage();
  }

  if (page === "dashboard") {
    initDashboardPage();
  }
});

function initProfilePage() {
  const form = document.getElementById("profile-form");
  const savedNote = document.getElementById("saved-profile-note");
  const continueLink = document.getElementById("continue-link");
  const profile = getProfile();

  if (profile) {
    fillProfileForm(form, profile);
    savedNote.hidden = false;
    continueLink.classList.remove("secondary");
    continueLink.classList.add("primary");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const nextProfile = {
      fullName: clean(formData.get("fullName")),
      gender: clean(formData.get("gender")),
      country: clean(formData.get("country")),
      age: toNumber(formData.get("age")),
      weight: toNumber(formData.get("weight")),
      height: toNumber(formData.get("height")),
      missionRole: clean(formData.get("missionRole")),
      crewId: clean(formData.get("crewId")) || "Unassigned",
      habitat: clean(formData.get("habitat")) || "Lunar habitat",
      shiftCycle: clean(formData.get("shiftCycle")) || "Alpha",
      savedAt: new Date().toISOString()
    };

    saveJson(STORAGE_KEYS.profile, nextProfile);
    window.location.href = "food.html";
  });
}

function initDashboardPage() {
  const profile = getProfile();

  if (!profile) {
    window.location.href = "index.html";
    return;
  }

  renderProfile(profile);
  initModeSelector(profile);
  initHydration(profile);
  renderGenderSlot(profile);
}

function initModeSelector(profile) {
  const radios = Array.from(document.querySelectorAll("input[name='mealMode']"));
  const storedMode = localStorage.getItem(STORAGE_KEYS.mode);
  const initialMode = MEAL_PLAN_VALUES[storedMode] ? storedMode : "standard";

  radios.forEach((radio) => {
    radio.checked = radio.value === initialMode;
    radio.addEventListener("change", () => {
      if (radio.checked) {
        localStorage.setItem(STORAGE_KEYS.mode, radio.value);
        renderMealSchedule(radio.value);
        updateHydrationDisplay(profile);
      }
    });
  });

  renderMealSchedule(initialMode);
}

function renderProfile(profile) {
  const target = document.getElementById("profile-summary");
  const facts = [
    ["Name", profile.fullName],
    ["Role", profile.missionRole],
    ["Country", profile.country],
    ["Crew ID", profile.crewId],
    ["Gender", profile.gender],
    ["Age", `${profile.age}`],
    ["Mass", `${profile.weight} kg`],
    ["Height", `${profile.height} cm`],
    ["Habitat", profile.habitat],
    ["Shift", profile.shiftCycle]
  ];

  target.innerHTML = "";
  facts.forEach(([label, value]) => {
    const fact = document.createElement("div");
    fact.className = "profile-fact";
    const labelEl = document.createElement("span");
    const valueEl = document.createElement("strong");
    labelEl.textContent = label;
    valueEl.textContent = value;
    fact.append(labelEl, valueEl);
    target.appendChild(fact);
  });
}

function renderMealSchedule(modeKey) {
  const plan = MEAL_PLAN_VALUES[modeKey] || MEAL_PLAN_VALUES.standard;
  const grid = document.getElementById("weekly-grid");
  const title = document.getElementById("active-plan-title");

  title.textContent = plan.title;
  grid.innerHTML = "";

  DAYS.forEach((day) => {
    const column = document.createElement("article");
    column.className = "day-column";
    column.setAttribute("aria-label", `${day} ${plan.label} meals`);

    const [totalCalories, totalProtein, totalCarbs, totalFat] = plan.totals[day];
    const heading = document.createElement("div");
    heading.className = "day-heading";
    heading.innerHTML = `<h3>${day}</h3><span class="total-pill">${totalCalories} kcal</span>`;

    const totalRow = document.createElement("div");
    totalRow.className = "total-row";
    totalRow.innerHTML = `<span>${totalProtein}g protein</span><span>${totalCarbs}g carbs</span><span>${totalFat}g fat</span>`;

    column.append(heading, totalRow);

    plan.values[day].forEach((values, mealIndex) => {
      const [calories, protein, carbs, fat] = values;
      const block = document.createElement("section");
      block.className = "meal-block";
      block.innerHTML = `
        <p class="meal-type">${MEAL_TYPES[mealIndex]}</p>
        <h4 class="meal-name">${DAY_MEAL_NAMES[day][mealIndex]}</h4>
        <div class="macro-grid">
          <div class="macro"><span>Calories</span><strong>${calories} kcal</strong></div>
          <div class="macro"><span>Protein</span><strong>${protein}g</strong></div>
          <div class="macro"><span>Carbs</span><strong>${carbs}g</strong></div>
          <div class="macro"><span>Fat</span><strong>${fat}g</strong></div>
        </div>
      `;
      column.appendChild(block);
    });

    grid.appendChild(column);
  });
}

function initHydration(profile) {
  const form = document.getElementById("hydration-form");
  const input = document.getElementById("water-input");
  const reset = document.getElementById("reset-water");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = toNumber(input.value);

    if (amount <= 0) {
      return;
    }

    const hydration = getHydration();
    const key = getHydrationKey(profile);
    hydration[key] = Math.max(0, (hydration[key] || 0) + amount);
    saveJson(STORAGE_KEYS.hydration, hydration);
    input.value = "";
    updateHydrationDisplay(profile);
  });

  reset.addEventListener("click", () => {
    const hydration = getHydration();
    hydration[getHydrationKey(profile)] = 0;
    saveJson(STORAGE_KEYS.hydration, hydration);
    updateHydrationDisplay(profile);
  });

  updateHydrationDisplay(profile);
}

function updateHydrationDisplay(profile) {
  const hydration = getHydration();
  const consumed = hydration[getHydrationKey(profile)] || 0;
  const target = getWaterTarget(profile);
  const remaining = Math.max(target - consumed, 0);
  const percent = Math.min(Math.round((consumed / target) * 100), 100);

  document.getElementById("hydration-consumed").textContent = `${consumed} ml consumed`;
  document.getElementById("hydration-remaining").textContent = `${remaining} ml remaining`;
  document.getElementById("hydration-target").textContent = `Daily requirement: ${target} ml`;
  document.getElementById("water-fill").style.width = `${percent}%`;

  const progress = document.getElementById("water-progress");
  progress.setAttribute("aria-valuenow", `${percent}`);
  progress.setAttribute("aria-valuetext", `${remaining} ml remaining`);
}

function renderGenderSlot(profile) {
  const slot = document.getElementById("gender-calorie-slot");
  const status = getGenderCalorieAdjustment(profile);
  slot.querySelector("strong").textContent = status.label;
}

function getGenderCalorieAdjustment() {
  return { active: false, label: "No adjustment active" };
}

function getWaterTarget(profile) {
  const weight = Number(profile.weight) || 75;
  const target = Math.max(2500, weight * 35);
  return Math.round(target / 50) * 50;
}

function getHydrationKey(profile) {
  const today = new Date().toISOString().slice(0, 10);
  const crewId = profile.crewId || "crew";
  return `${crewId}:${today}`;
}

function fillProfileForm(form, profile) {
  Object.entries(profile).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field) {
      field.value = value;
    }
  });
}

function getProfile() {
  return readJson(STORAGE_KEYS.profile);
}

function getHydration() {
  return readJson(STORAGE_KEYS.hydration) || {};
}

function clean(value) {
  return String(value || "").trim();
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function readJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
