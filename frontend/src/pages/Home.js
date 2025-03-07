import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

// Custom styled component for the hero section
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF6F61 0%, #FFD166 100%)', 
  color: '#fff', // White text
  padding: theme.spacing(8, 2), 
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius, 
  marginBottom: theme.spacing(4), 
}));

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (ingredients, dietaryPreference, difficulty, cookingTime) => {
    if (!ingredients || ingredients.trim() === '') {
      setError('Please enter at least one ingredient.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = {
        ingredients: ingredients,
      };

      // Add optional filters if provided
      if (dietaryPreference) params.dietaryPreferences = dietaryPreference;
      if (difficulty) params.difficulty = difficulty;
      if (cookingTime) params.cookingTime = cookingTime;

      const response = await axios.get(`https://smart-recipe-generator-api.vercel.app/api/recipes/search`, { params });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5', 
      }}
    >
      {/* Header */}
      {/* <Header /> */}

      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Smart Recipe Generator
        </Typography>
        <Typography variant="h6" component="p">
          Discover delicious recipes based on your ingredients and preferences.
        </Typography>
      </HeroSection>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          padding: 3,
          maxWidth: '1200px', 
          margin: '0 auto', 
          width: '100%', 
        }}
      >
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Loading Spinner */}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 4,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Error Message */}
        {error && (
          <Alert
            severity="error"
            sx={{
              marginBottom: 2,
            }}
          >
            {error}
          </Alert>
        )}

        {/* Recipe List */}
        {recipes.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, // Responsive grid
              gap: 3, // Spacing between cards
              marginTop: 3,
            }}
          >
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </Box>
        ) : (
          !loading && (
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                marginTop: 4,
                color: 'text.secondary', 
              }}
            >
              No recipes found. Try a different search.
            </Typography>
          )
        )}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#333', 
          color: '#fff', 
          textAlign: 'center',
          padding: 2,
          marginTop: 'auto',
        }}
      >
        <Typography variant="body2">
            Smart Recipe Generator
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2, // Spacing between icons
            marginTop: 1,
          }}
        >
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
