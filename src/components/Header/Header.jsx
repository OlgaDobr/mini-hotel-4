import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';
import logo2 from '../../assets/images/logo/logo2.png';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" sticky="top" className="header-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" className="hotel-logo">
                    <img 
                        src={logo2} 
                        alt="Мини-отель Трианон" 
                        height="50"
                    />
                    <span className="logo-text">Мини-Отель Трианон</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Главная</Nav.Link>
                        <Nav.Link as={Link} to="/rooms">Номера</Nav.Link>
                        <Nav.Link as={Link} to="/services">Услуги</Nav.Link>
                        <Nav.Link as={Link} to="/promotions">Акции</Nav.Link>
                        <Nav.Link as={Link} to="/about">О нас</Nav.Link>
                        <Nav.Link as={Link} to="/reviews">Отзывы</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Контакты</Nav.Link>
                        <Nav.Link as={Link} to="/adminRegister">Администратор</Nav.Link>
                    </Nav>
                    
                    <div className="d-flex ms-3">
                        <Button 
                            variant="outline-primary" 
                            as={Link} 
                            to="/booking"
                            className="me-2"
                        >
                            Забронировать
                        </Button>
                        <Button 
                            variant="primary" 
                            as={Link} 
                            to="/login"
                        >
                            Войти
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
