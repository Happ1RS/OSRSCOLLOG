// Sample data structure - you would expand this with all collection log categories/items
const collectionLog = {
    "Bosses": {
        "Abyssal Sire": false,
        "Alchemical Hydra": false,
        "Barrows Chests": false,
        // Add all bosses
    },
    "Raids": {
        "Chambers of Xeric": false,
        "Theatre of Blood": false,
        // Add all raid items
    },
    // Add all other categories (Clues, Minigames, etc.)
};

// Load categories
function loadCategories() {
    const categoriesContainer = document.querySelector('.categories');
    
    for (const category in collectionLog) {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.textContent = category;
        categoryElement.addEventListener('click', () => loadItems(category));
        categoriesContainer.appendChild(categoryElement);
    }
}

// Load items for a specific category
function loadItems(category) {
    const categoriesContainer = document.querySelector('.categories');
    const itemsView = document.querySelector('.items-view');
    
    categoriesContainer.style.display = 'none';
    itemsView.style.display = 'block';
    itemsView.innerHTML = '';
    
    // Add back button
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = '← Back to Categories';
    backButton.addEventListener('click', () => {
        categoriesContainer.style.display = 'grid';
        itemsView.style.display = 'none';
    });
    itemsView.appendChild(backButton);
    
    // Add category title
    const title = document.createElement('h2');
    title.textContent = category;
    title.style.color = '#ff981f';
    itemsView.appendChild(title);
    
    // Add items
    for (const item in collectionLog[category]) {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'item-checkbox';
        checkbox.checked = collectionLog[category][item];
        checkbox.addEventListener('change', (e) => {
            collectionLog[category][item] = e.target.checked;
            updateProgress();
            saveToLocalStorage();
        });
        
        const label = document.createElement('label');
        label.textContent = item;
        
        itemElement.appendChild(checkbox);
        itemElement.appendChild(label);
        itemsView.appendChild(itemElement);
    }
}

// Update progress bar
function updateProgress() {
    let totalItems = 0;
    let completedItems = 0;
    
    for (const category in collectionLog) {
        for (const item in collectionLog[category]) {
            totalItems++;
            if (collectionLog[category][item]) {
                completedItems++;
            }
        }
    }
    
    const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    document.querySelector('.progress-fill').style.width = `${percentage}%`;
    document.querySelector('.progress-text').textContent = `${percentage}% Complete (${completedItems}/${totalItems})`;
}

// Save to local storage
function saveToLocalStorage() {
    localStorage.setItem('osrsCollectionLog', JSON.stringify(collectionLog));
}

// Load from local storage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('osrsCollectionLog');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        for (const category in parsedData) {
            if (collectionLog[category]) {
                for (const item in parsedData[category]) {
                    if (collectionLog[category][item] !== undefined) {
                        collectionLog[category][item] = parsedData[category][item];
                    }
                }
            }
        }
    }
    updateProgress();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadFromLocalStorage();
});
