function updateTime() {
  const cities = [
    { id: "los-angeles", timezone: "America/Los_Angeles" },
    { id: "paris", timezone: "Europe/Paris" },
    { id: "tokyo", timezone: "Asia/Tokyo" },
  ];

  cities.forEach((city) => {
    let cityElement = document.querySelector(`#${city.id}`);
    if (cityElement) {
      let dateElement = cityElement.querySelector(".date");
      let timeElement = cityElement.querySelector(".time");
      let cityTime = moment().tz(city.timezone);

      dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
      timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
    }
  });
}

function updateCity(event) {
  let cityTimeZone = event.target.value;
  const backToHome = document.getElementById("back-to-home");

  if (!cityTimeZone) {
    backToHome.style.display = "none";
    return;
  }

  if (cityTimeZone === "current") {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const cityTimeZone = moment.tz.guess();
        const cityName = cityTimeZone.replace("_", " ").split("/").pop();
        displayCityTime(cityTimeZone, "My current location");
        backToHome.style.display = "block";
      },
      () => {
        alert(
          "Unable to retrieve your location. Please allow location access."
        );
      }
    );
  } else {
    displayCityTime(
      cityTimeZone,
      cityTimeZone.split("/").pop().replace("_", " ")
    );
    backToHome.style.display = "block";
  }
}

function displayCityTime(cityTimeZone, cityName) {
  let cityTime = moment.tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `<div class="city">
    <div>
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
    </div>
    <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format(
    "A"
  )}</small></div>
  </div>`;
}

document.getElementById("city").addEventListener("change", updateCity);

function initCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentZone = moment.tz.guess();
        updateCity({ target: { value: currentZone } });
      },
      () => {
        alert(
          "Unable to retrieve your location. Please allow location access."
        );
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

updateTime();
setInterval(updateTime, 1000);
