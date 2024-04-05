<?php

namespace App\Console\Commands;

use App\Models\ProductModel;
use Illuminate\Console\Command;
use Carbon\Carbon;


class ExpiredProductsCleanup extends Command
{
    protected $signature = 'products:cleanup';
    protected $description = 'Cleanup expired products';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expiredProducts = ProductModel::whereDate('expiration_date', '<=', Carbon::today())->get();

        foreach ($expiredProducts as $product) {
            $product->delete();
        }

        $this->info('Đã hoàn tất dọn dẹp sản phẩm hết hạn.');
    }
}