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
    const { name, sys, main, weather, timezone } = data;

    // Calculate local time for the city
    const localTime = new Date(Date.now() + timezone * 1000).toLocaleString("en-US", {
        timeZone: "UTC",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    weatherResult.innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Local Time: ${localTime}</p>
    `;

    // Update body class based on weather condition
    if (weather[0].main === "Clear") {
        document.body.className = "clear-sky-background";
        showSun();
    } else if (weather[0].main === "Rain") {
        document.body.className = "rainy-background";
        showRain();
    } else if (weather[0].main === "Clouds") {
        document.body.className = "cloudy-background";
        showClouds();
    }
}

function showClouds() {
    const clouds = document.createElement("div");
    clouds.className = "clouds";
    document.body.appendChild(clouds);
}

function showRain() {
    const rain = document.createElement("div");
    rain.className = "rain";
    document.body.appendChild(rain);
}

function showSun() {
    const sun = document.createElement("div");
    sun.className = "sun";
    document.body.appendChild(sun);
}
