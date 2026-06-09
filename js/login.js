// login.js
// Zadatak 4: Login validacija sa dinamičkim porukama i real‑time input ili change listenerima
// - Sve poruke se ispisuju u <p id="login-status"> (bez alert‑ova).
// - Koristi se preventDefault() na submit‑u.
// - Obavezno prisutni event‑ovi: click (implicitno submit), change ili input, i submit na formi.

// DOM elementi za login
// - loginForm: sam submit form
// - emailInput: input za email
// - passwordInput: input za password
// - statusEl: <p id="login-status"> za poruke korisniku
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const statusEl = document.getElementById("login-status");

// Persistencija korpe (localStorage) – deli isti cartCount kao shop.js i product.js
// Zadatak 3: Brojač korpe u header‑u (perzistencija iz localStorage)
function updateCartBadge() {
  const cartBadge = document.getElementById("cart-count");
  if (cartBadge) {
    const cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    cartBadge.textContent = cartCount; // DOM textContent izmena
  }
}

// Zadatak 4: Validacija i ispis poruka u <p id="login-status">
// Funkcija prima email i password i:
//   - vraća true/false, i
//   - dynamički postavlja tekst i boju statusEl‑a
function validateAndShowMessage(email, password) {
  if (!email && !password) {
    // Oba prazna → poruka 
    statusEl.textContent = "Please, enter email and password";
    statusEl.style.color = "var(--color-danger)";
    return false;
  }
  if (!email) {
    // Samo email prazan
    statusEl.textContent = "Please, enter email";
    statusEl.style.color = "var(--color-danger)";
    return false;
  }
  if (password.length < 6) {
    // Password kraći od 6 → poruka o dužini
    statusEl.textContent = "Password must contain at least 6 characters";
    statusEl.style.color = "var(--color-danger)";
    return false;
  }
  // Sve OK → uspešna poruka
  statusEl.textContent = "Login successful. Welcome!";
  statusEl.style.color = "var(--color-success)";
  return true;
}

// Input listeneri (real‑time validacija tokom kucanja)
// - Zadatak 4: Korišćenje input ili change‑event‑a i dinamički prikaz poruka u <p>.
if (emailInput) {
  // Input listener na email (čita vrednost i poziva validaciju)
  emailInput.addEventListener("input", () => { // Input ili change listener
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    validateAndShowMessage(email, password);
  });
}

if (passwordInput) {
  // Input listener na password (real‑time, bez submita)
  passwordInput.addEventListener("input", () => { // Input ili change listener
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    validateAndShowMessage(email, password);
  });
}

// Submit listener sa preventDefault()
// - Zadatak 4: Na klik na "Login" (submit) – sprečava reload i ažurira poruku u DOM‑u.
// - Kriterijum: PreventDefault() i validacija unutar <p id="login-status">.
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // sprečavamo standardno slanje forme
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    validateAndShowMessage(email, password);
  });
}

// Inicijalizacija (DOMContentLoaded)
// - Zadatak 3: Brojač korpe se učitava iz localStorage (perzistencija)
// - Zadatak 4: Forma i input‑i su već na mjestu, pa listeners mogu raditi.
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge(); // korpa se učitava i prikazuje na login stranici
});