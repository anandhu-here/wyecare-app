import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../baseurl'
import { basecolor } from '../../redux/constants'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import qs from 'qs'

const sendEmail = async (to, subject, body, options={}) =>{
    const {cc, bcc} = options;
    let url = `mailto:${to}`;
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });

    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);

}

function Invite() {
    const [homes, setHomes] = useState([])
    const {userInfo} = useSelector(state=>state.userLogin);
    const [email, setEmail] = useState('')
    useEffect(()=>{
        axios.get(`${baseUrl}users?shift_id=null&type=HOME`, {headers:{
            "Authorization":`Token ${userInfo.token}`
        }}).then(res=>{
            console.log(res.data, "anandhu")
            setHomes(res.data)
        }).catch(e=>{
            console.log(e)
        })
    }, [])
  return (
    <View style={{flex:1, backgroundColor:"white", alignItems:"center"}} > 
        <View style={{flex:0.4, alignItems:"center", backgroundColor:"white", justifyContent:"center", width:"95%", borderRadius:50}} >
            {
                homes.length>0?(
                    <View style={{justifyContent:"center", alignItems:"center", width:"90%"}}>
                        <Text style={{fontSize:18, textAlign:"center"}}>You can invite new homes by sending a link with your secret key</Text>
                        <View style={{width:"100%", height:"30%", flexDirection:"row", alignItems:"center", justifyContent:"space-evenly", marginTop:20,}} >
                        <TextInput
                            keyboardType="email-address"
                            style={{width:"80%", fontSize:19,fontWeight:"700", color:"white", textAlign:"center", backgroundColor:basecolor, height:"80%",  borderRadius:100, elevation:4}}
                            placeholder="Email"
                            value={email}
                            onChangeText={t=>setEmail(t)}
                            placeholderTextColor={"white"}
                        />
                        <TouchableOpacity onPress={()=>{
                            console.log("aandhuhuh")
                            sendEmail('anandhusathee@gmail.com', 'Invitation', 'Invitation').then(()=>{
                                console.log("succces")
                            }).catch(e=>{
                                console.log(e)
                            })
                        }} style={{height:"100%", alignItems:"center", justifyContent:"center"}} >
                            <MaterialCommunityIcons name="send-circle" size={24} color={basecolor} />
                        </TouchableOpacity>
                        </View>
                    </View>
                ):(
                    <View style={{justifyContent:"center", alignItems:"center", width:"90%"}} >
                        <Text style={{fontSize:18, color:"grey", fontWeight:"500"}}>Looks like you have no clients yet!</Text>
                        <Text style={{fontSize:18, color:"grey", fontWeight:"500", textAlign:"center"}}>Don't worry, you can invite clients to your profile by sending an email</Text>
                        <View style={{width:"100%", height:"30%", flexDirection:"row", alignItems:"center", justifyContent:"space-evenly", marginTop:20,}} >
                        <TextInput
                            keyboardType="email-address"
                            style={{width:"80%", fontSize:19,fontWeight:"700", color:"grey", paddingLeft:15, backgroundColor:"white", height:"80%",  borderRadius:100, elevation:4}}
                            placeholder="Email"
                            value={email}
                            onChangeText={t=>setEmail(t)}
                            placeholderTextColor={"grey"}
                        />
                        <TouchableOpacity onPress={()=>{
                            console.log("aandhuhuh")
                            sendEmail('anandhusathee@gmail.com', 'Invitation', 'Invitation').then(()=>{
                                console.log("succces")
                            }).catch(e=>{
                                console.log(e)
                            })
                        }} style={{height:"100%", alignItems:"center", justifyContent:"center"}} >
                            <MaterialCommunityIcons name="send-circle" size={45} color={basecolor} />
                        </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </View>
        <View style={{flex:0.6,  width:"100%", alignItems:"center", justifyContent:"center"}} >
            <Text style={{fontSize:18, color:"grey", fontWeight:"500",  textAlign:"center", marginVertical:30}} >Your clients</Text>
            <ScrollView style={{flex:1, width:"90%", }} contentContainerStyle={{ flex:1, justifyContent:"flex-start", borderTopWidth:1, borderColor:basecolor}} >
            {
                homes.map(home=>{
                    console.log(home)
                    return(
                       <TouchableOpacity style={{marginLeft:20, paddingVertical:10, width:"70%", backgroundColor:"white", elevation:4, borderRadius:100}}  >
                        <Text style={{paddingLeft:"10%"}} >{home.name}</Text>
                       </TouchableOpacity>
                    )
                })
            }
            </ScrollView>
        </View>
    </View>
  )
}

export default Invite