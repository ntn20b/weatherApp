import React from "react";

const Location = ({ weather, date, currentTime }) => {
  return (
    <div className="location">
      {weather.name && weather.sys && weather.sys.country && (
        <p>
          {weather.name} {weather.sys.country}
        </p>
      )}

      <div className="date">{date}</div>

      <div className="time">{currentTime + ":00"} </div>

      {weather.main && weather.main.temp && (
        <p className="temp"> {Math.round(weather.main.temp)}°C</p>
      )}

      {weather.weather && weather.weather.length > 0 && (
        <img
          src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt="Погода"
        />
      )}

      {weather.weather && weather.weather.length > 0 && (
        <p>State of weather: {weather.weather[0].description}</p>
      )}
    </div>
  );
};

export default Location;