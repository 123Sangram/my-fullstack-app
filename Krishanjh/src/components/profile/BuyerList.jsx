import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BuyerCard from './BuyerCard';

const BuyerList = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://my-fullstack-app-5.onrender.com/api/farmer/buyers')
      .then(res => {
        setBuyers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch buyers');
        setLoading(false);
      });
  }, []);
   if (loading) return <p className="text-center text-xl">Loading buyers...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!buyers.length) return <p className="text-center text-gray-600">No buyers found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {buyers.map((buyer) => (
        <BuyerCard key={buyer._id} buyer={buyer} />
      ))}
    </div>
  );
};



export default BuyerList;
