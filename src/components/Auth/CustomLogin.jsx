import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ActionSheetIOS, Dimensions, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

import {Asset} from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { basecolor } from '../../redux/constants';

import Animated, {concat, Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
const { width, height } = Dimensions.get('screen');
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import RegsisterHome from './RegisterHome';
import RegA from './RegA';

const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolateNode,
    Extrapolate
  } = Animated;
const cacheImages = (images) =>{
    return images.map(image=>{
        if(typeof image === "string"){
            return Image.prefetch(image);
        }
        else{
            return Asset.fromModule(image).downloadAsync();
        }
    })
}

function runTiming(clock, value, dest) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0)
    };
  
    const config = {
      duration: 1000,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease)
    };
  
    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]),
      timing(clock, state, config),
      cond(state.finished, debug('stop clock', stopClock(clock))),
      state.position
    ]);
  }

  const types = {0:"CARER", 1:"HOME", 2:"AGENCY"}

  const Register = ({rs, closeRotationStyle, imagePos, formAnimationStyle, setSc}) =>{
    const [ type, setType ] = useState(rs);
    const [ screen, setScreen ] = useState(0);
    const [ btntype, setbt ] = useState(0);

    useEffect(()=>{
        setbt("CLOSE")
    },[setScreen])

    const showA = () =>{
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options:[
                    "CARER",
                    "HOME",
                    "AGENCY"
                ],
                userInterfaceStyle:"dark"
            },
            buttonIndex=>{
                setType(buttonIndex)
            }
        )
    }
    let page;
    switch (screen) {
        case 0:
           page = (
            <RegA />
           )
        
        case 1:
            page=(
                <>
                    <RegsisterHome />
                </>
            )
            break;
        default:
            
            break;
    }
    return(
        <Animated.View style={[{...StyleSheet.absoluteFill, justifyContent:"center", alignItems:"center"}, formAnimationStyle]} >
            {screen===0?<Animated.View style={[
                {position:"absolute",
                width:40,
                bottom:height/1.23,
                height:40,
                backgroundColor:"#ff8000",
                borderRadius:100,
                justifyContent:"center",
                alignItems:"center",},
                closeRotationStyle
            ]} >
                <TouchableOpacity style={{...StyleSheet.absoluteFill, justifyContent:"center", alignItems:"center"}} onPress={()=>{
                    setSc(0);
                    imagePos.value = 1;
                    setScreen(0)
                    
                }}  >
                    <Animated.Text style={{fontSize:19, fontWeight:'bold', color:"white"}} >X</Animated.Text>
                </TouchableOpacity>
            </Animated.View>
            :<Animated.View style={[
                {position:"absolute",
                width:40,
                bottom:height/3.2,
                height:40,
                backgroundColor:"#ff8000",
                borderRadius:100,
                justifyContent:"center",
                alignItems:"center",},
            ]} >
                <TouchableOpacity style={{...StyleSheet.absoluteFill, justifyContent:"center", alignItems:"center"}} onPress={()=>{
                    
                    if(screen > 0){
                        setScreen(screen-1);
                    }
                    
                }}  >
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            </Animated.View>}
            <View style={{width:"80%"}} >
                    {
                    Platform.OS === "ios"?(
                        <View style={{...StyleSheet.absoluteFill, justifyContent:"space-evenly", alignItems:"center"}} >
                            {
                                type===null?(
                                    <Pressable onPress={()=>{
                                        showA()
                                    }} style={{height:50, backgroundColor:"#ff8000", borderRadius:100, justifyContent:"center", alignItems:"center", paddingHorizontal:15}} >
                                        <Text style={{fontSize:17, fontWeight:"bold", color:"white"}} >Select User Type</Text>
                                    </Pressable>
                                ):(
                                    <>
                                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}} >
                                            <Text style={{fontSize:17, fontWeight:"500", paddingHorizontal:"2%"}} >You are a </Text>
                                            <Pressable onPress={()=>{
                                                showA()
                                            }} style={{height:50, borderWidth:1, borderRadius:100, borderColor:"#ff8000", justifyContent:"center", alignItems:"center", paddingHorizontal:15}} >
                                            <Text style={{fontSize:17, fontWeight:"bold", color:"grey"}} >{types[type]}</Text>
                                            </Pressable>
                                            <Text style={{fontSize:17, fontWeight:"500", paddingHorizontal:"2%"}} >User</Text>
                                        </View>
                                        
                                    </>
                                )
                            }
                        </View>
                    ):(
                        <View style={{...StyleSheet.absoluteFill, justifyContent:"center", alignItems:"center"}} >
                            <Text>Select a user type</Text>
                            <Picker
                            selectedValue={type}
                            onValueChange={(item, index)=>{
                                setType(item)
                            }}
                                style={{
                                    width:"60%"
                                }}
                            >
                                {
                                    Object.keys(types).map(k=>(
                                        <Picker.Item label={types[k]} value={types[k]} />
                                    ))
                                }
                            </Picker>
                        </View>
                    )
                }
                </View>

        </Animated.View>
    )
  }

  const Login = ({closeRotationStyle, imagePos, formAnimationStyle}) =>{
    return(
        <Animated.View style={[{...StyleSheet.absoluteFill, justifyContent:"center", alignItems:"center"}, formAnimationStyle]} >
            <Animated.View style={[
                {position:"absolute",
                width:40,
                bottom:height/3.2,
                height:40,
                backgroundColor:"#ff8000",
                borderRadius:100,
                justifyContent:"center",
                alignItems:"center",},
                closeRotationStyle
            ]} >
                <TouchableOpacity style={{...StyleSheet.absoluteFill, justifyContent:"center", alignItems:"center"}} onPress={()=>{
                    imagePos.value = 1;
                    
                }}  >
                    <Animated.Text style={{fontSize:19, fontWeight:'bold', color:"white"}} >X</Animated.Text>
                </TouchableOpacity>
            </Animated.View>
            <TextInput
                      
                placeholder='EMAIL'
                style={{...styles.textinput,}}
                placeholderTextColor="grey"
                
            />
            <TextInput  
                placeholder='PASSWORD'
                style={styles.textinput}
                placeholderTextColor="grey"
            />
            <Pressable onPress={()=>{
                alert("helloo")
            }} >
            <Animated.View
                style={{
                    ...styles.button,
                    height:45,
                    width:150,
                    backgroundColor:"#ff8000"
                }}
            >
                <Text style={{fontSize:20, fontWeight:"bold", color:"white"}} >SIGN IN</Text>
            </Animated.View>
            </Pressable>
        </Animated.View>
    )
  }


 export const CustomLogin =() =>{
    const [ screen, setScreen ] = useState(0);
    const [ rs, setRS ] = useState(null);
    const [ type, setType ] = useState(null);
    const [ off, setOff ] = useState(3);
    const [ closebtntype, setcbt ] = useState("CLOSE");
    const imagePos = useSharedValue(1);
    const butOpacity = useSharedValue(1);
    const imgAnimationStyle = () => useAnimatedStyle(()=>{
        var offset = screen === 0?3:1.2;
        const interpolation = interpolate(imagePos.value, [0,1], [-height/offset , 0])
        return {
            transform:[{translateY:withTiming(interpolation, {duration:1000})}]
        }
    })
    const imgAnimationStyle2 = (h) => useAnimatedStyle(()=>{
        const interpolation = interpolate(imagePos.value, [-1,1], [-h , 0])
        return {
            transform:[{translateY:withTiming(interpolation, {duration:1000})}]
        }
    })
    const butAnimationStyle = useAnimatedStyle(()=>{
        const interpolation = interpolate(imagePos.value, [0,1], [250,0])
        return{
            opacity:withTiming(imagePos.value, 1000)
        }
    })
    const closeRotationStyle = useAnimatedStyle(()=>{
        const interpolation = interpolate(imagePos.value, [0,1], [180, 360])
        const interpolation2 = interpolate(imagePos.value, [0,1], [1, 0])
        return{
            transform:[{rotate:withTiming(interpolation+'deg', 1000)}],
            opacity:withTiming(interpolation2, 1000)
        }
    })

    const formAnimationStyle = useAnimatedStyle(()=>{
        const interpolation1 = interpolate(imagePos.value, [0, 1], [1, 0])
        const interpolation2 = interpolate(imagePos.value, [0, 1], [1,-1])
        return {
            opacity:withTiming(interpolation1, 1000),
            zIndex:withTiming(interpolation2, 1000)
        }
    })

    const loginHandler = () =>{
        setScreen(0)
        imagePos.value = 0;
    }
    const regHandler = () =>{
        setScreen(1)
        imagePos.value = 0
    }
    const reg2Handler1 = () =>{
        imagePos.value =  -1
    }
    const reg2Handler2 = () =>{
        imagePos.value =  1
    }
    const showA = () =>{
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options:[
                    "CARER",
                    "HOME",
                    "AGENCY"
                ],
                userInterfaceStyle:"dark"
            },
            buttonIndex=>{
                setType(buttonIndex)
            }
        )
    }

    
    console.log(screen, "jiijiji")

    return(
        <KeyboardAvoidingView style={{flex:1,...StyleSheet.absoluteFill, justifyContent:"flex-end"}} behavior="height" contentContainerStyle={{flex:1, ...StyleSheet.absoluteFill, backgroundColor:"white",width:"100%", justifyContent:"flex-end",  alignItems:"center"}} >
            <Animated.View style={[
                StyleSheet.absoluteFill,
                imgAnimationStyle(),
                ]} >
                <Image style={{flex:1, height:null, width:null}}  source={require('./walp.jpg')} />
            </Animated.View>
            
            
            <View style={{
                height:screen===0?height/3:height/1.2,
                width:"100%",
                justifyContent:"flex-end"
            }} >
                <Pressable onPress={()=>{
                    setScreen(0)
                    loginHandler()
                }} >
                    <Animated.View style={[
                        styles.button, 
                        butAnimationStyle,
                        {height:70},
                        ]} >
                        <Text style={{fontSize:20, fontWeight:"bold"}} >SIGN IN</Text>
                    </Animated.View>
                </Pressable>
                <Pressable onPress={()=>{
                    
                    regHandler()
                    setScreen(1)
                }} >
                    <Animated.View style={[
                        styles.button, 
                        butAnimationStyle,
                        {height:70,
                        backgroundColor:"#ff8000",}
                        ]} >
                        <Text style={{fontSize:20, color:"white", fontWeight:"bold"}} >REGISTER</Text>
                    </Animated.View>
                </Pressable>
                
                {
                    screen ===1?(
                        <Animated.View style={[{width:"100%", alignItems:"center", ...StyleSheet.absoluteFill},formAnimationStyle ]} >
                            <Animated.View style={[
                                {position:"absolute",
                                width:40,
                                bottom:height/1.23,
                                height:40,
                                backgroundColor:"#ff8000",
                                borderRadius:100,
                                justifyContent:"center",
                                alignItems:"center",},
                                closeRotationStyle,
                            ]} >
                                <TouchableOpacity style={{...StyleSheet.absoluteFill, justifyContent:"center", alignItems:"center"}} onPress={()=>{
                                    
                                    imagePos.value = 1;
                                    
                                }}  >
                                    <Animated.Text style={{fontSize:19, fontWeight:'bold', color:"white"}} >X</Animated.Text>
                                </TouchableOpacity>
                            </Animated.View>
                            {
                            Platform.OS === "ios"?(
                                <Animated.View style={[{...StyleSheet.absoluteFill, justifyContent:"space-evenly", alignItems:"center"}]} >
                                    {
                                        type===null?(
                                            <Pressable onPress={()=>{
                                                if(screen===1){
                                                    showA()
                                                }
                                            }} style={{height:50, backgroundColor:"#ff8000", borderRadius:100, justifyContent:"center", alignItems:"center", paddingHorizontal:15}} >
                                                <Text style={{fontSize:17, fontWeight:"bold", color:"white"}} >Select User Type</Text>
                                            </Pressable>
                                        ):(
                                            <>
                                                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}} >
                                                    <Text style={{fontSize:17, fontWeight:"500", paddingHorizontal:"2%"}} >You are a </Text>
                                                    <Pressable onPress={()=>{
                                                        showA()
                                                    }} style={{height:50, borderWidth:1, borderRadius:100, borderColor:"#ff8000", justifyContent:"center", alignItems:"center", paddingHorizontal:15}} >
                                                    <Text style={{fontSize:17, fontWeight:"bold", color:"grey"}} >{types[type]}</Text>
                                                    </Pressable>
                                                    <Text style={{fontSize:17, fontWeight:"500", paddingHorizontal:"2%"}} >User</Text>
                                                </View>
                                                <Pressable onPress={()=>{
                                                    reg2Handler1()
                                                }} style={{width:"30%", height:"20%", borderRadius:100, justifyContent:"center", alignItems:"center", backgroundColor:"#ff8000"}} >
                                                    <Text style={{color:"white", fontWeight:'bold'}} >NEXT</Text>
                                                </Pressable>
                                            </>
                                        )
                                    }
                                </Animated.View>
                            ):(
                                <View style={{...StyleSheet.absoluteFill, justifyContent:"center", alignItems:"center",}} >
                                    <Text style={{fontWeight:"bold", fontSize:16, paddingVertical:"2%"}} >Select a user type</Text>
                                    <View 
                                        style={{
                                            width:"60%",
                                            borderRadius:25,
                                            borderWidth:0.5,
                                            borderColor:'rgba(0,0,0,0.2)'
                                        }}
                                    >

                                        <Picker
                                        selectedValue={type}
                                        onValueChange={(item, index)=>{
                                            setType(item)
                                        }}
                                            style={{
                                                width:"100%",
                                                
                                            }}
                                        >
                                            {
                                                Object.keys(types).map(k=>(
                                                    <Picker.Item label={types[k]} value={types[k]} />
                                                ))
                                            }
                                        </Picker>
                                    </View>
                                    {
                                        type!==null&&(
                                            <>
                                                {type==="AGENCY" | type==="HOME"?
                                                <>
                                                <View style={{
                                                    flexDirection:"row",
                                                    width:"100%",
                                                    justifyContent:"center"
                                                }} >
                                                    <TextInput
                                                        placeholder='Name'
                                                        style={{
                                                            width:"45%",
                                                            paddingLeft:25,
                                                            height:50,
                                                            marginVertical:5,
                                                            borderRadius:25,
                                                            borderWidth:0.5,
                                                            borderColor:'rgba(0,0,0,0.2)'
                                                        }}
                                                        placeholderTextColor="grey"
                                                        
                                                    />
                                                    <TextInput  
                                                        placeholder='POSTCODE'
                                                        style={{
                                                            width:"45%",
                                                            paddingLeft:25,
                                                            height:50,
                                                            marginVertical:5,
                                                            borderRadius:25,
                                                            borderWidth:0.5,
                                                            borderColor:'rgba(0,0,0,0.2)'
                                                        }}
                                                        placeholderTextColor="grey"
                                                    />
                                                </View>
                                                <TextInput
                                                    placeholder='Adrress'
                                                    style={{...styles.textinput,}}
                                                    placeholderTextColor="grey"
                                                    
                                                />
                                                <TextInput
                                                    placeholder='Street'
                                                    style={{...styles.textinput,}}
                                                    placeholderTextColor="grey"
                                                    
                                                />
                                                <TextInput
                                                    placeholder='City'
                                                    style={{...styles.textinput,}}
                                                    placeholderTextColor="grey"
                                                    
                                                />
                                                </>
                                                :(
                                                    <View style={{
                                                        flexDirection:"row",
                                                        width:"100%",
                                                        justifyContent:"center"
                                                    }} >
                                                        <TextInput
                                                            placeholder='First Name'
                                                            style={{
                                                                width:"45%",
                                                                paddingLeft:25,
                                                                height:50,
                                                                marginVertical:5,
                                                                borderRadius:25,
                                                                borderWidth:0.5,
                                                                borderColor:'rgba(0,0,0,0.2)'
                                                            }}
                                                            placeholderTextColor="grey"
                                                            
                                                        />
                                                        <TextInput  
                                                            placeholder='Surname'
                                                            style={{
                                                                width:"45%",
                                                                paddingLeft:25,
                                                                height:50,
                                                                marginVertical:5,
                                                                borderRadius:25,
                                                                borderWidth:0.5,
                                                                borderColor:'rgba(0,0,0,0.2)'
                                                            }}
                                                            placeholderTextColor="grey"
                                                        />
                                                    </View>
                                                )}
                                                
                                                <TextInput
                                                    placeholder='Phone'
                                                    style={{...styles.textinput,}}
                                                    placeholderTextColor="grey"
                                                    
                                                />
                                                <TextInput
                                                    placeholder='Email'
                                                    style={{...styles.textinput,}}
                                                    placeholderTextColor="grey"
                                                    
                                                />
                                                <View style={{flexDirection:"row"}} >
                                                    <TextInput
                                                        placeholder='Password'
                                                        style={{
                                                            width:"45%",
                                                            paddingLeft:25,
                                                            height:50,
                                                            marginVertical:5,
                                                            borderRadius:25,
                                                            borderWidth:0.5,
                                                            borderColor:'rgba(0,0,0,0.2)'
                                                        }}
                                                        placeholderTextColor="grey"
                                                        
                                                    />
                                                    <TextInput  
                                                        placeholder='Confirm password'
                                                        style={{
                                                            width:"45%",
                                                            paddingLeft:25,
                                                            height:50,
                                                            marginVertical:5,
                                                            borderRadius:25,
                                                            borderWidth:0.5,
                                                            borderColor:'rgba(0,0,0,0.2)'
                                                        }}
                                                        placeholderTextColor="grey"
                                                    />
                                                </View>
                                                <TouchableOpacity style={{paddingHorizontal:"15%", borderRadius:100, marginTop:"2%", paddingVertical:"4%", backgroundColor:"#ff8000"}} >
                                                    <Text style={{fontSize:17, fontWeight:"bold", color:"white"}} >Register</Text>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    }
                                    
                                </View>
                            )
                        }
                        </Animated.View>
                    ):<Login closeRotationStyle={closeRotationStyle} setSc={setScreen} imagePos={imagePos} formAnimationStyle={formAnimationStyle}/>
                }
                
            </View>
            </KeyboardAvoidingView>
    )

 }

