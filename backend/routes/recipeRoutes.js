const express = require('express');
const router = express.Router();
const recipes = require('../data/recipes.json');
const substitutions = require('../data/substitutions.json');

// In-memory storage for user favorites and ratings
let userFavorites = [];
let recipeRatings = {};

// Get all recipes
router.get('/', (req, res) => {
  res.json(recipes);
});

// Search recipes by ingredients, dietary preferences, difficulty, and cooking time
router.get('/search', (req, res) => {
  const { ingredients, dietaryPreferences, difficulty, cookingTime } = req.query;

  // Validate ingredients parameter
  if (!ingredients || typeof ingredients !== 'string' || ingredients.trim() === '') {
    return res.status(400).json({ message: 'Ingredients parameter is required and must be a non-empty string' });
  }

  // Split ingredients into an array and normalize (trim and lowercase)
  const ingredientsList = ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());

  // Filter recipes that contain ANY of the ingredients
  let matchedRecipes = recipes.filter(recipe =>
    ingredientsList.some(ingredient => recipe.ingredients.map(i => i.toLowerCase()).includes(ingredient))
  );

  // Filter by dietary preferences (if provided)
  if (dietaryPreferences && typeof dietaryPreferences === 'string') {
    const preferencesList = dietaryPreferences.split(',').map(preference => preference.trim().toLowerCase());
    matchedRecipes = matchedRecipes.filter(recipe =>
      preferencesList.every(preference => recipe.dietaryPreferences.map(p => p.toLowerCase()).includes(preference))
    );
  }

  // Filter by difficulty (if provided)
  if (difficulty && typeof difficulty === 'string') {
    matchedRecipes = matchedRecipes.filter(recipe => recipe.difficulty === difficulty.toLowerCase());
  }

  // Filter by cooking time (if provided)
  if (cookingTime && !isNaN(cookingTime)) {
    matchedRecipes = matchedRecipes.filter(recipe => recipe.cookingTime <= parseInt(cookingTime));
  }

  // Return matched recipes
  res.json(matchedRecipes);
});

// Get substitution suggestions for an ingredient
router.get('/substitutions', (req, res) => {
  const { ingredient } = req.query;

  // Validate ingredient parameter
  if (!ingredient || typeof ingredient !== 'string' || ingredient.trim() === '') {
    return res.status(400).json({ message: 'Ingredient parameter is required and must be a non-empty string' });
  }

  // Find substitution for the ingredient
  const substitution = substitutions[ingredient.toLowerCase()];
  if (!substitution) {
    return res.status(404).json({ message: 'No substitutions found for this ingredient' });
  }

  // Return substitution
  res.json({ ingredient, substitution });
});

// Get recipe by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  // Validate ID parameter
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Recipe ID must be a number' });
  }

  // Find recipe by ID
  const recipe = recipes.find(recipe => recipe.id === parseInt(id));
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  // Add user rating to the recipe (if available)
  if (recipeRatings[id]) {
    recipe.rating = recipeRatings[id];
  }

  // Return recipe
  res.json(recipe);
});

// Save a recipe as favorite
router.post('/favorites', (req, res) => {
  const { recipeId } = req.body;

  // Validate recipeId parameter
  if (!recipeId || isNaN(recipeId)) {
    return res.status(400).json({ message: 'Recipe ID is required and must be a number' });
  }

  // Add recipe to favorites if not already present
  if (!userFavorites.includes(recipeId)) {
    userFavorites.push(recipeId);
  }

  // Return success message and updated favorites list
  res.json({ message: 'Recipe saved as favorite', favorites: userFavorites });
});

// Rate a recipe
router.post('/rate', (req, res) => {
  const { recipeId, rating } = req.body;

  // Validate recipeId and rating parameters
  if (!recipeId || isNaN(recipeId)) {
    return res.status(400).json({ message: 'Recipe ID is required and must be a number' });
  }
  if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating is required and must be a number between 1 and 5' });
  }

  // Find recipe by ID
  const recipe = recipes.find(recipe => recipe.id === recipeId);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  // Save the rating
  recipeRatings[recipeId] = rating;

  // Return success message and updated recipe
  res.json({ message: 'Recipe rated successfully', recipe });
});

module.exports = router;