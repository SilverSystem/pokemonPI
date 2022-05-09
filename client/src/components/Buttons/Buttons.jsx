import React from "react";
import s from './Buttons.module.css';



export default function Buttons({handleCreatedClicked,handleTypesClicked,handleNameOrdered,handleAttackOrdered,handleSearched}){
    const clearFilters = () => {
        handleTypesClicked(false)
        handleCreatedClicked(false)
        handleNameOrdered('')
        handleAttackOrdered('')
        handleSearched('');
    };
    return (
        <div className={s.container_buttons}>
                <div className={s.dropdown}>
                    <button className={s.link}> Order by Name </button>
                    <div className={s.dropdown_menu}>
                            <button onClick={() => {clearFilters(); handleNameOrdered('asc')}} className={s.btn_action}> Ascending Order  </button>
                            <button onClick={() => {clearFilters(); handleNameOrdered('des')}} className={s.btn_action}> Descending Order </button>
                    </div>
                </div>
                <div className={s.dropdown}>
                    <button className={s.link}> Order by Attack </button>
                    <div className={s.dropdown_menu}>
                            <button onClick={() => {clearFilters(); handleAttackOrdered('asc')}} className={s.btn_action}> Ascending Order </button>
                            <button onClick={() => {clearFilters(); handleAttackOrdered('des')}} className={s.btn_action}> Descending Order </button>
                    </div>       
                </div>
                <div>
                    <button onClick={() => {clearFilters(); handleTypesClicked()}}> Filter by Type </button>
                </div>
                <div>
                    <button onClick={() => {clearFilters(); handleCreatedClicked()}}> Only show created Pokemons </button>
                </div>
                <div>
                    <button onClick={clearFilters}> Clear Filters </button>
                </div>
            </div>
    )
}