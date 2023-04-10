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

function Users() {
  const [key, setKey] = React.useState(key);
  const [success, setSuccess] = React.useState(false);
  const [adminCheck, setAdminCheck] = React.useState(false);
  const [assignCheck, setAssignCheck] = React.useState(false);
  const [sendCheck, setSendCheck] = React.useState(false);
  const [readCheck, setReadCheck] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [error, setError] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState({});

  React.useEffect(() => {
    async function getInformation(){
      const users = await axios.get(`${BACKEND_URL}/users`, {withCredentials: true});
      if(users.data.success) setAllUsers(users.data.users);
      else setError(users.data.error);
    }
    getInformation();
  }, []);

  const hideAlert = () => setSuccess(!success);

  const [show, setShow] = React.useState(false);
  
  const handleClose = () => setShow(!show);

  const updatePerm = (perm) => {
    if(perm === 'admin') {
      setAdminCheck(!adminCheck)
    } else if(perm === 'assign') {
      setAssignCheck(!assignCheck);
    } else if(perm === 'send') {
      setSendCheck(!sendCheck);
    } else if(perm === 'read') {
      setReadCheck(!readCheck)
    }
  }

  const confirm = async () => {
    const userId = selectedUser.id;
    const body = {
      assign_perm: assignCheck ? 1 : 0,
      read_perm: readCheck ? 1 : 0,
      send_perm: sendCheck ? 1 : 0,
      admin : adminCheck ? 1 : 0,
      id: userId
    }
    console.log(body);
    const {data} = await axios.post(`${BACKEND_URL}/users/update-permissions`, body, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    if(data.success) {
      setShow(!show);
      setSuccess(true);
    }
  }

  const showUserInfo = (id) => {
    const user = allUsers.find(user => user.id === id);
    setSelectedUser(user);
    console.log(user);
    if(user.admin === 1){
      setAdminCheck(true);
    } if(user.assign_perm === 1){
      setAssignCheck(true);
    } if(user.send_perm === 1){
      setSendCheck(true);
    } if(user.read_perm === 1) {
      setReadCheck(true);
    }
    setShow(!show);
  }

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
          Successfully updated permissions!
        </SweetAlert> : <></> }

        <Modal show={show} size="lg" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser.email}</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <h6>Current Role: {selectedUser.admin === 1 ? 'Admin' : 'User'}</h6>
            <InputGroup className="mb-3">
              <InputGroup.Checkbox checked={adminCheck} onChange={() => updatePerm('admin')} aria-label="Checkbox for following text input" />
              <span style={{marginLeft:'2%'}}>Admin</span>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Checkbox checked={assignCheck} onChange={() => updatePerm('assign')} aria-label="Checkbox for following text input" />
              <span style={{marginLeft:'2%'}}>Assign</span>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Checkbox checked={sendCheck} onChange={() => updatePerm('send')} aria-label="Checkbox for following text input" />
              <span style={{marginLeft:'2%'}}>Send</span>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Checkbox checked={readCheck} onChange={() => updatePerm('read')} aria-label="Checkbox for following text input" />
              <span style={{marginLeft:'2%'}}>Read</span>
            </InputGroup>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className="orange-bg" onClick={() => confirm()}>
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
                        <Card.Title as="h3" className="ms-font bold">Users</Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      {error.length > 0 ? <p style={{color: 'red', textAlign: 'center'}}>{error}</p> : 
                      <Row style={{marginTop:'3%'}} >
                        <Col>
                          <Table striped bordered hover>
                            <thead style={{textAlign:'center'}}>
                              <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>User Type</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            {allUsers && allUsers.length > 0 ? 
                            <tbody style={{textAlign:'center'}}>
                              {allUsers.map((user, index) => 
                                <tr key={user.id}>
                                  <td>{index+1}</td>
                                  <td>{user.email}</td>
                                  <td>{user.admin === 1 ? 'Admin' : 'User'}</td>
                                  <td>
                                    <i onClick={() => showUserInfo(user.id)} style={{cursor: "pointer"}} className="nc-icon nc-zoom-split" />
                                  </td>
                                </tr> 
                              )}
                              
                            </tbody> : <></>}
                          </Table>
                        </Col>
                      </Row> }
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

export default Users;
