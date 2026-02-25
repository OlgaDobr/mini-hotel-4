// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// //import Header from '../../components/Header/Header';
// //import Footer from '../../components/Footer/Footer';
// import './RoomsPage.css';

// const RoomsPage = () => {
//     const [rooms, setRooms] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchRooms();
//     }, []);

//     const fetchRooms = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/rooms');
//             setRooms(response.data);
//         } catch (error) {
//             console.error('Error fetching rooms:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <div className="text-center py-5">Загрузка...</div>;
//     }

//     return (
//         <>
//             {/* <Header /> */}
            
//             <Container className="py-5">
//                 <h1 className="text-center mb-5">Номера и цены</h1>
                
//                 <Row>
//                     {rooms.map(room => (
//                         <Col lg={6} key={room.id} className="mb-4">
//                             <Card className="room-card h-100">
//                                 <Row className="g-0">
//                                     <Col md={6}>
//                                         <Card.Img 
//                                             src={room.image_url} 
//                                             alt={room.name}
//                                             className="room-image"
//                                         />
//                                         {!room.is_available && (
//                                             <div className="room-unavailable">
//                                                 <Badge bg="danger">Недоступно</Badge>
//                                             </div>
//                                         )}
//                                     </Col>
//                                     <Col md={6}>
//                                         <Card.Body>
//                                             <Card.Title>{room.name}</Card.Title>
//                                             <Card.Subtitle className="mb-2 text-muted">
//                                                 {room.type}
//                                             </Card.Subtitle>
//                                             <Card.Text>
//                                                 {room.description}
//                                             </Card.Text>
                                            
//                                             <div className="amenities mb-3">
//                                                 <h6>Удобства:</h6>
//                                                 <div className="amenities-list">
//                                                     {room.amenities && room.amenities.map((amenity, index) => (
//                                                         <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
//                                                             {amenity}
//                                                         </Badge>
//                                                     ))}
//                                                 </div>
//                                             </div>
                                            
//                                             <div className="room-info">
//                                                 <div className="price mb-2">
//                                                     <strong>{room.price_per_night} ₽</strong> / ночь
//                                                 </div>
//                                                 <div className="capacity mb-3">
//                                                     <i className="fas fa-user me-1"></i>
//                                                     До {room.capacity} гостей
//                                                 </div>
//                                             </div>
                                            
//                                             <div className="d-grid">
//                                                 <Button 
//                                                     as={Link} 
//                                                     to={`/booking?room=${room.id}`}
//                                                     variant="primary"
//                                                     disabled={!room.is_available}
//                                                 >
//                                                     {room.is_available ? 'Забронировать' : 'Недоступно'}
//                                                 </Button>
//                                             </div>
//                                         </Card.Body>
//                                     </Col>
//                                 </Row>
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
            
//             {/* <Footer /> */}
//         </>
//     );
// };

// export default RoomsPage;







import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';
import './RoomsPage.css';

