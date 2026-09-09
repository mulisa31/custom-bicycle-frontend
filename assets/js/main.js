// Menu show/hide functionality


// Image gallery: clicking small images changes the main product image
function imgGallery() {
  const mainImg = document.querySelector(".details__img"),
    smallImg = document.querySelectorAll(".details__small-img");

  smallImg.forEach((img) => {
    img.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  });
}

imgGallery();

// Swiper for category carousel
let swiperCategories = new Swiper(".categories__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    350: { slidesPerView: 2, spaceBetween: 24 },
    768: { slidesPerView: 3, spaceBetween: 24 },
    992: { slidesPerView: 4, spaceBetween: 24 },
    1200: { slidesPerView: 5, spaceBetween: 24 },
    1400: { slidesPerView: 6, spaceBetween: 24 },
  },
});

// Swiper for product carousel
let swiperProducts = new Swiper(".new__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 24 },
    992: { slidesPerView: 4, spaceBetween: 24 },
    1400: { slidesPerView: 4, spaceBetween: 24 },
  },
});

// Product tabs: switch between different tab contents
const tabs = document.querySelectorAll("[data-target]"),
  tabsContents = document.querySelectorAll("[content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabsContents.forEach((tabsContent) => {
      tabsContent.classList.remove("active-tab");
    });

    target.classList.add("active-tab");

    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });

    tab.classList.add("active-tab");
  });
});

// update the cart badge number in the header
window.updateCartBadge = async function () {
  const badge = document.getElementById("cart-badge");

  // header hasn't loaded yet, skip
  if (!badge) {
    return;
  }

  const token = localStorage.getItem("token");

  // user is not logged in, show zero
  if (!token) {
    badge.textContent = "0";
    return;
  }

  try {
    // use the  backend URL
    const response = await fetch("https://custom-bicycle-system-backend.onrender.com/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const cart = await response.json();

    // sum up the quantity of every item in the cart
    const totalItems = cart.reduce((total, item) => {
      return total + Number(item.quantity || 0);
    }, 0);

    badge.textContent = totalItems;

  } catch (error) {
    console.error("Could not load cart count:", error);
    badge.textContent = "0";
  }
};

// watch for the header to be inserted into the page, then update the badge
const headerObserver = new MutationObserver(() => {
  const badge = document.getElementById("cart-badge");

  if (badge) {
    window.updateCartBadge();
    headerObserver.disconnect();
  }
});

headerObserver.observe(document.body, {
  childList: true,
  subtree: true
});

// update badge again on full page load
window.addEventListener("load", () => {
  window.updateCartBadge();
});