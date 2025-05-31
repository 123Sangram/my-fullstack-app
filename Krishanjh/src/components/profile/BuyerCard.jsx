import React from 'react';
import PropTypes from 'prop-types';

const BuyerCard = ({ buyer }) => {
  if (!buyer || !buyer.address) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mb-6 border hover:scale-105 transition-transform duration-300">
      <img
        src={buyer.image || "https://via.placeholder.com/150"}
        alt={buyer.name}
        className="w-32 h-32 rounded-full object-cover mx-auto"
      />
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold text-gray-800">{buyer.name}</h2>
        <p className="text-gray-600">{buyer.email}</p>
        <p className="text-gray-600">{buyer.phone}</p>
        <p className="text-gray-600 font-medium">Company: {buyer.companyName}</p>
        <div className="mt-2 text-sm text-gray-500">
          <p>Address: {buyer.address.line1}, {buyer.address.city} - {buyer.address.pincode}</p>
        </div>
      </div>
    </div>
  );
};


BuyerCard.propTypes = {
  buyer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    companyName: PropTypes.string,
    image: PropTypes.string,
    address: PropTypes.shape({
      line1: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      pincode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BuyerCard;
