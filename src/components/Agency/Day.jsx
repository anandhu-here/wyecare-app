import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import {  } from '../../redux/constants';

function Day({ day: { visible, dayOfMonth, date } }) {
    const calendarContext = useSelector(state => state.calendar);
    const authContext = useSelector(state => state.userLogin);
    const [ ifshift, setIF ] = useState([]);
    const dispatch = useDispatch()
    const [ dayStyle, setStyle ] = useState("white");
    const {
        shiftspublished,
        shiftAssigned,
        currentYear,
        currentMonth,
    } = calendarContext;

    var thisDayShifts = [];
    useEffect(()=>{
        
    }, [])
    useEffect(()=>{
        setIF([]);
        shiftspublished.forEach(shift=>{
            console.log(shift.day, dayOfMonth, shift.month)
            if(parseInt(shift.day) === dayOfMonth && currentMonth === shift.month){
                setIF([shift]);
                if(parseInt(shift.day) === moment().date()){
                    // dispatch({type:"SHIFT_DISPLAY", payload:[shift.shiftname]})
                }
            }
            
            
        })    
    }, [calendarContext])
    
    
    useEffect(()=>{
        setStyle("white");
        if(ifshift.length>0){
            var total = ifshift[0].longday + ifshift[0].night + ifshift[0].early + ifshift[0].late;
            if(ifshift[0].assigned.length>0){
                if(total === ifshift[0].assigned.length){
                    setStyle("#8cb3d9");
                }
                else if(total > ifshift[0].assigned.length){
                    setStyle("#8c8c8c");
                }
            }
            else{
                setStyle("#8c8c8c");
            }
            
        }
    }, [ifshift])
  return (
    <TouchableOpacity onPress={()=>{
        console.log(dayOfMonth, "pp")
        dispatch({type:"SHIFT_DISPLAY", payload:ifshift}) 
    }} style={[{ display:"flex",alignItems:"center", width:"13%",height:"12%",marginTop:5, marginBottom:"2%", justifyContent:"center", backgroundColor:dayStyle, borderRadius:100}, dayOfMonth!==0&&{ elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, backgroundColor:dayStyle}]} >
        <Text style={{textAlign:"center", color:ifshift.length>0?"white":"grey"}} >{dayOfMonth !== 0&& dayOfMonth} </Text>
    </TouchableOpacity>
  )
}

export default Day