<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Главная страница React приложения
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('api')->group(function () {
    // Аутентификация
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    
    // Верификация email
    Route::post('/email/verification-notification', [AuthController::class, 'sendVerificationEmail'])
        ->middleware(['auth:sanctum', 'throttle:6,1']);
    
    // Сброс пароля
    Route::post('/forgot-password', [AuthController::class, 'sendResetLinkEmail']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    
    // Номера
    Route::get('/rooms', [BookingController::class, 'getRooms']);
    Route::get('/rooms/{id}', [BookingController::class, 'getRoomDetails']);
    Route::get('/rooms/{id}/availability', [BookingController::class, 'checkAvailability']);
    
    // Бронирования
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::get('/bookings/{id}', [BookingController::class, 'show']);
        Route::put('/bookings/{id}', [BookingController::class, 'update']);
        Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
        
        // Профиль пользователя
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
    });
    
    // Административные маршруты
    Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/bookings', [AdminController::class, 'allBookings']);
        Route::put('/bookings/{id}/status', [AdminController::class, 'updateBookingStatus']);
        Route::get('/rooms', [AdminController::class, 'allRooms']);
        Route::post('/rooms', [AdminController::class, 'createRoom']);
        Route::put('/rooms/{id}', [AdminController::class, 'updateRoom']);
        Route::delete('/rooms/{id}', [AdminController::class, 'deleteRoom']);
        Route::get('/users', [AdminController::class, 'allUsers']);
        Route::put('/users/{id}', [AdminController::class, 'updateUser']);
        Route::get('/statistics', [AdminController::class, 'statistics']);
    });
});

