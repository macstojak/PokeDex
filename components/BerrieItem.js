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
import {useDispatch} from "react-redux";
import {fetchOneBerryData, fetchBerryImage} from "../actions/Berrie";

import Utils from "../utils/Utils";

export const BerrieItem = props => {
  const [berries, setBerries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const abortController = new AbortController();
  const signal = abortController.signal;
  const {url} = props;
  const dispatch = useDispatch();
  // const [berriesSource, setBerriesSource] = useAsyncStorage(
  //   `@pokeDex_berries_ details_${props.name}`,
  // );
  useEffect(() => {
    (async () => {
   
      setIsLoading(true);
      // const berriesDetails = await AsyncStorage.getItem(
      //   `@pokeDex_berries_details_${props.name}`,
      // );
      // if (berriesDetails == null) {
        const response = await dispatch(fetchOneBerryData(url, signal));
        setBerries(response)
       const berrieitem = await dispatch(fetchBerryImage(response.item.url, signal))
    setImageUrl(berrieitem)
      //   setBerriesSource(response);
      // }
     setColor(Utils.getColor(response.natural_gift_type.name));   
      setIsLoading(false);
      return function cleanup(){
        abortController.abort();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = !isLoading && berries != null;

  const renderBerries = () => {
    if (!isActive) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <View style={{flex:1, flexDirection:"row", alignItems: "center", textAlign:"center",height:"100%",color: "white",borderRadius:20, backgroundColor: color}}>
     
        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.image}
        />
        <Text style={styles.text}># {props.index+1} - {props.name}</Text>
       
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Berries Details', {
          name: props.name,
          berrie: berries,
          indexBerrie: props.index,
          url: imageUrl,
          color: color
        })
      }
     
      disabled={!isActive}
      key={props.index}
      style={styles.itemContainer
    
      }>
      {renderBerries()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '100',
    color:"black"
  },
  itemContainer: {
    padding: 8,
    flex: 1,
    flexDirection: "column",
   textAlign:"center"
  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
  image: {
    width: 50,
    height: 50,
  },
});
