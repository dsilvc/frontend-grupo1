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
        <h1 className="profile-form">Cambiar contraseña</h1>
        <br></br>
        <br></br>
        <Form name="form_item_path" layout="vertical">
            <MyFormItemGroup prefix={['user']}>
              <MyFormItemGroup prefix={['name']}>
                <MyFormItem name="password" label="Contraseña">
                  <Input type='password'/>
                </MyFormItem>
                <MyFormItem name="password-confirm" label="Repetir Contraseña">
                    <Input type='password'/>
                </MyFormItem>
              </MyFormItemGroup>
            </MyFormItemGroup>
            <Button type="primary" htmlType="submit" className="login-button" href="/user/profile">
              Actualizar contraseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}