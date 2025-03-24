import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
        <p className="text-sm text-gray-500">Farmer: {product.farmer.name}</p>
        <button
          onClick={() => navigate(`/checkout/${product._id}`)}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 