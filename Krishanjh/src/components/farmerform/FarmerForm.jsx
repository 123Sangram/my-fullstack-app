import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../context/AuthContext";

export default function FarmerForm() {
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
    address: "",
    image: null,
    landSize: "",
    cropType: "",
    experience: "",
  });

 const [showEmailPlaceholder, setShowEmailPlaceholder] = useState(true);
const [showPasswordPlaceholder, setShowPasswordPlaceholder] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
         if (name === "email" && value === "") {
           setShowEmailPlaceholder(true);
         }
  };
const handleEmailFocus = () => {
  if (showEmailPlaceholder) {
    handleChange({
      target: {
        name: "email",
        value: "sangram@gmail.com",
      },
    });
    setShowEmailPlaceholder(false);
  }
};
const handlePasswordFocus = () => {
  if (showPasswordPlaceholder) {
    handleChange({
      target: {
        name: "password",
        value: "Sangram@123",
      },
    });
    setShowPasswordPlaceholder(false);
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
    setIsLoading(true); // Start loading

    try {
      if (isLogin) {
        // Login API call
        const { email, password } = formData;
        
        const response = await axios.post(
          "https://my-fullstack-app-5.onrender.com/api/farmer/login",
          { email, password },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          // Store token and update auth context
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userType', 'farmer');
          localStorage.setItem('userData', JSON.stringify(response.data.farmer));
          await login(response.data.farmer, response.data.token, false);
          
          toast.success('Login Successful!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // Navigate after toast
          setTimeout(() => {
            navigate("/frontpage");
          }, 1000);
        } else {
          toast.error(response.data.message || "Login failed!");
        }
      } else {
        // Registration API call
        const formDataToSend = new FormData();
        
        // Append all form fields
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('landSize', formData.landSize);
        formDataToSend.append('cropType', formData.cropType);
        formDataToSend.append('experience', formData.experience);
        
        // Append the image file last
        if (formData.image) {
          formDataToSend.append('image', formData.image);
        }

        const response = await axios.post(
          "https://my-fullstack-app-5.onrender.com/api/farmer/addfarmer",
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (response.data.success) {
          toast.success('Registration Successful! Please login.', {
            position: "top-right",
            autoClose: 2000,
          });
          
          setIsLogin(true);
          // Clear the form
          setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            image: null,
            landSize: "",
            cropType: "",
            experience: "",
          });
          setImagePreview(null);
        } else {
          toast.error(response.data.message || "Registration failed!");
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-[#0f261d] flex flex-col items-center p-8">
      <ToastContainer />
      <h1 className="text-4xl mt-20 font-bold text-green-300 mb-8">
        {isLogin ? "Farmer Login" : "Farmer Registration"}
      </h1>

      <form
        className="w-full max-w-lg bg-green-100 p-8 rounded-2xl shadow-lg"
        onSubmit={handleSubmit}
      >
        {!isLogin && (
          <>
            <label className="block mb-4">
              <span className="text-gray-700">Photo:</span>
              <input
                type="file"
                name="image"
                className="mt-2 p-2 w-full rounded"
                onChange={handleImageChange}
                required
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 w-full rounded"
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
                placeholder="Enter your name"
                required
                autoComplete="name"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Phone:</span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded"
                placeholder="Enter your mobile number"
                required
                autoComplete="tel"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Address:</span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded"
                placeholder="Enter your address"
                required
                autoComplete="address-line1"
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Land Size (in acres):</span>
              <input
                type="text"
                name="landSize"
                value={formData.landSize}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded"
                placeholder="Enter land size"
                required
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Crop Type:</span>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded"
                placeholder="Enter crop type"
                required
              />
            </label>

            <label className="block mb-4">
              <span className="text-gray-700">Experience (in years):</span>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded"
                placeholder="Enter experience"
                required
              />
            </label>
          </>
        )}

        <div className="relative mb-4">
          <span className="text-gray-700">Email:</span>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleEmailFocus}
              className="mt-2 p-2 w-full rounded border border-gray-300"
              required
              autoComplete="email"
            />
            {showEmailPlaceholder && (
              <div
                className="absolute left-3 top-3 text-gray-400 cursor-text"
                onClick={() => {
                  handleChange({
                    target: {
                      name: "email",
                      value: "sangram@gmail.com",
                    },
                  });
                  setShowEmailPlaceholder(false);
                }}
              >
                sangram@gmail.com
              </div>
            )}
          </div>
        </div>

        <label className="block mb-6 relative">
          <span className="text-gray-700">Password:</span>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              className="mt-2 p-2 w-full rounded border border-gray-300"
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
            {showPasswordPlaceholder && (
              <div
                className="absolute left-3 top-3 text-gray-400 cursor-text"
                onClick={() => {
                  handleChange({
                    target: {
                      name: "password",
                      value: "Sangram@123",
                    },
                  });
                  setShowPasswordPlaceholder(false);
                }}
              >
                Sangram@123
              </div>
            )}
          </div>
        </label>


        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 bg-green-500 text-white p-2 rounded w-full transition-all duration-300
            ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-600'}`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
              {isLogin ? "Logging in..." : "Registering..."}
            </div>
          ) : (
            isLogin ? "Login" : "Register"
          )}
        </button>

        <p
          className="mt-4 text-center text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-300"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}
