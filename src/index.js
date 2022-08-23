let now = new Date();
let date = document.querySelector("#data");
const opts = {
  weekday: "long",
  hour: "numeric",
  hour12: false,
  minute: "numeric"
};
let data = Intl.DateTimeFormat("en-US", opts).format(now);
date.innerHTML = `${data}`;

function searchForCity(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#search-input").value;
  let apiKey = "8bf13fea7fc7416d4df009d0ae146aff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForCity);

function searchCity(cityName) {
  let apiKey = "96d77ae9fa7aab0e19722ce7e46966f3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function submitForm(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name").value;
  searchCity(cityName);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitForm);

function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let sky = document.querySelector(".descrip");
  sky.innerHTML = response.data.weather[0].description;
  let feelsLike = document.querySelector(".feels");
  feelsLike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  let pressure = document.querySelector(".pressure");
  pressure.innerHTML = `${Math.round(response.data.main.pressure)}mb`;
  function switchParam(event) {
    event.preventDefault();
    let temp = document.querySelector("#temperature");
    let f_temp = document.querySelector("#farengheit");
    if (checkbox.checked) {
      temp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
      f_temp.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
    } else {
      temp.innerHTML = `${Math.round(response.data.main.temp * 1.8 + 32)}°F`;
      f_temp.innerHTML = `${Math.round(
        response.data.main.feels_like * 1.8 + 32
      )}°F`;
    }
  }
  let checkbox = document.querySelector("#myonoffswitch");
  checkbox.addEventListener("change", switchParam);
}

function showCurrentPlace(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey2 = "96d77ae9fa7aab0e19722ce7e46966f3";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey2}&units=metric`;
  axios.get(apiUrl2).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPlace);
}

let placeButton = document.querySelector(".local");
placeButton.addEventListener("click", getCurrentPosition);

searchCity("Simferopol");
