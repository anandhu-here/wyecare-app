import React, { useState } from 'react'
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
import Login from './Auth/Login';
import Register from './Auth/Register';
import Launch from './Launch';
import Search from './Search';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import Profile from './Profile';
import RegisterHome from './Auth/RegisterHome';
import RegisterAgency from './Auth/RegisterAgency';
import RegsisterCarer from './Auth/RegsisterCarer';
import HomeA from './Agency/Home';
import Assign from './Agency/Assign';
import Invite from './Agency/Invite';
import HomeH from './home/HomeH';
import Requests from './Requests';
import ProfileA from './Agency/ProfileA';
import Staffs from './Agency/Staffs';
import Sprofile from './Agency/Sprofile';
import Invoice from './Agency/Invoice';
import CustomLogin from './Auth/CustomLogin';


const Stack = createStackNavigator();

function MainStack(props) {
    const navigation  = useNavigation();
    const authContext = useSelector(state=>state.userLogin);
    const [ loading, setLoading ] = useState(true);
    const [ screen, setScreen ] = useState();

    useEffect(()=>{
      if(authContext.userInfo){
        const { userInfo } = authContext;
        if (userInfo?.message === "authorized"){
          if(userInfo.user.type === "AGENT"){
            console.log("1")
            setScreen("homea");
            setLoading(false);
          }
          else if(userInfo.user.type === "CARER"){
            console.log("1")
            setScreen("home");
            setLoading(false);
          }
          else if(userInfo.user.type === "HOME"){
            console.log("1")
            setScreen("homeh");
            setLoading(false);
          }
        }
        else{
          console.log("12")
          setScreen("login");
          setLoading(false);
          console.log(props.navigation, "p[")
        }
      }
      else{
        setScreen("login");
        setLoading(false);
        console.log(props.navigation, "p[")
      }
      return ()=>{
      }
    }, [])
  return (
    <View style={{flex:1, backgroundColor:"white"}} >
      {
        loading?(
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}} >

          </View>
        ):(
          <Stack.Navigator initialRouteName={screen}  screenOptions={{header: (props)=>{
            if(props.route.name === "login"){
              return <></>
            }
            if(props.route.name === "signup"){
              return <></>
            }
            if(props.route.name === "home" || props.route.name === "homea" || props.route.name === "homeh" ){
              return(
                <Header  routename={props.route.name} navigation={props.navigation} custom={false} />
              )
              }
            else if(props.route.name === "launch"){
              return(
                <>
                </>
            )
              }
            else if(props.route.name === "search"){
              return(
                <Header  routename={props.route.name} navigation={props.navigation} custom={true} component="search" />
            )
              }
            
            else{
              return(
                <Header  routename={props.route.name} navigation={props.navigation} custom={true} />
              )
            }
            
        }, gestureEnabled:false}} >
            <Stack.Screen options={{gestureEnabled:false}} name='login' component={CustomLogin} />
            <Stack.Screen name='signup' component={Register} />
            <Stack.Screen name='signuph' component={RegisterHome} />
            <Stack.Screen name='signupa' component={RegisterAgency} />
            <Stack.Screen name='signupc' component={RegsisterCarer} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="homea" component={HomeA} />
            <Stack.Screen name="homeh" component={HomeH} />
            <Stack.Screen name="bookings" component={Bookings} />
            <Stack.Screen name="timesheets" component={Timesheets} />
            <Stack.Screen name="timesheet" component={Timesheet} />
            <Stack.Screen name="availability" component={Availability} />
            <Stack.Screen name="trainings" component={Trainings} />
            <Stack.Screen name="documents" component={Documents} />
            <Stack.Screen  name="inshift" options={{gestureEnabled:false}} component={InShift} />
            <Stack.Screen name="notification" component={Notification} />
            <Stack.Screen name="search" component={Search} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="sprofile" component={Sprofile} />
            <Stack.Screen name="profilea" component={ProfileA} />
            <Stack.Screen name="assign" component={Assign} />
            <Stack.Screen name="invite" component={Invite} />
            <Stack.Screen name="staffs" component={Staffs} />
            <Stack.Screen name="requests" component={Requests} />
            <Stack.Screen name="invoice" component={Invoice} />
        </Stack.Navigator>
        )
      }
    </View>
  )
}

export default MainStack

