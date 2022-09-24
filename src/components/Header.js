import React, { useEffect, useState } from 'react'
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather, EvilIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { basecolor } from '../redux/constants';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

function Header({navigation, custom, component, routename}) {
  const [value, setValue] = useState('');
  const [color, setColor] = useState(null);
  const [ not_highlight, setNH ] = useState(false);
  const calendarContext = useSelector(state=>state.calendar);
  const cal_agency = useSelector(state=>state.cal_agency);

  useEffect(()=>{
    const { cancelRequest, priority, openNoti} = calendarContext;
    console.log(priority, "header priority")
    if(openNoti){
      navigation.navigate("notification", {route:routename})
    }
 }, [calendarContext])

  useState(()=>{
    if(routename==="homea"){
      setColor(basecolor);
    }
    else if(routename === "homeh"){
      setColor(basecolor);
    }
    else if (routename === "home"){
      setColor(basecolor)
    }
  }, [routename])
  const dispatch = useDispatch();
  const handleSearch = (t) =>{
    dispatch({type:"NEW_SEARCH", payload:t})
  }
  return (
    <View style={{display:"flex",backgroundColor:"white", flexDirection:"row", width:"100%", height:60, alignItems:"center", paddingHorizontal:10 }} >
        <>
          {
            custom?(
              <View style={{display:"flex", width:"100%",height:"100%", alignItems:"center", flexDirection:"row", justifyContent:"space-between"}} >
                <TouchableOpacity onPress={()=>{
                  var route = navigation.getState();
                  dispatch({type:"NEW_NOTI_OPEN", payload:false})
                  navigation.goBack();
                }}
                  >
                  <AntDesign  name='back' size={24}/>
                </TouchableOpacity>
                {
                  component==="search"&&(
                    <TextInput
                      style={{ display:"flex", width:"90%",height:"100%"}}  
                      placeholder="Search"
                      onChangeText={(t)=>handleSearch(t)}                  
                    />
                  )
                }
              </View>
            ):(
              <View style={{flex:1, flexDirection:"row", width:"100%", height:'100%',alignItems:"center", justifyContent:"space-between"}} >
                <View style={{display:"flex", flexDirection:"row",elevation:15,backgroundColor:color, shadowOffset:{width:5, height:3}, shadowColor:"grey", shadowOpacity:0.3, paddingHorizontal:10, borderTopRightRadius:100, borderBottomRightRadius:100, height:"90%", alignItems:"center"}} >
                  {cal_agency.join&&<Octicons style={{position:"absolute", top:"15%",zIndex:100, left:"5%"}} name="dot" size={24} color="#ff0000" />}
                  <TouchableOpacity  style={{elevation:5, height:"100%", width:"15%", justifyContent:"center"}} onPress={()=>{
                    navigation.openDrawer();
                    
                  }} >
                  <Feather name="menu" size={25} color="white" />
                  </TouchableOpacity>
                    <Text style={{fontSize:20,paddingHorizontal:"5%", textShadowColor:"grey", textShadowOffset:{width:2, height:2}, textShadowRadius:1, color:"white",fontWeight:"600" }} >WYECARE</Text>
                    
                </View>
                <View style={{display:"flex", flexDirection:"row", height:"90%",justifyContent:"space-evenly", alignItems:"center" , }} >
                  {routename==="home"&&<TouchableOpacity style={{paddingHorizontal:"3%", height:"100%", justifyContent:"center"}} onPress={()=>{navigation.navigate('search')}}>
                      <EvilIcons name="search" size={32} color="black" />
                  </TouchableOpacity>}
                  <TouchableOpacity style={{paddingHorizontal:"3%", height:"100%", justifyContent:"center"}} onPress={()=>{
                    dispatch({type:"NEW_NOTI", payload:false})
                    navigation.navigate('notification', {route:routename})
                    
                  }}>
                      {calendarContext.priority&&<Octicons name='dot-fill' style={{position:"absolute", right:0,top:5, fontWeight:"900" }} size={15} color={"brown"} ></Octicons>}
                      <Entypo name="bell" size={24} color={basecolor} />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        </>
    </View>
  )
}

export default Header