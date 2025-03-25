import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";

const Dashboard = () => {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem('activities');
    return savedActivities ? JSON.parse(savedActivities) : [];
  });
  const [newActivity, setNewActivity] = useState("");
  const [bmi, setBmi] = useState(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [dietPlan, setDietPlan] = useState([]);
  
  const navigate = useNavigate();
  const API_KEY = "a99fec668d814118a5310601ff668401";

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest('#sidebar') && !event.target.closest('#sidebar-toggle')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  // Save activities to localStorage
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  
  const handleChatbotToggle = () => {
    setIsChatOpen(prev => !prev);
  };

  // Calculate BMI
  const calculateBMI = async () => {
    if (!weight || !height || weight <= 0 || height <= 0) {
      alert("Please enter valid weight and height values.");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    let dietType = "balanced";
    if (bmiValue < 18.5) dietType = "high-protein";
    else if (bmiValue >= 25) dietType = "low-carb";

    fetchDietPlan(dietType);
  };

  // Fetch Diet Plan
  const fetchDietPlan = async (dietType) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&diet=${dietType}&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch diet plan");
      }

      const data = await response.json();
      setDietPlan(data.meals || []);
    } catch (error) {
      console.error("Error fetching diet plan:", error);
      alert("Error fetching diet plan. Try again later.");
    }
  };

  // Activity Management
  const addActivity = () => {
    if (newActivity.trim()) {
      const timestamp = new Date().toLocaleString();
      const updatedActivities = [{ activity: newActivity, timestamp }, ...activities];
      setActivities(updatedActivities);
      setNewActivity("");
    }
  };

  const deleteActivity = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newActivity.trim()) {
      addActivity();
    }
  };

  // Navigation with sidebar closing
  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar Toggle Button */}
      <button
        id="sidebar-toggle"
        className="fixed top-4 left-4 bg-indigo-500 text-white p-2 rounded-md z-50 md:hidden hover:bg-indigo-600 transition-colors"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 w-64 bg-white p-5 shadow-md min-h-screen transition-all duration-300 z-40 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0`}
      >
        <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
        <ul className="mt-4 space-y-4">
          {[
            { path: "/dashboard", icon: "🏠", label: "Dashboard" },
            { path: "/view-plan", icon: "🍽️", label: "View Plan" },
            { path: "/calorie", icon: "🔥", label: "Calorie Intake" },
            { path: "/community", icon: "👥", label: "Community" },
            { path: "/setting", icon: "⚙", label: "Settings" },
          ].map((item) => (
            <li
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="cursor-pointer hover:text-indigo-500 transition-colors flex items-center space-x-2"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
          <li
            onClick={handleChatbotToggle}
            className="cursor-pointer hover:text-indigo-500 transition-colors flex items-center space-x-2"
          >
            <span>💬</span>
            <span>Chatbot</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Navbar />
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Your Dashboard!</h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* BMI Calculator */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">📊 BMI Calculator</h2>
            <div className="space-y-3">
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                min="0"
              />
              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                min="0"
              />
              <button
                className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
                onClick={calculateBMI}
              >
                Calculate BMI
              </button>
              {bmi && (
                <p className="mt-4 text-center font-medium">
                  Your BMI: <strong>{bmi}</strong>
                </p>
              )}
            </div>

            {/* Diet Plan Display */}
            {dietPlan.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">🍎 Recommended Diet Plan</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {dietPlan.map((meal) => (
                    <li key={meal.id} className="text-gray-700">
                      {meal.title} ({meal.readyInMinutes} min)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Meal Plan */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">🍎 Today's Meal Plan</h2>
            <button
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
              onClick={() => navigate("/view-plan")}
            >
              View Plan
            </button>
          </div>

          {/* Calorie Intake */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">🔥 Calorie Intake</h2>
            <button
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
              onClick={() => navigate("/calorie")}
            >
              Track Now
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {/* Activity Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new activity"
                className="border p-2 rounded flex-1 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
              />
              <button
                onClick={addActivity}
                disabled={!newActivity.trim()}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Add Activity
              </button>
            </div>

            {/* Activities List */}
            <div className="mt-4">
              {activities.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No activities yet</p>
              ) : (
                <ul className="space-y-3">
                  {activities.map((activity, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-gray-500">{activity.timestamp}</p>
                      </div>
                      <button
                        onClick={() => deleteActivity(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete activity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </div>
  );
};

export default Dashboard;