export default CustomLogin;


// export default class CustomLogin extends React.Component{
//     constructor(){
//         super()
//         this.buttonOpacity =  new Value(1);
//         this.buttonOpacity2 =  new Value(1);
        
//         this.onStateChangeSign = event([
//             {
//                 nativeEvent:({state})=>block([
//                     cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0))),
//                     cond(eq(state, State.END), set(this.buttonOpacity2, runTiming(new Clock(), 1, 0))),
//                 ])
//             }
//         ])
//         this.onStateChangeReg = event([
//             {
//                 nativeEvent:({state})=>block([
//                     cond(eq(state, State.END), set(this.buttonOpacity2, runTiming(new Clock(), 1, 0))),
//                     cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0))),
//                 ])
//             }
//         ])
//         this.onCloseState = event([
//             {
//                 nativeEvent:({state})=>block([
//                     cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 0, 1))),
//                     cond(eq(state, State.END), set(this.buttonOpacity2, runTiming(new Clock(), 0, 1))),
//                 ])
//             }
//         ])
//         this.state = {
//             isReady : false,
//             screen : "LOGIN"
//         }
//         this.buttonY = interpolateNode(this.buttonOpacity, {
//             inputRange: [0, 1],
//             outputRange: [100, 0],
//             extrapolate: Extrapolate.CLAMP
//           });
      
