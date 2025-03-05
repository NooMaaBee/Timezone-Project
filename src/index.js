document.addEventListener("DOMContentLoaded", function () {
  const cities = [
    { id: "los-angeles", name: "Los Angeles", timezone: "America/Los_Angeles" },
    { id: "paris", name: "Paris", timezone: "Europe/Paris" },
    { id: "tokyo", name: "Tokyo", timezone: "Asia/Tokyo" },
  ];

  function updateCityTime(city) {
    let cityElement = document.querySelector(`#${city.id}`);
    if (cityElement) {
      let dateElement = cityElement.querySelector(".date");
      let timeElement = cityElement.querySelector(".time");
      let cityTime = moment().tz(city.timezone);

      dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
      timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
    }
  }

  function updateAllCitiesTime() {
    cities.forEach(updateCityTime);
  }

  function displayMainCities() {
    const citiesElement = document.querySelector("#cities");
    citiesElement.innerHTML = cities
      .map(
        (city) => `
      <div class="city" id="${city.id}">
        <div>
          <h2>${city.name}</h2>
          <div class="date"></div>
        </div>
        <div class="time"></div>
      </div>
    `
      )
      .join("");
    updateAllCitiesTime();
  }

  function updateCity(event) {
    let cityTimeZone = event.target.value;
    if (cityTimeZone === "current") {
      cityTimeZone = moment.tz.guess();
      const cityName = cityTimeZone.split("/")[1].replace("_", " ");
      displayCityTime(cityTimeZone, cityName);
    } else {
      displayCityTime(cityTimeZone, event.target.selectedOptions[0].text);
    }
  }

  function displayCityTime(cityTimeZone, cityName) {
    let cityTime = moment.tz(cityTimeZone);
    const citiesElement = document.querySelector("#cities");
    citiesElement.innerHTML = `<div class="city">
            <div>
                <h2>${cityName}</h2>
                <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
            </div>
            <div class="time">${cityTime.format(
              "h:mm:ss"
            )}<small>${cityTime.format("A")}</small></div>
        </div>
        <div class="back-to-home" id="back-to-home">
            <a href="#" id="return-link">Return</a>
        </div>`;
    document.getElementById("back-to-home").style.display = "block";
    document
      .getElementById("return-link")
      .addEventListener("click", (event) => {
        event.preventDefault();
        displayMainCities();
      });
  }

  document.getElementById("city").addEventListener("change", (event) => {
    if (event.target.value === "") {
      displayMainCities();
    } else {
      updateCity(event);
    }
  });

  function initCurrentLocation() {
    const cityTimeZone = moment.tz.guess();
    const cityName = cityTimeZone.split("/")[1].replace("_", " ");
    displayCityTime(cityTimeZone, cityName);
  }

  function displayUserTime() {
    const userDate = new Date();
    const options = { timeZoneName: "short" };
    const userTimeString = userDate.toLocaleTimeString("en-US", options);
    document.getElementById(
      "user-time"
    ).innerText = `Your current time: ${userTimeString}`;
  }

  displayUserTime();
  displayMainCities();
  setInterval(updateAllCitiesTime, 1000);
});
