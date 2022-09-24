import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { basecolor } from '../../redux/constants';

function Manage() {
    const {userInfo} = useSelector(state=>state.userLogin);
    const {profile} = userInfo.user;
    console.log(profile.homes, "profile")
  return (
    <ScrollView contentContainerStyle={{flex:1, width:"100%", height:"100%", backgroundColor:"white", alignItems:"center",}}  >
        <View style={{alignItems:"center", marginTop:"10%"}} >
            <Text style={{color:"grey", fontSize:19, fontWeight:"500"}} >Your key</Text>
            <Text style={{paddingVertical:"2%", marginTop:5,elevation:5, color:"white",fontWeight:"700",fontSize:18, paddingHorizontal:"10%", backgroundColor:basecolor, borderRadius:100}} selectable={true} >{profile.key}</Text>
        </View>
        <View style={{width:"90%", alignItems:"center", marginTop:"5%", flexDirection:'row', justifyContent:"center"}} >
            <Text style={{color:"grey", fontSize:19, fontWeight:"500"}} >Your Clients:  </Text>
            <Text style={{paddingVertical:"1%", marginTop:5,elevation:5, color:"white",fontWeight:"700",fontSize:18, paddingHorizontal:"10%", backgroundColor:basecolor, borderRadius:100}} selectable={true} >{profile.staffs}</Text>
        </View>
        <View style={{width:"90%", alignItems:"center", marginTop:"5%", flexDirection:'row', justifyContent:"center"}} >
            <Text style={{color:"grey", fontSize:19, fontWeight:"500"}} >Your Staffs:  </Text>
            <Text style={{paddingVertical:"1%", marginTop:5,elevation:5, color:"white",fontWeight:"700",fontSize:18, paddingHorizontal:"10%", backgroundColor:basecolor, borderRadius:100}} selectable={true} >{profile.staffs}</Text>
        </View>
    </ScrollView>
  )
}

export default Manage