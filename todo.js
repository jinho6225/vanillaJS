const jsTodo = document.querySelector('.js-todo')
const todoForm = jsTodo.querySelector('form')
const listOfTodo = todoForm.querySelector('input')
const ulTodo = document.querySelector('.js-todolist')

const todoList_LS = "list";
var todoArr = [];

function saveTodo() {
  localStorage.setItem(todoList_LS, JSON.stringify(todoArr))
}

function handleDelete(e) {
  var targetId = e.target;
  var li = targetId.parentNode;
  ulTodo.removeChild(li)
  const cleanTodo = todoArr.filter(function(ele) {
    return ele.id !== Number(li.id);
  })
  todoArr = cleanTodo;
  saveTodo()
}

function printTodo(text) {
  var bTn = document.createElement('span')
  var li = document.createElement('li')
  bTn.innerText  = '❌ '
  bTn.addEventListener('click', handleDelete)
  var span = document.createElement('span')
  var newId = todoArr.length + 1
  span.innerText = text;
  li.appendChild(bTn)
  li.appendChild(span)
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
