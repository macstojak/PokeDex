import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export const ListHeader = props => {
  return (
    <View style={styles.barStyle}>
      <TextInput placeholder="search" onChangeText={props.onChange} />
    </View>
  );
};

const styles = StyleSheet.create({

  barStyle:{
    borderStyle: "solid",
    borderColor:"yellow",
    borderWidth:2,
   
  },
})