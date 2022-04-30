import React from 'react';
import { Link } from 'react-router-dom';


export default function Pokemon({id,img,name,types,quantity= 0}){
    return (
        <div>
           {quantity ? <Link to={`/pokemons/${name}`}><h3>{name}</h3></Link> : 
           <Link to={`/pokemons/${id}`}><h3>{name}</h3></Link>
           }
           <span><p>{id}</p></span>
           <span><p>{types.join(', ')}</p></span>
           <div><img src={img} alt={name}/></div>
        </div>
    )
};