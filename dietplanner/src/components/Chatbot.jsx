import React, { useState, useEffect, useRef } from "react";

const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const chatRef = useRef(null);

  
  useEffect(() => {
    try {
      const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
      setMessages(savedMessages);
    } catch (error) {
      console.error("⚠️ Error loading chat history:", error);
    }
  }, []);

  
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  
  useEffect(() => {
    if (chatRef.current) {
      setTimeout(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }, 100);
    }
  }, [messages]);

  
  const fetchBotResponse = async (userMessage) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch("http://localhost:3000/api/chatbot", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      return data.botMessage || "Sorry, I didn't understand that.";
    } catch (error) {
      console.error("⚠️ Error fetching bot response:", error);
      return "⚠️ Error: Unable to connect to server.";
    }
  };

 
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    
    setUserInput("");

   
    const botReply = await fetchBotResponse(userInput);
    const botMessage = { role: "bot", content: botReply };

    setMessages((prev) => [...prev, botMessage]);
  };


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
     
      <div className="bg-indigo-500 text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold">Chatbot</h3>
        <button className="text-white text-lg" onClick={() => setIsChatOpen(false)}>
          ✖
        </button>
      </div>

    
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
