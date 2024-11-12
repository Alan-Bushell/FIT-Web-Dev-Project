// Add event listener to the "Add to Cart" button
document.getElementById('addToCart').addEventListener('click', function() {
    
    // Get product details from data attributes
    const productName = this.getAttribute('data-name');
    const productPrice = this.getAttribute('data-price');
    
    // Create a cart object
    const cartItem = {
        name: productName,
        price: productPrice,
        quantity: 1 // Assuming a default quantity of 1
    };

    // Store the cart item in sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(cartItem));

    // Redirect to a confirmation page or cart page
    window.location.href = 'cart.html';
});


document.addEventListener('DOMContentLoaded', function() {
    const productCard = document.getElementsByClassName('cart-card');
    const cartData = sessionStorage.getItem('cart');

    // Check if product exists in session storage
    if (cartData) {
        const cartItem = JSON.parse(cartData);
        if (cartItem) {
            // If product exists, display the product card
            productCard.style.display = 'flex';
        } else {
            productCard.style.display = 'none';
        }
    } else {
        productCard.style.display = 'none';
    }

    // Add event listener for the remove button
    document.getElementById('remove-btn').addEventListener('click', function() {
        deleteProductFromCart();
    });
});

// Function to delete the product from session storage and hide the product card
function deleteProductFromCart() {
    const productCard = document.getElementsByClassName('cart-card');
    sessionStorage.removeItem('cart'); // Remove the item from session storage
    productCard.style.display = 'none'; // Hide the product card
}