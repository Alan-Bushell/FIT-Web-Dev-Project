// Function to fetch data from JSON file
async function fetchData() {
    try {
        const response = await fetch('assets/data/people.json'); // Adjust path if needed
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
            const selectedItems = data[selection]; // Get array of items for the selected category
            const outputContainer = document.querySelector('.output-container');

            // Clear existing content
            outputContainer.innerHTML = '';

            // Create a container for the selected category
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('notable-container'); // Use the same class name for the container

            // Loop through each item in the selected category and create HTML elements
            selectedItems.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add(`notable-${index + 1}`); // Keep the class names the same

                // Create text container
                const textContainer = document.createElement('div');
                textContainer.classList.add('person-text');

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = item.description;

                textContainer.appendChild(descriptionElement);

                // Create image container
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('person-image');

                const img = document.createElement('img');
                img.src = item.images[0].url; // Assuming the first image is for the person
                img.alt = item.images[0].alt;

                const nameElement = document.createElement('h2');
                nameElement.textContent = item.title;

                imageContainer.appendChild(img);
                imageContainer.appendChild(nameElement);

                // Alternate the order of text and image based on index
                if (index % 2 === 0) {
                    itemDiv.appendChild(textContainer);
                    itemDiv.appendChild(imageContainer);
                } else {
                    itemDiv.appendChild(imageContainer);
                    itemDiv.appendChild(textContainer);
                }

                // Append each item div to the category container
                categoryContainer.appendChild(itemDiv);

                // Add a horizontal rule if it's not the last item.
                if (index < selectedItems.length - 1) {
                    const hr = document.createElement('hr');
                    categoryContainer.appendChild(hr);
                }
            });

            // Append the category container to the main output container
            outputContainer.appendChild(categoryContainer);

            // Now add the 'active-option' class to the selected button
            document.querySelectorAll('.btn-group button').forEach(button => {
                button.classList.remove('active-option');
            });

            // Selection for the button based on index
            const buttonIndex = ['Notable', 'Music', 'Sport', 'Acting'].indexOf(selection) + 1;
            const activeButton = document.querySelector(`.btn-group button:nth-child(${buttonIndex})`);
            if (activeButton) {
                activeButton.classList.add('active-option');
            }
        }
    });
}

// Add event listeners only if buttons exist on the page
const btnNotable = document.querySelector('.btn-group button:nth-child(1)');
const btnMusic = document.querySelector('.btn-group button:nth-child(2)');
const btnSport = document.querySelector('.btn-group button:nth-child(3)');
const btnActing = document.querySelector('.btn-group button:nth-child(4)');

if (btnNotable) {
    btnNotable.addEventListener('click', () => updatePeopleContent('Notable'));
}

if (btnMusic) {
    btnMusic.addEventListener('click', () => updatePeopleContent('Music'));
}

if (btnSport) {
    btnSport.addEventListener('click', () => updatePeopleContent('Sport'));
}

if (btnActing) {
    btnActing.addEventListener('click', () => updatePeopleContent('Acting'));
}