'use client'
import React, { useEffect, useState, useContext } from 'react';
import { getClients } from '@/apis/clients/clients';
import { AuthContext } from '@/context/AuthContext';
import styles from './clientes.module.css';
import { Client } from '@/utils/types';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import ClientIcon from '../../assets/images/client-icon.svg'
import { Button, Link, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { usePathname, useRouter } from 'next/navigation';


const Clientes = () => {
  const [clientes, setClientes] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { userInfo, setUserInfo } = useContext(AuthContext) ?? {};
  const pathname = usePathname()
  const router = useRouter(); 
  const { register } = useForm()
  const fetchClientes = async () => {
    // if (!userInfo?.idTienda) return;
    try {
      if (userInfo?.idTienda) {
        const { data } = await getClients(userInfo?.idTienda.toString());
        setClientes(data.clientes);
      }
    } catch (err) {
      console.error('Error al obtener los clientes', err);
    } finally {
      console.log('Carga completada');
    }
  };

  const filterClientes = (clientes: Client[], searchTerm: string) => {
    return clientes.filter((client) => 
      Object.values(client).some((value) => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    console.log('inicia', userInfo)
    if (userInfo) {
      fetchClientes();
      console.log('inicia')
    }
  }, [userInfo]);

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


  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  } 
  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.btnContainer}>
          <Button className={styles.btnCreateOrder}>
            Crear orden
          </Button>
          <Button className={styles.btnCreateClient}>
            Ordenes programadas
          </Button>
        </div>
        <Link href="/clientes">
            <Button className={styles.btnClients}>
              <Image src={ClientIcon} alt={'clients'} className={styles.clienIcon} />
            <Typography sx={{fontFamil:'Inter', fontWeight: 700, fontSize:'0.875rem', color: '#000000'}}>
              Clientes
            </Typography>
            </Button>
          </Link>
      </div>
      <section className={styles.containerClients}>
        <div className={styles.actionsContainer}>
          <Button variant='outlined' className={styles.btnCreateClient}>
            Nuevo cliente +
          </Button>
        <div className={styles.clientsSearch} >
          <SearchIcon className={styles.searchIcon} /> {/* Agregado el ícono de búsqueda */}
          <input 
            type="text" 
            placeholder="Buscar Cliente" 
            {...register('searchTerm', { onChange: handleChange })} 
            className={styles.searchInput} // Clase para aplicar estilos
          />
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.clientTable}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Grado</th>
                <th>Grupo</th>
                <th>Categoría</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {filterClientes(clientes, searchTerm) // Aplica la función de filtrado
                .map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td className={styles.clientName}>{row.nombreCliente}</td>
                    <td><span className={row.tipo === "libreta" ? styles.libreta : styles.app}>{row.tipo}</span></td>
                    <td className={styles.clientGrade}>{row.grado}</td>
                    <td className={styles.clientGroup}>{row.grupo}</td>
                    <td className={styles.clientCategory}>{row.categoria}</td>
                    <td><span className={styles.saldo}>${row.saldo.toFixed(2)} MXN</span></td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Clientes;