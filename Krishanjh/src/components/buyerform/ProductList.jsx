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
    fetchProducts();
  }, [selectedFarmer]);

  const fetchFarmers = async () => {
    try {
      const response = await axios.get('http://localhost:6500/api/farmer/all');
      setFarmers(response.data.farmers);
    } catch (error) {
      toast.error('Error fetching farmers');
    }
  };

  const fetchProducts = async () => {
    try {
      const url = selectedFarmer === 'all' 
        ? 'http://localhost:6500/api/products/all'
        : `http://localhost:6500/api/products/farmer/${selectedFarmer}`;
      const response = await axios.get(url);
      setProducts(response.data.products);
    } catch (error) {
      toast.error('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Farmer Filter */}
      <div className="mb-6">
        <select
          value={selectedFarmer}
          onChange={(e) => setSelectedFarmer(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">All Farmers</option>
          {farmers.map(farmer => (
            <option key={farmer._id} value={farmer._id}>
              {farmer.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div 
            key={product._id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
              <p className="text-sm text-gray-500">Farmer: {product.farmer.name}</p>
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
    </div>
  );
};

export default ProductList; 