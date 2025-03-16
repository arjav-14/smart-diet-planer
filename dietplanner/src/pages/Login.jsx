// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3000/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Store the token if your backend sends one
//         localStorage.setItem('token', data.token);
//         navigate('/dashboard');
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError('Login failed. Please try again.');
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-4 text-center">Welcome! Login</h1>
//         {error && (
//           <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md text-center">
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       console.log("Login Response:", data); // ✅ Debugging API response

//       if (!response.ok || !data.user) {
//         throw new Error(data.message || "Login failed");
//       }

//       // ✅ Store user info in localStorage
//       localStorage.setItem("userInfo", JSON.stringify(data.user));
//       console.log("Stored user in localStorage:", localStorage.getItem("userInfo"));

//       // ✅ Navigate after successful login
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Login error:", error.message);
//       alert("Login failed: " + error.message); // Show error alert
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border p-2 mb-2 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border p-2 mb-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
//new
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true); // ✅ Show loading state

//     try {
//       const response = await fetch("http://localhost:3000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       console.log("Login Response:", data); // ✅ Debugging API response

//       if (!response.ok || !data.user) {
//         throw new Error(data.message || "Invalid credentials");
//       }

//       // ✅ Store user info in localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       console.log("Stored user in localStorage:", localStorage.getItem("user"));

//       // ✅ Navigate after successful login
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("❌ Login error:", error.message);
//       alert(error.message);
//     } finally {
//       setLoading(false); // ✅ Hide loading state
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border p-2 mb-2 rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border p-2 mb-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${
//             loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ Added missing state for error messages
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // ✅ Prevent form from refreshing the page
    setLoading(true);
    setError(""); // Reset error state

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data); // Debugging

      if (data.success) {
        localStorage.setItem("token", data.token); // ✅ Store token in localStorage
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Store user data
        console.log("Stored token in localStorage:", data.token); // Debugging

        navigate("/dashboard"); // ✅ Redirect to dashboard
      } else {
        console.error("Login failed:", data.message);
        setError(data.message || "Invalid email or password"); // ✅ Show error message
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={(e) => handleLogin(e)} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500">{error}</p>} {/* ✅ Show error message if any */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />

        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
