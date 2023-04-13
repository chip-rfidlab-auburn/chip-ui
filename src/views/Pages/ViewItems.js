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
import { IPFS_URL } from "assets/js/constants";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function ViewItems() {
  const [key, setKey] = React.useState(key);
  const [success, setSuccess] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const [transactionsSent, setTransactionsSent] = React.useState([]);
  const [docInfo, setDocInfo] = React.useState('');

  React.useEffect(() => {
    async function getInformation(){
      const {data} = await axios.get(`${BACKEND_URL}/supplychain/transactions`, {withCredentials: true});
      setTransactions(data.transactions);
      const txnsSent = await axios.get(`${BACKEND_URL}/supplychain/transactions`, {withCredentials: true, params: {'type':'sent'}});
      setTransactionsSent(txnsSent.data.transactions);
    }
    getInformation();
  }, [])

  const hideAlert = () => window.location.href = "/admin/dashboard";

  const [show, setShow] = React.useState(false);
  
  const handleClose = () => setShow(!show);

  const viewDocument = async (docHash) => {
    const getDoc = await axios.get(`${IPFS_URL}/${docHash}`);
    const {data} = await axios.get(`${BACKEND_URL}/supplychain/decrypt/${getDoc.data}`, {withCredentials: true});
    setDocInfo(data.decryptedDocument);
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
          Successfully added an item!
        </SweetAlert> : <></> }

        <Modal show={show} size="lg" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Document</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <p>{docInfo}</p>
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
                        <Card.Title as="h3" className="ms-font bold">Supply Chain</Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                    <Tabs
                        defaultActiveKey="received"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                      >
                        <Tab eventKey="received" title="Transactions Received">
                          <Row style={{marginTop:'3%'}} >
                            <Col>
                              <Table striped bordered hover>
                                <thead style={{textAlign:'center'}}>
                                  <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Sender</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                {transactions && transactions.length > 0 ? 
                                <tbody style={{textAlign:'center'}}>
                                  {transactions.map((transaction, index) => 
                                    <tr>
                                      <td>{index+1}</td>
                                      <td>{transaction.time}</td>
                                      <td>{transaction.user_from}</td>
                                      <td>
                                        <i onClick={() => viewDocument(transaction.edi_ipfs)} style={{cursor: "pointer"}} className="nc-icon nc-attach-87" />
                                      </td>
                                    </tr>
                                  )}
                                </tbody> : <></> }
                              </Table>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="sent" title="Transactions Sent">
                          <Row style={{marginTop:'3%'}} >
                            <Col>
                              <Table striped bordered hover>
                                <thead style={{textAlign:'center'}}>
                                  <tr>
                                    <th>Date</th>
                                    <th>#</th>
                                    <th>Receiver</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                {transactionsSent && transactionsSent.length > 0 ? 
                                <tbody style={{textAlign:'center'}}>
                                  {transactionsSent.map((transaction, index) => 
                                    <tr>
                                      <td></td>
                                      <td>{index+1}</td>
                                      <td>{transaction.user_to}</td>
                                      <td>
                                        <i onClick={() => viewDocument(transaction.edi_ipfs)} style={{cursor: "pointer"}} className="nc-icon nc-attach-87" />
                                      </td>
                                    </tr>
                                  )}
                                </tbody> : <></> }
                              </Table>
                            </Col>
                          </Row>
                        </Tab>
                      </Tabs>
                      
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
