import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const WeatherForecast = ({ forecast }) => ( // Display the 5-day forecast
  <div className="forecast mb-6 ">
    <Typography variant="h6" className="mb-2 text-black dark:text-white">5-Day Forecast</Typography>
    <Grid container spacing={2} justifyContent="center">
      {forecast.map((day, index) => (
        <Grid item xs={12} sm={6} md={2.4} key={index}> {/* display in grid to make page dynamic */}
          <Card className="shadow-md bg-white dark:bg-gray-800 text-black dark:text-white transition-all">
            <CardContent className="text-center">
              <Typography variant="body1">{day.date}</Typography>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt="icon"
                className="mx-auto"
              />
              <Typography>{day.condition}</Typography>
              <Typography>{day.temp} °C</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default WeatherForecast;