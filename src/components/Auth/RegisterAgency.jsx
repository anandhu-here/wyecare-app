import { Link } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerForPushNotificationsAsync } from '../../../App';
import { storeData } from '../../@async-storage';
import { basecolor } from '../../redux/constants';
import { LOGIN_SUCCESS } from '../../redux/types/auth';

function RegsisterAgency({navigation}) {
    const [page, setPage] = useState(1);
    const [ email, setEmail ] = useState('')
    const [ password, setPass ] = useState('');
    const [ company, setCompany ] = useState('');
    const [phone, setPhone] = useState('');
    const [ last_name, setLastName ] = useState('');
    const [ post, setPost ] = useState('');
    const dispatch = useDispatch();
    const authCntx = useSelector(state=>state.userLogin);
    let screen;
    useEffect(()=>{
        console.log(authCntx.push_token, "kkkkkk")
    }, [authCntx])
    const submit = () =>{
        
        if(authCntx.push_token){
            axios.post("http://3.86.108.50:8000/api/signup", {email, password, type:"AGENT", company, postcode:post, phone, push_token:authCntx.push_token}, {headers:{
            'Content-Type':'application/json'
        }}).then(res=>{
            storeData(res.data).then(()=>{
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
                navigation.navigate("homea");
            })
        }).catch(e=>console.log(e))
        }
        else{
            registerForPushNotificationsAsync().then(token=>{
                axios.post("http://3.86.108.50:8000/api/signup", {email, password, type:"AGENT", company, postcode:post, phone, push_token:token}, {headers:{
                        'Content-Type':'application/json'
                    }}).then(res=>{
                        storeData(res.data).then(()=>{
                            dispatch({
                                type: LOGIN_SUCCESS,
                                payload: res.data,
                            });
                            navigation.navigate("homea");
                        })
                    }).catch(e=>console.log(e))
            })
        }
    }
    const handlePost = (t) =>{
        setPost(t);

    }
    switch (page) {
        case 1:
            screen = (
                <>
                    <View style={{display:"flex", width:"100%", alignItems:"flex-start", marginVertical:"2%"}} >
                        <TextInput
                            style={{height:50, elevation:5,backgroundColor:"#e0ebeb", borderRadius:100, width:"80%", textAlign:"center", paddingHorizontal:20 }}
                            multiline={false}
                            placeholder="Company Name"
                            value={company}
                            onChangeText={(t)=>setCompany(t)}
                        />
                    </View>
                    <View style={{display:"flex", width:"100%", alignItems:"flex-end", marginVertical:"2%"}} >
                        <TextInput
                            style={{height:50, elevation:5,backgroundColor:"#e0ebeb", borderRadius:100, width:"80%", textAlign:"center", paddingHorizontal:20 }}
                            multiline={false}
                            value={post}
                            placeholder="Post code"
                            onChangeText={(t)=>handlePost(t)}
                        />
                    </View>
                    <View style={{display:"flex", width:"100%", alignItems:"flex-start", marginVertical:"2%"}} >
                        <TextInput
                            style={{height:50, elevation:5,backgroundColor:"#e0ebeb", borderRadius:100, width:"80%", textAlign:"center", paddingHorizontal:20 }}
                            multiline={false}
                            value={phone}
                            placeholder="Phone"
                            keyboardType="phone-pad"
                            onChangeText={(t)=>setPhone(t)}
                        />
                    </View>
                    
                    
                </>
            )
            break;
        case 2:
            screen=(
                <>
               <View style={{display:"flex", width:"100%", alignItems:"flex-start", marginVertical:"2%"}} >
                    <TextInput
                        style={{height:50, elevation:5,backgroundColor:"#e0ebeb", borderRadius:100, width:"80%", textAlign:"center", paddingHorizontal:20 }}
                        multiline={false}
                        placeholder="Email"
                        value={email}
                        onChangeText={(t)=>setEmail(t)}
                    />
                </View>
                <View style={{display:"flex", width:"100%", alignItems:"flex-end", marginVertical:"2%"}} >
                    <TextInput
                        style={{height:50, elevation:5,backgroundColor:"#e0ebeb", borderRadius:100, width:"80%", textAlign:"center", paddingHorizontal:20 }}
                        multiline={false}
                        placeholder="Password"
                        textContentType="password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(t)=>setPass(t)}
                    />
                </View>
                
            </>
            )
            break
        default:
            break;
    }
  return (
    <ScrollView contentContainerStyle={{flex:1,justifyContent:"center", backgroundColor:basecolor, }} >
        <KeyboardAvoidingView behavior="padding" style={{flex:0.8, borderTopRightRadius:50, borderTopLeftRadius:50, paddingHorizontal:20, backgroundColor:"white", marginTop:"auto", justifyContent:"center",}} >
            <Text style={{fontSize:30,  color:"grey"}} >WYECARE</Text>
            <View style={{ height:"60%", justifyContent:"center"}} >
                {
                    screen
                }
            </View>

            {
                page < 2?(
                    <TouchableOpacity onPress={()=>{
                        setPage(page+1)
                    }} style={{elevation:5, borderRadius:100, width:"30%", backgroundColor:"purple", paddingHorizontal:"10%", paddingVertical:"5%", marginTop:"5%", marginLeft:"auto"}} >
                        <Text style={{color:"white", textAlign:"center"}} >NEXT</Text>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity onPress={()=>{
                        submit()
                    }} style={{elevation:5, borderRadius:100, width:"50%", backgroundColor:"purple", paddingHorizontal:"10%", paddingVertical:"5%", marginTop:"5%", marginLeft:"auto"}} >
                        <Text style={{color:"white", textAlign:"center"}} > Register </Text>
                    </TouchableOpacity>
                )
            }
            <View>
                <Text style={{fontSize:15}} >Already have an account?</Text>
                <Link style={{fontSize:20, color:"purple"}} to="/login" >Login</Link>
            </View>
        </KeyboardAvoidingView>

    </ScrollView>
  )
}

export default RegsisterAgency