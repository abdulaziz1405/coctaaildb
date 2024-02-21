import React from 'react'
import s from "./Drink-item.module.css"

const  Drinkitem =() => {
    const { strDrink, strDrinkThumb, onClick } = props;
    return (
      <div onClick={onClick} className={s.coctail_content}>
        <div className={s.coctail_img}>
          <img src={strDrinkThumb} alt="" />
        </div>
        <p>{strDrink}</p>
      </div>
    );
  };

export default Drinkitem
