<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'success' => false,
                'error' => 'Неверные учетные данные администратора'
            ], 401);
        }

        $token = $admin->createToken('admin_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'admin' => $admin,
            'token' => $token
        ]);
    }

    public function registerAdmin(Request $request)
    {
        // Проверка секретного ключа
        if ($request->admin_key !== env('ADMIN_REGISTRATION_KEY', 'SECRET_KEY_123')) {
            return response()->json([
                'success' => false,
                'error' => 'Неверный секретный ключ'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Администратор успешно зарегистрирован',
            'admin' => $admin
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Вы успешно вышли из системы'
        ]);
    }

    public function dashboard(Request $request)
    {
        $totalBookings = Booking::count();
        $activeBookings = Booking::whereIn('status', ['pending', 'confirmed'])->count();
        $totalUsers = User::count();
        $totalRooms = Room::count();

        return response()->json([
            'success' => true,
            'stats' => [
                'total_bookings' => $totalBookings,
                'active_bookings' => $activeBookings,
                'total_users' => $totalUsers,
                'total_rooms' => $totalRooms
            ]
        ]);
    }

    public function getAllBookings(Request $request)
    {
        $bookings = Booking::with(['user', 'room'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'bookings' => $bookings,
            'total' => $bookings->count(),
            'active' => $bookings->whereIn('status', ['pending', 'confirmed'])->count()
        ]);
    }

    public function confirmBooking($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->status = 'confirmed';
        $booking->save();

        return response()->json([
            'success' => true,
            'message' => 'Бронирование подтверждено'
        ]);
    }

    public function cancelBooking($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->status = 'cancelled';
        $booking->save();

        return response()->json([
            'success' => true,
            'message' => 'Бронирование отменено'
        ]);
    }

    public function getAllUsers(Request $request)
    {
        $users = User::withCount('bookings')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'users' => $users,
            'total' => $users->count()
        ]);
    }

    public function getAllRooms(Request $request)
    {
        $rooms = Room::all();

        return response()->json([
            'success' => true,
            'rooms' => $rooms,
            'total' => $rooms->count()
        ]);
    }

    public function createRoom(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price_per_night' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'amenities' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $room = Room::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Номер успешно создан',
            'room' => $room
        ]);
    }
}
