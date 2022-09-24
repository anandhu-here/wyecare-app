import { Link } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { registerForPushNotificationsAsync } from '../../../App'
import { storeData } from '../../@async-storage'
import { basecolor } from '../../redux/constants'
import { LOGIN_SUCCESS } from '../../redux/types/auth'

function Login({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const dispatch = useDispatch();
    const userCntxt = useSelector(state=>state.userLogin);
    const [screen, setSN] = useState(0);

    const submit = () =>{
        const { push_token } = userCntxt;
        console.log(push_token, "pushhhh")
        if(push_token){
            axios.post("http://3.86.108.50:8000/api/login", {email, password, push_token:push_token}, {headers:{
                'Content-Type':'application/json'
            }}).then(res=>{
                storeData(res.data).then(()=>{
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data,
                    });
                    console.log(res.data.user.type)
                    switch (res.data.user.type) {
                        case "AGENT":
                            navigation.navigate("homea");
                            break;
                        case "CARER":
                            navigation.navigate("home");
                            break;
                        case "HOME":
                            navigation.navigate('homeh');
                        default:
                            
                            break;
                    }
                    // navigation.navigate("home");
                })
            }).catch(e=>console.log(e))
        }
        else{
            registerForPushNotificationsAsync().then(token=>{
                dispatch({type:"SET_PUSH_TOKEN", payload:token});
                Alert.alert("Try login again")
            }).catch(e=>{
                Alert.alert("Go to settings and enable notification for wuecare")
            })
        }
    }
    let sc;
    switch (screen) {
        case 0:
            sc=(
                <TextInput
                    style={{height:50, elevation:15,backgroundColor:"white",shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5,   borderRadius:50, width:"100%", textAlign:"center", paddingHorizontal:20 }}
                    multiline={false}
                    placeholder="Email"
                    
                    value={email}
                    keyboardType="email-address"
                    onChangeText={(text)=>setEmail(text)}
                    placeholderTextColor="grey"
                    
                />
            )
            break;
        case 1:
            sc=(
                <TextInput
                style={{height:50, elevation:5,backgroundColor:"white", borderRadius:100, width:"100%", textAlign:"center", paddingHorizontal:20 }}
                multiline={false}
                placeholder="Password"

                placeholderTextColor="grey"
                textContentType="password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text)=>setPass(text)}
                onEndEditing={()=>{
                    submit()
                }}
            />   
            )
            break;
    
        default:
            sc=(
                <TextInput
                    style={{height:50, elevation:5,backgroundColor:"white",shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5,   borderRadius:100, width:"95%", textAlign:"center", paddingHorizontal:20 }}
                    multiline={false}
                    placeholder="Email"
                    value={email}
                    keyboardType="email-address"
                    onChangeText={(text)=>setEmail(text)}
                    placeholderTextColor="grey"
                    
                />
            )
            break;
    }
  return (
    <ScrollView contentContainerStyle={{flex:1,justifyContent:"flex-end", backgroundColor:basecolor,}} >
        <KeyboardAvoidingView style={{justifyContent:'center'}} behavior="position" contentContainerStyle={{ shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5,  backgroundColor:"white", width:"100%", marginTop:"auto", borderTopRightRadius:50, borderTopLeftRadius:50, height:"90%",   paddingHorizontal:20, justifyContent:"center"}} >
            <Text style={{fontSize:30, color:"grey", fontWeight:"700", position:"absolute", top:"5%", left:"10%"}} >WYECARE</Text>
            <View style={{flex:0.6, justifyContent:"space-evenly"}} >

                <View style={{display:"flex", width:"100%", alignItems:"flex-start"}} >
                    {
                        sc
                    }
                </View>
                <TouchableOpacity onPress={()=>{
                    if(screen > 0){
                        setSN(screen-1);
                    }           
                    else{
                        setSN(screen+1);
                    }     
                }} style={{elevation:5, borderRadius:100, width:"30%", backgroundColor:basecolor, paddingHorizontal:"10%", paddingVertical:"5%", }} >
                    <Text style={{color:"white", textAlign:"center"}} >{screen>0?"Back":"Next"}</Text>
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:18, color:"white", fontWeight:"500"}} >Already have an account?</Text>
                    <Link style={{fontSize:20, color:basecolor}} to="/signup" >Signup</Link>
                </View>
            </View>
            {/* <View style={{display:"flex", width:"100%", alignItems:"flex-end"}} >
            <TextInput
                style={{height:50, elevation:5,backgroundColor:"white", borderRadius:100, width:"80%", textAlign:"center", paddingHorizontal:20 }}
                multiline={false}
                placeholder="Password"

                placeholderTextColor="grey"
                textContentType="password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text)=>setPass(text)}
            />
            </View> */}
            
        </KeyboardAvoidingView>

    </ScrollView>
  )
}

export default Login