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
  extras: ConfigProductExtras[];
  opciones: ConfigProductOption;
}

export interface ConfigProductOption {
  tipo_1: {
    etiqueta: string;
    multiple: boolean;
    items: ConfigProductOptionType[]
  };
  tipo_2: {
    etiqueta: string;
    multiple: boolean;
    items: ConfigProductOptionType[]
  }
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
}


export interface TicketProduct {
  idProducto: number;
  cantidad: number;
  precio: number;
  ingredientes: Ingrediente[];
  extras: Extra[];
  opciones: Opciones[];
}

export interface Ingrediente {
  idIngrediente: number;
  nombre: string;
  precios: number
}

export interface Extra {
  idExtra: number;
  cantidad: number;
  precio: number; // precio individual del extra
}

export interface Opciones {
  idOpcion: number
  nombre:string 
  numero: number
  precio: number
}

