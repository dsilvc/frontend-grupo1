import Layout from "../../components/Layout";
import { Button, Card, Col, Form,  Input, message, Modal, Row, UploadProps, Upload, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MyFormItem, MyFormItemGroup, displayMessage } from '../../components/utils/utils';
import { useRouter } from 'next/navigation';

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

// const props: UploadProps = {
//   multiple: false,
//   beforeUpload: (file) => {
//     const isPNG = file.type === 'image/png';
//     if (!isPNG) {
//       message.error(`${file.name} no es un archivo PNG`);
//     }
//     return isPNG || Upload.LIST_IGNORE;
//   },
//   onChange: (info) => {
//     console.log(info.fileList);
//   },
// };

export default function Home() {
  const token = useAppSelector((state) => state.userReducer.value.token)
  const firstName = useAppSelector((state) => state.userReducer.value.firstName)
  const lastName = useAppSelector((state) => state.userReducer.value.lastName)
  const username = useAppSelector((state) => state.userReducer.value.username)
  const router = useRouter()

  const onFinish = (value: any) => {
  
    const data = {
      firstName: value.firstName,
      lastName: value.lastName,
      username: value.username,
    }
    const url = `${process.env.serverUrl}/users/profile`
    axios.put(url, data, {
      headers: {
        'x-access-token' : token,
        'Content-Type': 'application/json',
      },
      withCredentials: false
    }).then((response) => {
      message.success('Datos actualizados')
      router.push('/user/profile')
    }).catch((error) => {
      displayMessage('Hay datos enviados con errores')
    })
    return
  };

  return (
    <Layout>
      <Row className="edit-info">
        <Col sm={13}>
        <h1 className="profile-form">Editar perfil</h1>
        <br></br>
        <br></br>
        <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                <MyFormItem name="firstName" label="Nombre">
                  <Input />
                </MyFormItem>
                <MyFormItem name="lastName" label="Apellido">
                  <Input />
                </MyFormItem>
                <MyFormItem name="username" label="Nombre de usuario">
                  <Input/>
                </MyFormItem>
                {/* <MyFormItem name="carreer" label="Carrera">
                  <Input/>
                </MyFormItem>
                <MyFormItem name="aboutme" label="Acerca de mí">
                  <Input.TextArea/>
                </MyFormItem>
                <MyFormItem label="Foto">
                  <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger {...props} name="files" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Presiona aquí o arrastra una foto para subirlo</p>
                      <p className="ant-upload-hint">Soporta un archivo PNG a la vez.</p>
                    </Upload.Dragger>
                  </Form.Item>
                </MyFormItem> */}
            <Button type="primary" htmlType="submit" className="login-button">
              Editar perfil
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
}