<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminAccessMDW
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $check = Auth::guard('users')->check();
        if($check) {
            $user = Auth::guard('users')->user();
            if($user->role > 3 && $user->role < 1) {
                // toastr()->error('Tài khoản của bạn không đủ quyền truy cập!');
                return redirect('/login');
            }
            return $next($request);
        } else {
            // toastr()->warning('Chức năng này yêu cầu phải đăng nhập!');
            return redirect('/login');
        }
    }
}