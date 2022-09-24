import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Alert, BackHandler, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons'; 
import Calendar from './Calendar';
import { baseUrl } from '../../baseurl';
import {  } from '../../redux/constants';
import { Ionicons } from '@expo/vector-icons';

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


const c = {longday:0,
    night:0,
    late:0,
    early:0,}
function HomeH({navigation}) {
    const [ loading, setLoading ] = useState(true);
    const [ today, setToday ] = useState(false);
    const calendarCntx = useSelector(state=>state.cal_home);
    const userCntxt = useSelector(state=>state.userLogin);
    const [ isVisible, setVisible ] = useState(false);
    const [ modal_page, setModalPage ] = useState(0);
    const [ ageny, setAgency ] = useState(null);
    const [agents, setAgents] = useState([]);
    const [ hold, setHold ] = useState(false);
    const [agencySelected, setSelected] = useState(false)
    const {shiftAssigned} = calendarCntx;
    const [ addded, setAdded ] = useState([]);
    const [pushtokens, setTokens] = useState([]);
    const [ date, setDate ] = useState({});
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
    const [ shift_c, setShiftC ] = useState({
        longday:0,
        night:0,
        late:0,
        early:0,
    })
    const dispatch = useDispatch();

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', ()=>{
            BackHandler.exitApp()
            return true;
        })
    }, [])

    useEffect(()=>{
        
        const {shiftDisplay, assign_detail} = calendarCntx;
        if(assign_detail.open){
            setVisible(true);
            setDate({...assign_detail})
        }
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
        if(shiftDisplay){
            t.longday = shiftDisplay.longday
            t.early = shiftDisplay.early;
            t.late = shiftDisplay.late;
            t.night = shiftDisplay.night;
            t.day = shiftDisplay.day;
            t.month = shiftDisplay.month;
            t.year = shiftDisplay.year;
            t.home = shiftDisplay.home;
            t.shiftid = shiftDisplay.id
            setCount(t);
            // dispatch({type:"SET_COUNT", payload:t})
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
    const handleModal = () =>{
        setShiftC({
            longday:0,
            night:0,
            late:0,
            early:0,
        })
        setAgency(null);
        setVisible(false);
        setSelected(false);
    }

    const handlePop = () =>{
        const timeout = setTimeout(() => {
            Alert.alert("Send Alert", "Send a shift alert to your Agency", [
                {
                    text:"CANCEL",
                    onPress: () => setHold(true),
                    style:"cancel"
                },
                {
                    text:"CONTINUE",
                    onPress:()=>stopTimeout(timeout)
                }
            ])
        }, 3000);
        return timeout
    }

    const stopTimeout = (t) =>{
        clearTimeout(t)
    }
    const publish = () =>{
        if(addded.length > 0){
            axios.post(`${baseUrl}shift-bulk-publish`,{shift:[...addded]}, {
                headers:{
                'Content-Type':'application/json',
                'Authorization':'Token' + userCntxt.userInfo.token
                }
            } ).then(res=>{
                dispatch({type:"SHIFT_PUBLISHED_FROM_HOME", payload:[...calendarCntx.shiftPublished, ...res.data]});
                pushtokens.map(tok=>{
                    axios.post('https://exp.host/--/api/v2/push/send', {to:tok, title:"Shifts added", body:"Shifts has been added ", data:{type:"NEW_SHIFT_ADDED", data:res.data, priority:0}}, {headers: {
                        'Content-Type': 'application/json',
                    },}).then(res=>{
                        navigation.navigate("homeh")
                    }).catch(e=>console.log(e, "kunna"))
                })
                handleModal()
            }).catch(e=>{
                console.log("error", e)
            })
        }
        else{
            const {assign_detail, shiftPublished} = calendarCntx;
            const {day, month, year} = assign_detail;
            const {profile} = userCntxt.userInfo.user;
            const mon = month<10?"0"+ month.toString():month
            const d = day<10?"0"+day.toString():day
            axios.post(`${baseUrl}shift-publish`, {shift:{...shift_c, home_id:userCntxt.userInfo.user.profile.id,day:d, year:year, month:mon,agent_id:ageny.agent}}, {headers:{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Token' + userCntxt.userInfo.token
                }
            }}).then(res=>{
                // axios.post('https://exp.host/--/api/v2/push/send', {to:res.data.push_token, title:"Shifts added", body:"Shift ", data:{type:"NEW_SHIFT_ASSIGNED", data:data, priority:0}}, {headers: {
                //     'Content-Type': 'application/json',
                //   },}).then(res=>{
                //     navigation.navigate("homea")
                //   }).catch(e=>console.log(e, "kunna"))
                dispatch({type:"SHIFT_PUBLISHED_FROM_HOME", payload:[...shiftPublished, res.data]});
                setVisible(false);
                setShiftC({
                    longday:0,
                    night:0,
                    late:0,
                    early:0,
                })
                setAgency(null);
                setVisible(false);
                setSelected(false);
                const t = handlePop();
            }).catch(e=>{
                console.log(e, "error")
            })
        }
    }
    const handleCancel = () =>{
        const {employee, shiftname, id} = today.assigned[0]
        axios.post(`${baseUrl}cancel-request`, {shift_id:shiftname, shift_ass_id:id, employee_id:employee.id, body:`${employee.first_name} has requested to cancel a shift`}, {headers:{
                'Content-Type':"application/json"
            }}).then(res=>{
                axios.post('https://exp.host/--/api/v2/push/send', {to:today.assigned[0].employee.agent.push_token, title:"Shift cancellation", body:`${today.assigned[0].employee.first_name} has requested to cancel a shift`, data:{type:"CANCEL_SHIFT", data:"CANCEL_PENDING", priority:1, date:`${today.day}-${today.month}-${today.year}`, shift_id:today.assigned[0].shiftname, shift_ass_id:today.assigned[0].id, profile_id:today.assigned[0].employee.id}}, {headers: {
                'Content-Type': 'application/json',
                },}).then(res=>{
                    Alert.alert("Request send")
                }).catch(e=>console.log(e, "kunna"))
            }).catch(e=>{
                console.log(e, "error")
            })
        
    }
    
    
  return (
    <ScrollView style={{flex:1, }} contentContainerStyle={{ flex:1, backgroundColor:"white", alignItems:"center", paddingVertical:'5%'}}  >
        <View style={{flex:1, width:"90%", }} >
            <Calendar count={count} />
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
        
        
        <Modal
            transparent={true}
            visible={isVisible}
            animationType={"fade"}
            style={{flex:1, width:"100%", justifyContent:"center", alignItems:"center",alignContent:"center", backgroundColor:"yellow"}}
            onRequestClose={()=>{
                dispatch({type:"OPEN_ASSIGN", payload:false})
                setVisible(false)
            }}
            
        >
            <View style={{flex:1, backgroundColor:'rgba(52, 52, 52, 0.5)', justifyContent:"center",alignItems:"center", marginVertical:"auto"}} > 
                {
                    modal_page===0?(
                        <View style={{flex:0.7, width:'90%',  backgroundColor:"white",elevation:10, borderTopLeftRadius:50, borderTopRightRadius:50, alignItems:"center", borderBottomLeftRadius:50}} >
                    <TouchableOpacity onPress={()=>{
                        dispatch({type:"OPEN_ASSIGN", payload:false})
                        setVisible(false);
                        setAgency(null)
                        setShiftC({
                            longday:0,
                            night:0,
                            late:0,
                            early:0,
                        })
                        setSelected(false)
                    }} style={{position:"absolute", right:"4%", top:"3%", zIndex:1000, padding:"3%"}} >
                        <Ionicons name="close" size={50} color="grey" style={{}} />
                    </TouchableOpacity>
                    
                    <View style={{position:"absolute", left:"4%", top:"3%", padding:"3%", justifyContent:"center"}} >
                        <Text style={{fontSize:19, fontWeight:"600", color:"grey"}} >{moment.months()[date.month - 1]} {date.day}th, {date.year}</Text>
                    </View>
                    <View style={{flex:1, width:"100%", justifyContent:"center", alignItems:'center'}} >
                    
                    {
                        Object.keys(c).map(key=>(
                            <View style={{display:"flex", flexDirection:"row", alignItems:"center", paddingVertical:"3%"}} >
                                <TouchableOpacity style={{paddingHorizontal:"3%"}} onPress={()=>{
                                    let ne = shift_c;
                                    ne[key] +=1;
                                    setShiftC({...ne})
                                }} >
                                    <Ionicons name="add-circle-outline" size={24} color="black" />
                                </TouchableOpacity>
                                <View style={{justifyContent:"center", alignItems:"center", backgroundColor:"white", elevation:10, paddingHorizontal:"5%", paddingVertical:"2%", borderRadius:100}} >
                                <Text style={{fontSize:20, color:basecolor, fontWeight:'600'}}>{key.toUpperCase()}</Text>
                                <Text style={{color:basecolor, fontSize:18, fontWeight:"600"}} >{shift_c[key]}</Text>
                                </View>
                                <TouchableOpacity style={{paddingHorizontal:"3%"}} onPress={()=>{
                                    let ne = shift_c;
                                    if(ne[key] > 0){
                                        ne[key] -=1;
                                        setShiftC({...ne})
                                    }
                                }} >
                                    <Ionicons name="remove-circle-outline" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                    {
                        ageny&&(
                            <Text>AGENCY: {ageny.name}</Text>
                        )
                    }
                    <TouchableOpacity onPress={()=>{
                        if(ageny){
                            publish()
                        }
                        else{
                            setModalPage(1)
                            const {profile} = userCntxt.userInfo.user;
                            var agents = profile.agent;
                            setAgents([...agents]);
                            setSelected(true);
                        }
                    }} style={{paddingHorizontal:"15%",marginTop:15,elevation:1, paddingVertical:"3%", backgroundColor:basecolor, borderRadius:100}} >
                        <Text style={{color:"white", fontSize:15, fontWeight:"600", elevation:10}} >{agencySelected?"PUBLISH":"SELECT AGENCY"}</Text>
                    </TouchableOpacity>
                    {agencySelected&&<Text>OR</Text>}
                    {
                        agencySelected&&(
                            <TouchableOpacity onPress={()=>{
                                var t = [...addded];
                                var t2 = [...pushtokens];
                                if(t2.indexOf(ageny.push_token) === -1){
                                    t2.unshift(ageny.push_token)
                                }
                                setTokens(t2);
                                const {month, year, day} = date
                                t.unshift({...shift_c, home_id:userCntxt.userInfo.user.profile.id,day:day<10?"0"+ day.toString():day, year:year, month:month<10?"0"+ month.toString():month,agent_id:ageny.id, push:ageny.push_token})
                                setAdded(t);

                                handleModal()
                                setDate(prev=>{
                                    prev.day+=1
                                    return prev
                                })
                                setVisible(true)
                            }} style={{paddingHorizontal:"15%",elevation:1, paddingVertical:"3%", backgroundColor:basecolor, borderRadius:100}} >
                                <Text style={{color:"white", fontSize:15, fontWeight:"600", elevation:10}} > ADD FOR NEXT DAY </Text>
                            </TouchableOpacity>
                        )
                    }
                    </View>
                    
                </View>
                    ):(
                        <View style={{flex:0.7, width:'90%',  backgroundColor:"white",elevation:10, borderTopLeftRadius:50, borderTopRightRadius:50, alignItems:"center",justifyContent:"center", borderBottomLeftRadius:50}} >
                            <TouchableOpacity onPress={()=>{
                                setModalPage(0)
                            }} style={{position:"absolute",zIndex:1000, left:"4%", top:"3%", padding:"3%"}} >
                                <Ionicons name="arrow-back" size={35} color="grey" style={{}} />
                            </TouchableOpacity>
                            <View style={{flex:0.7, width:"90%"}} >
                                <ScrollView horizontal={false} contentContainerStyle={{ height:"100%", alignItems:"center", paddingTop:"10%", }} style={{width:"100%", height:"100%",}} >
                                    {
                                        agents.map(agent=>(
                                            <TouchableOpacity onPress={()=>{
                                                setAgency(agent);
                                                setModalPage(0);
                                            }} style={{ paddingHorizontal:"10%", paddingVertical:"5%", elevation:5, backgroundColor:agent.selected?basecolor:"white", borderRadius:100, width:"90%"}} > 
                                                <Text style={{fontSize:20, fontWeight:"600"}} >{agent.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                            
                                    {/* <TouchableOpacity style={{paddingHorizontal:"10%", marginTop:10, paddingVertical:"5%", elevation:5, backgroundColor:"white", borderRadius:100, width:"90%"}} > 
                                        <Text style={{fontSize:20, fontWeight:"600"}} >abc</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingHorizontal:"10%", marginTop:10, paddingVertical:"5%", elevation:5, backgroundColor:"white", borderRadius:100, width:"90%"}} > 
                                        <Text style={{fontSize:20, fontWeight:"600"}} >abc</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingHorizontal:"10%", marginTop:10, paddingVertical:"5%", elevation:5, backgroundColor:"white", borderRadius:100, width:"90%"}} > 
                                        <Text style={{fontSize:20, fontWeight:"600"}} >abc</Text>
                                    </TouchableOpacity> */}
                                    


                                </ScrollView>
                            </View>
                        </View>
                    )
                }
            </View>
        </Modal>
    </ScrollView>
  )
}

export default HomeH