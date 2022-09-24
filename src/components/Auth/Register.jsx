import { Link } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BackHandler, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { storeData } from '../../@async-storage'
import { LOGIN_SUCCESS } from '../../redux/types/auth'

import {Picker} from '@react-native-picker/picker';
import { basecolor } from '../../redux/constants'
import { DeviceType } from 'expo-device'
import { Platform } from 'react-native'

const types = [
    {
        name:"CARER"
    },
    {
        name:"AGENCY"
    },
    {
        name:"HOME"
    },
]

function Register({navigation}) {
    const [ email, setEmail ] = useState('')
    const [ password, setPass ] = useState('');
    const [ first_name, setFirstName ] = useState('');
    const [ last_name, setLastName ] = useState('');
    const [ page, setPage ] = useState(1);
    const [ type, setType ] = useState(null);
    const dispatch = useDispatch()
    
    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', ()=>{
           if(page === 1){
            setPage(0);
            return true
           }
        })
    }, [])

    let screen;
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
                    placeholder="Agency key"
                />
                </View>
            </>
            )
            break
        default:
            break;
    }

    console.log(Platform.OS, "cdsnlc dscds hcd hcj dchd h")
  return (
    <View style={{flex:1,justifyContent:"flex-end",  backgroundColor:basecolor,}} >
        <View style={{flex:0.8,borderTopLeftRadius:50,shadowOffset:{width:3, height:3},elevation:15, shadowColor:"grey", shadowOpacity:0.5,  borderTopRightRadius:50, backgroundColor:"white", paddingHorizontal:20, justifyContent:"space-around", alignItems:"center"}} >
            <Text style={{fontSize:30, position:"absolute", top:"5%", left:"10%", fontWeight:"bold",color:"grey"}} >WYECARE</Text>
            <View style={{flex:0.5, alignItems:"center", width:"100%", justifyContent:"space-evenly"}} >
            <Text style={{color:"grey", fontSize:19,fontWeight:"600" }} >Please select the user type that suits you</Text>
            <View style={[{width:"80%", alignItems:"center", justifyContent:"center",},Platform.OS==="android"&&{borderWidth:1, borderRadius:100, borderColor:basecolor}]} >
                <Picker
                    style={{width:"100%"}}
                    selectedValue={type}
                    onValueChange={(item, index)=>{
                        console.log(item,"cncncnc")
                        setType(item);
                    }}
                >
                    {
                        types.map(type=>(
                            <Picker.Item  label={type.name} value={type.name} />
                        ))
                    }
                </Picker>
            </View>
            {/* <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                <TouchableOpacity onPress={()=>navigation.navigate('signupc')} style={{ elevation:5, borderRadius:100, width:"40%", backgroundColor:"#e0ebeb", paddingHorizontal:"10%", paddingVertical:"5%", marginTop:"5%"}} >
                    <Text style={{color:"black"}} >CARER</Text>
                </TouchableOpacity>
            </View>
            <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                <TouchableOpacity onPress={()=>navigation.navigate('signupa')} style={{ elevation:5, borderRadius:100, width:"40%", backgroundColor:"#e0ebeb", paddingHorizontal:"10%", paddingVertical:"5%", marginTop:"5%"}} >
                    <Text style={{color:"black"}} >AGENCY</Text>
                </TouchableOpacity>
            </View>
            <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                <TouchableOpacity onPress={()=>navigation.navigate('signuph')} style={{ elevation:5, borderRadius:100, width:"40%", backgroundColor:"#e0ebeb", paddingHorizontal:"10%", paddingVertical:"5%", marginTop:"5%"}} >
                    <Text style={{color:"black"}} >HOME</Text>
                </TouchableOpacity>
            </View> */}
            <TouchableOpacity onPress={()=>{
                if(type === "CARER"){
                    navigation.navigate('signupc')
                }
                if(type === "HOME"){
                    navigation.navigate('signuph')
                }
                if(type === "AGENCY"){
                    navigation.navigate('signupa')
                }
            }} style={{paddingVertical:"5%", borderRadius:100, marginTop:"10%", paddingHorizontal:"10%", backgroundColor:basecolor}} >
                <Text style={{color:"white", fontWeight:'bold'}} >Continue</Text>
            </TouchableOpacity>
            <View style={{marginTop:"15%", marginRight:"auto"}} >
                <Text style={{fontSize:18, fontWeight:"700", color:"grey"}} >Already have an account?</Text>
                <Link style={{fontSize:20, color:basecolor, textDecorationLine:"underline"}} to="/login" >Login</Link>
            </View>
            </View>
        </View>

    </View>
  )
}

export default Register