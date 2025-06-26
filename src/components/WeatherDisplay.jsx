import React from 'react';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

const WeatherDisplay = ({ weatherData, currentTime, formatDate, formatTime }) => {
  if (!weatherData) return null;

  return (
    <>
      <img className="weather-icon" src={weatherData.icon} alt="weather icon" />
      <p className="temperature">{Math.round(weatherData.temperature)}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity icon" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind icon" />
          <div>
            <p>{weatherData.windSpeed} m/s</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      <div className="date-time">
        <p>{formatDate(currentTime)}</p>
        <p>{formatTime(currentTime)}</p>
      </div>
    </>
  );
};

export default WeatherDisplay;