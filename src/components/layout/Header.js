import { useContext } from "react";
import { Button, Col, Container, Form, Image, InputGroup, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";

const Header = () => {
    const nav = useNavigate();
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);




    return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Link to="/" className="nav-link">Trang chủ</Link>


            {user === null ? <>
              <Link to="/register" className="nav-link text-success">Đăng ký</Link>
              <Link to="/login" className="nav-link text-danger">Đăng nhập</Link>
            </>:<>
              <Link to="/" className="nav-link text-success">
                Chào {user}!
              </Link>
              <Button onClick={() => dispatch({"type": "logout"})} variant="danger">Đăng xuất</Button>
            </>}

            
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );
}

export default Header;