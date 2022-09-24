import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AlertBox from '../util/AlertBox';
import * as DocumentPicker from 'expo-document-picker';
import { baseUrl } from '../../baseurl';
import { basecolor } from '../../redux/constants';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import WebView from 'react-native-webview';
// import Pdf from 'react-native-pdf';
import PDFReader from 'rn-pdf-reader-js'
import PdfReader from 'rn-pdf-reader-js';
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
    alert: {
      backgroundColor: '#EEEEEE',
    },
    icon: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C3272B',
      width: '100%',
    },
    content: {
      display: 'flex',
      width:"100%",
      height:Dimensions.get("screen").height/1.7,
    },
})


function Docs() {
    const [ loading, setLoading ] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const cal_agency = useSelector(state=>state.cal_agency);
    const [alert, setAlert] = useState(false);
    const [uri, setU] = useState(null)
    const [selectedDoc, setSD] = useState(null);
    const [docs_, setDocs] = useState([
        
    ])
    useEffect(()=>{
        console.log(cal_agency, "cal_agency")
        axios.get(`${baseUrl}get-docs?profile_id=${cal_agency.profile.id}` ).then(res=>{
            console.log("res.data", res.data)
          setDocs(res.data)
        }).catch(e=>{
          console.log(e, "erro")
        })
      }, [])
    
     
  return (
    <ScrollView style={{ flex:1,}} contentContainerStyle={{ flex:1, backgroundColor:"white", zIndex:1000 }}>
        <View style={{display:"flex", width:"100%", alignItems:"center",paddingTop:"5%" }} >
            
            <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignItems:"center"}} >
            {
                docs_.map(doc=>{
                return(
                    <TouchableOpacity key={doc.id} onPress={()=>{
                        console.log("http://3.86.108.50:8000"+doc.check.file, "iop")
                        if(doc.check.file){
                            setAlert(true);
                            setU(doc.check.file)
                        }
                    }}  style={{paddingVertical:"3%", paddingHorizontal:"20%", justifyContent:"center", backgroundColor:doc.check.check?basecolor:"white",elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, marginTop:10, borderRadius:100}} >
                    <Text style={{color:doc.check.check?"white":"grey", fontSize:15, fontWeight:"600"}} >{doc.name}</Text>

                    {doc.check.check?<MaterialIcons style={{position:"absolute", right:"10%"}} name="check-circle" size={24} color="white" />:(
                        <MaterialIcons style={{position:"absolute", right:"10%"}} name="stop-circle" size={24} color="#cc0000" />
                    )}
                    </TouchableOpacity>
                )
                })
            }
            </View>
        </View>
        
        <FancyAlert
        visible={alert}
        onRequestClose={()=>setAlert(false)}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: basecolor,
          borderRadius:100,
          width: '100%',
        }}><Text style={{color:"white", fontSize:20, fontWeight:"700"}} >W</Text></View>}
            style={{ backgroundColor: "white"}}
            
            >
                <View style={styles.content} >
                    <PdfReader
                        style={{width:"100%", height:400}}
                        source={{uri:"http://3.86.108.50:8000"+uri}}
                    />
                    <View style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"100%",paddingVertical:"10%", alignItems:"center", marginTop:"5%"}} >
                        <TouchableOpacity onPress={()=>{
                            setAlert(!alert)
                        }} style={{width:"45%", backgroundColor:"#ff6666", justifyContent:"center", alignItems:"center", paddingVertical:"2%", borderRadius:100}} >
                            <Text style={{color:"white"}} >OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            
                        }} style={{width:"45%", backgroundColor:basecolor, justifyContent:"center", alignItems:"center", paddingVertical:"2%", borderRadius:100}} >
                            <Text style={{color:"white"}} >DOWNLOAD</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </FancyAlert>
            
    </ScrollView>
  )
}

export default Docs