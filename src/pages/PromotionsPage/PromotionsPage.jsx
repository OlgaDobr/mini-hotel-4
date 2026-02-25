import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Calendar, Clock, Percent, Star, Gift, Users } from 'lucide-react';
import './PromotionsPage.css';

const PromotionsPage = () => {
  const promotions = [
    {
      id: 1,
      title: 'Раннее бронирование',
      description: 'Забронируйте номер за 30 дней до заезда и получите скидку 20%',
      discount: '20%',
      period: 'Действует до 31.12.2024',
      conditions: 'Применяется ко всем типам номеров, минимальное пребывание - 2 ночи',
      badge: 'Популярное',
      badgeVariant: 'success'
    },
    {
      id: 2,
      title: 'Семейный отдых',
      description: 'Специальные условия для семей с детьми',
      discount: '15%',
      period: 'Круглый год',
      conditions: 'Дети до 12 лет размещаются бесплатно, дополнительная кровать предоставляется',
      badge: 'Для семей',
      badgeVariant: 'info'
    },
    {
      id: 3,
      title: 'Длительное проживание',
      description: 'Скидка при проживании от 7 ночей',
      discount: '25%',
      period: 'Постоянно',
      conditions: 'Применяется на стоимость проживания от 7 ночей и более',
      badge: 'Выгодно',
      badgeVariant: 'warning'
    },
    {
      id: 4,
      title: 'Выходные в отеле',
      description: 'Специальный пакет "Романтические выходные"',
      discount: '30%',
      period: 'Пятница-воскресенье',
      conditions: 'Включены: завтрак, ужин, спа-процедуры',
      badge: 'Романтика',
      badgeVariant: 'danger'
    },
    {
      id: 5,
      title: 'Бизнес-пакет',
      description: 'Специальные условия для бизнес-путешественников',
      discount: '10%',
      period: 'Пн-Чт',
      conditions: 'Бесплатный трансфер, ранний заезд, поздний выезд',
      badge: 'Бизнес',
      badgeVariant: 'dark'
    },
    {
      id: 6,
      title: 'День рождения',
      description: 'Подарок имениннику',
      discount: 'Подарок',
      period: 'В день рождения',
      conditions: 'Бесплатное улучшение номера, торт, поздравление',
      badge: 'Праздник',
      badgeVariant: 'primary'
    }
  ];

  return (
    <Container className="promotions-page py-5">
      <h1 className="text-center mb-5">Акции и специальные предложения</h1>
      
      <Row className="mb-5">
        <Col>
          <div className="promotions-intro text-center mb-4">
            <p className="lead">
              Следите за нашими специальными предложениями и экономьте на проживании. 
              Мы регулярно обновляем акции, чтобы сделать ваш отдых еще более приятным и доступным.
            </p>
          </div>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {promotions.map((promo) => (
          <Col key={promo.id}>
            <Card className="h-100 promotion-card shadow-sm">
              {promo.badge && (
                <div className="promotion-badge">
                  <Badge bg={promo.badgeVariant}>{promo.badge}</Badge>
                </div>
              )}
              
              <Card.Body>
                <div className="discount-badge mb-3">
                  <Percent size={24} />
                  <span className="discount-value">{promo.discount}</span>
                </div>
                
                <Card.Title className="mb-3">{promo.title}</Card.Title>
                <Card.Text className="mb-4">{promo.description}</Card.Text>
                
                <div className="promotion-details mb-3">
                  <div className="detail-item mb-2">
                    <Calendar size={16} className="me-2" />
                    <small>{promo.period}</small>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} className="me-2" />
                    <small>{promo.conditions}</small>
                  </div>
                </div>
              </Card.Body>
              
              <Card.Footer className="text-center">
                <Button variant="primary" className="w-100">
                  Забронировать со скидкой
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="bonus-program-card">
            <Card.Body className="text-center">
              <Gift size={64} className="mb-3 text-primary" />
              <Card.Title className="mb-3">Программа лояльности</Card.Title>
              <Card.Text className="mb-4">
                Станьте участником программы лояльности "Трианон Премиум" и получайте дополнительные бонусы:
              </Card.Text>
              
              <Row>
                <Col md={4} className="mb-3">
                  <Star size={32} className="text-warning mb-2" />
                  <h5>Накопительные баллы</h5>
                  <p>1 балл за каждые 1000 рублей</p>
                </Col>
                <Col md={4} className="mb-3">
                  <Users size={32} className="text-info mb-2" />
                  <h5>Привилегии</h5>
                  <p>Ранний заезд, поздний выезд</p>
                </Col>
                <Col md={4} className="mb-3">
                  <Percent size={32} className="text-success mb-2" />
                  <h5>Эксклюзивные скидки</h5>
                  <p>До 25% на дополнительные услуги</p>
                </Col>
              </Row>
              
              <Button variant="outline-primary" size="lg">
                Узнать больше о программе
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PromotionsPage;
