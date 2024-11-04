// src/components/NavInfo/NavInfo.tsx
import React from 'react'
import styles from './NavInfo.module.css'
import { Typography, IconButton, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import TextInputForm from '../TextInputForm';
import { useForm } from 'react-hook-form';

interface NavInfoProps {
  queueCount: number; // Nueva propiedad para el conteo de pedidos
}

const NavInfo = ({queueCount}: NavInfoProps) => {

  const { control } = useForm()
  
  return (
    <section className={styles.navinfo}>
        <div className={styles.infoTurn}>
          <Typography variant='body1' >Turno: Invitado</Typography>
        </div>
        <div className={styles.infoOrder}>
          <div className={styles.queueInfo}>
            <HistoryIcon className={styles.historyIcon} />
            <Typography variant='body2'>
              {queueCount} pedidos en fila
            </Typography>
          </div>
          <div className={styles.inputSearchOrder}>
          <TextInputForm
            name="search-order"
            control={control}
            variantType='outlined'
            label="Escribe No. de pedido"
            textFieldSx={{
              "& .MuiInputLabel-outlined": {
                color: "#7f7f7f",
                fontWeight: 400,
              },
              "& .mui-epstak-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                color: '#000000'
              },
              "& .mui-bnosql-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused": {
                borderColor: 'transparent'
              },
              "& .MuiOutlinedInput-notchedOutline ": {
                borderColor: 'transparent'
              },
            }}
          />
            <Button variant="contained" color="success">
              Validar
            </Button>
          </div>

          <div>
          <TextInputForm
            name="search-order"
            control={control}
            variantType='outlined'
            label="Escribe No. de pedido"
            textFieldSx={{
              "& .MuiInputLabel-outlined": {
                color: "#000000",
                fontWeight: 400,
              },
              "& .mui-epstak-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                color: '#FF0000CC',
                BorderColor: '#FF0000CC'
              },
              "& .MuiOutlinedInput-notchedOutline ": {
                borderColor: '#FF0000CC'
              },
            }}
          />
          </div>


        </div>
        <div>
          <IconButton aria-label="Notificaciones">
            <AccountCircleIcon />
          </IconButton>
        </div>
    </section>
  )
}

export default NavInfo