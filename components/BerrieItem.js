import React, {useEffect, useState} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
 View,

  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


import {fetchBerriesDetails} from '../apiService';
import {useAsyncStorage} from '../hooks/useAsyncStorage';

const AbortController = window.AbortController;

export const BerrieItem = props => {
  const [berries, setBerries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [berriesSource, setBerriesSource] = useAsyncStorage(
    `@pokeDex_berries_ details_${props.name}`,
  );
  useEffect(() => {
    (async () => {
   
      setIsLoading(true);
      const berriesDetails = await AsyncStorage.getItem(
        `@pokeDex_berries_details_${props.name}`,
      );
      if (berriesDetails == null) {
        const response = await fetchBerriesDetails();
        setBerriesSource(response);
      }
      setBerries(response);
      setIsLoading(false);

      return () => controller.abort();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [berriesSource]);

  const isActive = !isLoading && berries != null;

    if (!isActive) {
      return <ActivityIndicator size="small" />;
    }

   
  return (
    
    <TouchableOpacity
     
      disabled={!isActive}
      key={props.index}
      style={[
        styles.itemContainer,
        props.isRefreshing && styles.disableItemContainer,
      ]}
      >
      <Text style={styles.text}>{props.name}</Text>
       
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  image: {
    width: 50,
    height: 50,
  },
});
