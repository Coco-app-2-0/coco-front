import axiosInstance from "../axiosConfig"

export const getClients = async (idTienda: string) => {
  const response = await axiosInstance.get(`/controller_pos.php/obtenerClientes?idTienda=${idTienda}`)
  return response
}