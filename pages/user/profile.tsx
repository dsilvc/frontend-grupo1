import Layout from "../../components/Layout";
import { Button, Card, Col, Form,  Input, message, Modal, Row, Radio, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import Image from "next/image";
import photo from "../../assets/profile-placeholder.png";
import { useRouter } from 'next/navigation';
import { useAppDispatch } from "@/redux/hooks";

export default function Home() {
  const [user, setUser] = useState({
    "email":"example@uc.cl",
    "firstName": "Juan",
    "lastName": "Perez",
    "username": "jperez",
  })
  const [createMode, setCreateMode] = useState(false);
  const [isClass, setIsClass] = useState(false);
  const token = useAppSelector((state) => state.userReducer.value.token)
  console.log("token:", token)
  const router = useRouter()
  const dispatch = useAppDispatch();

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = () => {
    const url = `${process.env.serverUrl}/users/profile`
        axios.get(url, {
          headers: {
            'x-access-token' : token,
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        }).then((response) => {
          setUser(response.data.data)
        }).catch((error) => {
          message.error('Hubo un error al cargar los datos del perfil')
        })
  }

  const onPress = (value: any) => {
    router.push('/user/confirmation')
  };

  const onEdit = (value: any) => {
    router.push('/user/editProfile')
  };
  

  return (
    <Layout>
      <Row>
        <Col sm={9} className="photo">
          <Image src={photo} alt="placeholder" className="photo-placeholer"/>
        </Col>
        <Col sm={13}  className="info">
          <h1 className="profile-form">Mi perfil</h1>
          <br></br>
          <br></br>
          <h3 className="profile-label">Nombre</h3>
          <p>{user.firstName}</p>
          <h3 className="profile-label">Apellido</h3>
          <p>{user.lastName}</p>
          <h3 className="profile-label">Usuario</h3>
          <p>{user.username}</p>
          <br></br>
          <br></br>
          <div className="buttons">
            <Form name="changePassword" layout="vertical" onFinish={onPress}>
              <Button type="primary" htmlType="submit" className="form-button">
                  Cambiar contraseña
              </Button>
            </Form>
            <Form name="editProfile" layout="vertical" onFinish={onEdit}>
              <Button type="primary" htmlType="submit" className="form-button">
                  Modificar perfil
              </Button>
            </Form>
          </div>
          
        </Col>
      </Row>
    </Layout>
  );
}