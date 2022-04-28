import React from 'react';

export default function SearchBar(){
    return (
        <form onSubmit={(e) => {e.preventDefault()}}>
            <input
              type="text"
              placeholder="Pokemon..."
              //value={}
              //onChange={}
            />
            <input type="submit" value="Buscar" />
         </form>
    )
};