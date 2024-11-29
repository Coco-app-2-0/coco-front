'use client'
import React, { useEffect, useState, useContext } from 'react';
import { getClientsLibreta } from '@/apis/clients/clients';
import { AuthContext } from '@/context/AuthContext';
import styles from './clientes.module.css';
import { Client } from '@/utils/types';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import ClientIcon from '../../assets/images/client-icon.svg'
import { Button, IconButton, Link, Modal, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { usePathname, useRouter } from 'next/navigation';
import FormClient from '@/components/FormClient/FormClient';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PencilIcon from '../../assets/images/pencil-icon.svg'
import MinusIcon from '../../assets/images/minus-icon.svg'
import ArchiveIcon from '../../assets/images/archive-icon.svg'
import FormEditBalance from '@/components/FormClient/FormEditBalance/FormEditBalance';


const Clientes = () => {
  const [clientes, setClientes] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { userInfo, setUserInfo } = useContext(AuthContext) ?? {};
  const [showForm, setShowForm] = useState(false);
  const [showFormBalance, setShowFormBalance] = useState(false);
  const pathname = usePathname()
  const router = useRouter(); 
  const [clientToUpdate, setClientToUpdate] = useState<Client | null>(null);
  const { register } = useForm()

  const fetchClientes = async () => {
    try {
      if (userInfo?.idTienda) {
        const { data } = await getClientsLibreta(userInfo?.idTienda.toString());
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

  const handleShowFormUpdate = (client: Client) => {
    setShowForm(true);
    setClientToUpdate(client);
  }

  const handleShowFormBalance = (client: Client ) => {
    setShowFormBalance(true);
    setClientToUpdate(client);
  }

  // const cleanData = () => {
  //   setClientToUpdate(null)
  // }

  useEffect(() => {
    if (userInfo) {
      fetchClientes();
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

  useEffect(() => {
    console.log('poke clientToUpdate', clientToUpdate)
  }, [clientToUpdate])

  const closeForm = () => {
    setShowForm(false)
    setClientToUpdate(null)
    fetchClientes()
  }

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
          <Button variant='outlined' className={styles.btnCreateClient} onClick={() => setShowForm(true)} sx={{fontSize: '0.875rem'}}>
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
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Grado</th>
                <th>Grupo</th>
                <th>nivel</th>
                <th>Saldo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filterClientes(clientes, searchTerm)
                .map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td className={styles.clientName}>{row.nombreCliente}</td>
                    <td className={styles.clientLastName}>{row.apellidosCliente}</td>
                    <td className={styles.clientGrade}>{row.grado}</td>
                    <td className={styles.clientGroup}>{row.grupo}</td>
                    <td className={styles.clientCategory}>{row.nivel}</td>
                    <td>
                      <span className={`${row.saldo < 0 ? styles.negativeBalance : styles.saldo}`}>
                        ${row.saldo.toFixed(2)} MXN
                      </span>
                    </td>
                    <td>
                      <MoreHorizIcon onClick={() => handleShowFormUpdate(row)} style={{ cursor: 'pointer', color: '#000000' }} />
                      <IconButton onClick={() => handleShowFormUpdate(row)}>
                        <Image src={PencilIcon} alt={'pencil'} className={styles.pencilIcon} />
                      </IconButton>
                      <IconButton onClick={() => handleShowFormBalance(row)}>
                        <Image src={MinusIcon} alt={'minus'} className={styles.minusIcon} />
                      </IconButton>
                      <IconButton onClick={() => console.log(row)}>
                        <Image src={ArchiveIcon} alt={'archive'} className={styles.archiveIcon} />
                      </IconButton>
                  </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Modal open={showForm} onClose={() => setShowForm(false)} className={styles.modal}>
        <FormClient onClose={() => closeForm()} idTienda={userInfo?.idTienda ?? 0} userData={clientToUpdate as Client} />
      </Modal>
      <Modal open={showFormBalance} onClose={() => setShowFormBalance(false)} className={styles.modal}>
        <FormEditBalance onClose={() => setShowFormBalance(false)} cliente={clientToUpdate as Client} idTienda={userInfo?.idTienda ?? 0} />
      </Modal>
    </>
  );
};

export default Clientes;