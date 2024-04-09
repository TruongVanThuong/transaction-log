<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransactionModel extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'transactions';

    protected $fillable = [
        'product_id',
        'buyer_id',
        'seller_id',
        'intermediary_id',
        'qty',
        'note',
        'status',
    ];
}