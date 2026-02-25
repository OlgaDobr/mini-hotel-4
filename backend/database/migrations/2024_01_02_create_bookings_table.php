<?php 

class CreateBookingsTable extends Migration
{
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->string('guest_name');
            $table->string('guest_email');
            $table->string('guest_phone');
            $table->date('check_in');
            $table->date('check_out');
            $table->integer('guests_count');
            $table->text('special_requests')->nullable();
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->decimal('total_price', 10, 2);
            $table->timestamps();
        });
    }
}

