import Layout from "../../components/Layout";
import { Table } from 'antd';
import { Rate } from 'antd';
import { Space } from 'antd';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';


const rate: React.FC = () => <Rate allowHalf defaultValue={2.5} />;


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
    title: 'Usuario',
    dataIndex: 'user',
    key: 'user',
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
  return (
    <Layout>
      <div className="mb-3">
        <h1 className="font-work-sans text-5xl text-[#001529] font-bold">Mis Servicios</h1>
      </div>
      <div className="mb-10">
        <h3 className="font-work-sans text-[#001529]">En esta sección podrás administrar la información acerca de los servivios que ofreciste y fueron contratados por un tercero</h3>
      </div>
      <div className="flex-1">
        <Table dataSource={dataSourceMisServicios} columns={columnsMisServicios} />
      </div>
    </Layout>
  );
}