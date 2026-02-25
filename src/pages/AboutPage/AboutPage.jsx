// import React from 'react';

// function About() {
//     return (
//         <div>
//             <h1>About Us</h1>
//             <p>Learn more about our hotel and our mission.</p>
//         </div>
//     );
// }

// export default About;



import React from 'react';
import { Container, Row, Col, Card, Image, Accordion } from 'react-bootstrap';
import { 
  Award, Shield, Heart, Users, MapPin, Clock,
  Building, Star, CheckCircle
} from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Анна Иванова',
      position: 'Управляющий директор',
      experience: '15 лет в гостиничном бизнесе',
      description: 'Опытный руководитель с международным опытом'
    },
    {
      name: 'Михаил Петров',
      position: 'Главный администратор',
      experience: '10 лет работы с клиентами',
      description: 'Специалист по организации безупречного сервиса'
    },
    {
      name: 'Елена Смирнова',
      position: 'Шеф-повар',
      experience: '12 лет кулинарного опыта',
      description: 'Автор уникальных меню ресторана отеля'
    },
    {
      name: 'Дмитрий Кузнецов',
      position: 'Менеджер по бронированию',
      experience: '8 лет в сфере туризма',
      description: 'Эксперт по организации мероприятий'
    }
  ];

  const achievements = [
    { icon: <Award />, title: 'Лучший отель 2023', description: 'По версии Travel Awards' },
    { icon: <Shield />, title: 'Высокий стандарт', description: 'Международный сертификат качества' },
    { icon: <Heart />, title: '95% довольных гостей', description: 'По отзывам на Booking.com' },
    { icon: <Users />, title: '5000+ гостей', description: 'Обслужено за год' }
  ];

  return (
    <Container className="about-page py-5">
      <h1 className="text-center mb-5">О нашем отеле</h1>
      
      {/* Hero Section */}
      <Row className="mb-5">
        <Col lg={6} className="mb-4 mb-lg-0">
          <div className="about-hero-image">
            <Image 
              src="https://via.placeholder.com/600x400" 
              alt="Отель Трианон" 
              fluid 
              rounded
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className="about-hero-content">
            <h2 className="mb-4">Добро пожаловать в отель "Трианон"</h2>
            <p className="lead mb-4">
              Расположенный в историческом центре города, отель "Трианон" сочетает в себе 
              классическую элегантность и современный комфорт. Мы создали атмосферу уюта 
              и гостеприимства, где каждый гость чувствует себя особенным.
            </p>
            <div className="d-flex align-items-center mb-3">
              <MapPin className="me-3 text-primary" size={24} />
              <div>
                <h5>Идеальное расположение</h5>
                <p className="mb-0">В шаговой доступности от главных достопримечательностей</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <Clock className="me-3 text-primary" size={24} />
              <div>
                <h5>Круглосуточный сервис</h5>
                <p className="mb-0">Мы работаем для вас 24 часа в сутки, 7 дней в неделю</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Achievements */}
      <Row className="mb-5">
        <Col>
          <h3 className="text-center mb-4">Наши достижения</h3>
          <Row className="g-4">
            {achievements.map((achievement, index) => (
              <Col md={3} sm={6} key={index}>
                <Card className="text-center achievement-card h-100">
                  <Card.Body>
                    <div className="achievement-icon mb-3">
                      {achievement.icon}
                    </div>
                    <Card.Title>{achievement.title}</Card.Title>
                    <Card.Text>{achievement.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Team */}
      <Row className="mb-5">
        <Col>
          <h3 className="text-center mb-4">Наша команда</h3>
          <Row className="g-4">
            {teamMembers.map((member, index) => (
              <Col lg={3} md={6} key={index}>
                <Card className="team-card h-100">
                  <Card.Body className="text-center">
                    <div className="team-member-photo mb-3">
                      <Building size={64} />
                    </div>
                    <Card.Title>{member.name}</Card.Title>
                    <Card.Subtitle className="mb-3 text-primary">
                      {member.position}
                    </Card.Subtitle>
                    <Card.Text className="mb-2">
                      <small className="text-muted">{member.experience}</small>
                    </Card.Text>
                    <Card.Text>
                      <small>{member.description}</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* FAQ */}
      <Row>
        <Col>
          <h3 className="text-center mb-4">Часто задаваемые вопросы</h3>
          <Accordion className="faq-accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <CheckCircle size={20} className="me-2 text-success" />
                Какое время заезда и выезда?
              </Accordion.Header>
              <Accordion.Body>
                Заезд с 14:00, выезд до 12:00. Возможен ранний заезд и поздний выезд 
                при наличии свободных номеров (дополнительная плата).
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <CheckCircle size={20} className="me-2 text-success" />
                Можно ли с животными?
              </Accordion.Header>
              <Accordion.Body>
                Да, мы принимаем гостей с небольшими домашними животными. 
                Требуется предварительное уведомление и дополнительный депозит.
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <CheckCircle size={20} className="me-2 text-success" />
                Есть ли парковка?
              </Accordion.Header>
              <Accordion.Body>
                Да, у нас есть охраняемая парковка для гостей отеля. 
                Количество мест ограничено, рекомендуется бронировать заранее.
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <CheckCircle size={20} className="me-2 text-success" />
                Какие способы оплаты принимаются?
              </Accordion.Header>
              <Accordion.Body>
                Мы принимаем наличные (рубли), банковские карты (Visa, MasterCard, Мир), 
                а также безналичный расчет для юридических лиц.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;

