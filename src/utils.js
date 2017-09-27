export function post(url, data) {
  return fetch(url, { method: "post", body: JSON.stringify(data) })
    .then(response => {
      return handleResponse(response, url);
    })
    .catch(error => {
      return Promise.reject(new Error(error.message));
    });
}
export function get(url) {
  return fetch(url)
    .then(response => {
      return handleResponse(response, url);
    })
    .catch(error => {
      return Promise.reject(new Error(error.message));
    });
}

export function handleResponse(response, url) {
  if (response.ok) {
    const contentType = response.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      return response.json().catch(error => {
        return Promise.reject(new Error("Invalid JSON: " + error.message));
      });
    }

    if (contentType.includes("text/html")) {
      return response
        .text()
        .then(html => {
          return {
            page_type: "generic",
            html: html
          };
        })
        .catch(error => {
          return Promise.reject(new Error("HTML error: " + error.message));
        });
    }

    return Promise.reject(new Error("Invalid content type: " + contentType));
  }

  if (response.status === 404) {
    return Promise.reject(new Error("Page not found: " + url));
  }
  if (response.status === 500) {
    return Promise.reject(new Error("500 error: " + url));
  }
  return Promise.reject(new Error("HTTP error: " + response.status));
}
