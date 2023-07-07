import Layout from "../../components/Layout";
import { Button, Card, Col, Form,  Input, message, Modal, Row, UploadProps, Upload, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { MyFormItemGroup, MyFormItem } from '../../components/utils/utils';

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const props: UploadProps = {
  multiple: false,
  beforeUpload: (file) => {
    const isPNG = file.type === 'image/png';
    if (!isPNG) {
      message.error(`${file.name} no es un archivo PNG`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};

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