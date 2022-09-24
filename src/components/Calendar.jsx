import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Day from './Day';
import { AntDesign } from '@expo/vector-icons';
var months = ["January", "February", "March", "April", 
 "May", "June", "July", "August", "September", "October", 
 "November", "December"];

var weekDays = [
     "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
 ]; 
var nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Calendar() {
    const [ activeDate, setActDate ] = useState(new Date());
    const authContext = useSelector(state=>state.userLogin);
    const [ assigned, setAssigned ] = useState([]);
    const [ shift, setShift ] = useState(false);
    const [ final, setFinal ] = useState([]);
    const calendarCntx = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(authContext.userInfo){
            const {userInfo} = authContext;
            const id = userInfo.user.profile.id;
            axios.get(`http://3.86.108.50:8000/api/list-assigned?employee_id=${id}`).then(res=>{
                dispatch({type:"SET_SHIFT_ASSIGNED", payload:res.data});
                setAssigned([...res.data]);
            }).catch(e=>console.log(e, ",lklll"))
            }
    }, [authContext])

    

    useEffect(()=>{
        var final = []
        assigned.map(item=>{
            final.unshift(item.shiftname);
            var s = item.shiftname;
            var day = parseInt(s.day); month=parseInt(s.month); 
            if(day ===  activeDate.getDate() && month === activeDate.getMonth()){
                dispatch({type:"SHIFT_DISPLAY", payload:item})
            }
            else{
                console.log("error")
            }
        })
        
        setFinal([...final]);
        
    }, [assigned])
    
    const [showFull, setShow] = useState(false);
    var year = activeDate.getFullYear();
    var month = activeDate.getMonth();

    useEffect(()=>{
    }, [activeDate])

    var firstDay = new Date(year, month, 1).getDay(); 
    var maxDays = nDays[month]
    if (month == 1) { // February
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
    }
    } 

    const matreixGen = () =>{
        var matrix = [];
        matrix[0] = weekDays;
        var c = 1;
        for(var row = 1; row < 7; row++){
            matrix[row] = [];
            for(var col=0;col<7;col++){
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = c++;
                  } else if (row > 1 && c <= maxDays) {
                    // Fill in rows only if the c's not greater than
                    // the number of days in the month
                    matrix[row][col] = c++;
                  }
            }
        }
        var rows_ = [];
        matrix.map((row, index)=>{
            row.map((item, colIndex)=>{
                if(typeof(item) === "number"){
                    rows_.push(item)
                }
            })
        })
        return matrix;
    }
    const changeMonth = (n) => {
        var newDate = new Date();
        newDate.setMonth(activeDate.getMonth()+n)
        setActDate(newDate);
    }
    const _onPress = (item, curmonth, curyear) =>{
        console.log(item, "---")
        assigned.map(ass=>{
            var s = ass.shiftname;
            
            var day = parseInt(s.day); month=parseInt(s.month); 
            if(day === item && month ===  curmonth+1 && curyear===s.year ){
                dispatch({type:"SHIFT_DISPLAY", payload:ass});
            }
            else{
                dispatch({type:"SHIFT_DISPLAY", payload:false});
            }
        })
    }
    useEffect(()=>{
    }, [activeDate])
    var matrix = matreixGen();  
    
    var rows = [];
    
    rows = matrix.map((row, rowIndex) => {
        
        var rowItems = row.map((item, colIndex) => {
        return (
            <Day key={colIndex} colIndex={colIndex} item={item} final={final} _onPress={_onPress} year={year} month={month} activeDate={activeDate}/>
            );
        })
        return(
            <View
                key={rowIndex}  
                style={{
                    
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width:"100%",
                }}>
                {rowItems}
            </View> 
        )})
  return (
    <View style={{flex:1, borderRadius:20, paddingBottom:15,justifyContent:"center", paddingVertical:"2%", alignItems:"center"}} >
        <View style={{flex:0.2,flexDirection:"row",backgroundColor:"#e0ebeb", alignItems:"center", width:"100%", justifyContent:"space-around", borderRadius:100}} >
            <TouchableOpacity onPress={()=>{
                changeMonth(-1);                
            }} >
                    <AntDesign name="leftcircle" size={24} color="teal" />
            </TouchableOpacity>
            <Text style={{fontSize:20}} >{ months[month] }  {year}  {activeDate.getMonth()}</Text>
            <TouchableOpacity onPress={()=>{
                changeMonth(+1)
            }} >
                    <AntDesign name="rightcircle" size={24} color="teal" />
            </TouchableOpacity>
        </View>
        <View style={{flex:0.9}} >
            {rows}
        </View>
    </View>
  )
}

export default Calendar