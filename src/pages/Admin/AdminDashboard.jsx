// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Table, Badge, Button } from 'react-bootstrap';
// import axios from 'axios';

// const AdminDashboard = () => {
//     const [bookings, setBookings] = useState([]);
//     const [reviews, setReviews] = useState([]);

//     useEffect(() => {
//         fetchBookings();
//         setReviews();
//     }, []);

//     const fetchBookings = async () => {
//         const response = await axios.get('/api/admin/bookings');
//         setBookings(response.data);
//     };

//     const updateBookingStatus = async (id, status) => {
//         await axios.put(`/api/admin/bookings/${id}`, { status });
//         fetchBookings();
//     };

//     const approveReview = async (id) => {
//         await axios.put(`/api/admin/reviews/${id}/approve`);
//         setReviews();
//     };

//     return (
//         <Container>
//             <h1>Панель администратора</h1>
            
//             <Row className="mt-4">
//                 <Col>
//                     <h3>Бронирования</h3>
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Гость</th>
//                                 <th>Номер</th>
//                                 <th>Даты</th>
//                                 <th>Сумма</th>
//                                 <th>Статус</th>
//                                 <th>Действия</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {bookings.map(booking => (
//                                 <tr key={booking.id}>
//                                     <td>{booking.id}</td>
//                                     <td>{booking.guest_name}</td>
//                                     <td>{booking.room.name}</td>
//                                     <td>{booking.check_in} - {booking.check_out}</td>
//                                     <td>{booking.total_price} ₽</td>
//                                     <td>
//                                         <Badge bg={
//                                             booking.status === 'confirmed' ? 'success' :
//                                             booking.status === 'cancelled' ? 'danger' : 'warning'
//                                         }>
//                                             {booking.status}
//                                         </Badge>
//                                     </td>
//                                     <td>
//                                         {booking.status === 'pending' && (
//                                             <>
//                                                 <Button 
//                                                     size="sm" 
//                                                     variant="success"
//                                                     onClick={() => updateBookingStatus(booking.id, 'confirmed')}
//                                                 >
//                                                     Подтвердить
//                                                 </Button>
//                                                 <Button 
//                                                     size="sm" 
//                                                     variant="danger"
//                                                     onClick={() => updateBookingStatus(booking.id, 'cancelled')}
//                                                     className="ms-2"
//                                                 >
//                                                     Отменить
//                                                 </Button>
//                                             </>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Col>
//             </Row>
            
//             <Row className="mt-4">
//                 <Col>
//                     <h3>Отзывы на модерации</h3>
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Бронирование</th>
//                                 <th>Оценка</th>
//                                 <th>Отзыв</th>
//                                 <th>Действия</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {reviews.map(review => (
//                                 <tr key={review.id}>
//                                     <td>{review.id}</td>
//                                     <td>#{review.booking_id}</td>
//                                     <td>{'★'.repeat(review.rating)}</td>
//                                     <td>{review.comment}</td>
//                                     <td>
//                                         <Button 
//                                             size="sm" 
//                                             variant="success"
//                                             onClick={() => approveReview(review.id)}
//                                         >
//                                             Одобрить
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default AdminDashboard;





