import React from 'react';
import s from './Pokemon.module.css';
import { Link } from 'react-router-dom';


export default function Pokemon({id,img,name,types,attack,quantity= 0}){
    
    return  quantity ? (
        <Link to={`/pokemons/${name}`} className={s.link}>
            <div className={s.pokemon}>
                <img src={img} alt={name} className={s.pokemon_img}/>
                <div className={s.pokemon_details}>
                    <h3>Name: {name.charAt(0).toUpperCase() +name.slice(1)}</h3>
                    <p className={s.pokemon_id}>Pokemon Number: {id}</p>
                    <p className={s.pokemon_types}>Types: {types.join(', ')}</p>
                    <p className={s.pokemon_atck}>Attack: {attack}</p>
                </div>
            </div>
        </Link>
    ) : <Link to={`/pokemons/${id}`} className={s.link}>
            <div className={s.pokemon}>
                <img src={img} alt={name} className={s.pokemon_img}/>
                <div className={s.pokemon_details}>
                    <h3>Name: {name.charAt(0).toUpperCase() +name.slice(1)}</h3>
                    <p className={s.pokemon_id}>Pokemon Number: {id}</p>
                    <p className={s.pokemon_types}>Types: {types.join(', ')}</p>
                    <p className={s.pokemon_atck}>Attack: {attack}</p>
                </div>
            </div>
        </Link>
};