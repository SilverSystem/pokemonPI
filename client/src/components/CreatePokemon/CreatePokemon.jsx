import React,{useState,useEffect} from "react";
import s from './CreatePokemon.module.css';
import searchName from "./helpers";
import { Link, useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { postPokemon,getTypes} from "../../redux/actions";


export default function CreatePokemon(){
    const [error, setError] = useState({
        name:'',
        img:'',
        health:'',
        attack:'',
        defense:'',
        types: '',
        speed:'',
        height:'',
        weight:'',
        fields: ''
    });
    let [formDetails,setFormDetails] = useState({
        name:'',
        img:'',
        health:'',
        attack:'',
        defense:'',
        types: [],
        speed:'',
        height:'',
        weight:''
    });
    const dispatch = useDispatch();
    const pokemonsTypes = useSelector(state => state.pokemonsTypes);
    const pokemons = useSelector(state => state.pokemons);
    const history = useHistory();
    const shoulDisabled = !(formDetails.name && formDetails.img && formDetails.health && formDetails.attack && formDetails.defense && formDetails.speed && formDetails.height && formDetails.weight && formDetails.types.length);
    const haveError = (error.name || error.img || error.health || error.attack || error.defense || error.speed || error.height || error.weight || error.types || error.fields);

    const handleOnChange= (e) => {
        setFormDetails({
            ...formDetails,
            [e.target.name] : e.target.value
        })
    };

    const handleTypes = (e) =>{
        let typesRealLength = formDetails.types.length;
        if(formDetails.types.includes(e.target.value)){
            typesRealLength--;
            setFormDetails({
                ...formDetails,
                types : formDetails.types.filter(el => el !== e.target.value)
            })
        } else{
            typesRealLength++;
            setFormDetails({
                ...formDetails,
                types : [...formDetails.types,e.target.value]
            })
        }
        if(typesRealLength > 2){
            setError({
                ...error,
                types: 'Pokemons can only have two types'
            })
        } else{
            setError({
                ...error,
                types: ''
            });
        }  
    };

    const validateImage = (e) =>{
        if(e.target.value.length > 1234){
            setError({
                ...error,
                img: `The image url can't have more then 1234 characters`
            });
        }else{
            setError({
                ...error,
                img: ''
            });
        }
        handleOnChange(e);
    };

    const validateStats = (e) => {
        if(Number(e.target.value) > 120 || Number(e.target.value) < 0) {
          setError({
              ...error,
              [e.target.name]: `The stat ${e.target.name} can't neither be lower then 0 nor greater then 120`
          });
        } else {
          setError({
            ...error,
            [e.target.name]: ''
        });
        }
        handleOnChange(e);
      };

      const validateHeight = (e) => {
        if(Number(e.target.value) > 36 || Number(e.target.value) < 0) {
          setError({
              ...error,
              height: `The height of a Pokemon can't neither be lower then 0 nor greater then 36`
          });
        } else {
          setError({
            ...error,
            height: ''
        });
        }
        handleOnChange(e);
      };

    const validateName = (e) => {
        if(/\d/.test(e.target.value)) {
          setError({
              ...error,
              name:`Pokemons name can't contain numbers`
          });
        } else {
          setError({
            ...error,
            name: ''
        });
        }
        handleOnChange(e);
    };

    const handleSubmit= (e) => {
        e.preventDefault();
        if(haveError || shoulDisabled){ 
            setError({
                ...error,
                fields:'All fields must be completed correctly to send the form'
            });
        } else{
            if(searchName(pokemons,formDetails.name.toLowerCase())){
                setError({
                    ...error,
                    name:'That pokemon already exists, please change the name'
                });
            } else{
                dispatch(postPokemon({...formDetails,name:formDetails.name.toLowerCase()}));
                alert('Pokemon created successfully');
                history.push('/home');
            }
        }    
    };

    useEffect(() =>{
        if(!pokemonsTypes.length) dispatch(getTypes());  
    },[]) // eslint-disable-line 

    return(
        <div className={s.container_create}>
            <Link to='/home'> <button>Back to Home</button> </Link>
            <form onSubmit={handleSubmit} className={s.create_form}>
            <div className={s.name_img}>
                <label className={s.grid_label}>Name:</label>
                <input className={`${s.input} ${s.input_name} ${error.name ? `${s.danger_name}` : ''}`} type="text" name='name' placeholder="name" value={formDetails.name} onChange={validateName}/>
                { error.name ? <span className={s.error_span}>{error.name}</span> : null} 
                <label className={s.grid_label}>Imagen:</label>
                <input className={`${s.input} ${error.img ? `${s.danger_img}` : ''}`} type="url" name='img' placeholder="Enter the image url" value={formDetails.img} onChange={validateImage}/>
                {error.img ? <span className={s.error_span}>{error.img}</span> : null}
            </div>
            <div className={s.types}>
                <label className={s.grid_label}>Types:</label>
                    {pokemonsTypes.map(el =>(
                        <div key={el.id} className={s.type_grid}>
                            <label className={s.container}>
                                {el.name}<input type="checkbox" name={el.name} value={el.name} onClick={handleTypes}/>
                                        <div className={s.checkmark}></div>
                            </label>
                        </div>
                    ))}
                    {error.types ? <span className={s.error_span}>{error.types}</span> : null}  
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Health:</label>
                <input className={`${s.input} ${error.health ? `${s.danger_hp}` : ''}`} type="number" name='health' placeholder="health" value={formDetails.health} onChange={validateStats}/>
                {error.health ? <span className={s.error_span}>{error.health}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Attack:</label>
                <input className={`${s.input} ${error.attack ? `${s.danger_atck}` : ''}`} type="number" name='attack' placeholder="attack" value={formDetails.attack} onChange={validateStats}/>
                {error.attack ? <span className={s.error_span}>{error.attack}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Defense:</label>
                <input className={`${s.input} ${error.defense ? `${s.danger_def}` : ''}`} type="number" name='defense' placeholder="defense" value={formDetails.defense} onChange={validateStats}/>
                {error.defense ? <span className={s.error_span}>{error.defense}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Speed:</label>
                <input className={`${s.input} ${error.speed ? `${s.danger_speed}` : ''}`} type="number" name='speed' placeholder="speed" value={formDetails.speed} onChange={validateStats}/>
                {error.speed ? <span className={s.error_span}>{error.speed}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Height:</label>
                <input className={`${s.input} ${error.height ? `${s.danger_height}` : ''}`} type="number" name='height' placeholder="height" value={formDetails.height} onChange={validateHeight}/>
                {error.height ? <span className={s.error_span}>{error.height}</span> : null}
            </div>
            <div className={s.stats_container}>
                <label className={s.stats_label}>Weight:</label>
                <input className={`${s.input} ${error.weight ? `${s.danger_weight}` : ''}`} type="number" name='weight' placeholder="weight" value={formDetails.weight} onChange={handleOnChange}/>
                {error.weight ? <span className={s.error_span}>{error.weight}</span> : null}
            </div>
            <div className={s.div_submit}><button type="submit" disabled={haveError || shoulDisabled}> Create Pokemon</button></div>
            {error.fields ? <span className={s.error_span}>{error.fields}</span> : null}
        </form>
        </div>
    )
}