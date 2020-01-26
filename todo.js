const jsTodo = document.querySelector('.js-todo')
const todoForm = jsTodo.querySelector('form')
const listOfTodo = todoForm.querySelector('input')
const ulTodo = document.querySelector('.js-todolist')

const todoList_LS = "list";
const todoArr = [];

function saveTodo() {
  localStorage.setItem(todoList_LS, JSON.stringify(todoArr))
}

function handleDelete(e) {
  e.preventDefault()
  var targetId = e.target.parentElement.id
  var liArr = Array.from(document.querySelectorAll('li'))
  for (let i = 0; i < liArr.length; i++) {
    if (Number(targetId) === i+1) {
      var ele = document.getElementById(i+1);
      ele.remove()
    }
  }
  for (let i = 0; i < todoArr.length; i++) {
    if(Number(targetId) === todoArr[i].id) {
      todoArr.splice(i,1)
    }
  }
  saveTodo()
}

function printTodo(text) {
  var li = document.createElement('li')
  var bTn = document.createElement('span')
  bTn.innerText  = ' ❌'
  bTn.addEventListener('click', handleDelete)
  var span = document.createElement('span')
  var newId = todoArr.length + 1
  span.innerText = text;
  li.appendChild(span)
  li.appendChild(bTn)
  li.setAttribute('id', newId)
  ulTodo.appendChild(li)
  let todoObj = {
    text: text,
    id: newId
  }
  todoArr.push(todoObj)
  saveTodo()
}

function something(obj) {
  printTodo(obj.text)
}

function askPlan() {
  var h5 = document.createElement('h5')
  h5.textContent = "What is your plan today?"
  todoForm.prepend(h5)
}

function handleSubmit(e) {
  e.preventDefault()
  var currentValue = listOfTodo.value;
  printTodo(currentValue)
  listOfTodo.value = ""
}

function loadTodo() {
  const todoList = localStorage.getItem(todoList_LS)
  if (todoList === null) {
    askPlan()
  } else {
    let parseTodoList = JSON.parse(todoList)
    for (let i = 0; i < parseTodoList.length; i++) {
      something(parseTodoList[i])
    }
  }
}

function init() {
  loadTodo()
  todoForm.addEventListener('submit', handleSubmit)
}

init()
