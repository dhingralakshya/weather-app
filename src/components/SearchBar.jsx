import React from 'react';
import { TextField, Button } from '@mui/material';

const SearchBar = ({ city, setCity, handleSearch, handleKeyPress, theme, toggleTheme }) => (
  <div className="flex flex-col sm:flex-row gap-2 justify-center items-stretch my-3 w-1/2 max-md:w-full mx-auto">
    <TextField
      label="Enter city name"
      InputLabelProps={{ //change color of label based on theme
        className: 'dark:text-gray-300 text-gray-700',
      }}
      InputProps={{ //change color of input based on theme
        className: 'dark:bg-gray-800 dark:text-white text-black',
      }}
      value={city}
      className='dark:bg-gray-800'
      onChange={(e) => setCity(e.target.value)}
      onKeyDown={handleKeyPress}
      fullWidth
      sx={{ //managed styles based on theme usoing sx prop
        '& label.Mui-focused': {
            color: theme === 'dark' ? '#fff' : '#222',
        },
        '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'gray', 
        },
        '&.Mui-focused fieldset': {
            borderColor: theme === 'dark' ? 'white' : 'black', // focus border color
            boxShadow: 'none',
        },
        },
      }}
    />
    <Button variant="contained" onClick={handleSearch}>Search</Button>
  </div>
);

export default SearchBar;