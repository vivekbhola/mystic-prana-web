import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Link } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const { items, total, removeFromCart, updateQuantity, clearCart, getCartItemsCount } = useCart();

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return `₹${price}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-96 h-full overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-heading font-bold text-green-800">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              data-testid="close-cart"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <p className="text-green-600 mt-2">
            {getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'items'} in cart
          </p>
        </div>

        <div className="flex-1 p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some wellness accessories to get started</p>
              <Button
                onClick={onClose}
                className="bg-green-600 hover:bg-green-700 text-white"
                data-testid="continue-shopping"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.product_id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-800 mb-1">{item.name}</h4>
                        <p className="text-green-600 font-bold">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                          data-testid={`decrease-quantity-${item.product_id}`}
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                          data-testid={`increase-quantity-${item.product_id}`}
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                        data-testid={`remove-item-${item.product_id}`}
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-green-800">Total:</span>
              <span className="text-2xl font-bold text-green-800">₹{total.toFixed(2)}</span>
            </div>
            
            <div className="space-y-3">
              <Link to="/checkout" onClick={onClose} className="block">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
                  data-testid="checkout-button"
                >
                  <CreditCard className="mr-2 w-5 h-5" />
                  Proceed to Checkout
                </Button>
              </Link>
              
              <Button
                onClick={clearCart}
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
                data-testid="clear-cart"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
