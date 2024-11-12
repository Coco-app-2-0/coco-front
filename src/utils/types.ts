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
}
export interface ProductTicket {
  configurable: boolean;
  configuracion: ConfigProduct;
  idProducto: number;
  nombre: string;
  precio: number;
  quantity: number;
}


export interface ConfigProduct {
  ingredientes: Ingrediente[];
  extras: ConfigProductExtra[];
  complementos: ConfigProductComplements[];
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


export interface TicketProduct {
  idProducto: number;
  cantidad: number;
  precio: number;
  ingredientes: Ingrediente[];
  extras: Extra[];
  complementos: Complemento[];
}

export interface Ingrediente {
  idIngrediente: number;
  nombre: string;
}

export interface Extra {
  idExtra: number;
  cantidad: number;
  precio: number; // precio individual del extra
}

export interface Complemento {
  idComplemento: number;
  precio: number;
  tipo: number;
}

