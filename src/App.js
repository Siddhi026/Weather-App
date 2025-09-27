import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // Stable fetchWeather function using useCallback
  const fetchWeather = useCallback(
    async (cityName) => {
      if (!cityName) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        if (data.cod !== 200) {
          throw new Error(data.message);
        }

        setWeather(data);
        localStorage.setItem("lastCity", cityName); // Save last searched city
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY] // Dependency for useCallback
  );

  // Load last searched city when app mounts
  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      setCity(lastCity);
      fetchWeather(lastCity);
    }
  }, [fetchWeather]); // No ESLint warning now

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      <WeatherDisplay weather={weather} loading={loading} error={error} />
    </div>
  );
}

export default App;
