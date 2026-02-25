import React, { useState } from 'react';

function AdminRegister() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь добавьте логику отправки данных на сервер Laravel
    alert('Регистрация администратора отправлена');
  };

  return (
    <div className="register-form">
      <h2>Регистрация администратора</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Имя пользователя</label>
          <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Пароль</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Подтверждение пароля</label>
          <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default AdminRegister;







//2 код


// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom'; // Для навигации

// function RegisterForm() {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });
//     const navigate = useNavigate(); // Инициализация хука
// const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
// };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Проверка совпадения паролей
//     if (formData.password !== formData.confirmPassword) {
//         alert('Пароли не совпадают!');
//         return;
//     }
//     // Здесь будет отправка данных на бэкенд (API Laravel)
//     console.log('Форма регистрации отправлена:', formData);
//     try {
//         const response = await fetch('/api/register', { // Путь к вашему API Laravel
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         });

//         const result = await response.json();

//         if (response.ok) {
//             alert('Регистрация успешна! Теперь вы можете войти.');
//             navigate('/login'); // Перенаправление на страницу входа
//         } else {
//             alert('Ошибка регистрации: ' + (result.message || 'Неизвестная ошибка'));
//         }
//     } catch (error) {
//         console.error('Ошибка при отправке запроса:', error);
//         alert('Ошибка сети или сервера.');
//     }
// };

// return (
//     <Container>
//         <Row className="justify-content-md-center">
//             <Col md={6}>
//                 <h2>Регистрация пользователя</h2>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-3" controlId="formBasicName">
//                         <Form.Label>Имя</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Введите ваше имя"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formBasicEmail">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Введите ваш email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formBasicPassword">
//                         <Form.Label>Пароль</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Введите пароль"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             minLength="6"
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
//                         <Form.Label>Подтвердите пароль</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Повторите пароль"
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Button variant="primary" type="submit" className="w-100">
//                         Зарегистрироваться
//                     </Button>
//                 </Form>
//                 <div className="mt-3 text-center">
//                     Уже есть аккаунт? <Button variant="link" onClick={() => navigate('/login')}>Войти</Button>
//                 </div>
//             </Col>
//         </Row>
//     </Container>
// );
// }

// export default RegisterForm;





//3 код


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Register = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         password: '',
//         password_confirmation: '',
//         agreeTerms: false
//     });
//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const validateForm = () => {
//         const newErrors = {};
        
//         if (!formData.firstName.trim()) {
//             newErrors.firstName = 'Имя обязательно';
//         }
        
//         if (!formData.lastName.trim()) {
//             newErrors.lastName = 'Фамилия обязательна';
//         }
        
//         if (!formData.email) {
//             newErrors.email = 'Email обязателен';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Неверный формат email';
//         }
        
//         if (!formData.phone) {
//             newErrors.phone = 'Телефон обязателен';
//         } else if (!/^[\+]?[78][\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/.test(formData.phone)) {
//             newErrors.phone = 'Неверный формат телефона';
//         }
        
//         if (!formData.password) {
//             newErrors.password = 'Пароль обязателен';
//         } else if (formData.password.length < 8) {
//             newErrors.password = 'Пароль должен содержать минимум 8 символов';
//         } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//             newErrors.password = 'Пароль должен содержать заглавные и строчные буквы и цифры';
//         }
        
//         if (formData.password !== formData.password_confirmation) {
//             newErrors.password_confirmation = 'Пароли не совпадают';
//         }
        
//         if (!formData.agreeTerms) {
//             newErrors.agreeTerms = 'Необходимо согласие с условиями';
//         }
        
//         return newErrors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validationErrors = validateForm();
        
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }
        
//         try {
//             const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     name: `${formData.firstName} ${formData.lastName}`,
//                     email: formData.email,
//                     phone: formData.phone,
//                     password: formData.password,
//                     password_confirmation: formData.password_confirmation
//                 })
//             });
            
//             const data = await response.json();
            
