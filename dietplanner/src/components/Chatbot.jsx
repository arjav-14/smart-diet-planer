// import React, { useState } from "react";

// const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");

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

//   if (!isChatOpen) return null;

//   return (
//     <div
//       className="fixed bottom-0 right-0 bg-white shadow-lg rounded-lg overflow-hidden"
//       style={{ width: "50vw", height: "50vh" }}
//     >
//       {/* Chatbot Header */}
//       <div className="bg-indigo-500 text-white p-4 flex justify-between">
//         <h3 className="font-semibold">Chatbot</h3>
//         <button className="text-white" onClick={() => setIsChatOpen(false)}>✖</button>
//       </div>

//       {/* Chat Messages */}
//       <div className="p-4" style={{ height: "70%", overflowY: "auto" }}>
//         {messages.map((msg, index) => (
//           <div key={index} className={`p-3 my-1 rounded-md ${msg.role === "user" ? "bg-blue-200 self-end" : "bg-gray-200"}`}>
//             {msg.content}
//           </div>
//         ))}
//       </div>

//       {/* Chat Input */}
//       <div className="p-4 border-t flex">
//         <input
//           type="text"
//           className="flex-1 p-3 border rounded-md"
//           placeholder="Type a message..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button className="ml-2 bg-indigo-500 text-white px-4 py-3 rounded-md" onClick={sendMessage}>
//           ➤
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


// import React, { useState, useEffect, useRef } from "react";

// const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const chatRef = useRef(null);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Handle sending a text message
//   const sendMessage = async () => {
//     if (!userInput.trim()) return;

//     setMessages((prev) => [...prev, { role: "user", content: userInput }]);
//     setUserInput("");

//     try {
//       const response = await fetch("http://localhost:3000/api/Chatbot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userInput }),
//       });

//       const data = await response.json();
//       setMessages((prev) => [...prev, { role: "bot", content: data.botMessage }]);
//     } catch (error) {
//       setMessages((prev) => [...prev, { role: "bot", content: "⚠️ Error connecting to chatbot" }]);
//     }
//   };

//   // Handle image selection
//   const handleImageChange = (event) => {
//     setSelectedImage(event.target.files[0]);
//   };

//   // Upload image and process it
//   const uploadImage = async () => {
//     if (!selectedImage) return;

//     const formData = new FormData();
//     formData.append("image", selectedImage);

//     setMessages((prev) => [...prev, { role: "user", content: "📷 Image uploaded" }]);

//     try {
//       const response = await fetch("http://localhost:3000/api/analyze-food", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       setMessages((prev) => [...prev, { role: "bot", content: `🍽️ Food: ${data.foodName}\n🔍 Details: ${data.description}` }]);
//     } catch (error) {
//       setMessages((prev) => [...prev, { role: "bot", content: "⚠️ Error recognizing food" }]);
//     }

//     setSelectedImage(null);
//   };

//   if (!isChatOpen) return null;

//   return (
//     <div
//       className="fixed bottom-10 right-5 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300"
//       style={{ width: "50vw", height: "68vh" }}
//     >
//       {/* Chatbot Header */}
//       <div className="bg-indigo-500 text-white p-4 flex justify-between items-center">
//         <h3 className="font-semibold">Chatbot</h3>
//         <button className="text-white text-lg" onClick={() => setIsChatOpen(false)}>✖</button>
//       </div>

//       {/* Chat Messages */}
//       <div ref={chatRef} className="p-4 overflow-y-auto" style={{ height: "60%" }}>
//         {messages.map((msg, index) => (
//           <div key={index} className={`p-3 my-1 rounded-md w-fit max-w-xs ${msg.role === "user" ? "bg-blue-200 ml-auto" : "bg-gray-200"}`}>
//             {msg.content}
//           </div>
//         ))}
//       </div>

//       {/* Chat Input */}
//       <div className="p-4 border-t flex flex-col">
//         <div className="flex">
//           <input
//             type="text"
//             className="flex-1 p-3 border rounded-md focus:outline-none"
//             placeholder="Type a message..."
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button className="ml-2 bg-indigo-500 text-white px-4 py-3 rounded-md" onClick={sendMessage}>
//             ➤
//           </button>
//         </div>
//         {/* Image Upload */}
//         <div className="mt-2 flex items-center">
//           <input type="file" accept="image/*" onChange={handleImageChange} className="mr-2" />
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-md"
//             onClick={uploadImage}
//             disabled={!selectedImage}
//           >
//             📸 Upload
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


// import React, { useState, useEffect, useRef } from "react";

// const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const chatRef = useRef(null);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Function to send a text message
//   const sendMessage = async () => {
//     if (!userInput.trim()) return;

//     const userMessage = { role: "user", content: userInput };
//     setMessages((prev) => [...prev, userMessage]);
//     setUserInput("");

//     try {
//       const response = await fetch("http://localhost:3000/api/Chatbot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userInput }),
//       });

