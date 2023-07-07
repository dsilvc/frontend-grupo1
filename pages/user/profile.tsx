import Layout from "../../components/Layout";
import { Button, Card, Col, Form,  Input, message, Modal, Row, Radio, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Image from "next/image";
import photo from "../../assets/profile-placeholder.png";
import Link from 'next/link';
import { MyFormItemGroup, MyFormItem } from '../../components/utils/utils';
import { useRouter } from 'next/navigation';

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
  const router = useRouter()

  useEffect(() => {
    getProfile()
  }, [])



  const getProfile = () => {
    console.log(token)
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

          <Link href="/user/changePassword" className="hrefs">Cambiar contraseña</Link>
          <Link href="/user/editProfile" className="hrefs">Modificar perfil</Link>
        </Col>
      </Row>
    </Layout>
  );
}