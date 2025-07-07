import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart, cart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          isInCart={cart.some(item => item.id === product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList; 