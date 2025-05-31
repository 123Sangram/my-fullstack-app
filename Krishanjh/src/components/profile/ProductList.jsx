import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProductList = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFarmer, setSelectedFarmer] = useState('all');
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetchFarmers();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedFarmer]);

  const fetchFarmers = async () => {
    try {
      const res = await axios.get('https://my-fullstack-app-5.onrender.com/api/buyer/getAllFarmersWithProducts');
      setFarmers(res.data);
    } catch (error) {
      toast.error("Failed to fetch farmers",error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = selectedFarmer === 'all'
        ? "https://my-fullstack-app-5.onrender.com/api/buyer/getAllFarmersWithProducts"
        : `https://my-fullstack-app-5.onrender.com/api/buyer/getAllFarmersWithProducts`;

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = response.data;

      // Flatten data
      const flattened = selectedFarmer === 'all'
        ? data.flatMap(farmer => 
            farmer.products.map(product => ({
              ...product,
              farmer: {
                name: farmer.name,
                image: farmer.image
              }
            }))
          )
        : data.products.map(product => ({
            ...product,
            farmer: data.farmer
          }));

      setProducts(flattened);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <label className="text-gray-700 font-medium">Select Farmer:</label>
        <select
          value={selectedFarmer}
          onChange={(e) => setSelectedFarmer(e.target.value)}
          className="p-2 border rounded-md w-64 focus:border-green-500 focus:ring-1 focus:ring-green-500"
        >
          <option value="all">All Farmers</option>
          {farmers.map(farmer => (
            <option key={farmer._id} value={farmer._id}>
              {farmer.name} {farmer.landSize && `(${farmer.landSize} acres)`}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.avatar || "https://via.placeholder.com/300"}
                alt={product.productname}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.productname}</h3>
                <p className="text-gray-600 mt-2">Category: {product.categeory}</p>
                <p className="text-gray-600">Qty: {product.quantity}</p>
                <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
                {product.farmer && (
                  <p className="text-sm text-gray-500 mt-1">
                    Farmer: {product.farmer.name}
                  </p>
                )}
                <button
                  onClick={() => onProductSelect(product)}
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
