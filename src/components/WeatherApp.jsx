import styles from "./WeatherApp.module.scss";
import initialBackground from "../assets/initialBackground.png";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import SearchBar from "./SearchBar.jsx";
import WeatherPanel from "./weatherPanel.jsx";

import loadingAnimation from "../assets/loading.svg";
import errorIcon from "../assets/error.png";
import lightModeIcon from "../assets/lightModeIcon.png";
import darkModeIcon from "../assets/darkModeIcon.png";

export default function weatherApp() {
  let urlWeather =
    "https://api.openweathermap.org/data/2.5/weather?appid=61278724c50c328e4c73b194c725631f&lang=es";

  let cityUrl = "&q=";

  let urlForecast =
    "https://api.openweathermap.org/data/2.5/forecast?appid=61278724c50c328e4c73b194c725631f&lang=es";

  const [weatherData, setWeatherData] = useState(null); //respuesta de currentweather luego se puede modificar para mostrar la info de forecastpanel cuando lo clickeo
  const [originalWeatherData, setOriginalWeatherData] = useState(null); // copia del currentweather
  const [forecastData, setForecastData] = useState(null); //respuesta de forecast
  const [loading, setLoading] = useState(false); // si esta cargando una llamada a la api
  const [showWeatherPanel, setShowWeatherPanel] = useState(false); // para mostrar la info del clima si corresponde
  const [city, setCity] = useState(""); // ciudad de interes (tomada del search bar)
  const [error, setError] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    if (city) {
      const getData = async () => {
        urlWeather = urlWeather + cityUrl + city;
        urlForecast = urlForecast + cityUrl + city;
        setLoading(true);
        setError(false);
        setShowWeatherPanel(false);
        try {
          const [currentWeatherPromise, forecastPromise] =
            await Promise.allSettled([fetch(urlWeather), fetch(urlForecast)]);
          if (!currentWeatherPromise.value.ok || !forecastPromise.value.ok) {
            //podria capturar cada respuesta en un estado para ver el error
            throw new Error("Error devuelto por la API");
          }
          const weather = await currentWeatherPromise.value.json();
          console.log(weather);
          setWeatherData(weather);
          setOriginalWeatherData(weather);
          const forecast = await forecastPromise.value.json();
          console.log(forecast);
          setForecastData(forecast);
          setShowWeatherPanel(true);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }
  }, [city]);

  const handleFormSubmit = (loc) => {
    setCity(loc);
  };

  const resetWeatherData = () => {
    setWeatherData(originalWeatherData); // pone el weatherData que se busco originalmente
    console.log("reset");
  };

  const changeWeatherData = (data) => {
    setWeatherData(data);
    console.log("change WeatherData");
  };

  return (
    <>
      <div className={styles.searchBarContainer}>
        <SearchBar onSubmit={handleFormSubmit} lightMode={lightMode} />
        <button
          className={`${
            lightMode ? styles.lightModeIcon : styles.darkModeIcon
          }`}
          onClick={() => setLightMode(!lightMode)}
        >
          <img
            src={`${lightMode ? darkModeIcon : lightModeIcon}`}
            alt="icon"
            draggable="false"
          />
        </button>
      </div>
      {!showWeatherPanel && (
        <motion.div
          className={`${styles.initialBackground} ${
            lightMode ? styles.lightMode : ""
          }`}
          style={{ backgroundImage: `url(${initialBackground})` }}
          initial={{ opacity: 0 }}
          animate={lightMode ? { opacity: 1 } : { opacity: 0.05 }}
          transition={{ duration: 0.7 }}
        ></motion.div>
      )}
      {showWeatherPanel && (
        <WeatherPanel
          weatherData={weatherData}
          forecastData={forecastData}
          resetWeatherData={resetWeatherData}
          changeWeatherData={changeWeatherData}
          lightMode={lightMode}
        />
      )}
      {error && (
        <div className={styles.errorContainer}>
          <motion.img
            className={`${styles.error} ${lightMode ? styles.errorLight : ""}`}
            src={errorIcon}
            alt="Algo salio mal..."
            animate={{
              scale: [1, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1],
              rotate: [0, 15, -15, 15, 25, -25, 25, 0],
              transition: {
                duration: 0.9,
                repeat: Infinity,
                repeatDelay: 0.8,
                times: [0, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
              },
            }}
          />
        </div>
      )}
      {loading && (
        <div className={styles.loadingContainer}>
          <img
            className={styles.loadingAnimation}
            src={loadingAnimation}
            alt="loading..."
          />
        </div>
      )}
      <a className={styles.linkIcon} href="https://icons8.com/">
        icons
      </a>
    </>
  );
}
