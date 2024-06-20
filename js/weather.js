async function search(a) {
  try {
    let res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=96fce6023c7c46a4a5415516242006&q=${a}&days=3`
    );
    let data = await res.json();
    displayCurrent(data.location, data.current),
      displayAnother(data.forecast.forecastday);
  } catch (error) {
    console.log(error);
  }
}
document.getElementById("search").addEventListener("keyup", (e) => {
  search(e.target.value);
});
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function displayCurrent(location, current) {
  if (null != current) {
    const date = new Date(current.last_updated.replace(" ", "T"));
    let content = `<div class="col-lg-4 p-0">
              <div
                class="today-date d-flex justify-content-between align-items-center"
              >
                <p class="m-0 fs-6">${days[date.getDay()]}</p>
                <p class="m-0 fs-6">${
                  date.getDate() + monthNames[date.getMonth()]
                }</p>
              </div>
              <div class="today">
                <p class="location">${location.name}</p>
                <p class="degree-today">${current.temp_c}<sup>o</sup>C</p>
                <img src="https:${current.condition.icon}" alt="forcaste-img" />
                <p class="forcaste-describ">${current.condition.text}</p>
                <div class="icons d-flex align-items-center gap-4">
                  <div class="umberella d-flex gap-1">
                    <img src="./img/icon-umberella.png" alt="umberella" />
                    <p class="m-0">20%</p>
                  </div>
                  <div class="wind d-flex gap-1">
                    <img src="./img/icon-wind.png" alt="wind speed" />
                    <p class="m-0">18km/h</p>
                  </div>
                  <div class="compass d-flex gap-1">
                    <img src="./img/icon-compass.png" alt="compass" />
                    <p class="m-0">East</p>
                  </div>
                </div>
              </div>
            </div>`;

    document.getElementById("forecast").innerHTML = content;
  }
}
function displayAnother(forecast) {
  let content = "";
  for (let i = 1; i < forecast.length; i++)
    content += `<div class="col-lg-4 p-0">
              <div class="tomorrow-date text-center">
                <p class="m-0 fs-6">${
                  days[new Date(forecast[i].date.replace(" ", "T")).getDay()]
                }</p>
              </div>
              <div class="tomorrow d-flex flex-column align-items-center h-100">
                <div class="img mb-4 mt-3">
                  <img src="https:${
                    forecast[i].day.condition.icon
                  }" alt="forcaste-img" class="" />
                </div>
                <p class="degree-tomorrow text-white m-0">${
                  forecast[i].day.maxtemp_c
                }<sup>o</sup>C</p>
                <p class="">${forecast[i].day.mintemp_c}<sup>o</sup>C</p>
                <p class="forcaste-describ">${
                  forecast[i].day.condition.text
                }</p>
              </div>
            </div>`;

  document.getElementById("forecast").innerHTML += content;
}
search("cairo");
