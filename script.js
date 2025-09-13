require('dotenv').config();

const API_KEY = process.env.API_KEY;
const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  weatherResult.textContent = "Loading...";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      // Emoji based on main weather condition
      let weatherEmoji = "";
      const main = data.weather[0].main.toLowerCase();
      if (main.includes("clear")) {
        weatherEmoji = "☀️"; // Sunny
      } else if (main.includes("cloud")) {
        weatherEmoji = "☁️"; // Cloudy
      } else if (main.includes("rain")) {
        weatherEmoji = "🌧️"; // Rainy
      } else if (main.includes("snow")) {
        weatherEmoji = "❄️"; // Snow/Winter
      } else if (main.includes("thunder")) {
        weatherEmoji = "⛈️"; // Thunderstorm
      } else if (main.includes("drizzle")) {
        weatherEmoji = "🌦️"; // Drizzle
      } else if (
        main.includes("mist") ||
        main.includes("fog") ||
        main.includes("haze")
      ) {
        weatherEmoji = "🌫️"; // Mist/Fog
      } else if (main.includes("wind")) {
        weatherEmoji = "💨"; // Windy
      } else {
        weatherEmoji = "🌡️"; // Default
      }

      weatherResult.innerHTML = `
                <h2 class="city">${data.name}, ${data.sys.country}</h2>
                <p class="temp">${data.main.temp}°C</p>
                <p class="humid">Humidity: ${data.main.humidity}%</p>
                <p class="emoji">${weatherEmoji}</p>
            `;
    })
    .catch((error) => {
      weatherResult.textContent = error.message;
    });
}
