import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Card from "./Card";
import "./RecipeProfile.css";
import { useNavigate } from "react-router-dom";



function RecipeProfile() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
 

  useEffect(() => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser || !loggedInUser.userId) {
    setErrorMessage("Please log in first!");
    return;
  }

axios.get(`https://localhost:44325/api/User/RecipeProfile/${loggedInUser.userId}`)

    .then((response) => {
      const recipeArray = response.data.data || [];
      // Filter only logged-in user's recipes
      const userRecipes = recipeArray.filter(
        (recipe) => recipe.author === loggedInUser.userId
      );
      setRecipes(userRecipes);
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      setErrorMessage("Failed to load your recipes.");
    });
}, []);

const handleViewMore = (id) => {
  navigate(`/recipe/${id}`);

};

const handleEdit = (id) => {
  navigate(`/add-recipe/${id}`);
};

const handleSaveEdit = (id) => {
  axios
    .put(`https://localhost:44325/api/User/EditRecipe/${id}`, editedData)
    .then(() => {
      alert("Recipe updated successfully!");
      setEditingRecipe(null);
      setRecipes((prev) =>
        prev.map((r) => (r.recipeId === id ? { ...r, ...editedData } : r))
      );
    })
    .catch((err) => {
      console.error("Error updating recipe:", err);
      alert("Failed to update recipe.");
    });
};

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this recipe?")) {
    axios
      .delete(`https://localhost:44325/api/User/DeleteRecipe/${id}`)
      .then(() => {
        alert("Recipe deleted successfully!");
        setRecipes((prev) => prev.filter((r) => r.recipeId !== id));
      })
      .catch((err) => {
        console.error("Error deleting recipe:", err);
        alert("Failed to delete recipe.");
      });
  }
};


  return (
    <div>
      <Navbar />
      <div className="recipe-profile-container">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="card-wrapper">
              <Card
  title={recipe.title}
  image={recipe.image}
  author={recipe.author}
  recipeId={recipe.recipeId}
  onEdit={(id) => handleEdit(id)}
  onDelete={(id) => handleDelete(id)}
  onViewMore={(id) => handleViewMore(id)}
/>

            </div>
          ))
        ) : (
          <p>No recipes found for this user.</p>
        )}
      </div>
    </div>
  );
}

export default RecipeProfile;
