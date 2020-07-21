import {ACTION_TYPES} from "../../actions/Pokemon";

export default function(state=[], action){
    switch(action.type){
        case ACTION_TYPES.FETCH_POKEMONS:
            return action.pokemons;
        case ACTION_TYPES.FETCH_POKEMON_DETAILS:
            return state;
            default:
                return null;
    }
}