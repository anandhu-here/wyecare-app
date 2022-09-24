import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Alert, BackHandler, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip';
import { useDispatch, useSelector } from 'react-redux';

import { AntDesign } from '@expo/vector-icons'; 
import Calendar from './Calendar/Calendar';
import { baseUrl } from '../baseurl';
import { basecolor } from '../redux/constants';


const items = [
    {
        name:"Timesheets",
        
    },
    {
        name:"Availability"
    },
    {
        name:"Documents"
    },

]


var we = [  ]

function Home({navigation}) {
    const [ loading, setLoading ] = useState(true);
    const [ today, setToday ] = useState(false);
    const calendarCntx = useSelector(state=>state.calendar);
    const userCntxt = useSelector(state=>state.userState);
    const [refreshing, setRefresh] = useState(false);
    const {shiftAssigned} = calendarCntx;
    const dispatch = useDispatch();

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', ()=>{
            BackHandler.exitApp()
            return true;
        })
    }, [])

    useEffect(()=>{
        
        shiftAssigned.map(shift=>{
            if(parseInt(shift.shiftname.day) === moment().date() && parseInt(shift.shiftname.month) === moment().month() + 1){
                setToday(shift.shiftname);
            }
        })
        
        
        if(calendarCntx.shiftDisplay.length>0){
            setToday(calendarCntx.shiftDisplay[0])
        }
        else{
            
            setToday(false)
        }
    }, [calendarCntx])
    useEffect(()=>{
        const { covered } = calendarCntx;
        if(covered){
            const t = {...today};
            t.covered = covered;
            setToday(t);
        }
    }, [calendarCntx])
    const handleCancel = () =>{
        const {employee, shiftname, id} = today
        axios.post(`${baseUrl}cancel-request`, {shift_id:shiftname, shift_ass_id:id, employee_id:employee.id, body:`${employee.first_name} has requested to cancel a shift`}, {headers:{
                'Content-Type':"application/json"
            }}).then(res=>{
                axios.post('https://exp.host/--/api/v2/push/send', {to:employee.agent.push_token, title:"Shift cancellation", body:`${employee.first_name} has requested to cancel a shift`, data:{type:"CANCEL_SHIFT", data:"CANCEL_PENDING", priority:1, date:`${today.day}-${today.month}-${today.year}`, shift_id:shiftname, shift_ass_id:id, profile_id:employee.id}}, {headers: {
                'Content-Type': 'application/json',
                },}).then(res=>{
                    Alert.alert("Request send")
                }).catch(e=>console.log(e, "kunna"))
            }).catch(e=>{
                console.log(e, "error")
            })
        
    }
    
  return (
    <View style={{flex:1, paddingVertical:10, alignItems:"center", backgroundColor:"white"}}  >
        <View style={{flex:0.7, width:"90%", }} >
            <Calendar />
            {/* <CalendarStrip
                calendarAnimation={{type: 'sequence', duration: 30}}
                daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                style={{  height: 80, paddingTop: 20, paddingBottom: 10, marginBottom: 15}}
                calendarHeaderStyle={{color: 'black'}}
                calendarColor={'white'}
                dateNumberStyle={{color: 'black'}}
                dateNameStyle={{color: 'black'}}
                highlightDateNumberStyle={{color: 'blue'}}
                highlightDateNameStyle={{color: 'blue'}}
                disabledDateNameStyle={{color: 'grey'}}
                disabledDateNumberStyle={{color: 'grey'}}
                onDateSelected={(d)=>console.log(d.format('YYYY-MM-DD'), "pp")}
                selectedDate={moment()}
                
            /> */}
        </View>
        <View style={{flex:0.3,width:"90%", marginTop:5, alignItems:"center", backgroundColor:"white", justifyContent:"center" }} >
            
            <View style={{display:"flex", height:"60%", width:"100%"}} >
                {
                    today?(
                        <View style={{flex:1, flexDirection:"row", borderRadius:20, justifyContent:"space-evenly", borderWidth:0.1, alignItems:"center", backgroundColor:basecolor,elevation:15, shadowOffset:{width:8, height:8}, shadowColor:"grey", shadowOpacity:0.7, backgroundColor:basecolor }} >
                            {!today.covered&&<TouchableOpacity style={{marginLeft:"10%"}}  onPress={()=>{
                                Alert.alert("CANCELLATION", "Send a cancel request to your Agency", [
                                    {
                                        text:"CANCEL",
                                        onPress: () => console.log("Request terminated"),
                                        style:"cancel"
                                    },
                                    {
                                        text:"CONTINUE",
                                        onPress:()=>handleCancel()
                                    }
                                ])
                            }} >
                                <AntDesign name="closecircle" size={24} color="white"  />
                            </TouchableOpacity>}
                            <View style={{flex:1,width:"100%",  }} >
                                <Text style={{textAlign:"center", color:"white", fontWeight:"500", fontSize:19}}>{today.shiftdetail.day}-{today.shiftdetail.month}-2022</Text>
                                <Text style={{textAlign:"center", color:"grey", fontWeight:"500", fontSize:21}} >{today.shiftdetail.home}</Text>
                                <Text style={{textAlign:"center", color:"white", fontWeight:"500", fontSize:19}} >{today.type}</Text>
                                <Text style={{textAlign:"center", color:"white", fontWeight:"500", fontSize:18}} >4 Printers Ave, Watford</Text> 
                            </View>
                            {!today.covered&&<TouchableOpacity onPress={()=>{
                                navigation.navigate('inshift', {home_id:today.shiftdetail.home_id, shift_id:today.shiftname, type:today.type, profile_id:today.employee.id})}
                            }>
                                <AntDesign name="rightcircle" size={24} color="white" style={{marginRight:"10%"}} />
                            </TouchableOpacity>}
                        </View>
                    ):(
                        <View style={{flex:1,width:"100%",  borderRadius:20, justifyContent:'center', borderWidth:0.1, justifyContent:"center", alignItems:"center"}} >
                            <Text style={{fontSize:20}} >You have no shifts assigned today!</Text>
                        </View>
                    )
                }
            </View>
        </View>
        
    </View>
  )
}

export default Home