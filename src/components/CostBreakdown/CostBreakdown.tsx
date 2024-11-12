'use client'
import React, { useState } from 'react'
import styles from './costBreakdown.module.css'
import { Button, IconButton, Typography } from '@mui/material'
import CashIcon from '../../assets/images/cash-icon.svg'
import CardIcon from '../../assets/images/card-icon.svg'
import AccountIconPay from '../../assets/images/account-iconpay.svg'
import Image from 'next/image'

interface CostBreakdownProps {
  subTotal: number;
  disabledButton: boolean;
  clickBtn: () => void;
  typePurchase: (id: number | null) => void;
}

const CostBreakdown = ({subTotal, clickBtn, typePurchase, disabledButton = true}: CostBreakdownProps) => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);

  const changeType = (id: number) => {
    setSelectedMethod(id)
    typePurchase(id)
  }

  return (
    <div className={styles.costBreakdown}>
      <div className={styles.headerTotal}>
        <Typography sx={{fontWeight: 700, fontSize: '1rem'}} >Total</Typography>
        <Typography sx={{fontWeight: 700, fontSize: '1.25rem', color: '#3F8E00'}} >${subTotal}mxn</Typography>
      </div>
      <div className={styles.payMethod}>
        <Typography sx={{fontWeight: 400, fontSize: '0.875', textAlign:'left'}} >Metodo de pago</Typography>
        <div className={styles.methods}>
          <div className={styles.containButton}>
            <IconButton
              onClick={() => changeType(1)} 
              style={{ backgroundColor: selectedMethod === 1 ? '#FD9A3559' : 'transparent',
                border: '1px solid #EA801F',
                borderRadius: '6px', height: '40px', width: '40px' }} // Cambiar fondo si está seleccionado 
            >
              <Image src={CashIcon} alt='pay-method-cash' />
            </IconButton>
            <Typography sx={{fontWeight: 400, fontSize: '0.875', textAlign: 'center'}} >Efectivo</Typography>
          </div>
          <div className={styles.containButton}>
            <IconButton
              onClick={() => changeType(2)} 
              style={{ backgroundColor: selectedMethod === 2 ? '#FD9A3559' : 'transparent',
                border: '1px solid #EA801F',
                borderRadius: '6px', height: '40px', width: '40px' }} // Cambiar fondo si está seleccionado
            >
              <Image src={CardIcon} alt='pay-method-card' />
            </IconButton>
            <Typography sx={{fontWeight: 400, fontSize: '0.875', textAlign: 'center'}} >Tarjeta</Typography>
          </div>
          <div className={styles.containButton}>
            <IconButton 
              onClick={() => changeType(3)} 
              style={{ backgroundColor: selectedMethod === 3 ? '#FD9A3559' : 'transparent',
                border: '1px solid #EA801F',
                borderRadius: '6px', height: '40px', width: '40px' }} // Cambiar fondo si está seleccionado
            >
              <Image src={AccountIconPay} alt='pay-method-account' />
            </IconButton>
            <Typography sx={{fontWeight: 400, fontSize: '0.875', textAlign: 'center'}} >Cuenta</Typography>
          </div>
        </div>
      </div>
        <Button variant="contained" fullWidth onClick={clickBtn} disabled={disabledButton} >
          <Typography sx={{fontWeight: 700, fontSize: '0.875', textAlign: 'center', color:'#fff'}} >Cobrar Ticket</Typography>
        </Button>
    </div>
  )
}

export default CostBreakdown