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
        <div  className={s.container_buttons}>
                <div className={s.dropdown}>
                    <button className={s.link}> Ordenar por Nombre </button>
                    <div className={s.dropdown_menu}>
                            <button onClick={() => {clearFilters(); handleNameOrdered('asc')}} className={s.btn_action}> Ascendentemente </button>
                            <button onClick={() => {clearFilters(); handleNameOrdered('des')}} className={s.btn_action}> Descendentemente </button>
                    </div>
                </div>
                <div className={s.dropdown}>
                    <button className={s.link}> Ordenar por Fuerza </button>
                    <div className={s.dropdown_menu}>
                            <button onClick={() => {clearFilters(); handleAttackOrdered('asc')}} className={s.btn_action}> Ascendentemente </button>
                            <button onClick={() => {clearFilters(); handleAttackOrdered('des')}} className={s.btn_action}> Descendentemente </button>
                    </div>       
                </div>
                <div>
                    <button onClick={() => {clearFilters(); handleTypesClicked()}}> Filtrar por Tipo </button>
                </div>
                <div>
                    <button onClick={() => {clearFilters(); handleCreatedClicked()}}> Mostrar solo los Pokemons Creados </button>
                </div>
                <div>
                    <button onClick={clearFilters}> Limpiar Filtros </button>
                </div>
            </div>
    )
}