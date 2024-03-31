<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }
    public function register(request $request)
    {
        $register = new User;
        $register->name = $request->input('name');
        $register->email = $request->input('email');
        $register->password = bcrypt($request->input('password'));
        $register->phone = $request->input('phone');
        $register->address = $request->input('address');
        $register->role = $request->input('role');
        $register->wallet = $request->input('wallet');

        $register->save();
        return $register;
    }

    public function login()
    {
        $login = request(['email', 'password']);

        // if (! $token = auth()->attempt($login)) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }
        $kiem_tra = auth()->attempt($login);
        // dd($kiem_tra);
        if ($kiem_tra) {
            return $this->respondWithToken($kiem_tra);
            // return response()->json([
            //     'status' => true,
            //     'message' => 'Đăng nhập thành công',
            // ]);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
            // return response()->json([
            //     'status' => false,
            //     'message' => 'Tài khoản hoặc mật khẩu không đúng',
            // ]);
        }


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
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

}