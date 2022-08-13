import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const not = [
  {
    "message":"The chase has added shifts"
  },
  {
    "message":"The chase has added shifts"
  },
  {
    "message":"The chase has added shifts"
  }
]


function Notification() {
  return (
    <View style={{flex:1}} >
        <ScrollView>
          <View style={{paddingVertical:20, paddingHorizontal:20}} >
            <Text style={{fontSize:20}} >This week</Text>
          </View>
          {
            not.map(item=>(
              <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:"90%", paddingVertical:15, paddingHorizontal:30}} >
                <Text style={{fontSize:17}} >{
                item.message}</Text>
                <Text>7m</Text>
              </View>
            ))
          }
        </ScrollView>
    </View>
  )
}

export default Notification