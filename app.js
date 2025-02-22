import { createElement, update } from "./script/dom.js";
import { fetchTasks } from "./script/api.js";
import { TodoList, TodoListItems } from "./script/components/todo.js";

const t = document.querySelector("#task-container");
const p = document.querySelector("#head p");
const taskAdd = document.querySelector(".add");
const overlay = document.querySelector(".overlay");
const clear = document.querySelectorAll(".clear");
const filter = document.querySelector("#filtering");
const taskAddButton = document.querySelector("#confirm");
const input = document.querySelector("#task-name");
const taskForm = document.querySelector("#input-wrapper");

export let todos;

function adjustOverlayHeight() {
  document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
}

window.addEventListener('resize', adjustOverlayHeight);
adjustOverlayHeight(); /* Run once on load */

if (localStorage.getItem("todos") == null) {
  todos = [];
} else {
  todos = JSON.parse(localStorage.getItem("todos"));
}

// localStorage.getItem(todos);

try {
  // todos = await fetchTasks(
  //   "https://jsonplaceholder.typicode.com/todos?_limit=5"
  // );
  console.log(todos);
  const response = new TodoList(todos);
  response.appendTo(document.getElementById("task-container"));
} catch (e) {
  console.log("Error loading tasks", e);
}

p.innerText = `Today you have ${t.children.length} tasks left`;

// Assuming you want to add an event listener to taskAdd
taskAdd.addEventListener("click", () => {
  overlay.style.display = "flex";
  input.focus();
});

clear.forEach((bar) => {
  bar.addEventListener("click", () => {
    overlay.style.display = "none";
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    alert("Please enter a task");
    input.value = "";
    input.focus();
  } else {
    const task = input.value;
    let taskElement = {
      completed: false,
      id: t.children.length + 1,
      title: task,
      userId: 1,
    };
    taskAppend(taskElement);
    console.log("line 66, todos content ", todos);
    todos.push(taskElement);
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

function taskAppend(task) {
  const taskItems = new TodoListItems(task);
  taskItems.appendTo(t);
  overlay.style.display = "none";
  input.value = "";
  update();
}

filter.addEventListener("click", (e) => {
  if (!e.target.classList.contains("active")) {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    for (let i = 0; i < t.children.length; i++) {
      t.children[i].style.display = "flex";
    }
    if (e.target.id === "done") {
      for (let i = 0; i < t.children.length; i++) {
        // if(t.children[i].chi)
        if (!t.children[i].children[0].children[0].checked) {
          t.children[i].style.display = "none";
        }
      }
    } else if (e.target.id === "pending") {
      for (let i = 0; i < t.children.length; i++) {
        // if(t.children[i].chi)
        if (t.children[i].children[0].children[0].checked) {
          t.children[i].style.display = "none";
        }
      }
    } else {
      for (let i = 0; i < t.children.length; i++) {
        t.children[i].style.display = "flex";
      }
    }
  }
});
