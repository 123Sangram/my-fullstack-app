import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProductList = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFarmer, setSelectedFarmer] = useState('all');
  const [farmers, setFarmers] = useState([]);

  // Fetch farmers when component mounts
  useEffect(() => {
    fetchFarmers();
  }, []);

  // Fetch products when selected farmer changes
  useEffect(() => {
    fetchProducts();
  }, [selectedFarmer]);

  const fetchFarmers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://my-fullstack-app-5.onrender.com/api/farmer/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Farmers response:', response.data); // Debug log
      
      if (response.data.success && response.data.farmers) {
        setFarmers(response.data.farmers);
      } else {
        toast.error('No farmers found');
      }
    } catch (error) {
      // console.error('Error fetching farmers:', error);
      // toast.error('Error fetching farmers list');
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = selectedFarmer === 'all'
        ? 'https://my-fullstack-app-5.onrender.com/api/products/all'
        : `https://my-fullstack-app-5.onrender.com/api/products/farmer/${selectedFarmer}`;

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Products response:', response.data); // Debug log

      if (response.data.success && response.data.products) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      // console.error('Error fetching products:', error);
      // toast.error('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Farmer Selection */}
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

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : products.length === 0 ? (
        // No Products State
        <div className="text-center py-8">
          <p className="text-gray-500">No products available</p>
        </div>
      ) : (
        // Products Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div 
              key={product._id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
                {product.farmer && (
                  <p className="text-sm text-gray-500">
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
