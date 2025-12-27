import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total_amount,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + (parseFloat(action.payload.price.replace('₹', '').replace('$', '')) * action.payload.quantity)
      };
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.product_id !== action.payload);
      const newTotal = filteredItems.reduce((sum, item) => 
        sum + (parseFloat(item.price.replace('₹', '').replace('$', '')) * item.quantity), 0
      );
      return {
        ...state,
        items: filteredItems,
        total: newTotal
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0
      };
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item => {
        if (item.product_id === action.payload.productId) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      const updatedTotal = updatedItems.reduce((sum, item) => 
        sum + (parseFloat(item.price.replace('₹', '').replace('$', '')) * item.quantity), 0
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal
      };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  total: 0,
  loading: false
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const sessionId = 'default'; // In production, this would be a unique session ID

  // Load cart from backend on component mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get(`${API}/cart/${sessionId}`);
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      console.error('Failed to load cart:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (product) => {
    try {
      const cartItem = {
        product_id: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      };

      await axios.post(`${API}/cart?session_id=${sessionId}`, cartItem);
      
      // Reload cart to get updated data
      await loadCart();
      
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${API}/cart/${sessionId}/item/${productId}`);
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
      // In a real app, you'd call the backend to update quantity
      // For now, we'll handle it optimistically on the frontend
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API}/cart/${sessionId}`);
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsCount,
    sessionId
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
