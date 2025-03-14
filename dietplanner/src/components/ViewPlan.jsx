// // import React from "react";

// // const ViewPlan = () => {
// //   const mealPlan = [
// //     {
// //       meal: "Breakfast",
// //       food: "Oatmeal with fruits",
// //       calories: 300,
// //       protein: "10g",
// //       carbs: "45g",
// //       fat: "5g",
// //     },
// //     {
// //       meal: "Lunch",
// //       food: "Grilled chicken with quinoa",
// //       calories: 500,
// //       protein: "35g",
// //       carbs: "50g",
// //       fat: "10g",
// //     },
// //     {
// //       meal: "Dinner",
// //       food: "Salmon with vegetables",
// //       calories: 400,
// //       protein: "30g",
// //       carbs: "30g",
// //       fat: "12g",
// //     },
// //   ];

// //   return (
// //     <div className="bg-gray-100 min-h-screen p-6">
// //       <h1 className="text-3xl font-bold text-center mb-6">Today's Meal Plan</h1>
      
// //       <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
// //         {mealPlan.map((meal, index) => (
// //           <div key={index} className="mb-4 p-4 border-b last:border-none">
// //             <h2 className="text-xl font-semibold">{meal.meal}</h2>
// //             <p className="text-gray-600">{meal.food}</p>
// //             <p className="text-gray-500 text-sm">Calories: {meal.calories} kcal</p>
// //             <p className="text-gray-500 text-sm">
// //               Protein: {meal.protein} | Carbs: {meal.carbs} | Fat: {meal.fat}
// //             </p>
// //           </div>
// //         ))}
// //       </div>
      
// //       <button className="mt-6 block mx-auto bg-indigo-500 text-white px-4 py-2 rounded-md">
// //         Edit Plan
// //       </button>
// //     </div>
// //   );
// // };

// // export default ViewPlan;

// import { useEffect, useState } from "react";

// const ViewPlan = () => {
//     const [mealPlan, setMealPlan] = useState("");

//     useEffect(() => {
//         fetch("http://localhost:3000/api/latest-meal-plan")
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.mealPlan) {
//                     setMealPlan(data.mealPlan);
//                 } else {
//                     setMealPlan("No meal plan available.");
//                 }
//             })
//             .catch((error) => console.error("Error fetching meal plan:", error));
//     }, []);

//     return (
//         <div>
//             <h2>Today's Meal Plan</h2>
//             <p>{mealPlan}</p>
//         </div>
//     );
// };

// export default ViewPlan;

import { useEffect, useState } from "react";

const ViewPlan = () => {
    const [mealPlans, setMealPlans] = useState([]); // Store all meal plans
    const [editingPlanId, setEditingPlanId] = useState(null); // Track which plan is being edited
    const [updatedText, setUpdatedText] = useState(""); // Store updated text

    useEffect(() => {
        fetch("http://localhost:3000/api/all-meal-plans") // Fetch all meal plans
            .then((response) => response.json())
            .then((data) => setMealPlans(data))
            .catch((error) => console.error("Error fetching meal plans:", error));
    }, []);

    // Function to delete a meal plan
    const deleteMealPlan = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/delete-meal-plan/${id}`, {
                method: "DELETE",
            });

            // Update state to reflect the deleted plan
            setMealPlans(mealPlans.filter((plan) => plan._id !== id));
        } catch (error) {
            console.error("Error deleting meal plan:", error);
        }
    };

    // Function to enable editing mode
    const startEditing = (plan) => {
        setEditingPlanId(plan._id);
        setUpdatedText(plan.mealPlan);
    };

    // Function to update a meal plan
    const updateMealPlan = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/update-meal-plan/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mealPlan: updatedText }),
            });

            const updatedPlan = await response.json();

            // Update state with the modified plan
            setMealPlans(mealPlans.map((plan) => (plan._id === id ? updatedPlan : plan)));

            setEditingPlanId(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating meal plan:", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Meal Plans</h1>

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {mealPlans.length > 0 ? (
                    mealPlans.map((plan) => (
                        <div key={plan._id} className="mb-4 p-4 border-b last:border-none flex justify-between items-center">
                            {editingPlanId === plan._id ? (
                                // If in edit mode, show an input field
                                <input
                                    type="text"
                                    className="border p-2 w-full"
                                    value={updatedText}
                                    onChange={(e) => setUpdatedText(e.target.value)}
                                />
                            ) : (
                                <div>
                                    <h2 className="text-xl font-semibold">{plan.mealPlan}</h2>
                                    <small className="text-gray-500">
                                        Generated on: {new Date(plan.timestamp).toLocaleString()}
                                    </small>
                                </div>
                            )}

                            <div className="flex gap-2">
                                {editingPlanId === plan._id ? (
                                    <button
                                        onClick={() => updateMealPlan(plan._id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        ✅ Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => startEditing(plan)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
                                    >
                                        ✏️ Edit
                                    </button>
                                )}

                                <button
                                    onClick={() => deleteMealPlan(plan._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    ❌ Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No meal plans available.</p>
                )}
            </div>
        </div>
    );
};

export default ViewPlan;
