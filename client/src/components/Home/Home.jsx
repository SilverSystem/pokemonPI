import React,{useState} from 'react';
import Nav from '../Nav/Nav';
//import {Link} from 'react-router-dom';
import Pokemons from '../Pokemons/Pokemons';
import Buttons from '../Buttons/Buttons';



export default function Home(){

    const [createdClicked,setCreatedClicked] = useState(false);
    const handleCreatedClicked = (reset = true) => setCreatedClicked(prevState => reset && !prevState);
    const [typesClicked,setTypesClicked] = useState(false);
    const handleTypesClicked = (reset = true) => setTypesClicked(prevState => reset && !prevState);
    const [searched,setSearched] = useState('');
    const handleSearched = (name) => setSearched(name);
    const [nameOrdered,setNameOrdered] = useState('');
    const handleNameOrdered = (name) => setNameOrdered(name);
    const [attackOrdered,setAttackOrdered] = useState('');
    const handleAttackOrdered = (name) => setAttackOrdered(name);




    return (
        <div>
            {console.log('Render Home')}
            <Nav handleSearched={handleSearched}/>
            <Buttons handleCreatedClicked={handleCreatedClicked} handleTypesClicked={handleTypesClicked} 
            handleNameOrdered={handleNameOrdered} handleAttackOrdered={handleAttackOrdered} handleSearched={handleSearched}/>
            {/*<Link to='/home'> Volver al home </Link>*/}
            <Pokemons listCreatedPokemons={createdClicked} listTypes={typesClicked} searched={searched} 
            nameOrdered={nameOrdered} attackOrdered={attackOrdered}/>
        </div>
    )
};


