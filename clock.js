const clockContainer = document.querySelector('.js-clock'),
  clock = clockContainer.querySelector('h1');

const date = new Date()

function getTime() {
  const date = new Date()
  const hr = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  clock.innerHTML = `${hr < 10 ? `0${hr}` : hr}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
  return date
}

function init() {
  setInterval(getTime, 1000)
}

init()
