/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {useAsyncStorage} from "../hooks/useAsyncStorage";
import AnimatedBar from "../components/AnimatedBar";
import { fetchOneBerryData } from '../actions/Berrie';

const BerriesDetailsView = ({route}) => {
  
  const abortController = new AbortController();
  const signal = abortController.signal;
  const dispatch = useDispatch();
  const {name} = route.params;
 const berrieInfo = useSelector(state=>state.berries.filter(el=>el.name===name))
const [berrie,setBerrie] = useState(null);
  // const [detailsSource, setDetailsSource] = useAsyncStorage(`@pokeDex_berries_details_${name}`)
  useEffect(()=>{
    setBerrie(dispatch(fetchOneBerryData(berrieInfo.url,signal)))
    console.log(berrie)
    return function cleanup(){
      abortController.abort();
    }
  }, [])
  if(!berrie) return <ActivityIndicator></ActivityIndicator>;
  return (
    
    <View style={styles.container}>
      <View><Text style={styles.nameHeader}>{name}</Text></View>
      
      <View styles={styles.container}>y

      
        
        {berrie.flavors.map((item, index)=>{
          return(
            
            <View style={styles.statView} key={index} style={styles.statsContainer}>
              
              <Text style={styles.statsText}>{item.name}</Text>
              <AnimatedBar index={index} value={item.potency}/>
            </View>
            
          
        )}
        )} 
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
 container:{
   flex:1,
   alignItems:"center",
   justifyContent: "center",
   backgroundColor: "white"
 },
 image:{
   width: 100,
   height: 100,
 },
 imagesRow:{
   flex:1,
   alignItems:"center",
   flexDirection:"row",
 },
 statsContainer:{
   flexDirection: "row",
   alignItems: "center",
 },
 statsText:{
   marginRight:4,
 },
 nameHeader:{
   fontSize: 26,

 },
 statView:{
   flex:1,
   flexDirection:"row",
   alignItems:"stretch"
 }
});


export default BerriesDetailsView;
