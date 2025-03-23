import React, { useState, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const API_KEY = "I1YpEh7/aZbUWQi9o4J+sQ==404ZqURsRzSesf3S"; 

const saveToHistory = (meal) => {
    const history = JSON.parse(localStorage.getItem("mealHistory")) || [];
    history.push(meal);
    localStorage.setItem("mealHistory", JSON.stringify(history));
};

const loadHistory = () => {
    return JSON.parse(localStorage.getItem("mealHistory")) || [];
};

const removeMealFromHistory = (index) => {
  const history = JSON.parse(localStorage.getItem("mealHistory")) || [];
  history.splice(index, 1); // Remove the meal at the given index
  localStorage.setItem("mealHistory", JSON.stringify(history));
  return history;
};

const fetchNutritionData = async (foodName) => {
    const apiUrl = `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(foodName)}`;

    try {
        const response = await fetch(apiUrl, {
            headers: { "X-Api-Key": API_KEY },
        });

        const responseText = await response.text();
        console.log(`API Response for ${foodName}:`, responseText);

        const data = JSON.parse(responseText);

        if (data.items && data.items.length > 0) {
            return {
                name: foodName,
                calories: data.items[0].calories || 0,
                protein: data.items[0].protein_g || 0,
                fat: data.items[0].fat_total_g || 0,
                carbs: data.items[0].carbohydrates_total_g || 0,
            };
        }
    } catch (error) {
        console.error("Error fetching nutrition data:", error);
    }

    return { name: foodName, calories: 0, protein: 0, fat: 0, carbs: 0 };
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
    const [feedback, setFeedback] = useState("");
    const [suggestions, setSuggestions] = useState("");

    useEffect(() => {
        if (predictions.length > 0) {
            saveToHistory(predictions);
            setHistory(loadHistory());
            generateSuggestions();
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
                const nutritionDataPromises = data.predictions.map((item) =>
                    fetchNutritionData(item.name)
                );
                const updatedPredictions = await Promise.all(nutritionDataPromises);

                setPredictions(updatedPredictions);
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
    const handleRemoveMeal = (index) => {
      setHistory(removeMealFromHistory(index)); 
  };
    const generateSuggestions = () => {
        const totalCalories = predictions.reduce((sum, item) => sum + (item.calories || 0), 0);
        const totalProtein = predictions.reduce((sum, item) => sum + (item.protein || 0), 0);
        const totalFat = predictions.reduce((sum, item) => sum + (item.fat || 0), 0);
        const totalCarbs = predictions.reduce((sum, item) => sum + (item.carbs || 0), 0);

        let suggestionText = "";

        if (totalCalories > 700) suggestionText += "⚠️ High Calories! Consider a lighter meal.\n";
        if (totalProtein < 10) suggestionText += "💪 Low Protein! Try eggs, chicken, or beans.\n";
        if (totalFat > 20) suggestionText += "🥑 High Fat! Reduce oily or fried foods.\n";
        if (totalCarbs > 50) suggestionText += "🍞 High Carbs! Add more fiber-rich foods like veggies and whole grains.\n";

        setSuggestions(suggestionText || "✅ Your meal is well-balanced!");
    };

    const chartData = {
        labels: ["Proteins", "Fats", "Carbohydrates"],
        datasets: [
            {
                data: [
                    predictions.reduce((sum, item) => sum + (item.protein || 0), 0),
                    predictions.reduce((sum, item) => sum + (item.fat || 0), 0),
                    predictions.reduce((sum, item) => sum + (item.carbs || 0), 0),
                ],
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            },
        ],
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🍽️ Calorie & Nutrition Tracker</h2>

            <div className="flex items-center mb-4">
                <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
                <button onClick={handleImageUpload} disabled={loading} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
                    {loading ? "⏳ Uploading..." : "📤 Upload Image"}
                </button>
            </div>

            {uploadStatus && <p className="text-gray-700 mb-4">{uploadStatus}</p>}

            {imagePreview && <img src={imagePreview} alt="Selected" className="w-48 h-auto rounded-md shadow mb-4" />}

            {suggestions && (
                <div className="p-4 mb-4 bg-yellow-100 border-l-4 border-yellow-500">
                    <p className="text-yellow-700 whitespace-pre-line">{suggestions}</p>
                </div>
            )}

            {predictions.length > 0 && (
                <div className="flex">
                    <table className="border-collapse w-half border border-gray-400 ">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-4 py-2">Food Item</th>
                                <th className="border border-gray-400 px-4 py-2">Calories</th>
                                <th className="border border-gray-400 px-4 py-2">Protein</th>
                                <th className="border border-gray-400 px-4 py-2">Fat</th>
                                <th className="border border-gray-400 px-4 py-2">Carbs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {predictions.map((item, index) => (
                                <tr key={index} className="border border-gray-400">
                                    <td>{item.name}</td>
                                    <td>{item.calories}</td>
                                    <td>{item.protein}</td>
                                    <td>{item.fat}</td>
                                    <td>{item.carbs}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-1/2 ">
//                         <Doughnut data={chartData} />
//                     </div>
                </div>
            )}
            {history.length > 0 ? (
                <ul className="list-disc pl-5">
                    {history.map((meal, index) => (
                        <li key={index}>🍽️ {meal.map((item) => item.name).join(", ")}
                        <button
                                onClick={() => handleRemoveMeal(index)}
                                className="px-3 py-1 bg-red-500 text-white rounded ml-4"
                            >
                                🗑️ Delete
                            </button></li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No past meals recorded.</p>
            )}
           <form onSubmit={(e) => { e.preventDefault(); handleFeedbackSubmit(e.target.elements.feedback.value); }} className="mt-4">
//                 <textarea name="feedback" placeholder="Rate the accuracy" required className="w-full p-2 border rounded mb-2"></textarea>
//                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit Feedback</button>
//             </form>
        </div>
    );
};

export default CalorieIntake;
