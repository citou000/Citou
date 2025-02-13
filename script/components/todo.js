import { createElement, update } from "../dom.js";

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 */

export class TodoList {
  #todos = [];
  constructor(todos) {
    this.#todos = todos;
  }

  /**
   *
   * @param {HTMLElement} element
   */
  appendTo(element) {
    for (let todo of this.#todos) {
      let foo = new TodoListItems(todo);
      foo.appendTo(element);
    }
  }
}

export class TodoListItems {
  #todo = {};
  #task;
  /**
   *
   * @param {object} todo
   */
  constructor(todo) {
    this.#todo = todo;
    const deleteButton = createElement("span", {
      class: "material-symbols-rounded delete",
    });
    deleteButton.innerText = "delete";
    const check = createElement("input", {
      type: "checkbox",
      id: `${todo.id}`,
      checked: todo.completed ? '' : null,
    });
    check.addEventListener("click", () => {
      if (check.checked) {
        task.classList.add("checked");
      } else {
        task.parentElement.classList.remove("checked");
      }
    });
    const label = createElement("label", {
      for: `${todo.id}`,
    });
    label.innerText = `${todo.title}`;
    const content = createElement("span", {
      class: "content",
    });
    content.append(check);
    content.append(label);
    const task = createElement("div", {
      class: "task",
    });
    task.append(content);
    task.append(deleteButton);
    this.#task = task;
    deleteButton.addEventListener("click", () => {
      this.remove();
    });
    console.log(this.#todo);
  }

  appendTo(element) {
    element.append(this.#task);
    update();
  }

  remove() {
    this.#task.remove();
    update();
  }
}