const RoomsPage = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [filters, setFilters] = useState({
        type: 'all',
        priceRange: [2000, 15000],
        capacity: 'all',
        amenities: []
    });

    const rooms = [
        {
            id: 1,
            images: [
                '/images/room1-1.jpg',
                '/images/room1-2.jpg',
                '/images/room1-3.jpg',
                '/images/room1-4.jpg'
            ],
            type: 'standard',
            category: 'Стандарт',
            name: 'Стандартный номер',
            description: 'Уютный номер с современным дизайном, идеально подходящий для деловых поездок и короткого отдыха. В номере есть все необходимое для комфортного пребывания.',
            price: 4500,
            capacity: 2,
            size: '25 м²',
            bedType: 'Двуспальная кровать',
            amenities: [
                'Кондиционер', 'Телевизор Smart TV', 'Бесплатный Wi-Fi', 'Мини-бар',
                'Сейф', 'Фен', 'Чайник', 'Рабочий стол'
            ],
            availability: true,
            features: {
                wifi: true,
                breakfast: true,
                parking: true,
                spa: false,
                gym: false
            }
        },
        {
            id: 2,
            images: [
                '/images/room2-1.jpg',
                '/images/room2-2.jpg',
                '/images/room2-3.jpg',
                '/images/room2-4.jpg'
            ],
            type: 'deluxe',
            category: 'Делюкс',
            name: 'Делюкс номер с видом на город',
            description: 'Просторный номер с панорамным видом на город. Идеальный выбор для романтического отдыха или особого случая. В номере есть отдельная гостиная зона.',
            price: 6800,
            capacity: 2,
            size: '35 м²',
            bedType: 'King Size кровать',
            amenities: [
                'Кондиционер', 'Телевизор 4K', 'Бесплатный Wi-Fi', 'Кофемашина',
                'Мини-бар', 'Джакузи', 'Халаты и тапочки', 'Рабочий стол с видом'
            ],
            availability: true,
            features: {
                wifi: true,
                breakfast: true,
                parking: true,
                spa: true,
                gym: true
            }
        },
        {
            id: 3,
            images: [
                '/images/room3-1.jpg',
                '/images/room3-2.jpg',
                '/images/room3-3.jpg',
                '/images/room3-4.jpg'
            ],
            type: 'suite',
            category: 'Люкс',
            name: 'Президентский люкс',
            description: 'Эксклюзивный номер высочайшего класса с отдельной гостиной, столовой и террасой. Полный сервис премиум-класса и индивидуальное обслуживание.',
            price: 12000,
            capacity: 4,
            size: '85 м²',
            bedType: 'Две двуспальные кровати',
            amenities: [
                'Кондиционер', 'Два телевизора 4K', 'Бесплатный Wi-Fi', 'Эспрессо машина',
                'Полный мини-бар', 'Джакузи и сауна', 'Халаты премиум класса', 'Бильярдный стол',
                'Личный дворецкий', 'Приватный вход'
            ],
            availability: false,
            features: {
                wifi: true,
                breakfast: true,
                parking: true,
                spa: true,
                gym: true
            }
        },
        {
            id: 4,
            images: [
                '/images/room4-1.jpg',
                '/images/room4-2.jpg',
                '/images/room4-3.jpg'
            ],
            type: 'family',
            category: 'Семейный',
            name: 'Семейный номер',
            description: 'Просторный номер, специально designed для семейного отдыха. Включает две раздельные комнаты и все необходимое для комфортного пребывания с детьми.',
            price: 7500,
            capacity: 4,
            size: '45 м²',
            bedType: 'Две раздельные кровати',
            amenities: [
                'Кондиционер', 'Телевизор Smart TV', 'Бесплатный Wi-Fi', 'Мини-кухня',
                'Детская кроватка', 'Игровая зона', 'Холодильник', 'Микроволновка'
            ],
            availability: true,
            features: {
                wifi: true,
                breakfast: true,
                parking: true,
                spa: false,
                gym: false
            }
        }
    ];

    const [mainImage, setMainImage] = useState(rooms[0].images[0]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const handleBookRoom = (roomId) => {
        setSelectedRoom(roomId);
        document.getElementById('bookingForm').scrollIntoView({ behavior: 'smooth' });
    };

    const filteredRooms = rooms.filter(room => {
        if (filters.type !== 'all' && room.type !== filters.type) return false;
        if (room.price < filters.priceRange[0] || room.price > filters.priceRange[1]) return false;
        if (filters.capacity !== 'all' && room.capacity < parseInt(filters.capacity)) return false;
        return true;
    });

    return (
        <div className="rooms-page">
            {/* Hero Section */}
            <section className="rooms-hero">
                <div className="container">
                    <h1>Наши номера</h1>
                    <p>Выберите идеальный номер для вашего отдыха</p>
                </div>
            </section>

            {/* Filter Section */}
            <div className="container">
                <div className="rooms-filter">
                    <h3 className="filter-title">Поиск номеров</h3>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="filter-group">
                                <label>Тип номера</label>
                                <select 
                                    className="filter-control"
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                >
                                    <option value="all">Все типы</option>
                                    <option value="standard">Стандарт</option>
                                    <option value="deluxe">Делюкс</option>
                                    <option value="suite">Люкс</option>
                                    <option value="family">Семейный</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="filter-group">
                                <label>Цена за ночь</label>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">{filters.priceRange[0]} ₽</span>
                                    <input 
                                        type="range" 
                                        className="form-range"
                                        min="2000"
                                        max="15000"
                                        step="500"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                                    />
                                    <span className="ms-2">{filters.priceRange[1]} ₽</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="filter-group">
                                <label>Вместимость</label>
                                <select 
                                    className="filter-control"
                                    value={filters.capacity}
                                    onChange={(e) => handleFilterChange('capacity', e.target.value)}
                                >
                                    <option value="all">Любая</option>
                                    <option value="1">1 человек</option>
                                    <option value="2">2 человека</option>
                                    <option value="3">3 человека</option>
                                    <option value="4">4+ человек</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="filter-group">
                                <label>&nbsp;</label>
                                <button className="filter-btn">
                                    <i className="fas fa-search me-2"></i>
                                    Найти номера
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rooms Grid */}
            <section className="rooms-grid">
                <div className="container">
                    {filteredRooms.map((room) => (
                        <div key={room.id} className="room-detail-card">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="room-gallery">
                                        <img 
                                            src={mainImage} 
                                            alt={room.name}
                                            className="room-main-image"
                                        />
                                        <div className="room-thumbnails">
                                            {room.images.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`${room.name} ${idx + 1}`}
                                                    className={`room-thumbnail ${img === mainImage ? 'active' : ''}`}
                                                    onClick={() => setMainImage(img)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="room-details">
                                        <div className="room-header">
                                            <div className="room-category">{room.category}</div>
                                            <h2 className="room-title">{room.name}</h2>
                                            <div className="room-price-large">
                                                {room.price} ₽ <span>/ за ночь</span>
                                            </div>
                                            <div className={`availability-badge ${room.availability ? 'available' : 'unavailable'}`}>
                                                <i className={`fas fa-${room.availability ? 'check' : 'times'} me-2`}></i>
                                                {room.availability ? 'Доступен' : 'Занят'}
                                            </div>
                                        </div>
                                        
                                        <p className="room-description">{room.description}</p>
                                        
                                        <div className="room-amenities">
                                            <h4 className="amenities-title">Удобства</h4>
                                            <div className="amenities-grid">
                                                {room.amenities.map((amenity, idx) => (
                                                    <div key={idx} className="amenity-item">
                                                        <i className="fas fa-check-circle"></i>
                                                        <span>{amenity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="room-specs">
                                            <h4 className="specs-title">Характеристики</h4>
                                            <div className="specs-grid">
                                                <div className="spec-item">
                                                    <div className="spec-value">{room.size}</div>
                                                    <div className="spec-label">Площадь</div>
                                                </div>
                                                <div className="spec-item">
                                                    <div className="spec-value">{room.capacity}</div>
                                                    <div className="spec-label">Гостей</div>
                                                </div>
                                                <div className="spec-item">
                                                    <div className="spec-value">{room.bedType}</div>
                                                    <div className="spec-label">Кровать</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button 
                                                className="book-now-btn"
                                                onClick={() => handleBookRoom(room.id)}
                                                disabled={!room.availability}
                                            >
                                                <i className="fas fa-calendar-check me-2"></i>
                                                Забронировать сейчас
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="booking-section" id="bookingForm">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="booking-title">
                                {selectedRoom 
                                    ? `Бронирование номера #${selectedRoom}`
                                    : 'Форма бронирования'
                                }
                            </h2>
                            <BookingForm roomId={selectedRoom} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RoomsPage;
