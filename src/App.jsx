import "./styles/css/style.css";
import Navbar from "./components/Navbar";
import CreateRecipe from "./screens/CreateRecipe";
import Home from "./screens/Home";
import { Routes, Route } from "react-router-dom";
import Search from "./screens/Search";
import RecipeDetail from "./screens/RecipeDetail";
import myContext from "./context/context";
import { useState } from "react";
import CategoryRecipes from "./screens/CategoryRecipes";
import RecipeSearch from "./screens/RecipeSearch";
import Sign from "./screens/Sign";
import UpdateRecipe from "./screens/UpdateRecipe";

function App() {
  const [detailRecipe, setDetailRecipe] = useState({});


  return (
    <div className="App">
      <myContext.Provider
        value={{
          detailRecipe: detailRecipe,
          setDetailRecipe: setDetailRecipe,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createRecipe" element={<CreateRecipe />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipeDetail/:id" element={<RecipeDetail />} />
          <Route path="/categoryRecipes/:categoryId" element={<CategoryRecipes />} />
          <Route path="/recipeSearch/:recipeName" element={<RecipeSearch />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/recipeUpdate/:recipeId" element={<UpdateRecipe />} />
        </Routes>
      </myContext.Provider>
    </div>
  );
}

export default App;
