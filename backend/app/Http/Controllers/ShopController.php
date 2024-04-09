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
        // Kiểm tra trạng thái của sản phẩm
        if ($product->status !== 1) {
            // Tạo đơn hàng
            $order = new OrderModel;
            $order->buyer_id = $request->id_user;
            $order->product_id = $request->id_product;
            $order->note = "What is note";
            $order->status = "Pending";
            $order->save();

            // Trừ tiền từ tài khoản người dùng
            $user->wallet -= ($product->price);
            $user->save();

            return response()->json(
                ['error' => 'Sản phẩm sẽ được chuyển vào hàng chờ, vì sản phẩm không còn tồn tại hoặc hết hàng!']
            );

        }


        // Trừ tiền từ tài khoản người dùng
        $user->wallet -= ($product->price);
        $user->save();

        $product->status = 0;
        $product->save();



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
            $product = ProductModel::select('name_pd', 'price', 'desc', 'image') // Thay thế 'id', 'name', 'price', 'description' bằng các cột bạn cần
                ->where('id', $order->product_id)
                ->first();
            $order->product = $product;
            return $order;
        });
        return $orders;
    }
}