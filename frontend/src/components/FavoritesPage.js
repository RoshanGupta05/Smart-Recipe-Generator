import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import RecipeCard from './RecipeCard'; // Reuse the RecipeCard component

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        My Favorite Recipes
      </Typography>

      {favorites.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 3,
            width: '100%',
          }}
        >
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary">
          You have no favorite recipes yet.
        </Typography>
      )}
    </Box>
  );
};

export default FavoritesPage;