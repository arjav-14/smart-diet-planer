import React, { useState, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const saveToHistory = (meal) => {
    const history = JSON.parse(localStorage.getItem('mealHistory')) || [];
    history.push(meal);
    localStorage.setItem('mealHistory', JSON.stringify(history));
};

const loadHistory = () => {
    return JSON.parse(localStorage.getItem('mealHistory')) || [];
};

const handleFeedbackSubmit = async (feedback) => {
    try {
        await fetch("http://localhost:3000/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ feedback }),
        });
        alert("Feedback submitted!");
    } catch (error) {
        console.error("Error submitting feedback:", error);
    }
};

const CalorieIntake = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [history, setHistory] = useState(loadHistory());

    useEffect(() => {
        if (predictions.length > 0) {
            saveToHistory(predictions);
            setHistory(loadHistory());
        }
    }, [predictions]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleImageUpload = async () => {
        if (!file) {
            setUploadStatus("⚠️ Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        setUploadStatus("⏳ Uploading and analyzing image...");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/analyze-food", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            console.log("📊 API Response Data:", data);

            if (data.success && Array.isArray(data.predictions)) {
                setPredictions(data.predictions);
                setUploadStatus(data.message || "✅ Image analyzed successfully!");
            } else {
                setPredictions([]);
                setUploadStatus("⚠️ No food items detected.");
            }
        } catch (error) {
            console.error("❌ Error during API request:", error);
            setUploadStatus(`❌ Error: ${error.message}`);
            setPredictions([]);
        } finally {
            setLoading(false);
        }
    };

    const totalCalories = predictions.reduce((sum, item) => sum + (item.calories || 0), 0);

    const getSuggestions = (foodItems) => {
        return foodItems.map(item => ({
            ...item,
            suggestion: item.calories > 300 ? "Consider a lighter option" : "Good choice!"
        }));
    };

    const suggestions = getSuggestions(predictions);

    const exportData = () => {
        const csvContent = "data:text/csv;charset=utf-8," + predictions.map(e => `${e.name},${e.calories}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "meal_analysis.csv");
        document.body.appendChild(link);
        link.click();
    };

    const chartData = {
        labels: predictions.map(item => item.name),
        datasets: [{
            data: predictions.map(item => item.calories),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }]
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🍽️ Calorie Intake</h2>
            <p className="text-gray-600 mb-6">Upload an image of your meal to track calorie intake.</p>

            <div className="flex items-center mb-4">
                <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
                <button
                    onClick={handleImageUpload}
                    disabled={loading}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    {loading ? "⏳ Uploading..." : "📤 Upload Image"}
                </button>
            </div>

            {uploadStatus && <p className="text-gray-700 mb-4">{uploadStatus}</p>}

            {imagePreview && (
                <div className="mb-4">
                    <img src={imagePreview} alt="Selected" className="w-48 h-auto rounded-md shadow" />
                </div>
            )}

            {predictions.length > 0 && (
                <div className="flex mb-4">
                    <div className="w-1/2 pr-4">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">🍕 Detected Foods and Calories</h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300 text-xs">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-700">
                                        <th className="py-1 px-2 border">Food Item</th>
                                        <th className="py-1 px-2 border">Calories (kcal)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {predictions.map((item, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="py-1 px-2 border text-gray-800">{item.name}</td>
                                            <td className="py-1 px-2 border text-green-600 font-bold">
                                                {item.calories.toFixed(1)} kcal
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="text-lg font-semibold text-gray-800 mt-4">Total Calories: {totalCalories} kcal</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-700">Suggestions</h3>
                            {suggestions.map((item, index) => (
                                <p key={index} className="text-gray-600">{item.name}: {item.suggestion}</p>
                            ))}
                        </div>

                        <button onClick={exportData} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                            Export as CSV
                        </button>
                    </div>

                    <div className="w-1/2">
                        <Doughnut data={chartData} options={{ plugins: { legend: { display: true, position: 'bottom' } } }} />
                    </div>
                </div>
            )}

            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">History</h3>
                <ul className="list-disc list-inside text-gray-600">
                    {history.map((meal, index) => (
                        <li key={index}>
                            {meal.map(item => item.name).join(", ")}
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleFeedbackSubmit(e.target.elements.feedback.value); }} className="mt-4">
                <textarea name="feedback" placeholder="Rate the accuracy" required className="w-full p-2 border rounded mb-2"></textarea>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit Feedback</button>
            </form>
        </div>
    );
};

export default CalorieIntake;