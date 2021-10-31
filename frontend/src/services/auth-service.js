import axios from "axios";

const API_URL = "http://localhost:8080"; //backend API address

class AuthService {
  signin(email, password) {
    return axios.post(API_URL + "user/signIn", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(firstName, lastName, userName, email, password) {
    return axios.post(API_URL + "user/register", {
      firstname: firstName,
      lastname: lastName,
      username: userName,
      email,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
