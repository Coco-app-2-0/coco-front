// import axiosInstance from "./axiosConfig";
import axios from "axios";

interface dataLogin {
  userName: string;
  password: string
}

export const authLogin = async (data: dataLogin) => {
  try {
    const auth = await axios.post('https://cocoapp.com.mx/sandbox/controller/controller_login.php/login', data)
    if (auth.status === 200) {
      return auth.data
    }
  } catch (error) {
    console.error(error)
  }
}


