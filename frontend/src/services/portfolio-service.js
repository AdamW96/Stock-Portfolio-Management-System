import axios from "axios";
import BACKEND_URL from "./config";

const API_URL = BACKEND_URL; //backend API address

class PortfolioService {
  getAll() {
    axios.defaults.withCredentials = true
    const userData = JSON.parse(localStorage.getItem('user'))
    const cookie = userData?userData.cookie:null
    return axios.get(API_URL + "/user/portfolio/getAll", { headers: {"Authorization":cookie} });
  }
  createNew(data) {
    axios.defaults.withCredentials = true
    const userData = JSON.parse(localStorage.getItem('user'))
    const cookie = userData?userData.cookie:null
    return axios.post(API_URL + "/user/portfolio/add",data, { headers: {"Authorization":cookie} });
  }
  reName(data) {
    axios.defaults.withCredentials = true
    const userData = JSON.parse(localStorage.getItem('user'))
    const cookie = userData?userData.cookie:null
    return axios.post(API_URL + "/user/portfolio/rename",data, { headers: {"Authorization":cookie} });
  }
  deletePort(data) {
    axios.defaults.withCredentials = true
    const userData = JSON.parse(localStorage.getItem('user'))
    const cookie = userData?userData.cookie:null
    return axios.post(API_URL + "/user/portfolio/deleteOne",data, { headers: {"Authorization":cookie} });
  }
  portGain(pid) {
    axios.defaults.withCredentials = true
    const userData = JSON.parse(localStorage.getItem('user'))
    const cookie = userData?userData.cookie:null
    return axios.post(API_URL + "/portfolio/totalGain",{pid:pid}, { headers: {"Authorization":cookie} });
  }
}

export default new PortfolioService();