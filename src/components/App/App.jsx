import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ru";
import Location from "../LocationCard/Location";

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

  const [history, setHistory] = useState([]);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          setHistory((prevHistory) => [
            { name: result.name, temperature: result.main.temp },
            ...prevHistory,
          ]);
        });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("HH"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [elementRight, setElementRight] = useState({
    aside: "-200px",
    button: "0",
    arrow: false,
  });

  function handleButtonClick() {
    setElementRight((prevState) => ({
      aside: prevState.aside === "0" ? "-200px" : "0",
      button: prevState.button === "0" ? "200px" : "0",
      arrow: !prevState.arrow,
    }));
  }

  return (
    <div className="container">
      <main>
        <h1>print your city</h1>
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
          <Location weather={weather} date={date} currentTime={currentTime} />
        ) : (
          ""
        )}
      </main>

      <div
        className="container_button"
        onClick={handleButtonClick}
        style={{ right: elementRight.button }}
      >
        <div className={`arrow ${elementRight.arrow ? "flipped" : ""}`}></div>
      </div>

      <aside className="history" style={{ right: elementRight.aside }}>
        <div className="container">
          <h2>History:</h2>
          {history.map((item, index) => (
            <div key={index} className="history-card">
              <p>{item.name}</p>
              <p>{item.temperature} °C</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default App;
