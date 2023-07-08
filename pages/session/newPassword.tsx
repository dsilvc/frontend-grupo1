import { FunctionComponent, ReactNode } from "react";
import React from 'react';
import { Form, Input, Button, Col, Row, message } from 'antd';
import LogInBackground from "../../components/LogInBackground";
import Logo from "../../assets/uc.png";
import Image from "next/image";
import axios from 'axios';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from 'next/navigation';
import { displayMessage, MyFormItemGroup, MyFormItem } from '../../components/utils/utils';
interface LoginProps {
  children: ReactNode;
}

const NewPassword: FunctionComponent<LoginProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const email = useAppSelector((state => state.userReducer.value.email))

  const onFinish = (value: any) => {
    if (value.password.password !==  value.password.passwordConfirmation){
      return displayMessage('Las contraseñas no coinciden')
    }
    const data = {
      email: email,
      password: value.password.password,
      verificationNumber: value.code
    }
    const url = `${process.env.serverUrl}/users/change-password`
    axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false

    }).then((response) => {
      message.success('Contraseña actualizada')
      router.push('/session')
    }).catch((error) => {
      if (error.message.includes('6')){
        displayMessage('La contraseña entregada no cumple con los formatos')
      }
      if ( error.response?.data.message == 'Wrong code'){
        displayMessage('código incorrecto')
      } else {
        displayMessage('Hay datos enviados con errores')
      }
    })
    return
  };

  return (
    <>
    <Row className="login-display">
      <Col sm={9}>
          <LogInBackground />
      </Col>
      <Col sm={13} className="login-col">
        <h1 className="form-title">Nueva contraseña</h1>
        <br></br>
        <p className="login-form">Por favor, ingresa tu nueva contraseña</p>
        <br></br>
        <div className="login-form">
          <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
              <MyFormItem name="code" label="Código">
                <Input type='number'/>
              </MyFormItem>
              <MyFormItemGroup prefix={['password']}>
                <MyFormItem name="password" label="Constraseña">
                  <Input type='password'/>
                </MyFormItem>
                <MyFormItem name="passwordConfirmation" label="Repetir Contraseña">
                    <Input type='password'/>
                </MyFormItem>
              </MyFormItemGroup>
    
            <Button type="primary" htmlType="submit" className="login-button">
              Actualizar contraseña
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

export default NewPassword;
