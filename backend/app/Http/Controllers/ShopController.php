<?php

namespace App\Http\Controllers;

use App\Models\ProductModel;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function shopShow() {
        $data = ProductModel::all();
        return $data;
    }
}