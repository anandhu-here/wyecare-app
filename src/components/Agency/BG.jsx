import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { basecolor } from '../../redux/constants';

function Background() {
    const cal_agency = useSelector(state=>state.cal_agency);
    const {profile} = cal_agency
    var s = profile?.bg.filter(b=>b.employee_id === profile?.agent.id)[0].start_date
    var e;
    
    console.log(profile, "mopommop")
  return (
    <ScrollView style={{ flex:1}} contentContainerStyle={{ flex:1, backgroundColor:"white", zIndex:1000, alignItems:"center" }} >
        <View style={{paddingVertical:"5%", alignItems:"center"}}  >
            <Text style={{fontSize:18, color:basecolor, fontWeight:"700"}} >CURRENT EMPLOYER</Text>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center",}} >
                <Text style={{paddingVertical:"3%", fontSize:18, fontWeight:'700', color:"grey"}} >{profile.agent.name}</Text>
                <MaterialIcons name="verified-user" size={24} color={basecolor} style={{paddingLeft:"3%"}}/>
            </View>
            {
                s?(
                    <Text style={{fontSize:16, fontWeight:"600", color:"grey"}} >{s} - PRESENT</Text>
                ):(
                    <Text style={{textAlign:"center", fontSize:16, fontWeight:'700', color:"grey"}} > {profile.first_name} hasn't covered any shifts yet </Text>
                )
            }
            <Text style={{fontSize:18, color:basecolor, fontWeight:"700", paddingTop:"5%"}} >EMPLOYEMENT HISTORY</Text>
            {
                profile.bg.map(b=>{
                    if(b.employee_id !== profile.agent.id){
                        return(
                            <View style={{width:"100%", justifyContent:"center", alignItems:"center"}} >
                                <View style={{display:"flex", flexDirection:"row", alignItems:"center",}} >
                                    <Text style={{paddingVertical:"3%", fontSize:18, fontWeight:'700', color:"grey"}} >{b.employee_name}</Text>
                                    <MaterialIcons name="verified-user" size={24} color={basecolor} style={{paddingLeft:"3%"}}/>
                                </View>
                                {
                                    b.start_date?(
                                        <Text style={{fontSize:16, fontWeight:"700", color:"grey"}} >{b.start_date} - {b.end_date}</Text>
                                    ):(
                                        <Text style={{textAlign:"center", fontSize:16, fontWeight:'700', color:"grey"}} > {profile.first_name} hasn't covered any shift </Text>
                                    )
                                }
                            </View>
                        )
                    }
                })
            }
        </View>
    </ScrollView>
  )
}

export default Background