import { createElement } from "./script/dom.js";
import { fetchTasks } from "./script/api.js";
import { TodoList } from "./script/components/todo.js";

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
const overlay = document.querySelector("#overlay");
const clear = document.querySelectorAll(".clear");
const filterButton = document.querySelector(".filter");
const filter = document.querySelector("#filtering");
const close = document.querySelector(".close");

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

filterButton.addEventListener("click", () => {
  filter.style.display =
    getComputedStyle(filter)["display"] == "none" ? "flex" : "none";
});

close.addEventListener("click", () => {
  filter.style.display = "none";
});
