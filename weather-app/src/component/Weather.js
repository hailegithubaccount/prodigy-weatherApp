import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'


const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '5ea6588db327efb0457bfec91dbd33e9'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name.');
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found or other error occurred.');
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-data">
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
