import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope,FaMapMarkerAlt} from 'react-icons/fa';
import './Footer.css';
import imgvisa from '../../assets/images/cart pay/img visa.webp';
import imgmastercard from '../../assets/images/cart pay/img mastercard.jpg';
import imgmir from '../../assets/images/cart pay/img mir.jpg';
import facebookicon from '../../assets/images/icons/facebookicon.png';
import instagramicon from '../../assets/images/icons/instagramicon.png';
import twittericon from '../../assets/images/icons/twittericon.png';
import youtubeicon from '../../assets/images/icons/youtubeicon.png';
//import HomePage from './pages/HomePage/HomePage';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white pt-5 pb-4">
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <h5>Мини-Отель Трианон</h5>
                        <p className="mt-3">
                            Уютный мини-отель в центре города. 
                            Комфортабельные номера, отличный сервис 
                            и домашняя атмосфера.
                        </p>
                        <div className="social-links mt-4">
                            <a href="https://facebook.com" className="me-3">
                                {/* <FaFacebook size={24} /> */}
                                  <img src={facebookicon} alt="" height="30" className="me-2" />
                            </a>
                            <a href="https://instagram.com" className="me-3">
                                {/* <FaInstagram size={24} /> */}
                                 <img src={instagramicon} alt="" height="30" className="me-2" />
                            </a>
                            <a href="https://twitter.com" className="me-3">
                                {/* <FaTwitter size={24} /> */}
                                 <img src={twittericon} alt="" height="30" className="me-2" />
                            </a>
                            <a href="https://youtube.com">
                                {/* <FaYoutube size={24} /> */}
                                 <img src={youtubeicon} alt="" height="30" className="me-2" />
                            </a>
                        </div>
                    </Col>
                    
                    <Col md={4} className="mb-4">
                        <h5>Быстрые ссылки</h5>
                        <ul className="list-unstyled mt-3">
                            <li><Link to="/" className="text-white">Главная</Link></li>
                            <li><Link to="/rooms" className="text-white">Номера и цены</Link></li>
                            <li><Link to="/services" className="text-white">Услуги</Link></li>
                            <li><Link to="/promotions" className="text-white">Акции</Link></li>
                            <li><Link to="/about" className="text-white">О нас</Link></li>
                            <li><Link to="/contact" className="text-white">Контакты</Link></li>
                            <li><Link to="/adminDashboard" className="text-white">Панель администратора</Link></li>
                            <li><Link to="/privacyPolicy" className="text-white">Политика обработки персональных данных</Link></li>
                        </ul>
                    </Col>
                    
                    <Col md={4} className="mb-4">
                        <h5>Контакты</h5>
                        <div className="mt-3">
                            <p>
                                <FaMapMarkerAlt className="me-2" />
                                г. Москва, ул. Примерная, д. 123
                            </p>
                            <p>
                                <FaPhone className="me-2" />
                                +7 (495) 123-45-67
                            </p>
                            <p>
                                <FaEnvelope className="me-2" />
                                info@trianon-hotel.ru
                            </p>
                        </div>
                        
                        <div className="mt-4">
                            <h6>Принимаем к оплате:</h6>
                            <div className="payment-methods">
                                <img src={imgvisa} alt="Visa" height="30" className="me-2" />
                            <img src={imgmastercard} alt="MasterCard" height="30" className="me-2" />
                                <img src={imgmir} alt="Мир" height="30" />
                            </div>
                        </div>
                    </Col>
                </Row>
                
                <Row className="mt-4 pt-3 border-top">
                    <Col className="text-center">
                        <p className="mb-0">
                            © {new Date().getFullYear()} Мини-Отель Трианон. Все права защищены.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
