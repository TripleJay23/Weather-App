const API_KEY = '9a82542cb015d47b426885f704f736bb';
const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    weatherResult.textContent = 'Loading...';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            weatherResult.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind: ${data.wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            weatherResult.textContent = error.message;
        });
}
