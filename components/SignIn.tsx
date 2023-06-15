import { FunctionComponent, ReactNode} from "react";
import { useRouter } from 'next/navigation';
import React from 'react';
import {Button, Col, Form, Input, message, Row } from 'antd';
import type { FormItemProps } from 'antd';
import LogInBackground from "@/components/LogInBackground";
import Logo from "../assets/uc.png";
import Image from "next/image";
import Link from 'next/link';
import axios from 'axios';

axios.defaults.withCredentials = true;
interface LoginProps {
  children: ReactNode;
}

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}


function displayMessage(messageToDisplay :string, typeMessage: string) {
  message.open({
    type: typeMessage,
    content: messageToDisplay,
    className: 'custom-message',
    duration: 3,
  });
}

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
};

const Login: FunctionComponent<LoginProps> = ({ children }) => {
  const router = useRouter()
  const onFinish = (value: object) => {
      //     * **firsName**: nombre de pila del usuario.
      // * **lastName**: apellido(s) de pila del usuario.
      // * **email**: correo electrónico, es *unique* y debe ser parte de la comunidad uc.
      // * **username**: nombre de usuario, es *unique*.
      // * **password**: clave secreta del usuario, minimo 6 caracteres.
    const data : User = {...value.user.credentials, ...value.user.userInformation}
    if (!data.email.endsWith('@uc.cl')){
      return displayMessage(
        'El correo no coincide con el formato permitido',
        'error'
      )
    }
    if (value.user.credentials.password === value.user.passwordConfirm){
      const url = `${process.env.serverUrl}/users/sign-up/`
      axios({
        method: 'post',
        url: url,
        withCredentials: false,
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        router.push('/session/code')
      }).catch((error) => {
        const content :string = error.response?.data.message.includes('password') ? 
          'La contraseña debe tener al menos 6 caracteres' :
          error.response?.data.message.includes('username') ? 
          'El nombre de usuario ya ha sido utilizado'
        : 'Faltan datos para poder realizar un registro exitoso'
        return displayMessage(
          content,
          'error'
        )
      })
    } else {
      return displayMessage(
        'Las contraseñas ingresadas no coinciden',
        'error'
      )
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
                  <Input/>
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