//             if (response.ok) {
//                 localStorage.setItem('auth_token', data.token);
//                 localStorage.setItem('user', JSON.stringify(data.user));
                
//                 // Отправляем email подтверждения
//                 await fetch('/api/email/verification-notification', {
//                     method: 'POST',
//                     headers: {
//                         'Authorization': `Bearer ${data.token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });
                
//                 navigate('/verify-email');
//             } else {
//                 if (data.errors) {
//                     setErrors(data.errors);
//                 } else {
//                     setErrors({ general: data.message || 'Ошибка регистрации' });
//                 }
//             }
//         } catch (error) {
//             setErrors({ general: 'Ошибка сети. Попробуйте позже.' });
//         }
//     };

//     return (
//         <div className="auth-page">
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className="col-md-8 col-lg-6">
//                         <div className="auth-card">
//                             <div className="auth-header text-center mb-4">
//                                 <h2>Создать аккаунт</h2>
//                                 <p className="text-muted">Зарегистрируйтесь для бронирования номеров</p>
//                             </div>
                            
//                             {errors.general && (
//                                 <div className="alert alert-danger">
//                                     <i className="fas fa-exclamation-circle me-2"></i>
//                                     {errors.general}
//                                 </div>
//                             )}
                            
//                             <form onSubmit={handleSubmit}>
//                                 <div className="row">
//                                     <div className="col-md-6 mb-3">
//                                         <label htmlFor="firstName" className="form-label">
//                                             Имя
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
//                                             id="firstName"
//                                             name="firstName"
//                                             value={formData.firstName}
//                                             onChange={handleChange}
//                                             placeholder="Иван"
//                                         />
//                                         {errors.firstName && (
//                                             <div className="invalid-feedback">{errors.firstName}</div>
//                                         )}
//                                     </div>
                                    
//                                     <div className="col-md-6 mb-3">
//                                         <label htmlFor="lastName" className="form-label">
//                                             Фамилия
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
//                                             id="lastName"
//                                             name="lastName"
//                                             value={formData.lastName}
//                                             onChange={handleChange}
//                                             placeholder="Иванов"
//                                         />
//                                         {errors.lastName && (
//                                             <div className="invalid-feedback">{errors.lastName}</div>
//                                         )}
//                                     </div>
//                                 </div>
                                
//                                 <div className="mb-3">
//                                     <label htmlFor="email" className="form-label">
//                                         Email адрес
//                                     </label>
//                                     <input
//                                         type="email"
//                                         className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                                         id="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         placeholder="your@email.com"
//                                     />
//                                     {errors.email && (
//                                         <div className="invalid-feedback">{errors.email}</div>
//                                     )}
//                                 </div>
                                
//                                 <div className="mb-3">
//                                     <label htmlFor="phone" className="form-label">
//                                         Телефон
//                                     </label>
//                                     <input
//                                         type="tel"
//                                         className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
//                                         id="phone"
//                                         name="phone"
//                                         value={formData.phone}
//                                         onChange={handleChange}
//                                         placeholder="+7 (999) 123-45-67"
//                                     />
//                                     {errors.phone && (
//                                         <div className="invalid-feedback">{errors.phone}</div>
//                                     )}
//                                 </div>
                                
//                                 <div className="mb-3">
//                                     <label htmlFor="password" className="form-label">
//                                         Пароль
//                                     </label>
//                                     <input
//                                         type="password"
//                                         className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//                                         id="password"
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         placeholder="Минимум 8 символов"
//                                     />
//                                     {errors.password && (
//                                         <div className="invalid-feedback">{errors.password}</div>
//                                     )}
//                                     <div className="form-text">
//                                         Пароль должен содержать заглавные и строчные буквы, цифры
//                                     </div>
//                                 </div>
                                
//                                 <div className="mb-3">
//                                     <label htmlFor="password_confirmation" className="form-label">
//                                         Подтверждение пароля
//                                     </label>
//                                     <input
//                                         type="password"
//                                         className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
//                                         id="password_confirmation"
//                                         name="password_confirmation"
//                                         value={formData.password_confirmation}
//                                         onChange={handleChange}
//                                         placeholder="Повторите пароль"
//                                     />
//                                     {errors.password_confirmation && (
//                                         <div className="invalid-feedback">{errors.password_confirmation}</div>
//                                     )}
//                                 </div>
                                
