import { BACKEND_URL } from "assets/js/constants";
import axios from "axios";
import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Col
} from "react-bootstrap";

function LoginPage() {
  const [cardClasses, setCardClasses] = React.useState("card-hidden");
  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses("");
    }, 1000);
  });

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = async () => {
    const {data} = await axios.post(`${BACKEND_URL}/users/login`, {
      username: userName,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    if(data.success) {
      window.location.href = "/admin/dashboard"
    }
  }

  return (
    <>
      <div
        className="full-page section-image"
        data-color="black"
        data-image={require("assets/img/full-screen-image-2.jpg")}
      >
        <div className="content d-flex align-items-center p-0">
          <Container>
            <Col className="mx-auto" lg="4" md="8">
              <Form action="" className="form" method="">
                <Card className={"card-login " + cardClasses}>
                  <Card.Header>
                    <h3 className="header text-center">Login</h3>
                  </Card.Header>
                  <Card.Body>
                    <Card.Body>
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          placeholder="Username"
                          type="text"
                          onChange={(e) => setUserName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          placeholder="Password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      
                    </Card.Body>
                  </Card.Body>
                  <Card.Footer className="ml-auto mr-auto">
                    <Button className="btn-wd orange-bg" onClick={() => login()} variant="warning">
                      Login
                    </Button>
                  </Card.Footer>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
        <div
          className="full-page-background"
          style={{
            backgroundImage:
              "url(" + require("assets/img/full-screen-image-2.jpg") + ")"
          }}
        ></div>
      </div>
    </>
  );
}

export default LoginPage;
