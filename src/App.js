import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import RecipeProfile from "./components/RecipeProfile";
import AddRecipe from "./components/AddRecipe";
import UserProfile from "./components/UserProfile";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/recipe-profile" element={<RecipeProfile />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/add-recipe/:id" element={<AddRecipe />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );


}

export default App;
