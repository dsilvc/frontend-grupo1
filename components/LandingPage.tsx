import { FunctionComponent, ReactNode } from "react";
import { Button, Col, Layout, Typography, Row } from "antd";
import Link from 'next/link';


interface LandingPageProps {
  children: ReactNode;
}

const LandingPage: FunctionComponent<LandingPageProps> = ({ children }) => {
  return (
    <Layout.Content className="landing-page">
      <Row className="background-image">
        <Col sm={24}  className="text-layout">
          <Row className="text-layout" gutter={[24, 24]}>
            <Col sm={24}>
                <Typography.Title className="text-title">
                <span className="text-title-uc"> UC</span>
                Páginas Celestes
                </Typography.Title>
            </Col>
          </Row>
          <Row className="text-layout-secondary" gutter={[24, 24]}>
            <Col sm={12}>
              <Typography.Text className="text">
                Una comunidad segura donde puedes buscar y ofrecer ayuda a sólo
                un click
              </Typography.Text>
            </Col>
          </Row>
          <Row className="buttons-layout">
              <Col sm={4} className="button-container">
                <Link href="/info">
                  <Button className="left-button">
                      Saber más
                  </Button>
                </Link>
              </Col>
                <Col sm={4} className="button-container">
                  <Link href="/session">
                    <Button type="primary" className="right-button"> 
                      Iniciar Sesión
                    </Button>
                  </Link>
                </Col>
            
          </Row>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default LandingPage;
