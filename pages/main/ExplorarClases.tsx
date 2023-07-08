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
  const [filteredServices, setFilteredServices] = useState([]);
  const [classes, setClasses] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [filteredMode, setFilteredMode] = useState(false);
  const [lowerPrice, setLowerPrice] = useState(0);
  const [filteredValues, setFilteredValues] = useState({
    class_id: [],
    area: [],
    type: 'both',
    lowerPrice: 0,
    upperPrice: 0
  });
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

  const filterServices = (value: any) => {
    let newFilteredServices : any;
    newFilteredServices = services
    setFilteredValues(value.service)
    if (value.service.class_id && value.service.class_id.length > 0){
      newFilteredServices = filteredServices.filter((obj: any) => 
        value.service.class_id.includes(obj.class_id)
      )
    } 
    if ( value.service.area && value.service.area.length > 0 ){
      newFilteredServices = newFilteredServices.filter((obj: any) => 
        value.service.area.includes(obj.clase.area)
      )
    }
    if ( value.service.type && value.service.type != 'both'  ){
      newFilteredServices = newFilteredServices.filter((obj: any) => 
        value.service.type === obj.clase.area
      )
    }
    if (value.service.lowerPrice && value.service.lowerPrice >= 0){
      newFilteredServices = newFilteredServices.filter((obj: any) => 
        obj.price > value.service.lowerPrice
      )
    }
    if (value.service.upperPrice && value.service.upperPrice >= 0){
      newFilteredServices = newFilteredServices.filter((obj: any) => 
        obj.price <= value.service.upperPrice
      )
    }
    setFilteredServices(newFilteredServices)
    setFilteredMode(!filteredMode)
  }

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
          setFilteredServices(response.data.data)
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
        'x-access-token' : token,
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
        <Col sm={21}>
          <h1 className="font-work-sans text-4xl text-[#001529] font-bold pb-[1rem]" >Explorar clases</h1>
        </Col>
        <Col sm={3}>
          <Button onClick={() => setCreateMode(!createMode)}>
            Crear una oferta
          </Button>
        </Col>
       
      </Row>
      <Row>
        <a onClick={() => setFilteredMode(!filteredMode)}>Filtrar por categorías</a>
      </Row>
      
      <Row gutter={[16,16]}>
        {
          filteredServices.map((service: any, key) => {
            return (
              <Col span={5} key={key}>
                <Card cover={<img alt="example" src="https://www.the74million.org/wp-content/uploads/2023/02/iStock-470493341-copy.jpg" />}>
                <Card.Meta title={service.class_id ? service.clase.name : 'Clase'} description={`Usuario: ${service.user.firstName + ' ' +service.user.lastName} - ${service.type === 'professor' ? 'Profesor': 'Estudiante'}`}/>
                  <Row gutter={[16, 16]}>
                    <Col sm={12}>
                      <Button type="primary" className={service.type == 'professor'? "login-button": "login-button-student"} disabled={true}>
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
       {filteredMode && (
        <Modal
          centered={true}
          open={filteredMode}
          title='Filtrar servicios'
          footer={null}
          onCancel={() => setFilteredMode(!filteredMode)}
          destroyOnClose={true}
        >
           <Form name="form_item_path" layout="vertical" onFinish={filterServices}>
              
              <MyFormItemGroup prefix={['service']}>
                <MyFormItem name="type" label="Tipo de oferta">
                  <Radio.Group defaultValue={filteredValues.type}>
                    <Radio value="professor">Quiero ofrecer una clase</Radio>
                    <Radio value="student">Quiero tomar una clase</Radio>
                    <Radio value="both">Continuar sin filtro</Radio>
                  </Radio.Group>
                </MyFormItem>
                <MyFormItem name="class_id" label="Clase">
                  <Select
                   allowClear
                   defaultValue={filteredValues.class_id}
                   mode="multiple"
                   style={{ width: "100%" }}
                   placeholder="Clases"
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

                <MyFormItem name="area" label="Área">
                  <Select
                   allowClear
                   mode="multiple"
                   style={{ width: "100%" }}
                   placeholder="Área"
                   defaultValue={filteredValues.area}
                   >
                      {
                        classes.map((c: any, key) => { return (
                          <Select.Option value={c.area} key={c.area}>
                              {c.area}
                          </Select.Option>)}
                        )
                      }
                  </Select>
              
                </MyFormItem>
                <MyFormItem name="lowerPrice" label="Monto menor a..(CLP)">
                  <Input type='number' min="0" step="any" defaultValue={filteredValues.lowerPrice} onChange={(event) => setLowerPrice(event.target.value)} />
                </MyFormItem>
                <MyFormItem name="upperPrice" label="Monto mayor a..(CLP)">
                  <Input type='number' min={lowerPrice} defaultValue={filteredValues.upperPrice} step="any"/>
                </MyFormItem>
            </MyFormItemGroup>

          <Button type="primary" htmlType="submit" className="login-button" >
            Filtrar
          </Button>
        </Form>


        </Modal>
      )}
    </Layout>
  );
}

