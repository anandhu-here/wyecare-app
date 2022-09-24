import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// const docs = [
//   {
//     id:1,
//     item:"Passport",
//     key:0
//   },{
//     id:2,
//     item:"BRP / ID",
//     key:1
//   },{
//     id:2,
//     item:"Work Permit Letter",
//     key:2
//   },{
//     id:4,
//     item:"DBS",
//     key:3
//   },{
//     id:5,
//     item:"National Insurance",
//     key:4
//   },
// ]
const docs = { 0:"Passport", 1:"BRP/ID", 2:"Work Permit Letter", 3:"DBS", 4:"National Insurance" }

const trainings = [
  {
    id:1,
    item:"Passport",

  },{
    id:2,
    item:"BRP / ID",

  },{
    id:2,
    item:"Work Permit Letter",

  },{
    id:4,
    item:"DBS",

  },{
    id:5,
    item:"National Insurance",

  },
]

import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { baseUrl } from '../baseurl';
import { basecolor, basecolor_staff } from '../redux/constants';
import AlertBox from './util/AlertBox';

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Docs from './Calendar/Docs';
import Trainings from './Calendar/Trainings';
import Background from './Calendar/Background';

const Tab = createMaterialTopTabNavigator()

function Profile() {
  const [ loading, setLoading ] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const userCntxt = useSelector(state=>state.userLogin);
  const {userInfo} = userCntxt;
  const [alert, setAlert] = useState(false);
  const [selectedDoc, setSD] = useState(null);
  const [docs_, setDocs] = useState([
    
  ])
  const [ sel, setSel ] = useState(0)

  useEffect(()=>{
    axios.get(`${baseUrl}get-docs?profile_id=${userInfo.user.profile.id}` ).then(res=>{
      setDocs(res.data)
    }).catch(e=>{
      console.log(e, "erro")
    })
  }, [])

  const uploadFile = async (data, name) =>{
    
    var formdata = new FormData();
    formdata.append('file', { uri:data.uri, type:data.mimeType, name:data.name} );
    formdata.append('key', 0);
    formdata.append('profile_id', userInfo.user.profile.id);
    formdata.append('doc_name', name)
    axios.post(`${baseUrl}upload-doc`, formdata, {headers:{
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    }}).then(res=>{
      var t = [...docs_];

      t.map(d=>{
        if(d.name === name){
          d.check.check = true;
        }  
      })
      setDocs([...t])
      setLoading(false)
      return true
    }).catch(e=>{
      return false
    })
  }
  const pickDocument = async (name) => {
    let result = await DocumentPicker.getDocumentAsync({type:"application/pdf"});
    if(result.type === "cancel"){

    }
    else{
      uploadFile(result, name).then(()=>{
        return true
      }).catch(e=>{
        return false
      })
    }
    
  };
  console.log(userInfo);

  return (
    <View style={{flex:1, backgroundColor:"white", justifyContent:"center", alignItems:"center"}} >
        {
          loading?(
            <ActivityIndicator  size={40}  />
          ):(
            <>
            <View style={{flex:0.45, alignItems:"center", paddingVertical:"4%", width:"100%"}} >
          
            <TouchableOpacity style={{padding:"2%", display:"flex", alignItems:"center",}} >
              <Avatar
                rounded
                source={require('./dp.jpg')}
                size={'large'}
                containerStyle={{elevation:5}}
              />
              <FontAwesome name="edit" size={18} color="black" />
            </TouchableOpacity>
            <Text style={{fontSize:20, fontWeight:"700", color:"grey"}} >{userInfo.user.profile.first_name} {userInfo.user.profile.last_name}</Text>
            <Text style={{paddingVertical:"2%", fontWeight:"600", color:"grey"}}>{userInfo.user.type}</Text>
            <View  style={{display:"flex",paddingVertical:"2%", width:"100%", justifyContent:"space-around",  flexDirection:"row", borderBottomWidth:2, borderBottomColor:"#e0ebeb"}}>
              <View style={{display:"flex", flexDirection:"row", }} >
                <Text style={{paddingRight:"2%",fontSize:16, color:basecolor, fontWeight:"700", }} >{userInfo.user.email}</Text>
                <FontAwesome name="edit" size={18} color="black" />
              </View>
              <View style={{display:"flex", flexDirection:"row"}} >
                <Text style={{paddingRight:"2%",fontSize:16, color:basecolor, fontWeight:"700"}} >+44 7435382817</Text>
                <FontAwesome name="edit" size={18} color="black" />
              </View>
            </View>
          </View>
          
            </>
          )
        }
        <View style={{flex:1, flexDirection:"row"}} >
            <Tab.Navigator style={{}}  screenOptions={{tabBarActiveTintColor:basecolor, tabBarInactiveTintColor:"grey", tabBarLabelStyle:{fontSize:14, fontWeight:"600"}}}  >
              <Tab.Screen name='DOCUMENTS' component={Docs} />
              <Tab.Screen name='TRAININGS' component={Trainings} />
              <Tab.Screen name='BACKGROUND' component={Background} />
            </Tab.Navigator>
        </View>
        

        {/* <Modal 
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          style={{flex:1}}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>

          
            <View style={{flex:1, width:"100%", backgroundColor:'rgba(52, 52, 52, 0.6)', justifyContent:"center", alignItems:"center"}}>
              <ScrollView style={{flex:0.5, width:"100%", }} contentContainerStyle={{ flex:0.5, flexGrow:1, backgroundColor:"white"}} >
                
              </ScrollView>
            </View>
        </Modal> */}
    </View>
  )
}

export default Profile