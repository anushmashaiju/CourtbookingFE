import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../../Pages/Css/MainNavBar.css"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { useState } from 'react';

function MainNavBar() {
  //const [openBasic,setOpenBasic]=useState(false)
const{userDetails}=useSelector(state=>state.user)
const navigate=useNavigate()
const doLogout=()=>{
  //localStorage.remove('token')
  //localStorage.remove('user')
  localStorage.clear()
  navigate('/')
}
  return (
    <Navbar expand="lg" className="navBar-box">
      <Container fluid>
        <Navbar.Brand href="#">BOOK YOUR COURT</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/home">Home</Nav.Link>
           { userDetails.role===1 && <Nav.Link href="/addNewCourt">AddNewCourt</Nav.Link>}
            <Nav.Link href="/mybookings">My Bookings</Nav.Link>
           
            <Nav.Link href="#" disabled>
              Courtbooking
            </Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Type query"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline">Search</Button>          

            <NavDropdown title={userDetails.fname} id="navbarScrollingDropdown"> 
              <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action4"> Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5" onClick={doLogout} > Logout </NavDropdown.Item>
            </NavDropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavBar;
