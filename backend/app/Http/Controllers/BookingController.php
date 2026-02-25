<?php


namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BookingController extends Controller
{
    /**
     * Получение списка номеров
     */
    public function getRooms(Request $request)
    {
        $query = Room::query();
        
        // Фильтрация по типу
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }
        
        // Фильтрация по цене
        if ($request->has('min_price')) {
            $query->where('price_per_night', '>=', $request->min_price);
        }
        
        if ($request->has('max_price')) {
            $query->where('price_per_night', '<=', $request->max_price);
        }
        
        // Фильтрация по вместимости
        if ($request->has('capacity') && $request->capacity !== 'all') {
            $query->where('max_capacity', '>=', $request->capacity);
        }
        
        $rooms = $query->where('is_available', true)->get();
        
        return response()->json($rooms);
    }

    /**
     * Получение деталей номера
     */
    public function getRoomDetails($id)
    {
        $room = Room::with('amenities')->findOrFail($id);
        
        return response()->json($room);
    }

    /**
     * Проверка доступности номера
     */
    public function checkAvailability(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'check_in' => 'required|date|after:today',
            'check_out' => 'required|date|after:check_in',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $checkIn = Carbon::parse($request->check_in);
        $checkOut = Carbon::parse($request->check_out);

        $existingBookings = Booking::where('room_id', $id)
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('check_in', [$checkIn, $checkOut])
                    ->orWhereBetween('check_out', [$checkIn, $checkOut])
                    ->orWhere(function ($q) use ($checkIn, $checkOut) {
                        $q->where('check_in', '<=', $checkIn)
                            ->where('check_out', '>=', $checkOut);
                    });
            })
            ->whereIn('status', ['confirmed', 'pending'])
            ->exists();

        $room = Room::findOrFail($id);
        $available = !$existingBookings && $room->is_available;

        return response()->json([
            'available' => $available,
            'message' => $available ? 'Номер доступен' : 'Номер занят на выбранные даты'
        ]);
    }

    /**
     * Создание бронирования
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'room_id' => 'required|exists:rooms,id',
            'check_in' => 'required|date|after:today',
            'check_out' => 'required|date|after:check_in',
            'guests' => 'required|integer|min:1',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'special_requests' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Проверка доступности
        $checkIn = Carbon::parse($request->check_in);
        $checkOut = Carbon::parse($request->check_out);
        
        $existingBooking = Booking::where('room_id', $request->room_id)
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('check_in', [$checkIn, $checkOut])
                    ->orWhereBetween('check_out', [$checkIn, $checkOut])
                    ->orWhere(function ($q) use ($checkIn, $checkOut) {
                        $q->where('check_in', '<=', $checkIn)
                            ->where('check_out', '>=', $checkOut);
                    });
            })
            ->whereIn('status', ['confirmed', 'pending'])
            ->exists();

        if ($existingBooking) {
            return response()->json([
                'message' => 'Номер занят на выбранные даты'
            ], 409);
        }

        DB::beginTransaction();
        try {
            $room = Room::findOrFail($request->room_id);
            
            $nights = $checkIn->diffInDays($checkOut);
            $totalPrice = $nights * $room->price_per_night;
            
            $booking = Booking::create([
                'user_id' => $request->user()->id,
                'room_id' => $request->room_id,
                'booking_number' => 'BK-' . strtoupper(uniqid()),
                'check_in' => $checkIn,
                'check_out' => $checkOut,
                'guests' => $request->guests,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'special_requests' => $request->special_requests,
                'total_price' => $totalPrice,
                'status' => 'pending',
                'payment_method' => $request->payment_method ?? 'card',
                'payment_status' => 'pending'
            ]);

            // Отправка email подтверждения
            // Mail::to($booking->email)->send(new BookingConfirmation($booking));
            
            DB::commit();

            return response()->json([
                'message' => 'Бронирование создано успешно',
                'booking' => $booking,
                'booking_number' => $booking->booking_number
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Ошибка при создании бронирования: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Получение списка бронирований пользователя
     */
    public function index(Request $request)
    {
        $bookings = Booking::where('user_id', $request->user()->id)
            ->with('room')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($bookings);
    }

    /**
     * Получение деталей бронирования
     */
    public function show(Request $request, $id)
    {
        $booking = Booking::with('room')
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json($booking);
    }

    /**
     * Обновление бронирования
     */
    public function update(Request $request, $id)
    {
        $booking = Booking::where('user_id', $request->user()->id)
            ->findOrFail($id);

        // Можно отменять только бронирования в статусе pending
        if ($booking->status !== 'pending') {
            return response()->json([
                'message' => 'Невозможно отменить это бронирование'
            ], 403);
        }

        $booking->update([
            'status' => 'cancelled',
            'cancelled_at' => now()
        ]);

        return response()->json([
            'message' => 'Бронирование отменено',
            'booking' => $booking
        ]);
    }

    /**
     * Удаление бронирования
     */
    public function destroy(Request $request, $id)
    {
        $booking = Booking::where('user_id', $request->user()->id)
            ->findOrFail($id);

        // Можно удалять только отмененные бронирования
        if ($booking->status !== 'cancelled') {
            return response()->json([
                'message' => 'Невозможно удалить это бронирование'
            ], 403);
        }

        $booking->delete();

        return response()->json([
            'message' => 'Бронирование удалено'
        ]);
    }
}







