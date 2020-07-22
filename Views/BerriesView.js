
import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {fetchBerriesList} from '../apiService';
import {useDebounce} from '../hooks/useDebounce';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {ListHeader} from '../components/ListHeader';
import {BerrieItem} from '../components/BerrieItem';
import {fetchAllBerriesData} from "../actions/Berrie"

const BerriesView = ({navigation}) => {
 const [data, setData] = useState([]);
 const dispatch = useDispatch();
  const berries = useSelector(state=>state.berries)
  //  const [source, setSource] = useAsyncStorage('@pokeDexList_berries');
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      //   const list = await AsyncStorage.getItem('@pokeDexList_berries');
       
      // if (list == null) {
        const response = await dispatch(fetchAllBerriesData(signal));
        // setSource(response); 
      // }else{
      //   setSource(list)
      // }
      setData(response);
      return function cleanup(){
        abortController.abort();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
useEffect(()=>{
  setData(berries);
}, [berries])
  const refreshBerriesList = async () => {
    try{
    
      setIsRefreshing(true);
      const response = await dispatch(fetchAllBerriesData(signal));
      // await setSource(response);
      setData(response);
      setIsRefreshing(false);
      return function cleanup(){
        abortController.abort();
      }
    }catch(e){
      console.log(e)
    }
  };


  const barStyle = Platform.OS === 'ios' ? 'default' : 'light-content';
  const isLoading = data == null;
 
  return (
    <>

        {data==null ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            onRefresh={refreshBerriesList}
            refreshing={isRefreshing}
            data={data}
            scrollEnabled={!isRefreshing}
            keyExtractor={(item, index) => item + index}
            windowSize={2}
            renderItem={({item, index}) => {
              return (
                <>
               <BerrieItem
                  isRefreshing={isRefreshing}
                  name={item.name}
                  index={index}
                  url={item.url}
                  navigation={navigation}
                 style={styles.listItem}
                />
       
              </>
              );
            }}
          />
        )}
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    flex: 1,
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

export default BerriesView;
