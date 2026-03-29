# 📝 Todo App

A simple, interactive Todo App built with **HTML, CSS, and JavaScript**.  
Manage daily tasks with progress tracking, motivational messages, drag-and-drop reordering, and dark mode support.

---

## 🚀 Features

- ✅ Add new tasks
- ✏️ Edit tasks (click the edit button)  
- ❌ Delete tasks  
- 📦 Drag & drop to reorder tasks  
- 📊 Progress bar tracking completion  
- 🎉 Celebration popup when a task is completed  
- 💬 Motivational messages on task completion  
- 🌙 Dark / Light mode toggle  
- 💾 LocalStorage support (tasks saved automatically)  
- 🔍 Filter tasks: All / Active / Completed  
- 🗑️ Clear completed tasks  

---

## 🧠 Motivation System

- When tasks are being completed → shows a **motivational message**  

- When all tasks are completed → displays:  🎉 Well done! You're all done!  

- When no tasks exist → shows:  Add a task to get started!

---

## 🛠️ Technologies Used

- HTML5  
- CSS3 (Flexbox, animations, responsive design)  
- Vanilla JavaScript (DOM manipulation, LocalStorage, drag-and-drop)  
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) for celebration effect

---

## 📂 Project Structure
```bash
todo-app/
├── index.html  #main html file
├── README.md   # Project documentation
├── script.js   # js functionality
└── style.css   # styling
```


---

## 📦 Installation

1. git clone https://github.com/bellabell1/my-todo-app.git

2. Open `index.html` in your browser  

No additional setup required 🎉

---

## 🎯 How It Works

- Tasks are stored in **LocalStorage**  
- Each task contains:  
  - `id`  
  - `text`  
  - `completed` status  
  
- The UI automatically updates with `renderTasks()`  
- Progress is calculated based on completed tasks  
- Motivation messages and celebration popups are triggered when tasks are completed  

---

## 📱 Responsive Design

Works on:  
- Desktop  
- Tablet  
- Mobile devices  

---

## 👨‍💻 Author

  **Isabella Njunkom Kindo**  
