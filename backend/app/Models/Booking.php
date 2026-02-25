<?php


// 1 исходный код


// class Booking extends Model
// {
//     protected $fillable = [
//         'room_id', 'user_id', 'guest_name', 'guest_email',
//         'guest_phone', 'check_in', 'check_out', 'guests_count',
//         'special_requests', 'status', 'total_price'
//     ];

//     protected $casts = [
//         'check_in' => 'date',
//         'check_out' => 'date'
//     ];

//     public function room()
//     {
//         return $this->belongsTo(Room::class);
//     }

//     public function user()
//     {
//         return $this->belongsTo(User::class);
//     }
// }



namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'user_id',
        'start_date',
        'end_date',
        'total_price',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

