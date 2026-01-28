<?php
namespace App\Data;

use Spatie\LaravelData\Data;



class ProductData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $description,
        public float $price,
        public int $stock,
        public bool $is_active,
        public string $created_at,
    ) {
    }

    //  Product en una instancia de ProductData
    public static function fromModel($product): self
    {
        return new self(
            id: $product->id,
            name: $product->name,
            description: $product->description,
            price: (float) $product->price,
            stock: $product->stock,
            is_active: (bool) $product->is_active,
            created_at: $product->created_at->format('d/m/Y'),  // Formateo de fecha
        );
    }
}