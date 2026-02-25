<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomsTable extends Migration
{
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->text('description');
            $table->decimal('price_per_night', 8, 2);
            $table->integer('capacity');
            $table->json('amenities');
            $table->string('image_url');
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });
    }
}
