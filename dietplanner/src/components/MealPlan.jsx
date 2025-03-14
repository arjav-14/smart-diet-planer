// import React, { useEffect, useState } from "react";

// const MealPlan = () => {
//     const [mealPlan, setMealPlan] = useState("");

//     useEffect(() => {
//         fetch("http://localhost:5173/api/latest-meal-plan") // Adjust URL as needed
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.mealPlan) {
//                     setMealPlan(data.mealPlan);
//                 } else {
//                     setMealPlan("No meal plan found. Ask the chatbot to generate one!");
//                 }
//             })
//             .catch((err) => console.error("Error fetching meal plan:", err));
//     }, []);

//     return (
//         <div>
//             <h2>Your Meal Plan</h2>
//             <p>{mealPlan}</p>
//         </div>
//     );
// };

// export default MealPlan;
import { useEffect, useState } from "react";

const ViewPlan = () => {
    const [mealPlan, setMealPlan] = useState([]); // Ensure it's an array initially

    useEffect(() => {
        fetch("http://localhost:3000/api/latest-meal-plan")
            .then((response) => response.json())
            .then((data) => {
                if (data.mealPlan && Array.isArray(data.mealPlan)) {
                    setMealPlan(data.mealPlan);
                } else {
                    setMealPlan([]); // Default to an empty array to prevent errors
                }
            })
            .catch((error) => {
                console.error("Error fetching meal plan:", error);
                setMealPlan([]); // Fallback in case of an error
            });
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-6">🍽️ Today's Meal Plan</h1>

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {mealPlan.length > 0 ? (
                    mealPlan.map((meal, index) => (
                        <div key={index} className="mb-4 p-4 border-b last:border-none">
                            <h2 className="text-xl font-semibold">{meal.meal}</h2>
                            <p className="text-gray-600">{meal.food}</p>
                            <p className="text-gray-500 text-sm">🔥 Calories: {meal.calories} kcal</p>
                            <p className="text-gray-500 text-sm">
                                🥩 Protein: {meal.protein} | 🍞 Carbs: {meal.carbs} | 🥑 Fat: {meal.fat}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No meal plan available.</p>
                )}
            </div>

            <button className="mt-6 block mx-auto bg-indigo-500 text-white px-4 py-2 rounded-md">
                Edit Plan
            </button>
        </div>
    );
};

export default ViewPlan;
