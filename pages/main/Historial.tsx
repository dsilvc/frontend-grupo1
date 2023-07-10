import Layout from "../../components/Layout";
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button, Rate, Space, Popover, Switch, message, Col, Modal, Row, Typography} from 'antd';
import { useRouter } from 'next/navigation';

const columnsMisServicios = [
  {
    title: 'Clase',
    dataIndex: 'class_name',
    key: 'class_name',
  },
  {
    title: 'Precio',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Cantidad de contrataciones',
    dataIndex: 'offers',
    key: 'offers',
    render: (offers: any) => (
      <Space direction="vertical">
        {offers.length}
      </Space>
    ),
  },
  {
    title: 'Calificación',
    dataIndex: 'review',
    key: 'score',
    render: (review: any) => (
      <Space direction="vertical">
        <Rate disabled={true} value={review.reduce(function (avg: any, value: any, _ : any, { length }: any) {
          return avg + value.review / length;
          }, 0)}
        />
      </Space>
    ),
  },
  
];

const columnsMisOfertas = [
  {
    title: 'Clase',
    dataIndex: 'service',
    key: 'class',
    render: (service: any) => (
      <Space direction="vertical">
        {service.clase.name}
      </Space>
    ),
  },
  {
    title: 'Precio',
    dataIndex: 'price',
    key: 'price',
  },

  {
    title: 'Tipo',
    dataIndex: 'service',
    key: 'type',
    render: (service: any) => (
      <Space direction="vertical">
        {service.type === 'professor' ? 'Profesor': 'Estudiante'}
      </Space>
    ),
  },
  {
    title: 'Precio',
    dataIndex: 'service',
    key: 'price',
    render: (service: any) => (
      <Space direction="vertical">
        {service.price}
      </Space>
    ),
  },
  {
    title: 'Usuario que la ofrece',
    dataIndex: 'service',
    key: 'username',
    render: (service: any) => (
      <Space direction="vertical">
        {'@' + service.user.username}
      </Space>
    ),
  },
  {
    title: 'Calificación',
    dataIndex: 'service',
    key: 'score',
    sorter: true,
    render: (service: any) => (
      <Space direction="vertical">
        <Rate disabled={true} value={service.review.length>0 ? service.review[0].review : 0}
        />
      </Space>
    ),
  },
  {
    title: '¿Realizaste reseña?',
    dataIndex: 'service',
    key: 'review',
    sorter: true,
    render: (service: any) => (
      <Space direction="vertical">
        {service.review.length > 0? 'Si':'No' }
      </Space> 
    ),
  }
];




export default function Historial() {
  const token = useAppSelector((state) => state.userReducer.value.token);
  const router = useRouter();
  const [myServices, setServices] = useState([]);
  const [myOffers, setOffers] = useState([]);

  useEffect(() => {
    getServicesbyUser()
    getOffersbyUser()
  }, [])
  const getServicesbyUser = () => {
    const url = `${process.env.serverUrl}/services/servicesbyuser`
        axios.get(url, {
          headers: {
            'x-access-token' : token,
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        }).then((response) => {
          setServices(response.data.data)
        }).catch((error) => {
          message.error('Hubo un error al cargar los servicios disponibles')
        })
  }

  const getOffersbyUser = () => {
    const url = `${process.env.serverUrl}/offers/offersbyuser`
        axios.get(url, {
          headers: {
            'x-access-token' : token,
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        }).then((response) => {
          setOffers(response.data.data)
          console.log(response.data.data)
        }).catch((error) => {
          message.error('Hubo un error al cargar los servicios disponibles')
        })
  }
  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-work-sans text-5xl text-[#001529] font-bold">Historial</h1>
      </div>
      <div className="flex-1">
        <h2 className="font-work-sans text-2xl text-[#001529] font-bold">Mis ofertas</h2>
        <Table dataSource={myServices} columns={columnsMisServicios} />
      </div>
      <div className="flex-1">
        <h2 className="font-work-sans text-2xl text-[#001529] font-bold">Ofertas realizadas</h2>
        <Table dataSource={myOffers} columns={columnsMisOfertas} />
      </div>
    </Layout>
  );
}
