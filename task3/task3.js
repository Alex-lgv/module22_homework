const btn = document.querySelector(".btn");
const eraseBtn = document.querySelector(".eraseBtn");
const output = document.querySelector(".output");
const geo = document.querySelector(".geo");

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  geo.innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}`;
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);
};

const error = () => {
  geo.textContent = "Информация о местоположении недоступна";
};

btn.addEventListener("click", () => {
  output.innerHTML = `Screen width: ${window.screen.width}<br>Screen height: ${window.screen.height}`;
  console.log("Screen width:", window.screen.width);
  console.log("Screen height:", window.screen.height);
  if (!navigator.geolocation) {
    geo.textContent = "Информация о местоположении недоступна";
  } else {
    geo.textContent = "Определение местоположения...";
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

eraseBtn.addEventListener("click", () => {
  output.innerHTML = "";
  geo.innerHTML = "";
  console.clear();
});
