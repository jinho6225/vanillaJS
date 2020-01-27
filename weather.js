const API_KEYS = "b932cb7ed5dadf023a482aeb62417bf3";
const COORDS = "coords"
const weatherContainer = document.querySelector('.js-weather')
const h5 = weatherContainer.querySelector('h5')

function getWeather(lati, longi) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_KEYS}&units=imperial
  `).then(function(response) {
    return response.json()
  })
  .then(function(json) {
    var name = json.name;
    var temp = json.main.temp
    h5.innerHTML = `Location: ${name}, Temperature: ${temp} &#8457;`
  })
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let coordsObj = {
    latitude: latitude,
    longitude: longitude
  }
  saveCoords(coordsObj)
  getWeather(coordsObj.latitude, coordsObj.longitude)
}

function handleGeoError() {
  console.log('cant access geo info')
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)

}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords()
  } else {
    const parsedCoords = JSON.parse(loadedCoords)
    getWeather(parsedCoords.latitude, parsedCoords.longitude)
  }

}

function init() {
  loadCoords()
}

init()
