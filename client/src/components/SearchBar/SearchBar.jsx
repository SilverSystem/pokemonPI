import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions';

export default function SearchBar({handleSearched}){
  const dispatch = useDispatch();
  const [search,setSearch] = useState('');
  const handleChange= (e) => setSearch(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearched(search.toLowerCase());
    dispatch(getByName(search.toLowerCase()));
  };
    return (
        <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Pokemon..."
              name='search'
              value={search}
              onChange={handleChange}
            />
            <input type="submit" value="Buscar" />
         </form>
    )
};