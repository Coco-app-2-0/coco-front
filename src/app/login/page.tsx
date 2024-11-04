'use client'
import Image from 'next/image'
import React, { useContext } from 'react'
import LogoCoco from '../../assets/images/logo-coco.svg'
import styles from './login.module.css'
import { Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import TextInputForm from '@/components/TextInputForm'
import { authLogin } from '../../apis/login/login'

import { AuthContext } from '@/context/AuthContext' 
import { useRouter } from 'next/navigation'

const defaultValues = {
  userName: '',
  password: ''
}

const Login = () => {

  const router = useRouter()

  const { setUserInfo } = useContext(AuthContext) || {}

  const onSubmit = async (data: {userName: string, password: string}) => {
    const auth = await authLogin(data);
    if (auth && setUserInfo) {
      console.log('auth', auth);
      setUserInfo(auth);
      localStorage.setItem('userInfo', JSON.stringify(auth)); // Guardar en localStorage
      router.push('/main');
    }
  };

  const { handleSubmit, control } = useForm<{
    userName: string;
    password: string;
  }>({
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      router.push('/main'); // Redirigir si ya hay datos
    }
  }, [router]);

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
              name={"userName"}
              control={control}
              label={"Nombre de usuario"}
              textFieldSx={{
                "& .MuiInputLabel-outlined": {
                  color: "#7f7f7f",
                  fontWeight: 400,
                },
                // Otros estilos personalizados
              }}
            />
          </div>
          <div className={styles.loginInput} >
            <TextInputForm
              inputType='password'
              name={"password"}
              control={control}
              label={"Password"}
              textFieldSx={{
                "& .MuiInputLabel-outlined": {
                  color: "#7f7f7f",
                  fontWeight: 400,
                },
                // Otros estilos personalizados
              }}
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