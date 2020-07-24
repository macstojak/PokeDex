/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import AnimatedBar from '../components/AnimatedBar';

const DetailsView = ({route}) => {
  const {name} = route.params;

  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${name}`,
  );
  // if (!detailsSource) return <ActivityIndicator></ActivityIndicator>;
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 26,
            color: route.params.color,
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
      </View>
      <View style={styles.statsContainer}>
        <Image
          source={{uri: detailsSource.sprites.front_shiny}}
          style={styles.image}
        />
        <Image
          source={{uri: detailsSource.sprites.front_default}}
          style={styles.image}
        />
      </View>
      <View styles={styles.container}>
        {detailsSource.stats.map((item, index) => {
          return (
            <View
              style={styles.statView}
              key={index}
              style={styles.statsContainer}>
              <Text style={styles.statsText}>{item.stat.name}</Text>
              <View style={styles.bar}>
                <AnimatedBar index={index} value={item.base_stat} />
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
    backgroundColor: '#ffffcc',
  },
  image: {
    width: 100,
    height: 100,
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

  bar: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'blue',
    width: 100,
    height: 10,
  },
  statView: {
    flex: 1,
    flexDirection: 'row',
    //  alignItems:"stretch",
    justifyContent: 'flex-end',
  },
});

export default DetailsView;
