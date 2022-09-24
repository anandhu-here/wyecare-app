import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl } from '../baseurl'

const not = [
  {
    "message":"The chase has added shifts"
  },
  {
    "message":"The chase has added shifts"
  },
  {
    "message":"The chase has added shifts"
  }
]


function Notification({navigation, route}) {
  const [loading, setLoading] = useState(true)
  const [items, setItem] = useState([]);
  const {count} = useSelector(state=>state.calendar)
  const dispatch = useDispatch()
  useEffect(()=>{
    axios.get(`${baseUrl}notify?type=${route.params.route}`).then(res=>{
      var t = [];
      console.log(res.data, "noti")
      setItem([...res.data]);
      setLoading(false);
    }).catch(e=>{
      setLoading(false);
    })
  }, [])

  const cancel = (shift) =>{
    console.log(shift, "kopkopkpo")
    const {ass_data} = shift.assigned[0].employee
    axios.post(`${baseUrl}replace`, {re_id:ass_data.ass_id}, {headers:{
      "Content-Type":"application/json"
    }}).then(res=>{
      axios.post('https://exp.host/--/api/v2/push/send', {to:shift.assigned[0].employee.push_token, title:"CANCELLED", body:"Your shift has been cancelled", data:{type:"CANCEL_SHIFT", data:"SHIFT_CANCELLED", priority:1}}, {headers: {
          'Content-Type': 'application/json',
        },}).then(res=>{
          navigation.navigate("homea")
        }).catch(e=>console.log(e, "kunna"))
      
    }).catch(e=>{
      console.log("Cancellaton error")
    })
  }
  const handleCancel = ({shift}) =>{
    Alert.alert("Require Action","Cancel or Accept", [
      {
          text:"Reject",
          onPress: () => console.log("Request terminated"),
          style:"cancel"
      },
      {
          text:"Accept",
          onPress:()=>cancel(shift)
      }
  ])
    // const {year, month, day, longday, night, late, early, id } = shift;
    // navigation.navigate("assign", {count:{
    //   year,
    //   month, day,
    //   late,
    //   longday,
    //   early,
    //   night,
    //   shiftid:id
    // }})
  } 
  const handleAdded = () =>{
    dispatch({type:"REFRESH", payload:true})
    navigation.navigate("homea", {refresh:true})
  }
  return (
    <View style={{flex:1, backgroundColor:"white", justifyContent:"center", alignItems:"center"}} >
        {
          loading?(
            <ActivityIndicator size={60} />
          ):(
            <ScrollView style={{flex:1,width:"100%", }} contentContainerStyle={{ flex:1, alignItems:"center"}} >
              <View style={{paddingVertical:20, paddingHorizontal:20}} >
                {/* <Text style={{fontSize:20}} >This week</Text> */}
              </View>
              {
                items.map(item=>(
                  <TouchableOpacity onPress={()=>{
                      if(item.type === 0){
                        handleAdded()
                      }
                      else if(item.type === 1){
                        console.log(item, "item")
                        handleCancel(item);
                      }
                  }} style={{display:"flex",backgroundColor:"#f2f2f2",elevation:3,borderRadius:100, marginTop:10, flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:"90%", paddingVertical:15, paddingHorizontal:30}} >
                    <Text style={{fontSize:17}} >{item.body}</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          )
        }
    </View>
  )
}

export default Notification