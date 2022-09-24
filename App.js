import 'react-native-gesture-handler';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import NavigationRoute from './src/NavigationRoute';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './src/components/Home';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
import { useEffect, useState, useRef } from 'react';
import { deleteItem, getData, storeData } from './src/@async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import { baseUrl } from './src/baseurl';
import { LOGIN_FAIL, LOGIN_SUCCESS } from './src/redux/types/auth';
import { Permissions, usePermissions } from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


const Drawer = createDrawerNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}


export const registerForPushNotificationsAsync = async () =>{
  try{
    if(Device.isDevice){
      let token;
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      return token
    }
    else{
      alert('Must use physical device for Push Notifications');
      return false
    }
  }
  catch{
    return false
  }
  
}



export default function App(){
  return(
    <Provider store={store}>
      <ReduxApp />
    </Provider>
  )
}

function ReduxApp() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [ loading, setLoading ] = useState(true);
  const [ auth, setAuth ] = useState(false);
  // const [ ws, setWs ] = useState(new WebSocket("ws://3.86.108.50:8000/ws/notification/"))
  const dispatch = useDispatch()
  const permission = usePermissions();
  const calendarCntx = useSelector(state=>state.calendar);
  const authCntx = useSelector(state=>state.userLogin);
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token)
      dispatch({type:"SET_PUSH_TOKEN", payload:token})
    }).catch(e=>console.log(e, "errory"));

    // This listener is fired whenever a notification is received while the app is foregrounded
    Notifications.addNotificationReceivedListener(not=>{
      const {shiftAssigned} = calendarCntx;
      var {priority, data, type, date} = not.request.content.data;
      // console.log("prioriririiririririr", priority, "nullllllllllll" )
      console.log(priority, type, "priorytype")
      if(priority <= 2){
        dispatch({type:"NEW_NOTI", payload:true})
      }
      else{
        dispatch({type:type, payload:true})
      }
      
    })

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      dispatch({type:"NEW_NOTI_OPEN", payload:true})
      // dispatch({type:"OPEN_NOTIFICATION", payload:{open:true, ...response.notification.request.content}});
      console.log(response)
    });

    return () => {
      // Notifications.removeNotificationSubscription(notificationListener.current);
      // Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
//   useEffect(()=>{
//     ws.onopen = () =>{
//         console.log("Socket opened")
//     }
//     ws.onclose = () =>{
//         console.log("socket closed");
//     }
//     ws.onerror = (e) =>{
//         console.log("error", e)
//     }
//     ws.onmessage = (e) =>{
//         const data_ = JSON.parse(e.data);
//         if(data_.type === 1){
//             console.log(data_, "socket")
            
//         }
//     }
// }, [])
  
  useEffect(()=>{
    getData().then(value=>{
      const data = JSON.parse(value);
      if(data.token){
        axios.get(`${baseUrl}user`, {headers:{
          'Authorization': "Token" + " " + data.token
        }}).then(res=>{
          if(res.status === 200 && res.data.message === "authorized" ){
            dispatch({type:LOGIN_SUCCESS, payload:res.data})
            setAuth(true);
            setLoading(false);
          }
        }).catch(e=>{
          console.log("error")
          dispatch({type:LOGIN_FAIL});
          setLoading(false);
        })
      }
    }).catch(e=>{
          dispatch({type:LOGIN_FAIL})
          setLoading(false)
    })
  }, [])
  return (
    <View style={{flex:1, backgroundColor:"white"}} > 
      {
        loading?(
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}} >
            <ActivityIndicator size={30} />
          </View>
        ):(
          <NavigationRoute />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
