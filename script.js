let products = [];
let cart = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        displayProducts();
        populateCategoryFilter();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(category = 'all') {
    const productsSection = document.getElementById("products");
    productsSection.innerHTML = "";

    products.forEach(product => {
        if (category === 'all' || product.category === category) {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productElement.addEventListener('click', () => showProductDetails(product));
            productsSection.appendChild(productElement);
        }
    });
}

function populateCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');
    const categories = [...new Set(products.map(p => p.category))];
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    categoryFilter.addEventListener('change', (e) => displayProducts(e.target.value));
}

function showProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    const productsSection = document.getElementById('products');
    
    productDetails.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" alt="${product.title}" style="max-width: 300px;">
        <p>${product.description}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="backToProducts()">Back to Products</button>
    `;
    
    productsSection.style.display = 'none';
    productDetails.style.display = 'block';
}

function backToProducts() {
    document.getElementById('products').style.display = 'grid';
    document.getElementById('product-details').style.display = 'none';
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.title} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

function showCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'block';
}

function hideCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function validateForm(event) {
    event.preventDefault();
    const form = document.getElementById('checkout-form');
    if (form.checkValidity()) {
        alert('Thank you for your purchase!');
        cart = [];
        updateCart();
        hideCheckoutModal();
    } else {
        alert('Please fill out all required fields correctly.');
    }
}

document.getElementById("checkout-btn").addEventListener("click", showCheckoutModal);
document.getElementById("checkout-form").addEventListener("submit", validateForm);

fetchProducts();

// cart.removeItem(itemId);

// cart.get().forEach(item => {
//     if (item.name === itemToRemove) {
//       cart.removeItem(item.id);
//     }
//   });
  
//   shoptet.cartShared.removeFromCart({itemId: 'uniqueItemId'});

// ... (previous code remains the same)

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.title} - $${item.price.toFixed(2)}
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function removeFromCart(event) {
    const index = parseInt(event.target.getAttribute('data-index'));
    cart.splice(index, 1);
    updateCart();
}

// ... (rest of the code remains the same)
