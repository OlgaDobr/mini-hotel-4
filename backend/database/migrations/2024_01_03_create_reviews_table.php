<?php

class CreateReviewsTable extends Migration
{
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained();
            $table->integer('rating');
            $table->text('comment');
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
        });
    }
}
