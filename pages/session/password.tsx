import { FunctionComponent, ReactNode } from "react";
import React from 'react';
import { Form, Input, Button, Col, Row } from 'antd';
import type { FormItemProps } from 'antd';
import LogInBackground from "@/components/LogInBackground";
import Logo from "../../assets/uc.png";
import Image from "next/image";
import axios from 'axios';
import { useAppDispatch } from "@/redux/hooks";
import { setEmail} from "@/redux/features/userSlice";
import { useRouter } from 'next/navigation';
import { displayMessage, MyFormItem } from '../../components/utils/utils';

interface LoginProps {
  children: ReactNode;
}

const Password: FunctionComponent<LoginProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useAppDispatch();

  const onFinish = (value: any) => {
    const url = `${process.env.serverUrl}/users/forgot-password`;
    axios.post(url, {email: value.mail }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false

    }).then((response) => {
      dispatch(setEmail(value.mail))
      router.push('/session/newPassword')
    }).catch((error) => {
      displayMessage('ingresa un email válido')
    })
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
              <MyFormItem name="mail" label="Correo electrónico">
                <Input />
              </MyFormItem>
            <Button type="primary" htmlType="submit" className="login-button">
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
