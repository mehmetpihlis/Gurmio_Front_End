import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getRecipesCountWithCategory } from "../httpRequests";
import { FaArrowRight } from "react-icons/fa";

const CategoryCard = ({name, id}) => {

  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getRecipesCountWithCategory(id).then((res) => {
      setCount(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [id]);

  return (
    <div className='category-card' onClick={() => navigate(`/categoryRecipes/${id}`)} >
      <div className='category-card-info'>
       <h4>{name}</h4>
       <span>{count} tarif</span>
      </div>
      <div>
        <span>
          <FaArrowRight size={22} />
        </span>
      </div>
    </div>
  )
}

export default CategoryCard
