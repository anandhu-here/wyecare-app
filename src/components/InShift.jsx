import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { Animated, Button, Easing, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import SignatureScreen from "react-native-signature-canvas";

const reviews = ["Terrible", "Bad", "OK", "Good", "Very Good"]
function InShift({navigation}) {
    const value0 = new Animated.Value(0);
    const value1 = new Animated.Value(0);
    const [signOpen, setOpen] = useState(false);
    const [staffRev, setRev] = useState('');
    const [signature, setSign] =useState(null);
    const ref = useRef();

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log(signature); // Callback from Component props
    setOpen(false);
    setSign(signature);
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
    ref.current.readSignature();
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
        
    }, [])
    // const translateY = value.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, 100],
    //   });

    const handleSubmit = () =>{
        AsyncStorage.setItem('@sign', signature).then(()=>{
            navigation.goBack()
        })
    }
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"white"}} >
        <View style={{flex:0.3, justifyContent:"center"}} >
            <Text style={{ textAlign:"center", fontSize:18}} >How was today in Chase?</Text>
            <AirbnbRating
                count={5}
                reviews={reviews}
                defaultRating={5}
                size={25}
                onFinishRating={ratingCompleted}
                />
            <TextInput
                style={{height:50, borderWidth:0.5, borderRadius:10, width:"100%", textAlign:"center", paddingHorizontal:20,marginTop:10 }}
                multiline={true}
                placeholder="Write a review ( Or feel free to raise a complaint)"
            />
        </View>
        {signOpen === false?<View style={[{flex:0.7,height:"100%", width:"100%", justifyContent:"center", borderTopLeftRadius:50, borderTopRightRadius:50, backgroundColor:"#b3e6cc", alignItems:"center"} ]} >
            <>
                {
                    signature?(
                        <View>
                            <Text style={{textAlign:"center"}} >The below signature will apear in your timesheet</Text>
                            <Image
                                resizeMode={"contain"}
                                style={{  width:335, height:114 }}
                                source={{uri: signature}}
                            />
                            
                            <TouchableOpacity onPress={()=>{
                                handleSubmit()
                            }} >
                                <Text style={{textAlign:"center"}} > Save </Text>
                            </TouchableOpacity>
                        </View>
                    ):(
                        <>
                            <Text style={{textAlign:"center", paddingVertical:"6%", fontSize:20}} >Sign your timesheet</Text>
                            <TouchableOpacity onPress={()=>setOpen(true)} style={{width:"50%", paddingHorizontal:"10%", paddingVertical:"5%", backgroundColor:"#f2f2f2", borderRadius:100}} >
                                <Text style={{textAlign:"center"}} >Sign</Text>
                            </TouchableOpacity>
                            <Text style={{textAlign:"center", paddingVertical:"6%", fontSize:20}} >No need of our timesheet?</Text>
                            <TouchableOpacity style={{width:"50%", paddingHorizontal:"10%", paddingVertical:"5%", backgroundColor:"#f2f2f2", borderRadius:100}}>
                                <Text style={{textAlign:"center"}}>Finish Job</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
            </>
        </View>
        :<View style={[{flex:0.7,height:"100%", width:"100%", justifyContent:"center", borderTopLeftRadius:50, borderTopRightRadius:50, backgroundColor:"#b3e6cc", alignItems:"center"} ]} >
            <SignatureScreen
                ref={ref}
                onEnd={handleEnd}
                onOK={handleOK}
                onEmpty={handleEmpty}
                onClear={handleClear}
                onGetData={handleData}
                autoClear={true}
                />
        </View>}
    </View>
  )
}

export default InShift