//         this.bgY = interpolateNode(this.buttonOpacity, {
//             inputRange: [0, 1],
//             outputRange: [-height / 2.5, 0],
//             extrapolate: Extrapolate.CLAMP
//         });
//         this.zIndexS = interpolateNode(this.buttonOpacity, {
//             inputRange: [0, 1],
//             outputRange: [1 , -1],
//             extrapolate: Extrapolate.CLAMP
//         });
//         this.textinputOpS = interpolateNode(this.buttonOpacity, {
//             inputRange: [0, 1],
//             outputRange: [1 , 0],
//             extrapolate: Extrapolate.CLAMP
//         });
//         this.zIndexR = interpolateNode(this.buttonOpacity2, {
//             inputRange: [0, 1],
//             outputRange: [1 , -1],
//             extrapolate: Extrapolate.CLAMP
//         });
//         this.textinputOpR = interpolateNode(this.buttonOpacity2, {
//             inputRange: [0, 1],
//             outputRange: [1 , 0],
//             extrapolate: Extrapolate.CLAMP
//         });
//         this.rotateClose = interpolateNode(this.buttonOpacity, {
//             inputRange:[0,1],
//             outputRange:[180, 360],
//             extrapolate:Extrapolate.CLAMP
//         })
//     }
//     async _cacheResourcesAsync() {
//         const images = [require('./walp.jpg')];
    
//         const cacheImages = images.map(image => {
//           return Asset.fromModule(image).downloadAsync();
//         });
//         return Promise.all(cacheImages);
//       }
//     render(){
//         if(!this.state.isReady){
//             return(
//                 <AppLoading
//                     startAsync={this._cacheResourcesAsync}
//                     onFinish={() => this.setState({ isReady: true })}
//                     onError={console.warn}
//                 />
//             )
//         }
//         else{
//             return(
                
//             )
//         }
//     }
// }

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


// function CustomLogin() {
//     const [isReady, setReady] = useState(false);
//     const loadAssetsAsync = async()=>{
//         const imageAssets = cacheImages([
//             require('../../../assets/walp.JPG'),
//         ])
//         return imageAssets
//     }
//     useEffect(()=>{
//         setReady(false);

//     }, [])
//   return (
//     <View style={styles.container} >
//         {
//             !isReady?(
//                 <AppLoading
//                     startAsync={loadAssetsAsync()}
//                     onFinish={() => setReady(true)}
//                     onError={console.warn}
//                 />
//             ):(
//                 <View style={{flex:1}} >

//                 </View>
//             )
//         }
//     </View>
//   )
// }

// export default CustomLogin