//       if (!response.ok) throw new Error("Failed to fetch bot response");

//       const data = await response.json();
//       const botMessage = { role: "bot", content: data.botMessage };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Chatbot error:", error);
//       setMessages((prev) => [...prev, { role: "bot", content: "⚠️ Error connecting to chatbot" }]);
//     }
//   };

//   // Handle image selection and preview
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   // Upload image and process it
//   const uploadImage = async () => {
//     if (!selectedImage) {
//       alert("Please select an image before uploading.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", selectedImage);

//     // Add message indicating image upload
//     setMessages((prev) => [...prev, { role: "user", content: "📷 Image uploaded" }]);

//     try {
//       const response = await fetch("http://localhost:3000/api/analyze-food", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Failed to process image");

//       const data = await response.json();

//       if (data.success && Array.isArray(data.predictions)) {
//         processPredictions(data.predictions);
//       } else {
//         throw new Error("Invalid response format");
//       }
//     } catch (error) {
//       console.error("Image processing error:", error);
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", content: "⚠️ Error recognizing food. Please try again." },
//       ]);
//     } finally {
//       setSelectedImage(null);
//       setImagePreview(null);
//     }
//   };

//   // Process API predictions
//   const processPredictions = (predictions) => {
//     if (!predictions || predictions.length === 0) {
//       setMessages((prev) => [...prev, { role: "bot", content: "🍽️ No food detected." }]);
//       return;
//     }

//     const foodItems = predictions.map((prediction) => prediction.name);
//     setMessages((prev) => [...prev, { role: "bot", content: `🍽️ Food detected: ${foodItems.join(", ")}` }]);
//   };

//   if (!isChatOpen) return null;

//   return (
//     <div className="fixed bottom-10 right-5 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300" style={{ width: "50vw", height: "68vh" }}>
//       {/* Chatbot Header */}
//       <div className="bg-indigo-500 text-white p-4 flex justify-between items-center">
//         <h3 className="font-semibold">Chatbot</h3>
//         <button className="text-white text-lg" onClick={() => setIsChatOpen(false)}>✖</button>
//       </div>

//       {/* Chat Messages */}
//       <div ref={chatRef} className="p-4 overflow-y-auto" style={{ height: "60%" }}>
//         {messages.map((msg, index) => (
//           <div key={index} className={`p-3 my-1 rounded-md w-fit max-w-xs ${msg.role === "user" ? "bg-blue-200 ml-auto" : "bg-gray-200"}`}>
//             {msg.content}
//           </div>
//         ))}
//       </div>

//       {/* Chat Input */}
//       <div className="p-4 border-t flex flex-col">
//         <div className="flex">
//           <input
//             type="text"
//             className="flex-1 p-3 border rounded-md focus:outline-none"
//             placeholder="Type a message..."
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button className="ml-2 bg-indigo-500 text-white px-4 py-3 rounded-md" onClick={sendMessage}>
//             ➤
//           </button>
//         </div>

//         {/* Image Upload */}
//         <div className="mt-2 flex items-center">
//           <input type="file" accept="image/*" onChange={handleImageChange} className="mr-2" />
//           <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={uploadImage} disabled={!selectedImage}>
//             📸 Upload
//           </button>
//         </div>

//         {/* Image Preview */}
//         {imagePreview && (
//           <div className="mt-2">
//             <h4 className="text-gray-600">Selected Image:</h4>
//             <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
// import React, { useState, useEffect, useRef } from "react";

// const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const chatRef = useRef(null);

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Function to send a text message
//   const sendMessage = async () => {
//     if (!userInput.trim()) return;

//     const userMessage = { role: "user", content: userInput };
//     setMessages((prev) => [...prev, userMessage]);
//     setUserInput("");

//     try {
//       const response = await fetch("http://localhost:3000/api/Chatbot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userInput }),
//       });

//       if (!response.ok) throw new Error("Failed to fetch bot response");

//       const data = await response.json();
//       const botMessage = { role: "bot", content: data.botMessage };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Chatbot error:", error);
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", content: "⚠️ Error connecting to chatbot" },
//       ]);
//     }
//   };

//   // Handle image selection and preview
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   // Upload image and process it
//   const uploadImage = async () => {
//     if (!selectedImage) {
//       alert("Please select an image before uploading.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", selectedImage);

//     setMessages((prev) => [...prev, { role: "user", content: "📷 Image uploaded" }]);

//     try {
//       const response = await fetch("http://localhost:3000/api/analyze-food", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Failed to process image");

//       const data = await response.json();

//       if (data.success && Array.isArray(data.predictions)) {
//         processPredictions(data.predictions);
//       } else {
//         throw new Error("Invalid response format");
//       }
//     } catch (error) {
//       console.error("Image processing error:", error);
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", content: "⚠️ Error recognizing food. Please try again." },
//       ]);
//     } finally {
//       setSelectedImage(null);
//       setImagePreview(null);
//     }
//   };

