import React, { useState, useEffect, useRef } from "react";

const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [userPreferences, setUserPreferences] = useState({
        diets: [],
        allergies: []
    });
    const chatRef = useRef(null);

    // Load chat history and preferences
    useEffect(() => {
        const loadChatData = async () => {
            try {
                const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
                setMessages(savedMessages);

                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:3000/api/chatmessages", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.messages.length > 0) {
                        const latestMessage = data.messages[0];
                        setUserPreferences({
                            diets: latestMessage.dietaryInfo?.extractedDiets || [],
                            allergies: latestMessage.dietaryInfo?.extractedAllergies || []
                        });
                    }
                }
            } catch (error) {
                console.error("⚠️ Error loading chat data:", error);
            }
        };

        loadChatData();
    }, []);

    // Auto-save messages
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("chatHistory", JSON.stringify(messages));
        }
    }, [messages]);

    // Auto-scroll
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    // Fetch bot response
    const fetchBotResponse = async (userMessage) => {
        try {
            setIsTyping(true);
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: userMessage,
                    preferences: userPreferences
                }),
            });

            if (!response.ok) throw new Error("Failed to fetch bot response");

            const data = await response.json();
            if (data.dietaryInfo) {
                setUserPreferences({
                    diets: data.dietaryInfo.extractedDiets,
                    allergies: data.dietaryInfo.extractedAllergies
                });
            }

            return data.botMessage || "🤖 Sorry, I didn't understand that.";
        } catch (error) {
            console.error("❌ Error:", error);
            return "⚠️ Server connection error.";
        } finally {
            setIsTyping(false);
        }
    };

    // Send message
    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            role: "user",
            content: userInput,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setUserInput("");

        const botReply = await fetchBotResponse(userInput);
        setMessages(prev => [...prev, {
            id: Date.now() + 1,
            role: "bot",
            content: botReply,
            timestamp: new Date().toISOString()
        }]);
    };

    // Clear history
    const clearHistory = async () => {
        try {
            const token = localStorage.getItem("token");
            await fetch("http://localhost:3000/api/chatmessages", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem("chatHistory");
            setMessages([]);
            setUserPreferences({ diets: [], allergies: [] });
        } catch (error) {
            console.error("❌ Error clearing history:", error);
        }
    };

    if (!isChatOpen) return null;

    return (
        <div className="fixed bottom-10 right-5 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300"
            style={{ width: "70vw", height: "80vh" }}>
            {/* Header */}
            <div className="bg-indigo-500 text-white p-4 flex justify-between items-center">
                <h3 className="font-semibold">AI Diet Assistant</h3>
                <div className="flex items-center space-x-2">
                    {isTyping && <span className="text-sm">Bot is typing...</span>}
                    <button
                        className="text-white hover:bg-indigo-600 rounded-full p-1"
                        onClick={() => setIsChatOpen(false)}
                    >
                        ✖
                    </button>
                </div>
            </div>

            {/* Preferences */}
            {(userPreferences.diets.length > 0 || userPreferences.allergies.length > 0) && (
                <div className="px-4 py-2 bg-gray-50 border-b text-sm">
                    {userPreferences.diets.length > 0 && (
                        <p className="text-gray-600">🥗 Diets: {userPreferences.diets.join(", ")}</p>
                    )}
                    {userPreferences.allergies.length > 0 && (
                        <p className="text-gray-600">⚠️ Allergies: {userPreferences.allergies.join(", ")}</p>
                    )}
                </div>
            )}

            {/* Controls */}
            <div className="p-4 flex justify-between bg-gray-100">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors"
                    onClick={() => setShowHistory(!showHistory)}
                >
                    {showHistory ? "🔙 Back to Chat" : "📜 View History"}
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors"
                    onClick={clearHistory}
                >
                    🗑️ Clear History
                </button>
            </div>

            {/* Chat Window */}
            <div
                ref={chatRef}
                className="p-4 overflow-y-auto"
                style={{ height: "calc(100% - 13rem)" }}
            >
                {(showHistory ? messages : messages.slice(-10)).map((msg) => (
                    <div
                        key={msg.id}
                        className={`p-3 my-1 rounded-md max-w-xs ${
                            msg.role === "user" ? "bg-blue-200 ml-auto" : "bg-gray-200"
                        }`}
                    >
                        <div className="text-sm break-words">{msg.content}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            {!showHistory && (
                <div className="p-4 border-t flex">
                    <input
                        type="text"
                        className="flex-1 p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full min-w-0"
                        placeholder="Type your message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-r-md transition-colors"
                        onClick={sendMessage}
                        disabled={isTyping}
                    >
                        {isTyping ? "..." : "➤"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Chatbot;