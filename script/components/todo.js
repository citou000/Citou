import { createElement } from "../dom.js";
/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
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
      console.log(todo);
      let foo = new TodoListItems(todo);
      console.log(foo);
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
      checked: todo.completed ? "" : null,
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
  }

  appendTo(element) {
    console.log(this.#todo.completed);
    element.append(this.#task);
  }
}
