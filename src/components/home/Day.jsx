import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { basecolor } from '../../redux/constants';

function Day({ day: { visible, dayOfMonth, date }, month, year }) {
    const calendarContext = useSelector(state => state.cal_home);
    const authContext = useSelector(state => state.userLogin);
    const [ ifshift, setIF ] = useState(false);
    const [style, setStyle] = useState("white")
    const dispatch = useDispatch();
    const {
        shiftPublished,
    } = calendarContext;

    var thisDayShifts = [];
    let todaysEvents = [];
    var total_ = 0;
    var total_as=0;
    useEffect(()=>{
        if(authContext.newShift){
            // var t = [...shiftAssigned, calendarContext.newShift];
            // dispatch({type:"SET_SHIFT_ASSIGNED", payload:t});
        }
    }, [authContext])

    useEffect(()=>{
        setIF(null);
        setStyle("white")
        shiftPublished.forEach(shift => {  
            
          if (date === `${shift.year}-${shift.month}-${shift.day}`) {
            var total = shift.longday + shift.night + shift.late + shift.early;
            if(total === shift.assigned.length){
                setStyle("#3197a5");
            }
            else if(total > shift.assigned.length){
                setStyle("#e76262");
            }
            setIF(shift);
            // var t = shift.longday + shift.night + shift.late + shift.early;
            // total_as+=shift.assigned.length;
            // total_+=t
          }
        });
      }, [calendarContext])
    
    

  return (
    <TouchableOpacity onPress={()=>{
        if(ifshift){
            console.log("mairan")
            dispatch({type:"SHIFT_DISPLAY_FOR_HOME", payload:ifshift});
        }
        else{
            dispatch({type:"OPEN_ASSIGN", payload:{month, year,day:dayOfMonth, open:true}})
        }
    }} style={[{ display:"flex",alignItems:"center", width:"13%",height:"12%",marginTop:7, justifyContent:"center", borderRadius:100,},dayOfMonth!==0&&{ elevation:10, shadowOffset:{width:3, height:3}, shadowColor:"grey", shadowOpacity:0.5, backgroundColor:style }]} >
        <Text style={{textAlign:"center", color:style !== "white"?"white":"grey"}} >{dayOfMonth !== 0&& dayOfMonth} </Text>
    </TouchableOpacity>
  )
}

export default Day