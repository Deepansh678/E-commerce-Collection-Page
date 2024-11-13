const loadProductsButton = document.getElementById("loadProducts");
const productContainer = document.getElementById("productContainer");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");


loadProductsButton.addEventListener("click", async () => {
  loadProductsButton.querySelector(".button-text").textContent = ""; 
  loadProductsButton.classList.add("loading");
  errorMessage.classList.add("hidden");
  productContainer.innerHTML = "";

  try {
    const response = await fetch("https://run.mocky.io/v3/92348b3d-54f7-4dc5-8688-ec7d855b6cce?mocky-delay=500ms");
    if (!response.ok) throw new Error("Network response was not ok");
    const products = await response.json();
    renderProducts(products);
    loadProductsButton.style.display = "none";
  } catch (error) {
    errorMessage.classList.remove("hidden");
    console.error("Error fetching products:", error);
  } 
});
function renderProducts(products) {
    products.forEach((item, index) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.style.animationDelay = `${index * 0.1}s`; 
  
      productCard.innerHTML = `
        <img src="${item.product.images[0].src}" alt="${item.product.title}" />
        <h2>${item.product.title}</h2>
        <p class="price"> ₹ ${item.product.variants[0].price}</p>
        <button class="add-to-cart">Add to Cart</button>
        ` ;
       
  
      productContainer.appendChild(productCard);
    });
  }