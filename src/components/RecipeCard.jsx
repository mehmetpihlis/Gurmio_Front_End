import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../httpRequests";

const RecipeCard = ({ recipe }) => {
  const [user, setUser] = useState({});
  const { id, recipeName, description, image, userId } = recipe;
  const navigate = useNavigate();

  useEffect(() => {
    getUser(userId)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div
      className="recipe-card"
      onClick={() => {
        navigate(`/recipeDetail/${id}`);
      }}
    >
      <div className="recipe-img" style={{ backgroundImage: `url(${image})` }}>
        {/* Background Olarak Verildi */}
      </div>
      <div className="recipe-info">
        <h3>{recipeName}</h3>
        <p>{description}</p>
      </div>
      <div className="recipe-author">
        <div className="authorImage" style={{ backgroundImage: `url(${user?.profileImage})` }}></div>
        <p>
          {user?.firstName} {user?.lastName}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
