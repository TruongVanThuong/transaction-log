<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/api/register',[UserController::class, 'register']);
Route::get('/users', function () {
return "oke";
});