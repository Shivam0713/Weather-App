import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './Weather.css';
import Login from './Login.jsx';
import SearchBar from './SearchBar.jsx';
import WeatherDisplay from './WeatherDisplay.jsx';
import Loader from './loader.jsx';

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
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    return loggedIn;
  });
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") || "");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("weather_history");
    return saved ? JSON.parse(saved) : [];
  });
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error(weatherData.message || forecastData.message || "City not found");
      }

      const weather = weatherData.weather[0];
      const iconCode = weather.icon;
      const isNight = iconCode.includes('n');
      const icon = iconMap[iconCode] || clear_icon;

      setWeatherData({
        iconCode,
        icon,
        main: weather.main,
        isNight,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        temperature: Math.round(weatherData.main.temp),
        location: weatherData.name,
      });

      setIsDay(!isNight);

      const filteredForecast = forecastData.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 7);

      const dailyForecast = filteredForecast.map(day => ({
        day: new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'long' }),
        temp: Math.round(day.main.temp),
        humidity: day.main.humidity,
        windSpeed: day.wind.speed,
        description: day.weather[0].description,
        icon: iconMap[day.weather[0].icon] || clear_icon,
      }));

      // If the API provides fewer than 7 days, pad with placeholder data
      while (dailyForecast.length < 7) {
        const lastDay = dailyForecast[dailyForecast.length - 1];
        const nextDayIndex = dailyForecast.length + 1;
        dailyForecast.push({
          day: moment().add(nextDayIndex, 'days').format('dddd'),
          temp: lastDay.temp,
          humidity: lastDay.humidity,
          windSpeed: lastDay.windSpeed,
          description: "Data unavailable",
          icon: lastDay.icon,
        });
      }

      setForecast(dailyForecast);

      setHistory((prev) => {
        const updated = [city, ...prev.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, 5);
        localStorage.setItem("weather_history", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      alert(`Failed to fetch weather data: ${error.message}`);
      setWeatherData(null);
      setForecast([]);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setWeatherData(null);
    setForecast([]);
    setCurrentUser("");
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLoggedIn", "false");
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user.username);
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
        padding: '0px',
        boxSizing: 'border-box',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="app-container">
          {loading && <Loader />}
          
          <div className="forecast-box">
            <h3>Next 7 Days Forecast</h3>
            {forecast.length > 0 ? (
              forecast.map((day, i) => (
                <div className="forecast-item" key={i}>
                  <div className="forecast-main">
                    <div className="forecast-day">{day.day}</div>
                    <img src={day.icon} alt={day.description} className="forecast-icon" />
                    <div className="forecast-temp">{day.temp}°C</div>
                  </div>
                  <div className="forecast-details">
                    <div className="forecast-description">{day.description}</div>
                    <div className="forecast-stats">
                      <span>💧 {day.humidity}%</span>
                      <span>🌬️ {day.windSpeed} m/s</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-forecast">No forecast data available</div>
            )}
          </div>

          <div className="weather">
            <div className="weather-header">
              <SearchBar onSearch={search} history={history} />
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="welcome-message">
              Welcome, {currentUser}!
            </div>
            {weatherData ? (
              <WeatherDisplay
                weatherData={weatherData}
                currentTime={currentTime}
                formatDate={formatDate}
                formatTime={formatTime}
              />
            ) : (
              <div style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
                <p>Loading weather data...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default Weather;
=======
export default Weather;
>>>>>>> 18a35c49671e9f55cee5f03baf79e4c2fe0f59fa
