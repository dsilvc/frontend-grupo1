import Layout from "@/components/Layout";
import { Card, Col, Row } from 'antd';
import React from 'react';



export default function Explorar() {
  return (
    <Layout>
      <h1 className="font-work-sans text-4xl text-[#001529] font-bold" >Explorar clases</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

