// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// const OrderTracking = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(
//         // 'https://my-fullstack-app-5.onrender.com/api/orders/buyer',
//          {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setOrders(response.data.orders);
//     } catch (error) {
//       toast.error('Error fetching orders',error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         // `http://localhost:6500/api/orders/${orderId}/cancel`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` }}
//       );
//       toast.success('Order cancelled successfully');
//       fetchOrders();
//     } catch (error) {
//       toast.error('Error cancelling order',error);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {orders.map(order => (
//         <div key={order._id} className="border rounded-lg p-4">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="font-semibold">{order.product.name}</h3>
//               <p className="text-green-600">₹{order.totalAmount}</p>
//               <p className="text-sm text-gray-500">Order ID: {order._id}</p>
//               <p className="text-sm text-gray-500">
//                 Status: <span className={`font-semibold ${
//                   order.orderStatus === 'delivered' ? 'text-green-600' :
//                   order.orderStatus === 'cancelled' ? 'text-red-600' :
//                   'text-yellow-600'
//                 }`}>{order.orderStatus}</span>
//               </p>
//             </div>
            
//             {order.orderStatus === 'pending' && (
//               <button
//                 onClick={() => cancelOrder(order._id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Cancel Order
//               </button>
//             )}
//           </div>

//           {/* Order Timeline */}
//           <div className="mt-4">
//             <div className="flex items-center">
//               <div className={`w-4 h-4 rounded-full ${
//                 order.orderStatus !== 'cancelled' ? 'bg-green-500' : 'bg-gray-300'
//               }`} />
//               <div className="h-0.5 flex-1 bg-gray-200">
//                 <div className={`h-full ${
//                   ['processing', 'shipped', 'delivered'].includes(order.orderStatus)
//                     ? 'bg-green-500' : 'bg-gray-200'
//                 }`} style={{ width: '50%' }} />
//               </div>
//               <div className={`w-4 h-4 rounded-full ${
//                 order.orderStatus === 'delivered' ? 'bg-green-500' : 'bg-gray-300'
//               }`} />
//             </div>
//             <div className="flex justify-between text-sm mt-1">
//               <span>Ordered</span>
//               <span>Processing</span>
//               <span>Delivered</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrderTracking; 