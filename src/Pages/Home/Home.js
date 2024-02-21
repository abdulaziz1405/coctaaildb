import React, { useState } from "react";
import s from "./Home.module.css";
import List from "../../Components/LIst/List";
import CoctailItem from "../../Components/Coctail-item/Coctail-item";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popularingredients from "../../Components/Popular-ingredients";
import Alfavit from "../../Components/Alfavit";
import { onDecription } from "../../Redux-Toolkit/CoctailSlice/CoctailSlice";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { popular, popularIngredients, popularDrink, randomIngredient, randomCoctail } =
    useSelector((state) => state.products);

  const handleCoctailinfo = (id, title) => {
    navigate(`/coctail/${id}/${title}`);
  };
  const handleInfo = (title) => {
    navigate(`/ingredient/${title}`);
  };
  const handlePopularMeal = (title, description) => {
    navigate(`/ingredient/${title}`);
    dispatch(onDecription(description));
  }



  const randomItem = [];

  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * randomIngredient.length);
    randomItem.push(randomIngredient[randomIndex]);
  }
  
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  }



  return (
    <section>
      <div className="container">
        <div className={s.home_search} onSubmit={handleSubmit}>
          <form>
            <div>
              <input type="text" name="" id=""  value={input} onChange={(e) => setInput(e.target.value)}  />
            </div>
            <div>
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>

        <div className={s.drink_item}>
          <h3>Popular Drinks</h3>
          <div className={s.drink_item_content}>
            <List
              items={popular && popular}
              renderItem={(elem, i) => (
                <CoctailItem
                  key={i}
                  onClick={() => handleCoctailinfo(elem.idDrink, elem.strDrink)}
                  {...elem}
                />
              )}
            />
          </div>
        </div>
        <div className={s.popular}>
          <h3>Popular Ingredients</h3>
          <div className={s.popular_ingredients}>
            <List
              items={popularIngredients && popularIngredients}
              renderItem={(elem, i) => {
                if (i < 4) {
                  return <Popularingredients
                    key={i} {...elem}
                    onClick={() => handlePopularMeal(elem.strIngredient1)}
                  />;
                }
              }}
            />
          </div>
        </div>
        <div className={s.drink_item}>
          <h3>Latest Drinks</h3>
          <div className={s.drink_item_content}>
            <List
              items={popularDrink && popularDrink}
              renderItem={(elem, i) => (
                <CoctailItem
                  key={i}
                  {...elem}
                  onClick={() => handleCoctailinfo(elem.idDrink, elem.strDrink)}
                />
              )}
            />
          </div>
        </div>
        <div className={s.random_ingredients_title}>
          <h3>Random Ingredients</h3>
          <div className={s.random_ingredient}>
            <List
              items={randomItem && randomItem}
              renderItem={(elem, i) => (
                <Popularingredients
                  key={i}
                  {...elem}
                  onClick={() => handleInfo(elem.strIngredient1,elem.strDescription)}
                />
              )}

            />
          </div>
        </div>

        <div className={s.random_coctails}>
          <div className={s.random_content}>
            <h3>Random Coctails</h3>
            <div className={s.random_images}>
              <List
                items={randomCoctail && randomCoctail}
                renderItem={(elem) => (
                  <CoctailItem
                    onClick={() => handleCoctailinfo(elem.idDrink, elem.strCategory)}
                    {...elem}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className={s.alfavit}>
          <h3>Browse By Name</h3>
          <div className={s.alfavit_content}>
            <Alfavit />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
