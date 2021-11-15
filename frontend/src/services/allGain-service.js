import axios from "axios";
import BACKEND_URL from "./config";

const API_URL = BACKEND_URL;

class allGainService  {
    getAllGain(){
      axios.defaults.withCredentials = true
      const userData = JSON.parse(localStorage.getItem('user'))
      const cookie = userData?userData.cookie:null
      return axios.post(API_URL + "/user/totalGain",{}, { headers: {"Authorization":cookie} });
    }

}

export default new allGainService()