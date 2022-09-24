import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import { baseUrl } from '../baseurl'
import { basecolor } from '../redux/constants';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { useEffect } from 'react';

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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -16,
      marginBottom: 16,
    },
    contentText: {
      textAlign: 'center',
    },
    btn: {
      borderRadius: 32,
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 8,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      alignSelf: 'stretch',
      backgroundColor: '#4CB748',
      marginTop: 16,
      minWidth: '45%',
      paddingHorizontal: 16,
    },
    btnc: {
      borderRadius: 32,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 8,
      alignSelf: 'stretch',
      backgroundColor: 'brown',
      marginTop: 16,
      minWidth: '45%',
      paddingHorizontal: 16,
    },
    btnText: {
      color: '#FFFFFF',
    },
  });

function Requests() {
    const userCntxt = useSelector(state=>state.userLogin);
    const [ req, setReq ] = useState([]);
    const [ visible, setVisible ] = useState(false);
    const [ ms, setMS ] = useState({agency_id:null, agency_name:'', profile_id:null, profile_name:''})
  const {userInfo} = userCntxt;
    useEffect(()=>{
        axios.get(`${baseUrl}get-ir?agency_id=${userInfo.user.profile.id}` ).then(res=>{
            setReq([...res.data]);
        }).catch(e=>{
    
        })
    }, [])
  return (
    <View style={{flex:1, backgroundColor:"white"}} >
        <ScrollView style={{}} contentContainerStyle={{flex:1, paddingTop:"15%", paddingLeft:"8%", width:"100%", height:"100%",}} >
            {
                req.map(r=>(
                    <TouchableOpacity onPress={()=>{
                        setMS({profile_name:r.name, agency_name:userInfo.user.profile.name, agency_id:userInfo.user.profile.id, profile_id:r.profileId});
                        setVisible(true);
                    }} style={{ width:"90%", elevation:10, backgroundColor:"white", paddingLeft:"5%",borderRadius:100, paddingVertical:"5%",}} >
                        <Text style={{fontSize:15}} >{r.name} has requested to join {userInfo.user.profile.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>

        <FancyAlert
        visible={visible}
        onRequestClose={()=>setVisible(false)}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: basecolor,
          borderRadius: 50,
          width: '100%',
        }}><Text>🤓</Text></View>}
        style={{ backgroundColor: 'white' }}
        
        >
            <View style={styles.content}>
            <Text style={styles.contentText}>{ms.profile_name} has requested to join {ms.agency_name}</Text>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"100%", alignItems:"center", marginTop:"5%"}} >
                <TouchableOpacity onPress={()=>{
                    setVisible(false);
                    setMS('');
                }} style={{width:"45%", backgroundColor:"brown", justifyContent:"center", alignItems:"center", paddingVertical:"2%", borderRadius:100}} >
                    <Text>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    axios.post(`${baseUrl}ir-accept`, {agency_id:ms.agency_id, id:ms.profile_id}, {headers:{
                        "Content-Type":"application/json"
                    }}).then(res=>{
                        console.log(res.data)
                    }).catch(e=>{   
                        console.log(e)
                    })
                }} style={{width:"45%", backgroundColor:basecolor, justifyContent:"center", alignItems:"center", paddingVertical:"2%", borderRadius:100}} >
                    <Text>ACCEPT</Text>
                </TouchableOpacity>
            </View>
            </View>
        </FancyAlert>
        
    </View>
  )
}

export default Requests