import { FunctionComponent, ReactNode } from "react";
import { Button, Col, Layout, Typography, Row } from "antd";
import Link from 'next/link';

const LoginBackground: FunctionComponent = () => {
  return (
    <Layout.Content className="login-page">
      <Col sm={24} className="background-image">
        <Link href="/">
          <div className="pags-uc">
            <Typography.Title  className="text-title-logo">
                <span className="text-title-uc-logo"> UC</span>
                Páginas Celestes
            </Typography.Title>
          </div>
        </Link>
      </Col>
    </Layout.Content>
  );
}

export default LoginBackground;
