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

import SweetAlert from "react-bootstrap-sweetalert";

import 'assets/css/custom.css'
import { Connect } from "assets/js/web3";
import axios from "axios";
import { BACKEND_URL } from "assets/js/constants";
import { createIdentity } from "assets/js/web3";

function CreateIdentity() {
  const [key, setKey] = React.useState(key);
  const [success, setSuccess] = React.useState(false);

  const create = async () => {
  
    const accounts = await Connect();
    if(accounts.length > 0) {
      const {data} = await axios.get(`${BACKEND_URL}/identity/create/${accounts[0]}`);
      setKey(data.publicKey);
      const hash = await createIdentity(data.publicKey);
      setSuccess(true);
      
    }
  
  }

  const hideAlert = () => window.location.href = "/admin/dashboard"

  return (
    <>
      <Container fluid>
        {success ? 
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Success!"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="info"
        >
          Successfully created your identity
        </SweetAlert> : <></> }
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
                      {false ? 
                        
                        <Row style={{marginTop:'3%'}} >
                          <Col xs="12" >
                            <h5 className="ms-font bold">Your key:</h5>
                            <p className="ms-font">kty: {key.kty}</p>
                            <p className="ms-font">crv: {key.crv}</p>
                            <p className="ms-font">x: {key.x}</p>
                            <p className="ms-font">y: {key.y}</p>
                          </Col>
                        </Row>
                        : <></> }
                      <div className="text-center">
                        <Button
                          className="btn-fill pull-right"
                          variant="warning"
                          onClick={() => create()}
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
