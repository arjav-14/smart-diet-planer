// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Navbar from "../components/Navbar";

// // const Dashboard = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const navigate = useNavigate();

// //   return (
// //     <div className="bg-gray-100 min-h-screen flex">
// //       {/* Sidebar Toggle Button */}
// //       <button
// //         className="fixed top-4 left-4 bg-indigo-500 text-white p-2 rounded-md z-50"
// //         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //       >
// //         ☰
// //       </button>

// //       {/* Sidebar */}
// //       <aside
// //         className={`fixed top-0 left-0 w-64 bg-white p-5 shadow-md min-h-screen transition-all duration-300 ease-in-out z-40 
// //           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
// //       >
// //         <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
// //         <ul className="mt-4 space-y-4">
// //           <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">🏠 Dashboard</li>
// //           <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">🍽 Meal Plan</li>
// //           <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">👥 Community</li>
// //           <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">📈 Progress</li>
// //           <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">⚙ Settings</li>
// //         </ul>
// //       </aside>

// //       {/* Main Content */}
// //       <div className="flex-1 p-6">
// //         {/* Navbar */}
// //         <Navbar />
// //         <h1 className="text-3xl font-bold text-center mb-6">Welcome to Your Dashboard!</h1>

// //         {/* Dashboard Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //           {/* Card 1: Today's Meal Plan */}
// //           <div className="bg-white p-6 rounded-lg shadow-md">
// //             <h2 className="text-xl font-semibold text-gray-800">🍎 Today's Meal Plan</h2>
// //             <p className="text-gray-600 mt-2">Check your meal plan for the day.</p>
// //             <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/view-plan")}>
// //               View Plan
// //             </button>
// //           </div>

// //           {/* Card 2: Calories Intake */}
// //           <div className="bg-white p-6 rounded-lg shadow-md">
// //             <h2 className="text-xl font-semibold text-gray-800">🔥 Calories Intake</h2>
// //             <p className="text-gray-600 mt-2">Keep track of your daily calorie consumption.</p>
// //             <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md">
// //               Track Now
// //             </button>
// //           </div>

// //           {/* Card 3: Progress Report */}
// //           <div className="bg-white p-6 rounded-lg shadow-md">
// //             <h2 className="text-xl font-semibold text-gray-800">📊 Progress Report</h2>
// //             <p className="text-gray-600 mt-2">Analyze your fitness progress.</p>
// //             <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md">
// //               View Report
// //             </button>
// //           </div>
// //         </div>

// //         {/* Recent Activities */}
// //         <div className="mt-8">
// //           <h2 className="text-2xl font-semibold">Recent Activities</h2>
// //           <ul className="mt-4 space-y-3">
// //             <li className="bg-white p-4 shadow rounded-md">✅ Logged 1500 calories today.</li>
// //             <li className="bg-white p-4 shadow rounded-md">🥗 Updated today's meal plan.</li>
// //             <li className="bg-white p-4 shadow rounded-md">📅 Joined a new fitness challenge.</li>
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const navigate = useNavigate();

//   // Handle sending a message
//   const sendMessage = async () => {
//     if (!userInput.trim()) return;

//     const newMessages = [...messages, { role: "user", content: userInput }];
//     setMessages(newMessages);
//     setUserInput("");

//     try {
//       const response = await fetch("http://localhost:3000/api/Chatbot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userInput }),
//       });

//       const data = await response.json();
//       setMessages([...newMessages, { role: "bot", content: data.botMessage }]);
//     } catch (error) {
//       setMessages([...newMessages, { role: "bot", content: "⚠️ Error connecting to chatbot" }]);
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
//             <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md">Track Now</button>
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

//       {/* Chatbot Window */}
//       {isChatOpen && (
//   <div
//     className="fixed bottom-0 right-0 bg-white shadow-lg rounded-lg overflow-hidden"
//     style={{
//       width: "50vw",  // 50% of the viewport width
//       height: "50vh", // 50% of the viewport height
//     }}
//   >
//     {/* Chatbot Header */}
//     <div className="bg-indigo-500 text-white p-4 flex justify-between">
//       <h3 className="font-semibold">Chatbot</h3>
//       <button className="text-white" onClick={() => setIsChatOpen(false)}>✖</button>
//     </div>

//     {/* Chat Messages */}
//     <div className="p-4" style={{ height: "70%", overflowY: "auto" }}>
//       {messages.map((msg, index) => (
//         <div key={index} className={`p-3 my-1 rounded-md ${msg.role === "user" ? "bg-blue-200 self-end" : "bg-gray-200"}`}>
//           {msg.content}
//         </div>
//       ))}
//     </div>

//     {/* Chat Input */}
//     <div className="p-4 border-t flex">
//       <input
//         type="text"
//         className="flex-1 p-3 border rounded-md"
//         placeholder="Type a message..."
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//       />
//       <button className="ml-2 bg-indigo-500 text-white px-4 py-3 rounded-md" onClick={sendMessage}>
//         ➤
//       </button>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot"; // Import the Chatbot component

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

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

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Navbar />
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Your Dashboard!</h1>

        {/* Dashboard Cards */}
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
            <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md">Track Now</button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">📊 Progress Report</h2>
            <p className="text-gray-600 mt-2">Analyze your fitness progress.</p>
            <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md">View Report</button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Recent Activities</h2>
          <ul className="mt-4 space-y-3">
            <li className="bg-white p-4 shadow rounded-md">✅ Logged 1500 calories today.</li>
            <li className="bg-white p-4 shadow rounded-md">🥗 Updated today's meal plan.</li>
            <li className="bg-white p-4 shadow rounded-md">📅 Joined a new fitness challenge.</li>
          </ul>
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </div>
  );
};

export default Dashboard;

