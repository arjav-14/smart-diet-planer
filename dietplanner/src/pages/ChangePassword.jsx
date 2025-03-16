import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    const token = localStorage.getItem("token"); 
    console.log("Token from localStorage before API call:", token); // Debugging

    if (!token) {
        setError("No token found. Please log in again.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,  // ✅ Send the token in Authorization header
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        });

        console.log("Response Status:", response.status); // Debugging

        const data = await response.json();
        if (response.ok) {
            console.log("Password changed successfully");
            setSuccess("Password changed successfully");
            setError("");
            setTimeout(() => navigate("/setting"), 2000);
        } else {
            console.log("Error Response:", data); // Debugging
            setError(data.message || "Failed to change password");
            setSuccess("");
        }
    } catch (error) {
        console.error("Network error:", error);
        setError("An error occurred. Please try again.");
        setSuccess("");
    }
};


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Current Password</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm New Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <button onClick={handleChangePassword} className="bg-indigo-500 text-white px-4 py-2 rounded-md">Change Password</button>
      </div>
    </div>
  );
};

export default ChangePassword;
