import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import axios from 'axios';
import { baseUrl } from '../../baseurl';
import { basecolor } from '../../redux/constants';

function Assign({navigation, route}) {
    // console.log(route.params.count, "popopopopo")
    const [loading, setLoading] = useState(true)
    const [ typeSel, setTypeSel ] = useState([0, false, "#f9f9f9"]);
    const [ users, setUsers ] = useState([]);
    const [ counts, setCount ] = useState(route.params.count);
    const [flag, setFlag] = useState(false);
    // const [ ws, setWs ] = useState(new WebSocket("ws://3.86.108.50:8000/ws/notification/"))
    const userContxt = useSelector(state => state.userState);
    const authContxt = useSelector(state => state.userLogin);
    const calendarContext = useSelector(state => state.calendar);
    
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     console.log(route.params, "route")
    // }, [route])
    useEffect(()=>{
        // const {count} = route.params;
        // if(!count){

        // }
    }, [])
    const {
        events,
        shiftspublished
    } = calendarContext;
    useEffect(()=>{
        
        axios.get(`${baseUrl}users?type=CARER&shift_id=${route.params.count.shiftid}`, {headers:{
            'Authorization':`Token ${authContxt.userInfo.token}`
        }}).then(res=>{
            var temp = [...res.data];
            var t = {...counts}
            let flag = false;
            temp.map(i=>{
                if(i.ass_data.selected && t[i.ass_data.selected.toLowerCase()] > 0){
                    flag = true;
                    t[i.ass_data.selected.toLowerCase()] -= 1
                }
            })
            setCount({...t})
            setUsers([...temp])
            setFlag(flag);
        }).catch(e=>{
            console.log(e, "errorororo");
        })
        
    }, [calendarContext])
    const handleType = (index, type, color) =>{
        setTypeSel([index, type, color]);
    }
    const replace = (ass_id) =>{
        axios.post(`${baseUrl}replace`, {re_id:ass_id}, {headers:{
            "Content-Type":"application/json"
          }}).then(res=>{
                console.log(res.status, "stt")
                Alert.alert("The shift has been cancelled, please replace another staff or inform the home");
                navigation.navigate("homea");
          }).catch(e=>{
            console.log("Cancellaton error", e)
          })
    }
    const submit = () =>{
        var temp = [];
        users.map(user=>{
            if(user.ass_data.selected){
                temp.unshift({...user,shift_id:counts.shiftid })
            }
        })
        axios.post(`${baseUrl}assign-shift`, {assigned:temp},{headers:{
            'Content-Type':'application/json'
        }} ).then(res=>{
        var user_ids = [];
        var temp = [...shiftspublished];
        res.data.map(data=>{
            user_ids.unshift(data.employee.id)
        })
        temp.map(t=>{
            res.data.map(data=>{
            if(t.id === data.shiftname.id){
                t.assigned.unshift(data)
            }
            })
        })
        dispatch({type:"SET_SHIFTS", payload:temp})
        
        res.data.map(data=>{
            axios.post('https://exp.host/--/api/v2/push/send', {to:data.employee.push_token, title:"Shifts added", sound:"default", body:"Shift booked", data:{type:"NEW_SHIFT_ASSIGNED", data:data, priority:0}}, {headers: {
                'Content-Type': 'application/json',
              },}).then(res=>{
                navigation.navigate("homea")
              }).catch(e=>console.log(e, "kunna"))
        })
        
        }).catch(e=>{
            console.log(e, "error")
        })
    }
  return (
    <View style={{ flex:1, display:"flex", height:"100%", alignItems:"center", backgroundColor:"white"}} >
        <View style={{display:"flex", width:"90%", alignItems:"center", justifyContent:"flex-end", flexDirection:"row"}} >
            <TouchableOpacity onPress={()=>{
                submit()
            }} style={{paddingVertical:"3%", borderRadius:30, elevation:1, paddingHorizontal:"5%", backgroundColor:basecolor}} >
                <Text style={{color:"white"}} >ASSIGN</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:0.1, flexDirection:"row", justifyContent:"space-evenly", width:"100%", alignItems:"center", paddingTop:"5%"}} >
            <TouchableOpacity onPress={()=>{
                if(counts.longday > 0){
                    if(typeSel[0] === 1){
                        handleType(0 ,false, "#f9f9f9");
                    }
                    else{
                        handleType(1, "LONGDAY", "#e0ebeb");
                    }
                }
            }} style={[{paddingVertical:5,alignItems:"center", borderRadius:10, paddingHorizontal:"5%", justifyContent:"center",}, typeSel[0]===1?{backgroundColor:"#e0ebeb"}:null]} >
                <Text>LONG</Text>
                
                <Text>{counts.longday}</Text>
                <Octicons name='dot-fill' size={10} color={"#e0ebeb"} ></Octicons>
            </TouchableOpacity  >
            <TouchableOpacity onPress={()=>{
                if(counts.night>0){
                    handleType(2, "NIGHT", "#38761b");
                }
                if(typeSel[0] === 2){
                    handleType(0 ,false, "#f9f9f9");
                }

            }} style={{paddingVertical:5,alignItems:"center", borderRadius:10, paddingHorizontal:"5%", justifyContent:"center", backgroundColor:typeSel[0]===2?"grey":"white"}} >
                <Text>NIGHT</Text>
                <Text>{counts.night}</Text>
                <Octicons name='dot-fill' size={10} color={"#38761b"} ></Octicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                if(counts.late > 0){
                    if(typeSel[0] === 3){
                        handleType(0 ,false, "#f9f9f9");
                    }
                    else{
                        handleType(2, "LATE", "orange");
                    }
                }
            }} style={{paddingVertical:5,alignItems:"center", borderRadius:10, paddingHorizontal:"5%", justifyContent:"center", backgroundColor:typeSel[0]===3?"orange":"white"}} >
                <Text>LATE</Text>
                <Text>{counts.late}</Text>
                <Octicons name='dot-fill' size={10} color={"#orange"} ></Octicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                if(counts.early > 0){
                    if(typeSel[0] === 4){
                        handleType(0 ,false, "#f9f9f9");
                    }
                    else{
                        handleType(4, "EARLY", "yellow");
                    }
                }
            }} style={{paddingVertical:5,alignItems:"center", borderRadius:10, paddingHorizontal:"5%", justifyContent:"center", backgroundColor:typeSel[0]===4?"yellow":"white"}} >
                <Text>EARLY</Text>
                <Text>{counts.early}</Text>
                <Octicons name='dot-fill' size={10} color={"yellow"} ></Octicons>
            </TouchableOpacity>
        </View>
        <ScrollView style={{flex:0.8, width:"100%", height:"100%",}} contentContainerStyle={{ width:"100%", height:"100%", alignItems:"center", marginTop:"3%"}} >
            {
                users.map(staff=>(
                    <View key={staff.id} style={{display:"flex", width:"80%", flexDirection:"row", alignItems:"center", justifyContent:"center"}} >
                        <TouchableOpacity onPress={()=>{
                            if(typeSel[0] === 0){
                                if(staff.ass_data.selected){
                                    Alert.alert("", "Do you want to cancel this shift", [
                                        {
                                            text:"CANCEL",
                                            onPress: () => console.log("Request terminated"),
                                            style:"cancel"
                                        },
                                        {
                                            text:"CONTINUE",
                                            onPress:()=>replace(staff.ass_data.ass_id)
                                        }
                                    ])
                                }
                            }
                            else{
                                var temp = [...users];
                                var t = typeSel[1].toLowerCase()
                                temp.map(i=>{
                                    
                                    if(i.id === staff.id && counts[t] > 0){
                                        i.ass_data.selected = typeSel[1]
                                        i.ass_data.color = typeSel[2]
                                    }
                                })
                                setCount(prev=>{
                                    if(prev[t]>0){
                                        prev[t] -= 1;
                                    }
                                    return prev;
                                })
                                
                                setUsers([...temp])
                            }
                        }} style={{paddingVertical:"3%", width:"90%", paddingHorizontal:"5%",backgroundColor:staff.ass_data.color, borderRadius:15, marginVertical:"2%"}} >
                            <Text>{ staff.first_name  } { staff.last_name }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            var temp = [...users];
                            var t;
                            temp.map(i=>{
                                if(i.id === staff.id && i.ass_data.selected){
                                    t = i.ass_data.selected.toLowerCase()    
                                    i.ass_data.selected = false
                                    i.ass_data.color = "#f9f9f9"
                                    
                                }
                            })
                            setCount(prev=>{
                                prev[t] += 1;
                                return prev;
                            })
                            setUsers([...temp])
                        }} >
                        <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                ))
            }
        </ScrollView>
    </View>
  )
}

export default Assign