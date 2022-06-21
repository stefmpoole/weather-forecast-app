let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");

let current = document.querySelector("#current-time");
current.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");
  let h3 = document.querySelector("#h3");
  let checkbox = document.querySelector("#flexRadioDefault1");
  let city = `${searchInput.value}`;

  function presentTemp(response) {
    let currentTemp = document.querySelector("#current-temp");

    let temperature = Math.round(response.data.main.temp);
    currentTemp.innerHTML = `${temperature}`;

    let fahrenheit = document.getElementById("far");
    let fahrenheitTemp = `${temperature}`;
    fahrenheit.addEventListener("click", () => {
      if (currentTemp === "#far");
      currentTemp.innerHTML = `${fahrenheitTemp}`;
    });

    let degreesCelsius = Math.round(((`${temperature}` - 32) * 5) / 9);
    let celsius = document.getElementById("cel");
    let celsiusTemp = `${degreesCelsius}`;
    celsius.addEventListener("click", () => {
      if (currentTemp === "#cel");
      currentTemp.innerHTML = `${celsiusTemp}`;
    });

    let currentImage = document.getElementById("current-png");
    let currentWeatherImage = response.data.weather[0].icon.currentImage;
    let description = document.getElementById("descrip");
    let currentDescription = response.data.weather[0].description;
    description.innerHTML = `${currentDescription}`;
    currentImage.innerHTML = `${currentWeatherImage}`;

    let humidity = document.getElementById("humidity");
    let currentHumidity = Math.round(response.data.main.humidity);
    humidity.innerHTML = `Humidity:  ${currentHumidity}%`;

    let wind = document.getElementById("wind");
    let windSpeed = Math.round(response.data.wind.speed);
    wind.innerHTML = `Wind: ${windSpeed} mph`;

    if (searchInput.value) {
      h3.innerHTML = `${city}`;
    } else if (checkbox.checked) {
      h3.innerHTML = response.data.name;
    }
  }

  let apiKey = "b1bc3da2669fb6d87af27aa8196f619e";
  let units = "imperial";
  let api1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  if (searchInput.value) {
    let promise = axios.get(`${api1}&appid=${apiKey}`);
    promise.then(presentTemp);
  } else if (checkbox.checked) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let api2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

      let promise2 = axios.get(`${api2}&appid=${apiKey}`);
      promise2.then(presentTemp);
    });
  } else {
    h3.innerHTML = null;
    alert("Please Enter Location or Search Current Location");
  }
}

let form = document.querySelector("#location-form");
form.addEventListener("submit", search);