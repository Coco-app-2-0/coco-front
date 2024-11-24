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
  configurable: boolean;
  configuracion: ConfigProduct;
  idProducto: number;
  nombre: string;
  precio: number;
  config?: boolean;
  quantity?: number;
}
export interface ProductTicket {
  configurable: boolean;
  configuracion: ConfigProduct;
  idProducto: number;
  nombre: string;
  precio: number;
  quantity: number;
  config?: boolean
}


export interface ConfigProduct {
  ingredientes: Ingrediente[];
  extras: ConfigProductExtras[];
  opciones: ConfigProductOption;
}

export interface ConfigProductOption {
  tipo_1: ConfigProductOptionType[]
  tipo_2: ConfigProductOptionType[]
}

export interface ConfigProductOptionType {
  idOpcion: number
  nombre:string 
  numero: number
  precio: number
}

export interface ConfigProductExtras {
  idExtra: number;
  nombre: string;
  numero: number;
  precio: number;
  cantidad?: number;
}


export interface TicketProduct {
  idProducto: number;
  cantidad: number;
  precio: number;
  configurable?: boolean;
  ingredientes: Ingrediente[];
  extras: Extra[];
  opciones: Opciones[];
  quantity?: number;
}

export interface Ingrediente {
  cantidad?: number
  idIngrediente: number;
  nombre: string;
  precios: number
}

export interface Extra {
  idExtra: number;
  cantidad: number;
  precio: number;
}

export interface Opciones {
  idOpcion: number
  nombre:string 
  numero: number
  precio: number
}


export interface Client {
  categoria: string;
  grado: string;
  grupo: string;
  idCliente: number;
  idHijo: number;
  nombreCliente: string;
  saldo: number;
  tipo: string;
}


export interface GuardarClienteLibretaRequest {
  tipo: number;
  nombre: string;
  apellidos: string;
  nivel: number;
  grado: number;
  grupo: string;
  idTienda: number;
  saldoInicial: number;
}

export interface GuardarClienteLibretaResponse {
  success: boolean;
  message: string;
  idCliente: string;
}
