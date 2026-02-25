<?php

namespace App\Http\Middleware;

   use Closure;
   use Illuminate\Http\Request;
   use Symfony\Component\HttpFoundation\Response;

   class AdminMiddleware
   {
       public function handle(Request $request, Closure $next): Response
       {
           if (auth()->check() && auth()->user()->isAdmin()) {
               return $next($request);
           }

           // Можно вернуть ошибку 403 или перенаправить
           abort(403, 'У вас нет доступа к этой странице.');
           // return redirect('/')->with('error', 'Доступ запрещен.'); // Пример перенаправления
       }
   }
