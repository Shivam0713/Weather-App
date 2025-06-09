import React, { useEffect, useState } from 'react';
import './Weather.css';
import Login from './Login.jsx';
import SearchBar from './SearchBar.jsx';
import WeatherDisplay from './WeatherDisplay.jsx';

// Icons
import cloud_icon from '../assets/cloud.png';
import clear_icon from '../assets/clear.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';

// Backgrounds
import clear_bg from '../assets/clear_bg.jpg';
import rain_bg from '../assets/rain_bg.jpg';
import snow_bg from '../assets/snow_bg.jpg';
import cloudy_bg from '../assets/cloudy_bg.jpg';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDay, setIsDay] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("weather_history");
    return saved ? JSON.parse(saved) : [];
  });

  const iconMap = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": cloud_icon,
    "50n": cloud_icon,
  };

  const getBackground = (main, isDay) => {
    if (!main) return clear_bg;
    const lowerMain = main.toLowerCase();
    if (!isDay) return cloudy_bg;
    if (lowerMain.includes("cloud")) return cloudy_bg;
    if (lowerMain.includes("rain") || lowerMain.includes("drizzle") || lowerMain.includes("thunder")) return rain_bg;
    if (lowerMain.includes("snow")) return snow_bg;
    if (lowerMain.includes("clear")) return clear_bg;
    return clear_bg;
  };

  const search = async (city) => {
    if (!city) {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "City not found");
        return;
      }
      const weather = data.weather[0];
      const iconCode = weather.icon;
      const main = weather.main;
      const icon = iconMap[iconCode] || clear_icon;
      const currentTime = data.dt;
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const isDayTime = currentTime >= sunrise && currentTime < sunset;
      setIsDay(isDayTime);
      setWeatherData({
        iconCode,
        icon,
        main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.round(data.main.temp),
        location: data.name,
      });
      setHistory((prev) => {
        const updated = [city, ...prev.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 5);
        localStorage.setItem("weather_history", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      search("Jamshedpur");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const backgroundImage = getBackground(weatherData?.main, isDay);

  return (
    <div
      className={isDay ? "day-theme" : "night-theme"}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div className="weather">
          <SearchBar onSearch={search} history={history} />
          {weatherData && (
            <WeatherDisplay
              weatherData={weatherData}
              currentTime={currentTime}
              formatDate={formatDate}
              formatTime={formatTime}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
