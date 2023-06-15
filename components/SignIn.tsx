import { FunctionComponent, ReactNode } from "react";
import React from 'react';
import { Form, Input, Button, Col, Row } from 'antd';
import type { FormItemProps } from 'antd';
import LogInBackground from "@/components/LogInBackground";
import Logo from "../assets/uc.png";
import Image from "next/image";
import Link from 'next/link';
import axios from 'axios';

axios.defaults.withCredentials = true;
export const SERVER_URL = process.env.serverUrl;

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
        <h1 className="form-title">Crear Cuenta</h1>
        <br></br>
        <br></br>
        <div className="login-form">
          <Form name="form_item_path" layout="vertical" onFinish={(values) => onFinish(values)}>
            <MyFormItemGroup prefix={['user']}>
              <MyFormItemGroup prefix={['name']}>
                <MyFormItem name="mail" label="Correo UC">
                  <Input />
                </MyFormItem>
                <MyFormItem name="password" label="Contraseña">
                  <Input />
                </MyFormItem>
              </MyFormItemGroup>

              <MyFormItem name="password-confirm" label="Repetir Contraseña">
                <Input />
              </MyFormItem>
              </MyFormItemGroup>

            <Link href="/main">
            <Button type="primary" htmlType="submit" className="login-button" >
              Registrarme
            </Button>
            </Link>
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
