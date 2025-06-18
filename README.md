# 🌤️ React Weather App

A beautiful and responsive weather application built using **React.js** and **CSS**. It fetches real-time weather data from a public API and dynamically displays temperature, weather conditions, wind speed, and a contextual image that changes based on the weather.

---

## 🔍 Features

- ✅ Live weather data using OpenWeatherMap API (or any preferred weather API)
- 🌡️ Current temperature with Celsius/Fahrenheit toggle
- 💨 Wind speed and direction
- 🌧️ Dynamic weather icons/images based on current condition (sunny, rainy, cloudy, etc.)
- 📍 Search weather by city name
- 📱 Fully responsive UI for mobile, tablet, and desktop

---

## 🖼️ Demo

![Weather Demo](./preview.png)

---

## 🛠️ Tech Stack

- **React.js** — UI and state management
- **CSS** — Styling and responsiveness
- **Weather API** — (e.g. OpenWeatherMap or WeatherAPI)

---

## ⚙️ How It Works

1. User enters a city name in the search bar.
2. App fetches real-time weather data via API.
3. Displays:
   - Temperature
   - Wind speed and direction
   - Condition description (e.g. “Cloudy”)
   - Weather icon/image based on condition

---

## 📸 Weather Image Logic

The app displays different background or weather icon images according to the fetched condition:

| Condition      | Image/Theme     |
|----------------|-----------------|
| Clear/Sunny    | ☀️ Sunny image   |
| Rainy          | 🌧️ Rainy image   |
| Snow           | ❄️ Snow image    |
| Cloudy         | ☁️ Cloudy image  |
| Thunderstorm   | ⚡ Storm image   |
| Mist/Fog       | 🌫️ Foggy image   |

---

## 🚀 Installation

```bash
git clone https://github.com/yourusername/react-weather-app.git
cd Weather-App
npm install
npm run dev
