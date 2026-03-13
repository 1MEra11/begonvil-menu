const menuData = {
  food: [
    { tr: "Hot Dog", en: "Hot Dog", price: "500 TL" },
    { tr: "Tavuk Şnitzel", en: "Chicken Schnitzel", priceTr: "?", priceEn: "?" },
    { tr: "Köfte", en: "Meatball", priceTr: "?", priceEn: "?" },
    { tr: "Hamburger", en: "Hamburger", price: "550 TL" },
    { tr: "Cheeseburger", en: "Cheeseburger", price: "600 TL" },
    { tr: "Tost", en: "Toast", price: "200 TL" },
    { tr: "Karışık Tost", en: "Mixed Toast", price: "250 TL" }
  ],

  dessert: [
    { tr: "Waffle (Sade)", en: "Waffle (Plain)", price: "400 TL" },
    { tr: "Waffle (Meyveli)", en: "Waffle (With Fruit)", price: "480 TL" },
    { tr: "Waffle (Meyveli ve Dondurmalı)", en: "Waffle (With Fruit and Ice Cream)", price: "600 TL" },
    { tr: "Krep", en: "Pancake", price: "400 TL" },
    { tr: "Dondurma (1 Top)", en: "Ice Cream (1 Scoop)", price: "100 TL" },
    { tr: "Kornet", en: "Cornet", price: "120 TL" }
  ],

  hotDrinks: [
    { tr: "Cappuccino", en: "Cappuccino", price: "200 TL" },
    { tr: "Americano", en: "Americano", price: "200 TL" },
    { tr: "Latte", en: "Latte", price: "200 TL" },
    { tr: "Türk Kahvesi", en: "Turkish Coffee", price: "150 TL" },
    { tr: "Çay", en: "Tea", price: "80 TL" },
    { tr: "Bitki Çayı", en: "Herbal Tea", price: "90 TL" }
  ],

  coldDrinks: [
    { tr: "Cola", en: "Cola", price: "200 TL" },
    { tr: "Fanta", en: "Fanta", price: "200 TL" },
    { tr: "Sprite", en: "Sprite", price: "200 TL" },
    { tr: "Soda", en: "Soda", price: "100 TL" },
    { tr: "Churchill", en: "Churchill", price: "150 TL" },
    { tr: "Portakal Suyu", en: "Orange Juice", price: "300 TL" },
    { tr: "Nar Suyu", en: "Pomegranate Juice", price: "300 TL" },
    { tr: "Su", en: "Water", price: "40 TL" },
    { tr: "Atom", en: "Atom", price: "400 TL" },
    { tr: "Milkshake", en: "Milkshake", price: "400 TL" }
  ]
};

let currentLang = "tr";
let activeCategory = "food";

const trBtn = document.getElementById("trBtn");
const enBtn = document.getElementById("enBtn");
const subtitle = document.getElementById("subtitle");

const foodList = document.getElementById("foodList");
const dessertList = document.getElementById("dessertList");
const hotDrinksList = document.getElementById("hotDrinksList");
const coldDrinksList = document.getElementById("coldDrinksList");

const categoryButtons = document.querySelectorAll(".category-btn");
const panels = {
  food: document.getElementById("foodPanel"),
  dessert: document.getElementById("dessertPanel"),
  hotDrinks: document.getElementById("hotDrinksPanel"),
  coldDrinks: document.getElementById("coldDrinksPanel")
};

function getPrice(item) {
  if (currentLang === "tr" && item.priceTr) return item.priceTr;
  if (currentLang === "en" && item.priceEn) return item.priceEn;
  return item.price || "";
}

function createMenuItem(item) {
  const name = currentLang === "tr" ? item.tr : item.en;
  const price = getPrice(item);

  return `
    <div class="menu-item">
      <div class="item-info">
        <h3>${name}</h3>
      </div>
      <div class="price">${price}</div>
    </div>
  `;
}

function renderList(container, items) {
  container.innerHTML = items.map(createMenuItem).join("");
}

function updateLanguageTexts() {
  document.querySelectorAll("[data-tr]").forEach(el => {
    el.textContent = currentLang === "tr" ? el.dataset.tr : el.dataset.en;
  });

  subtitle.textContent = currentLang === "tr" ? "Kafe Menüsü" : "Cafe Menu";
  document.documentElement.lang = currentLang;
}

function updateLanguageButtons() {
  trBtn.classList.toggle("active", currentLang === "tr");
  enBtn.classList.toggle("active", currentLang === "en");
}

function updateCategoryPanels() {
  Object.keys(panels).forEach(category => {
    panels[category].classList.toggle("active", category === activeCategory);
  });

  categoryButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.category === activeCategory);
  });
}

function renderMenu() {
  renderList(foodList, menuData.food);
  renderList(dessertList, menuData.dessert);
  renderList(hotDrinksList, menuData.hotDrinks);
  renderList(coldDrinksList, menuData.coldDrinks);
}

trBtn.addEventListener("click", () => {
  currentLang = "tr";
  updateLanguageTexts();
  updateLanguageButtons();
  renderMenu();
});

enBtn.addEventListener("click", () => {
  currentLang = "en";
  updateLanguageTexts();
  updateLanguageButtons();
  renderMenu();
});

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    updateCategoryPanels();
  });
});

updateLanguageTexts();
updateLanguageButtons();
updateCategoryPanels();
renderMenu();