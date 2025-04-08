import React from 'react';
import { Button, Typography } from '@mui/material';

const SearchHistory = ({ searchHistory, fetchWeather }) => (  //show search history and fetch weather data for the selected city on click
  <div className="history space-y-2 my-4">
    <Typography variant="h6">Recent Searches</Typography>
    <div className="flex flex-wrap gap-2 justify-center">
      {searchHistory.map((item, index) => (
        <Button key={index} variant="outlined" onClick={() => fetchWeather(item)}>{item}</Button>
      ))}
    </div>
  </div>
);

export default SearchHistory;