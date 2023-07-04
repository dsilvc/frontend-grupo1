import { FunctionComponent, ReactNode } from "react";
import { useRouter } from 'next/navigation';
import React, { useEffect} from 'react';
import {Button, Col, Form, Input, message, Row } from 'antd';
import LogInBackground from "@/components/LogInBackground";
import Logo from "../assets/uc.png";
import Image from "next/image";
import Link from 'next/link';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice";
import { displayMessage, MyFormItemGroup, MyFormItem } from './utils/utils'

interface LoginProps {
  children: ReactNode;
}

type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  isSubmitted: boolean;
  token: string;
};

const Login: FunctionComponent<LoginProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.userReducer.value.email)

  useEffect(() => {
    if (email.length > 0){
      router.push('/session/code') 
    }
  }, [email, router])

  const onFinish = (value: any) => {

    const data : User = {...value.user.credentials, ...value.user.userInformation}
    if (!data.email.endsWith('@uc.cl')){
      displayMessage(
        'El correo no coincide con el formato permitido'
      )
    }
    else if (value.user.credentials.password === value.user.passwordConfirm){
      const url = `${process.env.serverUrl}/users/sign-up`
      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false

      }).then((response) => {
        data.isSubmitted = true
        data.token = ''
        dispatch(setUser(data))
        
      }).catch((error) => {
        const content :string = error.response?.data.message.includes('password') ? 
          'La contraseña debe tener al menos 6 caracteres' :
          error.response?.data.message.includes('username') ? 
          'El nombre de usuario ya ha sido utilizado'
        : error.response?.data.message.includes('Validation') ?
        'El formato de los atributos no son los correctos': 
        error.response?.data.message.includes('mail') ?
        'El correo ya ha sido utilizado':
        'Faltan datos para poder realizar un registro exitoso'
        displayMessage(
          content
        ) 
      })
    }
  };

  return (
    <>
    <Row className="login-display">
      <Col sm={9}>
          <LogInBackground />
      </Col>
      <Col sm={13} className="login-col">
        <h1 className="form-title">Crear Cuenta</h1>
        <br></br>
        <br></br>
        <div className="login-form">
          <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
            <MyFormItemGroup prefix={['user']}>
              <MyFormItemGroup prefix={['credentials']}>
                <MyFormItem name="email" label="Correo UC">
                  <Input type='email'/>
                </MyFormItem>
                <MyFormItem name="password" label="Contraseña">
                  <Input type='password'/>
                </MyFormItem>
              </MyFormItemGroup>

              <MyFormItem name="passwordConfirm" label="Repetir Contraseña">
                <Input type='password'/>
              </MyFormItem>
              
              <MyFormItemGroup prefix={['userInformation']}>
                <MyFormItem name="firstName" label="Nombre">
                  <Input />
                </MyFormItem>
                <MyFormItem name="lastName" label="Apellido">
                  <Input />
                </MyFormItem>
                <MyFormItem name="username" label="Nombre de usuario">
                  <Input/>
                </MyFormItem>
              </MyFormItemGroup>
            </MyFormItemGroup>
            <Button type="primary" htmlType="submit" className="login-button" >
              Registrarme
            </Button>
          </Form>
        </div>
        <br></br>
        <Link href="/session">¿Ya tienes cuenta? Ingresa aquí</Link>
      </Col>
      <Col sm={2} className="logo-pos">
        <Image src={Logo} alt="Logo UC" className="logo-uc"/>
      </Col>
    </Row>
    </>
  );
}

export default Login;
