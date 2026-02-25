import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {}
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('user'); // 'user' or 'admin'
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
if (password !== confirmPassword) {
  setError('Пароли не совпадают.');
  return;
}

try {
  const response = await axios.post('http://localhost:8000/api/register', {
    name,
    email,
    password,
    user_type: userType, // Отправляйте тип пользователя
  });
  setMessage('Регистрация успешна! Теперь вы можете войти.');
  // Опционально: автоматически логинить пользователя после регистрации
  // localStorage.setItem('authToken', response.data.access_token);
  // localStorage.setItem('user', JSON.stringify(response.data.user));
  // navigate('/');
  // window.location.reload();
} catch (err) {
  console.error('Registration error:', err.response);
  let errorMessage = 'Произошла ошибка при регистрации.';
  if (err.response && err.response.data && err.response.data.errors) {
    errorMessage = Object.values(err.response.data.errors).flat().join(' ');
  } else if (err.response && err.response.data && err.response.data.message) {
    errorMessage = err.response.data.message;
  }
  setError(errorMessage);
}
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        <h1 className="text-center mb-4">Регистрация</h1>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Ваше Имя</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">Подтвердите Пароль</label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
      {/* Радиокнопки для выбора типа пользователя (полезно для админа) */}
      &lt;div className="mb-3 text-center"&gt;
        &lt;div className="form-check form-check-inline"&gt;
          &lt;input
            className="form-check-input"
            type="radio"
            name="userType"
            id="userRadio"
            value="user"
            checked={userType === 'user'}
            onChange={(e) =&gt; setUserType(e.target.value)}
          /&gt;
          &lt;label className="form-check-label" htmlFor="userRadio"&gt;Пользователь&lt;/label&gt;
        &lt;/div&gt;
        &lt;div className="form-check form-check-inline"&gt;
          &lt;input
            className="form-check-input"
            type="radio"
            name="userType"
            id="adminRadio"
            value="admin"
            checked={userType === 'admin'}
            onChange={(e) = &gt; setUserType(e.target.value)}
          /&gt;
          &lt;label className="form-check-label" htmlFor="adminRadio"&gt;Администратор&lt;/label&gt;
        &lt;/div&gt;
      &lt;/div&gt;
  &amp;lt;button type="submit" className="btn btn-primary w-100"&amp;gt;Зарегистрироваться&amp;lt;/button&amp;gt;
&amp;lt;/form&amp;gt;
&amp;lt;div className="text-center mt-3"&amp;gt;
  &amp;lt;p&amp;gt;Уже есть аккаунт? &amp;lt;a href="/login"&amp;gt;Войти&amp;lt;/a&amp;gt;&amp;lt;/p&amp;gt;
&amp;lt;/div&amp;gt;
  &lt;/div&gt;
&lt;/div&gt;
  );
};

export default RegisterPage;
