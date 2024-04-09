<?php

namespace App\Http\Controllers;

use App\Models\TransactionModel;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function tranShow()
    {
        $transactions = TransactionModel::leftJoin('users as buyers', 'transactions.buyer_id', '=', 'buyers.id')
            ->leftJoin('users as sellers', 'transactions.seller_id', '=', 'sellers.id')
            ->leftJoin('users as intermediaries', 'transactions.intermediary_id', '=', 'intermediaries.id')
            ->leftJoin('products', 'transactions.product_id', '=', 'products.id')
            ->select(
                'transactions.*',
                'buyers.name as buyer_name',
                'sellers.name as seller_name',
                'intermediaries.name as intermediary_name',
                'products.name_pd',
                'products.price',
                'products.image'
            )
            ->get();

        return $transactions;
    }

    public function tranEdit($id) {
        $transactions = TransactionModel::leftJoin('users as buyers', 'transactions.buyer_id', '=', 'buyers.id')
            ->leftJoin('users as sellers', 'transactions.seller_id', '=', 'sellers.id')
            ->leftJoin('users as intermediaries', 'transactions.intermediary_id', '=', 'intermediaries.id')
            ->leftJoin('products', 'transactions.product_id', '=', 'products.id')
            ->select(
                'transactions.*',
                'buyers.name as buyer_name',
                'sellers.name as seller_name',
                'intermediaries.name as intermediary_name',
                'products.name_pd',
                'products.price',
                'products.image'
            )
            ->findOrFail($id);
        return $transactions;
    }

    public function tranUpdate(Request $request, $id) {
        $transaction = TransactionModel::findOrFail($id);

        $transaction->status = $request->status;
        $transaction->intermediary_id = $request->intermediary_id;

        $transaction->save();

        return response()->json(['message' => 'Cập nhật giao dịch thành công']);
    }


}