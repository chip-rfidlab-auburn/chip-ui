import React from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Modal,
  Container,
  Row,
  Col
} from "react-bootstrap";

import Badge from "react-bootstrap/Badge";

import Dropdown from "react-bootstrap/Dropdown"

import SweetAlert from "react-bootstrap-sweetalert";
import Table from 'react-bootstrap/Table';

import 'assets/css/custom.css'
import { Connect } from "assets/js/web3";
import axios from "axios";
import { BACKEND_URL, EDI_TRANSACTIONS, ITEM_TYPES } from "assets/js/constants";
import { createIdentity } from "assets/js/web3";
import { uploadToIpfs } from "assets/js/web3";
import { CompactEncrypt, importJWK } from "jose";
import { addItemToChain } from "assets/js/web3";
import { getSupplyChainInformation } from "assets/js/web3";
import { getIdentity } from "assets/js/web3";

function ViewItems() {
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
  const [file,setFile] = React.useState();
  const [identity, setIdentity] = React.useState({});
  const [user, setUser] = React.useState('');

  React.useEffect(() => {
    async function getInformation(){
      const info = await getSupplyChainInformation();
      await getIdentity();
    }
    getInformation();
  }, [])

  const hideAlert = () => window.location.href = "/admin/dashboard";

  const [show, setShow] = React.useState(false);
  
  const handleClose = () => setShow(!show);

  return (
    <>
      <Container fluid>
        {success ? 
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          titl="Success!"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="info"
        >
          Successfully added an item!
        </SweetAlert> : <></> }

        <Modal show={show} size="lg" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Nike - Shoes</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <h6>7 Transactions Found</h6>
            <Table striped bordered hover>
              <thead style={{textAlign:'center'}}>
                <tr>
                  <th>#</th>
                  <th>Action</th>
                  <th>Updated At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody style={{textAlign:'center'}}>
                <tr>
                  <td>1</td>
                  <td>CREATE</td>
                  <td>{new Date().toDateString()}</td>
                  <td style={{color:'green'}}>Source Tag</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>UPDATE</td>
                  <td>{new Date().toDateString()}</td>
                  <td style={{color:'green'}}>Currently at Manufacturer Warehouse</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>READ</td>
                  <td>{new Date().toDateString()}</td>
                  <td style={{color:'green'}}>Received at Supplier Warehouse</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>UPDATE</td>
                  <td>{new Date().toDateString()}</td>
                  <td style={{color:'green'}}>Sent to Retailer Warehouse</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>READ</td>
                  <td>{new Date().toDateString()}</td>
                  <td style={{color:'green'}}>Received at Retailer Warehouse</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className="orange-bg" onClick={handleClose}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="section-image ms-font" data-image="../../assets/img/bg5.jpg" >
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
            <Row>
              <Col xs="12">
                <Form action="" className="form" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h3" className="ms-font bold">Supply Chain Discovery</Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      
                      <Row style={{marginTop:'3%'}} >
                        <Col>
                          <Table striped bordered hover>
                            <thead style={{textAlign:'center'}}>
                              <tr>
                                <th>#</th>
                                <th>Company</th>
                                <th>Product</th>
                                <th>Status</th>
                                <th>Read More</th>
                              </tr>
                            </thead>
                            <tbody style={{textAlign:'center'}}>
                              <tr>
                                <td>1</td>
                                <td>Nike</td>
                                <td>Shoes</td>
                                <td style={{color:'green'}}>Currently at Retailer</td>
                                <td>
                                  <i onClick={() => setShow(!show)} style={{cursor: "pointer"}} className="nc-icon nc-zoom-split" />
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Nike</td>
                                <td>Apparel</td>
                                <td style={{color:'green'}}>Currently at Retailer</td>
                                <td>
                                  <i onClick={() => setShow(!show)} style={{cursor: "pointer"}} className="nc-icon nc-zoom-split" />
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>Walmart</td>
                                <td>Electronics</td>
                                <td style={{color:'green'}}>Currently at Manufacturer Warehouse</td>
                                <td>
                                  <i onClick={() => setShow(!show)} style={{cursor: "pointer"}} className="nc-icon nc-zoom-split" />
                                </td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>Walmart</td>
                                <td>Apparel</td>
                                <td style={{color:'green'}}>Currently at Retailer</td>
                                <td>
                                  <i onClick={() => setShow(!show)} style={{cursor: "pointer"}} className="nc-icon nc-zoom-split" />
                                </td>
                              </tr>
                              <tr>
                                <td>5</td>
                                <td>Wendy's</td>
                                <td>Processed Food</td>
                                <td style={{color:'green'}}>Currently at Retailer</td>
                                <td>
                                  <i onClick={() => setShow(!show)} style={{cursor: "pointer"}} className="nc-icon nc-zoom-split" />
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      
                        
                      </Row>
                      {false ? 
                      <div className="text-center">
                        <Button
                          className="btn-fill pull-right orange-bg"
                          variant="warning"
                          onClick={() => addItem()}
                        >
                          Add Item
                        </Button>
                      </div> : <></> }
                      
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

export default ViewItems;
