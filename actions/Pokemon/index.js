export const ACTION_TYPES={
    FETCH_POKEMONS: "FETCH_POKEMONS",
    FETCH_POKEMON_DETAILS: "FETCH_POKEMON_DETAILS"
}

export const fetchPokemons = (pokemons) =>({type:ACTION_TYPES.FETCH_POKEMONS, pokemons})
export const fetchDetailsPokemon = (pokemon) =>({type:ACTION_TYPES.FETCH_POKEMON_DETAILS, pokemon})
export const fetchAllPokemonsData = (signal) =>{
    return async(dispatch)=>{
        try{
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20', {signal: signal});
            const data = await response.json();
            dispatch(fetchPokemons(data.results));
        }catch(e){
            console.error(e);
        }
    }
}
export const fetchOnePokemonData = (url, signal) =>{
    return async(dispatch)=>{
        try{
            const response = await fetch(url, {signal: signal});
            const data = await response.json();
            return data;
        }catch(e){
            console.error(e);
        }
    }
}