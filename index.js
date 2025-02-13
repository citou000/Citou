import { createElement, update } from "./script/dom.js";
import { fetchTasks } from "./script/api.js";
import { TodoList, TodoListItems } from "./script/components/todo.js";

const element = createElement("div", {
  class: "alert",
});
element.innerHTML = "Hello";
try {
  let todos = await fetchTasks(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const response = new TodoList(todos);
  response.appendTo(document.getElementById("task-container"));
} catch {
  console.log("error");
}

const t = document.querySelector("#task-container");
const p = document.querySelector("#head p");
const taskAdd = document.querySelector(".add");
const overlay = document.querySelector(".overlay");
const clear = document.querySelectorAll(".clear");
const filter = document.querySelector("#filtering");
const taskAddButton = document.querySelector("#confirm");
const input = document.querySelector("#task-name");
const taskForm = document.querySelector("#input-wrapper");

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
    taskAppend({
      completed: false,
      id: t.children.length + 1,
      title: task,
      userId: 1,
    });
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
    document.querySelectorAll(".task").forEach((task) => {
      if (task.classList.contains("completed")) {
        task.style.display = "none";
      }
    });
  }
});
