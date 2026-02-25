import React, { useState } from 'react';
import { 
  Container, Row, Col, Card, Form, Button, 
  Alert, Badge, Modal 
} from 'react-bootstrap';
import { 
  Star, User, Calendar, ThumbsUp, MessageSquare,
  Filter, SortAsc, Edit, Trash2
} from 'lucide-react';
import './ReviewsPage.css';

const ReviewsPage = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Иван Петров',
      rating: 5,
      date: '15.12.2023',
      stay: 'Стандартный номер, 3 ночи',
      text: 'Отличный отель! Очень чисто, уютно, персонал внимательный. Завтраки разнообразные и вкусные. Обязательно вернемся!',
      likes: 24,
      verified: true
    },
    {
      id: 2,
      name: 'Мария Иванова',
      rating: 4,
      date: '10.12.2023',
      stay: 'Люкс, 2 ночи',
      text: 'Прекрасное расположение, рядом все достопримечательности. Номер просторный, кровать очень удобная. Небольшой минус - слабый Wi-Fi в номере.',
      likes: 18,
      verified: true
    },
    {
      id: 3,
      name: 'Алексей Смирнов',
      rating: 5,
      date: '05.12.2023',
      stay: 'Бизнес-номер, 5 ночей',
      text: 'Идеально для деловой поездки. Тихий номер, хороший рабочий стол, быстрый интернет. Персонал помог с организацией встреч.',
      likes: 32,
      verified: false
    },
    {
      id: 4,
      name: 'Елена Кузнецова',
      rating: 3,
      date: '28.11.2023',
      stay: 'Семейный номер, 4 ночи',
      text: 'Хороший отель, но для семьи с детьми маловато места. Детям понравился бассейн. Завтраки могли бы быть разнообразнее.',
      likes: 12,
      verified: true
    },
    {
      id: 5,
      name: 'Дмитрий Васильев',
      rating: 5,
      date: '20.11.2023',
      stay: 'Стандартный номер, 2 ночи',
      text: 'Великолепный сервис! Отдельное спасибо администратору Анне за помощь с экскурсиями. Обязательно рекомендую друзьям.',
      likes: 29,
      verified: true
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    stay: '',
    text: ''
  });

  const [filters, setFilters] = useState({
    rating: 'all',
    sort: 'newest'
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toLocaleDateString('ru-RU'),
      stay: newReview.stay,
      text: newReview.text,
      likes: 0,
      verified: false
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ name: '', email: '', rating: 5, stay: '', text: '' });
    setShowReviewForm(false);
  };

  const handleLike = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, likes: review.likes + 1 } : review
    ));
  };

  const filteredReviews = reviews.filter(review => {
    if (filters.rating === 'all') return true;
    return review.rating === parseInt(filters.rating);
  }).sort((a, b) => {
    if (filters.sort === 'newest') {
      return new Date(b.date.split('.').reverse().join('-')) - 
             new Date(a.date.split('.').reverse().join('-'));
    }
    return b.likes - a.likes;
  });

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <Container className="reviews-page py-5">
      <h1 className="text-center mb-5">Отзывы наших гостей</h1>

      {/* Statistics */}
      <Row className="mb-5">
        <Col>
          <Card className="statistics-card">
            <Card.Body>
              <Row className="text-center">
                <Col md={3}>
                  <div className="stat-item">
                    <h2>{reviews.length}</h2>
                    <p>Всего отзывов</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <h2>{averageRating.toFixed(1)}</h2>
                    <p>Средний рейтинг</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <h2>94%</h2>
                    <p>Рекомендуют отель</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="stat-item">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={() => setShowReviewForm(true)}
                    >
                      <MessageSquare size={20} className="me-2" />
                      Оставить отзыв
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={6}>
          <div className="filter-section">
            <Filter size={20} className="me-2" />
            <Form.Select 
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
              className="d-inline-block w-auto"
            >
              <option value="all">Все оценки</option>
              <option value="5">5 звезд</option>
              <option value="4">4 звезды</option>
              <option value="3">3 звезды</option>
              <option value="2">2 звезды</option>
              <option value="1">1 звезда</option>
            </Form.Select>
          </div>
        </Col>
        <Col md={6} className="text-md-end">
          <div className="sort-section">
            <SortAsc size={20} className="me-2" />
            <Form.Select 
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
              className="d-inline-block w-auto"
            >
              <option value="newest">Сначала новые</option>
              <option value="popular">По популярности</option>
            </Form.Select>
          </div>
        </Col>
      </Row>

      {/* Reviews List */}
      <Row>
        <Col>
          {filteredReviews.map((review) => (
            <Card key={review.id} className="review-card mb-4">
              <Card.Body>
                <Row>
                  <Col md={3} className="mb-3 mb-md-0">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar mb-2">
                        <User size={40} />
                      </div>
                      <h5>{review.name}</h5>
                      {review.verified && (
                        <Badge bg="success" className="mb-2">
                          Проверенный отзыв
                        </Badge>
                      )}
                      <div className="review-date">
                        <Calendar size={14} className="me-1" />
                        {review.date}
                      </div>
                      <div className="review-stay">
                        <small className="text-muted">{review.stay}</small>
                      </div>
                    </div>
                  </Col>
                  
                  <Col md={9}>
                    <div className="review-rating mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={20}
                          className={i < review.rating ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                      <span className="ms-2 fw-bold">{review.rating}.0</span>
                    </div>
                    
                    <Card.Text className="review-text">
                      {review.text}
                    </Card.Text>
                    
                    <div className="review-actions mt-3">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleLike(review.id)}
                      >
                        <ThumbsUp size={16} className="me-1" />
                        Полезно ({review.likes})
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

      {/* Review Form Modal */}
      <Modal show={showReviewForm} onHide={() => setShowReviewForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Оставить отзыв</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitReview}>
          <Modal.Body>
            <Alert variant="info">
              Ваш отзыв поможет другим гостям сделать правильный выбор
            </Alert>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ваше имя *</Form.Label>
                  <Form.Control
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    value={newReview.email}
                    onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Оценка *</Form.Label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    className={`rating-star ${star <= newReview.rating ? 'selected' : ''}`}
                    onClick={() => setNewReview({...newReview, rating: star})}
                  />
                ))}
                <span className="ms-3">{newReview.rating} звезд</span>
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Тип проживания</Form.Label>
              <Form.Select
                value={newReview.stay}
                onChange={(e) => setNewReview({...newReview, stay: e.target.value})}
              >
                <option value="">Выберите вариант</option>
                <option value="Стандартный номер">Стандартный номер</option>
                <option value="Улучшенный номер">Улучшенный номер</option>
                <option value="Люкс">Люкс</option>
                <option value="Бизнес-номер">Бизнес-номер</option>
                <option value="Семейный номер">Семейный номер</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Ваш отзыв *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={newReview.text}
                onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                placeholder="Расскажите о вашем опыте проживания..."
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowReviewForm(false)}>
              Отмена
            </Button>
            <Button variant="primary" type="submit">
              Отправить отзыв
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ReviewsPage;
