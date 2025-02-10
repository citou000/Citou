export async function fetchJSON(url, options = {}) {
  const headers = { Accept: "application/JSON", ...options.headers };
  const r = await fetch(url, {
    ...options,
    headers,
  });
  if (r.ok) {
    return r.json();
  }

  throw new Error("Impossible");
}
