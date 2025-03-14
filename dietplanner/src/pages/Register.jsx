// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "User",
//     secretKey: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const signupUser = async (formData) => {
//     try {
//       const response = await fetch("http://localhost:3000/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       return await response.json();
//     } catch (err) {
//       console.error("Signup error:", err);
//       throw new Error("Failed to sign up. Please try again.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!formData.name || !formData.email || !formData.password || (formData.role === "Admin" && !formData.secretKey)) {
//       setError("All fields are required.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const data = await signupUser(formData);

//       if (data.success) {
//         localStorage.setItem("userInfo", JSON.stringify(data));
//         navigate("/login");
//       } else {
//         setError(data.message || "Error signing up. Please try again.");
//       }
//     } catch (err) {
//       setError(err.message || "Something went wrong. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

//         {error && <p className="text-red-500 text-center">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           {/* Role Selection */}
//           <div className="flex justify-center gap-4 mb-3">
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="role"
//                 value="User"
//                 checked={formData.role === "User"}
//                 onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                 className="mr-2"
//               />
//               User
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="role"
//                 value="Admin"
//                 checked={formData.role === "Admin"}
//                 onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                 className="mr-2"
//               />
//               Admin
//             </label>
//           </div>

//           {/* Name */}
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-3">
//             <input
//               type="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-3">
//             <input
//               type="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           {/* Secret Key (Only for Admin) */}
//           {formData.role === "Admin" && (
//             <div className="mb-3">
//               <input
//                 type="text"
//                 placeholder="Secret Key"
//                 value={formData.secretKey}
//                 onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>

//         {/* Login Link */}
//         <p className="text-center text-gray-600 mt-3">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-500 hover:underline">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
    secretKey: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupUser = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      return await response.json();
    } catch (err) {
      console.error("Signup error:", err);
      throw new Error("Failed to sign up. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password || (formData.role === "Admin" && !formData.secretKey)) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const data = await signupUser(formData);

      if (data.success) {
        // ✅ Store user data in localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("userName", formData.name);  // ✅ Store username separately

        navigate("/login");
      } else {
        setError(data.message || "Error signing up. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="flex justify-center gap-4 mb-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="User"
                checked={formData.role === "User"}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="mr-2"
              />
              User
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="Admin"
                checked={formData.role === "Admin"}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="mr-2"
              />
              Admin
            </label>
          </div>

          {/* Name */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Secret Key (Only for Admin) */}
          {formData.role === "Admin" && (
            <div className="mb-3">
              <input
                type="text"
                placeholder="Secret Key"
                value={formData.secretKey}
                onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
