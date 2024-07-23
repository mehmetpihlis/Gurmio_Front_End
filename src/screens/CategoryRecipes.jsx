import React, { useState, useEffect } from 'react';
import { getRecipesWithCategory, getCategory } from "../httpRequests";
import { useParams } from "react-router-dom";
import RecipeCard from '../components/RecipeCard';

const CategoryRecipes = () => {

    const { categoryId } = useParams();

    const [categoryName, setCategoryName] = useState("");
    const [recipes,setRecipes] = useState([]);

    useEffect(() => {
      getCategory(categoryId).then((res) => {
        setCategoryName(res.data.categoryName);
      }).catch((err) => {
        console.log(err);
      });

      getRecipesWithCategory(categoryId).then((res) => {
        setRecipes(res.data);
      }).catch((err) =>{
        console.log(err);
      });
    }, [categoryId]);

  return (
    <div className='category-recipes'>
        <div className="category-recipes-contain">
          <h1>{categoryName}</h1>
          <div className="category-recipes-list">
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

export default CategoryRecipes
