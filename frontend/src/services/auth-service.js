import axios from "axios";
import BACKEND_URL from "./config";
import md5 from "js-md5";
const API_URL = BACKEND_URL; //backend API address

class AuthService {
  signin(email, password) {
    axios.defaults.withCredentials = true
    const pwdMd5 = md5(password)
    return axios.post(API_URL + "/user/signIn", { email, pwdMd5});
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(firstName, lastName, userName, email, password) {
    const pwdMd5 = md5(password)
    return axios.post(API_URL + "/user/register", {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email,
      pwdMd5: pwdMd5,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
