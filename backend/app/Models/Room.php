<?php


// 1 исходный код

// namespace App\Models;

// use Illuminate\Database\Eloquent\Model;

// class Room extends Model
// {
//     protected $fillable = [
//         'name', 'type', 'description', 'price_per_night', 
//         'capacity', 'amenities', 'image_url', 'is_available'
//     ];

//     protected $casts = [
//         'amenities' => 'array',
//         'is_available' => 'boolean'
//     ];

//     public function bookings()
//     {
//         return $this->hasMany(Booking::class);
//     }
// }



namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'capacity',
        'image_url',
        'is_available',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'room_services');
    }
}

