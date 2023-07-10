import LayoutAdmin from '@/components/LayoutAdmin';
import { Card, Col, Row } from 'antd';
import React from 'react';

export default function OfertasAprobadas() {
  return (
    <LayoutAdmin>
      <h1 className="font-work-sans text-4xl text-[#001529] font-bold pb-[1rem]" >Ofertas Aprobadas</h1>
      <div className="mb-10">
        <h3 className="font-work-sans text-[#001529]">En esta sección podrás administrar los servivios ya aprobados ofrecidos por los
          usuarios</h3>
      </div>
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
    </LayoutAdmin >
  );
}