<?php

namespace Database\Seeders;

// use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
// use Illuminate\Database\Seeder;

// class DatabaseSeeder extends Seeder
// {
//     use WithoutModelEvents;

//     /**
//      * Seed the application's database.
//      */
//     public function run(): void
//     {
//         // User::factory(10)->create();

//         User::factory()->create([
//             'name' => 'Test User',
//             'email' => 'test@example.com',
//         ]);
//     }
// }



use Illuminate\Database\Seeder;
use App\Models\Page;
use App\Models\Room;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        Page::create([
            'slug' => 'home',
            'title' => 'Добро пожаловать',
            'content' => 'Добро пожаловать в нашу мини-гостиницу...',
        ]);
        Page::create([
            'slug' => 'about',
            'title' => 'О нас',
            'content' => 'Наша история и ценности...',
        ]);

        Room::create([
            'number' => '101',
            'name' => 'Двухместный',
            'description' => 'Комфорт + Wi-Fi',
            'price_per_night' => 55.00,
            'max_guests' => 2,
            'beds' => 1,
            'size' => 20,
            'status' => 'available',
        ]);
        Room::create([
            'number' => '102',
            'name' => 'Люкс',
            'description' => 'Просторная зона, вид на город',
            'price_per_night' => 120.00,
            'max_guests' => 3,
            'beds' => 2,
            'size' => 40,
            'status' => 'available',
        ]);
    }
}
