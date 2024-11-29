import React, { useState } from 'react'
import styles from './FormEditBalance.module.css'
import { BalanceClient } from '@/utils/types'
import { Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconMoney from '../../../assets/images/icon-money.svg'
import Image from 'next/image';
import { updateBalanceClientMinus } from '@/apis/clients/clients';
import { toast } from 'react-toastify';
import IconUserOrange from '../../../assets/images/icon-user-orange.svg'
interface FormEditBalanceProps {
  cliente: any;
  onClose: () => void;
  idTienda: number;
}

const FormEditBalance: React.FC<FormEditBalanceProps> = ({ cliente, onClose, idTienda }) => {
  console.log(cliente)
  const [saldo, setSaldo] = useState(0)
  const [comentario, setComentario] = useState('')
  const [isModified, setIsModified] = useState(false)

  const handleSaldoChange = (e: any) => {
    setSaldo(e.target.value)
    setIsModified(e.target.value !== '' && comentario !== '') // Verifica si ambos campos están llenos
}

const handleComentarioChange = (e: any) => {
    setComentario(e.target.value)
    setIsModified(saldo !== 0 && e.target.value !== '') // Verifica si ambos campos están llenos
}

  const handleAbonarSaldo = async () => {
      const balanceData: BalanceClient = {
        idCliente: cliente.idCliente,
        monto: saldo,
        comentarios: comentario,
        idTienda: idTienda
      };
    try {
      const response = await updateBalanceClientMinus(balanceData);
      console.log(response)
      toast.success('Saldo abonado correctamente')
      handleClose()
    } catch (error) {
      toast.error('Error al abonar saldo')
      console.log(error)
}
  }

  const handleClose = () => {
    onClose();
  }

  return (
    <div className={styles.modal}>
      <div className={styles.formHeader}>
        <div className={styles.headerLeft}>
          <Image src={IconMoney} alt="logo" width={42} height={42} />
          <div className={styles.headerTitle}>
            <Typography className={styles.title} sx={{color: '#000', fontSize: '20px', fontWeight: '700'}}>Retira Saldo Libreta</Typography>
            <Typography className={styles.subtitle} sx={{color: '#000', fontSize: '14px', fontWeight: '400'}}>Ingresa la cantidad que retiraras al cliente</Typography>
          </div>
        </div>
        <IconButton className={styles.closeButton} onClick={handleClose} sx={{color: '#000'}}>
          <CloseIcon />
        </IconButton> 
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Saldo a Retirar</label>
        <input 
          className={styles.input} 
          type="text" 
          value={saldo} 
          onChange={handleSaldoChange} 
        />
        <p className={styles.note}>Asegúrate de revisar el monto antes de confirmar</p>
      </div>
      <div className={styles.clientInfo}>
        <div className={styles.clientInfoHeader}>
          <Image src={IconUserOrange} alt="logo" width={42} height={42} />
          <h3 className={styles.clientTitle}>Cliente</h3>
        </div>
        <div className={styles.clientInfoContainer}>
          <div className={styles.columnLeft}>
            <Typography className={styles.clientDetailLabel} sx={{color: '#000', fontSize: '16px', fontWeight: '400'}}>Nombre:</Typography>
            <Typography className={styles.clientDetail} sx={{color: '#000', fontSize: '16px', fontWeight: '700'}}>{cliente.nombreCliente}</Typography>
            <Typography className={styles.clientDetailLabel} sx={{color: '#000', fontSize: '16px', fontWeight: '400'}}>Grado:</Typography>
            <Typography className={styles.clientDetail} sx={{color: '#000', fontSize: '16px', fontWeight: '700'}}>{cliente.grado}</Typography>
          </div>
          <div className={styles.columnRight}>
            <Typography className={styles.clientDetailLabel} sx={{color: '#000', fontSize: '16px', fontWeight: '400'}}>Apellido(s):</Typography>
            <Typography className={styles.clientDetail} sx={{color: '#000', fontSize: '16px', fontWeight: '700'}}>{cliente.apellidosCliente}</Typography>
            <Typography className={styles.clientDetailLabel} sx={{color: '#000', fontSize: '16px', fontWeight: '400'}}>Grupo:</Typography>
            <Typography className={styles.clientDetail} sx={{color: '#000', fontSize: '16px', fontWeight: '700'}}>{cliente.grupo}</Typography>
          </div>
        </div>
        <Typography className={styles.clientDetail}>Se redudcira ${saldo} a: {cliente.nombreCliente} {cliente.apellidosCliente}</Typography>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Comentario</label>
        <textarea 
          className={styles.textarea} 
          value={comentario} 
          onChange={handleComentarioChange} 
        />
      </div>
      <Button className={styles.button} fullWidth disabled={!isModified} onClick={handleAbonarSaldo}>Retirar Saldo</Button>
    </div>
  )
}

export default FormEditBalance