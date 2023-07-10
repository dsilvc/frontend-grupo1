import Layout from "../../components/Layout";
import { Button, Table, Rate, Space, Popover, Switch, message, Col, Modal, Row, Typography} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from 'next/navigation';

const rate: React.FC = () => <Rate allowHalf defaultValue={2.5} />;


// Cambiar con datos reales iterando sobre la bbdd --> chequeaer como la armaron al final

export default function MisServicios() {
  const [myservices, setServices] = useState<any[]>([]);
  const [createMode, setCreateMode] = useState(false);
  const token = useAppSelector((state) => state.userReducer.value.token)
  const router = useRouter()
  const [reviewItems, setReviewItems] = useState<any[]>([])

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
      render: (type: any) => (
        <Space direction="vertical">
          {type === 'professor' ? 'Profesor': 'Estudiante'}
        </Space>
      ),
    },
    {
      title: 'Disponible',
      dataIndex: 'id',
      key: 'available',
      sorter: true,
      render: (id: any) => (
        <Space direction="vertical">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={myservices.filter((d :any) => d.available && d.id == id).length > 0}
            onChange={() => patchServicesbyUser(id)}
          />
        </Space>
      ),
    },
  
    {
      title: 'Calificación',
      dataIndex: 'review',
      key: 'score',
      sorter: true,
      render: (review: any) => (
        <Space direction="vertical">
          <Rate disabled={true} value={review.reduce(function (avg: any, value: any, _ : any, { length }: any) {
            return avg + value.review / length;
            }, 0)}
          />
        </Space>
      ),
    },
    {
      title: 'Reseña',
      dataIndex: 'review',
      key: 'review',
      sorter: true,
      render: (review: any) => (
          <Button type="primary" disabled={review.length == 0} style={{ background: "grey" }} onClick={() => setReviewItems(review)}>Ver reseñas</Button>
      ),
    }
  ];

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


  const patchServicesbyUser = (service_id: any) => {
    const newData : any = myservices.filter((d :any) => d.id == service_id)[0]
    newData.available = !newData.available
    const url = `${process.env.serverUrl}/services/${service_id}`
        axios.put(url, newData, {
          headers: {
            'x-access-token' : token,
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        }).then((response) => {
          getServicesbyUser()
          console.log(response.data.data.available)
        }).catch((error) => {
          message.error('Hubo un error al cargar los servicios disponibles')
        })
  }


  return (
    <Layout>
      <div className="mb-3">
        <h1 className="ffont-work-sans text-4xl text-[#001529] font-bold pb-[1rem]">Mis Servicios</h1>
      </div>
      <div className="mb-10">
        <h3 className="font-work-sans text-[#001529]">En esta sección podrás administrar la información acerca de los servivios que ofreciste y fueron contratados por un tercero</h3>
      </div>
      <div className="flex-1">
        <Table dataSource={myservices} columns={columnsMisServicios} />
      </div>

      {reviewItems.length > 0  && (
        <Modal
          centered={true}
          open={reviewItems.length > 0 }
          title='reseñas'
          footer={null}
          onCancel={() => setReviewItems([])}
          destroyOnClose={true}
        >     
        <Row>
          <Typography.Text strong>Promedio: {reviewItems.reduce(function (avg, value, _, { length }) {
        return avg + value.review / length;
    }, 0)}</Typography.Text>
        </Row>
        {reviewItems.map((review: any) => {
           return (<Row key={review.id} align='middle' style={{display:'flex', width:'100%', flexDirection:'row'}}>
           <Col sm={16} style={{height:'100%'}}>

                {review.comment}
            </Col>
            <Col sm={8}>
                <Rate disabled={true} value={review.review}/>
            </Col>
            </Row>)
        })}
            </Modal>
      )}
    </Layout>
  )
}