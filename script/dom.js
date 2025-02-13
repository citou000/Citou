// /**
//  *
//  * @param {string} tagName
//  * @param {object} attributes
//  */

// export function createElement(tagName, attributes) {
//   let tag = document.createElement(tagName);
//   for (const [key, value] of Object.entries(attributes)) {
//     tag.setAttribute(key, value);
//   }
//   return tag;
// }

/**
 *
 * @param {string} tagName
 * @param {object} properties
 */

export function createElement(tagName, properties) {
  /**
   * @property {HTMLElement} element
   */
  const element = document.createElement(tagName);
  let props = Object.entries(properties);
  for (const [key, value] of props) {
    if (value !== null) {
      element.setAttribute(key, value);
    }
  }
  return element;
}

const p = document.querySelector("#head p");
const t = document.querySelector("#task-container");

export function update() {
  p.innerText = `Today you have ${t.children.length} tasks`;
}

/**
 *
 * @param {HTMLElement} element
 * @param {Array} states
 */
