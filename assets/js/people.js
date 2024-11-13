// Wrap everything in an IIFE to avoid global scope pollution
(function() {
    // Function to fetch data from JSON file
    async function fetchData() {
        try {
            const response = await fetch('assets/data/people.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    // Function to update content based on selection
    function updatePeopleContent(selection) {
        fetchData().then(data => {
            if (data && data[selection]) {
                const selectedItems = data[selection];
                const outputContainer = document.querySelector('.output-container');
                
                // Clear existing content
                outputContainer.innerHTML = '';

                const categoryContainer = document.createElement('div');
                categoryContainer.classList.add('notable-container');

                selectedItems.forEach((item, index) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add(`notable-${index + 1}`);

                    const textContainer = document.createElement('div');
                    textContainer.classList.add('person-text');

                    const descriptionElement = document.createElement('p');
                    descriptionElement.textContent = item.description;
                    textContainer.appendChild(descriptionElement);

                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('person-image');

                    const img = document.createElement('img');
                    img.src = item.images[0].url;
                    img.alt = item.images[0].alt;

                    const nameElement = document.createElement('h2');
                    nameElement.textContent = item.title;

                    imageContainer.appendChild(img);
                    imageContainer.appendChild(nameElement);

                    if (index % 2 === 0) {
                        itemDiv.appendChild(textContainer);
                        itemDiv.appendChild(imageContainer);
                    } else {
                        itemDiv.appendChild(imageContainer);
                        itemDiv.appendChild(textContainer);
                    }

                    categoryContainer.appendChild(itemDiv);

                    if (index < selectedItems.length - 1) {
                        const hr = document.createElement('hr');
                        categoryContainer.appendChild(hr);
                    }
                });

                outputContainer.appendChild(categoryContainer);

                // Update active button state
                document.querySelectorAll('.btn-group button').forEach(button => {
                    button.classList.remove('active-option');
                });

                const buttonIndex = ['Notable', 'Music', 'Sport', 'Acting'].indexOf(selection) + 1;
                const activeButton = document.querySelector(`.btn-group button:nth-child(${buttonIndex})`);
                if (activeButton) {
                    activeButton.classList.add('active-option');
                }
            }
        }).catch(error => {
            console.error('Error updating content:', error);
        });
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Use event delegation instead of individual button listeners
        const btnGroup = document.querySelector('.btn-group');
        if (btnGroup) {
            btnGroup.addEventListener('click', (e) => {
                if (e.target.matches('button')) {
                    const selection = e.target.textContent.trim();
                    updatePeopleContent(selection);
                }
            });
        }

        // Optionally trigger the Notable section by default
        const defaultButton = document.querySelector('.btn-group button:first-child');
        if (defaultButton) {
            updatePeopleContent('Notable');
        }
    });
})();


// nav-switch
let people1 = document.querySelector('.people-hero');
let people2 = document.querySelector('.people-hero-2');
const button = document.getElementById('nav-switch');

// First, set initial state
people1.style.display = 'flex';  // or 'block' depending on your layout
people2.style.display = 'none';

button.addEventListener('click', function() {
    if(people1.style.display === 'flex'){
        people1.style.display = 'none';
        people2.style.display = 'block';
    } else {
        people2.style.display = 'none';
        people1.style.display = 'flex';  // Changed to 'flex' to match condition
    }
});

