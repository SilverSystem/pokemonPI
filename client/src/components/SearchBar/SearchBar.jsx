import React,{useState} from 'react';
import s from './SearchBar.module.css';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions';

export default function SearchBar({handleSearched}){
  const dispatch = useDispatch();
  const [search,setSearch] = useState('');
  const handleChange= (e) => setSearch(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(search){
      handleSearched(search.toLowerCase());
      dispatch(getByName(search.toLowerCase()));
    } else{
      handleSearched('');
    }
    setSearch('');
  };
    return (
        <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Pokemon..."
              name='search'
              value={search}
              onChange={handleChange}
              className={s.input}
            />
            <input type="submit" value="Buscar" className={s.input_btn}/>
         </form>
    )
};