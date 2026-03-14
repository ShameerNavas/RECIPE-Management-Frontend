import Card from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Feed.css";
import { useNavigate } from "react-router-dom";


function Feed() {
  var [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
  var [errorMessage, setErrorMessage] = useState("");

  function fetchRecipes() {
    axios
      .get("https://localhost:44325/api/User/Feed")
      .then((response) => {
        console.log("Response data:", response.data);

        // ✅ Get array from 'data' field
        const recipeArray = response.data.data || [];
        setRecipes(recipeArray);
        setFilteredRecipes(recipeArray);

        setErrorMessage("");
        console.log("Recipes state:", recipeArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Data not found or failed to fetch from server.");
      });
  }
 
  useEffect(() => {
    fetchRecipes();
  }, []);

   // ✅ Function to handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredRecipes(recipes);
      return;
    }

    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (recipe.ingredients &&
          recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (recipe.authorName &&
          recipe.authorName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredRecipes(filtered);
  };
  const navigate = useNavigate();

  
return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="feed-container">
        {errorMessage ? (
  <p>{errorMessage}</p>
) : filteredRecipes.length > 0 ? (
  filteredRecipes.map((recipe, index) => {
    console.log("Recipe from Feed:", recipe);
    return (
      <Card
        key={index}
        title={recipe.title}
        image={recipe.image}
        author={recipe.authorName}
        recipeId={recipe.recipeId}
        onViewMore={() => navigate(`/recipe/${recipe.recipeId
}`)} 
      />
    );
  })
) : (
  <p>No recipes found.</p>
)}

      </div>
    </div>
  );
}

export default Feed;
