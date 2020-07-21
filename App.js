import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
 
import {Image} from 'react-native';
 
import HomeView from './Views/HomeView';
import DetailsView from './Views/DetailsView';
import BerriesView from './Views/BerriesView';
import BerriesDetailsView from './Views/BerriesDetailsView';
 
const HomeStack = createStackNavigator(); 
const BerriesStack = createStackNavigator();
const Tab = createBottomTabNavigator();
 
const HomeStackScreen = () => (
  <HomeStack.Navigator
 
  >
    <HomeStack.Screen 
      options={{
        headerStyle: {
          backgroundColor: 'gold',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}
    name="Home" component={HomeView} />
    <HomeStack.Screen 
     options={{
           
      headerStyle: {
        backgroundColor: 'gold',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },}}
    name="Details" component={DetailsView} />
    
  </HomeStack.Navigator>
);
 
const BerriesStackScreen = () => (
  <BerriesStack.Navigator >
    
    <BerriesStack.Screen  
           options={{
           
            headerStyle: {
              backgroundColor: 'gold',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },}}
    name="Berries" component={BerriesView} />
    <BerriesStack.Screen 
     options={{
           
      headerStyle: {
        backgroundColor: 'gold',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },}}
    name="BerriesDetails" component={BerriesDetailsView} />
    
  </BerriesStack.Navigator>
);
 
function App() {
  return (
    <NavigationContainer >
      <Tab.Navigator
      initialRouteName="Home"
      // style={styles.tabBar}
          
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            let imageUrl;
            if (route.name === 'Home') {
              imageUrl = require('./images/Home.png');
            } else {
              imageUrl = require('./images/Berries.png');
            }
            return <Image source={imageUrl} />;
          },

        })}
        tabBarOptions={styles.bottomTab}>
        <Tab.Screen 
        tabBarOptions={styles.bottomButton}
         name="Home" component={HomeStackScreen} />
       
       <Tab.Screen
        tabBarOptions={styles.bottomButton}
         name="Berries" component={BerriesStackScreen} />
      </Tab.Navigator>
     
    </NavigationContainer>
  );
}
styles={
  tabBar:{
    color: "white",
    backgroundColor: 'tan',
  },
  bottomTab:{activeTintColor: 'red', inactiveTintColor: 'black', activeBackgroundColor: 'yellow',
  inactiveBackgroundColor: "#FFD700", labelStyle:{ fontSize:16, fontWeight:"bold"}},
  bottomButton:
    {activeBackgroundColor: '#FFD700',
        inactiveBackgroundColor: "yellow"}
  
}
export default App;