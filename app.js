// =====================
// STATE MANAGEMENT
// =====================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// =====================
// DOM ELEMENTS
// =====================
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll("[data-filter]");

// =====================
// SAVE TO LOCAL STORAGE
// =====================
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// =====================
// CREATE (ADD TASK)
// =====================
function addTask() {
  const text = taskInput.value.trim();

  if (!text) return;

  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = "";

  saveTasks();
  renderTasks();
}

// =====================
// READ + FILTER + RENDER
// =====================
function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter(t => !t.completed);
  }

  if (currentFilter === "completed") {
    return tasks.filter(t => t.completed);
  }

  return tasks;
}

function renderTasks() {
  taskList.innerHTML = "";

  const filtered = getFilteredTasks();

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>

      <div>
        <button class="toggle-btn">✔</button>
        <button class="delete-btn">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// =====================
// UPDATE (TOGGLE COMPLETE)
// =====================
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id == id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  renderTasks();
}

// =====================
// DELETE TASK
// =====================
function deleteTask(id) {
  tasks = tasks.filter(task => task.id != id);

  saveTasks();
  renderTasks();
}

// =====================
// EVENT LISTENERS
// =====================

// Add task
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Event Delegation (VERY IMPORTANT)
taskList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = li.dataset.id;

  if (e.target.classList.contains("toggle-btn")) {
    toggleTask(id);
  }

  if (e.target.classList.contains("delete-btn")) {
    deleteTask(id);
  }
});

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    renderTasks();
  });
});

// =====================
// INITIAL LOAD
// =====================
renderTasks();let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll("[data-filter]");

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  taskList.innerHTML = "";

  let filtered = tasks;

  if (currentFilter === "active") {
    filtered = tasks.filter(t => !t.completed);
  } else if (currentFilter === "completed") {
    filtered = tasks.filter(t => t.completed);
  }

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>

      <div class="task-btns">
        <button class="done">✔</button>
        <button class="delete">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    completed: false
  });

  taskInput.value = "";
  save();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id == id ? { ...t, completed: !t.completed } : t
  );

  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id != id);

  save();
  render();
}

/* EVENTS */
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

taskList.addEventListener("click", e => {
  const id = e.target.closest("li").dataset.id;

  if (e.target.classList.contains("done")) toggleTask(id);
  if (e.target.classList.contains("delete")) deleteTask(id);
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    render();
  });
});

render();