import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const image = require('./wal.jpg');

function Launch({navigation}) {
  return (
    <LinearGradient colors={['#a3bded', '#6991c7']} style={{flex:1, backgroundColor:"white", alignItems:"center", paddingVertical:"5%", }}>
        <View style={{flex:0.4, justifyContent:"center"}} >
            <Text style={{fontSize:25, fontWeight:"700", color:"white", elevation:10, textShadowColor:"black"}} >WYECARE</Text>
        </View>
        <View style={{flex:0.6, paddingHorizontal:10}} >
            <Text style={{ fontSize:18, textAlign:"left", paddingVertical:"3%", color:"white", fontWeight:"700" }}>
                Cover shifts efficiently, Manage your timesheets, Download your timesheets if you doesn't want anyone to see your data and so on..
            </Text>
            <View style={{display:"flex", width:"100%"}} >
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('login')
                }} style={{paddingHorizontal:"10%", paddingVertical:"5%", backgroundColor:"white"}} >
                    <Text>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('signup')
                }} style={{paddingHorizontal:"10%", paddingVertical:"5%", backgroundColor:"white"}} >
                    <Text>SIGNUP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingHorizontal:"10%", paddingVertical:"5%", backgroundColor:"white"}} >
                    <Text>EXPLORE</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        {/* <View style={{flex:0.5, justifyContent:"center", borderRadius:60, alignItems:"center", paddingHorizontal:"5%", backgroundColor:"purple", width:"95%"}} >
            <Text style={{fontSize:25, color:"white"}} >Welcome to WyeCare</Text>
            <Text style={{ fontSize:18, textAlign:"center", paddingVertical:"3%", color:"white" }}>
                Decided to work in the Care industry? Congratulations!
            </Text>
            <Text style={{ fontSize:18, textAlign:"center", paddingVertical:"3%", color:"white" }}>We are here to give you a wonderful experience</Text>
            <Text style={{ fontSize:18, textAlign:"center", paddingVertical:"3%", color:"white" }}>
                Cover shifts efficiently, Manage your timesheets, Download your timesheets if you doesn't want anyone to see your data and so on..
            </Text>
            <Text style={{ fontSize:18, textAlign:"center", paddingVertical:"3%", color:"white" }}>Everything you need, We provide</Text>
        </View>
        <View style={{flex:0.5, justifyContent:"center", alignItems:"center"}} >
            <Text>Are you a carer?</Text>
            
        </View> */}
    </LinearGradient>
  )
}

export default Launch