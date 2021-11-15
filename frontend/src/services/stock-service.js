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
    stockSearchByName(enname) {
        return axios.post(API_URL+`/stock/partialFind`,{ "enname": enname} )
    }
    getStockCommentsById(sid){
        return axios.post(API_URL+`/stock/comment/findBySid`,{ "sid": sid} )
    }
    getBestStock() {
        return axios.post(API_URL+`/stock/best`,{} )
    }
    getWorstStock() {
        return axios.post(API_URL+`/stock/worst`,{} )
    }
}

export default new stockService()