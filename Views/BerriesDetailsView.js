/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import AnimatedBar from '../components/AnimatedBar';
import {fetchOneBerryData} from '../actions/Berrie';

const BerriesDetailsView = ({route}) => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const dispatch = useDispatch();
  const {name, berrie, indexBerrie, url, color} = route.params;
  const berrieInfo = useSelector((state) =>
    state.berries.filter((el) => el.name === name),
  );
  // const [detailsSource, setDetailsSource] = useAsyncStorage(`@pokeDex_berries_details_${name}`)

  if (!berrie) return <ActivityIndicator></ActivityIndicator>;
  return (
    <View style={{ flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  backgroundColor:color}}>
      <Image style={styles.image} source={{uri:url}}/>
      <View>
        <Text style={styles.nameHeader}>{name}</Text>
      </View>
      <Text>Firmness: {berrie.firmness.name}</Text>
      <View style={styles.statView} key={indexBerrie} style={styles.statsContainer}>
        <Text>Growth time:</Text>
        <View style={styles.bar}><AnimatedBar index={indexBerrie} value={berrie.growth_time} /></View>
      </View>
      <View style={styles.statView} key={indexBerrie+1} style={styles.statsContainer}>
        <Text>Natural gift power:</Text>
        <View style={styles.bar}><AnimatedBar index={indexBerrie} value={berrie.natural_gift_power} /></View>
      </View>
      <View styles={styles.container}>
      <View>
        <Text style={styles.nameHeader}>Flavors:</Text>
      </View>
        {berrie.flavors.map((item, index) => {
          return (
            <View
              style={styles.statView}
              key={index}
              style={styles.statsContainer}>
              <Text style={styles.statsText}>{item.flavor.name}</Text>
             <View style={styles.bar}>
                <AnimatedBar index={index} value={item.potency}></AnimatedBar> 
                
                </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  backgroundColor:"white"
},
  bar:{
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor:"blue",
    width: 100,
    height:20,
    margin:5,
  },
  image: {
    width: 50,
    height: 50,
  },
  imagesRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    marginRight: 4,
  },
  nameHeader: {
    fontSize: 26,
  },
  statView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});

export default BerriesDetailsView;
