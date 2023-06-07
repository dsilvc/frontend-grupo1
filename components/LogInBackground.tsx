import { FunctionComponent, ReactNode } from "react";

import { Button, Col, Layout, Typography, Row } from "antd";

const LoginBackground: FunctionComponent = () => {
  return (
    <Layout.Content className="login-page">
      <Col sm={24} className="background-image" style={{width:'100%'}}>

        <Row className="paginas-logo">
            <Typography.Title className="text-title-logo">
            <span className="text-title-uc-logo"> UC</span>
            Páginas Celestes
            </Typography.Title>
        </Row>
      </Col>

        
    </Layout.Content>
  );
}

export default LoginBackground;
