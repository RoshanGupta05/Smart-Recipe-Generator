import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const RecipeDetails = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null); // State to store recipe details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch recipe details from the backend
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data); // Set the fetched recipe data
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching recipe details:', err);
        setError('Recipe not found or an error occurred.'); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRecipe();
  }, [id]); // Re-run effect when the ID changes

  // Display loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Display error message
  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Header />
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // Display recipe details
  return (
    <Box>
      <Header />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {recipe.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Instructions:</strong> {recipe.instructions}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Calories:</strong> {recipe.nutritionalInfo.calories}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Protein:</strong> {recipe.nutritionalInfo.protein}g
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Difficulty:</strong> {recipe.difficulty}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
        </Typography>
      </Box>
    </Box>
  );
};

export default RecipeDetails;