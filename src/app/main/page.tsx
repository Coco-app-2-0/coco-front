'use client'
import NavInfo from '@/components/NavInfo/NavInfo'
import { AuthContext } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import styles from './main.module.css'
import Loading from '@/components/Loading/Loading';
import CategoryList from '@/components/CategoryList/CategoryList';
import { getCategories, getProducts } from '@/apis/store/categories';
import { Button, Modal, Typography } from '@mui/material';
import Ticket from '@/components/Ticket/Ticket';
import { CategoryTypes, ProductTypes, TicketProduct } from '@/utils/types';
import ProductItem from '@/components/ProductItem/ProductItem';
import CostBreakdown from '@/components/CostBreakdown/CostBreakdown';
import ConfigModalProduct from '@/components/ConfigModalProduct/ConfigModalProduct';
import { createOrderPost } from '@/apis/orders/orders';
import { useToast } from '@/context/ToastContext';
import ClientModal from '@/components/ ClientModal/ ClientModal';


const Main = () => {
  const { notify } = useToast();
  const { userInfo, setUserInfo } = useContext(AuthContext) || {}
  const pathname = usePathname()
  const router = useRouter(); 
  const [categories, setCategories] = useState<CategoryTypes[]>([])
  const [valueTab, setValueTab] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductTypes[]>([])
  const [activeIndexCat, setActiveIndexCat] = useState<number>(0);
  const [ selectedProducts, setSelectedProducts ] = useState<any[]>([])
  const [ subTotal, setSubtotal ] = useState<number>(0)
  const [ openModal, setOpenModal ] = useState<boolean>(false)
  const [ currenProduct, setCurrentProduct ] = useState<any | null>(null)
  const [ typePurchaseState, setTypePurchase ] = useState<number | null>(1)
  const [ openModalClient, setOpenModalClient ] = useState<boolean>(false)
  const [ currentClient, setCurrentClient ] = useState<any | null>(null)
  const [ coments, setComents ] = useState<string>('')

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

  const addProduct = (product: ProductTypes | TicketProduct, fromConfigProduct = false) => {
    if (product.configurable) {
      setCurrentProduct(product);
      setOpenModal(true);
    } else {
      const existingProduct = selectedProducts.find((item: any) => item.idProducto === product.idProducto);
      if (existingProduct && !fromConfigProduct) {
        // Si el producto ya existe y no proviene de configProduct, incrementa la cantidad
        const addNewProduct = selectedProducts.map((item: any) => 
          item.idProducto === product.idProducto 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        setSelectedProducts(addNewProduct);
      } else {
        // Si no existe, agrega el producto con cantidad 1
        setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]); // No es necesario el tipo aquí
      }
    }
  }

  useEffect(() => {
    console.log('poke', selectedProducts)
    const subtotalCount = selectedProducts.reduce((acc, product) => {
      let productTotal = product.precio * product.quantity;

      // Verificar si hay configuración y sumar precios de complementos y extras
      if (product.config) {
        // Sumar extras
        for (const extra of product?.configuracion?.extras || []) {
          productTotal += Number(extra.precio) * (extra.cantidad || 0);
        }
        
        // Sumar opciones tipo 1 (ingredientes base)
        for (const opcion of product?.configuracion?.tipo_1 || []) {
          productTotal += Number(opcion.precio) * (opcion.cantidad || 0);
        }
        
        // Sumar opciones tipo 2 (ingredientes adicionales)
        for (const opcion of product?.configuracion?.tipo_2 || []) {
          productTotal += Number(opcion.precio) * (opcion.cantidad || 0);
        }
      }

      return acc + productTotal;
    }, 0);
    setSubtotal(Number(subtotalCount.toFixed(2)));
  }, [selectedProducts]); 

  const createOrder = () => {
    const productos = selectedProducts.map(product => ({
      idProducto: product.idProducto,
      cantidad: product.quantity,
      precio: product.precio,
      configuracion: {
        ingredientes: product?.configuracion?.ingredientes 
          ? product.configuracion.ingredientes.map((ingrediente: any) => ({
              idIngrediente: ingrediente.idIngrediente
            })) 
          : [],
        extras: product?.configuracion?.extras 
          ? product.configuracion.extras.map((extra: any) => ({
              idExtra: extra.idExtra,
              cantidad: extra.cantidad || 1,
              precio: extra.precio
            })) 
          : []
      },
    }));
    const totalTicket = {
      idCliente: currentClient?.idCliente || 0,
      tipoCliente: currentClient?.tipo || "app",
      idTienda: userInfo?.idTienda || 0,
      idHijo: 0,
      monto: Number(subTotal.toFixed(2)),
      tipoCobro: typePurchaseState || 1,
      comentarios: coments,
      productos: productos
    };
    console.log('Ticket a enviar:', totalTicket);
    try {
      createOrderPost(totalTicket)
      setSelectedProducts([])
      notify('Orden creada correctamente', 'success')
    } catch {
      notify('Error al crear la orden', 'error')
    }
  }


  useEffect(() => {
    if (typePurchaseState === 3) {
      setOpenModalClient(true)
    }
  }, [typePurchaseState])

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
          <Ticket products={selectedProducts} deleteProduct={setSelectedProducts} setCommentTicket={setComents} />
          <CostBreakdown selectedClient={currentClient} subTotal={subTotal} clickBtn={createOrder} typePurchase={setTypePurchase} disabledButton={selectedProducts.length === 0} removeClient={() => setCurrentClient(null)} />
        </div>
      </section>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ConfigModalProduct product={currenProduct} onClose={() => setOpenModal(false)} configProduct={(product) => product ? addProduct(product, true) : null} />
      </Modal>

      <Modal open={openModalClient} onClose={() => setOpenModalClient(false)}>
        <ClientModal idTienda={userInfo?.idTienda || 0} isOpen={openModalClient} onClose={() => setOpenModalClient(false)} onCobrar={(client) => setCurrentClient(client)} />
      </Modal>
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

