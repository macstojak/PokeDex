export const ACTION_TYPES={
    FETCH_BERRIES = "FETCH_BERRIES",
    FETCH_BERRIE_DETAIL = "FETCH_BERRIE_DETAIL"
}

export const fetchBerries = (berries) =>{type:ACTION_TYPES.FETCH_BERRIES, berries}
export const fetchDetailsBerrie = (berry) =>{type:ACTION_TYPES.FETCH_BERRIE_DETAIL, berry}
export const fetchAllBerriesData = () =>{
    return async(dispatch)=>{
        try{
            const response = await fetch('https://pokeapi.co/api/v2/berries?limit=15');
            const data = await response.json();
            dispatch(fetchBerries(data));
        }catch(e){
            console.error(e);
        }
    }
}
export const fetchOneBerryData = (url) =>{
    return async(dispatch)=>{
        try{
            const response = await fetch(url);
            const data = await response.json();
            dispatch(fetchDetailsBerrie(data));
        }catch(e){
            console.error(e);
        }
    }
}