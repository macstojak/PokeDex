/* eslint-disable prettier/prettier */
// import axios from "axios";
export const fetchPokemonsList = async () => {
  try{
    // let data;
    // axios.get('https://pokeapi.co/api/v2/pokemon?limit=15')
    // .then(response=>{
    //   data = response.results;
    // })
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15', {method:"GET"});
    const data = response.json();
    console.log("DATARESULTS", data);
    return data;
  }catch(e){
    console.error("FETCHPOKEMONLIST",e)
  }
 
 };
 export const fetchPokemonDetails = async (url) => {
   try{
    const response = await fetch(url, {method: 'get'});
    const data = response.json();
    return data.results;
   }catch(e){
     console.error("FETCHPOKEMONDETAILS", e)
   }
  
};

 export const fetchBerriesList = async () => {
   try{
    const response = await fetch('https://pokeapi.co/api/v2/berry?limit=10')
    const data = await response.json();
    return data.results;
    }catch(error){
      console.error("FETCHBERRIESLIST",error);
    };
  
 };

 export const fetchBerriesDetails = async (url) => {
   try{
    const response = await fetch(url);
    const data = response.json();
    return data.results;
   }catch(error){
    console.error(error)
  }
}

