import React from 'react';
import { useSelector } from 'react-redux';
import Pokemon from '../Pokemon/Pokemon';

export default function Pokemons({pokemons,listCreatedPokemons,listTypes,searched}){
     const createdPokemons = useSelector(state => state.createdPokemons);
     const totalPokemons = useSelector(state => state.pokemons);
     const pokemonsTypes = useSelector(state => state.pokemonsTypes);
     const searchedPokemon = useSelector(state => state.pokemonDetail)
    if(listCreatedPokemons){
         return <div>
                    {
                         createdPokemons.length ? createdPokemons.map(el => <Pokemon key={el.id}
                         id={el.id} img={el.img} name={el.name} types={el.types}/>) 
                         : <h3>No hay pokemones creados</h3>
                    }
               </div>
    }

    if(listTypes){
     let listedPokemons = [];
     for(let i = 0; i < pokemonsTypes.length;i++){
          listedPokemons.push([]);
          totalPokemons.forEach(p =>{
               if (p.types.includes(pokemonsTypes[i].name)) listedPokemons[i].push(p); 
          })
     }     
     console.log(listedPokemons)
         return <div>
                    {
                         listedPokemons.map((type,index) => (
                              <div key={index}>
                              {type.length ? <h4>{pokemonsTypes[index].name}</h4> : null}
                              {
                                   type.length ? listedPokemons[index].map(p =>
                                        <Pokemon key={p.id} id={p.id} img={p.img} name={p.name} types={p.types}/>
                                   ) : null  
                              }
                              </div>
                         ))
                    }
               </div>
    }

    if(searched){
          console.log(searchedPokemon)
          return <div>
                    { Object.keys(searchedPokemon).length? <Pokemon key={searchedPokemon.id} id={searchedPokemon.id} img={searchedPokemon.img} 
                    name={searchedPokemon.name} types={searchedPokemon.types} quantity={1}/> : <h3>Buscando Pokemon...</h3> }
                 </div>
    }

    return <div>
                {console.log('Console inicial',pokemons)}
               {
                    pokemons.map(el => <Pokemon key={el.id}
                    id={el.id} img={el.img} name={el.name} types={el.types}/>) 
               }
            </div>
};


// pokemonsTypes.map(types => (
//      <div key={types.id}>
//           <h4>{types.name}</h4>
//           {    totalPokemons.map(p =>  p.types.includes(types.name) ? 
//                <Pokemon key={p.id} id={p.id} img={p.img} name={p.name} types={p.types}/> : null)
//           }
//      </div>
// ))