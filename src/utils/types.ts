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
  precio: number; // precio individual del extra
}

export interface Opciones {
  idOpcion: number
  nombre:string 
  numero: number
  precio: number
}

