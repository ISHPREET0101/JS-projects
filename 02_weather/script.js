document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("condition");
  const errorMsg = document.getElementById("error-message");
  const API_KEY = "422bb1f474b660616930bfbe47a6f8ac";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      return;
    }

    //it may throw an error if the API is not reachable
    // server is always ini antoher continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //gets the data from the API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found ");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    //diaplay
    console.log(data);

    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp} `;
    descriptionDisplay.textContent = `Weather : ${weather[0].description} `;

    // unlock the display
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }
});
