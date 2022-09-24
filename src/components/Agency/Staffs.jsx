import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../baseurl';

function Staffs({navigation}) {
    const [ users, setUsers ] = useState([]);
    const userCntxt = useSelector(state=>state.userLogin);
    const {userInfo} = userCntxt;
    const dispatch = useDispatch()
    useEffect(()=>{
        axios.get(`${baseUrl}get-carers?type=CARER`, {headers:{
            'Authorization':`Token ${userInfo.token}`
        }}).then(res=>{
            console.log(res.data, "staffs");
            setUsers([...res.data])
        }).catch(e=>{
            console.log(e, "error")
        })
    }, [])
  return (
    <ScrollView contentContainerStyle={{flex:1, width:"100%", height:"100%",backgroundColor:'white', paddingLeft:"10%", paddingTop:"10%"}} >
        
        {
            users.map(u=>(
                <TouchableOpacity onPress={()=>{
                    dispatch({type:"FETCH_PROFILE" , payload:u});
                    navigation.navigate('sprofile', {profile:u});
                }} style={{width:"80%", paddingVertical:"3%", backgroundColor:'white', borderRadius:100, elevation:5, paddingLeft:15}} >
                    <Text style={{fontSize:18, color:"grey"}} >{u.first_name} {u.last_name}</Text>
                </TouchableOpacity>
            ))
        }
    </ScrollView>
  )
}

export default Staffs