import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState('all');
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="p-6">
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList; 