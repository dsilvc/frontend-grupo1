import Layout from "@/components/Layout";
import { Button, Card, Col, Form,  Input, message, Modal, Row, Radio, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import photo from "../../assets/profile-placeholder.png";
import { MyFormItem, displayMessage } from '../../components/utils/utils';
import { useRouter } from 'next/navigation';

export default function ChangePassword() {
  const email = useAppSelector((state) => state.userReducer.value.email)
  const token = useAppSelector((state) => state.userReducer.value.token)
  const router = useRouter()
  const dispatch = useAppDispatch();

  const onFinish = (value: any) => {
    if (value.password.password !==  value.password.passwordConfirmation){
      return displayMessage('Las contraseñas no coinciden')
    }
    const data = {
      email: email,
      password: value.password,
      verificationNumber: value.code
    }
    // const url = `${process.env.serverUrl}/users/change-password`
    // axios.put(url, data, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   withCredentials: false

    // }).then((response) => {
    //   message.success('Contraseña actualizada')
    //   router.push('/user/profile')
    // }).catch((error) => {
    //   if (error.message.includes('6')){
    //     displayMessage('La contraseña entregada no cumple con los formatos')
    //   } else {
    //     displayMessage('Hay datos enviados con errores')
    //   }
    // })
    return
  };

  return (
    <Layout>
      <Row className="edit-info">
        <Col sm={13}>
        <h1 className="profile-form">Cambiar contraseña</h1>
        <br></br>
        <br></br>
          <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
            <MyFormItem name="password" label="Contraseña">
              <Input type='password'/>
            </MyFormItem>
            <MyFormItem name="passwordConfirmirmation" label="Repetir Contraseña">
              <Input type='password'/>
            </MyFormItem>
            <Button type="primary" htmlType="submit" className="login-button">
              Actualizar contraseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}