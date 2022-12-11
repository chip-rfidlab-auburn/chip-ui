import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

import 'assets/css/custom.css'

function CreateIdentity() {
  return (
    <>
      <Container fluid>
        <div className="section-image ms-font" data-image="../../assets/img/bg5.jpg" >
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
            <Row>
              <Col xs="12">
                <Form action="" className="form" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h3" className="ms-font bold">Create Identity</Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      
                      <Row style={{marginTop:'3%'}} >
                        <Col xs="12">
                          <h5 className="ms-font bold">What is Identity in CHIP?</h5>
                          <p className="ms-font">Identity in CHIP is the process of creating a public-private key pair for encrypting and decrypting documents. </p>
                        </Col>
                        <Col xs="12">
                          <h5 className="ms-font bold">What is my public key used for?</h5>
                          <p className="ms-font">Your public key can be retrieved by anyone in the network to encrypt the documents and share with you. </p>
                        </Col>
                        <Col xs="12">
                          <h5 className="ms-font bold">What is my private key used for?</h5>
                          <p className="ms-font">Your private key remains is secret and is currently managed by the platform. It is used to decrypt documents that were encrypted for you. </p>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          variant="warning"
                        >
                          Create Identity
                        </Button>
                      </div>
                      
                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>
              
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default CreateIdentity;
