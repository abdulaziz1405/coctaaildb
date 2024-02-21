import React from 'react'
import s from "./Popular-ingredients.module.css"

const Popularingredients =(props)=> {
    const {strIngredient1, onClick} = props;
    return (
        <div onClick={onClick} className={s.content_item}>
            <img src={`https://www.thecocktaildb.com/images/ingredients/${strIngredient1}.png`} alt="" />
            <p>{strIngredient1}</p>
        </div>
    )
}

export default Popularingredients
