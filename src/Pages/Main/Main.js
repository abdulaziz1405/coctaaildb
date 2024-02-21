import React, { useEffect } from 'react'
import Home from '../Home';
import { Route, Routes } from "react-router-dom";
import { getPopularDrink, getPopularIngredients, getPopularDrinks, getRandomCoctail,getSearchDrinks } from '../../Redux-Toolkit/CoctailSlice/CoctailSlice';
import { useDispatch } from 'react-redux';
import Infoingredient from '../../Components/info-ingredient';
import PopularinfoIngredients from '../../Components/Popular_infoIngredients';
import Alfavitinfo from '../../Components/Alfavit-info';
import Searchinfo from '../../Components/Search-info';


const Main = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPopularDrink())
        dispatch(getPopularIngredients());
        dispatch(getPopularDrinks());
        dispatch(getRandomCoctail());
    }, [])

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/coctail/:idDrink/:title" element={<Infoingredient />} />
                <Route path="/ingredient/:title" element={<PopularinfoIngredients />} />
                <Route path='/alfavit/:drinks' element={<Alfavitinfo />}/>
                <Route path="/search/:text" element={<Searchinfo />}/>
            </Routes>
        </div>
    )
}

export default Main