import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button,  Modal, Form, Alert, Tab, Tabs, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentBooking, setCurrentBooking] = useState(null);
  const [roomForm, setRoomForm] = useState({
    name: '',
    description: '',
    price_per_night: '',
    capacity: '',
    amenities: ''
  });
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalUsers: 0,
    totalRooms: 10
  });

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('user_role');
    
    if (!token || role !== 'admin') {
      navigate('/login');
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const [bookingsRes, usersRes, roomsRes] = await Promise.all([
        axios.get('http://localhost:8000/api/admin/bookings', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get('http://localhost:8000/api/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get('http://localhost:8000/api/admin/rooms', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      setBookings(bookingsRes.data.bookings || []);
      setUsers(usersRes.data.users || []);
      setRooms(roomsRes.data.rooms || []);
      
      setStats({
        totalBookings: bookingsRes.data.total || 0,
        activeBookings: bookingsRes.data.active || 0,
        totalUsers: usersRes.data.total || 0,
        totalRooms: roomsRes.data.total || 0
      });
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId, action) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8000/api/admin/bookings/${bookingId}/${action}`,
        {},
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchData();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/admin/rooms',
        roomForm,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchData();
        setShowModal(false);
        setRoomForm({
          name: '',
          description: '',
          price_per_night: '',
          capacity: '',
          amenities: ''
        });
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'success',
      cancelled: 'danger',
      completed: 'info'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-6">Панель администратора</h1>
          <p className="text-muted">Добро пожаловать, {localStorage.getItem('user_name')}</p>
        </Col>
      </Row>

      {/* Статистика */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-white bg-primary mb-3">
            <Card.Body>
              <Card.Title>Всего бронирований</Card.Title>
              <Card.Text className="display-6">{stats.totalBookings}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-success mb-3">
            <Card.Body>
              <Card.Title>Активные бронирования</Card.Title>
              <Card.Text className="display-6">{stats.activeBookings}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-info mb-3">
            <Card.Body>
              <Card.Title>Пользователи</Card.Title>
              <Card.Text className="display-6">{stats.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-warning mb-3">
            <Card.Body>
              <Card.Title>Номера</Card.Title>
              <Card.Text className="display-6">{stats.totalRooms}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Быстрые действия */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Быстрые действия</Card.Title>
              <Button 
                variant="primary" 
                className="me-2"
                onClick={() => {
                  setModalType('addRoom');
                  setShowModal(true);
                }}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Добавить номер
              </Button>
              <Button 
                variant="success" 
                className="me-2"
                as={Link}
                to="/admin/register"
              >
                <i className="bi bi-person-plus me-2"></i>
                Добавить администратора
              </Button>
              <Button 
                variant="info"
                onClick={fetchData}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Обновить данные
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Табы */}
      <Tabs defaultActiveKey="bookings" className="mb-4">
        <Tab eventKey="bookings" title="Бронирования">
          <Card>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Гость</th>
                    <th>Номер</th>
                    <th>Даты</th>
                    <th>Стоимость</th>
                    <th>Статус</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id}>
                      <td>#{booking.id}</td>
                      <td>{booking.user?.name}</td>
                      <td>{booking.room?.name}</td>
                      <td>
                        {new Date(booking.check_in).toLocaleDateString()} - 
                        {new Date(booking.check_out).toLocaleDateString()}
                      </td>
                      <td>{booking.total_price} ₽</td>
                      <td>{getStatusBadge(booking.status)}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="me-2"
                          onClick={() => {
                            setCurrentBooking(booking);
                            setModalType('viewBooking');
                            setShowModal(true);
                          }}
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                        {booking.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline-success"
                              className="me-2"
                              onClick={() => handleBookingAction(booking.id, 'confirm')}
                            >
                              Подтвердить
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleBookingAction(booking.id, 'cancel')}
                            >
                              Отклонить
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="users" title="Пользователи">
          <Card>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Бронирования</th>
                    <th>Дата регистрации</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.bookings_count || 0}</td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="rooms" title="Номера">
          <Card>
            <Card.Body>
              <Button
                variant="primary"
                className="mb-3"
                onClick={() => {
                  setModalType('addRoom');
                  setShowModal(true);
                }}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Добавить номер
              </Button>
              
              <Row>
                {rooms.map(room => (
                  <Col md={6} lg={4} key={room.id} className="mb-3">
                    <Card>
                      <Card.Img 
                        variant="top" 
                        src={room.image || 'https://via.placeholder.com/300x200'} 
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <Card.Body>
                        <Card.Title>{room.name}</Card.Title>
                        <Card.Text>{room.description}</Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="h5 text-primary">{room.price_per_night} ₽/ночь</span>
                          <Badge bg="secondary">Вместимость: {room.capacity}</Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Модальные окна */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'viewBooking' ? 'Детали бронирования' : 'Добавить номер'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'viewBooking' && currentBooking && (
            <div>
              <h5>Информация о бронировании #{currentBooking.id}</h5>
              <p><strong>Гость:</strong> {currentBooking.user?.name}</p>
              <p><strong>Email:</strong> {currentBooking.user?.email}</p>
              <p><strong>Телефон:</strong> {currentBooking.user?.phone}</p>
              <p><strong>Номер:</strong> {currentBooking.room?.name}</p>
              <p><strong>Дата заезда:</strong> {new Date(currentBooking.check_in).toLocaleDateString()}</p>
              <p><strong>Дата выезда:</strong> {new Date(currentBooking.check_out).toLocaleDateString()}</p>
              <p><strong>Количество гостей:</strong> {currentBooking.guests_count}</p>
              <p><strong>Общая стоимость:</strong> {currentBooking.total_price} ₽</p>
              <p><strong>Статус:</strong> {getStatusBadge(currentBooking.status)}</p>
              <p><strong>Дата создания:</strong> {new Date(currentBooking.created_at).toLocaleDateString()}</p>
            </div>
          )}

          {modalType === 'addRoom' && (
            <Form onSubmit={handleRoomSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Название номера</Form.Label>
                <Form.Control
                  type="text"
                  value={roomForm.name}
                  onChange={(e) => setRoomForm({...roomForm, name: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={roomForm.description}
                  onChange={(e) => setRoomForm({...roomForm, description: e.target.value})}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Цена за ночь (₽)</Form.Label>
                    <Form.Control
                      type="number"
                      value={roomForm.price_per_night}
                      onChange={(e) => setRoomForm({...roomForm, price_per_night: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Вместимость (чел.)</Form.Label>
                    <Form.Control
                      type="number"
                      value={roomForm.capacity}
                      onChange={(e) => setRoomForm({...roomForm, capacity: e.target.value})}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Удобства (через запятую)</Form.Label>
                <Form.Control
                  type="text"
                  value={roomForm.amenities}
                  onChange={(e) => setRoomForm({...roomForm, amenities: e.target.value})}
                  placeholder="Wi-Fi, Кондиционер, Телевизор"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Добавить номер
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
