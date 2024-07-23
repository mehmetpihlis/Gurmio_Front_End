import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getRecipesWithName } from "../httpRequests";
import RecipeCard from "../components/RecipeCard";


const RecipeSearch = () => {
    
    const { recipeName } = useParams();

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipesWithName(recipeName).then((res) => {
            setRecipes(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [recipeName]);

  return (
    <div className='recipe-search'>
      <div className="recipe-search-contain">
        <h1>Sonuçlar</h1>
        <div className="recipe-search-list">
            {
                recipes.map((recipe) => {
                    return (<RecipeCard key={recipe.id} recipe={recipe} />)
                })
            }
        </div>
      </div>
    </div>
  )
}

export default RecipeSearch
