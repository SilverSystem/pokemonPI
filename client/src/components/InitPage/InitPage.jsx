import React from 'react';
import s from './InitPage.module.css'
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { getTypes } from '../../redux/actions';

export default function InitPage(){
    const dispatch = useDispatch();
    const handleClick = () => dispatch(getTypes());
    return (
        <div className={s.intro}>
            <button className={s.pushable_btn}>
                <span className={s.shadow_btn}></span>
                <span className={s.edge_btn}></span>
                <Link to='/home' onClick={handleClick} className={s.front_btn}>Ingresa a la Pokedex</Link> 
            </button>   
        </div>
    )
};