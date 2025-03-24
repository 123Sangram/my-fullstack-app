import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:6500/api/orders/buyer');
      setOrders(response.data.orders);
    } catch (error) {
      toast.error('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await axios.post(`http://localhost:6500/api/orders/${orderId}/cancel`);
      toast.success('Order cancelled successfully');
      fetchOrders();
    } catch (error) {
      toast.error('Error cancelling order');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{order.product.name}</h3>
                <p className="text-gray-600">₹{order.amount}</p>
                <p className="text-sm text-gray-500">
                  Order ID: {order._id}
                </p>
                <p className="text-sm text-gray-500">
                  Status: <span className={`font-semibold ${
                    order.status === 'DELIVERED' ? 'text-green-600' :
                    order.status === 'CANCELLED' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>{order.status}</span>
                </p>
              </div>
              
              {order.status === 'PENDING' && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
            </div>

            {/* Order Timeline */}
            <div className="mt-4">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${
                  order.status !== 'CANCELLED' ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <div className="h-0.5 flex-1 bg-gray-200">
                  <div className={`h-full ${
                    order.status === 'PROCESSING' || order.status === 'DELIVERED' 
                      ? 'bg-green-500' : 'bg-gray-200'
                  }`} style={{ width: '50%' }} />
                </div>
                <div className={`w-4 h-4 rounded-full ${
                  order.status === 'DELIVERED' ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Ordered</span>
                <span>Processing</span>
                <span>Delivered</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking; 