<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cookie;

class UserController extends Controller
{

    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }



    // <!---------------- CLIENT -------------- -->

    public function register(Request $request)
    {
        $register = new User;
        $register->name = $request->input('name');
        $register->email = $request->input('email');
        $register->password = bcrypt($request->input('password'));
        $register->phone = $request->input('phone');
        $register->address = $request->input('address');
        $register->role = 4;
        $register->wallet = $request->input('wallet');

        $register->save();
        return $register;
    }

    public function login(Request $request)
    {
        $login['email'] = $request->email;
        $login['password'] = $request->password;
        $kiem_tra = Auth::guard('users')->attempt($login);
        if ($kiem_tra) {
            $tai_khoan = Auth::guard('users')->user();
            $request->session()->put('user', $tai_khoan);
            // return $request->session()->get('user');
            $cookie = Cookie::make('laravel_session', $tai_khoan->api_token, 60 * 24);
            return response()->json([
                // 'token' => $token,
                'user' => $tai_khoan
            ])->withCookie($cookie);
            // return $this->respondWithToken($token);
        } else {
            return response()->json(['error' => 'Tai khoan hoac mat khau khong dung'], 401);
        }
    }

    public function datalogin(Request $request)
    {
        $request->session()->put('user', 1);
        echo $request->session()->get('user');
        // else
        echo 'No data in the session';
    }



    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => auth()->user()
        ]);
    }


    // ===========================


}