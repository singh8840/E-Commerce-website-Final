const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

// Popup
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup-close");

if (popup) {
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide-popup");
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide-popup");
    }, 1000);
  });
}

// Product Quantity
const addToCart = document.getElementsByClassName("addCart");
const quantityInput = document.querySelector(".form input");

if (quantityInput) {
  quantityInput.addEventListener("change", (e) => {
    if (isNaN(e.target.value) || e.target.value < 1) {
      e.target.value = 1;
    }
  });
}

// Cart Quantity
const cartQuantity = document.querySelectorAll(".cart input");

if (cartQuantity) {
  cartQuantity.forEach(input => {
    input.addEventListener("change", (e) => {
      if (isNaN(e.target.value) || e.target.value < 1) {
        e.target.value = 1;
      }
      updateCartTotal();
    });
  });
}

// Update Cart Total
function updateCartTotal() {
  const cartItems = document.querySelectorAll(".cart-info");
  let total = 0;

  cartItems.forEach(item => {
    const price = parseFloat(item.querySelector("p").innerText.replace("$", ""));
    const quantity = parseInt(item.querySelector("input").value);
    total += price * quantity;
  });

  const totalElement = document.querySelector(".total-price table td:last-child");
  if (totalElement) {
    totalElement.innerText = `$${total.toFixed(2)}`;
  }
}

// Product Image Zoom (for product details page)
const productImg = document.getElementById("zoom");
if (productImg) {
  productImg.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    e.target.style.transformOrigin = `${x}% ${y}%`;
  });
}

// Form Validation
const loginForm = document.querySelector(".login-form form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Here you would typically make an API call to handle login/signup
    console.log("Form submitted successfully");
  });
}

// Email validation helper
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Search Functionality
const searchIcon = document.querySelector(".bx-search");
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.className = "search-input";
searchInput.style.display = "none";

if (searchIcon) {
  searchIcon.parentElement.appendChild(searchInput);
  
  searchIcon.addEventListener("click", () => {
    searchInput.style.display = searchInput.style.display === "none" ? "block" : "none";
    if (searchInput.style.display === "block") {
      searchInput.focus();
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      // Here you would typically handle the search
      console.log("Searching for:", searchInput.value);
      searchInput.value = "";
      searchInput.style.display = "none";
    }
  });
}

// Wishlist Functionality
const wishlistIcons = document.querySelectorAll(".bx-heart");
wishlistIcons.forEach(icon => {
  icon.addEventListener("click", (e) => {
    const wishlistCount = icon.parentElement.querySelector("span");
    if (wishlistCount) {
      let count = parseInt(wishlistCount.innerText);
      if (icon.classList.contains("active")) {
        icon.classList.remove("active");
        count = Math.max(0, count - 1);
      } else {
        icon.classList.add("active");
        count++;
      }
      wishlistCount.innerText = count;
    }
  });
});

// Product Sorting
const sortSelect = document.querySelector(".all-products select");
if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    const sortBy = e.target.value;
    const productGrid = document.querySelector(".product-center");
    const products = [...productGrid.children];

    products.sort((a, b) => {
      const priceA = parseFloat(a.querySelector("h4").innerText.replace("$", ""));
      const priceB = parseFloat(b.querySelector("h4").innerText.replace("$", ""));

      if (sortBy === "2") { // Sort by price
        return priceA - priceB;
      } else if (sortBy === "3") { // Sort by popularity (using discount as proxy)
        const discountA = a.querySelector(".discount") ? 1 : 0;
        const discountB = b.querySelector(".discount") ? 1 : 0;
        return discountB - discountA;
      }
      return 0;
    });

    productGrid.innerHTML = "";
    products.forEach(product => productGrid.appendChild(product));
  });
}

// Pagination
const paginationButtons = document.querySelectorAll(".pagination span");
if (paginationButtons.length) {
  paginationButtons.forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".pagination span.active")?.classList.remove("active");
      button.classList.add("active");
      // Here you would typically handle page changes
      console.log("Changed to page:", button.innerText);
    });
  });
}