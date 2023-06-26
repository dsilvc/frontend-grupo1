import Layout from "@/components/Layout";
import { Button, Card, Col, Form,  Input, message, Modal, Row, Radio, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import photo from "../../assets/profile-placeholder.png";
import Link from 'next/link';
import { MyFormItemGroup, MyFormItem } from '../../components/utils/utils';

export default function Home() {
  return (
    <Layout>
      <Row>
        <Col sm={9} className="photo">
          <Image src={photo} alt="placeholder" className="photo-placeholer"/>
        </Col>
        <Col sm={13} className="info">
          <div className="profile-info">
            <h1 className="profile-form">Mi perfil</h1>
            <br></br>
            <br></br>
            <h3 className="profile-label">Nombre</h3>
            <p>David</p>
            <h3 className="profile-label">Apellido</h3>
            <p>Weinstein</p>
            <h3 className="profile-label">Usuario</h3>
            <p>dweinstein</p>
            <h3 className="profile-label">Carrera</h3>
            <p>Ingeniería</p>
            <h3 className="profile-label">Acerca de mí</h3>
            <p>Ayudante de Desarrollo de Software</p>
            <Link href="/user/changePassword" className="hrefs">Cambiar contraseña</Link>
            <Link href="/user/editProfile" className="hrefs">Modificar perfil</Link>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}