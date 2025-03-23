// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Chatbot from "../components/Chatbot";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [activities, setActivities] = useState([]);
//   const [newActivity, setNewActivity] = useState("");
//   const [bmi, setBmi] = useState(null);
//   const [weight, setWeight] = useState("");
//   const [height, setHeight] = useState("");
//   const [dietPlan, setDietPlan] = useState([]);
//   const navigate = useNavigate();

//   const API_KEY = "a99fec668d814118a5310601ff668401";

//   // Debugging: Log the chatbot state when it changes
//   useEffect(() => {
//     console.log("Chatbot State Changed: isChatOpen =", isChatOpen);
//   }, [isChatOpen]);

//   // Toggle Chatbot with correct state
//   const handleChatbotToggle = () => {
//     setIsChatOpen((prev) => {
//       console.log("Chatbot Icon Clicked!");
//       return !prev;
//     });
//   };

//   // Calculate BMI and Fetch Diet Plan
//   const calculateBMI = async () => {
//     if (!weight || !height || weight <= 0 || height <= 0) {
//       alert("Please enter valid weight and height values.");
//       return;
//     }

//     const heightInMeters = height / 100;
//     const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
//     setBmi(bmiValue);
//     fetchDietPlan(bmiValue);
//   };

//   // Fetch Diet Plan using Spoonacular API
//   const fetchDietPlan = async (bmi) => {
//     let dietType = "balanced";
//     if (bmi < 18.5) dietType = "high-protein";
//     else if (bmi >= 25) dietType = "low-carb";

//     try {
//       const response = await fetch(
//         `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&diet=${dietType}&apiKey=${API_KEY}`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch diet plan");
//       }

//       const data = await response.json();
//       setDietPlan(data.meals || []);
//     } catch (error) {
//       console.error("Error fetching diet plan:", error);
//       alert("Failed to fetch diet plan. Try again later.");
//     }
//   };

//   // Add new activity
//   const addActivity = () => {
//     if (newActivity.trim()) {
//       const timestamp = new Date().toLocaleString();
//       const updatedActivities = [{ activity: newActivity, timestamp }, ...activities];
//       setActivities(updatedActivities);
//       setNewActivity("");
//     } else {
//       alert("Please enter a valid activity.");
//     }
//   };

//   // Delete activity by index
//   const deleteActivity = (index) => {
//     const updatedActivities = activities.filter((_, i) => i !== index);
//     setActivities(updatedActivities);
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
//         className={`fixed top-0 left-0 w-64 bg-white p-5 shadow-md min-h-screen transition-transform duration-300 z-40 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:relative md:translate-x-0`}
//       >
//         <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
//         <ul className="mt-4 space-y-4">
//           <li onClick={() => navigate("/dashboard")}>🏠 Dashboard</li>
//           <li onClick={() => navigate("/view-plan")}>🍽️ View Plan</li>
//           <li onClick={() => navigate("/calorie")}>🔥 Calorie Intake</li>
//           <li onClick={() => navigate("/community")}>👥 Community</li>
//           <li onClick={() => navigate("/settings")}>⚙ Settings</li>
//           <li onClick={handleChatbotToggle}>💬 Chatbot</li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <Navbar />
//         <h1 className="text-3xl font-bold text-center mb-6">Welcome to Your Dashboard!</h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* BMI Calculator */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">📊 BMI Calculator</h2>
//             <input
//               type="number"
//               placeholder="Weight (kg)"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//               className="border p-2 rounded w-full mb-2"
//             />
//             <input
//               type="number"
//               placeholder="Height (cm)"
//               value={height}
//               onChange={(e) => setHeight(e.target.value)}
//               className="border p-2 rounded w-full mb-2"
//             />
//             <button className="bg-indigo-500 text-white px-4 py-2 rounded-md" onClick={calculateBMI}>
//               Calculate BMI
//             </button>
//             {bmi && <p className="mt-4">Your BMI: <strong>{bmi}</strong></p>}
//           </div>

//           {/* Meal Plan */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">🍎 Today's Meal Plan</h2>
//             <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/view-plan")}>
//               View Plan
//             </button>
//           </div>

//           {/* Calorie Intake */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">🔥 Calorie Intake</h2>
//             <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/calorie")}>
//               Track Now
//             </button>
//           </div>
//         </div>

