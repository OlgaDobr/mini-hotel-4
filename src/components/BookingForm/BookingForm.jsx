import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import './BookingForm.css';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        guest_name: '',
        guest_email: '',
        guest_phone: '',
        check_in: null,
        check_out: null,
        guests_count: 1,
        room_id: '',
        special_requests: ''
    });
    
    const [availableRooms, setAvailableRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleCheckAvailability = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:8000/api/check-availability', {
                check_in: formData.check_in,
                check_out: formData.check_out,
                guests: formData.guests_count
            });
            
            setAvailableRooms(response.data);
            setMessage({ type: 'success', text: 'Найдены доступные номера' });
        } catch (error) {
            setMessage({ type: 'danger', text: 'Ошибка при проверке доступности' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/api/bookings', formData);
            
            setMessage({ 
                type: 'success', 
                text: 'Бронирование успешно отправлено! Мы свяжемся с вами для подтверждения.' 
            });
            
            // Сброс формы
            setFormData({
                guest_name: '',
                guest_email: '',
                guest_phone: '',
                check_in: null,
                check_out: null,
                guests_count: 1,
                room_id: '',
                special_requests: ''
            });
            setAvailableRooms([]);
        } catch (error) {
            setMessage({ 
                type: 'danger', 
                text: 'Ошибка при бронировании. Пожалуйста, попробуйте еще раз.' 
            });
        }
    };

    return (
        <div className="booking-form-container">
            <h2 className="text-center mb-4">Бронирование номера</h2>
            
            {message.text && (
                <Alert variant={message.type} dismissible>
                    {message.text}
                </Alert>
            )}
            
            <Form onSubmit={handleSubmitBooking}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.guest_name}
                                onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
                                required
                            />
                        </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.guest_email}
                                onChange={(e) => setFormData({...formData, guest_email: e.target.value})}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control
                                type="tel"
                                value={formData.guest_phone}
                                onChange={(e) => setFormData({...formData, guest_phone: e.target.value})}
                                required
                            />
                        </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Количество гостей</Form.Label>
                            <Form.Select
                                value={formData.guests_count}
                                onChange={(e) => setFormData({...formData, guests_count: parseInt(e.target.value)})}
                            >
                                {[1,2,3,4].map(num => (
                                    <option key={num} value={num}>{num} {num === 1 ? 'гость' : 'гостя'}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Дата заезда</Form.Label>
                            <DatePicker
                                selected={formData.check_in}
                                onChange={(date) => setFormData({...formData, check_in: date})}
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                required
                            />
                        </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Дата выезда</Form.Label>
                            <DatePicker
                                selected={formData.check_out}
                                onChange={(date) => setFormData({...formData, check_out: date})}
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                minDate={formData.check_in || new Date()}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                
                <div className="text-center mb-4">
                    <Button 
                        variant="primary" 
                        onClick={handleCheckAvailability}
                        disabled={loading}
                    >
                        {loading ? 'Проверка...' : 'Проверить доступность'}
                    </Button>
                </div>
                
                {availableRooms.length > 0 && (
                    <div className="available-rooms mb-4">
                        <h4>Доступные номера:</h4>
                        <Row>
                            {availableRooms.map(room => (
                                <Col md={6} key={room.id} className="mb-3">
                                    <Card 
                                        className={`room-card ${formData.room_id === room.id ? 'selected' : ''}`}
                                        onClick={() => setFormData({...formData, room_id: room.id})}
                                    >
                                        <Card.Img variant="top" src={room.image_url} />
                                        <Card.Body>
                                            <Card.Title>{room.name}</Card.Title>
                                            <Card.Text>
                                                <strong>{room.price_per_night} ₽/ночь</strong>
                                                <br/>
                                                Вместимость: {room.capacity} гостей
                                                <br/>
                                                {room.description}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
                
                <Form.Group className="mb-3">
                    <Form.Label>Особые пожелания</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.special_requests}
                        onChange={(e) => setFormData({...formData, special_requests: e.target.value})}
                    />
                </Form.Group>
                
                <div className="text-center">
                    <Button 
                        type="submit" 
                        variant="success" 
                        size="lg"
                        disabled={!formData.room_id}
                    >
                        Подтвердить бронирование
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default BookingForm;
