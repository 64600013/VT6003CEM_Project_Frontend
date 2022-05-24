import React from 'react'
// bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// react router
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// screens
import Home from '../page/home';
import Login from '../page/login';
import Register from '../page/register';
import LoginPage from '../page/loginPage';



export default function Header() {
    return (
        <BrowserRouter>
            <div>
                <>
                    <Navbar bg="primary" variant="dark">
                        <Container fluid>
                            <Navbar.Brand as={Link} to="/" style={{ marginLeft: '.5rem' }}>
                                The Dogs
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Nav className="me-auto">

                            </Nav>
                            <Nav>
                                <Nav.Link as={Link} to="/loginPage">Employee</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/Register">Register</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </>
                <div>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                        <Route path='/loginPage' element={<LoginPage />}></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}