//         {/* Recent Activities */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold">Recent Activities</h2>
//           <input
//             type="text"
//             value={newActivity}
//             onChange={(e) => setNewActivity(e.target.value)}
//             placeholder="Add a new activity"
//             className="border p-2 rounded w-full mb-2"
//           />
//           <button onClick={addActivity} className="bg-indigo-500 text-white px-4 py-2 rounded-md">
//             Add Activity
//           </button>
//         </div>
//       </div>

//       {/* Chatbot - Ensure proper prop passing */}
//       <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Chatbot from "../components/Chatbot";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [activities, setActivities] = useState([]);
//   const [newActivity, setNewActivity] = useState("");
//   const [bmi, setBmi] = useState(null);
//   const [weight, setWeight] = useState("");
//   const [height, setHeight] = useState("");
//   const [dietPlan, setDietPlan] = useState([]);
//   const navigate = useNavigate();

//   const API_KEY = "a99fec668d814118a5310601ff668401";

//   // Toggle Chatbot visibility
//   const handleChatbotToggle = () => {
//     setIsChatOpen((prev) => !prev);
//   };

//   // Calculate BMI and Fetch Diet Plan
//   const calculateBMI = async () => {
//     if (!weight || !height || weight <= 0 || height <= 0) {
//       alert("Please enter valid weight and height values.");
//       return;
//     }

//     const heightInMeters = height / 100;
//     const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
//     setBmi(bmiValue);
//     fetchDietPlan(bmiValue);
//   };

//   // Fetch Diet Plan using Spoonacular API
//   // const fetchDietPlan = async (bmi) => {
//   //   let dietType = "balanced";
//   //   if (bmi < 18.5) dietType = "high-protein";
//   //   else if (bmi >= 25) dietType = "low-carb";

//   //   try {
//   //     const response = await fetch(
//   //       `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&diet=${dietType}&apiKey=${API_KEY}`
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch diet plan");
//   //     }

//   //     const data = await response.json();
//   //     setDietPlan(data.meals || []);
//   //   } catch (error) {
//   //     console.error("Error fetching diet plan:", error);
//   //     alert("Failed to fetch diet plan. Try again later.");
//   //   }
//   // };
//   const fetchDietPlan = async (bmi) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&diet=${dietType}&apiKey=${API_KEY}`, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       if (response.status === 401) {
//         logout(); // Token expired, log out
//         alert("Session expired. Please log in again.");
//         return;
//       }
  
//       const data = await response.json();
//       setDietPlan(data.meals || []);
//     } catch (error) {
//       console.error("Error fetching diet plan:", error);
//     }
//   };
  
//   // Add new activity
//   const addActivity = () => {
//     if (newActivity.trim()) {
//       const timestamp = new Date().toLocaleString();
//       setActivities([{ activity: newActivity, timestamp }, ...activities]);
//       setNewActivity("");
//     } else {
//       alert("Please enter a valid activity.");
//     }
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
//         className={`fixed top-0 left-0 w-64 bg-white p-5 shadow-md min-h-screen transition-transform duration-300 z-40 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:relative md:translate-x-0`}
//       >
//         <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
//         <ul className="mt-4 space-y-4">
//           <li onClick={() => navigate("/dashboard")}>🏠 Dashboard</li>
//           <li onClick={() => navigate("/view-plan")}>🍽️ View Plan</li>
//           <li onClick={() => navigate("/calorie")}>🔥 Calorie Intake</li>
//           <li onClick={() => navigate("/community")}>👥 Community</li>
//           <li onClick={() => navigate("/settings")}>⚙ Settings</li>
//           <li onClick={handleChatbotToggle}>💬 Chatbot</li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <Navbar />
//         <h1 className="text-3xl font-bold text-center mb-6">Welcome to Your Dashboard!</h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* BMI Calculator */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">📊 BMI Calculator</h2>
//             <input
//               type="number"
//               placeholder="Weight (kg)"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//               className="border p-2 rounded w-full mb-2"
//             />
//             <input
//               type="number"
//               placeholder="Height (cm)"
//               value={height}
//               onChange={(e) => setHeight(e.target.value)}
//               className="border p-2 rounded w-full mb-2"
//             />
//             <button
//               className="bg-indigo-500 text-white px-4 py-2 rounded-md"
//               onClick={calculateBMI}
//             >
//               Calculate BMI
//             </button>
//             {bmi && <p className="mt-4">Your BMI: <strong>{bmi}</strong></p>}

