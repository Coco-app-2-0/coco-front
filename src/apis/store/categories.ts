import axiosInstance from "../axiosConfig"

export const getCategories = async (idTienda: number) => {
  const response = await axiosInstance.get(`/controller_pos.php/obtenerCategorias?idTienda=${idTienda}`)
  return response
}

export const getProducts = async (idCategory: number, idTienda: number) => {
  const response = await axiosInstance.get(`/controller_pos.php/obtenerProductos?idCategoria=${idCategory}&idTienda=${idTienda}`)
  return response
}

