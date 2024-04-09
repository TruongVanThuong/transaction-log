<?php

namespace App\Http\Controllers;

use App\Models\ProductModel;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $product = $request->all();
        $image = $request->image;
        $FileName = basename($image->getClientOriginalName());
        $image->move(public_path('/images/products'), $FileName);
        $product['image'] = $FileName;
        $product['status'] = 1;
        ProductModel::create($product);
        return $product;
    }

    public function prdShow()
    {
        $data = ProductModel::all();
        return $data;
    }

    public function prdEdit($id)
    {
        $data = ProductModel::find($id);
        return $data;
    }

    public function prdUpdate(Request $request, $id)
    {
        $product = ProductModel::find($id);
        $fieldUpdate = $request->all();

        if ($request->expiration_date == null || $request->expiration_date == "null") {
            unset($fieldUpdate['expiration_date']);
        }
        if ($request->image == "null" || $request->image == null) {
            unset($fieldUpdate['image']);
        } else {
            $image = $request->image;
            $FileName = basename($image->getClientOriginalName());
            $image->move(public_path('/images/products'), $FileName);
            $fieldUpdate['image'] = $FileName;
        }

        $product->update($fieldUpdate);
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật san pham thành công'
        ]);
    }

    public function prdDelete($id)
    {
        $product = ProductModel::destroy($id);
        return $product;
    }

}