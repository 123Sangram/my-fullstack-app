import React, { useState } from 'react';
import axios from 'axios';

const AllFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);

const getAllFarmers = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    const response = await axios.get('https://my-fullstack-app-5.onrender.com/api/farmer/farmers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Fetched Farmers:', response.data); 
    setFarmers(response.data); 
    setShowTable(true);
  } catch (error) {
    console.error('Error fetching farmers:', error);
    alert('Failed to fetch farmers');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-4">
      {/* Styled Button Like Tab */}
      <button
        onClick={getAllFarmers}
        className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
      >
        Get All Farmers
      </button>

      {/* Loader / Table */}
      {loading ? (
        <p className="mt-4">Loading farmers...</p>
      ) : (
        showTable &&
        farmers.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map((farmer) => (
                  <tr key={farmer._id}>
                    <td className="border p-2">{farmer.name}</td>
                    <td className="border p-2">{farmer.email}</td>
                    <td className="border p-2">{farmer.phone || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default AllFarmers;
