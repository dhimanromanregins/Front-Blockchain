import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="justify-content-center">
        <Navbar.Brand as={Link} to="/">
          <img className="nav-logo" src="/binance.png" alt="Logo" />
        </Navbar.Brand>
        <div className="ml-auto">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              as={Link}
              to="/home"
              className={`custom-link ${activeLink === "/" ? "active" : ""}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={`custom-link ${
                activeLink === "/dashboard" ? "active" : ""
              }`}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={`custom-link ${
                activeLink === "/about" ? "active" : ""
              }`}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/developer"
              className={`custom-link ${
                activeLink === "/developer" ? "active" : ""
              }`}
            >
              Developer API
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/contact"
              className={`custom-link ${
                activeLink === "/contact" ? "active" : ""
              }`}
            >
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="ml-auto custom-link">
              <div onClick={handleLogout}>
                Logout <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
