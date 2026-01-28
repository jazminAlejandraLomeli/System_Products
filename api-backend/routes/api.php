<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

//Route::get('/products', [ProductController::class, 'index']) ;


Route::post('/auth/login', [LoginController::class, 'create']);

// Token necesario 
Route::middleware('auth:sanctum')->get('/products', [ProductController::class, 'index'])->middleware('auth:sanctum');
Route::post('/auth/logout', [LoginController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('/me', [LoginController::class, 'me'])->middleware('auth:sanctum');



Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return $request->user();

});




Route::get('/test', function () {
    return response()->json([
        'message' => 'API funcionando correctamente'
    ]);
});


