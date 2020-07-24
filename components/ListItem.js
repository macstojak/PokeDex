import React, {useEffect, useState} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {useAsyncStorage} from "../hooks/useAsyncStorage";
import Utils from '../utils/Utils';
import {fetchOnePokemonData} from '../actions/Pokemon';

export const ListItem = (props) => {
  const [details, setDetails] = useState([]);
  const [color, setColor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [imageUrl, setImageUrl] = useState(null);
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${props.name}`, 
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const pokemonDetails = await AsyncStorage.getItem(
        `@pokeDex_details_${props.name}`,
      );
      if (pokemonDetails == null || !Array.isArray(pokemonDetails)) {
        const response = await dispatch(fetchOnePokemonData(props.url, signal));
        console.log("no list details", props)
        setDetails(response);
        
        setColor(Utils.getColor(response.types[0].type.name));
        response.sprites.front_default ?
          setImageUrl(response.sprites.front_default)
          :
          setImageUrl("./images/Berries.png");
        
        
      }else{
        console.log("list details", list)
        setDetails(list);
        setColor(Utils.getColor(list.types[0].type.name));
        if(list.sprites.front_default){
          setImageUrl(list.sprites.front_default)
        }else{
          setImageUrl("./images/Berries.png")
        }
      }
     
      setIsLoading(false);
      return function cleanup() {
        abortController.abort();
      };
    })();
  
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = !isLoading && details != null;

  const renderDetails = () => {
    if (!isActive) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <View
        style={{
          height: '100%',
          color: 'white',
          borderRadius: 20,
          backgroundColor: color,
        }}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.image}
        />
        <Text style={styles.text}>
          # {props.index + 1} - {props.name}
        </Text>
      </View>
    );
  };

  return (
    // <View><Text>{props.name}</Text></View>
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Details', {
          name: props.name,
          color: color,
        })
      }
      disabled={!isActive}
      key={props.index}
      style={styles.itemContainer}>
      {renderDetails()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginLeft: 10,
    paddingBottom: 10,
    fontWeight: '100',
    color: 'white',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:"center",
    textAlign:"center",

    padding: 8,
    height: 140,
    marginTop: 2,
    marginBottom: 2,
   
  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
  image: {
    width: 75,
    height: 80,
  },
});
