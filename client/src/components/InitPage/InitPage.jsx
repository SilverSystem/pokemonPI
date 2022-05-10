import React from 'react';
import s from './InitPage.module.css'
import { Link } from 'react-router-dom';

export default function InitPage(){
    return (
        <div className={s.intro}>
            <button className={s.pushable_btn}>
                <span className={s.shadow_btn}></span>
                <span className={s.edge_btn}></span>
                <Link to='/home'  className={s.front_btn}>Enter to the Pokedex</Link> 
            </button>   
        </div>
    )
};