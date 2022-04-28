import React from 'react';
import Pokemon from '../Pokemon/Pokemon';
import {useSelector} from 'react-redux';



export default function Pokemons(){
    const pokemons = useSelector(state => state.pokemons);
    
    return (
        <div>
            {console.log('Console Inicial',pokemons)}
           {
            //    pokemons === [] ? <h2>Cargando...</h2>
            //    : pokemons.map(el => <Pokemon key={el.id}
            //     id={el.id} img={el.img} name={el.name} types={el.types}/>)
               pokemons[0] ? (pokemons.map(el => <Pokemon key={el.id}
               id={el.id} img={el.img} name={el.name} types={el.types}/>))
               : <h2>Cargando...</h2>
           }
        </div>
    )
};