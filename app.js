const API_KEY = "426bf5f168c12337eafa499943d3b910"; // Replace with your API key
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

searchButton.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        fetchWeather(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherResult.innerHTML = "<p>City not found. Please try again.</p>";
        }
    } catch (error) {
        weatherResult.innerHTML = "<p>Error fetching weather data. Please try again later.</p>";
    }
}

function displayWeather(data) {
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}
