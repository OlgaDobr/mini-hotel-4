import React from 'react';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import Header from '../../components/Header/Header';
//import Footer from '../../components/Footer/Footer';
import BookingForm from '../../components/BookingForm/BookingForm';
import './HomePage.css';
import img2 from '../../assets/images/image/img2.jpg';
import img3 from '../../assets/images/image/img3.jpg';
import img13 from '../../assets/images/image/img13.jpg';

const HomePage = () => {
    const rooms = [
        {
            id: 1,
            name: "Стандарт",
            price: 3500,
            image: "/images/room1.jpg",
            description: "Уютный номер с современным дизайном"
        },
        {
            id: 2,
            name: "Люкс",
            price: 5500,
            image: "/images/room2.jpg",
            description: "Просторный номер с видом на город"
        },
        {
            id: 3,
            name: "Семейный",
            price: 7500,
            image: "/images/room3.jpg",
            description: "Идеально для семейного отдыха"
        }
    ];

    return (
        <>
            {/* <Header /> */}
            
            {/* Hero Section */}
            <section className="hero-section">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img2}
                            alt="Первый слайд"
                        />
                        <Carousel.Caption>
                            <h1>Добро пожаловать в отель Трианон</h1>
                            <p>Комфорт и уют в самом сердце города</p>
                            <Button as={Link} to="/booking" variant="primary" size="lg">
                                Забронировать номер
                            </Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img3}
                            alt="Второй слайд"
                        />
                        <Carousel.Caption>
                            <h1>Специальные предложения</h1>
                            <p>Скидка 15% при бронировании от 3 ночей</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </section>
            
            {/* About Section */}
            <section className="about-section py-5">
                <Container>
                    <Row>
                        <Col md={6}>
                            <h2>О нашем отеле</h2>
                            <p>
                                Мини-отель Трианон предлагает комфортабельное проживание 
                                в центре города. Мы сочетаем домашний уют с качественным 
                                сервисом европейского уровня.
                            </p>
                            <ul>
                                <li>Бесплатный Wi-Fi на всей территории</li>
                                <li>Парковка для гостей</li>
                                <li>Завтрак включен в стоимость</li>
                                <li>Круглосуточная стойка регистрации</li>
                            </ul>
                        </Col>
                        <Col md={6}>
                            <img 
                                src={img13} 
                                alt="Отель" 
                                className="img-fluid rounded"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            
            {/* Rooms Preview */}
            <section className="rooms-section py-5 bg-light">
                <Container>
                    <h2 className="text-center mb-5">Наши номера</h2>
                    <Row>
                        {rooms.map(room => (
                            <Col md={4} key={room.id} className="mb-4">
                                <Card className="h-100">
                                    <Card.Img variant="top" src={room.image} />
                                    <Card.Body>
                                        <Card.Title>{room.name}</Card.Title>
                                        <Card.Text>{room.description}</Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="price">{room.price} ₽/ночь</span>
                                            <Button as={Link} to={`/room/${room.id}`}>
                                                Подробнее
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="text-center mt-4">
                        <Button as={Link} to="/rooms" variant="outline-primary">
                            Все номера
                        </Button>
                    </div>
                </Container>
            </section>
            
            {/* Booking Section */}
            <section className="booking-section py-5">
                <Container>
                    <h2 className="text-center mb-4"></h2>
                    <BookingForm />
                </Container>
            </section>
            
            {/* <Footer /> */}
        </>
    );
};

export default HomePage;
