/*DOM ELEMENT REFERENCES*/

const taskInput = document.getElementById("taskInput");
const todoForm = document.getElementById("todoForm");
const taskList = document.getElementById("taskList");
const numbers = document.getElementById("numbers");
const progressBar = document.getElementById("progress");
const themeToggle = document.getElementById("themeToggle");
const motivationText = document.getElementById("motivationText");

const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
let currentFilter = "all";

/* APP STATE */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;


/* INITIAL LOAD */
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  applyTheme();
});

/*  DARK / LIGHT MODE */
themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
  applyTheme();
});

function applyTheme() {
  if (darkMode) {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
}

/* ADD TASK */
todoForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  const task = { id: Date.now(), text, completed: false };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

/*  RENDER TASKS */
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    // FILTER LOGIC
    if (currentFilter === "active" && task.completed) return;
    if (currentFilter === "completed" && !task.completed) return;

    const li = document.createElement("li");
    li.setAttribute("draggable", true);
    li.dataset.id = task.id;

    li.addEventListener("dragstart", dragStart);
    li.addEventListener("dragover", dragOver);
    li.addEventListener("drop", drop);

    const taskWrapper = document.createElement("div");
    taskWrapper.style.display = "flex";
    taskWrapper.style.alignItems = "center";
    taskWrapper.style.flex = "1";
    taskWrapper.style.gap = "10px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      if (task.completed) celebrate();
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const startEdit = () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.classList.add("edit-input");
      taskWrapper.replaceChild(input, span);
      input.focus();
      input.select();

      const saveEdit = () => {
        const newText = input.value.trim();
        if (newText) task.text = newText;
        saveTasks();
        renderTasks();
      };

      input.addEventListener("keypress", e => { if (e.key === "Enter") saveEdit(); });
      input.addEventListener("keydown", e => { if (e.key === "Escape") renderTasks(); });
      input.addEventListener("blur", saveEdit);
    };

    taskWrapper.appendChild(checkbox);
    taskWrapper.appendChild(span);

    const buttonWrapper = document.createElement("div");
    buttonWrapper.style.display = "flex";
    buttonWrapper.style.gap = "8px";

    const editBtn = document.createElement("button");
    editBtn.textContent = "✎";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", startEdit);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    buttonWrapper.appendChild(editBtn);
    buttonWrapper.appendChild(deleteBtn);

    li.appendChild(taskWrapper);
    li.appendChild(buttonWrapper);
    taskList.appendChild(li);
  });

  updateStats();
}

/*  DRAG & DROP */
let draggedItem = null;
function dragStart() { draggedItem = this; }
function dragOver(e) { e.preventDefault(); }
function drop(e) {
  e.preventDefault();
  if (this === draggedItem) return;

  const draggedIndex = tasks.findIndex(t => t.id == draggedItem.dataset.id);
  const targetIndex = tasks.findIndex(t => t.id == this.dataset.id);
  const [removed] = tasks.splice(draggedIndex, 1);
  tasks.splice(targetIndex, 0, removed);

  saveTasks();
  renderTasks();
}

/* STATS & MOTIVATION */
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  numbers.textContent = total;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  progressBar.style.width = percent + "%";

  if (total === 0) motivationText.textContent = "Add a task to get started!";
  else if (completed === total) motivationText.textContent = "🎉 Well done! You're all done!";
  else motivationText.textContent = "Keep it up!";
}

/* CELEBRATION */
function celebrate() {
  confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  const popup = document.createElement("div");
  popup.classList.add("celebration-popup");
  popup.textContent = "🎉 Task Completed!";
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

/*SAVE TO LOCAL STORAGE */
function saveTasks() { localStorage.setItem("tasks", JSON.stringify(tasks)); }

/* FILTER & CLEAR BUTTONS */
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTasks();
    });
});

clearCompletedBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
});
