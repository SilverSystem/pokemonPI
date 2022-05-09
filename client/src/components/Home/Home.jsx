import React,{useState,useEffect} from 'react';
// import s from './Home.module.css';
import Nav from '../Nav/Nav';
import Pokemons from '../Pokemons/Pokemons';
import Buttons from '../Buttons/Buttons';
import { useDispatch } from 'react-redux';
import { clearDetails } from '../../redux/actions';


export default function Home(){
    const dispatch = useDispatch();
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

    useEffect(()=>{
         dispatch(clearDetails());
    },[searched]); // eslint-disable-line 


    return (
        <div>
            <Nav handleSearched={handleSearched}/>
            <Buttons handleCreatedClicked={handleCreatedClicked} handleTypesClicked={handleTypesClicked} 
            handleNameOrdered={handleNameOrdered} handleAttackOrdered={handleAttackOrdered} handleSearched={handleSearched}/>
            <Pokemons listCreatedPokemons={createdClicked} listTypes={typesClicked} searched={searched} 
            nameOrdered={nameOrdered} attackOrdered={attackOrdered}/>
        </div>
    )
};
