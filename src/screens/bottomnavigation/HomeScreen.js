import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "../Home";
import Notification from "../Notivication"; // Fixed spelling
import Settings from "../Settings";
import MapTracking from '../map/MapTracking';

const HomeScreen = ({ navigation }) => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      shifting={true}
      initialRouteName="Home"
      activeColor="#242d56"
      inactiveColor="#242d56"
      barStyle={{ backgroundColor: '#f7b42f' }}
    >
      <Tab.Screen 
        name="Accueil" 
        component={Home} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="home" 
              color={focused ? "#000" : "#242d56"} 
              size={25} 
            />
          )
        }} 
      />
      
      <Tab.Screen 
        name="Map" 
        component={MapTracking} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="map" 
              color={focused ? "#000" : "#242d56"} 
              size={25}
            />
          )
        }} 
      />
      
      <Tab.Screen 
        name="Notification" 
        component={Notification} // Fixed component name
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="notifications" 
              color={focused ? "#000" : "#242d56"} 
              size={25}
            />
          )
        }} 
      />
      
      <Tab.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="settings" 
              color={focused ? "#000" : "#242d56"} 
              size={25}
            />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;