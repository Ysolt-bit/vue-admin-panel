import request from "./request";

export function getUsers() {
  return request.get("/users");
}
export function getUserById(id) {
  return request.get(`/users/${id}`);
}
export function createUser(data) {
  return request.post("/users", data);
}