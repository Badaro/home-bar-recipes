let allCocktails = [];
let selectedIngredient = null;

// Load cocktails data
async function loadCocktails() {
  try {
    const response = await fetch('./data/cocktails.json');
    allCocktails = await response.json();
    renderCocktails();
  } catch (error) {
    console.error('Error loading cocktails:', error);
    document.getElementById('app').innerHTML = '<div class="empty-state">Error loading cocktails data.</div>';
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
  const app = document.getElementById('app');
  
  // Filter cocktails if ingredient is selected
  const filteredCocktails = selectedIngredient
    ? allCocktails.filter(c => c.ingredients.includes(selectedIngredient))
    : allCocktails;
  
  // Sort and categorize
  const barmanCocktails = filteredCocktails
    .filter(c => c.category === 'barman')
    .sort((a, b) => a.name.localeCompare(b.name));
  
  const otherCocktails = filteredCocktails
    .filter(c => c.category === 'other')
    .sort((a, b) => a.name.localeCompare(b.name));
  
  const unavailableCocktails = filteredCocktails
    .filter(c => c.category === 'unavailable')
    .sort((a, b) => a.name.localeCompare(b.name));
  
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
  
  // Render categories
  if (barmanCocktails.length > 0) {
    html += renderCategory("Barman's Recommendations", barmanCocktails);
  }
  
  if (otherCocktails.length > 0) {
    html += renderCategory("Other Drinks", otherCocktails);
  }
  
  if (unavailableCocktails.length > 0) {
    html += renderCategory("Ingredients Not Available", unavailableCocktails);
  }
  
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
        <img src="./images/${cocktail.image}" alt="${cocktail.name}" class="cocktail-image" />
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
