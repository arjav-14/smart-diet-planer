
import { useEffect, useState } from "react";

const ViewPlan = () => {
    const [mealPlans, setMealPlans] = useState([]);
    const [editingPlanId, setEditingPlanId] = useState(null);
    const [updatedText, setUpdatedText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // ✅ Get the token from localStorage
    const token = localStorage.getItem("token");
    console.log("🔑 Retrieved token from localStorage:", token);

    useEffect(() => {
        if (!token) {
            console.warn("⚠️ No token found. Redirecting to login.");
            setError("User not authenticated. Please log in.");
            setLoading(false);
            return;
        }

        const fetchMealPlans = async () => {
            try {
                console.log("📡 Fetching meal plans from server...");
                const response = await fetch(`http://localhost:3000/api/my-meal-plans`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                console.log("📩 Server Response Status:", response.status);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch meal plans: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("✅ Meal plans received:", data);
                setMealPlans(data);
            } catch (err) {
                console.error("❌ Error fetching meal plans:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMealPlans();
    }, [token]);

    const deleteMealPlan = async (id) => {
        try {
            console.log("🗑 Deleting meal plan with ID:", id);
            const response = await fetch(`http://localhost:3000/api/delete-meal-plan/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete meal plan: ${response.statusText}`);
            }

            console.log("✅ Meal plan deleted successfully");
            setMealPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== id));
        } catch (error) {
            console.error("❌ Error deleting meal plan:", error);
            alert("Failed to delete meal plan.");
        }
    };

    const startEditing = (plan) => {
        console.log("✏️ Editing meal plan:", plan._id);
        setEditingPlanId(plan._id);
        setUpdatedText(plan.mealPlan);
    };

    const updateMealPlan = async (id) => {
        if (!updatedText.trim()) {
            alert("Meal plan cannot be empty.");
            return;
        }

        try {
            console.log("🔄 Updating meal plan with ID:", id);
            const response = await fetch(`http://localhost:3000/api/update-meal-plan/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ updatedMealPlan: updatedText }),
            });

            console.log("📩 Server Response Status:", response.status);
            
            if (!response.ok) {
                throw new Error(`Failed to update meal plan: ${response.statusText}`);
            }

            const updatedPlan = await response.json();
            console.log("✅ Meal plan updated:", updatedPlan);

            setMealPlans((prevPlans) =>
                prevPlans.map((plan) => (plan._id === id ? updatedPlan : plan))
            );
            setEditingPlanId(null);
        } catch (error) {
            console.error("❌ Error updating meal plan:", error);
            alert("Failed to update meal plan.");
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading meal plans...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-6">My Meal Plans</h1>

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {mealPlans.length > 0 ? (
                    mealPlans.map((plan) => (
                        <div key={plan._id} className="mb-4 p-4 border-b last:border-none flex justify-between items-center">
                            {editingPlanId === plan._id ? (
                                <div className="flex flex-col gap-2 w-full">
                                    <input
                                        type="text"
                                        value={updatedText}
                                        onChange={(e) => setUpdatedText(e.target.value)}
                                        className="border p-2 rounded w-full"
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={() => updateMealPlan(plan._id)} className="bg-blue-500 text-white px-3 py-1 rounded">✅ Save</button>
                                        <button onClick={() => setEditingPlanId(null)} className="bg-gray-500 text-white px-3 py-1 rounded">❌ Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-xl font-semibold">{plan.mealPlan}</h2>
                                    <div className="flex gap-2">
                                        <button onClick={() => startEditing(plan)} className="bg-yellow-500 text-white px-3 py-1 rounded">✏️ Edit</button>
                                        <button onClick={() => deleteMealPlan(plan._id)} className="bg-red-500 text-white px-3 py-1 rounded">🗑 Delete</button>
                                    </div>
                                </>
                            )}
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
