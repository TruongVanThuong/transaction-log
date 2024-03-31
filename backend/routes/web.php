<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/login', [ProfileController::class, 'loginAdmin']);
Route::post('/login-access', [ProfileController::class, 'loginAdminAccess']);
Route::get('/logout', [ProfileController::class, 'logout']);

// middleware AdminAccessMDW ============
Route::middleware(['AdminAccessMDW'])->group(function () {
    Route::get('/', function () {
        return view('admin.pages.role.index');
    });
    
    Route::group(['prefix' => '/profile'], function () {
        Route::get('/', [ProfileController::class, 'profile']);
        Route::get('/information', [ProfileController::class, 'profileInfor']);
        Route::post('/updateInfo', [ProfileController::class, 'updateInfo']);
        Route::get('/changePassword', [ProfileController::class, 'change']);
        Route::post('/changePassword', [ProfileController::class, 'changePassword']);
    });


    Route::group(['prefix' => '/role'], function () {
        Route::get('/', function () {
            return view('admin.pages.role.index');
        });
        Route::get('/show', [RoleController::class, 'showRole']);
        Route::post('/add', [RoleController::class, 'addRole']);
        Route::post('/edit', [RoleController::class, 'editRole']);
        Route::post('/delete', [RoleController::class, 'deleteRole']);
    });

    Route::group(['prefix' => '/managerAccount'], function () {
        Route::get('/', [AccountController::class, 'index']);
        Route::get('/show', [AccountController::class, 'showAcc']);
        Route::post('/add', [AccountController::class, 'addAcc']);
        Route::post('/delete', [AccountController::class, 'deleteAcc']);
        Route::post('/edit', [AccountController::class, 'editAcc']);
    });
});
// END middleware AdminAccessMDW ============