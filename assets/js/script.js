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

 // Psuedo code
 // 1. Store data in the json file
 // 2. get the value selected from the button but have a standard one outputting
 // 3. IF user selects an output type then alter the image, name & text of the selection
 // 4. Keep what I have done so far as placeholders on page load and then update the other content

// Function to fetch data from JSON file
async function fetchData() {
   try {
       const response = await fetch('assets/data/data.json'); // Adjust path if needed
       const data = await response.json();
       return data;
   } catch (error) {
       console.error('Error fetching data:', error);
       return null;
   }
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
       }
   });
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