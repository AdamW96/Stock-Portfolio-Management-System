import axios from "axios";
import BACKEND_URL from "./config";

const API_URL = BACKEND_URL;

class stockService  {
    getAllStock() {
        return axios.get(API_URL+"/stock/all")
    }
    getOneStockById(sid) {
        return axios.get(API_URL+`/stock/${sid}`)
    }
}

export default new stockService()