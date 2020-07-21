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
const AbortController = window.AbortController;

const HomeView = ({navigation}) => {
  const [data, setData] = useState([]);
  const [source, setSource] = useAsyncStorage('@pokeDexList');

  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
    
      const list = await AsyncStorage.getItem('@pokeDexList');

      if (list == null || list ==undefined) {
        const response = await fetchPokemonsList();
        setSource(response);
      }else{
        setSource(list)
      }
     
      setData(source);
      
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshPokemonsList = async () => {
    const controller = new AbortController();
      const signal = controller.signal;
    setIsRefreshing(true);

    const response = await fetchPokemonsList(signal);
    await setSource(response);
    setData(source);
    setIsRefreshing(false);
    return () => controller.abort();
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
