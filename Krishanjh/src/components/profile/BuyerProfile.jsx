import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../navbar/Navbar';
import Checkout from '../checkout/Checkout';
import OrderTracking from '../orders/OrderTracking';

// import ProductList from '../';

const BuyerProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    address: { line1: '', city: '', pincode: '' },
    image: null
  });

  useEffect(() => {
    if (!user) {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setFormData(parsedData);
      } else {
        navigate('/buyer-form');
      }
    } else {
      setFormData(user);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/buyer-form');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfile();
      case 'products':
        return <ProductList onProductSelect={(product) => {
          setSelectedProduct(product);
          setActiveTab('checkout');
        }} />;
      case 'orders':
        return <OrderTracking />;
        
      case 'checkout':
        return selectedProduct ? (
          <Checkout 
            product={selectedProduct} 
            onSuccess={() => {
              setActiveTab('orders');
              setSelectedProduct(null);
              toast.success('Order placed successfully!');
            }}
            onCancel={() => {
              setActiveTab('products');
              setSelectedProduct(null);
            }}
          />
        ) : (
          setActiveTab('products')
        );
      default:
        return renderProfile();
    }
  };

  const renderProfile = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center space-x-4 mb-6">
        {formData.image ? (
          <img
            src={formData.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl">
            {formData.name?.charAt(0)}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{formData.name}</h2>
          <p className="text-gray-600">{formData.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Company Details</h3>
          <p>Company: {formData.companyName}</p>
          <p>Phone: {formData.phone}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Address</h3>
          <p>{formData.address?.line1}</p>
          <p>{formData.address?.city}, {formData.address?.pincode}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              activeTab === 'profile'
                ? 'bg-green-500 text-white'
                : 'bg-white text-green-500 hover:bg-green-50'
            }`}
          >
            Profile
          </button>
     <button
  onClick={() => navigate('/productlist')}
  className={`px-6 py-2 rounded-lg transition-all duration-300 ${
    activeTab === 'products'
      ? 'bg-green-500 text-white'
      : 'bg-white text-green-500 hover:bg-green-50'
  }`}
>
  Browse Products
</button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              activeTab === 'orders'
                ? 'bg-green-500 text-white'
                : 'bg-white text-green-500 hover:bg-green-50'
            }`}
          >
            My Orders
          </button>
          <button
            onClick={handleLogout}
            className="ml-auto px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile; 