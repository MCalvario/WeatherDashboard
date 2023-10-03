//API through openweatherapp
var API_KEY = "4355a66fdde42846bed823c00ac73c32";

//Get a hold of your variables
var cityInput = document.querySelector(".city-input");
var searchButton = document.querySelector(".search-btn");
var locationButton = document.querySelector(".location-btn");
var currentWeatherDiv = document.querySelector(".current-weather");
var weatherCardsDiv = document.querySelector(".weather-cards");

var getWeatherDetails = (cityName, latitude, longitude) => {
    var WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        // Filter the forecasts to get only one forecast per day
        var ForecastDays = [];
        var fiveDayForecast = data.list.filter(forecast => {
            var forecastDate = new Date(forecast.dt_txt).getDate();
            if (!ForecastDays.includes(forecastDate)) {
                return ForecastDays.push(forecastDate);
            }
        });
        // Clear previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";
        // weather cards
        fiveDayForecast.forEach((item, index) => {
            var html = weatherCard(cityName, item, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}
var getCityCoordinates = () => {
    var cityName = cityInput.value.trim();
    if (cityName === "") return;
    var API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    // city coordinates (latitude, longitude, and name)
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        var { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("Error!  Something went wrong!");
    });
}

var weatherCard = (cityName, item, index) => {
  if(index === 0) { // main weather card
      return `<div class="details">
                  <h2>${cityName} (${item.dt_txt.split(" ")[0]})</h2>
                  <h6>Temperature: ${(item.main.temp - 273.15).toFixed(2)}°C</h6>
                  <h6>Wind: ${item.wind.speed} M/S</h6>
                  <h6>Humidity: ${item.main.humidity}%</h6>
              </div>
              <div class="icon">
                  <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png" alt="weather-icon">
                  <h6>${item.weather[0].description}</h6>
              </div>`;
  } else { // five day forecast card
      return `<li class="card">
                  <h3>(${item.dt_txt.split(" ")[0]})</h3>
                  <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png" alt="weather-icon">
                  <h6>Temp: ${(item.main.temp - 273.15).toFixed(2)}°C</h6>
                  <h6>Wind: ${item.wind.speed} M/S</h6>
                  <h6>Humidity: ${item.main.humidity}%</h6>
              </li>`;
  }
}

var getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            var { latitude, longitude } = position.coords; // Get coordinates of user location
            // Get city name from coordinates
            var API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("Error!  Something went wrong!");
            });
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                alert("Error. Please reset location permission to grant access again.");
            } else {
                alert("Error. Please reset location permission.");
            }
        });
}

//add event listeners
locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());