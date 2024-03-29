import React from "react";
import PropTypes from "prop-types";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Col,
  Dropdown,
  Form,
} from "react-bootstrap";

function FixedPlugin({
  setSidebarImageParent,
  setSidebarBackgroundParent,
  sidebarDefaultImage,
  sidebarImages,
  backgroundColors,
  backgroundColor,
}) {
  const [imageSwitch, setImageSwitch] = React.useState(true);
  const [sidebarSwitch, setSidebarSwitch] = React.useState(false);
  const [navbarSwitch, setNavbarSwitch] = React.useState(false);
  const [sidebarImage, setSidebarImage] = React.useState(sidebarDefaultImage);
  return (
    <>
      <div className="fixed-plugin">
        <Dropdown className="show-dropdown">
          <Dropdown.Toggle>
            <i className="fas fa-cogs fa-2x"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <li className="header-title">Sidebar Style</li>
            <li className="adjustments-line d-flex align-items-center">
              <p className="pt-0 mr-auto">Background Image</p>
              <Form.Check
                type="switch"
                id="custom-switch-1-image"
                checked={imageSwitch}
                onChange={() => {
                  imageSwitch
                    ? setSidebarImageParent("")
                    : setSidebarImageParent(sidebarImage);
                  setImageSwitch(!imageSwitch);
                }}
              />
            </li>
            <li className="adjustments-line d-flex align-items-center">
              <p className="pt-0 mr-auto">Sidebar Mini</p>
              <Form.Check
                type="switch"
                id="custom-switch-2-sidebarSwitch"
                checked={sidebarSwitch}
                onChange={() => {
                  document.body.classList.contains("sidebar-mini")
                    ? setSidebarSwitch(false)
                    : setSidebarSwitch(true);
                  document.body.classList.toggle("sidebar-mini");
                }}
              />
            </li>
            <li className="adjustments-line d-flex align-items-center">
              <p className="pt-0 mr-auto">Fixed Navbar</p>
              <Form.Check
                type="switch"
                id="custom-switch-3-navbar"
                checked={navbarSwitch}
                onChange={() => {
                  setNavbarSwitch(!navbarSwitch);
                  document
                    .querySelector(".navbar")
                    .classList.toggle("fixed-top");
                  document
                    .querySelector(".main-panel")
                    .classList.toggle("mt-5");
                }}
              />
            </li>
            <li className="adjustments-line d-flex align-items-center">
              <p className="pt-0 mr-auto">Filters</p>
              <div>
                {backgroundColors.map((prop, key) => (
                  <Badge
                    key={key}
                    variant={prop}
                    onClick={() => setSidebarBackgroundParent(prop)}
                    className={prop === backgroundColor ? "active" : ""}
                  ></Badge>
                ))}
              </div>
            </li>
            
            {false ? 
            <li className="button-container d-flex justify-content-center">
              <Button className="mr-2" id="twitter" variant="twitter">
                <i className="fab fa-twitter"></i>
              </Button>
              <Button id="facebook" variant="facebook">
                <i className="fab fa-facebook-square"></i>
              </Button>
            </li> : <></> }
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

FixedPlugin.defaultProps = {
  setSidebarImageParent: () => {},
  setSidebarBackgroundParent: () => {},
  sidebarDefaultImage: "",
  sidebarImages: [],
  backgroundColors: [],
};

FixedPlugin.propTypes = {
  setSidebarImageParent: PropTypes.func,
  setSidebarBackgroundParent: PropTypes.func,
  sidebarDefaultImage: PropTypes.string,
  sidebarImages: PropTypes.arrayOf(PropTypes.string),
  // these are colors that can be passed to the Badge component
  backgroundColors: PropTypes.arrayOf(PropTypes.string),
};

export default FixedPlugin;
