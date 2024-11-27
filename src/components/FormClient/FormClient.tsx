import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './FormClient.module.css';
import { FormDataClient } from '@/utils/types';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import logoClient from '../../assets/images/client-icon-form.svg';
import CloseIcon from '@mui/icons-material/Close';


interface FormClientProps {
    onClose: () => void;
}

const FormClient: React.FC<FormClientProps> = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormDataClient>({
        mode: 'onChange',
    });

    const onSubmit = (data: FormDataClient) => {
        onClose()
        console.log(data);
    };

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
                        <input className={styles.formInput} {...register('nombre', { required: true })} />
                        {errors.nombre && <span>Este campo es obligatorio</span>}
                    </label>
                    <label className={styles.formLabel}>
                        Apellido(s)
                        <input className={styles.formInput} {...register('apellidos', { required: true })} />
                        {errors.apellidos && <span>Este campo es obligatorio</span>}
                    </label>
                    <label className={styles.formLabel}>
                        Tipo
                        <select className={styles.formSelect} {...register('tipo', { required: true })}>
                            <option value="">Selecciona</option>
                            <option value="Estudiante">Estudiante</option>
                            <option value="Adulto">Adulto</option>
                        </select>
                        {errors.tipo && <span>Este campo es obligatorio</span>}
                    </label>
                    <label className={styles.formLabel}>
                        Saldo Inicial
                        <input className={styles.formInput} {...register('saldoInicial')} type="text" />
                    </label>
                </div>
                <div className={styles.formGroupGrade}>
                    <label className={styles.formLabel}>
                        Nivel
                        <select className={styles.formSelect} {...register('nivel', { required: true })}>
                            <option value="">Selecciona</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                        </select>
                        {errors.nivel && <span>Este campo es obligatorio</span>}
                    </label>
                    <label className={styles.formLabel}>
                        Grado
                        <select className={styles.formSelect} {...register('grado', { required: true })}>
                            <option value="">Selecciona</option>
                            <option value="1ro">1ro</option>
                            <option value="2do">2do</option>
                            <option value="3ro">3ro</option>
                            <option value="4to">4to</option>
                            <option value="5to">5to</option>
                            <option value="6to">6to</option>
                        </select>
                        {errors.grado && <span>Este campo es obligatorio</span>}
                    </label>
                    <label className={styles.formLabel}>
                        Grupo
                        <select className={styles.formSelect} {...register('grupo', { required: true })}>
                            <option value="">Selecciona</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                        </select>
                        {errors.grupo && <span>Este campo es obligatorio</span>}
                    </label>
                </div>
                <Button variant="contained" color="primary" fullWidth type="submit" disabled={!isValid}>
                    Crear Cliente
                </Button>
            </form>
        </div>
    );
};

export default FormClient;






