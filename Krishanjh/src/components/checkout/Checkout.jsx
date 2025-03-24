import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:6500/api/products/${productId}`);
      setProduct(response.data.product);
    } catch (error) {
      toast.error('Error fetching product details');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      // Create order first
      const orderResponse = await axios.post('http://localhost:6500/api/orders/create', {
        productId,
        address,
        paymentMethod
      });

      const orderId = orderResponse.data.orderId;

      // Handle different payment methods
      switch (paymentMethod) {
        case 'razorpay':
          // Initialize Razorpay
          const options = {
            key: "YOUR_RAZORPAY_KEY",
            amount: product.price * 100, // amount in paisa
            currency: "INR",
            name: "Krishi App",
            description: `Purchase of ${product.name}`,
            order_id: orderId,
            handler: function (response) {
              handlePaymentSuccess(response, orderId);
            },
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
          break;

        case 'cod':
          // Handle Cash on Delivery
          await axios.post('http://localhost:6500/api/orders/cod-confirm', { orderId });
          toast.success('Order placed successfully!');
          navigate('/orders');
          break;

        case 'upi':
          // Handle UPI Payment
          // Implement UPI payment logic
          break;
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  const handlePaymentSuccess = async (paymentResponse, orderId) => {
    try {
      await axios.post('http://localhost:6500/api/orders/payment-success', {
        orderId,
        paymentId: paymentResponse.razorpay_payment_id,
      });
      toast.success('Payment successful!');
      navigate('/orders');
    } catch (error) {
      toast.error('Error confirming payment');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      
      {/* Product Summary */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-green-600 font-bold">₹{product.price}</p>
      </div>

      {/* Delivery Address */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Delivery Address</h3>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
          required
        />
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <div className="space-y-2">
          <label className="block">
            <input
              type="radio"
              value="razorpay"
              checked={paymentMethod === 'razorpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Pay Online (Razorpay)
          </label>
          <label className="block">
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            UPI Payment
          </label>
          <label className="block">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Cash on Delivery
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handlePayment}
          disabled={!paymentMethod || !address}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400"
        >
          Place Order
        </button>
        <button
          onClick={() => navigate('/products')}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Checkout; 