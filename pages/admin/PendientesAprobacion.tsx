import LayoutAdmin from '@/components/LayoutAdmin';
import { Card, Col, Row } from 'antd';
import React from 'react';

export default function PendientesAprobacion() {
  return (
    <LayoutAdmin>
      <h1 className="font-work-sans text-4xl text-[#001529] font-bold" >Ofertas pendientes de Abrobacion</h1>
      <div className="mb-10">
        <h3 className="font-work-sans text-[#001529]">En esta sección podrás aprobar los servivios ofrecidos por los
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



