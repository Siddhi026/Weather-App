import React from "react";

const SearchBar = ({ city, setCity, fetchWeather }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather(city);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter city name..."
      />
      <button onClick={() => fetchWeather(city)}>Search</button>
    </div>
  );
};

export default SearchBar;
