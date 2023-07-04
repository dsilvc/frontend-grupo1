import Layout from "@/components/Layout";
import { FunctionComponent, ReactNode } from "react";
import { Button, Card, Col, Form,  Input, message, Modal, Row, Switch, Typography } from 'antd';
import type { FormItemProps } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from 'next/navigation';

interface LoginProps {
  children: ReactNode;
}

const MyFormItemContext = React.createContext<(string | number)[]>([]);


interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};


export default function Explorar() {
  const [services, setServices] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [isClass, setIsClass] = useState(false);
  const token = useAppSelector((state) => state.userReducer.value.token)
  const router = useRouter()

  useEffect(() => {
    if (token.length == 0){
      router.push('/session')
    }
    getServices();
  }, []);

  useEffect(() => {
    if (!createMode) {
      getServices();
    }
  }, [createMode]);

  const getServices = () => {
    console.log(token)
    const url = `${process.env.serverUrl}/services`
        axios.get(url, {
          headers: {
            'x-access-token' : token,
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        }).then((response) => {
          setServices(response.data)
        }).catch((error) => {
          message.error('Hubo un error al cargar los servicios disponibles')
        })
  }

  const publishService =  (value: any) => {
    const data = {...value.service, 'type': isClass ? 'Classes':'', 'user_id': 1, 'available': true}
    const url = `${process.env.serverUrl}/services`
    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `x-access-token ${token}`
      },
      withCredentials: false,
    }).then((response) => {
      setCreateMode(!createMode)
    }).catch((error) => {
      message.error('Hubo un error al publicar el nuevo servicio')
    })
  }

  const postOffer = (serviceId: number) => {
    const url = `${process.env.serverUrl}/offers`
    axios.post(url, { service_id: serviceId}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `x-access-token ${token}`
      },
      withCredentials: false,
    }).then((response) => {
      message.success('Oferta realizada! El dueño se contactará contigo para concretar')
    }).catch((error) => {
      message.error('Hubo un error al realizar la oferta')
    })
  }

  return (
    <Layout>
      <Row gutter={[16, 16]}>
        <Col sm={20}>
          <h1 className="font-work-sans text-4xl text-[#001529] font-bold pb-[1rem]" >Explorar clases</h1>
        </Col>
        <Col sm={4}>
          <Button onClick={() => setCreateMode(!createMode)}>
            Crear un servicio
          </Button>
        </Col>
       
      </Row>
      
      <Row gutter={[16,16]}>
        {
          services.map((service: any, key) => {
            return (
              <Col span={6} key={key}>
                <Card cover={<img alt="example" src="https://www.the74million.org/wp-content/uploads/2023/02/iStock-470493341-copy.jpg" />}>
                <Card.Meta title={service.class_id ? service.class_id : 'Clase'} description={`Usuario: ${service.user_id}`}/>
                  <Row gutter={[16, 16]}>
                    <Col sm={12}>
                      <Button type="primary" className="login-button" disabled={true}>
                        ${service.price}
                      </Button>
                    </Col>
                    <Col sm={8}>
                    <Button type="default" onClick={() => postOffer(service.id)}>
                      Contactar
                    </Button>
                    </Col>
                  </Row>
                  
                </Card>
            </Col>
            )
          })
        }
      </Row>
      {createMode && (
        <Modal
          centered={true}
          open={createMode}
          title='Agregar servicio'
          footer={null}
          onCancel={() => setCreateMode(!createMode)}
          destroyOnClose={true}
        >
           <Form name="form_item_path" layout="vertical" onFinish={publishService}>
              
              <MyFormItemGroup prefix={['service']}>
    
                <MyFormItem name="type" label="Tipo de oferta">
                  <Row>
                    <Col sm={3}>
                      <Switch onChange={() => setIsClass(!isClass)}/> 
                    </Col>
                    <Col sm={12}>
                    {isClass ? <p>quiero ofrecer una clase</p>: <p>quiero tomar una clase</p>}
                    </Col>
                  </Row>
                </MyFormItem>
                <MyFormItem name="class_id" label="Clase">
                  <Input type='text'/>
                </MyFormItem>
                <MyFormItem name="price" label="Monto">
                  <Input type='number'/>
                </MyFormItem>
            </MyFormItemGroup>

          <Button type="primary" htmlType="submit" className="login-button" >
            Publicar
          </Button>
    </Form>


        </Modal>
      )}
    </Layout>
  );
}

