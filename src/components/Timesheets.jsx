import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { baseUrl } from '../baseurl';

const sheets = [
    {
        "home":"The chase",
        "address":"4 Printers Ave, Watford",
        "type":"LONGDAY"
    },
    {
        "home":"The chase",
        "address":"4 Printers Ave, Watford",
        "type":"NIGHT"
    },
    {
        "home":"The chase",
        "address":"4 Printers Ave, Watford",
        "type":"LATE"
    },
    {
        "home":"The chase",
        "address":"4 Printers Ave, Watford",
        "type":"LONGDAY"
    },
    {
        "home":"The chase",
        "address":"4 Printers Ave, Watford",
        "type":"LONGDAY"
    },
    {
        "home":"The chase",
        "address":"4 Printers Ave, Watford",
        "type":"LONGDAY"
    },
    {
        "home":"The chase",
        "address":"4 Printers Ave, Watford",
        "type":"LONGDAY"
    },
]

function Timesheets({navigation, route}) {
    const [sheets, setSheets] = useState(null);
    useEffect(()=>{
        const {id} = route.params;
        axios.get(`${baseUrl}get-timesheets?id=${id}`, {headers:{
            "Content-Type":"application/json"
        }}).then(res=>{
            setSheets([...res.data])
            console.log(res.data, "sddsf")
        }).catch(e=>{
            console.log(e, "error")
        })
    }, [])
  return (
    <View style={{flex:1, backgroundColor:"white"}} >
        <ScrollView>
            {
                sheets?.map(sheet=>(
                    <View  style={{ display:"flex", flexDirection:"row", alignItems:"center", paddingHorizontal:25, paddingVertical:10}} >
                        <View style={{ elevation:1, backgroundColor:"#b3e6cc", padding:15, borderRadius:100}} >
                            <Text>{sheet.home.day}/{sheet.home.month}</Text>
                        </View>
                        <View style={{paddingLeft:20}} >
                        <Text style={{fontSize:18}} >{sheet.home.home}</Text>
                        <Text style={{fontSize:14}} >{sheet.type}</Text>
                        <Text style={{fontSize:15}} >Hemel Hempstead</Text>
                        </View>
                        <TouchableOpacity onPress={()=>navigation.navigate('timesheet', {profile:sheet.profile, shift:sheet.shiftname, home:sheet.home, type:sheet.type, auth_pos:sheet.auth_position, auth_name:sheet.auth_name, sign:sheet.sign})} style={{ elevation:1, backgroundColor:"#b3e6cc", padding:15, borderRadius:100, marginLeft:"auto"}} >
                            <Text>View</Text>
                        </TouchableOpacity>
                    </View>
                ))
            }
        </ScrollView>
    </View>
  )
}

export default Timesheets