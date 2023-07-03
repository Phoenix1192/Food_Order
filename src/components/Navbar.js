import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
function Navbarr() {
  let data = useCart();
  const [cartview,setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  return (
    <>
      <Navbar key={"md"} expand={"md"} className="bg-body-tertiary bg-danger">
        <Container fluid>
          <Navbar.Brand href="#" style={{ fontFamily: "Tilt Prism" }}>
            FOODMUNCH
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"md"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`}>
                FOODMUNCH
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="w-100 d-flex m-2">
                <div
                  id="mean"
                  className="container d-flex flex-md-row flex-column"
                  style={{ marginRight: "auto" }}
                >
                  <Nav.Link className="fs-5 " href="/">
                    Home
                  </Nav.Link>
                  {localStorage.getItem("authtoken") ? (
                    <Nav.Link className="fs-5 " href="/myOrder">
                      My Orders
                    </Nav.Link>
                  ) : (
                    ""
                  )}
                </div>

                {!localStorage.getItem("authtoken") ? (
                  <div id="ab" className="d-flex flex-md-row flex-column  ">
                    <Nav.Link
                      className="btn bg-white text-danger mx-1 "
                      href="/login"
                    >
                      Login
                    </Nav.Link>
                    <Nav.Link
                      className="btn bg-white text-danger mx-1"
                      href="/createuser"
                    >
                      Signup
                    </Nav.Link>
                  </div>
                ) : (
                  <div id="ab" className="d-flex flex-md-row flex-column ">
                    {/* <Nav.Link
                      className="btn bg-white text-danger mx-1"
                      href="/log"
                    >
                      My Cart <div class="badge bg-secondary">4</div>
                    </Nav.Link> */}
                    <Nav.Link
                     className="btn bg-white text-danger mx-1 position-relative"
                      onClick={()=>{setCartView(true)}}
                    >
                      My Cart {" "}
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                        {data.length}
                      </span>
                    </Nav.Link>
                    {cartview ? <Modal onClose={()=>setCartView(false)}>
                      <Cart></Cart>
                    </Modal>:null}
                    <Nav.Link
                      className="btn bg-white text-danger mx-1 "
                      onClick={handleLogout}
                    >
                      Logout
                    </Nav.Link>
                  </div>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarr;
