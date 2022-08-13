import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const demo = [
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

function Bookings() {
  return (
    <View style={{flex:1}} >
        <Text style={{fontSize:20, paddingHorizontal:20, paddingVertical:20}} >This week</Text>
        <View style={{flex:0.5}} >
        <ScrollView>
            {
                demo.map(item=>(
                    <View style={{ display:"flex", flexDirection:"row", alignItems:"center", paddingHorizontal:25, paddingVertical:10}} >
                        <View style={{ elevation:1, backgroundColor:"#b3e6cc", padding:15, borderRadius:100}} >
                            <Text>15/08</Text>
                        </View>
                        <View style={{paddingLeft:20}} >
                        <Text style={{fontSize:18}} >{item.home}</Text>
                        <Text style={{fontSize:14}} >{item.type}</Text>
                        <Text style={{fontSize:15}} >{item.address}</Text>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
        </View>
        <Text style={{fontSize:20, paddingHorizontal:20, paddingVertical:20}}>Later this month</Text>
    </View>
  )
}

export default Bookings