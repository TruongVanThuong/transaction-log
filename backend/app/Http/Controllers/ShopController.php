<?php

namespace App\Http\Controllers;

use App\Models\CartModel;
use App\Models\OrderDetailModel;
use App\Models\OrderModel;
use App\Models\ProductModel;
use App\Models\TransactionModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ShopController extends Controller
{
    public function shopShow()
    {
        $data = ProductModel::all();
        return $data;
    }

    public function checkoutShow($requset)
    {
        $data = ProductModel::find($requset);
        return $data;
    }

    public function checkout(Request $request)
    {
        $user = User::find($request->id_user);
        $product = ProductModel::find($request->id_product);
        // Kiểm tra số dư trong tài khoản của người dùng
        if ($product->price > $user->wallet) {
            return response()->json(['error' => 'Số dư trong tài khoản không đủ']);
        }

        // Trừ tiền từ tài khoản người dùng
        $user->wallet -= ($product->price);
        $user->save();

        $seller = User::find($product->seller_id);
        if($seller->role == 2 || $seller->role == 1){
            $product->status = 0;
            $product->save();
        } else {
            $product->delete();
        }



        // Tạo giao dịch
        $transaction = new TransactionModel;
        $transaction->buyer_id = $request->id_user;
        $transaction->product_id = $request->id_product;
        $transaction->seller_id = $product->seller_id;
        $transaction->note = "What is note";
        $transaction->status = "confirmed";
        $transaction->save();

        return response()->json(['success' => 'Thanh toán thành công']);
    }



    // getOrder
    public function getOrder($id)
    {
        // Lấy dữ liệu từ bảng OrderModel theo buyer_id
        $orders1 = OrderModel::select('id', 'buyer_id', 'created_at', 'product_id', 'status', 'note') // Thay thế 'id', 'buyer_id', 'created_at' bằng các cột bạn cần
            ->where('buyer_id', $id);

        // Lấy dữ liệu từ bảng TransactionModel theo buyer_id
        $orders2 = TransactionModel::select('id', 'buyer_id', 'created_at', 'product_id', 'status', 'note') // Thay thế 'id', 'buyer_id', 'created_at' bằng các cột bạn cần
            ->where('buyer_id', $id);

        // Kết hợp dữ liệu từ hai bảng sử dụng phương thức union
        $orders = $orders1->getQuery()->union($orders2->getQuery())->orderBy('created_at')->get();

        $orders->map(function ($order) {
            $product = ProductModel::withTrashed()
                ->select('name_pd', 'price', 'desc', 'image') // Thay thế 'id', 'name', 'price', 'description' bằng các cột bạn cần
                ->where('id', $order->product_id)
                ->first();
            $order->product = $product;
            return $order;
        });
        return $orders;
    }




    public function orderDetail(Request $request) {
        $user = User::find($request->id_user);
        $product = ProductModel::find($request->id_product);



        if ($product->price > $user->wallet) {
            return response()->json(['error' => 'Số dư trong tài khoản không đủ']);
        }
        $user->wallet -= $product->price;
        $user->save();

        $orderDetail['status'] = "Pending";
        $orderDetail['buyer_id'] = $request->id_user;
        $orderDetail['product_id'] = $request->id_product;
        $orderDetail['note'] = $request->note;
        OrderModel::create($orderDetail);
        return response()->json([
            'status' => true,
            'message' => 'Order success!'
        ]);
    }
}