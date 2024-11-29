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
  tipo_1: ConfigProductOptionType
  tipo_2: ConfigProductOptionType
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
  grado: number;
  grupo: string;
  idCliente: number;
  idHijo: number;
  nombreCliente: string;
  apellidosCliente: string;
  saldo: number;
  tipo: string;
  nivel?: string;
}

export interface ClientLibreta {
  idCliente: number; // Cambiar a number
  tipo: number; // Cambiar a number
  nombreCliente: string; // Sin cambios
  apellidosCliente: string; // Sin cambios
  nivel: string; // Sin cambios
  grado: string; // Cambiar a string
  grupo: string; // Sin cambios
  saldo: number; // Sin cambios
  // ... otras propiedades ...
}

export interface FormDataClient {
  nombre: string;
  apellidos: string;
  tipo: string;
  saldoInicial: string;
  nivel: number;
  grado: number;
  grupo: string;
  idTienda: number;
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
export interface updateClientLibreta {
  tipo: number;
  nombre: string;
  apellidos: string;
  nivel: number;
  grado: number;
  grupo: string;
  idTienda: number;
  saldoInicial: number;
  saldo?: number;
}

export interface GuardarClienteLibretaResponse {
  success: boolean;
  message: string;
  idCliente: string;
}


export interface BalanceClient {
  idCliente: number;
  monto: number;
  comentarios: string;
  idTienda: number;
}