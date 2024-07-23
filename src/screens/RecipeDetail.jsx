import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCategory,
  getRecipe,
  getCuisine,
  deleteRecipe
} from "../httpRequests";
import { IoIosTimer } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaTrash, FaEdit } from "react-icons/fa";

const RecipeDetail = () => {
  const [detailRecipe, setDetailRecipe] = useState({});

  // Relational Dataset
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");

  // Split Proccess (-)
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getRecipe(id)
      .then((res) => {
        setDetailRecipe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    setIngredients(detailRecipe?.ingredients?.split("-"));
    setInstructions(detailRecipe?.instructions?.split("-"));

    // Get Category
    getCategory(detailRecipe.categoryId)
      .then((res) => {
        setCategory(res.data?.categoryName);
      })
      .catch((err) => {
        console.log(err);
      });

    // Get Cuisine
    getCuisine(detailRecipe.cuisineId)
      .then((res) => {
        setCuisine(res.data?.cuisineName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [detailRecipe]);

  return (
    <div className="recipe-detail">
      <div className="recipe-detail-contain">
        <div className="recipe-detail-title">
          <h1>{detailRecipe?.recipeName}</h1>
          <p>{category}</p>
        </div>
        <div
          className="recipe-detail-image"
          style={{ backgroundImage: `url(${detailRecipe?.image})` }}
        >
          {/* Background ile image verildi */}
        </div>
        <div className="recipe-detail-description">
          {detailRecipe?.description}
        </div>
        <div className="recipe-detail-extra">
          <div className="recipe-detail-info">
            <p>
              <IoIosTimer size={35} /> Hazırlanma Süresi:&nbsp;
              <span>{detailRecipe?.totalTime} Dakika</span>
            </p>
            <p>
              <IoPersonOutline size={35} />
              Kaç Kişilik:&nbsp;<span>{detailRecipe?.servings} Kişilik</span>
            </p>
            <p>
              <IoLocationOutline size={35} />
              Hangi Mutfak:&nbsp;<span>{cuisine}</span>
            </p>
          </div>
        </div>
        <div className="recipe-detail-ingredients">
          <h1>Malzemeler</h1>
          <ul>
            {ingredients?.map((item, index) => {
              return (
                <li key={index}>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="recipe-detail-instructions">
          <h1>Yapılış Aşamaları</h1>
          <ol>
            {instructions?.map((item, index) => {
              return (
                <li key={index}>
                  <span>{item}</span>
                </li>
              );
            })}
          </ol>
        </div>
        {detailRecipe?.userId ===
        JSON.parse(localStorage.getItem("userAccess"))?.user?.id ? (
          <div className="recipe-detail-proccess">
            <button
              className="deleteBtn"
              onClick={() => {
                if (window.confirm("Tarifinizi silmek istediğinize emin misiniz?")) {
                  deleteRecipe(detailRecipe.id).then((res) => {
                    console.log("Tarif Başarılı Bir Şekilde Silindi!");
                    alert("Tarif Başarılı Bir Şekilde Silindi!");
                    navigate("/");
                  }).catch((err) => {
                    console.log(err);
                  });
                } else {
                  console.log("Kullanıcı Tarifini Silmekten Vazgeçti");
                }
              }}
            >
            <FaTrash size={20} />&nbsp;Sil
            </button>
            <button className="updateBtn" onClick={() => navigate(`/recipeUpdate/${detailRecipe.id}`)}><FaEdit size={20} />&nbsp;Güncelle</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
