import React, { useState } from 'react';
import axios from 'axios';
import { Typography, CircularProgress } from '@mui/material';
import Header from './Header';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import Forecast from './WeatherForecast';
import SearchHistory from './SearchHistory';

const API_KEY = '50b940b396c99c1c33b6ea3f97c37c62'; //API key for OpenWeather

const App = () => {
  const [city, setCity] = useState('');  //to clear the text field
  const [weather, setWeather] = useState(null); //weather data
  const [forecast, setForecast] = useState([]); //forecast data
  const [loading, setLoading] = useState(false); //loading state
  const [error, setError] = useState(''); //error state
  const [searchHistory, setSearchHistory] = useState([]); //search history

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError('');
    try {
      const currentRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`); //api for fetching current weather
      const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`); //api for fetching forecast data
      setWeather(currentRes.data); //set weather data
      setForecast(processForecastData(forecastRes.data.list)); //process and set forecast data
      setCity(''); //clear the text field
      setSearchHistory((prev) => [currentRes.data.name, ...prev.filter(c => c !== currentRes.data.name)].slice(0, 5)); //update search history
    } catch (err) {
      setError('City not found or API error.'); //handle error
      setWeather(null); //set it to null in case of error
      setForecast([]); //set it to null in case of error
    } finally {
      setLoading(false); 
    }
  };

  const processForecastData = (data) => { //process the forecast data to set it in a specific format
    const daily = {};
    data.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!daily[date]) daily[date] = [];
      daily[date].push(item);
    });

    const summarized = Object.keys(daily).map(date => { 
      const dayData = daily[date];
      const temps = dayData.map(d => d.main.temp);
      const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
      return {
        date,
        temp: avgTemp,
        condition: dayData[0].weather[0].main,
        icon: dayData[0].weather[0].icon
      };
    });

    return summarized.slice(0, 5);
  };

  const handleSearch = () => fetchWeather(city); //function to handle search
  const handleKeyPress = (e) => e.key === 'Enter' && handleSearch(); //function to handle key press
  const refreshWeather = () => weather && fetchWeather(weather.name); //function to refresh weather data

  const [theme, setTheme] = useState(() => { //get initial theme from localStorage
    return localStorage.getItem('theme') || 'light';
  });

  
  const toggleTheme = () => { //function to toggle theme
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  React.useEffect(() => { // Adds or removes the 'dark' class on the root <html> element
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'} transition-all`}>
      <Header theme={theme} toggleTheme={toggleTheme} /> {/* header component */}
      <div className="p-4 text-center">
      <Typography variant='h4' className='text-xl'>Weather Dashboard</Typography>

      <SearchBar
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
        handleKeyPress={handleKeyPress}
        theme={theme} toggleTheme={toggleTheme} //passing theme and toggleTheme to SearchBar
      />

      {loading && <div className="flex justify-center my-4"><CircularProgress /></div>} {/* loading spinner */}

      {searchHistory.length > 0 && <SearchHistory searchHistory={searchHistory} fetchWeather={fetchWeather} />} {/* search history component, shows history of the recent keywords until page reloads */}
      {error && <Typography color="error" className="mb-4">{error}</Typography>} {/* error message */}

      {weather && <WeatherCard weather={weather} refreshWeather={refreshWeather} />} {/* weather card component, also handles refresh operation */}
      {forecast.length > 0 && <Forecast forecast={forecast} />} {/* forecast component */}
      

      
    </div>
    </div>
  );
};

export default App;
