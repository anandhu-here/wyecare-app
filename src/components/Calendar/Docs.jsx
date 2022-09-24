import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import { baseUrl } from '../../baseurl';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AlertBox from '../util/AlertBox';
import { basecolor } from '../../redux/constants';
import * as DocumentPicker from 'expo-document-picker';

function Docs() {
    const [ loading, setLoading ] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const userCntxt = useSelector(state=>state.userLogin);
    const {userInfo} = userCntxt;
    const [alert, setAlert] = useState(false);
    const [selectedDoc, setSD] = useState(null);
    const [docs_, setDocs] = useState([
        
    ])
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
  return (
    <ScrollView style={{ flex:1,}} contentContainerStyle={{ flex:1, backgroundColor:"white", zIndex:1000 }}>
        <View style={{display:"flex", width:"100%", alignItems:"center",paddingTop:"5%" }} >
            
            <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignItems:"center"}} >
            {
                docs_.map(doc=>{
                return(
                    <TouchableOpacity key={doc.id} onPress={()=>{
                    if(!doc.check.check){
                        setLoading(true)
                        pickDocument(doc.name).then(v=>{
                        
                        }).catch(e=>{
                            
                        })
                    }
                    else{
                        setSD(doc.check.id)
                        setAlert(true)
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
        <AlertBox
            visible={alert} 
            setModalV={setAlert} 
            position={"flex-end"} 
            padding={"15%"} 
            text="You can update or delete your documents you have shared"
            buttons={[
              {
                text:"Cancel",
                onPress: () =>setAlert(false)
              },
              {
                text:"Delete",
                onPress: () => {
                  setLoading(true);
                  axios.post(`${baseUrl}delete-doc`, {doc_id:selectedDoc}, {headers:{
                    "Content-Type":"application/json"
                  }}).then(()=>{
                    
                    setLoading(false);
                    setAlert(false)
                    var t = [...docs_];
                    t.map(d=>{
                      if(d.check.id === selectedDoc){
                        d.check.check = false;
                      }
                    })
                    setDocs(t)
                    setSD(null);
                  }).catch(e=>{
                    console.log("Errors")
                  })
                }
              }
            ]}
            />
            
    </ScrollView>
  )
}

export default Docs