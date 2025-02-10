export async function fetchTasks(url, options = {}) {
  const headers = { Accept: "application/JSON", ...options.headers };
  const r = await fetch(url, headers);
  if (r.ok) {
    return r.json();
  }
  throw new Error("Error server");
}

// export async function fetchTask(url, options = {}) {
//   const headers = { Accept: "application/JSON", ...options.headers };
//   const r = await fetch(url, headers);
//   if (r.ok) {
//     return r.json();
//   }
//   throw new Error("Server error");
// }
