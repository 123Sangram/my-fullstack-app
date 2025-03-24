import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Checkout = ({ product, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const orderData = {
        productId: product._id,
        quantity: 1,
        totalAmount: product.price,
        shippingAddress: address,
        paymentMethod
      };

      const response = await axios.post(
        'http://localhost:6500/api/orders/create',
        orderData,
        { headers: { Authorization: `Bearer ${token}` }}
      );

      if (paymentMethod === 'razorpay') {
        // Handle Razorpay payment
        const options = {
          key: "YOUR_RAZORPAY_KEY",
          amount: product.price * 100,
          currency: "INR",
          name: "Krishi App",
          description: `Purchase of ${product.name}`,
          order_id: response.data.razorpayOrderId,
          handler: function (response) {
            handlePaymentSuccess(response);
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.success('Order placed successfully!');
        onSuccess();
      }
    } catch (error) {
      toast.error('Error placing order');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:6500/api/orders/payment/verify',
        paymentResponse,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      toast.success('Payment successful!');
      onSuccess();
    } catch (error) {
      toast.error('Error confirming payment');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      
      {/* Product Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-green-600 font-bold">₹{product.price}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Address Fields */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Street Address"
            value={address.street}
            onChange={(e) => setAddress({...address, street: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({...address, city: e.target.value})}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) => setAddress({...address, state: e.target.value})}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) => setAddress({...address, pincode: e.target.value})}
              className="p-2 border rounded"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) => setAddress({...address, phone: e.target.value})}
              className="p-2 border rounded"
              required
            />
          </div>
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
            type="submit"
            disabled={loading || !paymentMethod}
            className={`flex-1 py-2 rounded ${
              loading || !paymentMethod
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout; 