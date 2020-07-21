import React, {useState, useEffect, useCallback} from "react";
import {

    FlatList,

  } from 'react-native';
  
import {useDebounce} from '../hooks/useDebounce';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {ListHeader} from '../components/ListHeader';
import {ListItem} from '../components/ListItem';

import {fetchPokemonsList} from '../apiService';

 const FlatListView = ({data, navigation, source}) =>{
    
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false); 
//   const refreshPokemonsList = async () => {
//     setIsRefreshing(true);
//     const response = await fetchPokemonsList();
//     const stringifiedValue = JSON.stringify(response.results);
//     await AsyncStorage.setItem('@pokeDexList', stringifiedValue);
//     setSource(response.results);
//     setData(response.results);
//     setIsRefreshing(false);
//   };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filterPokemons = useCallback(
    term =>
      source.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()),
      ),
    [source],
  );

//   useEffect(() => {
//     if (debouncedSearchTerm) {
//       const filteredPokemons = filterPokemons(debouncedSearchTerm);
//       setData(filteredPokemons);
//     } else {
//       setData(source);
//     }
//   }, [debouncedSearchTerm, source, filterPokemons]);

  
    return(
    <FlatList
    // onRefresh={refreshPokemonsList}
    // refreshing={isRefreshing}
    // ListHeaderComponent={<ListHeader onChange={setSearchTerm} />}
    data={data}
    scrollEnabled={!isRefreshing}
    keyExtractor={(name, index) => name + index}
    windowSize={5}
    // contentContainerStyle ={styles.flatList}
    renderItem={(item) => {
     
      return (
       
        <ListItem
          isRefreshing={isRefreshing}
          name={item.name}
          index={item.index}
          url={item.url}
          navigation={navigation}
         style={styles.listItem}>
          
         </ListItem>
       
      );
    }}
  > </FlatList>
     )
}
export default FlatListView;