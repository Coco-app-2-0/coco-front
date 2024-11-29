import { BalanceClient, GuardarClienteLibretaRequest } from "@/utils/types"
import axiosInstance from "../axiosConfig"

export const getClients = async (idTienda: string) => {
  const response = await axiosInstance.get(`/controller_pos.php/listaClientes?idTienda=${idTienda}`)
  return response
}
export const getClientsLibreta = async (idTienda: string) => {
  const response = await axiosInstance.get(`/controller_pos.php/obtenerClientesLibreta?idTienda=${idTienda}`)
  return response
}

export const createClient = async (data: GuardarClienteLibretaRequest) => {
  const response = await axiosInstance.post(`/controller_pos.php/guardarClienteLibreta`, data)
  return response
}

export const updateClient = async (data: any) => {
  const response = await axiosInstance.post(`/controller_pos.php/editarClienteLibreta`, data)
  return response
}
export const updateBalanceClient = async (data: BalanceClient) => {
  const response = await axiosInstance.post(`/controller_pos.php/agregarSaldoLibreta`, data)
  return response
}
export const updateBalanceClientMinus = async (data: BalanceClient) => {
  const response = await axiosInstance.post(`/controller_pos.php/restarSaldoLibreta`, data)
  return response
}


export const deleteClient = async (idCliente: number) => {
  const response = await axiosInstance.post(`/controller_pos.php/eliminarClienteLibreta`, { idCliente })
  return response
}
