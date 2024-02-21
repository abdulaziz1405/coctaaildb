import React, { useEffect } from 'react'
import s from './Search-info.module.css'
import { getSearchDrinksInfo } from '../../Redux-Toolkit/CoctailSlice/CoctailSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import List from '../LIst'

const Searchinfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { text } = useParams();
    const { search } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getSearchDrinksInfo(text))
    }, []);

    const handleInfo = (id, title) => {
        navigate(`/coctail/${id}/${title}`)
    }

    return (
        <div className='container'>
            <h1 className='wert'>Browse Cocktails</h1>
            <div className={s.content}>
                {
                    search ? (
                        <List
                            items={search && search}
                            renderItem={(elem) => (
                                <div className={s.drink_content} onClick={() => handleInfo(elem.idDrink, elem.strDrink)}>
                                    <div className={s.images}>
                                        <img src={elem.strDrinkThumb} alt="" />
                                    </div>
                                    <p>{elem.strDrink}</p>
                                </div>
                            )}
                        />
                    ) : (
                        <h2 className={s.text}>No product</h2>
                    )
                }
            </div>
        </div>
    )
}

export default Searchinfo