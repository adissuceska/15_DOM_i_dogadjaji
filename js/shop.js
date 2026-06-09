// shop.js
// Zadatak 1: Dinamičko kreiranje stranice shop.html
// Niz proizvoda sa proizvoljnim vrednostima (naziv, cena, kategorija, boje, veličine).
// HTML kartice kreirane isključivo kroz DOM metode (createElement, appendChild, innerText/textContent).
const products = [
  {
    id: 1,
    name: "City Break in Paris",
    price: 120,
    category: "City Breaks",
    colors: ["Relax", "Adventure", "Family"],
    sizes: ["Small group (1-5)", "Medium group (6-15)", "Large group (16-30)"],
  },
  {
    id: 2,
    name: "Rome Historical Tour",
    price: 130,
    category: "Historical Tours",
    colors: ["Relax", "Adventure", "Luxury"],
    sizes: ["Small group (1-5)", "Medium group (6-15)"],
  },
  {
    id: 3,
    name: "Venice Gondola Ride",
    price: 140,
    category: "Special Experiences",
    colors: ["Romantic", "Family", "Luxury"],
    sizes: ["Small group (1-5)"],
  },
];

// Zadatak 3: Counter korpe u header‑u
// Vrednost korpe drži se u promenljivoj cartCount.
const savedCartCount = localStorage.getItem("cartCount");
let cartCount = savedCartCount !== null ? parseInt(savedCartCount, 10) : 0;

// Referenciranje DOM elemenata
// - productsContainer je kontejner u shop.html za dinamičke kartice.
// - cartCounterEl je element u header‑u koji prikazuje broj stavki u korpi.
const productsContainer = document.getElementById("products-container"); // shop.html
const cartCounterEl = document.getElementById("cart-count"); // shop.html

// Zadatak 1: Renderovanje kartica proizvoda kroz DOM
// Funkcija renderProducts:
//   - prvo čisti prethodni sadržaj kontejnera (sprečava duplikaciju).
//   - prolazi kroz niz products i za svaki proizvod dinamički:
//       - kreira div.product-card
//       - dodaje naziv, cenu, select‑ove za boje i veličine i dugme "Add to Cart"
//   - Sve se radi isključivo kroz createElement, appendChild, textContent.
function renderProducts() {
  productsContainer.innerHTML = ""; // čišćenje → sprečava duplikate (Zadatak 1)

  products.forEach((product) => {
    // Kreiranje kartice (DOM createElement, className) → Zadatak 1
    const card = document.createElement("div");
    card.className = "product-card";

    // Naziv proizvoda (createElement + textContent) → Zadatak 1
    const nameEl = document.createElement("h3");
    nameEl.textContent = product.name;

    // Cena proizvoda → Zadatak 1
    const priceEl = document.createElement("p");
    priceEl.textContent = `Price: $${product.price}`;

    // Zadatak 2: Dinamički prikaz boja (varijante)
    const colorLabel = document.createElement("label");
    colorLabel.textContent = "Experience type: ";
    const colorSelect = document.createElement("select");
    colorSelect.id = `color-${product.id}`; // jedinstven id po proizvodu
    colorSelect.name = "color";

    // Dodavanje opcija boja iz niza colors → Zadatak 2 (dinamički, nema statičnih)
    product.colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      colorSelect.appendChild(option);
    });

    // Zadatak 2: Dinamički prikaz veličina (varijante)
    const sizeLabel = document.createElement("label");
    sizeLabel.textContent = "Group size: ";
    const sizeSelect = document.createElement("select");
    sizeSelect.id = `size-${product.id}`; // jedinstven id po proizvodu
    sizeSelect.name = "size";

    // Dodavanje opcija veličina iz niza sizes → Zadatak 2
    product.sizes.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeSelect.appendChild(option);
    });

    // Zadatak 1: Dugme "Add to Cart" (createElement i textContent)
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.setAttribute("data-id", product.id); // ID za identifikaciju proizvoda

    // Dodavanje elemenata u karticu (DOM appendChild) → Zadatak 1
    card.appendChild(nameEl);
    card.appendChild(priceEl);
    card.appendChild(colorLabel);
    card.appendChild(colorSelect);
    card.appendChild(sizeLabel);
    card.appendChild(sizeSelect);
    card.appendChild(addButton);

    // Dodavanje gotove kartice u kontejner (DOM appendChild) → Zadatak 1
    productsContainer.appendChild(card);
  });
}

// Zadatak 3: Ažuriranje brojača korpe (DOM textContent izmena)
function updateCartCounter() {
  cartCounterEl.textContent = cartCount; // dinamički prikaz u header‑u
}

// Zadatak 3: Click → Add to Cart
// Event listener na document hvata klik na "Add to Cart" → Zadatak 3
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.textContent === "Add to Cart") {
    // 1. Uvećavanje brojača
    cartCount += 1;
    // 2. Čuvanje u localStorage → perzistencija korpe (nema vraćanja na 0)
    localStorage.setItem("cartCount", cartCount);
    // 3. Ažuriranje prikaza u header‑u → DOM update
    updateCartCounter();
    console.log(`Added to cart. Total items: ${cartCount}`);
  }
});

// Pokretanje aplikacije → DOMContentLoaded
//   - renderuje kartice (renderProducts)
//   - učitava i prikazuje brojač iz localStorage (updateCartCounter)
// → Zadovoljava: modularan, čitljiv kod, bez mrtvog koda
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();      // Zadatak 1: dinamičko listanja kartica
  updateCartCounter();   // Zadatak 3: prikaz brojača iz localStorage (nema 0)
});