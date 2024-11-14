 import axiosInstance from "../axiosConfig";


 export const createOrderPost = async (data: any) => {
  try {
    const response = axiosInstance.post('/controller_pos.php/guardarOrden', data)
    console.log(response)
  } catch (error) {
    console.error('error',error)
  }
 }