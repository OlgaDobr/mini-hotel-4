import React, { useState } from 'react';
import { 
  Container, Row, Col, Form, Button, Card, 
  Alert, Tabs, Tab, Modal 
} from 'react-bootstrap';
import { 
  LogIn, UserPlus, Mail, Lock, User, Phone,
  Shield, Eye, EyeOff, CheckCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Здесь будет отправка данных на сервер
    console.log('Login attempt:', loginData);
    // После успешного входа перенаправляем на главную
    navigate('/');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Здесь будет отправка данных на сервер
    console.log('Registration:', registerData);
    setShowSuccessModal(true);
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    });
    setActiveTab('login');
  };

  const handleAdminLogin = () => {
    // Логика входа для администратора
    navigate('/admin/dashboard');
  };

  return (
    <Container className="login-page py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="login-card shadow-lg">
            <Card.Body className="p-5">
              <div className="text-center mb-5">
                <h2 className="mb-3">
                  {activeTab === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
                </h2>
                <p className="text-muted">
                  {activeTab === 'login' 
                    ? 'Войдите в свой аккаунт для управления бронированиями'
                    : 'Создайте аккаунт для быстрого бронирования и специальных предложений'
                  }
                </p>
              </div>

              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4 justify-content-center"
              >
                <Tab eventKey="login" title={
                  <span>
                    <LogIn size={18} className="me-2" />
                    Вход
                  </span>
                }>
                  <Form onSubmit={handleLogin} className="mt-4">
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Mail size={20} />
                        </span>
                        <Form.Control
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Пароль</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={20} />
                        </span>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          placeholder="Введите пароль"
                          required
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </Button>
                      </div>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check
                        type="checkbox"
                        label="Запомнить меня"
                        checked={loginData.rememberMe}
                        onChange={(e) => setLoginData({...loginData, rememberMe: e.target.checked})}
                      />
                      <Link to="/forgot-password" className="text-decoration-none">
                        Забыли пароль?
                      </Link>
                    </div>

                    <Button variant="primary" type="submit" className="w-100 mb-3">
                      <LogIn size={20} className="me-2" />
                      Войти
                    </Button>

                    <div className="separator my-4">
                      <span className="text-muted">или войдите через</span>
                    </div>

                    <div className="social-login mb-4">
                      <Button variant="outline-dark" className="w-100 mb-2">
                        <svg className="me-2" width="20" height="20" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </Button>
                    </div>

                    <div className="text-center">
                      <Button variant="link" onClick={handleAdminLogin}>
                        <Shield size={18} className="me-2" />
                        Вход для администратора
                      </Button>
                    </div>
                  </Form>
                </Tab>

                <Tab eventKey="register" title={
                  <span>
                    <UserPlus size={18} className="me-2" />
                    Регистрация
                  </span>
                }>
                  <Form onSubmit={handleRegister} className="mt-4">
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Имя</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <User size={20} />
                            </span>
                            <Form.Control
                              type="text"
                              value={registerData.firstName}
                              onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                              required
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Фамилия</Form.Label>
                          <Form.Control
                            type="text"
                            value={registerData.lastName}
                            onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Mail size={20} />
                        </span>
                        <Form.Control
                          type="email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Телефон</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Phone size={20} />
                        </span>
                        <Form.Control
                          type="tel"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Пароль</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={20} />
                        </span>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={registerData.password}
                          onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                          required
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </Button>
                      </div>
                      <Form.Text className="text-muted">
                        Минимум 8 символов, включая цифры и буквы
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Подтверждение пароля</Form.Label>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check
                        type="checkbox"
                        label={
                          <>
                            Я согласен с{' '}
                            <Link to="/terms" className="text-decoration-none">
                              условиями использования
                            </Link>{' '}
                            и{' '}
                            <Link to="/privacy" className="text-decoration-none">
                              политикой конфиденциальности
                            </Link>
                          </>
                        }
                        checked={registerData.acceptTerms}
                        onChange={(e) => setRegisterData({...registerData, acceptTerms: e.target.checked})}
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                      <UserPlus size={20} className="me-2" />
                      Зарегистрироваться
                    </Button>

                    <div className="benefits mt-4">
                      <h6 className="mb-3">Преимущества регистрации:</h6>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <CheckCircle size={16} className="text-success me-2" />
                          Быстрое бронирование
                        </li>
                        <li className="mb-2">
                          <CheckCircle size={16} className="text-success me-2" />
                          История бронирований
                        </li>
                        <li className="mb-2">
                          <CheckCircle size={16} className="text-success me-2" />
                          Специальные предложения
                        </li>
                        <li>
                          <CheckCircle size={16} className="text-success me-2" />
                          Накопительные баллы
                        </li>
                      </ul>
                    </div>
                  </Form>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Регистрация успешна!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <CheckCircle size={64} className="text-success mb-4" />
            <h4>Добро пожаловать!</h4>
            <p className="mb-4">
              Ваш аккаунт успешно создан. Проверьте вашу почту для подтверждения регистрации.
            </p>
            <Alert variant="info">
              Теперь вы можете войти в систему и начать пользоваться всеми преимуществами
              зарегистрированного пользователя.
            </Alert>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Понятно
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LoginPage;





// 2 код

// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// function LoginForm() {
//     const [credentials, setCredentials] = useState({
//         email: '',
//         password: '',
//     });
//     const navigate = useNavigate();
// const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
// };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Здесь будет отправка данных на бэкенд (API Laravel)
//     console.log('Попытка входа:', credentials);
//     try {
//         const response = await fetch('/api/login', { // Путь к вашему API Laravel
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(credentials),
//         });

//         const result = await response.json();

//         if (response.ok) {
//             // Сохранение токена аутентификации (например, JWT)
//             localStorage.setItem('token', result.token);
//             // Проверка роли пользователя (если Laravel возвращает роль)
//             if (result.user && result.user.role === 'admin') {
//                 navigate('/admin/dashboard');
//             } else {
//                 navigate('/dashboard'); // Или другая страница для обычного пользователя
//             }
//         } else {
//             alert('Ошибка входа: ' + (result.message || 'Неверный email или пароль'));
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
//                 <h2>Вход в систему</h2>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-3" controlId="formBasicEmail">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Введите ваш email"
//                             name="email"
//                             value={credentials.email}
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
//                             value={credentials.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Button variant="primary" type="submit" className="w-100">
//                         Войти
//                     </Button>
//                 </Form>
//                 <div className="mt-3 text-center">
//                     Нет аккаунта? <Button variant="link" onClick={() => navigate('/register')}>Зарегистрироваться</Button>
//                 </div>
//             </Col>
//         </Row>
//     </Container>
// );
// }

// export default LoginForm;




//3 код с проверкой номера телефона и проверкой сложности пароля


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         remember: false
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
        
//         if (!formData.email) {
//             newErrors.email = 'Email обязателен';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Неверный формат email';
//         }
        
//         if (!formData.password) {
//             newErrors.password = 'Пароль обязателен';
//         } else if (formData.password.length < 6) {
//             newErrors.password = 'Пароль должен содержать минимум 6 символов';
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
//             // Здесь будет запрос к Laravel API
//             const response = await fetch('/api/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData)
//             });
            
//             const data = await response.json();
            
//             if (response.ok) {
//                 // Сохраняем токен в localStorage
//                 localStorage.setItem('auth_token', data.token);
//                 localStorage.setItem('user', JSON.stringify(data.user));
                
//                 // Перенаправляем в зависимости от роли
//                 if (data.user.role === 'admin') {
//                     navigate('/admin/dashboard');
//                 } else {
//                     navigate('/profile');
//                 }
//             } else {
//                 setErrors({ general: data.message || 'Ошибка авторизации' });
//             }
//         } catch (error) {
//             setErrors({ general: 'Ошибка сети. Попробуйте позже.' });
//         }
//     };

//     const handleSocialLogin = (provider) => {
//         // Реализация социального входа
//         window.location.href = `/auth/${provider}`;
//     };

//     return (
//         <div className="auth-page">
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className="col-md-8 col-lg-6">
//                         <div className="auth-card">
//                             <div className="auth-header text-center mb-4">
//                                 <h2>Вход в аккаунт</h2>
//                                 <p className="text-muted">Войдите для управления бронированиями</p>
//                             </div>
                            
//                             {errors.general && (
//                                 <div className="alert alert-danger">
//                                     <i className="fas fa-exclamation-circle me-2"></i>
//                                     {errors.general}
//                                 </div>
//                             )}
                            
//                             <form onSubmit={handleSubmit}>
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
//                                         placeholder="Введите пароль"
//                                     />
//                                     {errors.password && (
//                                         <div className="invalid-feedback">{errors.password}</div>
//                                     )}
//                                 </div>
                                
//                                 <div className="mb-3 form-check">
//                                     <input
//                                         type="checkbox"
//                                         className="form-check-input"
//                                         id="remember"
//                                         name="remember"
//                                         checked={formData.remember}
//                                         onChange={handleChange}
//                                     />
//                                     <label className="form-check-label" htmlFor="remember">
//                                         Запомнить меня
//                                     </label>
//                                 </div>
                                
//                                 <div className="d-grid gap-2 mb-3">
//                                     <button type="submit" className="btn btn-primary">
//                                         <i className="fas fa-sign-in-alt me-2"></i>
//                                         Войти
//                                     </button>
//                                 </div>
                                
//                                 <div className="text-center mb-3">
//                                     <Link to="/forgot-password" className="text-decoration-none">
//                                         Забыли пароль?
//                                     </Link>
//                                 </div>
                                
//                                 <div className="separator">
//                                     <span>или войдите через</span>
//                                 </div>
                                
//                                 <div className="social-login-buttons">
//                                     <button
//                                         type="button"
//                                         className="btn btn-outline-secondary w-100 mb-2"
//                                         onClick={() => handleSocialLogin('google')}
//                                     >
//                                         <i className="fab fa-google me-2"></i>
//                                         Google
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="btn btn-outline-primary w-100"
//                                         onClick={() => handleSocialLogin('facebook')}
//                                     >
//                                         <i className="fab fa-facebook me-2"></i>
//                                         Facebook
//                                     </button>
//                                 </div>
                                
//                                 <div className="text-center mt-4">
//                                     <p>
//                                         Нет аккаунта?{' '}
//                                         <Link to="/register" className="text-decoration-none fw-bold">
//                                             Зарегистрируйтесь
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

// export default Login;






