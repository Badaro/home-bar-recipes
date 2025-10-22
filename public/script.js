let allCocktails = [];
let categories = [];
let selectedIngredient = null;

// Load cocktails data
async function loadCocktails() {
  try {
    console.log('Attempting to fetch cocktails...');
    const response = await fetch('public/data/cocktails.json');
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Data loaded:', data);
    categories = data.categories || [];
    allCocktails = data.cocktails;
    console.log('About to call renderCocktails with', allCocktails.length, 'cocktails');
    renderCocktails();
    console.log('renderCocktails completed');
  } catch (error) {
    console.error('Error loading cocktails:', error);
    document.getElementById('app').innerHTML = '<div class="empty-state">Error loading cocktails data. Check console for details.</div>';
  }
}

// Filter cocktails by ingredient
function filterByIngredient(ingredient) {
  selectedIngredient = ingredient;
  renderCocktails();
}

// Clear filter
function clearFilter() {
  selectedIngredient = null;
  renderCocktails();
}

// Render cocktails
function renderCocktails() {
  console.log('renderCocktails called, allCocktails:', allCocktails);
  const app = document.getElementById('app');
  console.log('App element found:', !!app);
  
  // Filter cocktails if ingredient is selected
  const filteredCocktails = selectedIngredient
    ? allCocktails.filter(c => c.ingredients.includes(selectedIngredient))
    : allCocktails;
  
  // Build HTML
  let html = `
    <header>
      <h1>The Home Bar</h1>
      <p class="subtitle">Curated Cocktail Collection</p>
    </header>
  `;
  
  // Filter section
  if (selectedIngredient) {
    html += `
      <div class="filter-section">
        <div class="filter-info">
          <span class="filter-text">Filtering by:</span>
          <span class="filter-ingredient">${selectedIngredient}</span>
          <button class="clear-btn" onclick="clearFilter()">Clear Filter</button>
        </div>
      </div>
    `;
  }
  
  html += '<main class="container">';
  
  // Render categories dynamically
  categories
    .sort((a, b) => a.order - b.order)
    .forEach(category => {
      const categoryCocktails = filteredCocktails
        .filter(c => c.category === category.id)
        .sort((a, b) => a.name.localeCompare(b.name));
      
      if (categoryCocktails.length > 0) {
        html += renderCategory(category.title, categoryCocktails);
      }
    });
  
  if (filteredCocktails.length === 0) {
    html += '<div class="empty-state">No cocktails found with this ingredient.</div>';
  }
  
  html += `
    </main>
    <footer>
      <p>&copy; 2025 The Home Bar. All rights reserved.</p>
    </footer>
  `;
  
  app.innerHTML = html;
}

// Render a category section
function renderCategory(title, cocktails) {
  let html = `
    <section class="category-section">
      <h2 class="category-title">${title}</h2>
      <div class="cocktails-grid">
  `;
  
  cocktails.forEach(cocktail => {
    html += `
      <div class="cocktail-card">
        <img src="public/images/${cocktail.image}" alt="${cocktail.name}" class="cocktail-image" />
        <div class="cocktail-content">
          <h3 class="cocktail-name">${cocktail.name}</h3>
          <p class="ingredients-label">INGREDIENTS</p>
          <div class="ingredients-list">
            ${cocktail.ingredients.map(ingredient => 
              `<span class="ingredient-badge" onclick="filterByIngredient('${ingredient}')">${ingredient}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
  });
  
  html += `
      </div>
    </section>
  `;
  
  return html;
}

// Initialize app
loadCocktails();
