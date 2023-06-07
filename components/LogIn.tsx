import { FunctionComponent, ReactNode } from "react";
import { Button, Col, Layout, Typography, Row } from "antd";
import LogInBackground from "@/components/LogInBackground";


interface LoginProps {
  children: ReactNode;
}


const Login: FunctionComponent<LoginProps> = ({ children }) => {
  return (
    <>
      <Col sm={9}>
        <LogInBackground />
      </Col>
      <Col sm={16} style={{height: '100%'}}>
          <Row justify='end'>
              <img src='../../assets/uc.png'/>
          </Row>
      </Col>
    </>
  );
}

export default Login;
