import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './FormClient.module.css';
import { GuardarClienteLibretaRequest, updateClientLibreta } from '@/utils/types';
import { Button, Input, InputAdornment, MenuItem, Select, Typography } from '@mui/material';
import Image from 'next/image';
import logoClient from '../../assets/images/client-icon-form.svg';
import CloseIcon from '@mui/icons-material/Close';
import { createClient, updateClient } from '@/apis/clients/clients';
import { toast } from 'react-toastify';


interface FormClientProps {
  onClose: () => void;
  idTienda: number;
  userData?: any;
}

const FormClient: React.FC<FormClientProps> = ({ onClose, idTienda, userData }) => {

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<GuardarClienteLibretaRequest>({
    mode: 'onChange',
    defaultValues: {
      ...userData,
      tipo: userData?.tipo ? Number(userData.tipo) : undefined,
      nivel: userData?.nivel ? Number(userData.nivel) : undefined,
    }, 
  });

const nivelMap: { [key: string]: string } = {
  Kinder: '1',
  Primaria: '2',
  Secundaria: '3'
};
const defaultNivel = nivelMap[userData?.nivel as string] || '';

const gradoMap: { [key: string]: string } = {
  '1ro': '1',
  '2do': '2',
  '3ro': '3',
  '4to': '4',
  '5to': '5',
  '6to': '6',
}
const defaultGrado = gradoMap[userData?.grado?.toString() as string] || '';

const onSubmit = async (data: GuardarClienteLibretaRequest | updateClientLibreta) => {
  console.log('poke', data)
  try {
    const response = userData 
        ? await updateClient({
          tipo: Number(data.tipo),
          nombre: data.nombre,
          apellidos: data.apellidos,
          nivel: Number(data.nivel),
          grado: Number(data.grado),
          grupo: data.grupo,
          idTienda,
          idCliente: userData?.idCliente
        })
        : await createClient({
          tipo: Number(data.tipo),
          nombre: data.nombre,
          apellidos: data.apellidos,
          nivel: Number(data.nivel),
          grado: Number(data.grado),
          grupo: data.grupo,
          idTienda,
          saldoInicial: data.saldoInicial
        });
    if (response.data.success) {
        toast.success(userData ? 'Cliente actualizado correctamente' : 'Cliente creado correctamente');
    }
  } catch (error) {
    console.log(error)
      toast.error('Error al guardar el cliente');
  } finally {
      onClose();
  }
};

  const optionsNivel = [
    { value: '1', label: 'Kinder' },
    { value: '2', label: 'Primaria' },
    { value: '3', label: 'Secundaria' },
  ]

  const optionsGrado = [
    { value: '1', label: '1ro' },
    { value: '2', label: '2do' },
    { value: '3', label: '3ro' },
    { value: '4', label: '4to' },
    { value: '5', label: '5to' },
    { value: '6', label: '6to' },
    
];

    return (
        <div className={styles.modal}>
            <div className={styles.formHeader}>
                <div className={styles.formHeaderLeft}>
                    <Image src={logoClient} alt="Logo" width={100} height={100} className={styles.logoClient} />
                    <div className={styles.formHeaderLeftText}>
                      <Typography variant='h2' sx={{textAlign: 'left', fontSize: '1.25rem', fontWeight: '700'}}>Nuevo Cliente</Typography>
                      <Typography variant='body2' sx={{textAlign: 'left', fontSize: '0.875rem', fontWeight: '400'}}>Ingresa los datos del nuevo cliente</Typography>
                    </div>
                </div>
                <div className={styles.formHeaderRight}>
                  <Button className={styles.closeButton} onClick={onClose} startIcon={<CloseIcon />} sx={{color: '#000'}}>
                  </Button>
                </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
            <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                      Nombre
                      <input className={styles.formInput} {...register('nombre', { required: true })} defaultValue={userData?.nombreCliente} />
                      {errors.nombre && <span>Este campo es obligatorio</span>}
                  </label>
                  <label className={styles.formLabel}>
                      Apellido(s)
                      <input className={styles.formInput} {...register('apellidos', { required: true })} defaultValue={userData?.apellidosCliente} />
                      {errors.apellidos && <span>Este campo es obligatorio</span>}
                  </label>
                  <label className={styles.formLabel}>
                      Tipo
                      <select className={styles.formSelect} {...register('tipo', { required: true })} defaultValue={userData?.tipo ? String(userData.tipo) : ''}>
                          <option value="">Selecciona</option>
                          <option value="1">Estudiante</option>
                          <option value="2">Profesor</option>
                          <option value="3">Otro</option>
                      </select>
                      {errors.tipo && <span>Este campo es obligatorio</span>}
                  </label>
                  { !userData && (
                  <label className={styles.formLabel}>
                  Saldo Inicial
                  <Input
                      className={styles.formInput}
                      sx={{height: '36px'}}
                      {...register('saldoInicial', { required: true, valueAsNumber: true })}
                      type="text"
                      defaultValue={userData?.saldo ? userData.saldo.toString() : ''}
                      startAdornment="$"
                  />
                  {errors.saldoInicial && <span>Este campo es obligatorio</span>}
                  </label>
                  )}
              </div>
              <div className={styles.formGroupGrade}>
                  <label className={styles.formLabel}>
                      Nivel
                      <Select
                        className={styles.formSelect}
                        {...register('nivel', { required: true })}
                        defaultValue={defaultNivel}
                      >
                        {optionsNivel.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* {errors.nivel && <span>Este campo es obligatorio</span>} */}
                  </label>
                  <label className={styles.formLabel}>
                      Grado
                      <Select
                        className={styles.formSelect}
                        {...register('grado', { required: true })}
                        defaultValue={defaultGrado}
                      >
                        {optionsGrado.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* {errors.grado && <span>Este campo es obligatorio</span>} */}
                  </label>
                  <label className={styles.formLabel}>
                      Grupo
                      <input className={styles.formInput} {...register('grupo', { required: true })} defaultValue={userData?.grupo} />
                      {errors.grupo && <span>Este campo es obligatorio</span>}
                  </label>
              </div>
              <Button variant="contained" color="primary" fullWidth type="submit" disabled={!isValid}>
                  {userData ? 'Actualizar Cliente' : 'Crear Cliente'} 
              </Button>
          </form>
        </div>
    );
};

export default FormClient;






