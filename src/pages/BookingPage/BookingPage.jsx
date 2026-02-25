// import React from 'react';
// import BookingForm from '../../components/BookingForm/BookingForm';

// function Booking() {
//     return (
//         <div>
//             <h1>Book Your Stay</h1>
//             <BookingForm />
//         </div>
//     );
// }

// export default Booking;




import React, { useState } from 'react';
import { 
  Container, Row, Col, Form, Button, Card, 
  Alert, Modal, Tab, Tabs, Badge 
} from 'react-bootstrap';
import { 
  Calendar, Users, CreditCard, CheckCircle,
  Star, Wifi, Coffee, Car, Utensils,
  Shield, Clock, XCircle
} from 'lucide-react';
import './BookingPage.css';

const BookingPage = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    roomType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'card'
  });

  const roomTypes = [
    {
      id: 'standard',
      name: 'Стандартный номер',
      description: 'Уютный номер с одной двуспальной кроватью',
      price: 4500,
      amenities: ['Wi-Fi', 'Кондиционер', 'Телевизор', 'Сейф'],
      capacity: 'До 2-х человек',
      image: 'https://via.placeholder.com/400x250'
    },
    {
      id: 'superior',
      name: 'Улучшенный номер',
      description: 'Просторный номер с видом на город',
      price: 6500,
      amenities: ['Wi-Fi', 'Кондиционер', 'Мини-бар', 'Телевизор', 'Сейф', 'Халаты'],
      capacity: 'До 2-х человек',
      image: 'https://via.placeholder.com/400x250'
    },
    {
      id: 'suite',
      name: 'Люкс',
      description: 'Номер с гостиной зоной и гидромассажной ванной',
      price: 12000,
      amenities: ['Wi-Fi', 'Кондиционер', 'Мини-бар', 'Телевизор 55"', 'Сейф', 'Халаты', 'Тапочки', 'Кофемашина'],
      capacity: 'До 3-х человек',
      image: 'https://via.placeholder.com/400x250'
    },
    {
      id: 'family',
      name: 'Семейный номер',
      description: 'Две комнаты, идеально для семьи с детьми',
      price: 8500,
      amenities: ['Wi-Fi', 'Кондиционер', 'Две кровати', 'Телевизор', 'Сейф', 'Микроволновка'],
      capacity: 'До 4-х человек',
      image: 'https://via.placeholder.com/400x250'
    }
  ];

  const handleNextStep = () => {
    if (bookingStep < 4) {
      setBookingStep(bookingStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    // Здесь будет отправка данных бронирования на сервер
    console.log('Booking submitted:', bookingData);
    setShowSuccessModal(true);
  };

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    const room = roomTypes.find(r => r.id === bookingData.roomType);
    if (!room) return 0;
    
    const nights = calculateNights();
    let total = room.price * nights;
    
    // Доплата за детей
    if (bookingData.children > 0) {
      total += bookingData.children * 500 * nights;
    }
    
    return total;
  };

  const renderStep = () => {
    switch (bookingStep) {
      case 1:
        return (
          <div className="booking-step">
            <h4 className="mb-4">Шаг 1: Даты и гости</h4>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Дата заезда *</Form.Label>
                  <Form.Control
                    type="date"
                    value={bookingData.checkIn}
                    onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Дата выезда *</Form.Label>
                  <Form.Control
                    type="date"
                    value={bookingData.checkOut}
                    onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Взрослые</Form.Label>
                  <Form.Select
                    value={bookingData.adults}
                    onChange={(e) => setBookingData({...bookingData, adults: parseInt(e.target.value)})}
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num} взрослых</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Дети</Form.Label>
                  <Form.Select
                    value={bookingData.children}
                    onChange={(e) => setBookingData({...bookingData, children: parseInt(e.target.value)})}
                  >
                    {[0, 1, 2, 3].map(num => (
                      <option key={num} value={num}>{num} детей</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>
        );
      
      case 2:
        return (
          <div className="booking-step">
            <h4 className="mb-4">Шаг 2: Выбор номера</h4>
            <Row className="g-4">
              {roomTypes.map((room) => (
                <Col md={6} key={room.id}>
                  <Card 
                    className={`room-card ${bookingData.roomType === room.id ? 'selected' : ''}`}
                    onClick={() => setBookingData({...bookingData, roomType: room.id})}
                  >
                    <Card.Body>
                      <div className="room-header mb-3">
                        <h5>{room.name}</h5>
                        <Badge bg="primary">{room.price} ₽/ночь</Badge>
                      </div>
                      
                      <p className="text-muted mb-3">{room.description}</p>
                      
                      <div className="room-amenities mb-3">
                        <h6>Удобства:</h6>
                        <div className="amenities-list">
                          {room.amenities.map((amenity, index) => (
                            <span key={index} className="amenity-badge">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="room-capacity">
                        <Users size={16} className="me-2" />
                        {room.capacity}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      
      case 3:
        return (
          <div className="booking-step">
            <h4 className="mb-4">Шаг 3: Ваши данные</h4>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Имя *</Form.Label>
                  <Form.Control
                    type="text"
                    value={bookingData.firstName}
                    onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Фамилия *</Form.Label>
                  <Form.Control
                    type="text"
                    value={bookingData.lastName}
                    onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Телефон *</Form.Label>
                  <Form.Control
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Особые пожелания</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                    placeholder="Укажите дополнительные пожелания (ранний заезд, поздний выезд, диетические требования и т.д.)"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        );
      
      case 4:
        return (
          <div className="booking-step">
            <h4 className="mb-4">Шаг 4: Подтверждение и оплата</h4>
            
            <Alert variant="info" className="mb-4">
              <CheckCircle size={20} className="me-2" />
              Пожалуйста, проверьте данные бронирования перед оплатой
            </Alert>
            
            <Row>
              <Col md={8}>
                <Card className="mb-4">
                  <Card.Body>
                    <h5>Детали бронирования</h5>
                    <Row className="mt-3">
                      <Col md={6}>
                        <div className="booking-detail">
                          <strong>Даты:</strong>
                          <p>{bookingData.checkIn} - {bookingData.checkOut}</p>
                          <small>{calculateNights()} ночей</small>
                        </div>
                        
                        <div className="booking-detail">
                          <strong>Гости:</strong>
                          <p>{bookingData.adults} взрослых, {bookingData.children} детей</p>
                        </div>
                      </Col>
                      
                      <Col md={6}>
                        <div className="booking-detail">
                          <strong>Номер:</strong>
                          <p>{roomTypes.find(r => r.id === bookingData.roomType)?.name}</p>
                        </div>
                        
                        <div className="booking-detail">
                          <strong>Контактные данные:</strong>
                          <p>{bookingData.firstName} {bookingData.lastName}</p>
                          <p>{bookingData.email}</p>
                          <p>{bookingData.phone}</p>
                        </div>
                      </Col>
                    </Row>
                    
                    {bookingData.specialRequests && (
                      <div className="booking-detail mt-3">
                        <strong>Особые пожелания:</strong>
                        <p>{bookingData.specialRequests}</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
                
                <Card>
                  <Card.Body>
                    <h5>Способ оплаты</h5>
                    <Tabs defaultActiveKey="card" className="mb-3">
                      <Tab eventKey="card" title="Банковская карта">
                        <Form.Group className="mt-3">
                          <Form.Label>Номер карты</Form.Label>
                          <Form.Control type="text" placeholder="1234 5678 9012 3456" />
                        </Form.Group>
                        
                        <Row className="mt-3">
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Срок действия</Form.Label>
                              <Form.Control type="text" placeholder="MM/YY" />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>CVV</Form.Label>
                              <Form.Control type="text" placeholder="123" />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Tab>
                      
                      <Tab eventKey="cash" title="Наличные в отеле">
                        <Alert variant="warning" className="mt-3">
                          Оплата наличными производится при заселении. 
                          Номер будет забронирован после подтверждения по телефону.
                        </Alert>
                      </Tab>
                    </Tabs>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={4}>
                <Card className="sticky-top booking-summary">
                  <Card.Body>
                    <h5>Итого к оплате</h5>
                    
                    <div className="summary-item">
                      <span>Проживание:</span>
                      <span>{calculateTotal()} ₽</span>
                    </div>
                    
                    <div className="summary-item">
                      <span>Налоги и сборы:</span>
                      <span>Включены</span>
                    </div>
                    
                    <hr />
                    
                    <div className="summary-total">
                      <strong>Итого:</strong>
                      <strong>{calculateTotal()} ₽</strong>
                    </div>
                    
                    <div className="terms-agreement mt-4">
                      <Form.Check
                        type="checkbox"
                        label="Я согласен с правилами бронирования и отмены"
                        required
                      />
                    </div>
                    
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-100 mt-3"
                      onClick={handleSubmitBooking}
                    >
                      <CreditCard size={20} className="me-2" />
                      Подтвердить и оплатить
                    </Button>
                    
                    <div className="security-info mt-3 text-center">
                      <Shield size={16} className="me-1" />
                      <small className="text-muted">Безопасная оплата</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container className="booking-page py-5">
      <h1 className="text-center mb-5">Бронирование номера</h1>
      
      {/* Booking Progress */}
      <Row className="mb-5">
        <Col>
          <div className="booking-progress">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className={`progress-step ${step === bookingStep ? 'active' : ''} ${step < bookingStep ? 'completed' : ''}`}
              >
                <div className="step-number">{step}</div>
                <div className="step-label">
                  {step === 1 && 'Даты'}
                  {step === 2 && 'Номер'}
                  {step === 3 && 'Данные'}
                  {step === 4 && 'Оплата'}
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      {/* Booking Form */}
      <Row>
        <Col>
          <Card className="booking-form-card">
            <Card.Body>
              <Form onSubmit={handleSubmitBooking}>
                {renderStep()}
                
                <div className="booking-navigation mt-5">
                  {bookingStep > 1 && (
                    <Button variant="outline-secondary" onClick={handlePrevStep}>
                      Назад
                    </Button>
                  )}
                  
                  {bookingStep < 4 ? (
                    <Button 
                      variant="primary" 
                      onClick={handleNextStep}
                      disabled={!bookingData.checkIn || !bookingData.checkOut}
                      className="float-end"
                    >
                      Далее
                    </Button>
                  ) : null}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Бронирование подтверждено!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <CheckCircle size={80} className="text-success mb-4" />
            <h4>Спасибо за бронирование!</h4>
            <p className="mb-4">
              Ваш номер успешно забронирован. Подтверждение отправлено на email: 
              <strong> {bookingData.email}</strong>
            </p>
            
            <Card className="confirmation-details">
              <Card.Body>
                <h5>Детали бронирования:</h5>
                <p><strong>Номер брони:</strong> TRN-{Date.now().toString().slice(-8)}</p>
                <p><strong>Номер:</strong> {roomTypes.find(r => r.id === bookingData.roomType)?.name}</p>
                <p><strong>Даты:</strong> {bookingData.checkIn} - {bookingData.checkOut}</p>
                <p><strong>Итого:</strong> {calculateTotal()} ₽</p>
              </Card.Body>
            </Card>
            
            <Alert variant="info" className="mt-4">
              <Clock size={20} className="me-2" />
              Заезд с 14:00, выезд до 12:00. При необходимости раннего заезда или позднего выезда, 
              пожалуйста, свяжитесь с нами заранее.
            </Alert>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Закрыть
          </Button>
          <Button variant="outline-primary">
            Распечатать подтверждение
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookingPage;
