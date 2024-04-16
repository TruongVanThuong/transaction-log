<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\CategoryModel;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function cateShow()
    {
        $data = CategoryModel::all();
        return $data;
    }

    public function cateAdd(CategoryRequest $request)
    {
        $cate = $request->all();
        CategoryModel::create($cate);
        return response()->json([
            'status' => true,
            'message' => 'Thêm role thành công'
        ]);
    }

    public function cateEdit($id)
    {
        $data = CategoryModel::find($id);
        return $data;
    }

    public function cateUpdate(CategoryRequest $request, $id)
    {
        $fieldUpdate = $request->all();
        $product = CategoryModel::find($id);
        $product->update($fieldUpdate);
        return response()->json([
            'status' => true,
            'message' => 'Cap nhat role thành công'
        ]);
    }

    public function cateDelete($id)
    {
        $product = CategoryModel::destroy($id);
        return $product;
    }
}
