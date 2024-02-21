import React, { useEffect } from 'react'
import s from "./Popular-infoIngredients.module.css"
import { useDispatch,useSelector } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import  List from  "../LIst"
import { getPopulInfo } from '../../Redux-Toolkit/CoctailSlice/CoctailSlice'
import { onDecription } from '../../Redux-Toolkit/CoctailSlice/CoctailSlice'

const PopularinfoIngredients = () => {
    const dispatch = useDispatch();
    const {title} = useParams();
    const { popularInfo, text } =useSelector((state) => state.products);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPopulInfo(title))
        dispatch(onDecription())
    },[])

   const InfoClick =(id,title) => {
    navigate(`/coctail/${id}/${title}`)
   }

    return (
        <div className='container'>
        <div className={s.content}>
            <div className={s.title}>
                <h2>{title}</h2>
                <div className={s.content_title}>
                    <img src={`https://www.thecocktaildb.com/images//ingredients/${title}.png`} alt="" />
                </div>
            </div>
            <div  className={s.images_title}>
                <h2>Coctails</h2>
                <div className={s.images}>
                <List items={popularInfo} renderItem={(elem, i) => (
    <div onClick={() => InfoClick(elem.idDrink, elem.strDrink)} className={s.images_item}>
        <div className={s.item}>
            <img src={elem.strDrinkThumb} alt={elem.strDrink} />
        </div>
        <p>{elem.strDrink}</p>
    </div>
)} />
                </div>
            </div>
        </div>
        <div className={s.description}>
            <h2>Description</h2>
            <p className={s.text}>{text}</p>
        </div>
    </div>
    )
}

export default PopularinfoIngredients
