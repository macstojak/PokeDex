import {ACTION_TYPES} from "../../actions/Berrie";

export default function(state={}, action){
    switch(action.type){
        case ACTION_TYPES.FETCH_BERRIES:
            return action.berries;
        case ACTION_TYPES.FETCH_BERRIE_DETAIL:
        return action.berry;
        default:
            return null;
    }
}