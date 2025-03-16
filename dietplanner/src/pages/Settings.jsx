import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [profile, setProfile] = useState({
   
  });

  const navigate = useNavigate();

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLogout = () => {
   
    console.log("User logged out");
    navigate("/login");
  };

  const handleChangePassword = () => {
    
    console.log("Redirecting to change password page");
    navigate("/change-password");
  };

  const saveSettings = () => {
   
    console.log("Settings saved:", profile);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Management</h2>
        <button
          onClick={handleChangePassword}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Change Password
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      <button onClick={saveSettings} className="bg-indigo-500 text-white px-4 py-2 rounded-md">
        Save Settings
      </button>
    </div>
  );
};

export default Settings;