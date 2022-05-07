import React from 'react';
import s from './App.module.css'
import {Route} from 'react-router-dom';
import InitPage from './components/InitPage/InitPage';
import Home from './components/Home/Home';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';

function App() {
  return (
    <div className={s.global_container}>
      <Route exact path='/'> <InitPage/> </Route>
      <Route path='/home' component={Home}/> 
      <Route exact path='/pokemons/:idPokemon' component={PokemonDetail}/>
      <Route path='/createPokemon' component={CreatePokemon}/>
    </div>
  );
}

export default App;
