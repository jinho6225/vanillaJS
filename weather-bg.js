const API_KEYS = 'b932cb7ed5dadf023a482aeb62417bf3';
const COORDS = 'coords';
const weatherContainer = document.querySelector('.js-weather');
const h5 = weatherContainer.querySelector('h5');
const UNSPLASH_API_KEYS =
  '4a6fd5d5a4df74080cf086bad725c8cab2430318884a81a01c9d2d629c7e06ea';
const body = document.querySelector('body');

function getWeatherNImg(lati, longi) {
  let id;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_KEYS}&units=imperial
  `)
    .then(res => res.json())
    .then(data => {
      var city = data.name;
      var temp = data.main.temp;
      h5.innerHTML = `Location: ${city}, Temperature: ${temp} &#8457;`;
      var icon = document.createElement('img');
      icon.setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      icon.setAttribute('id', `${data.weather[0].main}`);
      id = data.weather[0].main;
      h5.append(icon);
    });
  fetch(
    `https://api.unsplash.com/photos?page=1&query=${id}&client_id=${UNSPLASH_API_KEYS}`
  )
    .then(res => res.json())
    .then(data => {
      var randomNum = Math.floor(Math.random() * 10);
      var bg = data[randomNum].urls.full;
      body.setAttribute('style', `background-image: url("${bg}")`);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let coordsObj = {
    latitude: latitude,
    longitude: longitude
  };
  saveCoords(coordsObj);
  getWeatherNImg(coordsObj.latitude, coordsObj.longitude);
}

function handleGeoError() {
  console.log('cant access geo info');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeatherNImg(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
