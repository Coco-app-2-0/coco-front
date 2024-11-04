export interface UserInfoType {
  autoPrint: number
  idTienda: number
  idUsuario: number
  intervaloPedidos: number
  intervaloPrepracion: number
  logotipo: string
  nombreTienda: string
  respuesta: number
  success: boolean
  tipoTienda: number
}


export interface CategoryTypes {
  id: number
  logo: string
  nombre: string
}


export interface ProductTypes {
  configurable: boolean
  configuracion: ConfigProduct
  idProducto: number
  nombre: string
  precio: number
}


export interface ConfigProduct {
  extras: ConfigProductExtra[];
  complementos: ConfigProductComplements[][]
}

export interface ConfigProductExtra {
  idExtra: number;
  nombre: string;
  precio: number;
}

export interface ConfigProductComplements {
  etiqueta: string;
  idComplemento: number;
  nombre: string;
  numero: number;
  precio: string;
  tipo: string;
}