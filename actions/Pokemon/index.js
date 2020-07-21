export const ACTION_TYPES={
    FETCH_POKEMONS = "FETCH_POKEMONS",
    FETCH_DETAILS_POKEMON = "FETCH_DETAILS_POKEMON"
}

export const fetchPokemons = (pokemons) =>{type:ACTION_TYPES.FETCH_POKEMONS, pokemons}
export const fetchDetailsPokemon = (pokemon) =>{type:ACTION_TYPES.FETCH_DETAILS_POKEMON, pokemon}
export const fetchAllPokemonsData = () =>{
    return async(dispatch)=>{
        try{
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15');
            const data = await response.json();
            dispatch(fetchPokemons(data));
        }catch(e){
            console.error(e);
        }
    }
}
export const fetchOnePokemonData = (url) =>{
    return async(dispatch)=>{
        try{
            const response = await fetch(url);
            const data = await response.json();
            dispatch(fetchDetailsPokemon(data));
        }catch(e){
            console.error(e);
        }
    }
}