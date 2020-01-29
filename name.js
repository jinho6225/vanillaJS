const clockBox = clockContainer.children
const nameContainer = document.querySelector('.js-name'),
  form = nameContainer.querySelector('form'),
  input = form.querySelector('input'),
  greeting = document.querySelector('.js-greetings'),
  refreshBtn = document.querySelector('.refresh');

const user_LS = "currentUser",
  SHOWING_CN = "showing"

function refresh() {
  localStorage.removeItem(user_LS)
  greeting.classList.remove(SHOWING_CN)
  form.classList.add(SHOWING_CN)
  refreshBtn.classList.add(SHOWING_CN)
  localStorage.removeItem(COORDS)
  localStorage.removeItem(todoList_LS)
  h5.innerHTML = ""
}



function paintName(text) {
  form.classList.remove(SHOWING_CN)
  greeting.classList.add(SHOWING_CN)
  const date = new Date()
  const hr = date.getHours()
  if (hr >= 17) {
    greeting.innerHTML = `Good evening, ${text}!`
  } else if (hr >= 12) {
    greeting.innerHTML = `Good afternoon, ${text}!`
  } else {
    greeting.innerHTML = `Good morning, ${text}!`
  }
  localStorage.setItem(user_LS, text)
}

function handleSubmit(e) {
  e.preventDefault()
  const name = input.value;
  paintName(name)
  input.value = ``
}

function askName() {
  form.classList.add(SHOWING_CN)
  form.addEventListener('submit', handleSubmit)
}

function loadName() {
  const currentUser = localStorage.getItem(user_LS)
  if (currentUser === null) {
    askName()
  } else {
    paintName(currentUser)
  }
}

function init() {
  loadName()
}

init()
