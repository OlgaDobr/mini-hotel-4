<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        return Room::where('is_available', true)->get();
    }

    public function show($id)
    {
        return Room::findOrFail($id);
    }

    // Добавьте методы для администрирования (create, update, delete)
    // и защитите их middleware 'admin'
