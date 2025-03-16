// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Chatbot from "../components/Chatbot"; // Import the Chatbot component
// import CalorieIntake from "../components/CalorieIntake";
// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [activities, setActivities] = useState([]);
//   const navigate = useNavigate();
//   const addActivity = (activity) => {
//     setActivities([activity, ...activities]);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex">
//       {/* Sidebar Toggle Button */}
//       <button
//         className="fixed top-4 left-4 bg-indigo-500 text-white p-2 rounded-md z-50"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         ☰
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 w-64 bg-white p-5 shadow-md min-h-screen transition-all duration-300 ease-in-out z-40 
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
//       >
//         <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
//         <ul className="mt-4 space-y-4">
//           <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">🏠 Dashboard</li>
//           <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">🍽 Meal Plan</li>
//           <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">👥 Community</li>
//           <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">📈 Progress</li>
//           <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">⚙ Settings</li>
//           <li className="text-gray-600 hover:text-indigo-500 cursor-pointer" onClick={() => setIsChatOpen(true)}>
//             💬 Chatbot
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <Navbar />
//         <h1 className="text-3xl font-bold text-center mb-6">Welcome to Your Dashboard!</h1>
        

//         {/* Dashboard Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-800">🍎 Today's Meal Plan</h2>
//             <p className="text-gray-600 mt-2">Check your meal plan for the day.</p>
//             <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/view-plan")}>
//               View Plan
//             </button>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-800">🔥 Calories Intake</h2>
//             <p className="text-gray-600 mt-2">Keep track of your daily calorie consumption.</p>
//             <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md" onClick={()=>navigate("/calorie")}>Track Now</button>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-800">📊 Progress Report</h2>
//             <p className="text-gray-600 mt-2">Analyze your fitness progress.</p>
//             <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md">View Report</button>
//           </div>
//         </div>

//         {/* Recent Activities */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold">Recent Activities</h2>
//           <ul className="mt-4 space-y-3">
//             <li className="bg-white p-4 shadow rounded-md">✅ Logged 1500 calories today.</li>
//             <li className="bg-white p-4 shadow rounded-md">🥗 Updated today's meal plan.</li>
//             <li className="bg-white p-4 shadow rounded-md">📅 Joined a new fitness challenge.</li>
//           </ul>
//         </div>
//       </div>
//       <div className="mt-8">
//           <h2 className="text-2xl font-semibold">Recent Activities</h2>
//           <ul className="mt-4 space-y-3">
//             {activities.map((activity, index) => (
//               <li key={index} className="bg-white p-4 shadow rounded-md">{activity}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       {/* Chatbot Component */}
//       <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import CalorieIntake from "../components/CalorieIntake";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activities, setActivities] = useState([
    
  ]);
  const [newActivity, setNewActivity] = useState("");
  const navigate = useNavigate();

  // Function to add a new activity
  const addActivity = () => {
    if (newActivity.trim()) {
      setActivities([newActivity, ...activities]);
      setNewActivity("");
    }
  };
  const DeleteActivity =(index)=>{
    setActivities(activities.filter((_, i)=>i !== index));
  }
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <button
        className="fixed top-4 left-4 bg-indigo-500 text-white p-2 rounded-md z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      <aside
        className={`fixed top-0 left-0 w-64 bg-white p-5 shadow-md min-h-screen transition-all duration-300 ease-in-out z-40 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
        <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
        <ul className="mt-4 space-y-4">
          <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">🏠 Dashboard</li>
          <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">🍽 Meal Plan</li>
          <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">👥 Community</li>
          <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">📈 Progress</li>
          <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">⚙ Settings</li>
          <li className="text-gray-600 hover:text-indigo-500 cursor-pointer" onClick={() => setIsChatOpen(true)}>
            💬 Chatbot
          </li>
        </ul>
      </aside>

      <div className="flex-1 p-6">
        <Navbar />
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Your Dashboard!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">🍎 Today's Meal Plan</h2>
            <p className="text-gray-600 mt-2">Check your meal plan for the day.</p>
            <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/view-plan")}>
              View Plan
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">🔥 Calories Intake</h2>
            <p className="text-gray-600 mt-2">Keep track of your daily calorie consumption.</p>
            <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/calorie")}>
              Track Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">📊 Progress Report</h2>
            <p className="text-gray-600 mt-2">Analyze your fitness progress.</p>
            <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md">View Report</button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Recent Activities</h2>
          <div className="mt-4">
            <input
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Add a new activity"
              className="border p-2 rounded w-full mb-2"
            />
            <button onClick={addActivity} className="bg-indigo-500 text-white px-4 py-2 rounded-md">
              Add Activity
            </button>
          </div>
          <ul className="mt-4 space-y-3 ">
            {activities.map((activity, index) => (
              <li key={index} className="bg-white p-4 shadow rounded-md">{activity}
              <button  onClick={()=>DeleteActivity(index)} className="red-alert text-red-500 hover:text-red-700">Delete</button>
              </li>
              
            ))}
          </ul>
        </div>
      </div>

      <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </div>
  );
};

export default Dashboard;