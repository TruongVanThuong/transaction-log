<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductModel extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'products';

    protected $fillable = [
        'name_pd',
        'seller_id',
        'image',
        'category_id',
        'price',
        'qty',
        'desc',
        'status',
        'expiration_date',
    ];
}