// 1 исходный код

// namespace App\Http\Controllers;

// use App\Models\Booking;
// use App\Models\Room;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Validator;

// class BookingController extends Controller
// {
//     public function checkAvailability(Request $request)
//     {
//         $validator = Validator::make($request->all(), [
//             'check_in' => 'required|date|after:today',
//             'check_out' => 'required|date|after:check_in',
//             'guests' => 'required|integer|min:1'
//         ]);

//         if ($validator->fails()) {
//             return response()->json($validator->errors(), 422);
//         }

//         $availableRooms = Room::where('capacity', '>=', $request->guests)
//             ->where('is_available', true)
//             ->whereDoesntHave('bookings', function($query) use ($request) {
//                 $query->where(function($q) use ($request) {
//                     $q->whereBetween('check_in', [$request->check_in, $request->check_out])
//                       ->orWhereBetween('check_out', [$request->check_in, $request->check_out])
//                       ->orWhere(function($q2) use ($request) {
//                           $q2->where('check_in', '<=', $request->check_in)
//                              ->where('check_out', '>=', $request->check_out);
//                       });
//                 })->whereIn('status', ['pending', 'confirmed']);
//             })->get();

//         return response()->json($availableRooms);
//     }

//     public function store(Request $request)
//     {
//         $validator = Validator::make($request->all(), [
//             'room_id' => 'required|exists:rooms,id',
//             'guest_name' => 'required|string|max:255',
//             'guest_email' => 'required|email',
//             'guest_phone' => 'required|string',
//             'check_in' => 'required|date|after:today',
//             'check_out' => 'required|date|after:check_in',
//             'guests_count' => 'required|integer|min:1',
//             'special_requests' => 'nullable|string'
//         ]);

//         if ($validator->fails()) {
//             return response()->json($validator->errors(), 422);
//         }

//         $room = Room::findOrFail($request->room_id);
//         $nights = (strtotime($request->check_out) - strtotime($request->check_in)) / (60 * 60 * 24);
//         $totalPrice = $room->price_per_night * $nights;

//         $booking = Booking::create([
//             'room_id' => $request->room_id,
//             'guest_name' => $request->guest_name,
//             'guest_email' => $request->guest_email,
//             'guest_phone' => $request->guest_phone,
//             'check_in' => $request->check_in,
//             'check_out' => $request->check_out,
//             'guests_count' => $request->guests_count,
//             'special_requests' => $request->special_requests,
//             'total_price' => $totalPrice,
//             'status' => 'pending'
//         ]);

//         // Отправка email уведомления
//         // Mail::to($request->guest_email)->send(new BookingConfirmation($booking));

//         return response()->json([
//             'message' => 'Бронирование успешно создано',
//             'booking' => $booking
//         ], 201);
//     }
// }

