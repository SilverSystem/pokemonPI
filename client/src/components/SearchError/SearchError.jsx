import React,{useEffect} from "react";
import s from './SearchError.module.css';
import { useDispatch,useSelector } from "react-redux";
import { clearDetails } from "../../redux/actions";

export default function SearchError(){
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);

    useEffect(() =>{
        return () => dispatch(clearDetails());
    },[]); // eslint-disable-line
    return (
        <div className={s.error_container}>
            <div className={s.error_details}>
                <h2>Error no existes ningun Pokemon con ese Nombre</h2>
                <h3>{error.errorDetails.message}</h3>
                <a href="/home"><button>Regresar al Home</button></a>
            </div>
        </div>
    )
}