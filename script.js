var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_key}';

var cityInput = document.querySelector(".city-input");
var searchButton = document.querySelector(".search-btn");
var locationButton = document.querySelector(".location-btn");
var currentWeatherDiv = document.querySelector(".current-weather");
var weatherCardsDiv = document.querySelector(".weather-cards");

var API_KEY = "4355a66fdde42846bed823c00ac73c32";

fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_key}'+cityInput.value+'&appid='+API_KEY)

        .then(res => res.json())

        .then(data => {

      .catch(err => alert('Error'))
        })

locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());