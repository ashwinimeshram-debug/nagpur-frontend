// import axios from "axios";

// const API = axios.create({
//   // baseURL: "http://127.0.0.1:5000/api",
//   baseURL: "http://localhost:5000/api", // 🔥 CHANGE THIS
//   withCredentials: true, // 🔥 ADD THIS LINE (VERY IMPORTANT)
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // 🔒 REQUIRED FOR COOKIES
});

// 🔥 AUTO LOGOUT ON TOKEN EXPIRY
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 🚨 SESSION EXPIRED OR INVALID
      window.location.href = "/admin";
    }
    return Promise.reject(error);
  }
);

export default API;