import React, { useState } from 'react';
import axios from 'axios';

const OrderTracking = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleOrder = async () => {
    const buyerId = localStorage.getItem("userId");

    if (!buyerId) {
      setMessage("sorry have some issue in server ");
      return;
    }

    try {
      const res = await axios.post("https://my-fullstack-app-5.onrender.com/api/buyer/addorder", {
        buyerId,
        productName,
        quantity,
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-sm">
      <h2 className="text-lg font-bold mb-4">Place Your Order</h2>

      <label className="block mb-1 font-medium">Product Name</label>
      <input
        type="text"
        className="border p-2 w-full mb-3"
        placeholder="Enter product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <label className="block mb-1 font-medium">Quantity</label>
      <input
        type="number"
        className="border p-2 w-full mb-4"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <button
        onClick={handleOrder}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Buy Now
      </button>

      {message && <p className="mt-3 text-sm text-blue-700">{message}</p>}
    </div>
  );
};

export default OrderTracking;
