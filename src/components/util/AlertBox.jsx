import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Modal } from 'react-native'
import { basecolor } from '../../redux/constants'

function AlertBox({visible, setModalV, position, padding, text, buttons, type}) {
    
  return (
    <Modal 
        visible={visible}
        transparent={true}
        style={{flex:1}}
        animationType="slide"
    >
        <View style={{flex:1, backgroundColor:"rgba(52, 52, 52, 0)", alignItems:"center", justifyContent:position, paddingBottom:padding}} >
            <View style={{display:"flex",elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, height:"auto", backgroundColor:type==="error"?"#ff9999":"#99ffe6", width:"95%", borderRadius:10, alignItems:"center"}} >
                <View style={{flex:0, height:"auto", paddingVertical:"5%", justifyContent:"center", width:"92%", alignItems:"center"}} >
                    <Text style={{fontSize:19, textAlign:"center", color:type==="error"?"white":"grey", fontWeight:"800"}} >{text}</Text>
                </View>
                {buttons.length>0&&<View style={{flex:0,height:"auto", paddingVertical:"2%", width:"100%", flexDirection:"row", paddingHorizontal:'3%', justifyContent:"space-evenly", alignItems:"center"}} >
                    {
                        buttons.map(but=>(
                            <TouchableOpacity onPress={()=>but.onPress()} style={{backgroundColor:basecolor, borderRadius:100, paddingHorizontal:"10%",  paddingVertical:"4%", elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5,}} > 
                                <Text style={{color:"white", fontWeight:"700" }} >{but.text}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>}
            </View>
        </View>

    </Modal>
  )
}

export default AlertBox