<?php


// 1 исходный код

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\BookingController;
// use App\Http\Controllers\ReviewController;
// use App\Http\Controllers\RoomController;

// Route::prefix('api')->group(function () {
//     // Комнаты
//     Route::get('/rooms', [RoomController::class, 'index']);
//     Route::get('/rooms/{id}', [RoomController::class, 'show']);
    
//     // Бронирование
//     Route::post('/check-availability', [BookingController::class, 'checkAvailability']);
//     Route::post('/bookings', [BookingController::class, 'store']);
    
//     // Отзывы
//     Route::get('/reviews', [ReviewController::class, 'index']);
//     Route::post('/reviews', [ReviewController::class, 'store']);
    
//     // Аутентификация через соцсети
//     Route::get('/auth/{provider}/redirect', [SocialAuthController::class, 'redirect']);
//     Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'callback']);
// });



use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;

// Публичные маршруты (доступны всем)
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{room}', [RoomController::class, 'show']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/pages/{slug}', [PageController::class, 'show']); // Для статичных страниц
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

// Маршруты для аутентифицированных пользователей
Route::middleware('auth:sanctum')->group(function () {
    // Бронирование
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/my', [BookingController::class, 'myBookings']); // Мои брони

    // Отзывы
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::get('/reviews', [ReviewController::class, 'index']); // Получить все отзывы (возможно, для модерации)
});

// Маршруты для администраторов
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Управление номерами
    Route::apiResource('rooms', Admin\RoomController::class);
    Route::post('rooms/{room}/toggle-availability', [Admin\RoomController::class, 'toggleAvailability']);

    // Управление бронированиями
    Route::apiResource('bookings', Admin\BookingController::class);
    Route::post('bookings/{booking}/confirm', [Admin\BookingController::class, 'confirm']);
    Route::post('bookings/{booking}/cancel', [Admin\BookingController::class, 'cancel']);

    // Управление услугами
    Route::apiResource('services', Admin\ServiceController::class);

    // Управление пользователями
    Route::apiResource('users', Admin\UserController::class);

    // Управление отзывами
    Route::apiResource('reviews', Admin\ReviewController::class);
    Route::post('reviews/{review}/approve', [Admin\ReviewController::class, 'approve']);

    // Управление статичными страницами
    Route::apiResource('pages', Admin\PageController::class);

    // Админ. панель - общая информация
    Route::get('/dashboard', [Admin\DashboardController::class, 'index']);
});
