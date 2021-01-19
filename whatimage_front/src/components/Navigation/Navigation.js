import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" className="mb-5">
            <Navbar.Brand href="/">What Image ?</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Classifier</Nav.Link>
                <Nav.Link href="/list">Images List</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Navigation;