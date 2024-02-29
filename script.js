//https://api.openweathermap.org/data/2.5/weather?q=bangladesh,&appid=7b3d19962af0c68dc00937398791bd32&,metric

let search = document.querySelector("#search");
let form = document.querySelector("form");
let search_button = document.querySelector("#search-button");
let cel = document.querySelector("#cel");
let weather = document.querySelector("#weather");
let des = document.querySelector("#des");
let Feels_like = document.querySelector("#Feels-like");
let humidity = document.querySelector("#humidity");
let wind_speed = document.querySelector("#wind_speed");
let pressure = document.querySelector("#pressure");
let city_name = document.querySelector("#city-name");
let apikey = "7b3d19962af0c68dc00937398791bd32";
let apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function fulldata(city) {
  await axios(apiurl + city + `&appid=${apikey}`)
    .then((res) => {
      const data = res.data;
      console.log(data);
      let celsius = Math.round(data.main.temp);
      let cels = parseInt(celsius);
      cel.innerHTML = `${cels}°C`;
      // tamparatur start
      document.querySelector("#temperature").addEventListener("change", (e) => {
        let value = e.target.value;
        if (value == "fahrenheit") {
          cel.innerHTML = `${Math.ceil((9 / 5) * cels + 32)}°F`;
        } else if (value == "celsius") {
          cel.innerHTML = `${cels}°C`;
        }
      });
      weather.innerHTML = data.weather[0].main;
      des.innerHTML = data.weather[0].description;
      Feels_like.innerHTML = `${data.main.feels_like}°`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind_speed.innerHTML = ` ${data.wind.speed} m/s`;
      pressure.innerHTML = `${data.main.pressure} hpa`;
      city_name.innerHTML = search.value;
      search.value = "";
    })
    .catch((err) => {
      city_name.innerHTML = `${err.name} please correct erea name`;
      cel.innerHTML = "";
      weather.innerHTML = "";
      des.innerHTML = "";
      Feels_like.innerHTML = "";
      humidity.innerHTML = "";
      wind_speed.innerHTML = "";
      pressure.innerHTML = "";
    });
}
search_button.addEventListener("click", (e) => {
  e.preventDefault();
  fulldata(search.value.trim());
});

// loding program atart
let preloading = document.querySelector("#preloading");
window.addEventListener("load", () => {
  setTimeout(() => {
    preloading.style.display = "none";
  }, 500);
});
search_button.addEventListener("click", (e) => {
  e.preventDefault();
  preloading.style.display = "flex";
  setTimeout(() => {
    preloading.style.display = "none";
  }, 700);
});
// loding program end
