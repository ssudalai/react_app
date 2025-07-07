import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';
import Alert from './components/Alert';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  // Fetch products from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    const isAlreadyInCart = cart.some(item => item.id === product.id);
    
    if (isAlreadyInCart) {
      showAlert('Item already added to the cart', 'warning');
      return;
    }

    setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    showAlert('Product added to cart successfully!', 'success');
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showAlert('Product removed from cart', 'info');
  };

  // Show alert message
  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // Open cart modal
  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  // Close cart modal
  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  // Calculate total cart items
  const cartItemCount = cart.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert Component */}
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)}
        />
      )}

      {/* Navbar */}
      <Navbar 
        cartItemCount={cartItemCount} 
        onCartClick={openCartModal}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Fake Store
          </h1>
          <p className="text-gray-600">
            Discover amazing products and add them to your cart
          </p>
        </div>

        {/* Product List */}
        <ProductList 
          products={products} 
          onAddToCart={addToCart}
          cart={cart}
        />
      </main>

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartModalOpen}
        onClose={closeCartModal}
        cart={cart}
        onRemoveFromCart={removeFromCart}
      />
    </div>
  );
}

export default App; 