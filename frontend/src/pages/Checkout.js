import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { CreditCard, Smartphone, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Validate form
      if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        toast.error('Please fill in all required fields');
        setIsProcessing(false);
        return;
      }

      // Create order
      const orderData = {
        amount: Math.round(total * 100), // Convert to paise
        currency: 'INR',
        customer_info: customerInfo,
        cart_items: items
      };

      const orderResponse = await axios.post(`${API}/create-order`, orderData);
      const order = orderResponse.data;

      // Demo mode simulation
      if (order.id.includes('demo')) {
        // Simulate payment processing for demo
        setTimeout(() => {
          setOrderId(order.id);
          setOrderComplete(true);
          clearCart();
          setIsProcessing(false);
          toast.success('Order placed successfully! (Demo Mode)');
        }, 2000);
        return;
      }

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway');
        setIsProcessing(false);
        return;
      }

      // Razorpay options
      const options = {
        key: 'rzp_test_placeholder', // This would be your actual Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: 'Mystic Prana',
        description: 'Wellness Accessories Purchase',
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };

            await axios.post(`${API}/verify-payment`, verifyData);
            
            setOrderId(response.razorpay_order_id);
            setOrderComplete(true);
            clearCart();
            toast.success('Payment successful! Order confirmed.');
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed');
          }
          setIsProcessing(false);
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone
        },
        theme: {
          color: '#2d5739'
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.error('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment initiation failed:', error);
      toast.error('Failed to initiate payment');
      setIsProcessing(false);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace('₹', '').replace('$', ''));
    }
    return price;
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="font-heading font-bold text-4xl text-green-800 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-green-600 mb-6">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="bg-white rounded-lg p-6 border-2 border-green-200 mb-8">
              <p className="text-lg text-green-800">
                <strong>Order ID:</strong> {orderId}
              </p>
              <p className="text-green-600 mt-2">
                You will receive a confirmation email shortly with order details.
              </p>
            </div>
          </div>
          
          <div className="space-x-4">
            <Link to="/wellness-accessories">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-green-600 text-green-600">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="font-heading font-bold text-3xl text-green-800 mb-6">
            Your cart is empty
          </h1>
          <p className="text-green-600 mb-8">
            Add some products to your cart before proceeding to checkout.
          </p>
          <Link to="/wellness-accessories">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Shop Wellness Accessories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/wellness-accessories" 
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shopping
          </Link>
          <h1 className="font-heading font-bold text-4xl text-green-800 mt-4">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="font-heading font-bold text-2xl text-green-800 mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product_id} className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-800">{item.name}</h4>
                        <p className="text-green-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-green-800">
                        ₹{(formatPrice(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold text-green-800">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information & Payment */}
          <div>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handlePayment}>
                  <h2 className="font-heading font-bold text-2xl text-green-800 mb-6">
                    Customer Information
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-green-800 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        className="w-full"
                        data-testid="customer-name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-green-800 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        className="w-full"
                        data-testid="customer-email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-green-800 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        className="w-full"
                        data-testid="customer-phone"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-semibold text-green-800 mb-2">
                        Shipping Address
                      </label>
                      <Textarea
                        id="address"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full"
                        placeholder="Enter your complete address"
                        data-testid="customer-address"
                      />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-green-800 mb-4">
                    Payment Method
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        paymentMethod === 'upi' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          value="upi"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="text-green-600"
                        />
                        <Smartphone className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-green-800">UPI Payment</p>
                          <p className="text-sm text-green-600">Pay using UPI apps like PhonePe, Google Pay, Paytm</p>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="text-green-600"
                        />
                        <CreditCard className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-green-800">Credit/Debit Card</p>
                          <p className="text-sm text-green-600">Pay using Visa, MasterCard, RuPay</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-6 p-3 bg-green-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-700">
                      Your payment information is encrypted and secure
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-lg"
                    data-testid="place-order-button"
                  >
                    {isProcessing ? (
                      <>
                        <div className="loading-spinner mr-2" />
                        Processing...
                      </>
                    ) : (
                      `Place Order - ₹${total.toFixed(2)}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
