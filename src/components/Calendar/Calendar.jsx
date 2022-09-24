import moment from 'moment';
import React, { useEffect } from 'react'
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDateDispatch, getEventsFromLS, nextMonthDispatch, prevMonthDispatch  } from '../../redux/actions/actionCreatorsDispatch'

import { AntDesign } from '@expo/vector-icons';
import Day from './Day';
import axios from 'axios';
import { basecolor } from '../../redux/constants';
import { useState } from 'react';

function Calendar() {
    const dispatch = useDispatch();
    const [refreshing, setR] = useState(false);
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
    
    useEffect(()=>{
        if(authContext.userInfo){
            const {userInfo} = authContext;
            console.log(userInfo, "userrrrrrrrr")
            const id = userInfo.user.profile.id;
            axios.get(`http://3.86.108.50:8000/api/list-assigned?employee_id=${id}`).then(res=>{
                
                dispatch({type:"SET_SHIFT_ASSIGNED", payload:res.data});
                // setAssigned([...res.data]);
            }).catch(e=>console.log(e, ",lklll"))
            }
    }, [authContext])

    const fetchShift = async() =>{
        const {userInfo} = authContext;
        console.log(userInfo, "userrrrrrrrr")
        const id = userInfo.user.profile.id;
        axios.get(`http://3.86.108.50:8000/api/list-assigned?employee_id=${id}`).then(res=>{
            dispatch({type:"SET_SHIFT_ASSIGNED", payload:res.data});
            return true
            // setAssigned([...res.data]);
        }).catch(e=>{
            return False
        })
        }
    
    useEffect(()=>{
        dispatch(getCurrentDateDispatch(moment().year(), moment().month()+1, moment().date()))
    }, [dispatch])
    const onRefresh = React.useCallback(() => {
        fetchShift().then(v=>{
            if(v) setR(false)
        }).catch(()=>{
            setR(false)
        })
      }, []);
  return (
    <ScrollView refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>
    } style={{flex:1, borderRadius:20, paddingBottom:15,}} contentContainerStyle={{ flex:1, justifyContent:"center", paddingVertical:"2%", alignItems:"center"}} >
        <View style={{flex:0.17,flexDirection:"row",backgroundColor:"white", alignItems:"center", width:"100%", justifyContent:"space-around", borderRadius:100}} >
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
        <View style={{flex:0.9, paddingVertical:4}} >
            <View style={{display:"flex", flexDirection:"row",marginBottom:"2%", justifyContent:"space-around", height:"10%", }} >
                <View style={{display:"flex", width:"13%", borderRadius:100,  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"grey", fontSize:16, fontWeight:"600"}} >Mo</Text>
                </View>
                <View style={{display:"flex", width:"13%", borderRadius:100,  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"grey", fontSize:16, fontWeight:"600"}} >Tu</Text>
                </View>
                <View style={{display:"flex", width:"13%", borderRadius:100,  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"grey", fontSize:16, fontWeight:"600"}} >We</Text>
                </View>
                <View style={{display:"flex", width:"13%", borderRadius:100,  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"grey", fontSize:16, fontWeight:"600"}} >Th</Text>
                </View>
                <View style={{display:"flex", width:"13%", borderRadius:100,  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"grey", fontSize:16, fontWeight:"600"}} >Fr</Text>
                </View>
                <View style={{display:"flex", width:"13%", borderRadius:100,  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"grey", fontSize:16, fontWeight:"600"}} >Sa</Text>
                </View>
                <View style={{display:"flex", width:"13%", borderRadius:100,  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text style={{color:"grey", fontSize:16, fontWeight:"600"}} >Su</Text>
                </View>
            </View>
            <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around",}} >
                {
                    days.map((day, index)=>(
                        <Day key={index} day={day} />
                    ))
                }
            </View>
        </View>
    </ScrollView>
  )
}

export default Calendar