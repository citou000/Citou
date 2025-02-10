import { createElement } from "./script/dom.js";
import { fetchTasks } from "./script/api.js";
import { TodoList } from "./script/components/todo.js";

const element = createElement("div", {
  class: "alert",
});
element.innerHTML = "Hello";
console.log(element);
try {
  let todos = await fetchTasks(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const response = new TodoList(todos);
  response.appendTo(document.getElementById("task-container"));
} catch {
  console.log("error");
}
