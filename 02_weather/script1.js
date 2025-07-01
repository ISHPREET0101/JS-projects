document.addEventListener(`DOMContentLoaded`, () => {
  const cityInput = document.getElementById("city-input");
  const weatherBtn = document.getElementById("get-weather-btn");
  const weatherDescription = document.getElementById("weather-info");
  const cityDisplay = document.getElementById("city-name");
  const tempDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");
  const API_KEY = "422bb1f474b660616930bfbe47a6f8ac";

  weatherBtn.addEventListener(`click`, async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const Data = await fetchWeatherData(city);
      displayWeatherData(Data);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("city not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityDisplay.textContent = name;
    tempDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    weatherDescription.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }

  function showError() {
    weatherDescription.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
