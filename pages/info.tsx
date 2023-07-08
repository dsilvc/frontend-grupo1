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
        <Col sm={24}  className="info-layout">
          <Row className="info-layout" gutter={[24, 24]}>
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
                ¿Cansado de buscar clases particulares y no encontrar?
              </Typography.Text>
              <br></br>
              <br></br>
              <Typography.Text className="info-text">
                En páginas celestes encontrarás la oferta más grande de clases particulares para ayudarte a pasar
                tus ramos de la mejor manera. Navegando por la página podrás encontrar profesores de las asignaturas que necesitas junto 
                con sus valoraciones, para que puedas elegir el que más te acomode.
              </Typography.Text>
              <br></br>
              <br></br>
              <Typography.Text className="info-text">
                ¿Qué esperas para ingresar y ser parte de la comunidad de clases particulares más grande de la UC?
              </Typography.Text>
              <br></br>
              <br></br>
            </Col>
          </Row>
          <Row className="buttons-layout">
              <Col sm={4} className="button-container">
                <Link href="/">
                  <Button className="left-button">
                      Volver al inicio
                  </Button>
                </Link>
              </Col>
                <Col sm={4} className="button-container">
                  <Link  href="/session/signin">
                    <Button type="primary" className="right-button"> 
                      Registrarse
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
