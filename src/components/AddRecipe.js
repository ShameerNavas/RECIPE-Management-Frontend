import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./AddRecipe.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AddRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    cookingTime: "",
    difficultyLevel: "",
    image: ""
  });

  const navigate = useNavigate();
  const { id } = useParams(); // If ID exists → edit mode
  const user = JSON.parse(localStorage.getItem("loggedInUser")); // logged-in user

 useEffect(() => {
  if (id) {
    // Editing mode → get existing recipe
    axios
      .get(`https://localhost:44325/api/User/RecipeDetail/${id}`)
      .then((res) => {
        if (res.data) {
          setFormData({
            title: res.data.title || "",
            ingredients: res.data.ingredients || "",
            steps: res.data.steps || "",
            cookingTime: res.data.cookingTime || "",
            difficultyLevel: res.data.difficultyLevel || "",
            image: res.data.image || ""
          });
        }
      })
      .catch((err) => {
        console.error("Error loading recipe:", err);
        alert("Failed to load recipe for editing.");
      });
  } else {
    // Adding mode → make sure form is empty
    setFormData({
      title: "",
      ingredients: "",
      steps: "",
      cookingTime: "",
      difficultyLevel: "",
      image: ""
    });
  }
}, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

if (!id && (!user || !user.userId)) {
  alert("Please login first.");
  return;
}

    const recipeData = {
      title: formData.title,
      ingredients: formData.ingredients,
      steps: formData.steps,
      cookingTime: formData.cookingTime,
      difficultyLevel: formData.difficultyLevel,
      image: formData.image,
      author: user?user.userId:null
    };

    try {
      if (id) {
        // Edit existing recipe
        await axios.put(
          `https://localhost:44325/api/User/EditRecipe/${id}`,
          recipeData
        );
        alert("Recipe updated successfully!");
      } else {
        // Add new recipe
        await axios.post(
          "https://localhost:44325/api/User/add-recipe",
          recipeData
        );
        alert("Recipe added successfully!");
      }

      navigate("/feed"); // redirect after success
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Failed to save recipe. Please check console for details.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-recipe-page">
        <div className="add-recipe-card">
          <h2>{id ? "Edit Recipe" : "Add Recipe"}</h2>
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />

            <label>Ingredients:</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              required
            />

            <label>Steps:</label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              required
            />

            <label>Cooking Time:</label>
            <input
              type="text"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              placeholder="e.g. 45 minutes"
              required
            />

            <label>Difficulty Level:</label>
            <select
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button type="submit" className="submit-btn">
  {id ? "Save Changes" : "Add Recipe"}
</button>


            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/recipe-profile")}
            >
              Go Back
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddRecipe;

