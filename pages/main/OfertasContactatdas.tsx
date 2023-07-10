import Layout from "../../components/Layout";
import { Table, Typography } from 'antd';
import { Rate } from 'antd';
import { Space } from 'antd';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Col, Form,  Input, message, Modal, Row} from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from 'next/navigation';
import { displayMessage, MyFormItemGroup, MyFormItem } from '../../components/utils/utils';


const rate: React.FC = () => <Rate allowHalf defaultValue={2.5} />;


// Cambiar con datos reales iterando sobre la bbdd --> chequeaer como la armaron al final

export default function MisServicios() {
  const [offeredServices, setServices] = useState<any[]>([]);
  const [createMode, setCreateMode] = useState(false);
  const [isClass, setIsClass] = useState(false);
  const [reviewItem, setReviewItem] = useState(0);
  const token = useAppSelector((state) => state.userReducer.value.token)
  const router = useRouter()

  const columnsMisServicios = [
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
      title: 'Reseña',
      dataIndex: 'service_id',
      key: 'review',
      sorter: true,
      render: (service_id: number) => (
        offeredServices.filter((s: any) => s.service_id === service_id && s.service.review.length > 0).length > 0 ? 
        (<Button type="primary" style={{ background: "grey" }} onClick={() => {setReviewItem(service_id)}}> Ver reseña</Button>) :
        (<Button type="primary" style={{ background: "grey" }} onClick={() => {setReviewItem(service_id)}}> Crear reseña</Button>)
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

  const publishReview = ( value : any) => {
    const url = `${process.env.serverUrl}/reviews/`
    const data = value.review
    data['service_id'] = reviewItem
    axios.post(url, data, {
      headers: {
        'x-access-token' : token,
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    }).then((response) => {
      setReviewItem(0)
      getServicesbyUser()
      
    }).catch((error) => {
      message.error('Hubo un error al crear la reseña')
    })
  }
  const getServicesbyUser = () => {
    const url = `${process.env.serverUrl}/offers/offersbyuser`
        axios.get(url, {
          headers: {
            'x-access-token' : token,
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        }).then((response) => {
          setServices(response.data.data)
          console.log(response.data.data)
        }).catch((error) => {
          message.error('Hubo un error al cargar los servicios disponibles')
        })
  }
  return (
    <Layout>
      <div className="mb-3">
        <h1 className="font-work-sans text-5xl text-[#001529] font-bold">Ofertas Contactadas</h1>
      </div>
      <div className="mb-10">
        <h3 className="font-work-sans text-[#001529]">En esta sección podrás seguir todas las ofertas que te interesaron.</h3>
      </div>
      <div className="flex-1">
        <Table dataSource={offeredServices} columns={columnsMisServicios} />
      </div>

        {!!reviewItem && offeredServices.filter((s: any) => s.service_id === reviewItem && s.service.review.length > 0).length == 0   && (
        <Modal
          centered={true}
          open={!!reviewItem }
          title='Agregar reseña'
          footer={null}
          onCancel={() => setReviewItem(0)}
          destroyOnClose={true}
        >
           <Form name="form_item_path" layout="vertical" onFinish={publishReview}>
              
              <MyFormItemGroup prefix={['review']}>
                <MyFormItem name="comment" label="Comentario">
                  <Input type='text' maxLength={200}/>
                </MyFormItem>
                <MyFormItem name="review" label="Puntaje">
                  <Rate/>
                </MyFormItem>
            </MyFormItemGroup>

          <Button type="primary" htmlType="submit" className="login-button" >
            Publicar
          </Button>
    </Form>


        </Modal>
      )}

      {!!reviewItem && offeredServices.filter((s: any) => s.service_id === reviewItem && s.service.review.length > 0).length > 0   && (
        <Modal
          centered={true}
          open={!!reviewItem }
          title='Ver reseña'
          footer={null}
          onCancel={() => setReviewItem(0)}
          destroyOnClose={true}
        >     

        {offeredServices.filter((s: any) => s.service_id == reviewItem)[0].service.review.map((review: any) => {
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
    
  );
}