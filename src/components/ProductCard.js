import React from 'react';

const ProductCard = ({ product, onAddToCart, isInCart }) => {
  const { title, price, image, description, category } = product;

  // Truncate description for better display
  const truncatedDescription = description.length > 100 
    ? `${description.substring(0, 100)}...` 
    : description;

  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 flex items-center justify-center p-4">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {truncatedDescription}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">
            ${price.toFixed(2)}
          </span>
          
          {/* Rating (if available) */}
          {product.rating && (
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={isInCart}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isInCart
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 btn-primary'
          }`}
        >
          {isInCart ? (
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Added to Cart</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add to Cart</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 