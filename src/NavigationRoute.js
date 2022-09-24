import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import Header from './components/Header';
import HomeStack from './components/MainStack';
import MainStack from './components/MainStack';
import Login from './components/Auth/Login';
import { deleteItem } from './@async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from './redux/types/auth';
import { Text, TouchableOpacity, View } from 'react-native';
const Drawer = createDrawerNavigator();


function NavigationRoute({auth}) {
  const [name, setName] = useState(false);
  const [ edge, setEdge ] = useState(200);
  const [page, setPage] = useState(0)
  const dispatch = useDispatch();

  const userContext = useSelector(state=>state.userLogin);
  const cal_home = useSelector(state=>state.cal_agency);
  useEffect(()=>{
    if(userContext.userInfo){
      const {profile} = userContext?.userInfo?.user;
      const {user} = userContext?.userInfo;
      if(user?.type === "AGENT"){
        
        setName(profile.name);
        setPage(1)

      }else if(user?.type === "CARER"){
        setPage(0);
        setName(profile.first_name + " " + profile.last_name);
      }
      else if(user?.type === "HOME"){
        setPage(2);
        setName(profile.name)
      }
    }
    else{
      setEdge(0);
    }
    if(!userContext.drawer){
      setEdge(0)
    }
    else{
      setEdge(50)
    }
  } ,[userContext])
  
  return (
    <NavigationContainer style={{flex:1,}} >
        <Drawer.Navigator drawerContent={props => {
          return (
            <DrawerContentScrollView 
              contentContainerStyle={{backgroundColor:"white"}}
            {...props}>
              <View style={{}} >
                <TouchableOpacity onPress={()=>{
                  if(page===1){
                    props.navigation.navigate('profilea', {profile:userContext.userInfo.user.profile});
                  }
                  else if(page === 0){
                    props.navigation.navigate('profile', {profile:userContext.userInfo.user.profile});
                  }
                }} style={{marginTop:20}} >
                  <Text style={{paddingLeft:10, paddingVertical:"10%", fontSize:20, fontWeight:"700", color:"grey"}} >{name?name:""}</Text>
                </TouchableOpacity>
              </View>
              
              <DrawerItemList {...props} />
              {page==1&&<DrawerItem label="Homes" onPress={() => {
                  props.navigation.navigate("invite");
                }} />}
                {page==1&&<DrawerItem label="Staffs" onPress={() => {
                  props.navigation.navigate("staffs");
                }} />}
              {
                
                page<=1&&(
                  <View  >
                    <DrawerItem label="Requests" onPress={() => {
                      props.navigation.navigate("requests", {id:userContext.userInfo.user.profile.id});
                      dispatch({type:"JOIN_REQUEST", payload:false})
                    }} />
                    {cal_home.join&&<Text style={{fontSize:19, position:"absolute", color:"brown", left:"25%",top:"12%", fontWeight:"900" }} >*</Text>}
                  </View>
                )
              }
                <DrawerItem label="Timesheets" onPress={() => {
                  props.navigation.navigate("timesheets", {id:userContext.userInfo.user.profile.id});
                }} />
                <DrawerItem label="Logout" onPress={() => {
                  deleteItem().then(()=>{
                    dispatch({type:LOGOUT, payload:{}});
                    props.navigation.closeDrawer();
                    props.navigation.navigate('login');
                  })
                }} />
              
            </DrawerContentScrollView>
          )
        }} screenOptions={{ headerShown:false, swipeEnabled:true, swipeEdgeWidth:edge, drawerActiveTintColor:"red"  }} initialRouteName="main">
            <Drawer.Screen name='Calendar' component={MainStack} />
        </Drawer.Navigator>  
    </NavigationContainer>  
  )
}

export default NavigationRoute