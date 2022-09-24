import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

function Invoice({navigation, route}) {
    const {userInfo} = useSelector(state=>state.userLogin);
    const {profile} = userInfo.user;
    const {home, total} = route.params
    console.log(total,home, "ppp")
  return (
    <View style={{flex:1, backgroundColor:"white", paddingTop:"4%",alignItems:"center", paddingHorizontal:"2%"}} >
        <View style={{flex:0.3, alignItems:"center"}} >
            <View style={{width:"100%", alignItems:"flex-start"}} >
                <Text style={{fontSize:32, color:"grey", fontWeight:"700"}} >INVOICE</Text>
            </View>
            <View style={{width:"100%", justifyContent:"center", alignItems:"center", paddingTop:"3%"}} >
                <Text style={{fontSize:20, color:"grey", fontWeight:"700"}} >{profile.name}</Text>
                <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >77 Parliament road</Text>
                <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >{profile.postcode}</Text>
                <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >United Kingdom</Text>
                <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >{profile.phone}</Text>
            </View>
            
        </View>
        <View style={{flex:0.3, alignItems:"center"}} >
            <View style={{width:"70%", justifyContent:"center", alignItems:"center"}} >
                <Text style={{fontSize:20, color:"grey", fontWeight:"700"}} >Bill to:</Text>
                <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >{home.name}</Text>
                <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >{home.address}</Text>
                <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >{home.postcode}</Text>
                <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >United Kingdom</Text>
                <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >{home.phone}</Text>
            </View>
            <View style={{width:"30%", justifyContent:"center", alignItems:"center", marginTop:15 }} >
                <Text style={{fontSize:18, fontWeight:"500", color:"grey"}} >Invoice: 00012</Text>
                <Text style={{fontSize:18, fontWeight:"500", color:"grey"}} >Invoice date:</Text>
                <Text style={{fontSize:18, fontWeight:"500", color:"grey"}} >Due date:  </Text>
            </View>
        </View>
        <View style={{flex:0.4, alignItems:"center"}} >
            <Text style={{fontSize:20, fontWeight:"700"}} >Service details</Text>
            <Text style={{fontSize:20, fontWeight:"500", color:"grey"}} >Total Timesheets: {total.LONGDAY + total.NIGHT + total.LATE + total.EARLY}</Text>
            {total.LONGDAY>0&&<Text style={{fontSize:19, fontWeight:"500",color:"grey"}} >Longdays: {total.LONGDAY}, (12x15 £/h) £{ 12*15*total.LONGDAY }</Text>}
            {total.NIGHT>0&&<Text style={{fontSize:19, fontWeight:"500",color:"grey"}} >nights: {total.NIGHT}, (12x15 £/h) £{ 12*15*total.NIGHT } </Text>}
            {total.LATE>0&&<Text style={{fontSize:19, fontWeight:"500",color:"grey"}} >late: {total.LATE} 6x15 £/h £{ 12*15*total.LATE }</Text>}
            {total.EARLY>0&&<Text style={{fontSize:19, fontWeight:"500",color:"grey"}} >early: {total.EARLY} 6x15 £/h £{ 12*15*total.EARLY }</Text>}

            <Text style={{fontSize:19, fontWeight:"600", color:"grey"}} >Total amount to be paid : £{ ((total.LONGDAY + total.NIGHT)*12*15) + ((total.LATE + total.EARLY)*6*15)  }</Text>
        </View>
    </View>
  )
}

export default Invoice