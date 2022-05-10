import React from "react";
import { useSelector } from "react-redux";
import s from './Buttons.module.css';



export default function Buttons({handleCreatedClicked,handleTypesClicked,handleNameOrdered,handleAttackOrdered,handleSearched}){
    const pokemonsTypes = useSelector(state => state.pokemonsTypes); //filteredTypes
    const clearFilters = () => {
        handleTypesClicked(-1)
        handleCreatedClicked(false)
        handleNameOrdered('')
        handleAttackOrdered('')
        handleSearched('');
    };

    const clearOrderFilters = () =>{
        handleCreatedClicked(false)
        handleNameOrdered('')
        handleAttackOrdered('')
        handleSearched('');
    };
    return (
        <div className={s.container_buttons}>
                <div className={`${s.dropdown} ${s.name}`}>
                    <button className={s.link}> Order by Name </button>
                    <div className={s.dropdown_menu}>
                            <button onClick={() => {clearOrderFilters(); handleNameOrdered('asc')}} className={s.btn_action}> Ascending Order  </button>
                            <button onClick={() => {clearOrderFilters(); handleNameOrdered('des')}} className={s.btn_action}> Descending Order </button>
                    </div>
                </div>
                <div className={`${s.dropdown} ${s.attack}`}>
                    <button className={s.link}> Order by Attack </button>
                    <div className={s.dropdown_menu}>
                            <button onClick={() => {clearOrderFilters(); handleAttackOrdered('asc')}} className={s.btn_action}> Ascending Order </button>
                            <button onClick={() => {clearOrderFilters(); handleAttackOrdered('des')}} className={s.btn_action}> Descending Order </button>
                    </div>       
                </div>
                <div className={`${s.dropdown} ${s.type}`}>
                    <button className={s.link}> Filter by Type </button>
                    <div className={s.dropdown_menu}>
                        {pokemonsTypes.map(type => 
                            <button key={type.id} onClick={() => {handleTypesClicked(type.id)}} className={s.btn_action}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</button>
                        )}
                    </div>
                </div>
                <div className={s.created}>
                    <button onClick={() => {clearFilters(); handleCreatedClicked()}} > Only show created Pokemons </button>
                </div>
                <div className={s.clear}>
                    <button onClick={clearFilters}> Clear Filters </button>
                </div>
            </div>
    )
}