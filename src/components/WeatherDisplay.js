import React from "react";

const WeatherDisplay = ({ weather, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!weather) return null;

  return (
    <div className="weather-display">
      <h2>{weather.name}</h2>
      <p>🌡 {weather.main.temp}°C</p>
      <p>🌤 {weather.weather[0].main}</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherDisplay;
