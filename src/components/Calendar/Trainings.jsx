import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AlertBox from '../util/AlertBox';

function Trainings() {
  return (
    <ScrollView style={{ flex:0.3, paddingVertical:10}} contentContainerStyle={{    zIndex:1000, paddingTop:"5%", }} >
        <View style={{display:"flex", width:"100%", alignItems:"center",paddingTop:"5%" }} >
              <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}} >
                <Text style={{paddingVertical:"6%", fontSize:17, fontWeight:"500"}} >TRAININGS</Text>
                <TouchableOpacity style={{paddingHorizontal:'3%'}} >
                  <MaterialIcons name="my-library-add" size={24} color="black" />
                </TouchableOpacity>
              </View>
  
            </View>
            
    </ScrollView>
  )
}

export default Trainings