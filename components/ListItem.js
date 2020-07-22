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
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${props.name}`, 
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const pokemonDetails = await AsyncStorage.getItem(
        `@pokeDex_details_${props.name}`,
      );
      if (pokemonDetails == null) {
        const response = await dispatch(fetchOnePokemonData(props.url, signal));

        setColor(Utils.getColor(response.types[0].type.name));
        
        setDetailsSource(response);
      }
      setDetails(detailsSource);
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
            uri: details.sprites.front_default,
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
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Details', {
          name: props.name,
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
    padding: 8,
    height: 140,
    marginTop: 2,
    marginBottom: 2,
    flex: 1,
    flexDirection: 'row',
  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
  image: {
    width: 75,
    height: 80,
  },
});
