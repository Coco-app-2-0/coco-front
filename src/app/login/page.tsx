'use client'
import Image from 'next/image'
import React from 'react'
import LogoCoco from '../../assets/images/logo-coco.svg'
import styles from './login.module.css'
import { Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import TextInputForm from '@/components/TextInputForm'
import { authLogin } from '../apis/login/login'

const defaultValues = {
  email: '',
  password: ''
}

const Login = () => {

  // const handleChange = (e) => {
  //   console.log(e)
  // }
  const onSubmit = async (data: {username: string, password: string}) => {
    const auth = await authLogin(data)
    console.log(auth)
  };

  const { handleSubmit, control } = useForm<{
    username: string;
    password: string;
  }>({
    defaultValues: defaultValues,
  });

  return (
    <section className={styles.containerLogin}>
      <div className={styles.bgLogin}>
        <div className={styles.logiImg}>
          <Image src={LogoCoco} alt={'Logo Coco App'} />
        </div>
        <div className={styles.loginForm}>
          <Typography variant='h5' sx={{ fontWeight: 700, color: '#ff9900' }} >
            Inicia Sesión
          </Typography>
          <div className={styles.loginInput}>
            {/* <TextInputForm
              {...register("email", {
                required: "Por favor, ingrese su correo electrónico",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Por favor, ingrese un correo electrónico válido"
                }
              })}
              name={"email"}
              control={control}
              label={"E-mail"}
            /> */}
            <TextInputForm
              name={"email"}
              control={control}
              label={"Nombre de usuario"}
            />
          </div>
          <div className={styles.loginInput} >
            <TextInputForm
              inputType='password'
              name={"password"}
              control={control}
              label={"Password"}
            />
          </div>
          <div className={styles.containerButton}>
            <Button fullWidth onClick={handleSubmit(onSubmit)} variant="contained">Iniciar Sesion</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login