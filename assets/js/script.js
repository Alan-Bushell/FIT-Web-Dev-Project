// JavaScript for toggling mobile nav
document.getElementById('hamburger').addEventListener('click', function() {
    var mobileNav = document.getElementById('mobileNav');
    
    // Toggle between showing and hiding the mobile nav
    if (mobileNav.style.display === "flex") {
       mobileNav.style.display = "none";
    } else {
       mobileNav.style.display = "flex";
    }
 });

// Function to fetch data from JSON file
async function fetchData() {
   try {
       const response = await fetch('assets/data/data.json'); 
       const data = await response.json();
       return data;
   } catch (error) {
       console.error('Error fetching data:', error);
       return null;
   }
}

// Add event listeners only if buttons exist on the page
const btnFood = document.querySelector('.btn-food');
const btnDrink = document.querySelector('.btn-drink');
const btnNotable = document.querySelector('.btn-notable');

if (btnFood) {
   btnFood.addEventListener('click', () => updateContent('Food'));
}

if (btnDrink) {
   btnDrink.addEventListener('click', () => updateContent('Drink'));
}

if (btnNotable) {
   btnNotable.addEventListener('click', () => updateContent('Notable'));
}

// Function to update content based on selection
function updateContent(selection) {
   fetchData().then(data => {
       if (data && data[selection]) {
           const selectedItems = data[selection]; // Get array of items for the selected category
           const outputContainer = document.querySelector('.output-container');

           // Clear existing content
           outputContainer.innerHTML = '';

           // Create a container for the selected category
           const categoryContainer = document.createElement('div');
           categoryContainer.classList.add(`${selection.toLowerCase()}-output-cont`);

           // Loop through each item in the selected category and create HTML elements
           selectedItems.forEach((item, index) => {
               const itemDiv = document.createElement('div');
               itemDiv.classList.add(`food-${index + 1}`); // Keep the class name as per your request

               // Image container
               const imageContainer = document.createElement('div');
               imageContainer.classList.add('food-img-cap');

               item.images.forEach(image => {
                   const img = document.createElement('img');
                   img.src = image.url;
                   img.alt = image.alt;
                   imageContainer.appendChild(img);
               });

               // Text container
               const textContainer = document.createElement('div');
               textContainer.classList.add('food-text');

               const titleElement = document.createElement('h3');
               titleElement.textContent = item.title;

               const descriptionElement = document.createElement('p');
               descriptionElement.textContent = item.description;

               textContainer.appendChild(titleElement);
               textContainer.appendChild(descriptionElement);

               itemDiv.appendChild(imageContainer);
               itemDiv.appendChild(textContainer);

               // Append each item div to the category container
               categoryContainer.appendChild(itemDiv);
           });

           // Append the category container to the main output container
           outputContainer.appendChild(categoryContainer);

           // Now add the 'active-option' class to the selected button
           document.querySelectorAll('.btn-group button').forEach(button => {
               button.classList.remove('active-option');
           });

           const activeButton = document.querySelector(`.btn-${selection.toLowerCase()}`);
           if (activeButton) {
               activeButton.classList.add('active-option');
           }
       }
   });
}

// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cartIcon');
    
    // Initialize cart state
    function initializeCart() {
        if (sessionStorage.getItem('cart')) {
            enableCartIcon();
        } else {
            disableCartIcon();
        }
    }

    // Initialize cart on every page load
    initializeCart();

    // Handle Add to Cart (on contact.html)
    const addToCartBtn = document.getElementById('addToCart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const cartItem = {
                name: this.getAttribute('data-name'),
                price: this.getAttribute('data-price'),
                quantity: 1
            };

            sessionStorage.setItem('cart', JSON.stringify(cartItem));
            enableCartIcon();
            window.location.href = 'cart.html';
        });
    }

    // Handle Remove from Cart (on cart.html)
    const removeBtn = document.getElementById('remove-btn');
    if (removeBtn) {
        removeBtn.addEventListener('click', function() {
            sessionStorage.removeItem('cart');
            disableCartIcon();
            window.location.href = 'contact.html';
        });
    }
});

function disableCartIcon() {
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.style.pointerEvents = 'none';
        cartIcon.style.opacity = '0.5';
        cartIcon.style.cursor = 'default';
        cartIcon.href = '#';
        cartIcon.classList.add('disabled');
    }
}

function enableCartIcon() {
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.style.pointerEvents = 'auto';
        cartIcon.style.opacity = '1';
        cartIcon.style.cursor = 'pointer';
        cartIcon.href = 'cart.html';
        cartIcon.classList.remove('disabled');
    }
}

// Payment form

document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.querySelector('.payment-form');
    const checkoutContainer = document.querySelector('.checkout-container');
    const successContainer = document.querySelector('.payment-success-container');
    const removeBtn = document.querySelector('.remove-from-cart');

    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Generate transaction ID
                const now = new Date();
                const transactionId = generateTransactionId(now);
                
                // Update the transaction ID in the success container
                const txidElement = successContainer.querySelector('small');
                txidElement.textContent = `TXID: ${transactionId}`;
                
                // Hide checkout container
                checkoutContainer.style.display = 'none';
                removeBtn.style.display = 'none';
                
                // Show success container
                successContainer.style.display = 'flex';
                
                // Clear the form
                paymentForm.reset();
                
                // Clear cart from session storage
                sessionStorage.removeItem('cart');
                
                // Disable cart icon
                disableCartIcon();
            }
        });
    }
});

function generateTransactionId(date) {
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    
    return `${seconds}${minutes}${hours}${day}${month}${year}`;
}
function validateForm(form) {
    // Get form fields
    const name = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    const email = form.querySelector('#email');
    const cardNumber = form.querySelector('#card-number');
    const expiry = form.querySelector('#card-expiry');
    const cvv = form.querySelector('#card-cvc');

    // Reset previous error states
    clearErrors();

    // Validation rules
    let isValid = true;

    // Name validation (at least 2 words)
    if (!name.value.trim() || name.value.trim().split(' ').length < 2) {
        showError(name, 'Please enter your full name');
        isValid = false;
    }

    // Phone validation
    const phonePattern = /^[0-9+\-\s()]{7,}$/;
    if (!phonePattern.test(phone.value)) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Card number validation (16 digits, spaces allowed)
    const cardNumberClean = cardNumber.value.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumberClean)) {
        showError(cardNumber, 'Please enter a 16-digit card number');
        isValid = false;
    }

    // Expiry date validation (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry.value)) {
        showError(expiry, 'Please enter a valid expiry date (MM/YY)');
        isValid = false;
    }

    // CVV validation (3 digits)
    if (!/^\d{3}$/.test(cvv.value)) {
        showError(cvv, 'Please enter a valid 3-digit CVV');
        isValid = false;
    }

    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group-pmtn, .form-group-pmnt');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove any existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    formGroup.appendChild(errorDiv);
    input.classList.add('error');
}

function clearErrors() {
    // Remove all error messages
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    // Remove error class from inputs
    document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
}