<?php

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with('booking')
            ->where('is_approved', true)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'booking_id' => 'required|exists:bookings,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $review = Review::create($request->all());

        return response()->json([
            'message' => 'Отзыв успешно отправлен на модерацию',
            'review' => $review
        ], 201);
    }
}
