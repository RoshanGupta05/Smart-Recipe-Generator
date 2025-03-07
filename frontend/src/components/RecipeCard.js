import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';

const RecipeCard = ({ recipe }) => {
  const [rating, setRating] = useState(recipe.rating || 0);

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/api/recipes/favorites', { recipeId: recipe.id });
      alert('Recipe saved as favorite!');
    } catch (err) {
      console.error('Error saving recipe:', err);
    }
  };

  const handleRate = async (newRating) => {
    try {
      await axios.post('http://localhost:5000/api/recipes/rate', { recipeId: recipe.id, rating: newRating });
      setRating(newRating);
      alert('Recipe rated successfully!');
    } catch (err) {
      console.error('Error rating recipe:', err);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2, 
        boxShadow: 3, 
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', 
        '&:hover': {
          transform: 'scale(1.02)', 
          boxShadow: 6, 
        },
      }}
    >
      {/* Dish Image */}
      <CardMedia
        component="img"
        height="200"
        image={recipe.image}
        alt={recipe.name}
        sx={{
          borderTopLeftRadius: 2, 
          borderTopRightRadius: 2,
          objectFit: 'cover', 
        }}
      />

      {/* Recipe Details */}
      <CardContent
        sx={{
          flex: 1, // Take up remaining space
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5, // Spacing between elements
          padding: 3, // Add padding
          backgroundColor: '#f9f9f9', 
        }}
      >
        {/* Recipe Name */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold', 
            color: '#333', 
            marginBottom: 1, 
            fontSize: '1.25rem', 
          }}
        >
          {recipe.name}
        </Typography>

        {/* Ingredients */}
        <Typography variant="body2" color="text.secondary">
          <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
        </Typography>

        {/* Instructions */}
        <Typography variant="body2" color="text.secondary">
          <strong>Instructions:</strong> {recipe.instructions}
        </Typography>

        {/* Difficulty */}
        <Typography variant="body2" color="text.secondary">
          <strong>Difficulty:</strong> {recipe.difficulty}
        </Typography>

        {/* Cooking Time */}
        <Typography variant="body2" color="text.secondary">
          <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
        </Typography>

        {/* Nutritional Info */}
        <Box
          sx={{
            display: 'flex',
            gap: 2, 
            marginTop: 1, 
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Calories:</strong> {recipe.nutritionalInfo.calories}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Protein:</strong> {recipe.nutritionalInfo.protein}g
          </Typography>
        </Box>

        {/* Rating */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginTop: 1, 
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Rating:</strong>
          </Typography>
          <Rating
            value={rating}
            onChange={(e, newValue) => handleRate(newValue)}
            sx={{
              color: '#FF6F61', 
            }}
          />
        </Box>

        {/* Save as Favorite Button */}
        <Button
          variant="contained"
          sx={{
            marginTop: 'auto',
            backgroundColor: '#FF6F61',
            color: '#fff', 
            fontWeight: 'bold', 
            padding: '8px 16px', 
            borderRadius: 1, 
            '&:hover': {
              backgroundColor: '#e65a50', 
            },
          }}
          onClick={handleSave}
        >
          Save as Favorite
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;