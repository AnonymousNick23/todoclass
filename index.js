// alert("Hello, World!");
// 1. State (data layer)
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 2.DOM ELEMENTS
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-btn");
const taskCount = document.getElementById("task-count");



// 3. Functions

function renderTodos() {
  todoList.innerHTML = "";



//   render
todos.forEach((todo, index) => {
   const li = document.createElement("li");
   if (todo.completed) li.classList.add("completed");



});
}