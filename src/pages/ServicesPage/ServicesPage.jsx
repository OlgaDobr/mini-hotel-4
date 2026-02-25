// import React from 'react';

// function Services() {
//     return (
//         <div>
//             <h1>Our Services</h1>
//             <ul>
//                 <li>Free Wi-Fi</li>
//                 <li>Breakfast Included</li>
//                 <li>Room Service</li>
//             </ul>
//         </div>
//     );
// }

// export default Services;

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Wifi, Coffee, Car, Utensils, Tv, Wind, ShowerHead, Dumbbell, Waves, ConciergeBell } from 'lucide-react';
import './ServicesPage.css';

const ServicesPage = () => {
  const services = [
    {
      icon: <Wifi size={48} />,
      title: 'Бесплатный Wi-Fi',
      description: 'Высокоскоростной интернет во всех номерах и общественных зонах отеля',
      details: 'Скорость до 100 Мбит/с, стабильное соединение, поддержка нескольких устройств'
    },
    {
      icon: <Coffee size={48} />,
      title: 'Завтрак "шведский стол"',
      description: 'Питательный завтрак включен в стоимость проживания',
      details: 'Ежедневно с 7:00 до 11:00, разнообразное меню, свежие продукты'
    },
    {
      icon: <Car size={48} />,
      title: 'Парковка',
      description: 'Охраняемая парковка для гостей отеля',
      details: 'Крытая и открытая парковка, видеонаблюдение, 24/7 охрана'
    },
    {
      icon: <Utensils size={48} />,
      title: 'Ресторан',
      description: 'Ресторан с европейской и русской кухней',
      details: 'Работает с 8:00 до 23:00, детское меню, доставка в номер'
    },
    {
      icon: <Tv size={48} />,
      title: 'Спутниковое ТВ',
      description: 'Более 100 каналов на разных языках',
      details: 'Кабельное и спутниковое телевидение, фильмы по запросу'
    },
    {
      icon: <Wind size={48} />,
      title: 'Кондиционер',
      description: 'Климат-контроль во всех номерах',
      details: 'Индивидуальная регулировка температуры, режимы работы'
    },
    {
      icon: <ShowerHead size={48} />,
      title: 'Собственная ванная',
      description: 'В каждом номере отдельная ванная комната',
      details: 'Фен, косметические принадлежности, полотенца'
    },
    {
      icon: <Dumbbell size={48} />,
      title: 'Фитнес-зал',
      description: 'Современный тренажерный зал',
      details: 'Кардиотренажеры, силовое оборудование, персональные тренировки'
    },
    {
      icon: <Waves size={48} />,
      title: 'Сауна',
      description: 'Финская сауна с бассейном',
      details: 'Предварительная запись, аренда на час, дополнительные услуги'
    },
    {
      icon: <ConciergeBell size={48} />,
      title: 'Консьерж-сервис',
      description: 'Помощь в организации экскурсий и трансферов',
      details: 'Бронирование билетов, заказ такси, рекомендации по городу'
    }
  ];

  return (
    <Container className="services-page py-5">
      <h1 className="text-center mb-5">Услуги отеля</h1>
      
      <Row className="mb-5">
        <Col>
          <div className="service-intro text-center mb-4">
            <p className="lead">
              В отеле "Трианон" мы создали все условия для комфортного отдыха наших гостей. 
              Наши услуги направлены на то, чтобы сделать ваше пребывание максимально приятным и запоминающимся.
            </p>
          </div>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {services.map((service, index) => (
          <Col key={index}>
            <Card className="h-100 service-card shadow-sm">
              <Card.Body className="text-center">
                <div className="service-icon mb-3">
                  {service.icon}
                </div>
                <Card.Title className="mb-3">{service.title}</Card.Title>
                <Card.Text className="mb-3">{service.description}</Card.Text>
                <div className="service-details">
                  <small className="text-muted">{service.details}</small>
                </div>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button variant="outline-primary" size="sm">
                  Подробнее
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="additional-services-card">
            <Card.Body>
              <Card.Title className="text-center mb-4">Дополнительные услуги</Card.Title>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Прачечная и химчистка</li>
                    <li className="mb-2">✓ Услуги няни (по запросу)</li>
                    <li className="mb-2">✓ Прокат велосипедов</li>
                    <li className="mb-2">✓ Бизнес-центр</li>
                    <li className="mb-2">✓ Конференц-залы</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Трансфер от/до аэропорта</li>
                    <li className="mb-2">✓ Аренда автомобилей</li>
                    <li className="mb-2">✓ Организация экскурсий</li>
                    <li className="mb-2">✓ Доставка еды в номер 24/7</li>
                    <li className="mb-2">✓ Медицинская помощь</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServicesPage;

