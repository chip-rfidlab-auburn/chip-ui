import { BACKEND_URL } from "assets/js/constants";
import { createWallet } from "assets/js/web3";
import axios from "axios";
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

import Dropdown from "react-bootstrap/Dropdown"

import SweetAlert from "react-bootstrap-sweetalert";

function RegisterPage() {

  const [companies, setCompanies] = React.useState([]);

  const [company, setCompany] = React.useState();
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordsMatch, setPasswordsMatch] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    async function getOrganizations(){
      const {data} = await axios.get(`${BACKEND_URL}/organizations/`);
      setCompanies(data.organizations);
    }
    getOrganizations();
  }, []);

  const createAccount = async () => {
    const extension = email.split('@')[1];
    const selected_company = companies.find(Company => Company.name === company);
    if(selected_company.email_extension !== extension) {
      setErrorMessage(`Expected an email with domain ${selected_company.email_extension}`);
      return;
    }
    
    const wallet = await createWallet();
    const saveWallet = await axios.post(`${BACKEND_URL}/wallets/save`, {
      address: wallet.address,
      private_key: wallet.privateKey
    });
    if(saveWallet.data.success) {

      const body = {
        username: userName,
        password: password,
        email_extension: extension,
        wallet_address: wallet.address
      };
      const acc = await axios.post(`${BACKEND_URL}/users/create`,body);
      if(acc.data.success) {
        setSuccess(true);
      }
    }
    
  }

  const hideAlert = () => window.location.href="/admin/create-identity";

  return (
    <>
      <div
        className="full-page register-page section-image"
        data-color="black"
        data-image={require("assets/img/bg5.jpg")}
      >
        <div className="content d-flex align-items-center">
          {success ? 
          <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="Success!"
            onConfirm={() => hideAlert()}
            onCancel={() => hideAlert()}
            confirmBtnBsStyle="info"
          >
            Successfully created an account
          </SweetAlert> : <></> }
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
                              placeholder="Your User Name"
                              type="text"
                              onChange={(e) => setUserName(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          
                            <Dropdown style={{textAlign:'left'}}>
                              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="grey-bg">
                                {company && company.length > 0 ? company : "Company"}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {companies.length > 0 && companies.map(company => 
                                  <Dropdown.Item key={company.id} onClick={() => setCompany(company.name)}>{company.name}</Dropdown.Item>
                                )}
                              
                              </Dropdown.Menu>
                            </Dropdown>
                          
                          <Form.Group>
                            <Form.Control
                              placeholder="Enter email"
                              type="email"
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorMessage('');
                              }}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Password"
                              type="password"
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordsMatch(false);
                              }}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              placeholder="Password Confirmation"
                              type="password"
                              onChange={(e) => {
                                if(e.target.value === password) setPasswordsMatch(true);
                                else setPasswordsMatch(false);
                              }}
                            ></Form.Control>
                          </Form.Group>
                          {(password.length > 0 && !passwordsMatch) || errorMessage ? <p className="color-red text-left">{errorMessage ? errorMessage : "Passwords do not match"}</p> : <></>}
                        </div>
                        <div className="card-footer text-center">
                          <Button
                            className="grey-bg"
                            variant="default"
                            disabled={!passwordsMatch}
                            onClick={() => createAccount()}
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
