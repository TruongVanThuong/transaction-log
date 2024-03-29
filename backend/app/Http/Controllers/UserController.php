<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(request $request) {
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
}