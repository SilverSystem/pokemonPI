import React from 'react';
import s from './Nav.module.css';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function Nav({handleSearched}){
        //const [toggleSwitch,setToggleSwitch] = useState('false');
        //const toggleSwitch = document.querySelector('input[type="checkbox"]')
        //console.log(toggleSwitch)
            const getCurrentTheme = () => {
                const currentTheme = localStorage.getItem("theme");
                if(currentTheme){
                    document.documentElement.setAttribute("data-theme",currentTheme);
                    if(currentTheme === 'dark') return true;
                }
                return false;
            }
            const toggleSwitch = getCurrentTheme();
        
    const changeTheme = (e) => {
        if(e.target.checked){
            document.documentElement.setAttribute("data-theme","dark");
            localStorage.setItem("theme","dark");
        } else{
            document.documentElement.setAttribute("data-theme","light");
            localStorage.setItem("theme","light");
        }
    };
    return (
        <div className={s.header_container}>
            <header>
                <nav>
                    <h1>Pokemons</h1>
                    <Link exact to="/createPokemon" className={s.link}>Create Pokemon</Link>
                    <SearchBar handleSearched={handleSearched}/>
                    <div className={s.theme_switch_wrapper}>
                     <label className={s.switch}>                                            
                        <input type="checkbox" className={s.toggle_check} onChange={changeTheme} defaultChecked={toggleSwitch}/>
                        <span className={s.slider}></span>
                    </label>
                    <em>Switch Theme</em>
                    </div>
                </nav>
        </header>
        </div>
    )
};