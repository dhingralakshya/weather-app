import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const WeatherCard = ({ weather, refreshWeather }) => (
  <Card className="mx-auto max-w-md mb-6 shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white transition-all">
    <CardContent> {/* Weather card content-showing details like temperature, condition, humidity and wind speed */}
      <Typography variant="h5">{weather.name}</Typography>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
      />
      <Typography>Temperature: {weather.main.temp} °C</Typography>
      <Typography>Condition: {weather.weather[0].main}</Typography>
      <Typography>Humidity: {weather.main.humidity}%</Typography>
      <Typography>Wind Speed: {weather.wind.speed} km/h</Typography>
      <IconButton className="!text-blue-500 dark:!text-blue-400 hover:scale-110 transition-transform" onClick={refreshWeather}><RefreshIcon /></IconButton>
    </CardContent>
  </Card>
);

export default WeatherCard;