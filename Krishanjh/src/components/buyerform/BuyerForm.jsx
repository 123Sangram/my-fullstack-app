import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function BuyerForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    address: {
      line1: "",
      city: "",
      pincode: ""
    },
    image: null,
    latitude: "",
    longitude: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const response = await axios.post(
          "http://localhost:6500/api/buyer/login",
          {
            email: formData.email,
            password: formData.password
          }
        );

        if (response.data.success) {
          await login(response.data.buyer, response.data.token, true);
        }
      } else {
        const formDataToSend = new FormData();
        
        if (!formData.name || !formData.email || !formData.password || !formData.phone) {
          alert("Please fill all required fields");
          return;
        }

        Object.keys(formData).forEach(key => {
          if (key === 'address') {
            formDataToSend.append(key, JSON.stringify(formData[key]));
          } else if (key === 'image' && formData[key]) {
            formDataToSend.append(key, formData[key]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });

        const response = await axios.post(
          "http://localhost:6500/api/buyer/register",
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (response.data.success) {
          if (response.data.token && response.data.buyer) {
            // Auto login after registration
            await login(response.data.buyer, response.data.token, true);
            alert("Registration Successful! You are now logged in.");
            navigate("/frontpage");
          } else {
            alert("Registration Successful! You can now log in.");
            setIsLogin(true);
            resetForm();
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Something went wrong!";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      companyName: "",
      address: {
        line1: "",
        city: "",
        pincode: ""
      },
      image: null,
      latitude: "",
      longitude: ""
    });
    setImagePreview(null);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          setFormData(prev => ({
            ...prev,
            latitude: "20.5937",
            longitude: "78.9629"
          }));
          alert("Using default location. You can update it manually.");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f261d] flex flex-col items-center p-8">
      <h1 className="text-4xl mt-20 font-bold text-green-300 mb-8">
        {isLogin ? "Buyer Login" : "Buyer Registration"}
      </h1>

      <form
        className="w-full max-w-lg bg-blue-100 p-8 rounded-2xl shadow-lg"
        onSubmit={handleSubmit}
      >
        {!isLogin && (
          <>
            <label className="block mb-4">
              <span className="text-gray-700">Photo:</span>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="mt-2 p-2 w-full rounded"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 w-32 h-32 rounded-full object-cover"
                />
              )}
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded"
                required
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Company Name:</span>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded"
                required
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Phone:</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded"
                required
              />
            </label>

            <div className="mb-4">
              <span className="text-gray-700">Address:</span>
              <input
                type="text"
                name="address.line1"
                value={formData.address.line1}
                onChange={handleChange}
                placeholder="Street Address"
                className="mt-2 p-2 w-full rounded"
                required
              />
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="City"
                className="mt-2 p-2 w-full rounded"
                required
              />
              <input
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="mt-2 p-2 w-full rounded"
                required
              />
            </div>

            <div className="mb-4">
              <span className="text-gray-700">Location:</span>
              <button
                type="button"
                onClick={getCurrentLocation}
                className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Get Current Location
              </button>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="Latitude"
                  className="p-2 rounded"
                  step="any"
                  required
                />
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="Longitude"
                  className="p-2 rounded"
                  step="any"
                  required
                />
              </div>
            </div>
          </>
        )}

        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 p-2 w-full rounded"
            required
            autoComplete="email"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-2 p-2 w-full rounded"
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </label>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}
