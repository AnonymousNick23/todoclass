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


li.innerHTML = `
<input type=checkbox ${todo.completed ? "checked" : ""} data-index=${index}>
<span>${todo.text}</span>
<button class="delete-btn" data-index=${index}>Delete</button>
`;
todoList.appendChild(li);
});


// update footer status
const activecount = todos.filter((t) => !t.completed).length;
taskCount.textContent = `${activecount} task${activecount !== 1 ? "s" : ""} left`;


// save to local storage

localStorage.setItem("todos", JSON.stringify(todos));

}
// actions
const addTodo = (text) => {
  constnewTodo = {
    id: Date.now(),
    text: text.trim(),
    completed : false,
  };
  todos.push(newTodo);
  renderTodos();
}


const toggleToggle = (id) => {
  todos = todos.map((todo)=> todo.id === id ? {...todo, completed: !todo.completed} : todo);
}








renderTodos()