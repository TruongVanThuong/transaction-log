<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::group([
//     'middleware' => 'api',
// ], function ($router) {

    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::get('/datalogin', [UserController::class, 'datalogin']);
    Route::post('/logout', 'AuthController@logout');

// });


// middleware AdminAccessMDW ============
// Route::middleware(['admin.access'])->group(function () {
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

    Route::group(["prefix" => "/admin"], function () {
        Route::group(["prefix" => "/product"], function () {
            Route::post('/', [ProductController::class, 'index']);
            Route::get('/show', [ProductController::class, 'prdShow']);
            Route::get('/edit/{id}', [ProductController::class, 'prdEdit']);
            Route::post('/update/{id}', [ProductController::class, 'prdUpdate']);
            Route::delete('/delete/{id}', [ProductController::class, 'prdDelete']);
        });

        Route::controller(CategoryController::class)->group(function () {
            Route::group(["prefix" => "/category"], function () {
                Route::get('/', 'cateShow');
                Route::post('/add', 'cateAdd');
                Route::get('/edit/{id}', 'cateEdit');
                Route::put('/update/{id}', 'cateUpdate');
                Route::delete('/delete/{id}', 'cateDelete');
            });
        });

        Route::controller(RoleController::class)->group(function () {
            Route::group(["prefix" => "/role"], function () {
                Route::get('/', 'roleShow');
                Route::post('/add', 'roleAdd');
                Route::get('/edit/{id}', 'roleEdit');
                Route::put('/update/{id}', 'roleUpdate');
                Route::delete('/delete/{id}', 'roleDelete');
            });
        });

        Route::group(["prefix" => "/account"], function () {
            Route::get('/', [AccountController::class, 'showAcc']);
            Route::post('/add', [AccountController::class, 'addAcc']);
            Route::get('/edit/{id}', [AccountController::class, 'editAcc']);
            Route::post('/update/{id}', [AccountController::class, 'updateAcc']);

        });
        Route::controller(OrderController::class)->group(function () {
            Route::group(["prefix" => "/order"], function () {
                Route::get('/', 'orderShow');
                Route::get('/edit/{id}', 'orderEdit');
                Route::post('/update/{id}', 'orderUpdate');
            });
        });

        Route::controller(TransactionController::class)->group(function () {
            Route::group(["prefix" => "/transaction"], function () {
                Route::get('/', 'tranShow');
                Route::get('/edit/{id}', 'tranEdit');
                Route::post('/update/{id}', 'tranUpdate');
            });
        });
    });
// });
// END middleware AdminAccessMDW ============







Route::controller(ShopController::class)->group(function () {
    Route::group(["prefix" => "/shop"], function () {
        Route::get('/', 'shopShow');
        Route::get('/checkout/{id}', 'checkoutShow');
        Route::post('/checkout', 'checkout');
    });
    Route::get('/order/{id}', 'getOrder');
    Route::post('/order-detail', 'orderDetail');
});

Route::get('/dashboard/edit/{id}', [AccountController::class, 'dashEdit']);
Route::put('/dashboard/update/{id}', [AccountController::class, 'dashUpdate']);