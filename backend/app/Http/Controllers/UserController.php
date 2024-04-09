<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
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
            return response()->json([
                // 'token' => $tai_khoan->createToken('authToken'),
                'user' => $tai_khoan
            ]);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
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


// ===========================


}