'use client'
import React, { useEffect, useState } from 'react'
import styles from './costBreakdown.module.css'
import { Button, IconButton, Typography } from '@mui/material'
import CashIcon from '../../assets/images/cash-icon.svg'
import CardIcon from '../../assets/images/card-icon.svg'
import AccountIconPay from '../../assets/images/account-iconpay.svg'
import TrashIcon from '../../assets/images/trash-icon-orange.svg'
import Image from 'next/image'
import { Client } from '@/utils/types'

interface CostBreakdownProps {
  subTotal: number;
  disabledButton: boolean;
  clickBtn: () => void;
  typePurchase: (id: number | null) => void;
  selectedClient?: Client | null;
  removeClient: () => void;
}


const CostBreakdown = ({subTotal, clickBtn, typePurchase, disabledButton = true, selectedClient, removeClient}: CostBreakdownProps) => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);

  const changeType = () => {
    typePurchase(selectedMethod);
  };

  const handleRemoveClient = () => {
    removeClient();
    setSelectedMethod(1);
  }

  useEffect(() => {
    changeType();
  }, [selectedMethod]);

  return (
    <div className={styles.costBreakdown}>
      <div className={styles.headerTotal}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Total</Typography>
        <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#3F8E00' }}>${subTotal}mxn</Typography>
      </div>
      
      {selectedClient ? ( // Condición para mostrar información del cliente
        <div className={styles.clientInfo}>
          <div className={styles.clientTicketHeader}>
            <span className={selectedClient.tipo === "libreta" ? styles.libreta : styles.app} >{selectedClient.tipo}</span>
            <div className={styles.clientName}>
              <Typography sx={{ fontWeight: 700 }}>{selectedClient.nombreCliente}</Typography>
              <Typography sx={{ fontWeight: 400 }}>Saldo ${selectedClient.saldo.toFixed(2)}MXN</Typography>
            </div>
          </div>
          <div className={styles.clientActions}>
            <IconButton 
              onClick={handleRemoveClient}
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #EA801F',
                borderRadius: '6px',
                height: '40px',
                width: '40px',
              }}
            >
              <Image src={TrashIcon} alt={'trash-icon'} width={20} height={20} />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className={styles.payMethod}>
          <Typography sx={{ fontWeight: 400, fontSize: '0.875', textAlign: 'left' }}>Método de pago</Typography>
          <div className={styles.methods}>
            {/* Botones de tipo de pago */}
            <div className={styles.containButton}>
              <IconButton
                onClick={() => setSelectedMethod(1)}
                style={{
                  backgroundColor: selectedMethod === 1 ? '#FD9A3559' : 'transparent',
                  border: '1px solid #EA801F',
                  borderRadius: '6px',
                  height: '40px',
                  width: '40px',
                }}
              >
                <Image src={CashIcon} alt='pay-method-cash' />
              </IconButton>
              <Typography sx={{ fontWeight: 400, fontSize: '0.875', textAlign: 'center' }}>Efectivo</Typography>
            </div>
            <div className={styles.containButton}>
              <IconButton
                onClick={() => setSelectedMethod(2)}
                style={{
                  backgroundColor: selectedMethod === 2 ? '#FD9A3559' : 'transparent',
                  border: '1px solid #EA801F',
                  borderRadius: '6px',
                  height: '40px',
                  width: '40px',
                }}
              >
                <Image src={CardIcon} alt='pay-method-card' />
              </IconButton>
              <Typography sx={{ fontWeight: 400, fontSize: '0.875', textAlign: 'center' }}>Tarjeta</Typography>
            </div>
            <div className={styles.containButton}>
              <IconButton
                onClick={() => setSelectedMethod(3)}
                style={{
                  backgroundColor: selectedMethod === 3 ? '#FD9A3559' : 'transparent',
                  border: '1px solid #EA801F',
                  borderRadius: '6px',
                  height: '40px',
                  width: '40px',
                }}
              >
                <Image src={AccountIconPay} alt='pay-method-account' />
              </IconButton>
              <Typography sx={{ fontWeight: 400, fontSize: '0.875', textAlign: 'center' }}>Cuenta</Typography>
            </div>
          </div>
        </div>
      )}

      <Button variant="contained" fullWidth onClick={clickBtn} disabled={disabledButton}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.875', textAlign: 'center', color: '#fff' }}>Cobrar Ticket</Typography>
      </Button>
    </div>
  );
}

export default CostBreakdown