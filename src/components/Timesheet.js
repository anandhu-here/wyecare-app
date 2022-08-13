import React, { useEffect } from 'react'
import { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
function Timesheet() {
    const [sign, setSign] = useState('');
    useEffect(()=>{
        
    }, [])
  return (
    <View style={{flex:1, backgroundColor:"white"}} >
        <ScrollView style={{flex:1, }} contentContainerStyle={{flex:1,justifyContent:"center", alignItems:"center"}} >
            <View style={{flex:0.5, width:"100%", justifyContent:"center", alignItems:"center"}} >
                <View style={{flex:0.5, width:"100%", justifyContent:"center", alignItems:"center"}} >
                    <Text>The chase</Text>
                    <Text>4 Printers Ave, Watford</Text>
                    <Text>Phone: 07435382817</Text>
                </View>

                <View style={{flex:0.5}} >
                    <Text>Staff Name: Anandhu Satheesh </Text>
                    <Text>Agency name: Shan Care 24</Text>
                </View>
            </View>
            <View style={{flex:0.5, width:"100%",justifyContent:"center", alignItems:"center"}} >
                <Text>Shift Type : LONGDAY</Text>
                <Text>Date: 15/06/2022</Text>
                <Text>Client name: Kundi</Text>
                <Text>Client positon: Nurse</Text>
                <Text>Client Signature</Text>
                
            </View>
        </ScrollView>
    </View>
  )
}

export default Timesheet