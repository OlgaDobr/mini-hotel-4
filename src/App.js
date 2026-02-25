import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BookingForm from './components/BookingForm/BookingForm';
import RoomCard from './components/RoomCard/RoomCard';
import HomePage from './pages/HomePage/HomePage';
import RoomsPage from './pages/RoomsPage/RoomsPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import PromotionsPage from './pages/PromotionsPage/PromotionsPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ReviewsPage from './pages/ReviewsPage/ReviewsPage';
import ContactPage from './pages/ContactPage/ContactPage';
import BookingPage from './pages/BookingPage/BookingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRegisterPage from './pages/AdminRegisterPage/AdminRegisterPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage/PrivacyPolicyPage';





import logo from './logo.svg';
import './App.css';

function App() {
  return (
           <Router>
            <div className="App">
               <Header />
        <main className="container mt-4"> {/* Используем Bootstrap класс для отступов */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/rooms" element={<RoomsPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/promotions" element={<PromotionsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/reviews" element={<ReviewsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/adminDashboard" element={<AdminDashboard/>} />
                    <Route path="/bookingForm" element={<BookingForm />} />
                    <Route path="/roomCard" element={<RoomCard />} />
                    <Route path="/adminRegister" element={<AdminRegisterPage />} />
                    <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
                </Routes>
                 </main>
              <Footer />
            </div>
        </Router>
    );
}


export default App;
