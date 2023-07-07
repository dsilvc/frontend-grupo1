import { FunctionComponent, ReactNode } from "react";
import React, {useEffect} from 'react';
import { Form, Input, Button, Col, message, Row } from 'antd';
import type { FormItemProps, MessageArgsProps } from 'antd';
import LogInBackground from "../../components/LogInBackground";
import Logo from "../../assets/uc.png";
import Image from "next/image";
import axios from 'axios';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from 'next/navigation';
import  { setToken } from "../../redux/features/userSlice";
import { displayMessage, MyFormItemGroup, MyFormItem } from '../../components/utils/utils'

interface LoginProps {
  children: ReactNode;
}

const Code: FunctionComponent<LoginProps> = ({ children }) => {
  const email = useAppSelector((state) => state.userReducer.value.email)
  const token = useAppSelector((state) => state.userReducer.value.token)
  const router = useRouter()
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token.length > 1) {
      router.push('/user/ExplorarClases')
    }
  }, [token, router])

  const onFinish = (value: any) => {
    const url = `${process.env.serverUrl}/users/verification`
      axios({
        method: 'post',
        url: url,
        withCredentials: false,
        data: {email: email, verificationNumber: value.user.code},
      }).then((response) => {
        dispatch(setToken(response.data.message.Token))
      }).catch((error) => {
        if ( error.response?.data.message == 'Wrong code'){
          displayMessage('código incorrecto')
        } else {
          displayMessage('falta información para el registro')
        }
      })
  };

  return (
    <>
    <Row className="login-display">
      <Col sm={9}>
          <LogInBackground />
      </Col>
      <Col sm={13} className="login-col">
        <p className="login-form">Te hemos enviado un correo a la dirección proporcionada anteriormente, 
        ingresa el código para continuar con el registro.</p>
        <br></br>
        <div className="login-form">
          <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
            <MyFormItemGroup prefix={['user']}>
                <MyFormItem name="code" label="Código">
                  <Input />
                </MyFormItem>
            </MyFormItemGroup>
            
            <Button type="primary" htmlType="submit" className="login-button">
              Ingresar código
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

export default Code;