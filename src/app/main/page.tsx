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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Ticket from '@/components/Ticket/Ticket';
import { CategoryTypes, ProductTypes } from '@/utils/types';

const Main = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext) || {}
  const pathname = usePathname()
  const router = useRouter(); 
  const [categories, setCategories] = useState<CategoryTypes[]>([])
  const [valueTab, setValueTab] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductTypes[]>([])
  const [activeIndexCat, setActiveIndexCat] = useState<number>(0);

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
      setLoading(false); // Asegúrate de que loading se establezca en false al final
    }
  }

  useEffect(() => {
    if (!userInfo) {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        if (parsedUserInfo) {
          if (setUserInfo) { // Verifica que setUserInfo no sea undefined
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
      getDataCategories(userInfo.idTienda)
    }
    if (userInfo) {
      getDataCategories(userInfo.idTienda).then(() => {
        if (categories.length > 0 && products.length === 0) { // Verifica que products esté vacío
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
              <Button onClick={() => setValueTab(1)} variant='outlined'
              sx={valueTab === 1 ? btnTabActive : btnTab}  >
                Ordenes Programadas
              </Button>
          </div>
          <div className={styles.containerMenu}>
            {
              valueTab === 0 ? (
                <>
                <div className={styles.containCategories}>
              <CategoryList categories={categories} clickItem={(id, categoryIndex) => handleCategoryClick(id, categoryIndex)} activeIndex={activeIndexCat} />
            </div>
            <div className={styles.containCompleteFood}>
              <div className={styles.titleCompleteFood}>
                <Typography variant='h6'>Comidas Completas</Typography>
              </div>
              <div className={ loading ? styles.containLoading :  styles.containProducts}>
                {loading ? (
                  <Loading />
                ) : (
                  products.length > 0 &&
                  products.map((product, i) => (
                    <div className={styles.cardProduct} key={i}>
                      <div className={styles.titleProduct}>
                        <Typography variant='body1'>{product.nombre}</Typography>
                      </div>
                      <div className={styles.detailsProduct}>
                        <AddCircleOutlineIcon className={styles.iconHover} />
                        <div className={styles.costProduct}>
                          <span>
                            ${product.precio}mxn
                          </span>
                        </div>
                      </div>
                    </div>
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
          <Typography variant='h3'>Ticket</Typography>
          <Ticket>

          </Ticket>
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