//             {/* Display Diet Plan */}
//             {dietPlan.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold mb-2">🍎 Recommended Diet Plan</h3>
//                 <ul className="list-disc pl-5">
//                   {dietPlan.map((meal) => (
//                     <li key={meal.id}>
//                       {meal.title} ({meal.readyInMinutes} min)
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Meal Plan */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">🍎 Today's Meal Plan</h2>
//             <button
//               className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md"
//               onClick={() => navigate("/view-plan")}
//             >
//               View Plan
//             </button>
//           </div>

//           {/* Calorie Intake */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">🔥 Calorie Intake</h2>
//             <button
//               className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md"
//               onClick={() => navigate("/calorie")}
//             >
//               Track Now
//             </button>
//           </div>
//         </div>

//         {/* Recent Activities */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold">Recent Activities</h2>
//           <input
//             type="text"
//             value={newActivity}
//             onChange={(e) => setNewActivity(e.target.value)}
//             placeholder="Add a new activity"
//             className="border p-2 rounded w-full mb-2"
//           />
//           <button
//             onClick={addActivity}
//             className="bg-indigo-500 text-white px-4 py-2 rounded-md"
//           >
//             Add Activity
//           </button>
//         </div>
//       </div>

//       {/* Chatbot */}
//       <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const [bmi, setBmi] = useState(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [dietPlan, setDietPlan] = useState([]);
  const navigate = useNavigate();

  const API_KEY = "a99fec668d814118a5310601ff668401";

  // Toggle Chatbot visibility
  const handleChatbotToggle = () => {
    setIsChatOpen((prev) => !prev);
  };

  // Calculate BMI and Fetch Diet Plan
  const calculateBMI = async () => {
    if (!weight || !height || weight <= 0 || height <= 0) {
      alert("Please enter valid weight and height values.");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    // Determine dietType based on BMI
    let dietType = "balanced";
    if (bmiValue < 18.5) dietType = "high-protein";
    else if (bmiValue >= 25) dietType = "low-carb";

    fetchDietPlan(bmiValue, dietType);
  };

  // Fetch Diet Plan using Spoonacular API
  const fetchDietPlan = async (bmi, dietType) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&diet=${dietType}&apiKey=${API_KEY}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login"); // Redirect to login on token expiry
        return;
      }

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

  // Add new activity
  const addActivity = () => {
    if (newActivity.trim()) {
      const timestamp = new Date().toLocaleString();
      setActivities([{ activity: newActivity, timestamp }, ...activities]);
      setNewActivity("");
    } else {
      alert("Please enter a valid activity.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-4 left-4 bg-indigo-500 text-white p-2 rounded-md z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-white p-5 shadow-md min-h-screen transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
        <ul className="mt-4 space-y-4">
          <li onClick={() => navigate("/dashboard")}>🏠 Dashboard</li>
          <li onClick={() => navigate("/view-plan")}>🍽️ View Plan</li>
          <li onClick={() => navigate("/calorie")}>🔥 Calorie Intake</li>
          <li onClick={() => navigate("/community")}>👥 Community</li>
          <li onClick={() => navigate("/settings")}>⚙ Settings</li>
          <li onClick={handleChatbotToggle}>💬 Chatbot</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Navbar />
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Your Dashboard!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* BMI Calculator */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">📊 BMI Calculator</h2>
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md"
              onClick={calculateBMI}
            >
              Calculate BMI
            </button>
            {bmi && <p className="mt-4">Your BMI: <strong>{bmi}</strong></p>}

            {/* Display Diet Plan */}
            {dietPlan.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">🍎 Recommended Diet Plan</h3>
                <ul className="list-disc pl-5">
                  {dietPlan.map((meal) => (
                    <li key={meal.id}>
                      {meal.title} ({meal.readyInMinutes} min)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Meal Plan */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">🍎 Today's Meal Plan</h2>
            <button
              className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate("/view-plan")}
            >
              View Plan
            </button>
          </div>

          {/* Calorie Intake */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">🔥 Calorie Intake</h2>
            <button
              className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate("/calorie")}
            >
              Track Now
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Recent Activities</h2>
          <input
            type="text"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            placeholder="Add a new activity"
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={addActivity}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Add Activity
          </button>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </div>
  );
};

export default Dashboard;
