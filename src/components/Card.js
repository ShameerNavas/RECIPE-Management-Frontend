import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Card.css";

export default function Card({ title, image, author, recipeId, onEdit, onDelete, onViewMore }) {
  console.log("data from feed", title, recipeId);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("card data", title, image);
  console.log(recipeId);

  const handleViewMore = () => {
    navigate(`/recipe/${recipeId}`); // route to RecipeDetail.js
  };

  return (
    <div className="card">
      <h3>{title}</h3>
<img src={image} alt={title} />

      <div className="card-buttons">
        {location.pathname === "/recipe-profile" && (
          <>
            <button className="edit-btn" onClick={() => navigate(`/add-recipe/${recipeId}`)}>
  Edit
</button>

            <button className="delete-btn" onClick={() => onDelete(recipeId)}>Delete</button>
          </>
        )}
        <button onClick={() => onViewMore && onViewMore(recipeId)}>View More</button>

      </div>
    </div>
  );
}
