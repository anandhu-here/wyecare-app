import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

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

function Timesheets({navigation}) {
  return (
    <View style={{flex:1, backgroundColor:"white"}} >
        <ScrollView>
            {
                sheets.map(sheet=>(
                    <View  style={{ display:"flex", flexDirection:"row", alignItems:"center", paddingHorizontal:25, paddingVertical:10}} >
                        <View style={{ elevation:1, backgroundColor:"#b3e6cc", padding:15, borderRadius:100}} >
                            <Text>15/08</Text>
                        </View>
                        <View style={{paddingLeft:20}} >
                        <Text style={{fontSize:18}} >{sheet.home}</Text>
                        <Text style={{fontSize:14}} >{sheet.type}</Text>
                        <Text style={{fontSize:15}} >{sheet.address}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>navigation.navigate('timesheet')} style={{ elevation:1, backgroundColor:"#b3e6cc", padding:15, borderRadius:100, marginLeft:"auto"}} >
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