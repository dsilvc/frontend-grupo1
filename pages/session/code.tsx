import { FunctionComponent, ReactNode } from "react";
import React, {useEffect} from 'react';
import { Form, Input, Button, Col, message, Row } from 'antd';
import type { FormItemProps } from 'antd';
import LogInBackground from "@/components/LogInBackground";
import Logo from "../../assets/uc.png";
import Image from "next/image";
import axios from 'axios';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from 'next/navigation';
import  { setToken } from "@/redux/features/userSlice";


interface LoginProps {
  children: ReactNode;
}

const MyFormItemContext = React.createContext<(string | number)[]>([]);
interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}

//TODO: Pasar las funciones comunes entre todos los componentes a un utils**
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

function displayMessage(messageToDisplay :string, typeMessage: string) {
  message.open({
    type: typeMessage,
    content: messageToDisplay,
    className: 'custom-message',
    duration: 3,
  });
}

const Code: FunctionComponent<LoginProps> = ({ children }) => {
  const email = useAppSelector((state) => state.userReducer.value.email)
  const token = useAppSelector((state) => state.userReducer.value.token)
  const router = useRouter()
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token.length > 1) {
      router.push('/main')
    }
  }, [token, router])
  const onFinish = (value: object) => {
    const url = `${process.env.serverUrl}/users/verification/`
      axios({
        method: 'post',
        url: url,
        withCredentials: false,
        data: {email: email, verificationNumber: value.user.code},
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        dispatch(setToken(response.data.message.Token))
      }).catch((error) => {
        if ( error.response?.data.message == 'Wrong code'){
          displayMessage('código incorrecto', 'error')
        } else {
          displayMessage('falta información para el registro', 'error')
        }
      })
  };

  return (
    <>
    <Row className="login-display">
      <Col sm={9}>
          <LogInBackground />
      </Col>
      <Col sm={13} className="login-col">
        <p className="login-form">Te hemos enviado un correo a la dirección proporcionada anteriormente, 
        ingresa el código para continuar con el registro.</p>
        <br></br>
        <div className="login-form">
          <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
            <MyFormItemGroup prefix={['user']}>
                <MyFormItem name="code" label="Código">
                  <Input />
                </MyFormItem>
            </MyFormItemGroup>
            
            <Button type="primary" htmlType="submit" className="login-button">
              Ingresar código
            </Button>
          </Form>
        </div>
      </Col>
      <Col sm={2} className="logo-pos">
        <Image src={Logo} alt="Logo UC" className="logo-uc"/>
      </Col>
    </Row>
    </>
  );
  }

export default Code;