//                                 <div className="mb-3 form-check">
//                                     <input
//                                         type="checkbox"
//                                         className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`}
//                                         id="agreeTerms"
//                                         name="agreeTerms"
//                                         checked={formData.agreeTerms}
//                                         onChange={handleChange}
//                                     />
//                                     <label className="form-check-label" htmlFor="agreeTerms">
//                                         Я согласен с{' '}
//                                         <Link to="/terms" className="text-decoration-none">
//                                             условиями использования
//                                         </Link>{' '}
//                                         и{' '}
//                                         <Link to="/privacy" className="text-decoration-none">
//                                             политикой конфиденциальности
//                                         </Link>
//                                     </label>
//                                     {errors.agreeTerms && (
//                                         <div className="invalid-feedback d-block">{errors.agreeTerms}</div>
//                                     )}
//                                 </div>
                                
//                                 <div className="d-grid gap-2 mb-3">
//                                     <button type="submit" className="btn btn-primary">
//                                         <i className="fas fa-user-plus me-2"></i>
//                                         Зарегистрироваться
//                                     </button>
//                                 </div>
                                
//                                 <div className="text-center mt-4">
//                                     <p>
//                                         Уже есть аккаунт?{' '}
//                                         <Link to="/login" className="text-decoration-none fw-bold">
//                                             Войдите
//                                         </Link>
//                                     </p>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;




// 4 код


// import React, { useState, useEffect } from 'react';
// import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminRegister = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
//     admin_key: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('user_role');
    
//     if (!token || role !== 'admin') {
//       navigate('/login');
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     const token = localStorage.getItem('token');

//     try {
//       const response = await axios.post('http://localhost:8000/api/admin/register', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.data.success) {
//         setSuccess(true);
//         setFormData({
//           name: '',
//           email: '',
//           password: '',
//           password_confirmation: '',
//           admin_key: ''
//         });
//       }
//     } catch (error) {
//       if (error.response && error.response.data.errors) {
//         setErrors(error.response.data.errors);
//       }
//     }
//   };

//   if (!isAuthenticated) return null;

//   return (
//     <Container className="py-5">
//       <Row className="justify-content-center">
//         <Col md={8} lg={6}>
//           <Card className="shadow border-danger">
//             <Card.Header className="bg-danger text-white">
//               <h3 className="mb-0">Регистрация администратора</h3>
//               <small className="opacity-75">Только для авторизованных администраторов</small>
//             </Card.Header>
//             <Card.Body>
//               {success && (
//                 <Alert variant="success">
//                   Администратор успешно зарегистрирован!
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>ФИО администратора *</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     isInvalid={!!errors.name}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.name && errors.name[0]}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Email *</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     isInvalid={!!errors.email}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.email && errors.email[0]}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Пароль *</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     isInvalid={!!errors.password}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.password && errors.password[0]}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Подтверждение пароля *</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password_confirmation"
//                     value={formData.password_confirmation}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Секретный ключ администратора *</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="admin_key"
//                     value={formData.admin_key}
//                     onChange={handleChange}
//                     isInvalid={!!errors.admin_key}
//                     placeholder="Введите секретный ключ"
//                     required
//                   />
//                   <Form.Text className="text-muted">
//                     Секретный ключ выдается главным администратором
//                   </Form.Text>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.admin_key && errors.admin_key[0]}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <div className="d-grid gap-2">
//                   <Button variant="danger" type="submit" size="lg">
//                     Зарегистрировать администратора
//                   </Button>
//                 </div>
//               </Form>

//               <div className="text-center mt-4">
//                 <p>
//                   <Link to="/admin/dashboard" className="text-decoration-none">
//                     ← Назад в панель администратора
//                   </Link>
//                 </p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AdminRegister;

