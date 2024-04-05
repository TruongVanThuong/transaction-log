<?php

namespace App\Http\Controllers;

use App\Models\CategoryModel;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function cateShow() {
        $data = CategoryModel::all();
        return $data;
    }

    public function cateAdd(Request $request) {
        $cate = $request->all();
        CategoryModel::create($cate);
        return $cate;
    }

    public function cateEdit($id) {
        $data = CategoryModel::find($id);
        return $data;
    }

    public function cateUpdate(Request $request, $id) {
        $fieldUpdate = $request->all();
        $product = CategoryModel::find($id);
        $product->update($fieldUpdate);

    }

    public function cateDelete($id)
    {
        $product = CategoryModel::destroy($id);
        return $product;
    }
}