import LayoutAdmin from '@/components/LayoutAdmin';
import { FunctionComponent, ReactNode } from "react";
import { Button, Card, Col, Form, Input, message, Modal, Row, Radio, Switch, Typography, Select } from 'antd';
import type { FormItemProps } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from 'next/navigation';

interface LoginProps {
  children: ReactNode;
}

export default function PendientesAprobacion() {
  const [services, setServices] = useState([]);
  const token = useAppSelector((state) => state.userReducer.value.token);
  const router = useRouter();

  useEffect(() => {
    if (token.length === 0) {
      router.push('/session');
    }
    getServices();
  }, []);

  const getServices = () => {
    const url = `${process.env.serverUrl}/services`;
    axios.get(url, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    }).then((response) => {
      const filteredServices = response.data.data.filter((service: any) => !service.approved);
      setServices(filteredServices);
    }).catch((error) => {
      console.log('API error:', error);
      message.error('Hubo un error al cargar los servicios disponibles');
    });
  };

  const putApprove = (serviceId: number) => {
    const url = `${process.env.serverUrl}/services/approvedservice/${serviceId}`;
    const payload = {
      approved: true,
    };

    axios
      .put(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        withCredentials: false,
      })
      .then((response) => {
        message.success('Oferta aprobada!');
        getServices();
      })
      .catch((error) => {
        console.log(error)
        message.error('Hubo un error al aprobar la oferta');
      });
  };


  return (
    <LayoutAdmin>
      <Row gutter={[16, 16]}>
        <Col sm={24}>
          <h1 className="font-work-sans text-4xl text-[#001529] font-bold">Ofertas pendientes de Aprobación</h1>
          <div className="mb-10">
            <h3 className="font-work-sans text-[#001529]">En esta sección podrás aprobar los servicios ofrecidos por los usuarios</h3>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {services.map((service: any) => (
          <Col xs={24} sm={12} md={8} lg={6} key={service.id}>
            <Card cover={<img alt="example" src="https://www.the74million.org/wp-content/uploads/2023/02/iStock-470493341-copy.jpg" />}>
              <Card.Meta title={service.class_id ? service.clase.name : 'Clase'} description={`Usuario: ${service.user.firstName + ' ' + service.user.lastName}`} />
              <Row gutter={[16, 16]}>
                <Col sm={12}>
                  <Button type="primary" className="login-button" disabled={true}>
                    ${service.price}
                  </Button>
                </Col>
                <Col sm={8}>
                  <Button type="default" onClick={() => putApprove(service.id)}>
                    Aprobar
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </LayoutAdmin>
  );
}

