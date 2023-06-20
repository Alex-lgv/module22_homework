const url = "wss://echo-ws-service.herokuapp.com/";

const input = document.querySelector(".input");
const btnSend = document.querySelector(".btnSend");
const btnOpen = document.querySelector(".btnOpen");
const btnClose = document.querySelector(".btnClose");
const btnErase = document.querySelector(".btnErase");
const btnGeo = document.querySelector(".btnGeo");
const output = document.querySelector(".output");

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

btnOpen.addEventListener("click", () => {
  websocket = new WebSocket(url);
  websocket.onopen = function (evt) {
    writeToScreen(
      `<span style="font-style: italic;">Соединение открыто</span>`
    );
  };
  websocket.onclose = function (evt) {
    writeToScreen(
      `<span style="font-style: italic;">Соединение закрыто</span>`
    );
  };
  websocket.onmessage = function (evt) {
    writeToScreen('<span style="color: blue;">Сервер: ' + evt.data + "</span>");
  };
  websocket.onerror = function (evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
  };
});

btnClose.addEventListener("click", () => {
  websocket.close();
  websocket = null;
});

btnErase.addEventListener("click", () => {
  output.innerHTML = "";
});

btnSend.addEventListener("click", () => {
  const message = input.value;
  writeToScreen("Вы: " + message);
  websocket.send(message);
  input.value = "";
});

btnGeo.addEventListener("click", () => {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    websocket.send(
      `Ваше местоположение на карте: https://www.openstreetmap.org/#map=8/${latitude}/${longitude}`
    );
  };
  const error = () => {
    websocket.send("Не удалось получить данные о местоположении");
  };
  if (!navigator.geolocation) {
    websocket.send("Не удалось получить данные о местоположении");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  writeToScreen("Вы: Отправляю данные о местоположении");
});

// Второй вариант с кнопкой "btnGeo", если не нужно выводить ответ от сервера:

// btnGeo.addEventListener("click", () => {
//   const success = (position) => {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     writeToScreen(
//       `Мое местоположение на карте: https://www.openstreetmap.org/#map=8/${latitude}/${longitude}`
//     );
//   };
//   const error = () => {
//     writeToScreen("Не удалось получить данные о местоположении");
//   };
//   if (!navigator.geolocation) {
//     writeToScreen("Не удалось получить данные о местоположении");
//   } else {
//     navigator.geolocation.getCurrentPosition(success, error);
//   }
// });
