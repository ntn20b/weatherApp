import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ru";

import "./App.scss";

const api = {
  key: "9d9d3ed836a66894d044b3d1d681a911",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  moment.locale("ru");
  const date = moment().format("dddd MMMM DD YYYY");

  const [currentTime, setCurrentTime] = useState(moment().format("HH"));

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("HH"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>Hey</h1>
      <div className="searchBox">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>

      {typeof weather.main != "undefined" ? (
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
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
