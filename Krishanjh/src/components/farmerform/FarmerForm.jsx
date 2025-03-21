import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function FarmerForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    try {
      if (isLogin) {
        // Login API call
        const { email, password } = formData;
        console.log("Attempting login with:", { email, password: "****" });
        
        const response = await axios.post(
          "http://localhost:6500/api/farmer/login",
          { email, password },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        console.log("Login response:", response.data);

        if (response.data.success) {
          // Store token and update auth context
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userType', 'farmer');
          localStorage.setItem('userData', JSON.stringify(response.data.farmer));
          await login(response.data.farmer, response.data.token, false);
          
          alert("Login Successful!");
          navigate("/frontpage");
        } else {
          alert(response.data.message || "Login failed. Please check your credentials.");
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
          "http://localhost:6500/api/farmer/addfarmer",
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (response.data.success) {
          alert("Registration Successful! You can now log in.");
          setIsLogin(true); // Switch to login form
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
          await login(response.data.farmer, response.data.token, false);
        } else {
          alert(response.data.message || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      const errorMessage = error.response?.data?.message || "Something went wrong! Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f261d] flex flex-col items-center p-8">
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

        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 p-2 w-full rounded"
            placeholder="Enter your email"
            required
            autoComplete="email"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-2 p-2 w-full rounded"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-green-500 text-white p-2 rounded w-full"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="mt-4 text-center text-blue-500 cursor-pointer"
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