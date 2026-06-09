// product.js
// Zadatak 1–6: Dinamičko generisanje product.html
// - Sve podatke o proizvodu čuva se u JS objektu, ne u HTML‑u.
// - Hero, opis, varijante, galerija, datumi i recenzije generišu se dinamički (DOM/innerHTML + createElement).

// Zadatak 3: Korpa (counter u header‑u)
const savedCartCount = localStorage.getItem("cartCount");
let cartCount = savedCartCount !== null ? parseInt(savedCartCount, 10) : 0;

// DOM reference
const cartBadge = document.getElementById("cart-count");         // badge u header‑u
const heroSection = document.getElementById("hero");             // hero sekcija
const detailsSection = document.getElementById("details");       // detalji i booking
const reviewsSection = document.getElementById("reviews");       // recenzije

// Zadatak 3: Ažuriranje korpe (DOM izmena textContent)
function updateCartBadge() {
  if (cartBadge) {
    cartBadge.textContent = cartCount; // ažuriranje brojača u zaglavlju
  }
}

// Zadatak 1: Podaci o proizvodu – u JS, bez statičnog HTML‑a
// Svi tekstovi, cijene, varijante, galerija, datumi, recenzije su u objektu.
const product = {
  id: 1,
  name: "City Break in Paris",
  price: 120,
  colors: ["Relax", "Adventure", "Family"],
  sizes: ["Small group (1-5)", "Medium group (6-15)", "Large group (16-30)"],

  heroImg: "images/01.jpg",
  gallery: [
    { src: "images/14.jpg", alt: "Eiffel Tower" },
    { src: "images/15.jpg", alt: "Louvre" },
    { src: "images/16.jpg", alt: "Seine" }
  ],

  descriptionText:
    "Pridružite se našem certificiranom lokalnom vodiču na nezaboravnom dvodnevnom city break‑u kroz Paris! " +
    "Posetićete najpoznatije znamenitosti, uživaćete u francuskoj kuhinji i otkriti skrivene dragulje koje samo lokalci znaju.",

  included: [
    "Dvodnevni vodič kroz Paris (4 sata dnevno)",
    "Poseta Eiffelovom tornju i Notre Dame‑u",
    "Romantična šetnja Seine‑om",
    "Degustacija francuskog sira",
    "Maksimalno 6 osoba po grupi"
  ],

  itinerary: [
    { title: "Dan 1: Eiffelov toranj, Šampska polja, Luvr" },
    { title: "Dan 2: Montmartre, Sacré‑Coeur, Seine cruise" }
  ],

  dates: [
    { date: "25.04.2026.", status: "available", text: "Dostupno" },
    { date: "01.05.2026.", status: "available", text: "Dostupno" },
    { date: "08.05.2026.", status: "full", text: "Popunjeno" }
  ],

  reviews: [
    {
      text: "Najbolja tura koju sam ikada imao! Vodič Ana je bila fantastična.",
      author: "− Maria S., Portugal"
    },
    {
      text: "Profesionalno, zabavno i puno informacija. Preporučujem svima!",
      author: "− John D., UK"
    }
  ]
};

// Zadatak 1: Dinamičko generisanje hero sekcije (bez hard‑kodiranog HTML‑a)
// Hero i prikaz podataka ide preko JS objekta i DOM/innerHTML.
function renderHero() {
  if (!heroSection) return;

  // Dinamički HTML hero (DOM → nije ručno pisano u HTML‑u)
  heroSection.innerHTML = `
    <img id="hero-image" class="hero-image" alt="City Break in Paris" />
    <div class="hero-overlay">
      <h1 id="hero-title">City Break in Paris</h1>
      <p id="hero-price" class="price">
        €<span id="hero-price-amount">120</span> <span>per person</span>
      </p>
    </div>
  `;

  const heroImgEl = heroSection.querySelector("#hero-image");
  const heroTitleEl = heroSection.querySelector("#hero-title");
  const heroPriceAmount = heroSection.querySelector("#hero-price-amount");

  // Povezivanje podataka iz JS objekta sa DOM elementima (hero)
  heroImgEl.src = product.heroImg;
  heroImgEl.alt = product.name;
  heroTitleEl.textContent = product.name;
  heroPriceAmount.textContent = product.price;
}