//   // Process API predictions
//   const processPredictions = (predictions) => {
//     if (!predictions || predictions.length === 0) {
//       setMessages((prev) => [...prev, { role: "bot", content: "🍽️ No food detected." }]);
//       return;
//     }

//     const foodItems = predictions.map((prediction) => prediction.name);
//     setMessages((prev) => [...prev, { role: "bot", content: `🍽️ Food detected: ${foodItems.join(", ")}` }]);
//   };

//   if (!isChatOpen) return null;

//   return (
//     <div
//       className="fixed bottom-10 right-5 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300"
//       style={{ width: "70vw", height: "80vh" }} // Setting width and height to 50% of viewport
//     >
//       {/* Chatbot Header */}
//       <div className="bg-indigo-500 text-white p-4 flex justify-between items-center">
//         <h3 className="font-semibold">Chatbot</h3>
//         <button className="text-white text-lg" onClick={() => setIsChatOpen(false)}>
//           ✖
//         </button>
//       </div>

//       {/* Chat Messages */}
//       <div ref={chatRef} className="p-4 overflow-y-auto" style={{ height: "60%" }}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-3 my-1 rounded-md w-fit max-w-xs ${
//               msg.role === "user" ? "bg-blue-200 ml-auto" : "bg-gray-200"
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}
//       </div>

//       {/* Chat Input */}
//       <div className="p-4  mb-2 border-t flex flex-col">
//         <div className="flex">
//           <input
//             type="text"
//             className="flex-1 p-3 border rounded-md focus:outline-none"
//             placeholder="Type a message..."
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button className="ml-2 bg-indigo-500 text-white px-4 py-3 rounded-md" onClick={sendMessage}>
//             ➤
//           </button>
//         </div>

//         {/* Image Upload */}
//         <div className="mt-3 flex items-center">
//           <input type="file" accept="image/*" onChange={handleImageChange} className="mr-2" />
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-md"
//             onClick={uploadImage}
//             disabled={!selectedImage}
//           >
//             📸 Upload
//           </button>
//         </div>

//         {/* Image Preview */}
//         {imagePreview && (
//           <div className="mt-2">
//             <h4 className="text-gray-600">Selected Image:</h4>
//             <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState, useEffect, useRef } from "react";

const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const chatRef = useRef(null);

  // 🔹 Load chat history from localStorage
  useEffect(() => {
    try {
      const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
      setMessages(savedMessages);
    } catch (error) {
      console.error("⚠️ Error loading chat history:", error);
    }
  }, []);

  // 🔹 Save chat history whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  // 🔹 Auto-scroll to the latest message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // 🔹 Function to fetch bot response
  const fetchBotResponse = async (userMessage) => {
    try {
      const response = await fetch("http://localhost:3000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      return data.botMessage || "Sorry, I didn't understand that.";
    } catch (error) {
      console.error("⚠️ Error fetching bot response:", error);
      return "⚠️ Error: Unable to connect to server.";
    }
  };

  // 🔹 Function to send a message
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    
    setUserInput("");

    // 🔹 Get bot response from API
    const botReply = await fetchBotResponse(userInput);
    const botMessage = { role: "bot", content: botReply };

    setMessages((prev) => [...prev, botMessage]);
  };

  // 🔹 Clear Chat History
  const clearHistory = () => {
    localStorage.removeItem("chatHistory");
    setMessages([]);
  };

  if (!isChatOpen) return null;

  return (
    <div
      className="fixed bottom-10 right-5 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300"
      style={{ width: "70vw", height: "80vh" }}
    >
      {/* Chatbot Header */}
      <div className="bg-indigo-500 text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold">Chatbot</h3>
        <button className="text-white text-lg" onClick={() => setIsChatOpen(false)}>
          ✖
        </button>
      </div>

      {/* Buttons for View History & Clear Chat */}
      <div className="p-4 flex justify-between bg-gray-100">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-md"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? "🔙 Back to Chat" : "📜 View History"}
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={clearHistory}>
          🗑️ Clear History
        </button>
      </div>

      {/* Chat Messages or View History */}
      <div ref={chatRef} className="p-4 overflow-y-auto" style={{ height: "60%" }}>
        {showHistory ? (
          <div>
            <h4 className="text-gray-600 font-semibold mb-2">📜 Chat History:</h4>
            {messages.length === 0 ? (
              <p className="text-gray-500">No chat history available.</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 my-1 rounded-md w-fit max-w-xs ${
                    msg.role === "user" ? "bg-blue-200 ml-auto" : "bg-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">Start a conversation...</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 my-1 rounded-md w-fit max-w-xs ${
                    msg.role === "user" ? "bg-blue-200 ml-auto" : "bg-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Chat Input */}
      {!showHistory && (
        <div className="p-4 mb-2 border-t flex">
          <input
            type="text"
            className="flex-1 p-3 border rounded-md focus:outline-none"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="ml-2 bg-indigo-500 text-white px-4 py-3 rounded-md" onClick={sendMessage}>
            ➤
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
