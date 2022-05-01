import React from 'react';
import { Link } from 'react-router-dom';


export default function Pokemon({id,img,name,types,attack,quantity= 0}){
    return (
        <div>
           {quantity ? <Link to={`/pokemons/${name}`}><h3> Nombre: {name.charAt(0).toUpperCase() +name.slice(1)}</h3></Link> : 
           <Link to={`/pokemons/${id}`}><h3>Nombre: {name.charAt(0).toUpperCase() +name.slice(1)}</h3></Link>
           }
           <span><p>Número de Pokemon: {id}</p></span>
           <span><p>Tipos: {types.join(', ')}</p></span>
           <span><p>Fuerza: {attack}</p></span>
           <div><img src={img} alt={name}/></div>
        </div>
    )
};