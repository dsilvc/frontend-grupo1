import Layout from "../../components/Layout";
import { Button, Table, Rate, Space, Popover, Switch, message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from 'next/navigation';

const rate: React.FC = () => <Rate allowHalf defaultValue={2.5} />;

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
    title: 'Tipo',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Realizado',
    key: 'state',
    sorter: true,
    render: () => (
      <Space direction="vertical">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      </Space>
    ),
  },
  {
    title: 'Pagado',
    key: 'paid',
    sorter: true,
    render: () => (
      <Space direction="vertical">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      </Space>
    ),
  },
  {
    title: 'Calificación',
    dataIndex: 'score',
    key: 'score',
    sorter: true,
    render: () => (
      <Space direction="vertical">
        <Rate
        />
      </Space>
    ),
  },
  {
    title: 'Reseña',
    dataIndex: 'comment',
    key: 'comment',
    sorter: true,
    render: (text: string) => (
      <Popover content={text} title="Reseña">
        <Button type="primary" style={{ background: "grey" }} >Ver reseña</Button>
      </Popover >
    ),
  }
];

// Cambiar con datos reales iterando sobre la bbdd --> chequeaer como la armaron al final
const dataSourceMisServicios = [
  {
    offer_id: '1',
    Service_title: 'Grupo de estudio', //no está en el modelo de datos
    class_name: 'cálculo 1',
    price: 0,
    user: 'Josefina',
    paid: true, //no está en el modelo de datos
    state: false, // and entre approved y available del modelo
    score: 3, //no está en el modelo de datos
    comment: 'muy ordenada', //no está en el modelo de datos
  },
  {
    offer_id: '2',
    Service_title: 'Clases particulares', //no está en el modelo de datos
    class_name: 'Introducción a la programación',
    price: 15000,
    user: 'Pedro',
    paid: false, //no está en el modelo de datos
    state: true, // and entre approved y available del modelo
    score: 5, //no está en el modelo de datos
    comment: 'muy puntual y me encanto la clase', //no está en el modelo de datos
  },
];

export default function MisServicios() {
  const [myservices, setServices] = useState([]);
  const [classes, setClasses] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [isClass, setIsClass] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const token = useAppSelector((state) => state.userReducer.value.token)
  const router = useRouter()

  useEffect(() => {
    if (token.length == 0){
      router.push('/session')
    }
    getServicesbyUser();
  }, []);

  useEffect(() => {
    if (!createMode) {
      getServicesbyUser();
    } else {
    }
  }, [createMode]);

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
          console.log(response.data.data.available)
        }).catch((error) => {
          message.error('Hubo un error al cargar los servicios disponibles')
        })
  }

  return (
    <Layout>
      <div className="mb-3">
        <h1 className="font-work-sans text-5xl text-[#001529] font-bold">Mis Servicios</h1>
      </div>
      <div className="mb-10">
        <h3 className="font-work-sans text-[#001529]">En esta sección podrás administrar la información acerca de los servivios que ofreciste y fueron contratados por un tercero</h3>
      </div>
      <div className="flex-1">
        <Table dataSource={myservices} columns={columnsMisServicios} />
      </div>
    </Layout>
  )
}