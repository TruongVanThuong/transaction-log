<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name_pd');
            $table->tinyInteger('seller_id');
            $table->tinyInteger('category_id');
            $table->integer('price');
            $table->string('image');
            $table->integer('qty');
            $table->text('desc');
            $table->boolean('status');
            $table->dateTime('expiration_date');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};