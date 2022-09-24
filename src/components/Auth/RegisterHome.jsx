import { Link } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerForPushNotificationsAsync } from '../../../App';
import { storeData } from '../../@async-storage';
import { LOGIN_SUCCESS } from '../../redux/types/auth';

function RegsisterHome({navigation}) {
    const [page, setPage] = useState(1);
    const [ email, setEmail ] = useState('')
    const [ password, setPass ] = useState('');
    const [ company, setCompany ] = useState('');
    const [phone, setPhone] = useState('');
    const [ city, setCity ] = useState('');
    const [key, setKey] = useState('');
    const [ ad1, setAd1 ] = useState('');
    const [ ad2, setAd2 ] = useState('');
    const [ post, setPost ] = useState('');
    const dispatch = useDispatch();
    const authCntx = useSelector(state=>state.userLogin);
    let screen;
    useEffect(()=>{
        // s
    }, [authCntx])

    const reg = (token) =>{
      axios.post("http://3.86.108.50:8000/api/signup", {email, password, type:"HOME", home_name:company, postcode:post, phone, push_token:token, address:`${ad1}/${ad2}/${city}`, key:key}, {headers:{
              'Content-Type':'application/json'
          }}).then(res=>{
              storeData(res.data).then(()=>{
                  dispatch({
                      type: LOGIN_SUCCESS,
                      payload: res.data,
                  });
                  navigation.navigate("homeh");
              })
          }).catch(e=>console.log(e))
    }
    const submit = () =>{
        var token = authCntx.push_token
        console.log(token, "tokenenen")
        if(token){
          reg(token)
        }
        else{
          registerForPushNotificationsAsync().then(token=>{
            console.log(token, "popopopopo")
            reg(token)
          }).catch(e=>console.log(e))
        }
        
    }
    const handlePost = (t) =>{
        setPost(t);

    }
    switch (page) {
        case 1:
            screen = (
                <>
                    <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                        <TextInput
                            style={styles.textinput}
                            multiline={false}
                            placeholder="Home Name"
                            value={company}
                            onChangeText={(t)=>setCompany(t)}
                        />
                    </View>
                    <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                        <TextInput
                            style={styles.textinput}
                            multiline={false}
                            value={post}
                            placeholder="Post code"
                            onChangeText={(t)=>handlePost(t)}
                        />
                    </View>
                    
                    <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                        <TextInput
                            style={styles.textinput}
                            multiline={false}
                            value={phone}
                            placeholder="Phone"
                            keyboardType="phone-pad"
                            onChangeText={(t)=>setPhone(t)}
                            onEndEditing={()=>{
                                
                            }}
                        />
                    </View>
                    
                    
                </>
            )
            break;
        case 2:
          screen=(
            <>
              <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                        <TextInput
                            style={styles.textinput}
                            multiline={false}
                            value={ad1}
                            placeholder="Address line 1"
                            onChangeText={(t)=>setAd1(t)}
                        />
                    </View>
                    <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                        <TextInput
                            style={styles.textinput}
                            multiline={false}
                            value={ad2}
                            placeholder="Address line 2"
                            onChangeText={(t)=>setAd2(t)}
                        />
                    </View>
                    <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                        <TextInput
                            style={styles.textinput}
                            multiline={false}
                            value={city}
                            placeholder="City"
                            onChangeText={(t)=>setCity(t)}
                        />
                    </View>
            </>
          )
          break;
        case 3:
            screen=(
                <>
               <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                    <TextInput
                        style={styles.textinput}
                        multiline={false}
                        placeholder="Email"
                        value={email}
                        onChangeText={(t)=>setEmail(t)}
                    />
                </View>
                <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                    <TextInput
                        style={styles.textinput}
                        multiline={false}
                        placeholder="Password"
                        textContentType="password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(t)=>setPass(t)}
                    />
                </View>
                <View style={{display:"flex", width:"100%", alignItems:"center"}} >
                    <TextInput
                        style={styles.textinput}
                        multiline={false}
                        placeholder="Agency Key"
                        value={key}
                        onChangeText={(t)=>setKey(t)}
                    />
                </View>
            </>
            )
            break
        default:
            break;
    }
  return (
    <View style={{ ...StyleSheet.absoluteFill, justifyContent:"center" }} >
        {
            screen
        }

    </View>
  )
}

export default RegsisterHome

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"
    },
    button:{
        backgroundColor:"white",
        marginHorizontal:20,
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10,
        shadowOffset:{width:2, height:2}
    },
    textinput:{
        width:'90%',
        paddingLeft:25,
        height:50,
        marginVertical:5,
        borderRadius:25,
        borderWidth:0.5,
        borderColor:'rgba(0,0,0,0.2)'

    }
})