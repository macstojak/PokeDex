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

import {fetchPokemonsList} from '../apiService';
import {useDebounce} from '../hooks/useDebounce';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {ListHeader} from '../components/ListHeader';
import {ListItem} from '../components/ListItem';

const HomeView = ({navigation}) => {
  const [data, setData] = useState([]);
  const [source, setSource] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      // const list = await AsyncStorage.getItem('@pokeDexList');

      // if (list == null) {
        const response = await fetchPokemonsList();
        setData(response);
        const stringifiedValue = JSON.stringify(response);
        console.log("RESPONSE", response)
        // await AsyncStorage.setItem('@pokeDexList', stringifiedValue);
        setSource(response);
      // } else {
      //   const parsedValue = JSON.parse(list);
      //   setSource(parsedValue);
      //   setData(parsedValue);
      // }
    })();
  }, []);

  const refreshPokemonsList = async () => {
    setIsRefreshing(true);
    const response = await fetchPokemonsList();
    const stringifiedValue = JSON.stringify(response.results);
    // await AsyncStorage.setItem('@pokeDexList', stringifiedValue);
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
}, [debouncedSearchTerm, source, filterPokemons]);

  const barStyle = Platform.OS === 'ios' ? 'default' : 'light-content';

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
