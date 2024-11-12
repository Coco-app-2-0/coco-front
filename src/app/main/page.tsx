'use client'
import NavInfo from '@/components/NavInfo/NavInfo'
import { AuthContext } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import styles from './main.module.css'
import Loading from '@/components/Loading/Loading';
import CategoryList from '@/components/CategoryList/CategoryList';
import { getCategories, getProducts } from '@/apis/store/categories';
import { Button, Typography } from '@mui/material';
import Ticket from '@/components/Ticket/Ticket';
import { CategoryTypes, ProductTicket, ProductTypes } from '@/utils/types';
import ProductItem from '@/components/ProductItem/ProductItem';
import CostBreakdown from '@/components/CostBreakdown/CostBreakdown';


const Main = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext) || {}
  const pathname = usePathname()
  const router = useRouter(); 
  const [categories, setCategories] = useState<CategoryTypes[]>([])
  const [valueTab, setValueTab] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductTypes[]>([])
  const [activeIndexCat, setActiveIndexCat] = useState<number>(0);
  const [ selectedProducts, setSelectedProducts ] = useState<ProductTicket[]>([])
  const [ subTotal, setSubtotal ] = useState<number>(0)
  // const [ ticketTotal, setTicketTotal ] = useState<TicketProduct>()
  const [ typePurchaseState, setTypePurchase ] = useState<number | null>(1)

  const getDataCategories = async (idTienda: number) => {
    setLoading(true)
    try {
      const response = await getCategories(idTienda)
      if (response?.data?.success) {
        setCategories(response?.data?.categorias)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!userInfo) {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        if (parsedUserInfo) {
          if (setUserInfo) {
            setUserInfo(parsedUserInfo);
          }
        } else {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    } else if (pathname === '/login') {
      router.push('/main');
    }
  }, [userInfo, pathname, router]);

  useEffect(() => {
    if (userInfo) {
      // getDataCategories(userInfo.idTienda)
      getDataCategories(userInfo.idTienda).then(() => {
        if (categories.length > 0) { // Verifica que categories tenga elementos
          console.log(categories[0])
          getProductsList(categories[0].id); // Llama a getProductsList con el primer elemento de categories
        }
      });
    }
  }, [userInfo]);

  
  const getProductsList = async (id: number) => {
    setLoading(true)
    try {
      if (userInfo?.idTienda) {
        const res = await getProducts(id, userInfo.idTienda);
        if (res?.status === 200) {
          setProducts(res.data.productos);
        }
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryClick = (id: number, index: number) => {
    setActiveIndexCat(index);
    getProductsList(id);
  };

  const addProduct = (product: ProductTypes) => {
    const existingProduct = selectedProducts.find(item => item.idProducto === product.idProducto);
    if (existingProduct) {
      // Si el producto ya existe, incrementa la cantidad
      const addNewProduct = selectedProducts.map(item => 
        item.idProducto === product.idProducto 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
      setSelectedProducts(addNewProduct);
    } else {
      // Si no existe, agrega el producto con cantidad 1
      setSelectedProducts([
        ...selectedProducts,
        { ...product, quantity: 1 } // Agregar la propiedad quantity
      ]);
    }
  }

  useEffect(() => {
    const subtotalCount = selectedProducts.reduce((acc, product) => {
      let productTotal = product.precio * product.quantity; // Multiplicar por la cantidad

      // Verificar si hay configuración y sumar precios de complementos y extras
      if (product.configurable) {
        for (const extra of product?.configuracion?.extras || []) {
          productTotal += Number(extra.precio) * product.quantity; // Sumar precio de extras
        }

        for (const complemento of product?.configuracion?.complementos || []) {
          productTotal += Number(complemento.precio) * product.quantity; // Sumar precio de complementos
        }
      }

      return acc + productTotal; // Sumar al acumulador
    }, 0);
    setSubtotal(Number(subtotalCount.toFixed(2))); // Limitar a 2 decimales
  }, [selectedProducts]); 

  const createOrder = () => {
    const productos = selectedProducts.map(product => ({
      idProducto: product.idProducto, // Asumiendo que 'id' es la propiedad del producto
      cantidad: 1, // Cantidad fija como 1
      precio: product.precio, // Precio del producto
      ingredientes: product?.configuracion?.ingredientes ? product.configuracion.ingredientes.map(ingrediente => ({
        idIngrediente: ingrediente.idIngrediente // Asumiendo que 'id' es la propiedad del ingrediente
      })) : [],
      extras: product?.configuracion?.extras ? product.configuracion.extras.map(extra => ({
        idExtra: extra.idExtra, // Asumiendo que 'id' es la propiedad del extra
        cantidad: 1, // Cantidad fija como 1
        precio: extra.precio // Precio del extra
      })) : [],
      complementos: product?.configuracion?.complementos ? product.configuracion.complementos.map(complemento => ({
        idComplemento: complemento.idComplemento, // Asumiendo que 'id' es la propiedad del complemento
        precio: complemento.precio, // Precio del complemento
        tipo: complemento.tipo // Asumiendo que 'tipo' es una propiedad del complemento
      })) : []
    }));
    const totalTicket = {
      idCliente: 1, // Para pedido mostrador debe ser 1 siempre
      tipoCliente: "App", // Aquí es App o Libreta
      idTienda: userInfo?.idTienda, // Obtener el idTienda del contexto
      idHijo: 0, // El idHijo de la lista de clientes o cero si es cliente app
      monto: subTotal, // Total de la orden
      tipoCobro: typePurchaseState, // 1-Efectivo, 2-Tarjeta, 3-Clientes
      comentarios: "Con comentarios", // Puede ir vacío si no existen comentarios
      productos: productos // Colocar la constante productos previamente creada
    };
    // setTicketTotal(totalTicket)
    console.log('poke total',totalTicket)
  }

  return (
    <>
      <NavInfo queueCount={0} />
      <section className={styles.containerMain}>
        <div className={styles.containFoodMenu}>
          <div className={styles.orderTypes}>
              <Button 
                onClick={() => setValueTab(0)} 
                variant='outlined' 
                sx={valueTab === 0 ? btnTabActive : btnTab}
              >
                Crear orden
              </Button>
              {/* <Button onClick={() => setValueTab(1)} variant='outlined'
              sx={valueTab === 1 ? btnTabActive : btnTab}  >
                Ordenes Programadas
              </Button> */}
          </div>
          <div className={styles.containerMenu}>
            {
              valueTab === 0 ? (
                <>
                <div className={styles.containCategories}>
              <CategoryList categories={categories} clickItem={(id, categoryIndex) => handleCategoryClick(id, categoryIndex)} activeIndex={activeIndexCat} />
            </div>
            <div className={styles.containCompleteFood}>
              {/* <div className={styles.titleCompleteFood}>
                <Typography variant='body1' sx={{ fontWeight: 700, color: '#000000', fontSize: '1rem', lineHeight: '19.36px' }} >
                  Comidas completas
                </Typography>
              </div> */}
              <div className={ loading ? styles.containLoading :  styles.containProducts}>
                {loading ? (
                  <Loading />
                ) : (
                  products.length > 0 &&
                  products.map((product, i) => (
                    <ProductItem product={product} key={i} clickItem={addProduct} />
                  ))
                )}
              </div>
            </div>
                </>
              ) : (<Typography variant='h1'>Ordenes completadas</Typography>)
            }
          </div>
        </div>
        <div className={styles.containerTicket}>
          <Ticket products={selectedProducts} deleteProduct={setSelectedProducts} />
          <CostBreakdown subTotal={subTotal} clickBtn={createOrder} typePurchase={setTypePurchase} disabledButton={selectedProducts.length === 0} />
        </div>
      </section>
    </>
  );
}

export default Main;


const btnTab = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px 24px', // Cambiado: se agregó el ancho
  height: '31px',
  background: '#F9F9F9',
  border: '1px solid #E0E0E0', // Cambiado: se actualizó el color del borde
  borderRadius: '30px',
  margin: '10px',
  color: '#00000080'
}
const btnTabActive = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px 24px',
  height: '31px',
  background: '#F9F9F9',
  border: '1px solid #669DF0',
  borderRadius: '30px',
  color: '#669DF0',
  margin: '10px',
}