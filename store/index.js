import {createStore, applyMiddleware, combineReducers} from "redux";
import ReduxThunk from "redux-thunk";
import pokemonReducer from "../reducers/Pokemon";
import berrieReducer from "../reducers/Berrie";

const store=createStore(combineReducers({
    pokemons: pokemonReducer,
    berries: berrieReducer
}), applyMiddleware(ReduxThunk));
export default store;