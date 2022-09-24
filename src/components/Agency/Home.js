import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../baseurl';
import { basecolor } from '../../redux/constants';
import Assign from './Assign';
import Calendar from './Calendar'

function HomeA({navigation, route}) {
    const calendarContext = useSelector(state => state.calendar);
    const {shift} = calendarContext;
    const [visible, setVis] = useState(false);
    const {userInfo} = useSelector(state=>state.userLogin);
    const dispatch = useDispatch();
    const [ count, setCount ] = useState({
        longday:0,
        night:0,
        late:0,
        early:0,
        home:false,
        day:false,
        month:false,
        year:false,
        shiftid:null
    })

    useEffect(()=>{ 
        const {shift, shiftDisplay} = calendarContext;
        var t = {
            longday:0,
            night:0,
            late:0,
            early:0,
            home:false,
            day:false,
            month:false,
            year:false,
            shiftid:null
        }
        if(shiftDisplay.length>0){
            shiftDisplay.map(i=>{

                t.longday = i.longday
                t.early = i.early;
                t.late = i.late;
                t.night = i.night;
                t.day = i.day;
                t.month = i.month;
                t.year = i.year;
                t.home = i.home;
                t.shiftid = i.id
            })
            setCount(t);
            // dispatch({type:"SET_COUNT", payload:t})
        }
     }, [calendarContext])
     const handleMod = (open) =>{
        setVis(open)
     }

     
     useEffect(()=>{
        const key = userInfo.user.profile.key
        var mon = moment().month()+1;
        const month = mon<10?"0"+ mon?.toString():mon
        axios.get(`${baseUrl}shifts?month=${month}&agent=${true}&key=${key}`, {headers:{
          'Authorization':`Token ${userInfo.token}`
        }}).then(res=>{
          dispatch({type:"SET_SHIFTS", payload:res.data})
        }).catch(e=>{
        })
      }, [])

  return (
    <ScrollView style={{flex:1, }} contentContainerStyle={{ flex:1, backgroundColor:"white", alignItems:"center", paddingVertical:'5%'}}  >
        <View style={{flex:1, width:"90%", }} >
            <Calendar count={count} navigation={navigation} />
        </View>
        {/* <Modal style={{flex:1, backgroundColor:"red"}} visible={visible} animationType="slide" transparent={false}  onRequestClose={()=>{
            setVis(false)
        }}>
            <Assign count={count} modalVis = {handleMod} />
        </Modal> */}
        {/* <View style={{flex:0.3,width:"100%", marginTop:5, alignItems:"center", backgroundColor:"white", justifyContent:"center" }} >
            
            <View style={{display:"flex", height:"80%", alignItems:"center", width:"100%"}} >
                {
                    count.month&&(
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate("assign", {count:count})
                        }} style={{width:"90%", backgroundColor:"white", borderRadius:100, elevation:4, justifyContent:"center", alignItems:"center", paddingVertical:"5%"}} >
                            <Text style={{fontSize:20, fontWeight:"600", color:"grey", paddingVertical:"2%"}} >{count.home}</Text>
                            <Text style={{fontSize:22, fontWeight:"600", paddingVertical:"2%", color:basecolor}} >{count.day}-{count.month}-{count.year}</Text>
                            <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >LONGDAYS : {count.longday}</Text>
                            <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >NIGHT : {count.night}</Text>
                            <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >LATE : {count.late}</Text>
                            <Text style={{fontSize:17, color:"grey", fontWeight:"700"}} >EARLY : {count.early}</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View> */}
        
    </ScrollView>
  )
}

export default HomeA