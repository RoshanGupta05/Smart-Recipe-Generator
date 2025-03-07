import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

const SearchBar = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  const handleSearch = () => {
    onSearch(ingredients, dietaryPreference, difficulty, cookingTime);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'background.paper',
        maxWidth: '800px',
        margin: 'auto',


      }}
    >
      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}>
        Recipe Search
      </Typography>
      <TextField
        fullWidth
        label="Enter ingredients (comma-separated) such as carrots, broccoli"
        variant="outlined"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        sx={{ backgroundColor: 'background.paper' }}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ minWidth: 120, flex: 1 }}>
          <InputLabel>Dietary</InputLabel>
          <Select
            value={dietaryPreference}
            onChange={(e) => setDietaryPreference(e.target.value)}
            label="Dietary"
            sx={{ backgroundColor: 'background.paper' }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="vegetarian">Vegetarian</MenuItem>
            <MenuItem value="gluten-free">Gluten-Free</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, flex: 1 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            label="Difficulty"
            sx={{ backgroundColor: 'background.paper' }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Cooking Time (mins)"
          type="number"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          sx={{ flex: 1, backgroundColor: 'background.paper' }}
        />
      </Box>
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          padding: '10px 20px',
          fontSize: '1rem',
          fontWeight: 'bold',
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;