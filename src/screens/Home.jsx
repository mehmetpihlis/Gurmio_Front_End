import React, { useState, useEffect } from 'react'
import { getCurrentRecipes } from "../httpRequests";
import RecipeCard from '../components/RecipeCard';

const Home = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getCurrentRecipes().then((res) => {
      setRecipes(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className='home'>
      <h2>En Güncel Tarifler</h2>
      <div className="home-contain">
        {
          recipes.map((recipe) => {
            return (
              <RecipeCard key={recipe.id} recipe={recipe} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
