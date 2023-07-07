import Layout from "../../components/Layout";
import { Table } from 'antd';

const columnsMisServicios = [
  {
    title: 'Nombre Servicio',
    dataIndex: 'Service_title',
    key: 'Service_title',
  },
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
    title: 'Estado Pago',
    dataIndex: 'paid',
    key: 'paid',
  },
  {
    title: 'Estado',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Calificación',
    dataIndex: 'score',
    key: 'score',
  },
];

// Cambiar con datos reales iterando sobre la bbdd --> chequeaer como la armaron al final
const dataSourceMisServicios = [
  {
    offer_id: '1',
    Service_title: 'Grupo de estudio', //no está en el modelo de datos
    class_name: 'cálculo 1',
    price: 0,
    paid: true, //no está en el modelo de datos
    state: false, // and entre approved y available del modelo
    score: 4, //no está en el modelo de datos
  },
  {
    offer_id: '2',
    Service_title: 'Clases particulares', //no está en el modelo de datos
    class_name: 'Introducción a la programación',
    price: 15000,
    paid: false, //no está en el modelo de datos
    state: true, // and entre approved y available del modelo
    score: 5, //no está en el modelo de datos
  },
];


export default function Historial() {
  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-work-sans text-5xl text-[#001529] font-bold">Historial</h1>
      </div>
      <div className="flex-1">
        <h2 className="font-work-sans text-2xl text-[#001529] font-bold">Mis servicios</h2>
        <Table dataSource={dataSourceMisServicios} columns={columnsMisServicios} />
      </div>
      <div className="flex-1">
        <h2 className="font-work-sans text-2xl text-[#001529] font-bold">Servicios Contratados</h2>
        <Table dataSource={dataSourceMisServicios} columns={columnsMisServicios} />
      </div>
    </Layout>
  );
}
