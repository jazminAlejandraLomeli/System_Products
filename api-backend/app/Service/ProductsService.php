<?php

namespace App\Service;

use App\Data\ProductData;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\ServiceProvider;

class ProductsService { 
    /**
     * Register any application services.
     */
    public static function getProduscts($request)
    {
        $query = Product::query()->when($request->search, fn($q) => $q->search($request->search));
    

        // Ordenar por ID descendente para ver los últimos creados primero
        return ProductData::collect($query->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
