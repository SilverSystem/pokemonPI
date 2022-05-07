import React from 'react';
import s from './Pokemon.module.css';
import { Link } from 'react-router-dom';


export default function Pokemon({id,img,name,types,attack,quantity= 0}){
    return (
        <div className={s.pokemon}>
            <img src={img} alt={name} className={s.pokemon_img}/>
            <div className={s.pokemon_details}>
                {quantity ? <h3><Link to={`/pokemons/${name}`}> Nombre: {name.charAt(0).toUpperCase() +name.slice(1)}</Link></h3> : 
                <h3><Link to={`/pokemons/${id}`}>Nombre: {name.charAt(0).toUpperCase() +name.slice(1)}</Link></h3>
                }
                <p className={s.pokemon_id}>Número de Pokemon: {id}</p>
                <p className={s.pokemon_types}>Tipos: {types.join(', ')}</p>
                <p className={s.pokemon_atck}>Fuerza: {attack}</p>
            </div>
        </div>
    )
};