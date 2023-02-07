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

import Dropdown from "react-bootstrap/Dropdown"

import SweetAlert from "react-bootstrap-sweetalert";

import 'assets/css/custom.css'
import { Connect } from "assets/js/web3";
import axios from "axios";
import { BACKEND_URL, EDI_TRANSACTIONS, ITEM_TYPES } from "assets/js/constants";
import { createIdentity } from "assets/js/web3";

function AddItem() {
  const [key, setKey] = React.useState(key);
  const [success, setSuccess] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [organizations, setOrganizations] = React.useState([]);
  const [statusTypes, setStatusTypes] = React.useState([]);
  const [itemTypes, setItemTypes] = React.useState([])
  const [selectedUser, setSelectedUser] = React.useState("");
  const [selectedOrganization, setSelectedOrganization] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [selectedItemType, setSelectedItemType] = React.useState("");

  React.useEffect(() => {
    async function getOrganizations(){
      const {data} = await axios.get(`${BACKEND_URL}/organizations/`);
      setOrganizations(data.organizations);
    }
    getOrganizations();
    setItemTypes(EDI_TRANSACTIONS);
    setStatusTypes(ITEM_TYPES)
  }, []);

  React.useEffect(() => {
    async function getUsers(){
      const extension = organizations.find(organization => organization.name === selectedOrganization);
      if(!extension) return;
      const {data} = await axios.get(`${BACKEND_URL}/users?extension=${extension.email_extension}`);
      if(data.users){
        setUsers(data.users);
      }
    }
    getUsers();
  }, [selectedOrganization])

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
                        <Card.Title as="h3" className="ms-font bold">Add Item to Supply Chain</Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      
                      <Row style={{marginTop:'3%'}} >
                        <Col xs="12">
                          <p className="ms-font">The files you upload here will be encrypted and only the user specified below will be able to read the contents.</p>
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload File</Form.Label>
                            <Form.Control type="file" />
                          </Form.Group>
                        </Col>
                        <Col xs="12" md="6" className="gap-top">
                          <p className="ms-font">Select the organization:</p>
                          <Dropdown style={{textAlign:'left'}}>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="grey-bg">
                              {organizations && selectedOrganization.length > 0 ? selectedOrganization : "Select Organization"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {organizations.length > 0 && organizations.map(organization => 
                                <Dropdown.Item key={organization.id} onClick={() => setSelectedOrganization(organization.name)}>{organization.name}</Dropdown.Item>
                              )}
                            
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>
                        {users.length > 0 ?
                        <Col xs="12" md="6" className="gap-top">

                          <p className="ms-font">Select the user:</p>
                          <Dropdown style={{textAlign:'left'}}>
                              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="grey-bg">
                                {users && selectedUser.length > 0 ? selectedUser : "Select User"}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {users.length > 0 && users.map(user => 
                                  <Dropdown.Item key={user.id} onClick={() => setSelectedUser(user.username)}>{user.username + '@' + user.email_extension}</Dropdown.Item>
                                )}
                              
                              </Dropdown.Menu>
                            </Dropdown>
                        </Col> : <></> }
                        {selectedUser.length > 0 ?
                        <Col xs="12" className="gap-top">
                          <p className="ms-font">EDI Transaction:</p>
                          <Dropdown style={{textAlign:'left'}}>
                              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="grey-bg">
                                {itemTypes && selectedItemType.length > 0 ? selectedItemType : "EDI Transaction"}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {itemTypes.length > 0 && itemTypes.map(itemType => 
                                  <Dropdown.Item key={itemType.id} onClick={() => setSelectedItemType(itemType.name)}>{itemType.name}</Dropdown.Item>
                                )}
                              
                              </Dropdown.Menu>
                            </Dropdown>
                        </Col> : <></> }

                        {selectedUser.length > 0 ? 
                        <Col xs="12" className="gap-top">
                          <p className="ms-font">The current status of the item in the supply chain:</p>
                          <Dropdown style={{textAlign:'left'}}>
                              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="grey-bg">
                                {statusTypes && status.length > 0 ? status : "Status of Item"}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {statusTypes.length > 0 && statusTypes.map(currentStatus => 
                                  <Dropdown.Item key={currentStatus.id} onClick={() => setStatus(currentStatus.name)}>{currentStatus.name}</Dropdown.Item>
                                )}
                              
                              </Dropdown.Menu>
                            </Dropdown>
                        </Col> : <></> }
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
                          className="btn-fill pull-right orange-bg"
                          variant="warning"
                          onClick={() => create()}
                        >
                          Add Item
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

export default AddItem;
