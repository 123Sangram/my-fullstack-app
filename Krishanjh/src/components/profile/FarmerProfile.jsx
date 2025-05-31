import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from "../../context/AuthContext";
import Navbar from '../navbar/Navbar';


const FarmerProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const userType = localStorage.getItem('userType');
  const [activeTab, setActiveTab] = useState('profile');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  
  
  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    categeory: 'vegetables',
    avatar: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Get user data from localStorage if not available from context
    if (!user) {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        // No user data found, redirect to login
        navigate('/farmer-form');
      }
    } else {
      setUserData(user);
      fetchFarmerProducts();
    }
  }, [user, navigate]);

// get all farmers



  const fetchFarmerProducts = async () => {
    try {
      const token = localStorage.getItem('token');
       console.log(token)
      const response = await axios.get(
    //     `https://my-fullstack-app-5.onrender.com/api/products/farmer/${user._id}`
            `https://my-fullstack-app-5.onrender.com/api/farmer/products`
            
        , {
        headers: { Authorization: `Bearer ${token}` }
      });
      

     
         console.log("Fetched products:", response.data.products);
    setProducts(response.data.products);
    } catch (error) {
      toast.error('some issue to fetch products',error);
    }
  };
  // http://localhost:6500/api/farmer/products/${user._id}

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductForm(prev => ({
        ...prev,
        avatar: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append('productname', productForm.name);
    formData.append('description', productForm.description);
    formData.append('price', productForm.price);
    formData.append('quantity', productForm.quantity);
    formData.append('categeory', productForm.categeory);

    if (productForm.avatar) {
      formData.append('avatar', productForm.avatar); // ✅ Correct field name
    }

    const token = localStorage.getItem('token');
    const response = await axios.post(
       // 'https://my-fullstack-app-5.onrender.com/api/products/create',
      "https://my-fullstack-app-5.onrender.com/api/farmer/addNewProduct",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if (response.data.success) {
      toast.success('Product added successfully!');
      setShowAddProduct(false);
      setProductForm({
        productname: '',
        description: '',
        price: '',
        quantity: '',
        categeory: 'vegetables',
        avatar: null
      });
      setImagePreview(null);
      fetchFarmerProducts();
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error adding product');
  } finally {
    setLoading(false);
  }
};


  const menuItems = [
    { title: "Chat with Buyers", path: "/chatbot", icon: "💬" },
    { title: "Market Analysis", path: "/MarketTrendAnalyzer", icon: "📊" },
    { title: "Contract Farming", path: "/contract", icon: "📝" },
    { title: "Legal Support", path: "/legal", icon: "⚖️" },
    { title: "Buyer List", path: "/buyerlist", icon: "🛒" }
  ];

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate('/farmer-form');
  };

  if (!userData && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className=" flex justify-around text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Loading...</h2>
          <p className="text-gray-600">Please wait while we load your profile.</p>
        </div>
      </div>
    );
  }

  const displayUser = userData || user;

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Products</h2>
        <button
          onClick={() => setShowAddProduct(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Add New Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.avatar}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
              <p className="text-gray-500">Quantity: {product.quantity}</p>
              <p className="text-gray-500">Categeory: {product.categeory}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAddProductForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        
        <form onSubmit={handleAddProduct} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 mb-2">Product Image</label>
            <input
              type="file"
              name="avatar" 
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-full h-48 object-cover rounded"
              />
            )}
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={productForm.name}
              onChange={handleProductChange}
              className="w-full p-2 border rounded focus:border-green-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={productForm.description}
              onChange={handleProductChange}
              className="w-full p-2 border rounded focus:border-green-500"
              rows="3"
              required
            />
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleProductChange}
                className="w-full p-2 border rounded focus:border-green-500"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={productForm.quantity}
                onChange={handleProductChange}
                className="w-full p-2 border rounded focus:border-green-500"
                min="1"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={productForm.category}
              onChange={handleProductChange}
              className="w-full p-2 border rounded focus:border-green-500"
              required
            >
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2 rounded ${
                loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() => setShowAddProduct(false)}
              className="flex-1 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#243F32]">
      <ToastContainer />
      {/* <Navbar /> */}
      
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'profile'
                ? 'bg-green-500 text-white'
                : 'bg-white text-green-500 hover:bg-green-50'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'products'
                ? 'bg-green-500 text-white'
                : 'bg-white text-green-500 hover:bg-green-50'
            }`}
          >
            My Products
          </button>
   
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'profile' ? (
            // Profile Content
            <div>
              <div className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {displayUser?.image ? (
                        <img
                          src={displayUser.image}
                          alt={displayUser.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl">
                          {displayUser?.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                          Welcome, {displayUser?.name}!
                        </h1>
                        <p className="text-gray-600">
                          {userType === "farmer"
                            ? `${displayUser?.landSize || "N/A"} acres | ${displayUser?.cropType || "Various Crops"}`
                            : displayUser?.companyName}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(item.path)}
                      className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105"
                    >
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {item.title}
                      </h2>
                      <p className="text-gray-600">
                        Click to access {item.title.toLowerCase()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quick Stats Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">No recent activities</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {userType === "farmer" ? "Crop Status" : "Recent Orders"}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">No data available</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Notifications
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">No new notifications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Products Content
            renderProducts()

          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && renderAddProductForm()}
    </div>
  );
};

export default FarmerProfile;
