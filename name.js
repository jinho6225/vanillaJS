const nameContainer = document.querySelector('.js-name'),
  form = nameContainer.querySelector('form'),
  input = form.querySelector('input'),
  greeting = document.querySelector('.js-greetings'),
  refreshBtn = document.querySelector('.refresh')

const user_LS = "currentUser",
  SHOWING_CN = "showing"

function refresh() {
  localStorage.removeItem(user_LS)
  greeting.classList.remove(SHOWING_CN)
  form.classList.add(SHOWING_CN)
  refreshBtn.classList.add(SHOWING_CN)
}

function paintName(text) {
  form.classList.remove(SHOWING_CN)
  greeting.classList.add(SHOWING_CN)
  greeting.innerHTML = `Hello ${text}`
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
