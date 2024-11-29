import React, { useEffect, useState } from 'react';
import { getClients } from '../../apis/clients/clients';
import styles from './ClientModal.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { Client } from '@/utils/types';


interface ClientModalProps {
  idTienda: number;
  isOpen: boolean;
  onClose: () => void;
  onCobrar: (client: any) => void;
}

// Componente ClientModal
const ClientModal = ({ idTienda, isOpen, onClose, onCobrar }: ClientModalProps) => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await getClients(idTienda.toString());
        setClients(data.clientes);
      } catch (error) {
        console.error("Error fetching clients:", error);
        toast.error("Error al obtener los clientes");
      }
    };

    if (isOpen) {
      fetchClients();
    }
  }, [idTienda, isOpen]);

  const filteredClients = clients.filter((client: Client) => {
    return Object.values(client).some((value: any) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCobrar = (client: any) => {
    onCobrar(client);
    onClose();
  }

  return (
    <div className={styles.clientModalContainer}>
      <div className={styles.clientModal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitles}>
            <h2 className={styles.modalTitle}>Cobro a Cuenta</h2>
            <p className={styles.modalSubtitle}>Selecciona un cliente para cobrar</p>
          </div>
          <IconButton onClick={onClose} className={styles.closeButton}>
            <CloseIcon className={styles.closeIcon} />
          </IconButton>
        </div>
        <input
          type="text"
          placeholder="Buscar Cliente"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
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
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((row: Client, index: number) => (
                <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                  <td className={styles.clientName} >{row.nombreCliente}</td>
                  <td><span  className={row.tipo === "libreta" ? styles.libreta : styles.app} >{row.tipo}</span></td>
                  <td className={styles.clientGrade}>{row.grado}</td>
                  <td className={styles.clientGroup}>{row.grupo}</td>
                  <td className={styles.clientCategory}>{row.categoria}</td>
                  <td>
                      <span className={`${row.saldo < 0 ? styles.negativeBalance : styles.saldo}`}>
                        ${row.saldo.toFixed(2)} MXN
                      </span>
                    </td>
                  <td>
                    <Button variant="outlined" color="primary" onClick={() => handleCobrar(row)}>Cobrar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;