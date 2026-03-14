import React, { useEffect, useState } from "react";
import { useLocation,useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./RecipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Recipe ID from URL:", id);
    axios.get(`https://localhost:44325/api/User/RecipeDetail/${id}`)

      .then((response) => {
         console.log("API Response:", response.data);
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
   
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p><strong>Author:</strong> {recipe.author}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Steps:</strong> {recipe.steps}</p>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
       <button className="back-btn" onClick={() => navigate(-1)}>
  Back
</button>
    </div>
  );
}