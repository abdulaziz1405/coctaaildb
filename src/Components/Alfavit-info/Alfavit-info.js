import React, { useEffect } from 'react'
import s from './Alfavit-info.module.css'
import { UseSelector, useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import List from '../LIst'
import Alfavit from '../Alfavit/Alfavit'
import { getAlfavitCoctail } from '../../Redux-Toolkit/CoctailSlice/CoctailSlice'
const Alfavitinfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { alfavitinfo } = useSelector((state) => state.products)
    const { drinks } = useParams();

    useEffect(() => {
        dispatch(getAlfavitCoctail(drinks))
    }, [drinks])



    const infoClick = (id, title) => {
        navigate(`/coctail/${id}/${title}`)
    }

    return (
        <div className='container'>
            <h2 className='h2h2'>Browse Coctails</h2>
            <div className={s.content}>
            {
                    alfavitinfo ? (
                        <List
                            items={alfavitinfo}
                            renderItem={(elem, i) => (
                                <div className={s.drink_content} key={i} onClick={() => infoClick(elem.idDrink, elem.strDrink) }>
                                    <div className={s.images}>
                                        <img src={elem.strDrinkThumb} alt="" />
                                    </div>
                                    <p>{elem.strDrink}</p>   
                                </div>
                            )}
                        />
                    ) : (
                        <h2 className={s.text}>No drinks Found</h2>
                    )
                }
            </div>
               
                <br />
                <Alfavit />
        </div>
    )
}

export default Alfavitinfo