import axiosInstance from "./axiosConfig";
import axios from "axios";

interface dataLogin {
  username: string;
  password: string
}

export const authLogin = async (data: dataLogin) => {
  console.log(data)
  const auth = await axios.post('https://cocoapp.com.mx/sandbox/controller/controller_login.php', data)
  console.log('poke auth', auth)
  return auth
}


