/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {useAsyncStorage} from "../hooks/useAsyncStorage";
import AnimatedBar from "../components/AnimatedBar";

const BerriesDetailsView = ({route}) => {
  const {name} = route.params;
  console.log("ROUTE PARAM ", route.params)

  const [detailsSource, setDetailsSource] = useAsyncStorage(`@pokeDex_berries_details_${name}`)
  
  if(!detailsSource) return <ActivityIndicator></ActivityIndicator>;
  return (
    
    <View style={styles.container}>
      <View><Text style={styles.nameHeader}>{name}</Text></View>
      
      <View styles={styles.container}>
      
        
        {detailsSource.flavours.map((item, index)=>{
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
