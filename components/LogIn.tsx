import { FunctionComponent, ReactNode } from "react";
import React, {useEffect} from 'react';
import { Form, Input, Button, Col, message, Row } from 'antd';
import type { FormItemProps } from 'antd';
import LogInBackground from "@/components/LogInBackground";
import Logo from "../assets/uc.png";
import Image from "next/image";
import Link from 'next/link';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEmail, setToken } from "@/redux/features/userSlice";
import { useRouter } from 'next/navigation';

interface LoginProps {
  children: ReactNode;
}

const MyFormItemContext = React.createContext<(string | number)[]>([]);

function displayMessage(messageToDisplay :string, typeMessage: string) {
  message.open({
    type: typeMessage,
    content: messageToDisplay,
    className: 'custom-message',
    duration: 3,
  });
}
interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
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


const Login: FunctionComponent<LoginProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const token = useAppSelector((state => state.userReducer.value.token))

  useEffect(() => {
    //TODO: diferenciar entre validados y no validados
    if (token.length > 0){
      router.push('/session/code') 
    }
  }, [token, router])

  const onFinish = (value: object) => {

    const data =  {...value.user.credentials}
    if (!data.email.endsWith('@uc.cl')){
      displayMessage(
        'El correo no coincide con el formato permitido',
        'error'
      )
    }
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
        dispatch(setEmail(data.email))
        if (response.data.message.Token) {
          dispatch(setToken(response.data.message.Token))
        }
      }).catch((error) => {
        const content :string = error.response?.data.message.includes('password') ? 
          'La contraseña debe tener al menos 6 caracteres' :
          error.response?.data.message.includes('username') ? 
          'El nombre de usuario ya ha sido utilizado'
        : 'Faltan datos para poder realizar un registro exitoso'
        displayMessage(
          content,
          'error'
        )
      })};

  return (
    <>
    <Row className="login-display">
      <Col sm={9}>
          <LogInBackground />
      </Col>
      <Col sm={13} className="login-col">
        <h1 className="form-title">¡Bienvenido!</h1>
        <br></br>
        <br></br>
        <div className="login-form">
          <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
            <MyFormItemGroup prefix={['user']}>
              <MyFormItemGroup prefix={['credentials']}>
                <MyFormItem name="mail" label="Correo UC">
                  <Input />
                </MyFormItem>
                <MyFormItem name="password" label="Contraseña">
                  <Input />
                </MyFormItem>
              </MyFormItemGroup>
            </MyFormItemGroup>

            <Link href="/session/password">
              <p>¿Olvidaste tu contraseña? Presiona aquí</p>
            </Link>
            <br></br>
            <br></br>
            
              <Button type="primary" htmlType="submit" className="login-button">
                Iniciar Sesión
              </Button>
          </Form>
        </div>
        <br></br>
        <Link href="/session/signin">
              <p>¿No tienes cuenta? Regístrate aquí</p>
            </Link>
      </Col>
      <Col sm={2} className="logo-pos">
        <Image src={Logo} alt="Logo UC" className="logo-uc"/>
      </Col>
    </Row>
    </>
  );
  }

export default Login;
