import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Day from './Day';
import { AntDesign } from '@expo/vector-icons';
import { baseUrl } from '../../baseurl';
import moment from 'moment';
import { getCurrentDateDispatch, nextMonthDispatch, prevMonthDispatch } from '../../redux/actions/actionCreatorsDispatch';
import { basecolor } from '../../redux/constants';
var months = ["January", "February", "March", "April", 
 "May", "June", "July", "August", "September", "October", 
 "November", "December"];

var weekDays = [
     "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
 ]; 
var nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Calendar = ({count, navigation}) => {
    const dispatch = useDispatch();
    const calendarContext = useSelector(state => state.calendar);
    const {users} = useSelector(state => state.userState);
    const {userInfo} = useSelector(state=>state.userLogin);
    const [refreshing, setRefreshing] = useState(false);
    const cal_a = useSelector(state=>state.cal_agency)
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
      userSidebarToggledAd
    } = calendarContext;
  
    
    useEffect(() => {
      dispatch(getCurrentDateDispatch(moment().year(), moment().month()+1, moment().date()));
      
    }, [dispatch]);
    
    const fetchShift = async() =>{
        const key = userInfo.user.profile.key
        var mon = moment().month()+1;
        const month = mon<10?"0"+ mon?.toString():mon
        axios.get(`${baseUrl}shifts?month=${month}&agent=${true}&key=${key}`, {headers:{
          'Authorization':`Token ${userInfo.token}`
        }}).then(res=>{
          dispatch({type:"SET_SHIFTS", payload:res.data});
          return true
        }).catch(e=>{
            return false
        })
    }
  
    const fetch = async (n) =>{
        const key = userInfo.user.profile.key
        var mon = currentMonth + n;
        const month = mon<10?"0"+ mon?.toString():mon
        console.log(currentMonth, "cur")
        axios.get(`${baseUrl}shifts?month=${month}&agent=${true}&key=${key}`, {headers:{
            'Authorization':`Token ${userInfo.token}`
        }}).then(res=>{
            dispatch({type:"SET_SHIFTS", payload:res.data})
        }).catch(e=>{
        })
    }
    const onRefresh = React.useCallback(() => {
        fetchShift().then(v=>{
            if(v) setRefreshing(false)
        }).catch(()=>{
            setRefreshing(false)
        })
      }, []);

    
    useEffect(()=>{
        const {refresh} = cal_a;
        if(refresh){
            fetchShift().then(v=>{
                if(v) setRefreshing(false)
            }).catch(()=>{
                setRefreshing(false)
            })
            dispatch({type:"REFRESH", payload:false})
        }
    }, [cal_a])
    return (
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        } style={{borderRadius:20, paddingBottom:15}} contentContainerStyle={{ flex:1, justifyContent:"center", paddingVertical:"2%", alignItems:"center", }} >
        <View style={{flex:0.1,flexDirection:"row",backgroundColor:"white", alignItems:"center", width:"100%", justifyContent:"space-around", borderRadius:100}} >
            <TouchableOpacity onPress={()=>{
                
                fetch(-1).then(()=>{
                    
                }).catch(e=>console.log(e))
                dispatch(prevMonthDispatch(calendarContext))
                
            }} >
                    <AntDesign name="leftcircle" size={35} color={basecolor} />
            </TouchableOpacity>
            <Text style={{fontSize:22,color:basecolor, fontWeight:"600", textShadowColor:"grey", textShadowOffset:{width:0.5, height:0.5}, textShadowRadius:0.5}} >{moment.months(currentMonth - 1).toUpperCase()} {currentYear} {" "}</Text>
            <TouchableOpacity onPress={()=>{
                
                fetch(1).then(()=>{
                    
                }).catch(e=>console.log(e))
                dispatch(nextMonthDispatch(calendarContext))
                // if((moment().month() + 1) === currentMonth){
                    
                // }
                // else{
                    
                // }
                
            }} >
                    <AntDesign name="rightcircle" size={35} color={basecolor} />
            </TouchableOpacity>
        </View>
        <View style={{flex:0.7,alignItems:"center", justifyContent:"center"}} >
            <View style={{display:"flex", flexDirection:"row",marginBottom:"2%", justifyContent:"space-around", height:"5%", width:"100%" }} >
                <View style={{display:"flex", width:"13%",  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text>Mo</Text>
                </View>
                <View style={{display:"flex", width:"13%",  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text>Tu</Text>
                </View>
                <View style={{display:"flex", width:"13%",  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text>We</Text>
                </View>
                <View style={{display:"flex", width:"13%",  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text>Th</Text>
                </View>
                <View style={{display:"flex", width:"13%",  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text>Fr</Text>
                </View>
                <View style={{display:"flex", width:"13%",  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text>Sa</Text>
                </View>
                <View style={{display:"flex", width:"13%",  height:"100%", justifyContent:"center", alignItems:"center", padding:"1%"}} >
                    <Text>Su</Text>
                </View>
            </View>
            <View style={{display:"flex", height:'80%', flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around"}} >
                {
                    days.map((day, index)=>(
                        <Day key={index} day={day} />
                    ))
                }
            </View>
        </View>
        <View style={{flex:0.2, width:"90%", height:"80%", borderRadius:15, elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"black", shadowOpacity:0.5, backgroundColor:"white",borderWidth:2, borderColor:basecolor, paddingVertical:"2%"}} >
            {
                count.month?(
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate("assign", {count:count})
                    }} style={{flex:1, justifyContent:"center", alignItems:"center", paddingVertical:"5%"}} >
                        <Text style={{fontSize:20, fontWeight:"600", color:"grey",}} >{count.home}</Text>
                        <Text style={{fontSize:22, fontWeight:"600", color:"grey"}} >{count.day}-{count.month}-{count.year}</Text>
                        <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >LONGDAYS : {count.longday}</Text>
                        <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >NIGHT : {count.night}</Text>
                        <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >LATE : {count.late}</Text>
                        <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >EARLY : {count.early}</Text>
                    </TouchableOpacity>
                ):(
                    <View style={{flex:1, justifyContent:"center", alignItems:"center"}} >
                        <Text style={{color:"grey", fontSize:16, fontWeight:"600"}} >SELECT DAYS AND START ASSIGNING</Text>
                    </View>
                )
            }
        </View>
    </ScrollView>
    );
  };
  
  export default Calendar;