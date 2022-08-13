import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import Header from './components/Header';
import HomeStack from './components/MainStack';
import MainStack from './components/MainStack';
const Drawer = createDrawerNavigator();


function NavigationRoute() {
  return (
    <NavigationContainer style={{flex:1}} >
        <Drawer.Navigator screenOptions={{ headerShown:false }} >
            <Drawer.Screen name='main' component={MainStack} />
        </Drawer.Navigator>  
    </NavigationContainer>  
  )
}

export default NavigationRoute