import { FunctionComponent, ReactNode } from "react";
import React from 'react';
import { Form, Input, Button, Col, Row } from 'antd';
import type { FormItemProps } from 'antd';
import LogInBackground from "@/components/LogInBackground";
import Logo from "../../assets/uc.png";
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


const Password: FunctionComponent<LoginProps> = ({ children }) => {
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
        <h1 className="form-title">Restauración de contraseña</h1>
        <br></br>
        <p className="login-form">A continuación te eviaremos un correo electrónico con los pasos a seguir para restaurar la contraseña, 
            por favor ingresa tu correo electrónico</p>
        <br></br>
        <div className="login-form">
          <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
            <MyFormItemGroup prefix={['user']}>
              <MyFormItemGroup prefix={['name']}>
                <MyFormItem name="mail" label="Correo electrónico">
                  <Input />
                </MyFormItem>
              </MyFormItemGroup>
            </MyFormItemGroup>
            <Button type="primary" htmlType="submit" className="login-button" href="/session/newPassword">
              Recuperar contraseña
            </Button>
          </Form>
        </div>
      </Col>
      <Col sm={2} className="logo-pos">
        <Image src={Logo} alt="Logo UC" className="logo-uc"/>
      </Col>
    </Row>
    </>
  );
  }

export default Password;
