import React, { useEffect } from 'react'
import { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
function Timesheet({route, navigation}) {
    // const [sign, setSign] = useState('');
    const {profile, home, shiftname, type, auth_name, auth_pos, sign} = route.params;
    useEffect(()=>{
        
    }, [])
  return (
    <View style={{flex:1, backgroundColor:"white"}} >
        <ScrollView style={{flex:1, }} contentContainerStyle={{flex:1,justifyContent:"center", alignItems:"center"}} >
            <View style={{flex:0.5, width:"100%", justifyContent:"center", alignItems:"center"}} >
                <View style={{flex:0.5, width:"100%", justifyContent:"center", alignItems:"center"}} >
                    <Text style={{fontSize:25, paddingVertical:5}} >{profile.agent.name}</Text>
                    <Text style={{fontSize:22, paddingVertical:5}} >{profile.agent.postcode}</Text>
                    <Text style={{fontSize:18, paddingVertical:5}} >{profile.agent.phone}</Text>
                </View>

                <View style={{flex:0.5, justifyContent:"center", alignItems:"center"}} >
                    <Text style={{fontSize:22}} >Staff Name: {profile.first_name} { profile.last_name } </Text>
                    <Text style={{fontSize:18, paddingVertical:15}} >{profile.position}</Text>
                </View>
            </View>
            <View style={{flex:0.5, width:"100%",justifyContent:"center", alignItems:"center"}} >
                <Text  style={{fontSize:20}}>Shift Type : {type}</Text>
                <Text style={{fontSize:20}} >Date: {home.day}-{home.month}-{home.year}</Text>
                <Text style={{fontSize:20}} >Client name: { home.home }</Text>
                <Text style={{fontSize:20}} >Client positon: {auth_pos}</Text>
                <Text style={{fontSize:20}} >Client Signature</Text>
                <Image
                    resizeMode={"contain"}
                    style={{  width:335, height:100, }}
                    source={{uri: sign}}
                />
                
            </View>
        </ScrollView>
    </View>
  )
}

export default Timesheet