// Select the cart icon and elements
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open the cart when the cart icon is clicked
cartIcon.addEventListener('click', () => {
    cart.classList.add("active");
});

// Close the cart when the close button is clicked
closeCart.addEventListener('click', () => {
    cart.classList.remove("active");
});

// Check if the document is still loading and then call the 'ready' function
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Define the 'ready' function
function ready() {
    // Get all elements with the class 'cart-remove'
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    
    // Add a click event listener to each 'remove' button
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // Get all elements with the class 'cart-quantity'
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    
    // Add a 'change' event listener to each quantity input
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Get all elements with the class 'add-cart'
    var addCart = document.getElementsByClassName('add-cart');

    // Add a click event listener to each 'Add to Cart' button
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}

// Function to remove an item from the cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updatetotal();
}

// Function to handle changes in the quantity input
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// Function to add an item to the cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

// Function to add a product to the cart
function addProductToCart(title, price, productImg) {
    var cartItems = document.querySelector('.cart-content');
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    
    // Check if the item is already in the cart
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    // Create a new cart item element
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    cartShopBox.innerHTML = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div>
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="bx bx-trash-alt cart-remove"></i>
        </div>
    `;

    cartItems.appendChild(cartShopBox);

    // Add event listeners for the new cart item
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// Function to update the total price
function updatetotal() {
    var cartContent = document.querySelector('.cart-content');
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector(".cart-price");
        var quantityElement = cartBox.querySelector(".cart-quantity");

        if (priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace("$", ""));
            var quantity = quantityElement.value;
            total = total + (price * quantity);
        }
    }

    var totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = '$' + total.toFixed(2); // Ensure the total has 2 decimal places
    }
}
