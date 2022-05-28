import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Home from '../page/home'
import Login from '../page/login'
import Register from '../page/register'
import LoginPage from '../page/loginPage'
import CheckDogs from '../page/checkDogs'
import DeleteDogs from '../page/deleteDog'
import AddDogs from '../page/addDogs'
import SearchDogs from '../page/SearchDogs'

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
                                 
                                <Nav.Link as={Link} to="/SearchDogs">Search Dogs</Nav.Link>
                                {localStorage.getItem('accessToken')?<Nav.Link as={Link} to="/loginPage">Employee</Nav.Link>:null}
                                {!localStorage.getItem('accessToken')?<Nav.Link as={Link} to="/login">Login</Nav.Link>:null}
                                {!localStorage.getItem('accessToken')?<Nav.Link as={Link} to="/Register">Register</Nav.Link>:null}
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
                        <Route path='/checkDogs' element={<CheckDogs />}></Route>
                        <Route path='/deleteDogs' element={<DeleteDogs />}></Route>
                        <Route path='/addDogs' element={<AddDogs />}></Route>
                        <Route path='/SearchDogs' element={<SearchDogs />}></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}