// Zadatak 1+2: Dinamičko generisanje detalja, varijanti, cijene, datuma, galerije
// Detalji iz JS objekta (nema statičnog HTML‑a).
function renderDetails() {
  if (!detailsSection) return;

  // Detaljna markup struktura se kreira u JS (innerHTML) – ne u HTML‑u
  detailsSection.innerHTML = `
    <div class="container">
      <div class="details-grid">
        <div class="description" id="description">
          <h2>Discover the Magic of Paris</h2>
          <p id="description-text"></p>
          <h3>Šta je uključeno:</h3>
          <ul id="included-list"></ul>
          <h3>Raspored ture:</h3>
          <ul id="itinerary-list"></ul>
        </div>
        <div class="booking-info">
          <div class="experience-type">
            <label for="experience-type">Experience type:</label>
            <select id="experience-type" name="color"></select>
          </div>
          <div class="group-size">
            <label for="group-size">Group size:</label>
            <select id="group-size" name="size"></select>
          </div>
          <div class="price-card">
            <h3 id="booking-price">€120</h3>
            <p>per person</p>
            <ul id="price-card-included"></ul>
            <button id="add-to-cart-btn-booking" class="cta-button">Add to Cart</button>
          </div>
          <h4>Dostupni datumi:</h4>
          <ul id="available-dates"></ul>
          <h4>Galerija:</h4>
          <div id="gallery-images" class="gallery"></div>
        </div>
      </div>
    </div>
  `;

  // DOM‑elementi za dinamičke podatke
  const descriptionText = detailsSection.querySelector("#description-text");
  const includedList = detailsSection.querySelector("#included-list");
  const itineraryList = detailsSection.querySelector("#itinerary-list");
  const priceCardIncluded = detailsSection.querySelector("#price-card-included");
  const experienceType = detailsSection.querySelector("#experience-type");
  const groupSize = detailsSection.querySelector("#group-size");
  const bookingPrice = detailsSection.querySelector("#booking-price");
  const availableDates = detailsSection.querySelector("#available-dates");
  const galleryImages = detailsSection.querySelector("#gallery-images");
  const addCartBtn = detailsSection.querySelector("#add-to-cart-btn-booking");

  // Opis proizvoda (JS → DOM)
  descriptionText.textContent = product.descriptionText;

  // Uključeno (lista u description i price‑card) – createElement i appendChild
  product.included.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    includedList.appendChild(li);
  });

  product.included.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    priceCardIncluded.appendChild(li);
  });

  // Raspored ture (createElement + innerHTML za <strong>)
  product.itinerary.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.title}</strong>`;
    itineraryList.appendChild(li);
  });

  // Zadatak 2: Varijante – Experience type (boje) dinamički iz niza
  product.colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    experienceType.appendChild(option);
  });

  // Zadatak 2: Varijante – Group size (veličine) dinamički iz niza
  product.sizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    groupSize.appendChild(option);
  });

  // Ažuriranje cijene (DOM textContent)
  bookingPrice.textContent = product.price;

  // Datumi (CSS class dates kako bi se obrisale tackice)
  availableDates.classList.add("dates"); // rešenje problema sa tackicama

  availableDates.innerHTML = "";
  product.dates.forEach((date) => {
    const li = document.createElement("li");
    li.textContent = `${date.date} - `;
    const span = document.createElement("span");
    span.className = date.status;
    span.textContent = date.text;
    li.appendChild(span);
    availableDates.appendChild(li);
  });

  // Galerija (createElement + appendChild, nema statickog HTML‑a)
  galleryImages.innerHTML = "";
  product.gallery.forEach((img) => {
    const imgEl = document.createElement("img");
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    galleryImages.appendChild(imgEl);
  });

  // Zadatak 3: Add to Cart dugme (click, event handler)
  addCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cartCount++; // povećava brojač korpe
    localStorage.setItem("cartCount", cartCount); // perzistencija
    updateCartBadge(); // ažuriranje prikaza u header‑u
    console.log(
      `Dodano: ${product.name} (${experienceType.value}, ${groupSize.value}) - Ukupno: ${cartCount}`
    );
  });
}

// Zadatak 1: Dinamičko generisanje recenzija (nije hard‑kodirano u HTML‑u)
function renderReviews() {
  if (!reviewsSection) return;

  // Sekcija za recenzije se kreira u JS (innerHTML), ne u HTML‑u
  reviewsSection.innerHTML = `
    <h2>Šta kažu naši gosti</h2>
    <div id="reviews-grid" class="reviews-grid"></div>
  `;

  const reviewsGrid = reviewsSection.querySelector("#reviews-grid");

  // Stilizovane recenzije (blockquote + p + cite, kreirano dinamički)
  product.reviews.forEach((review) => {
    const blockquote = document.createElement("blockquote");
    const p = document.createElement("p");
    p.textContent = `"${review.text}"`;
    const cite = document.createElement("cite");
    cite.textContent = review.author;
    blockquote.appendChild(p);
    blockquote.appendChild(cite);
    reviewsGrid.appendChild(blockquote);
  });
}

// DOMContentLoaded – pokretanje (modularan)
document.addEventListener("DOMContentLoaded", () => {
  renderHero();       // hero 
  renderDetails();    // detalji + varijante + datumi + galerija + Add to Cart
  renderReviews();    // recenzije
  updateCartBadge();  // korpa (brojač)
});