import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategories,
  getCuisines,
  getRecipe,
  updateRecipe
} from "../httpRequests";
import FileBase64 from 'react-file-base64';

const UpdateRecipe = () => {

  const navigate = useNavigate();

  const {recipeId} = useParams();

  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [recipe, setRecipe] = useState({});

  const [recipeName, setRecipeName] = useState(recipe?.recipeName);
  const [recipeDescription, setRecipeDescription] = useState(recipe?.description);
  const [recipeCategory, setRecipeCategory] = useState(recipe?.categoryId);
  const [recipeCuisine, setRecipeCuisine] = useState(recipe?.cuisineId);
  const [ingredients, setIngredients] = useState(recipe?.ingredients);
  const [instructions, setInstructions] = useState(recipe?.instructions);
  const [servings, setServings] = useState(recipe?.servings);
  const [totalTime, setTotalTime] = useState(recipe?.totalTime);
  const [image, setImage] = useState(recipe?.image);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    }).catch((err) => {
        console.log("Verii Çekildi!")
      console.log(err);
    });

    getCuisines().then((res) => {
      setCuisines(res.data);
    }).catch((err) => {
      console.log(err);
    });

    getRecipe(recipeId).then((res) => {
        setRecipe(res.data);
    }).catch((err) => {
        console.log(err);
    });
  }, [recipeId]);

  useEffect(() => {
    console.log("useEffect nasıl çalışır?");
    setRecipeName(recipe?.recipeName);
        setRecipeDescription(recipe?.description);
        setRecipeCategory(recipe?.categoryId);
        setRecipeCuisine(recipe?.cuisineId);
        setIngredients(recipe?.ingredients);
        setInstructions(recipe?.instructions);
        setServings(recipe?.servings);
        setTotalTime(recipe?.totalTime);
  }, [recipe]);


  const handleImage = (file) => {
    setImage(file.base64);
  };

  return (
    <div id='update-recipe' className='create-recipe'>
      <div className="create-recipe-contain">
        <h2>Tarifinizi Güncelleyin!</h2>
        <div className="create-recipe-form">
          <div>
            <label htmlFor="recipe-name">Tarif Adı</label>
            <input 
              type="text" 
              id='recipe-name'
              onChange={(e) => setRecipeName(e.target.value)}
              value={recipeName}
            />
          </div>
          <div>
            <label htmlFor="recipe-description">Tarifin Hikayesi</label>
            <textarea 
              name="recipe-description" 
              id="recipe-description"
              rows={5}
              onChange={(e) => setRecipeDescription(e.target.value)}
              value={recipeDescription}
            ></textarea>
          </div>
          <div>
            <label htmlFor="recipe-category">Tarifin Kategorisi</label>
            <select 
              name="recipe-category" 
              id="recipe-category" 
              onChange={(e) => setRecipeCategory(parseInt(e.target.value))} 
              value={recipeCategory}>
              {
                categories.map((category) => {
                  return (<option key={category.id} value={category.id}>{category.categoryName}</option>)
                })
              }
            </select>
          </div>
          <div>
            <label htmlFor="recipe-cuisine">Tarifin Ait Olduğu Mutfak</label>
            <select 
              name="recipe-cuisine" 
              id="recipe-cuisine"
              onChange={(e) => setRecipeCuisine(parseInt(e.target.value))}
              value={recipeCuisine}
            >
                {
                  cuisines.map((cuisine) => {
                    return (<option key={cuisine.id} value={cuisine.id} >{cuisine.cuisineName}</option>)
                  })
                }
            </select>
          </div>
          <div>
            <label htmlFor="recipe-ingredients">Tarif Malzemeleri</label>
            <textarea 
              name="recipe-ingredients" 
              id="recipe-ingredients"
              rows={5}
              placeholder='Malzemeleri buraya alt alta yazın'
              onChange={(e) => setIngredients(e.target.value.split("\n").join("-"))}
              value={ingredients}
            ></textarea>
          </div>

          <div>
                <label htmlFor="recipe-instructions">Yapılış Aşamaları</label>
                <textarea 
                  name="recipe-instructions" 
                  id="recipe-instructions"
                  rows={5}
                  placeholder='Yapılış aşamalarını buraya alt alta yazın'
                  onChange={(e) => setInstructions(e.target.value.split("\n").join("-"))}
                  value={instructions}
                ></textarea>
          </div> 

          <div>
            <label htmlFor="recipe-servings">Tarif Kaç Kişilik</label>
            <input 
              type="number" 
              id='recipe-servings' 
              onChange={(e) => setServings(parseInt(e.target.value))}
              value={servings}
            />
          </div>
          <div>
            <label htmlFor="recipe-totalTime">Hazırlanış Süresi</label>
            <span>*Dakika cinsinden yazınız</span>
            <input 
              type="number" 
              id='recipe-totalTime' 
              onChange={(e) => setTotalTime(parseInt(e.target.value))}
              value={totalTime}
            />
          </div>
          <div>
            <label htmlFor="recipe-image">Yemeğin Görseli</label>
            <FileBase64 
              multiple={false}
              onDone={handleImage}
            />
          </div>
          <button onClick={() => {
            updateRecipe(recipeId, {
              recipeName,
              description: recipeDescription,
              ingredients,
              instructions,
              image,
              totalTime,
              servings,
              categoryId: recipeCategory,
              cuisineId: recipeCuisine,
              userId: JSON.parse(localStorage.getItem("userAccess"))?.user?.id
            }).then((res) => {
              alert("Tarif Başarılı Bir Şekilde Güncellendi!");
              navigate("/");
              console.log(res);
            }).catch((err) => {
              alert("Tarif Güncellenirken Bir Problem İle Karşılaşıldı Lütfen Tekrar Deneyin!");
              console.log(err);
            });
          }} >Tarifi Güncelle</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateRecipe
