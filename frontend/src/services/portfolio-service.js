import axios from "axios";
import BACKEND_URL from "./config";

const API_URL = BACKEND_URL; //backend API address

class PortfolioService {
  getAll(cookie) {
    axios.defaults.withCredentials = true
    return axios.get(API_URL + "/user/portfolio/getAll", { headers: {"Authorization":cookie} });
  }
}

export default new PortfolioService();