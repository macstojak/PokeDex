export const ACTION_TYPES={
    FETCH_BERRIES: "FETCH_BERRIES",
    FETCH_BERRIE_DETAIL: "FETCH_BERRIE_DETAIL"
}

export const fetchBerries = (berries) =>({type:ACTION_TYPES.FETCH_BERRIES, berries})
export const fetchDetailsBerrie = (berry) =>({type:ACTION_TYPES.FETCH_BERRIE_DETAIL, berry})
export const fetchAllBerriesData = (signal) =>{
    return async(dispatch)=>{
        try{
            const response = await fetch('https://pokeapi.co/api/v2/berry?limit=15',{signal:signal});
            const data = await response.json();
            dispatch(fetchBerries(data.results));
        }catch(e){
            console.error(e);
        }
    }
}
export const fetchOneBerryData = (url, signal) =>{
    return async(dispatch)=>{
        try{
            const response = await fetch(url, signal);
            const data = await response.json();
            return data;
        }catch(e){
            console.error(e);
        }
    }
}
export const fetchBerryImage = (url, signal)=>{
    return async(dispatch)=>{
        try{
            const response = await fetch(url, signal);
            const data = await response.json();
            return data.sprites.default;
        }catch(e){
            console.error(e);
        }
    }
}