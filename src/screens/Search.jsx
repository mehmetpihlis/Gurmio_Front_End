import React, { useEffect, useState } from "react";
import { getCategories } from "../httpRequests";
import { IoIosSearch } from "react-icons/io";
import CategoryCard from "../components/CategoryCard";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [inpValue, setInpValue] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="search-page">
      <div className="contain">
        <div className="search-bar">
          <span>
            <IoIosSearch size={22} />
          </span>
          <input 
            type="text" 
            placeholder="Tarif Arayın..." 
            onChange={(e) => setInpValue(e.target.value)}
            value={inpValue}
          />
          <button onClick={() => {
            navigate(`/recipeSearch/${inpValue}`);
          }}>Ara</button>
        </div>
        <div className="categories-container">
          <h2>Tüm Kategoriler</h2>
          <div className="categories">
            {
              categories?.map((category) => {
                return <CategoryCard 
                  key={category.id} 
                  name={category.categoryName} 
                  id={category.id}
                />
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
