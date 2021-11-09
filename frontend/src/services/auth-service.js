import axios from "axios";
import BACKEND_URL from "./config";

const API_URL = BACKEND_URL; //backend API address

class AuthService {
  signin(email, password) {
    axios.defaults.withCredentials = true
    return axios.post(API_URL + "/user/signIn", { email, pwdMd5: password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(firstName, lastName, userName, email, password) {
    return axios.post(API_URL + "/user/register", {
      firstname: firstName,
      lastname: lastName,
      username: userName,
      email,
      pwdMd5: password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
