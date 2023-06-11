import { FunctionComponent, ReactNode } from "react";
import React from 'react';
import { Form, Input, Button, Col, Row } from 'antd';
import type { FormItemProps } from 'antd';
import LogInBackground from "@/components/LogInBackground";
import Logo from "../assets/uc.png";
import Image from "next/image";


interface LoginProps {
  children: ReactNode;
}

const MyFormItemContext = React.createContext<(string | number)[]>([]);

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
  const onFinish = (value: object) => {
    console.log(value);
  };

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
              <MyFormItemGroup prefix={['name']}>
                <MyFormItem name="mail" label="Correo UC">
                  <Input />
                </MyFormItem>
                <MyFormItem name="password" label="Contraseña">
                  <Input />
                </MyFormItem>
              </MyFormItemGroup>
            </MyFormItemGroup>

            <a href="/session/password">¿Olvidaste tu contraseña? Presiona aquí</a>
            <br></br>
            <br></br>
            
            <Button type="primary" htmlType="submit" className="login-button" href="/session/code">
              Iniciar Sesión
            </Button>
          </Form>
        </div>
        <br></br>
        <a href="/session/signin">¿No tienes cuenta? Regístrate aquí</a>
      </Col>
      <Col sm={2} className="logo-pos">
        <Image src={Logo} alt="Logo UC" className="logo-uc"/>
      </Col>
    </Row>
    </>
  );
  }

export default Login;
