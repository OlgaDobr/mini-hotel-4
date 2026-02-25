<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>HotelLux - Мини-гостиница премиум-класса</title>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- Meta tags for SEO -->
    <meta name="description" content="Мини-гостиница премиум-класса в центре города. Комфортабельные номера, отличный сервис и незабываемый отдых.">
    <meta name="keywords" content="гостиница, отель, бронирование, номера, отдых">
    <meta name="author" content="HotelLux">
    
    <!-- Open Graph -->
    <meta property="og:title" content="HotelLux - Мини-гостиница премиум-класса">
    <meta property="og:description" content="Комфортабельные номера, отличный сервис и незабываемый отдых.">
    <meta property="og:image" content="{{ asset('images/og-image.jpg') }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="HotelLux - Мини-гостиница премиум-класса">
    <meta name="twitter:description" content="Комфортабельные номера, отличный сервис и незабываемый отдых.">
    <meta name="twitter:image" content="{{ asset('images/twitter-image.jpg') }}">
    
    <!-- Styles -->
    <style>
        body {
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif;
        }
        
        .auth-page {
            padding: 4rem 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
        }
        
        .auth-card {
            background: white;
            border-radius: 15px;
            padding: 3rem;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .separator {
            display: flex;
            align-items: center;
            text-align: center;
            margin: 2rem 0;
        }
        
        .separator::before,
        .separator::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #dee2e6;
        }
        
        .separator span {
            padding: 0 1rem;
            color: #6c757d;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div id="app"></div>
    
    <!-- Scripts -->
    @viteReactRefresh
    @vite(['resources/js/app.js'])
    
    <script>
        // Глобальные переменные
        window.App = {
            csrfToken: '{{ csrf_token() }}',
            baseUrl: '{{ url("/") }}',
            user: @json(auth()->user()),
            locale: '{{ app()->getLocale() }}'
        };
        
        // Обработка ошибок
        window.addEventListener('unhandledrejection', function(event) {
            console.error('Unhandled promise rejection:', event.reason);
        });
        
        // Инициализация при загрузке
        document.addEventListener('DOMContentLoaded', function() {
            // Проверка поддержки Service Worker для PWA
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(function(registration) {
                        console.log('Service Worker зарегистрирован:', registration);
                    })
                    .catch(function(error) {
                        console.log('Ошибка регистрации Service Worker:', error);
                    });
            }
        });
    </script>
</body>
</html>
