import Layout from "@/components/Layout";
import { Button, Card, Col, Form,  Input, message, Modal, Row, Radio, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { displayMessage } from '../../components/utils/utils';
import { useRouter } from 'next/navigation';
import { setEmail} from "@/redux/features/userSlice";

export default function Confirmation() {

    const router = useRouter()
    const dispatch = useAppDispatch();
    const email = useAppSelector((state) => state.userReducer.value.email)
    console.log(email)

    const onFinish = (value: any) => {
        const url = `${process.env.serverUrl}/users/forgot-password`;
        axios.post(url, {email: email}, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false
    
        }).then((response) => {
          dispatch(setEmail(email))
          router.push('/user/changePassword')
        }).catch((error) => {
          displayMessage('ingresa un email válido')
        })
      };

    return (
        <>
        <Layout>
            <Row className="login-display">
            <Col sm={13} className="login-col">
                <p className="login-form">Para cambiar tu contraseña te enviaremos un mail con el código de verificación. ¿Estás seguro de querer cambiar tu contraseña? </p>
                <br></br>
                <div className="login-form">
                <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                    <Button type="primary" htmlType="submit" className="login-button">
                    Si, ir a Cambiar Contraseña
                    </Button>
                </Form>
                </div>
            </Col>
            </Row>
        </Layout>
        </>
      );
  }