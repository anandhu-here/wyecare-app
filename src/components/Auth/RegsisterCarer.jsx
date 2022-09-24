import { Link } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerForPushNotificationsAsync } from '../../../App';
import { storeData } from '../../@async-storage';
import { LOGIN_SUCCESS } from '../../redux/types/auth';

function RegsisterCarer({navigation}) {
    const [page, setPage] = useState(1);
    const [ email, setEmail ] = useState('')
    const [ key, setKey ] = useState('');
    const [ password, setPass ] = useState('');
    const [ first_name, setFirstName ] = useState('');
    const [ last_name, setLastName ] = useState('');
    const authCntx = useSelector(state=>state.userLogin);
    useEffect(()=>{}, [])
    const dispatch = useDispatch();
    let screen;
    const submit = () =>{
        console.log(authCntx.push_token,email, password, key, first_name, last_name, "kkkkkk");
        if(authCntx.push_token === undefined){
            registerForPushNotificationsAsync().then((token)=>{

                console.log(token, "tookkkkku")
                dispatch({type:"SET_PUSH_TOKEN", payload:token});
                axios.post("http://3.86.108.50:8000/api/signup", {email, password, type:"CARER", first_name, last_name, push_token:token, key:key}, {headers:{
                    'Content-Type':'application/json'
                }}).then(res=>{
                    storeData(res.data).then(()=>{
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: res.data,
                        });
                        navigation.navigate("home");
                    })
                }).catch(e=>console.log(e))
            }).catch(e=>{
                console.log("error")
            })
        }
        else{
            axios.post("http://3.86.108.50:8000/api/signup", {email, password, type:"CARER", first_name, last_name, push_token:authCntx.push_token, key:key}, {headers:{
                'Content-Type':'application/json'
            }}).then(res=>{
                storeData(res.data).then(()=>{
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data,
                    });
                    navigation.navigate("home");
                })
            }).catch(e=>console.log(e))
        }
    }
    switch (page) {
        case 1:
            screen = (
                <>
                    <View style={{display:"flex", width:"100%", alignItems:"flex-start"}} >
                        <TextInput
                            style={{height:50, elevation:5,backgroundColor:"white", borderRadius:100, width:"80%", textAlign:"center", paddingHorizontal:20 }}
                            multiline={false}
                            placeholder="First Name"
                            value={first_name}
                            onChangeText={(t)=>setFirstName(t)}
                        />
                    </View>
                    <View style={{display:"flex", width:"100%", alignItems:"flex-end"}} >
                        <TextInput
                            style={{height:50, elevation:5,backgroundColor:"white", borderRadius:100, width:"80%", textAlign:"center", paddingHorizontal:20 }}
                            multiline={false}
                            value={last_name}
                            placeholder="Last name"
                            onChangeText={(t)=>setLastName(t)}
                        />
                    </View>
                    
                    
                </>
            )
            break;
        case 2:
            screen=(
                <>
               <View style={{display:"flex", width:"100%", alignItems:"flex-start"}} >
                    <TextInput
                        style={{height:50, elevation:5,backgroundColor:"white", borderRadius:100, width:"80%", textAlign:"center", paddingHorizontal:20 }}
                        multiline={false}
                        placeholder="Email"
                        value={email}
                        onChangeText={(t)=>setEmail(t)}
                    />
                </View>
                <View style={{display:"flex", width:"100%", alignItems:"flex-end"}} >
                    <TextInput
                        style={{height:50, elevation:5,backgroundColor:"white", borderRadius:100, width:"80%", textAlign:"center", paddingHorizontal:20 }}
                        multiline={false}
                        placeholder="Password"
                        textContentType="password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(t)=>setPass(t)}
                    />
                </View>
                <View style={{display:"flex", width:"100%", alignItems:"flex-start"}} >
                <TextInput
                    style={{height:50, elevation:5,backgroundColor:"white", borderRadius:100, width:"80%", textAlign:"center", paddingHorizontal:20 }}
                    multiline={false}
                    value={key}
                    onChangeText={(text)=>setKey(text)}
                    placeholder="Agency key"
                />
                </View>
            </>
            )
            break
        default:
            break;
    }
  return (
    <View style={{flex:1,justifyContent:"center", backgroundColor:"white", }} >
        <View style={{flex:0.7,paddingHorizontal:20, justifyContent:"space-around",}} >
            <Text style={{fontSize:30}} >WYECARE</Text>
            {
                screen
            }

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
        </View>

    </View>
  )
}

export default RegsisterCarer