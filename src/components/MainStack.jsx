import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Notification from './Notification';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import Bookings from './Bookings';
import Documents from './Documents';
import Trainings from './Trainings';
import Availability from './Availability';
import Timesheets from './Timesheets';
import InShift from './InShift';
import { useEffect } from 'react';
import Timesheet from './Timesheet';


const Stack = createStackNavigator();

function MainStack() {
    const navigation  = useNavigation()
    useEffect(()=>{
      return ()=>{
      }
    }, [])
  return (
    <Stack.Navigator screenOptions={{header: (props)=>{
      
        if(props.route.name === "home"){
          return(
            <Header navigation={props.navigation} custom={false} />
        )
          }
        else{
          return(
            <Header navigation={props.navigation} custom={true} />
          )
        }
        
    } }} >
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="bookings" component={Bookings} />
        <Stack.Screen name="timesheets" component={Timesheets} />
        <Stack.Screen name="timesheet" component={Timesheet} />
        <Stack.Screen name="availability" component={Availability} />
        <Stack.Screen name="trainings" component={Trainings} />
        <Stack.Screen name="documents" component={Documents} />
        <Stack.Screen name="inshift" component={InShift} />
        <Stack.Screen name="notification" component={Notification} />
    </Stack.Navigator>
  )
}

export default MainStack

