import Layout from "@/components/Layout";
import { Button, Card, Col, Form,  Input, message, Modal, Row, Radio, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import photo from "../../assets/profile-placeholder.png";
import { MyFormItemGroup, MyFormItem } from '../../components/utils/utils';


export default function Home() {
  return (
    <Layout>
      <Row className="edit-info">
        <Col sm={13}>
        <h1 className="profile-form">Editar perfil</h1>
        <br></br>
        <br></br>
        <Form name="form_item_path" layout="vertical">
            <MyFormItemGroup prefix={['user']}>
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
                <MyFormItem name="carreer" label="Carrera">
                  <Input/>
                </MyFormItem>
                <MyFormItem name="aboutme" label="Acerca de mí">
                  <Input.TextArea/>
                </MyFormItem>
                <MyFormItem>
                  Me falta agregar la foto aquí
                </MyFormItem>
              </MyFormItemGroup>
            </MyFormItemGroup>
            <Button type="primary" htmlType="submit" className="login-button" href="/user/profile" >
              Editar perfil
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}