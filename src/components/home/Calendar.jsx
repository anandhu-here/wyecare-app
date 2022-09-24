import moment from 'moment';
import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDateDispatch, getEventsFromLS, nextMonthDispatch, prevMonthDispatch  } from '../../redux/actions/actionCreatorsDispatch'

import { AntDesign } from '@expo/vector-icons';
import Day from './Day';
import axios from 'axios';
import {  } from '../../redux/constants';
import { baseUrl } from '../../baseurl';

function Calendar({count}) {
    const dispatch = useDispatch();
    const calendarContext = useSelector(state => state.calendar);
    const authContext = useSelector(state => state.userLogin);
    const {
        currentMonth,
        currentYear,
        shiftspublished,
        loading,
        days,
        detailSidebarToggled,
        eventsSidebarToggled,
        newEventSidebarToggled,
        editEventSidebarToggled,
        shiftAssigned
    } = calendarContext;
    

    const fetchShift = () =>{
        const {userInfo} = authContext;
        const id = userInfo.user.profile.id;
        var mon = moment().month()+1;
        const month = mon<10?"0"+ mon?.toString():mon
        console.log(month, "month")
        axios.get(`${baseUrl}shifts?month=${month}&homeid=${userInfo.user.profile.id}&admin=${false}`, {headers:{
            "Authorization":`Token ${userInfo.token}`
        }}).then(res=>{
            dispatch({type:"SHIFT_PUBLISHED_FROM_HOME", payload:res.data});
            
            // setAssigned([...res.data]);
        }).catch(e=>console.log(e, ",lklll"))
    }

    useEffect(()=>{
        if(authContext.userInfo){
            const {userInfo} = authContext;
            const id = userInfo.user.profile.id;
            var mon = moment().month()+1;
            const month = mon<10?"0"+ mon?.toString():mon
            console.log(month, "month")
            axios.get(`${baseUrl}shifts?month=${month}&homeid=${userInfo.user.profile.id}&admin=${false}`, {headers:{
                "Authorization":`Token ${userInfo.token}`
            }}).then(res=>{
                dispatch({type:"SHIFT_PUBLISHED_FROM_HOME", payload:res.data});
                
                // setAssigned([...res.data]);
            }).catch(e=>console.log(e, ",lklll"))
            }
    }, [authContext])
    
    useEffect(()=>{
        dispatch(getCurrentDateDispatch(moment().year(), moment().month()+1, moment().date()))
    }, [dispatch])
  return (
    <View style={{flex:1, height:"100%", borderRadius:20, paddingBottom:15,justifyContent:"center", paddingVertical:"2%", alignItems:"center"}} >
        <View style={{flex:0.1,flexDirection:"row",backgroundColor:"white", alignItems:"center", width:"100%", justifyContent:"space-around", borderRadius:100}} >
            <TouchableOpacity style={{elevation:5, shadowOffset:{width:2, height:3}, shadowColor:"grey", shadowOpacity:0.5, backgroundColor:"white", borderRadius:100}} onPress={()=>{
                dispatch(prevMonthDispatch(calendarContext))
            }} >
                    <AntDesign name="leftcircle" size={32} color={basecolor} />
            </TouchableOpacity>
            <Text style={{fontSize:20, fontWeight:"600", color:"grey"}} >{moment.months(currentMonth - 1).toUpperCase()} {currentYear} {" "}</Text>
            <TouchableOpacity onPress={()=>{
                dispatch(nextMonthDispatch(calendarContext))
            }} style={{elevation:5, shadowOffset:{width:2, height:3}, shadowColor:"grey", shadowOpacity:0.5, backgroundColor:"white", borderRadius:100}}  >
                    <AntDesign name="rightcircle" size={32} color={basecolor} />
            </TouchableOpacity>
        </View>
        <View style={{flex:0.7 , alignItems:"center", justifyContent:"center"}} >
            <View style={{display:"flex", width:"100%", flexDirection:"row",  marginBottom:"2%", justifyContent:"space-around", height:"10%"}} >
                <View style={{display:"flex", width:"13%", backgroundColor:basecolor, borderRadius:100, elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"white"}} >Mo</Text>
                </View>
                <View style={{display:"flex", width:"13%", backgroundColor:basecolor, borderRadius:100, elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"white"}} >Tu</Text>
                </View>
                <View style={{display:"flex", width:"13%", backgroundColor:basecolor, borderRadius:100, elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"white"}} >We</Text>
                </View>
                <View style={{display:"flex", width:"13%", backgroundColor:basecolor, borderRadius:100, elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"white"}} >Th</Text>
                </View>
                <View style={{display:"flex", width:"13%", backgroundColor:basecolor, borderRadius:100, elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"white"}} >Fr</Text>
                </View>
                <View style={{display:"flex", width:"13%", backgroundColor:basecolor, borderRadius:100, elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"white"}} >Sa</Text>
                </View>
                <View style={{display:"flex", width:"13%", backgroundColor:basecolor, borderRadius:100, elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"white"}} >Su</Text>
                </View>
            </View>
            <View style={{display:"flex", height:"80%", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around",}} >
                {
                    days.map((day, index)=>(
                        <Day key={index} day={day} month={currentMonth} year={currentYear} />
                    ))
                }
                
            </View>
        </View>
        <View style={{flex:0.2, width:"90%", height:"80%", borderRadius:100, elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"black", shadowOpacity:0.5,  backgroundColor:basecolor}} >
        {
            count.month&&(
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("assign", {count:count})
                }} style={{flex:1, justifyContent:"center", alignItems:"center", paddingVertical:"5%"}} >
                    <Text style={{fontSize:20, color:"grey" }} >{count.home}</Text>
                    <Text style={{fontSize:22, color:"grey" }} >{count.day}-{count.month}-{count.year}</Text>
                    <Text style={{fontSize:17, color:"white", fontWeight:"500"}} >LONGDAYS : {count.longday}</Text>
                    <Text style={{fontSize:17, color:"white", fontWeight:"500"}} >NIGHT : {count.night}</Text>
                    <Text style={{fontSize:17, color:"white", fontWeight:"500"}} >LATE : {count.late}</Text>
                    <Text style={{fontSize:17, color:"white", fontWeight:"500"}} >EARLY : {count.early}</Text>
                </TouchableOpacity>
            )
        }
        </View>
    </View>
  )
}

export default Calendar