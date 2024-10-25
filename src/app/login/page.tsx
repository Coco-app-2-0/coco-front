'use client'
import Image from 'next/image'
import React from 'react'
import LogoCoco from '../../assets/images/logo-coco.svg'
import styles from './login.module.css'
import { Button, Input, InputLabel, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import TextInputForm from '@/components/TextInputForm'

const defaultValues = {
  email: '',
  password: ''
}

const Login = () => {

  const handleChange = (e) => {
    console.log(e)
  }

  const onSubmit = (data: any) => console.log(data);

  const { handleSubmit, reset, control, setValue, register } = useForm<any>({
    defaultValues: defaultValues,
  });

  return (
    <section className={styles.containerLogin}>
      <div className={styles.bgLogin}>
        <Image src={LogoCoco} alt={'Logo Coco App'} />
        <div className={styles.loginForm}>
          <div className={styles.loginInput}>
            <TextInputForm
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
            />
          </div>
          <div className={styles.loginInput} >
            <TextInputForm
              name={"password"}
              control={control}
              label={"Password"}
            />
          </div>
          <div className={styles.containerButton}>
            <Button onClick={handleSubmit(onSubmit)} variant="contained">Iniciar Sesion</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login