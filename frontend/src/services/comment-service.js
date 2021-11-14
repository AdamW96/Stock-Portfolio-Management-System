import axios from "axios";
import BACKEND_URL from "./config";

const API_URL = BACKEND_URL;

class commentService  {
    pushComment(sid,value){
      axios.defaults.withCredentials = true
      const userData = JSON.parse(localStorage.getItem('user'))
      const cookie = userData?userData.cookie:null
      const data = {
        "sid":sid,
        "msg":value,
      }
      return axios.post(API_URL + "/user/comment/add",data, { headers: {"Authorization":cookie} });
    }
    editCommit(curMid,value){
      axios.defaults.withCredentials = true
      const userData = JSON.parse(localStorage.getItem('user'))
      const cookie = userData?userData.cookie:null
      const data = {
        "mid":curMid,
        "msg":value,
      }
      console.log('即将发送的edit data：',data)
      return axios.post(API_URL + "/user/comment/change",data, { headers: {"Authorization":cookie} });
    }

    deleteCommit(mid){
      axios.defaults.withCredentials = true
      const userData = JSON.parse(localStorage.getItem('user'))
      const cookie = userData?userData.cookie:null
      const data = {
        "mid":mid,
      }
      console.log('即将发送的delete data：',data)
      return axios.post(API_URL + "/user/comment/delete",data, { headers: {"Authorization":cookie} });
    }

}

export default new commentService()