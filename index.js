const urlParams = new URLSearchParams(location.search);
let roomId = urlParams.get("id");

if (!roomId) {
  roomId = Math.floor(Math.random() * 10000 + 10000);
  window.location.search = `id=${roomId}`;
}

const textArea = document.querySelector("textarea");
const worker = new Worker("worker.js");

const wsurl = `wss://free3.piesocket.com/v3/${roomId}?api_key=hrZqQ70IP5FqHZ2TevkjLamaZ0r0F1NSJxRK7eEd&notify_self`

const socket = new WebSocket(wsurl);

const debounce = (func, timer = 250) => {
  let timeId = null;
  return (...args) => {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      func(...args);
    }, timer);
  };
};

socket.onopen = () => {};

const ae = new Audio("./src/notif.mp3");
socket.onmessage = (e) => {
  //   console.log(e.data);
  ae.play();
  textArea.value = e.data;
};

textArea.addEventListener(
  "input",
  debounce((e) => {
    console.log(e.target.value);
    socket.send(e.target.value);
  })
);