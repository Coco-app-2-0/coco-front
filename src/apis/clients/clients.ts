import axiosInstance from "../axiosConfig"

export const getClients = async (idTienda: string) => {
  const response = await axiosInstance.get(`/controller_pos.php/listaClientes?idTienda=${idTienda}`)
  return response
}