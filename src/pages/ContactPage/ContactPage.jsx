// function Contact() {
//     return (
//         <div>
//             <h1>Contact Us</h1>
//             <p>Feel free to reach out to us with any questions.</p>
//         </div>
//     );
// }

// export default Contact;



import React, { useState } from 'react';
import { 
  Container, Row, Col, Form, Button, Card, 
  Alert, ListGroup, Modal 
} from 'react-bootstrap';
import { 
  MapPin, Phone, Mail, Clock, Facebook, 
  Instagram, Twitter, Youtube, Send,
  Navigation, MessageSquare
} from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет отправка формы на сервер
    console.log('Contact form submitted:', contactForm);
    setShowSuccessModal(true);
    setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: 'Адрес',
      details: ['г. Москва, ул. Тверская, д. 10', 'Метро: Тверская, Пушкинская'],
      link: 'https://maps.google.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Телефоны',
      details: ['+7 (495) 123-45-67', '+7 (800) 123-45-68'],
      link: 'tel:+74951234567'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      details: ['booking@trianon-hotel.ru', 'info@trianon-hotel.ru'],
      link: 'mailto:booking@trianon-hotel.ru'
    },
    {
      icon: <Clock size={24} />,
      title: 'Режим работы',
      details: ['Круглосуточно', 'Ресепшен: 24/7', 'Ресторан: 8:00-23:00'],
      link: null
    }
  ];

  const departments = [
    { name: 'Бронирование', email: 'booking@trianon-hotel.ru', phone: '+7 (495) 123-45-67' },
    { name: 'Ресторан', email: 'restaurant@trianon-hotel.ru', phone: '+7 (495) 123-45-68' },
    { name: 'Конференции', email: 'conference@trianon-hotel.ru', phone: '+7 (495) 123-45-69' },
    { name: 'Спа и фитнес', email: 'spa@trianon-hotel.ru', phone: '+7 (495) 123-45-70' }
  ];

  return (
    <Container className="contact-page py-5">
      <h1 className="text-center mb-5">Контакты</h1>

      {/* Contact Information */}
      <Row className="mb-5">
        <Col>
          <Card className="contact-info-card">
            <Card.Body>
              <Row className="g-4">
                {contactInfo.map((info, index) => (
                  <Col lg={3} md={6} key={index}>
                    <div className="contact-info-item text-center">
                      <div className="contact-icon mb-3">
                        {info.icon}
                      </div>
                      <h5 className="mb-3">{info.title}</h5>
                      {info.details.map((detail, i) => (
                        <p key={i} className="mb-1">{detail}</p>
                      ))}
                      {info.link && (
                        <Button 
                          variant="link" 
                          href={info.link}
                          className="mt-2"
                        >
                          Подробнее
                        </Button>
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Contact Form */}
        <Col lg={6} className="mb-5 mb-lg-0">
          <Card className="contact-form-card h-100">
            <Card.Body>
              <Card.Title className="mb-4">
                <MessageSquare size={24} className="me-2" />
                Напишите нам
              </Card.Title>
              
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Ваше имя *</Form.Label>
                      <Form.Control
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Телефон</Form.Label>
                  <Form.Control
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Тема *</Form.Label>
                  <Form.Select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    required
                  >
                    <option value="">Выберите тему</option>
                    <option value="booking">Бронирование</option>
                    <option value="question">Вопрос</option>
                    <option value="complaint">Жалоба</option>
                    <option value="suggestion">Предложение</option>
                    <option value="cooperation">Сотрудничество</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Сообщение *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                    placeholder="Опишите ваш вопрос или предложение..."
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100"
                >
                  <Send size={20} className="me-2" />
                  Отправить сообщение
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Departments and Social */}
        <Col lg={6}>
          <Row className="mb-4">
            <Col>
              <Card className="departments-card h-100">
                <Card.Body>
                  <Card.Title className="mb-4">Отделы отеля</Card.Title>
                  <ListGroup variant="flush">
                    {departments.map((dept, index) => (
                      <ListGroup.Item key={index} className="department-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{dept.name}</h6>
                            <small className="text-muted">{dept.email}</small>
                          </div>
                          <div className="text-end">
                            <div>{dept.phone}</div>
                            <Button variant="link" size="sm" href={`mailto:${dept.email}`}>
                              Написать
                            </Button>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card className="social-card">
                <Card.Body className="text-center">
                  <Card.Title className="mb-4">Мы в социальных сетях</Card.Title>
                  <p className="mb-4">Следите за новостями и акциями отеля</p>
                  
                  <div className="social-icons mb-4">
                    <Button variant="outline-primary" className="social-icon">
                      <Facebook size={24} />
                    </Button>
                    <Button variant="outline-danger" className="social-icon">
                      <Instagram size={24} />
                    </Button>
                    <Button variant="outline-info" className="social-icon">
                      <Twitter size={24} />
                    </Button>
                    <Button variant="outline-danger" className="social-icon">
                      <Youtube size={24} />
                    </Button>
                  </div>

                  <div className="directions">
                    <Button 
                      variant="success" 
                      href="https://maps.google.com"
                      target="_blank"
                      className="w-100"
                    >
                      <Navigation size={20} className="me-2" />
                      Проложить маршрут
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Сообщение отправлено</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            <Alert.Heading>Спасибо за ваше сообщение!</Alert.Heading>
            <p>
              Мы получили ваше сообщение и свяжемся с вами в ближайшее время. 
              Обычно мы отвечаем в течение 24 часов.
            </p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ContactPage;



