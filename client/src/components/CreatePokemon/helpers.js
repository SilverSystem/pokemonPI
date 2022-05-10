
const searchName = (pokemons,name) => {
    let finded = false;
    pokemons.forEach(p => {
        if(p.name === name) finded = true
    });

    return finded;
}

export default searchName;