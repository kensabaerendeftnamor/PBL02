// === INVENTORY MANAGEMENT ===
let inventory = [
  { name: "Tomat", qty: 50 },
  { name: "Keju", qty: 20 }
];

const inventoryTable = document.getElementById("inventoryTable");
const ingredientName = document.getElementById("ingredientName");
const ingredientQty = document.getElementById("ingredientQty");
const addIngredientBtn = document.getElementById("addIngredient");

function renderInventory() {
  inventoryTable.innerHTML = "";
  inventory.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td><input type="number" value="${item.qty}" data-index="${index}" class="qtyInput" /></td>
      <td><button onclick="deleteIngredient(${index})">Hapus</button></td>
    `;
    inventoryTable.appendChild(row);
  });

  document.querySelectorAll(".qtyInput").forEach(input => {
    input.addEventListener("change", (e) => {
      const idx = e.target.getAttribute("data-index");
      inventory[idx].qty = parseInt(e.target.value) || 0;
      renderInventory();
    });
  });
}

function addIngredient() {
  const name = ingredientName.value.trim();
  const qty = parseInt(ingredientQty.value);
  if (name && !isNaN(qty)) {
    inventory.push({ name, qty });
    ingredientName.value = "";
    ingredientQty.value = "";
    renderInventory();
  } else {
    alert("Masukkan nama bahan dan jumlah yang valid!");
  }
}

function deleteIngredient(index) {
  inventory.splice(index, 1);
  renderInventory();
}

addIngredientBtn.addEventListener("click", addIngredient);
renderInventory();

// === RECIPE MODAL ===
const recipes = {
  nasi: { title: "Nasi Goreng", detail: "Bahan: Beras, Telur, Kecap, Bumbu..." },
  spaghetti: { title: "Spaghetti Bolognese", detail: "Bahan: Spaghetti, Daging, Tomat..." },
  salad: { title: "Salad Sayur", detail: "Bahan: Selada, Tomat, Mentimun..." }
};

const pills = document.querySelectorAll(".pill");
const modal = document.getElementById("recipeModal");
const modalTitle = document.getElementById("recipeTitle");
const modalDetail = document.getElementById("recipeDetail");
const closeModal = document.querySelector(".close");

pills.forEach(pill => {
  pill.addEventListener("click", () => {
    const recipe = recipes[pill.dataset.recipe];
    modalTitle.textContent = recipe.title;
    modalDetail.textContent = recipe.detail;
    modal.style.display = "block";
  });
});

closeModal.onclick = () => (modal.style.display = "none");
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// === DAILY MENU INPUT ===
let dailyMenus = [];

const menuName = document.getElementById("menuName");
const menuOrders = document.getElementById("menuOrders");
const addMenuBtn = document.getElementById("addMenu");
const menuTable = document.getElementById("menuTable");

function renderMenu() {
  menuTable.innerHTML = "";
  dailyMenus.forEach((menu, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${menu.name}</td>
      <td><input type="number" value="${menu.orders}" data-index="${index}" class="menuQtyInput" /></td>
      <td><button onclick="deleteMenu(${index})">Hapus</button></td>
    `;
    menuTable.appendChild(row);
  });

  document.querySelectorAll(".menuQtyInput").forEach(input => {
    input.addEventListener("change", (e) => {
      const idx = e.target.getAttribute("data-index");
      dailyMenus[idx].orders = parseInt(e.target.value) || 0;
      renderMenu();
    });
  });
}

function addMenu() {
  const name = menuName.value.trim();
  const orders = parseInt(menuOrders.value);
  if (name && !isNaN(orders)) {
    dailyMenus.push({ name, orders });
    menuName.value = "";
    menuOrders.value = "";
    renderMenu();
  } else {
    alert("Masukkan nama menu dan jumlah pesanan yang valid!");
  }
}

function deleteMenu(index) {
  dailyMenus.splice(index, 1);
  renderMenu();
}

addMenuBtn.addEventListener("click", addMenu);
renderMenu();

// === PURCHASE RECOMMENDATION ===
const recipeIngredients = {
  "Nasi Goreng": { "Beras": 1, "Telur": 2, "Kecap": 1 },
  "Spaghetti Bolognese": { "Spaghetti": 1, "Daging": 1, "Tomat": 2 },
  "Salad Sayur": { "Selada": 2, "Tomat": 1, "Mentimun": 1 }
};

const calcBtn = document.getElementById("calcRecommendation");
const purchaseTable = document.getElementById("purchaseTable");

function calculateRecommendation() {
  let totalNeeds = {};
  dailyMenus.forEach(menu => {
    const ingredients = recipeIngredients[menu.name];
    if (ingredients) {
      for (let [ingredient, qty] of Object.entries(ingredients)) {
        if (!totalNeeds[ingredient]) totalNeeds[ingredient] = 0;
        totalNeeds[ingredient] += qty * menu.orders;
      }
    }
  });
  renderPurchaseTable(totalNeeds);
}

function renderPurchaseTable(needs) {
  purchaseTable.innerHTML = "";
  for (let [ingredient, total] of Object.entries(needs)) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${ingredient}</td><td>${total}</td>`;
    purchaseTable.appendChild(row);
  }
}

calcBtn.addEventListener("click", calculateRecommendation);

// === DONATION FORM ===
const sendDonationBtn = document.getElementById("sendDonation");
const donationTable = document.getElementById("donationTable").querySelector("tbody");

sendDonationBtn.addEventListener("click", () => {
  const target = document.getElementById("donationTarget").value;
  const item = document.getElementById("donationItem").
