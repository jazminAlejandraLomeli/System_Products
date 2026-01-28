<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Service\ProductsService;
use Illuminate\Http\Request;
use App\Data\ProductData;  // Libreria de spatie
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\PaginatedDataCollection;


class ProductController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return ProductsService::getProduscts($request);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
