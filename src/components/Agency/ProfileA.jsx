import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { basecolor } from '../../redux/constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Finance from './Finance';
import Analysis from './Analysis';
import Manage from './Manage';


const Stack = createMaterialTopTabNavigator()

function ProfileA() {
    const {userInfo} = useSelector(state=>state.userLogin);
    const {profile} = userInfo.user;
  return (
    <View style={{flex:1, backgroundColor:"white", alignItems:"center"}} >
        <View style={{flex:0.3, justifyContent:"center", alignItems:"center", borderBottomWidth:1, borderBottomColor:basecolor,borderStyle:"dashed", width:"90%"}} >
            <Text style={{fontSize:25, fontWeight:"600", color:basecolor, textShadowColor:"grey", textShadowOffset:{width:1, height:.5}, textShadowRadius:1}}  >{profile.name}</Text>
            <Text style={{fontSize:20, fontWeight:"500", color:"grey", textShadowColor:basecolor, textShadowOffset:{width:0.5, height:0.2}, textShadowRadius:1}} >77 Buisiness Center</Text>
            <Text style={{fontSize:20, fontWeight:"500", color:"grey", textShadowColor:basecolor, textShadowOffset:{width:0.5, height:0.2}, textShadowRadius:1}} >{profile.postcode}</Text>
            <Text style={{fontSize:20, fontWeight:"500", color:"grey", textShadowColor:basecolor, textShadowOffset:{width:0.5, height:0.2}, textShadowRadius:1}} >{profile.phone}</Text>

            <Text style={{fontSize:20, fontWeight:"500", color:"grey", textShadowColor:basecolor, textShadowOffset:{width:0.5, height:0.2}, textShadowRadius:1}} >{userInfo.user.email}</Text>
            <TouchableOpacity style={{paddingVertical:"2%", paddingHorizontal:"5%", backgroundColor:basecolor, marginTop:7, borderRadius:100, }} >
                <Text style={{color:"white", fontSize:16, fontWeight:'600'}} >Edit profile</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:0.7, flexDirection:"row"}} >
            <Stack.Navigator style={{flex:1}} >
                <Stack.Screen component={Analysis} name="ANALYSIS" />
                <Stack.Screen component={Manage} name="MANAGE" />
                <Stack.Screen component={Finance} name="finance" />
            </Stack.Navigator>
        </View>
    </View>
  )
}

export default ProfileA