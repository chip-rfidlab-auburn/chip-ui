import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Media,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function RegisterPage() {
  return (
    <>
      <div
        className="full-page register-page section-image"
        data-color="blue"
        data-image={require("assets/img/bg5.jpg")}
      >
        <div className="content d-flex align-items-center">
          <Container>
            <Card className="card-register card-plain text-center">
              <Card.Header>
                <Row className="justify-content-center">
                  <Col md="8">
                    <div className="header-text">
                      <Card.Title as="h2">
                        CHIP @ RFID Lab
                      </Card.Title>
                      <Card.Subtitle as="h4">
                        Register for free and experience the innovative and transparent supply chain solutions today
                      </Card.Subtitle>
                      <hr></hr>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col className="ml-auto" md="7" lg="5">
                    <Media>
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-circle-09"></i>
                        </div>
                      </div>
                      <Media.Body>
                        <h4>Wallet Support</h4>
                        <p>
                          Here, you will be provided with an Ethereum compatible wallet to perform transactions directly with
                          the network.
                        </p>
                      </Media.Body>
                    </Media>
                    <Media>
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-preferences-circle-rotate"></i>
                        </div>
                      </div>
                      <Media.Body>
                        <h4>Low cost transactions</h4>
                        <p>
                          Transactions take place on a low-cost Ethereum compatible network, providing you with the savings you've 
                          never seen before.
                        </p>
                      </Media.Body>
                    </Media>
                    <Media>
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-planet"></i>
                        </div>
                      </div>
                      <Media.Body>
                        <h4>Blockchain integrated solution</h4>
                        <p>
                          All transactions are recorded onto the blockchain, therefore providing enhanced level
                          of transparency.
                        </p>
                      </Media.Body>
                    </Media>
                  </Col>
                  <Col className="mr-auto" md="5" lg="4">
                    <Form action="#" method="#">
                      <Card className="card-plain">
                        <div className="card-body">
                          <Form.Group>
                            <Form.Control
                              placeholder="Your First Name"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Your Last Name"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Company"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Enter email"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Password"
                              type="password"
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Password Confirmation"
                              type="password"
                            ></Form.Control>
                          </Form.Group>
                        </div>
                        <div className="card-footer text-center">
                          <Button
                            className="btn-fill btn-neutral btn-wd"
                            type="submit"
                            variant="default"
                          >
                            Create Free Account
                          </Button>
                        </div>
                      </Card>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
        <div
          className="full-page-background"
          style={{
            backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")"
          }}
        ></div>
      </div>
    </>
  );
}

export default RegisterPage;
