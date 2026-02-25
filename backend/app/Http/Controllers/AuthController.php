<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    /**
     * Регистрация пользователя
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:20|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => 'user'
        ]);

        event(new Registered($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Регистрация успешна! Проверьте email для подтверждения.',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    /**
     * Вход пользователя
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Неверные учетные данные'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        
        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Пожалуйста, подтвердите ваш email адрес'
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Вход выполнен успешно',
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Выход пользователя
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Выход выполнен успешно'
        ]);
    }

    /**
     * Отправка email для подтверждения
     */
    public function sendVerificationEmail(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email уже подтвержден'
            ]);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Ссылка для подтверждения отправлена на ваш email'
        ]);
    }

    /**
     * Подтверждение email
     */
    public function verifyEmail(Request $request)
    {
        $user = User::find($request->route('id'));

        if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            return response()->json([
                'message' => 'Неверная ссылка подтверждения'
            ], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email уже подтвержден'
            ]);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return response()->json([
            'message' => 'Email успешно подтвержден'
        ]);
    }

    /**
     * Отправка ссылки для сброса пароля
     */
    public function sendResetLinkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => __($status)])
            : response()->json(['message' => __($status)], 400);
    }

    /**
     * Сброс пароля
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => __($status)])
            : response()->json(['message' => __($status)], 400);
    }

    /**
     * Получение профиля пользователя
     */
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Обновление профиля пользователя
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'sometimes|required|string|max:20|unique:users,phone,' . $user->id,
            'current_password' => 'required_with:password',
            'password' => 'sometimes|nullable|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->has('password')) {
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'errors' => ['current_password' => ['Текущий пароль неверен']]
                ], 422);
            }
            
            $user->password = Hash::make($request->password);
        }

        $user->fill($request->only('name', 'email', 'phone'));
        $user->save();

        return response()->json([
            'message' => 'Профиль успешно обновлен',
            'user' => $user
        ]);
    }
}









// 1 исходный    код
// namespace App\Http\Controllers;

// use App\Models\User;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Validator;
// use Illuminate\Support\Facades\Auth;

// class AuthController extends Controller
// {
//     public function register(Request $request)
//     {
//         $validator = Validator::make($request->all(), [
//             'name' => 'required|string|max:255',
//             'email' => 'required|string|email|max:255|unique:users',
//             'phone' => 'required|string|max:20',
//             'password' => 'required|string|min:8|confirmed',
//         ]);

//         if ($validator->fails()) {
//             return response()->json([
//                 'success' => false,
//                 'errors' => $validator->errors()
//             ], 422);
//         }

//         $user = User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'phone' => $request->phone,
//             'password' => Hash::make($request->password),
//             'role' => 'user'
//         ]);

//         $token = $user->createToken('auth_token')->plainTextToken;

//         return response()->json([
//             'success' => true,
//             'message' => 'Регистрация успешна',
//             'user' => $user,
//             'token' => $token
//         ]);
//     }

//     public function login(Request $request)
//     {
//         $request->validate([
//             'email' => 'required|email',
//             'password' => 'required'
//         ]);

//         if (!Auth::attempt($request->only('email', 'password'))) {
//             return response()->json([
//                 'success' => false,
//                 'error' => 'Неверные учетные данные'
//             ], 401);
//         }

//         $user = User::where('email', $request->email)->first();
//         $token = $user->createToken('auth_token')->plainTextToken;

//         return response()->json([
//             'success' => true,
//             'user' => $user,
//             'token' => $token
//         ]);
//     }

//     public function logout(Request $request)
//     {
//         $request->user()->currentAccessToken()->delete();

//         return response()->json([
//             'success' => true,
//             'message' => 'Вы успешно вышли из системы'
//         ]);
//     }

//     public function user(Request $request)
//     {
//         return response()->json([
//             'success' => true,
//             'user' => $request->user()
//         ]);
//     }
// }
