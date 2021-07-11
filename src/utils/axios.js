import axios from "axios"


const instance = axios.create({
  baseURL: "https://foodorderapp-7c91c-default-rtdb.firebaseio.com/",
});

export default instance