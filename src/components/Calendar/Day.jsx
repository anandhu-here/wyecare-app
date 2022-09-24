import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { basecolor } from '../../redux/constants';

function Day({ day: { visible, dayOfMonth, date } }) {
    const calendarContext = useSelector(state => state.calendar);
    const authContext = useSelector(state => state.userLogin);
    const [ ifshift, setIF ] = useState([]);
    const dispatch = useDispatch();
    const {
        shiftspublished,
        shiftAssigned,
        currentYear,
        currentMonth,
    } = calendarContext;

    var thisDayShifts = [];
    useEffect(()=>{
        if(authContext.newShift){
            // var t = [...shiftAssigned, calendarContext.newShift];
            // dispatch({type:"SET_SHIFT_ASSIGNED", payload:t});
        }
    }, [authContext])
    useEffect(()=>{
        setIF([]);
        shiftAssigned.forEach(shift=>{
            if(parseInt(shift.shiftdetail.day) === dayOfMonth && currentMonth === parseInt(shift.shiftdetail.month)){
                setIF([{...shift}]);
                
                if(parseInt(shift.shiftdetail.day) === moment().date()){
                    // dispatch({type:"SHIFT_DISPLAY", payload:[shift.shiftname]})
                }
            }
            
            
        })    
    }, [calendarContext])
    
    

  return (
    <TouchableOpacity onPress={()=>{
        dispatch({type:"SHIFT_DISPLAY", payload:ifshift}) 
    }} style={[{ display:"flex",alignItems:"center", width:"13%",height:"18.5%",marginTop:7, justifyContent:"center", borderRadius:100,},dayOfMonth!==0&&{ elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, backgroundColor:"white"}, ifshift.length>0&&{backgroundColor:"#e0ebeb", borderRadius:100}]} >
        {
            ifshift.length>0?(
                <Text style={{textAlign:"center", fontWeight:"900", color:"green"}}>{dayOfMonth !==0 && dayOfMonth} </Text>
            ):(
                <Text style={{textAlign:"center"}} >{dayOfMonth !== 0&& dayOfMonth} </Text>
            )
        }
    </TouchableOpacity>
  )
}

export default Day