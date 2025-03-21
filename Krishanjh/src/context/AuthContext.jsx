// import axios from 'axios';
// import { jwtDecode } from "jwt-decode";
// import { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userType, setUserType] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           // Decode token to get user info
//           const decoded = jwtDecode(token);
          
//           // Verify token is not expired
//           if (decoded.exp * 1000 < Date.now()) {
//             localStorage.removeItem('token');
//             setUser(null);
//           } else {
//             // Get fresh user data from backend
//             const response = await axios.get('http://localhost:6500/api/auth/user', {
//               headers: {
//                 'Authorization': `Bearer ${token}`
//               }
//             });
            
//             if (response.data.success) {
//               setUser(response.data.user);
//               setIsAuthenticated(true);
//               setUserType(response.data.userType || null);
//               navigate('/frontpage');
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Auth initialization error:', error);
//         localStorage.removeItem('token');
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   const login = async (userData, token) => {
//     try {
//       localStorage.setItem('token', token);
//       setUser(userData);
//       setIsAuthenticated(true);
//       setUserType(userData.isBuyer ? 'buyer' : 'farmer');
//       navigate('/frontpage');
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userType');
//     setUser(null);
//     setIsAuthenticated(false);
//     setUserType(null);
//     navigate('/login');
//   };

//   // Add token refresh mechanism
//   const refreshToken = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         logout();
//         return;
//       }

//       const response = await axios.post('http://localhost:6500/api/auth/refresh-token', {}, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         localStorage.setItem('token', response.data.token);
//         return response.data.token;
//       }
//     } catch (error) {
//       console.error('Token refresh failed:', error);
//       logout();
//     }
//   };

//   // Add axios interceptor for token refresh
//   useEffect(() => {
//     const interceptor = axios.interceptors.response.use(
//       response => response,
//       async error => {
//         if (error.response?.status === 401) {
//           const newToken = await refreshToken();
//           if (newToken) {
//             error.config.headers['Authorization'] = `Bearer ${newToken}`;
//             return axios(error.config);
//           }
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => axios.interceptors.response.eject(interceptor);
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>; // Or your loading component
//   }

//   const value = {
//     user,
//     isAuthenticated,
//     userType,
//     login,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

// export default AuthContext; 



import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const userType = localStorage.getItem("userType");
        const userData = localStorage.getItem("userData");

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData, token, userType) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      return userType;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("userType");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;