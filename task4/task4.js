const getGeoBtn = document.querySelector(".getGeoBtn");
const geoInfoBtn = document.querySelector(".geoInfoBtn");
const eraseBtn = document.querySelector(".eraseBtn");
const lat = document.querySelector(".lat");
const lon = document.querySelector(".lon");
const zone = document.querySelector(".zone");
const date = document.querySelector(".date");
let doc;

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  lat.innerHTML = `${latitude}`;
  lon.innerHTML = `${longitude}`;
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);
};

const error = () => {
  lat.textContent = "Информация о широте недоступна";
  lon.textContent = "Информация о долготе недоступна";
};

getGeoBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    lat.textContent = "Информация о широте недоступна";
    lon.textContent = "Информация о долготе недоступна";
  } else {
    lat.textContent = "Определение широты...";
    lon.textContent = "Определение долготы...";
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

geoInfoBtn.addEventListener("click", () => {
  fetch(
    `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${lat.textContent}&long=${lon.textContent}`
  )
    .then((response) => {
      console.log("response", response);
      const result = response.json();
      console.log("result", result);
      return result;
    })
    .then((data) => {
      console.log(data);
      doc = data;
      if (lat.textContent !== "Информация о широте недоступна") {
        zone.innerHTML = `Временная зона: ${doc.timezone}`;
        date.innerHTML = `Местные дата и время: ${doc.date_time_txt}`;
      } else {
        zone.innerHTML = `Временная зона: недоступно`;
        date.innerHTML = `Местные дата и время: недоступно`;
      }
    })
    .catch(() => {
      console.log("error");
    });
});

eraseBtn.addEventListener("click", () => {
  lat.innerHTML = "";
  lon.innerHTML = "";
  zone.innerHTML = "";
  date.innerHTML = "";
  console.clear();
});
