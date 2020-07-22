import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {useDebounce} from '../hooks/useDebounce';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {ListHeader} from '../components/ListHeader';
import {ListItem} from '../components/ListItem';
import { fetchAllPokemonsData } from '../actions/Pokemon';

const HomeView = ({navigation}) => {
  const [data, setData] = useState([]);
  const pokemons = useSelector(state=>state.pokemons)
  const dispatch = useDispatch();
  const [source, setSource] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const abortController = new AbortController();
  const signal = abortController.signal;


  useEffect(()=>{
    (async ()=>{
      const list = await AsyncStorage.getItem('@pokeDexList');

      if (list == null) {
      const response = await dispatch(fetchAllPokemonsData());
      setData(response);
        const stringifiedValue = JSON.stringify(response);
        await AsyncStorage.setItem('@pokeDexList', stringifiedValue);
        setSource(response);
      } else {
        const parsedValue = JSON.parse(list);
        setSource(parsedValue);
        setData(parsedValue);
      }
      // return function cleanup(){
      //   abortController.abort();
      // }
    })()
  
    }, []);

  const refreshPokemonsList = async () => {
    setIsRefreshing(true);
    const response =  await dispatch(fetchAllPokemonsData());
    const stringifiedValue = JSON.stringify(response.results);
    await AsyncStorage.setItem('@pokeDexList', stringifiedValue);
    setSource(response.results);
    setData(response.results);
    setIsRefreshing(false);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filterPokemons = useCallback(
    term =>
      source.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()),
      ),
    [source],
  );

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredPokemons = filterPokemons(debouncedSearchTerm);
      setData(filteredPokemons);
    } else {
      setData(source);
    }
    return function cleanup(){
      abortController.abort();
    }
  }, [debouncedSearchTerm, source, filterPokemons]);

  const isLoading = data == null;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff8dc"  />
      <SafeAreaView style={styles.appContainer}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            onRefresh={refreshPokemonsList}
            refreshing={isRefreshing}
            ListHeaderComponent={<ListHeader onChange={setSearchTerm} />}
            data={data}
            scrollEnabled={!isRefreshing}
            keyExtractor={(item, index) => item.name + index}
            windowSize={5}
            // contentContainerStyle ={styles.flatList}
            renderItem={({item, index}) => {
              return (
              
                <ListItem
                  isRefreshing={isRefreshing}
                  name={item.name}
                  index={index}
                  url={item.url}
                  navigation={navigation}
                 style={styles.listItem}
                />
              );
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  barStyle:{
    backgroundColor: "yellow",
    color: "white"
  },
  flatList:{
    flex:1,
    flexDirection:"column",
    alignItems: "center",
    
  },
  listItem:{
  borderWidth:2,
  borderStyle:"solid",
  borderColor: 'red'
  },
  container: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: '100',
  },
  itemContainer: {
    padding: 8,
   
  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
});

export default HomeView;
