import { FunctionComponent, ReactNode } from "react";
import { Button, Col, Layout, Typography, Row } from "antd";
import Link from 'next/link';

const LoginBackground: FunctionComponent = () => {
  return (
    <Layout.Content className="login-page">
      <Col sm={24} className="background-image">
        <div className="relative flex items-center justify-center overflow-clip">
          <h1 className="mb-3 text-[8rem] font-bold  font-pragati-narrow text-[#266dd869]">UC</h1>
          <h1 className="absolute inset-0 flex h-full w-full items-center justify-center font-prata text-2xl text-white text-[1.4rem]">
            Páginas Celestes
          </h1>
        </div>
      </Col>
    </Layout.Content>
  );
}

export default LoginBackground;
