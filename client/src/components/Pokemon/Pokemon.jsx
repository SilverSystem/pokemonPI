import React from 'react';
import { Link } from 'react-router-dom';


export default function Pokemon({id,img,name,types}){
    return (
        <div>
           <Link to={`/pokemons/${id}`}><h3>{name}</h3></Link>
           <span><p>{id}</p></span>
           <span><p>{types}</p></span>
           <div><img src={img} alt={name}/></div>
        </div>
    )
};