import Layout from "../../components/Layout";
import { FunctionComponent, ReactNode } from "react";
import { Button, Card, Col, Form,  Input, message, Modal, Row, Radio, Switch, Typography, Select } from 'antd';
import type { FormItemProps } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
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
    getServices();
    getClasses()
  }, []);

  useEffect(() => {
    if (!createMode) {
      getServices();
    } else {
      getClasses();
    }
  }, [createMode]);

  const getServices = () => {
    const url = `${process.env.serverUrl}/services`
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

  const getClasses = () => {
    const url = `${process.env.serverUrl}/class`
        axios.get(url, {
          headers: {
            'x-access-token' : token,
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        }).then((response) => {
          setClasses(response.data.data)
        }).catch((error) => {
          message.error('Hubo un error al cargar las clases disponibles')
        })
  }

  const publishService =  (value: any) => {
    const data = {'class_id': Number(value.service.class_id), 'available': true, 'price': Number(value.service.price), 'type': value.service.type}
    const url = `${process.env.serverUrl}/services`
    
    axios.post(url, data, {
      headers: {
        'x-access-token' : token,
        'Content-Type': 'application/json'
      },
      withCredentials: false,
    }).then((response) => {
      setCreateMode(!createMode)
    }).catch((error) => {
      console.log(error)
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
            Crear una oferta
          </Button>
        </Col>
       
      </Row>
      
      <Row gutter={[16,16]}>
        {
          services.map((service: any, key) => {
            return (
              <Col span={6} key={key}>
                <Card cover={<img alt="example" src="https://www.the74million.org/wp-content/uploads/2023/02/iStock-470493341-copy.jpg" />}>
                <Card.Meta title={service.class_id ? service.clase.name : 'Clase'} description={`Usuario: ${service.user.firstName + ' ' +service.user.lastName}`}/>
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
                  <Radio.Group>
                    <Radio value="professor">Quiero ofrecer una clase</Radio>
                    <Radio value="student">Quiero tomar una clase</Radio>
                  </Radio.Group>
                </MyFormItem>
                <MyFormItem name="class_id" label="Clase">
                  <Select
                   allowClear
                   style={{ width: "100%" }}
                   placeholder="Seleccionar clase"
                   onChange={
                     (e) => setCurrentClass(e)
                   }
                   >
                      {
                        classes.map((c: any, key) => { return (
                          <Select.Option value={c.id} key={c.id}>
                              {c.initials} - {c.name}
                          </Select.Option>)}
                        )
                      }
                  </Select>
              
                </MyFormItem>
                <MyFormItem name="price" label="Monto (CLP)">
                  <Input type='number' min="0" step="any"/>
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
