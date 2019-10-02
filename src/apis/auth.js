// @flow
/**
 * POST request for login
 * @param {username, password} body
 */
function loginApi(body) {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
}

export { loginApi };
