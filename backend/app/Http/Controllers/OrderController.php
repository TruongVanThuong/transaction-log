<?php

namespace App\Http\Controllers;

use App\Models\OrderModel;
use App\Models\OrderDetailModel;
use App\Models\ProductModel;
use App\Models\TransactionModel;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DateTime;

class OrderController extends Controller
{
    public function orderShow()
    {
        $orders = OrderModel::leftJoin('products', 'orders.product_id', '=', 'products.id')
            ->leftJoin('users', 'orders.buyer_id', '=', 'users.id')
            ->select(
                'orders.*',
                'products.name_pd',
                'products.price',
                'products.image',
                'users.name as name'
            )
            ->get();

        return $orders;
    }

    public function orderEdit($id)
    {
        $orders = OrderModel::leftJoin('products', 'orders.product_id', '=', 'products.id')
            ->leftJoin('users', 'orders.buyer_id', '=', 'users.id')
            ->select(
                'orders.*',
                'products.name_pd',
                'products.price',
                'products.image',
                'users.name as name'
            )
            ->findOrFail($id);
        return $orders;
    }

    public function orderUpdate(Request $request, $id)
    {
        $order = $request->all();
        $porduct = ProductModel::find($order['product_id']);
        $order['seller_id'] = $porduct->seller_id;
        $order['status'] = 'Processing';
        OrderModel::where('id', $id)->delete();
        TransactionModel::create($order);

        return response()->json(['message' => 'Đã chuyển sang mục Transaction!'], 200);

    }


}