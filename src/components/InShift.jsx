import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { Animated, Button, Easing, Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import SignatureScreen from "react-native-signature-canvas";
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import * as Fs from 'expo-file-system';

import { baseUrl } from '../baseurl';
import { basecolor } from '../redux/constants';

const reviews = ["Terrible", "Bad", "OK", "Good", "Very Good"]
function InShift({navigation, route}) {
    const value0 = new Animated.Value(0);
    const value1 = new Animated.Value(0);    
    const [signOpen, setOpen] = useState(false);
    const [staffRev, setRev] = useState('');
    const [signature, setSign] =useState(false);
    const [save, setSave] = useState(false);
    const [pos, setPos] = useState("HCP");
    const [auth_name, setAuthName] = useState('')
    const ref = useRef();
    const authCntx = useSelector(state=>state.userLogin);
    const dispatch = useDispatch()
    useEffect(()=>{
        
    }, [navigation])

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log(signature.uri); // Callback from Component props
    setOpen(false);
    setSign(signature);
    // const path = Fs.cacheDirectory+"sign.png";
    // Fs.writeAsStringAsync(
    //     path,
    //     signature.replace("data:image/png;base64,", ""),
    //     {encoding: Fs.EncodingType.Base64}
    // ).then(()=>Fs.getInfoAsync(path)).then(console.log(signature, 'p')).catch(console.error);
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    // ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
    console.log(data);
  };
    const duration = 5000;
    const  ratingCompleted = (rating)=>{
        setRev(reviews[rating-1])
    }
    useEffect(()=>{
        dispatch({type:"HANDLE_DRAWER", payload:false})
        return ()=>{
            dispatch({type:"HANDLE_DRAWER", payload:true})
        }
    }, [])
    // const translateY = value.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, 100],
    //   });

    const handleSubmit = () =>{

        setSave(true)
        AsyncStorage.setItem('@sign', signature).then(()=>{
            const { home_id, shift_id, type, profile_id } = route.params;
            console.log(route.params, "pp")
            // let form_data = new FormData();
            // form_data.append('image', signature);
            // form_data.append('shift_id',shift_id );
            // form_data.append('home_id',home_id );
            // form_data.append('profile_id',profile_id );
            axios.post(`${baseUrl}write-timesheet`, {image:signature, home_id, shift_id:shift_id,type:type, profile_id, auth_position:pos, auth_name}, {headers:{
                'content-type': 'application/json'
            }})
        }).then(res=>{
            navigation.goBack()
        }).catch(e=>console.log(e, "error"))
    }
  return (
    <KeyboardAvoidingView behavior="position" style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"white"}} >
        <ScrollView scrollEnabled={signature !== false} style={{flex:1}} contentContainerStyle={{flex:1, justifyContent:"center", alignItems:"center", width:"100%"}} >
        { signature===false&&<View style={{flex:0.5, justifyContent:"center"}} >
            <Text style={{ textAlign:"center", fontSize:18}} >How was today in Chase?</Text>
            <AirbnbRating
                count={5}
                reviews={reviews}
                defaultRating={5}
                size={25}
                onFinishRating={ratingCompleted}
                />
            <TextInput
                style={{height:"40%", borderWidth:0.5, borderRadius:10, width:"100%", textAlign:"center", paddingHorizontal:20,marginTop:10 }}
                multiline={true}
                placeholder="Write a review ( Or feel free to raise a complaint)"
            />
        </View>}
        {signOpen === false?<View style={[{flex:signature === false?0.5:1,height:"100%",marginBottom:5, width:"100%",backgroundColor:"white",  justifyContent:"center", borderRadius:10, alignItems:"center"} ]} >
            <>
                {
                    signature?(
                        <View style={{flex:1, justifyContent:"space-evenly", width:"100%", alignItems:"center"}} >
                            {/* <Text style={{textAlign:"center"}} >The below signature will apear in your timesheet</Text> */}
                            <Image
                                resizeMode={"contain"}
                                style={{  width:335, height:100, }}
                                source={{uri: signature}}
                            />
                            <TextInput 
                                value={auth_name}
                                onChangeText={text=>setAuthName(text)}
                                placeholder='Authorized name'
                                style={{backgroundColor:"white", width:"70%", paddingVertical:"5%", borderRadius:100, textAlign:"center"}}
                                
                            />
                            <View style={{height:"30%", width:"100%"}} >
                                <Picker
                                selectedValue={pos}
                                    onValueChange={(item, indx)=>{
                                        setPos(item)
                                    }}
                                    style={{flex:1, width:"100%", height:"55%", fontSize:15}}
                                >
                                    <Picker.Item label="HCP" value="HCP" style={{fontSize:15}} />
                                    <Picker.Item label="NURSE" value="NURSE" style={{fontSize:15}} />
                                </Picker>
                            </View>
                            
                            <TouchableOpacity style={{paddingHorizontal:"15%", paddingVertical:"5%",borderRadius:100, backgroundColor:"grey"}} onPress={()=>{
                                handleSubmit()
                            }} >
                                <Text style={{textAlign:"center", color:"white"}} > Save </Text>
                            </TouchableOpacity>
                                
                        </View>
                    ):(
                        <View style={{backgroundColor:"white",elevation:10,shadowOffset:{width:8, height:8}, shadowColor:"grey", shadowOpacity:0.7,flex:1, width:"100%", justifyContent:"center", alignItems:"center"}} >
                            <Text style={{textAlign:"center", paddingVertical:"6%", fontSize:20}} >Sign your timesheet</Text>
                            <TouchableOpacity onPress={()=>setOpen(true)} style={{width:"50%", paddingHorizontal:"10%", paddingVertical:"5%",  backgroundColor:basecolor, elevation:4, borderRadius:100}} >
                                <Text style={{textAlign:"center", color:"white"}} >Sign</Text>
                            </TouchableOpacity>
                            <Text style={{textAlign:"center", paddingVertical:"6%", fontSize:20,}} >No need of our timesheet?</Text>
                            <TouchableOpacity style={{width:"50%", paddingHorizontal:"10%", paddingVertical:"5%",  backgroundColor:basecolor, elevation:4, borderRadius:100}}>
                                <Text style={{textAlign:"center", color:"white"}}>Finish Job</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </>
        </View>
        :<View style={[{flex:0.8,height:"100%", width:"100%", justifyContent:"center", borderTopLeftRadius:50, borderTopRightRadius:50, backgroundColor:basecolor, alignItems:"center"} ]} >
            <SignatureScreen
                
                ref={ref}
                onEnd={handleEnd}
                onOK={handleOK}
                onEmpty={handleEmpty}
                onClear={handleClear}
                onGetData={handleData}
                autoClear={true}
                imageType={"image/png"}
                />
        </View>}
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default InShift;