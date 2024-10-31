// import axiosInstance from "./axiosConfig";
import axios from "axios";

interface dataLogin {
  username: string;
  password: string
}

export const authLogin = async (data: dataLogin) => {
  console.log(data)
  try {
    const auth = await axios.post('https://cocoapp.com.mx/sandbox/controller/controller_login.php/login', data)
    console.log('poke auth', auth)
    if (auth.status === 200) {
      return auth.data
    }
  } catch (error) {
    console.error(error)
  }
}


