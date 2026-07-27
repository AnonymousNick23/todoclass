// 1. State (data layer)
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 2. DOM ELEMENTS
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-btn");
const taskCount = document.getElementById("task-count");

// 3. Functions
function renderTodos() {
  todoList.innerHTML = ""; // Clear existing elements

  todos.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""} data-id="${todo.id}">
      <span>${todo.text}</span>
      <button class="delete-btn" data-id="${todo.id}">Delete</button>
    `;
    todoList.appendChild(li);
  });

  // Update footer status
  const activeCount = todos.filter((t) => !t.completed).length;
  if (taskCount) {
    taskCount.textContent = `${activeCount} task${activeCount !== 1 ? "s" : ""} left`;
  }

  // Save to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 4. Actions
const addTodo = (text) => {
  if (!text.trim()) return; // Don't add empty tasks
  const newTodo = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
  };
  todos.push(newTodo);
  renderTodos();
};

const toggleTodo = (id) => {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
};

const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
};

// 5. Event Listeners

// Handle Form Submit to add task
if (todoForm) {
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = "";
    todoInput.focus();
  });
}

// Handle Checkbox Toggles & Delete Buttons via Event Delegation
if (todoList) {
  todoList.addEventListener("click", (e) => {
    const target = e.target;
    const id = Number(target.dataset.id);

    if (target.type === "checkbox") {
      toggleTodo(id);
    }

    if (target.classList.contains("delete-btn")) {
      deleteTodo(id);
    }
  });
}

// Handle Clear Completed Button
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed);
    renderTodos();
  });
}

// 6. Initial Render on Page Load
renderTodos();