import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
    
})

function Day({colIndex, item, final, _onPress, year, month, activeDate}) {
    const [ textStyle, setStyle ] = useState(false);
    useEffect(()=>{
        final.map(i=>{
            if(item < 10 ){
                if("0"+item.toString() === i.day && i.month === month && year.toString() === i.year  ){
                    setStyle({color:"green", fontWeight:"900"});
                }
                else{
                    setStyle(false)
                }
            }
            else{
                if(item.toString() === i.day && i.month[1] === (month+1).toString() && year === i.year ){
                    setStyle({color:"green", fontWeight:"900"});
                }
                else{
                    setStyle(false)
                }
            }
        })
    }, [final, activeDate])
  return (
    <TouchableOpacity onPress={() => _onPress(item, month, year)} style={{alignItems:"center", justifyContent:"center", width:"10%",  height:"50%",}} >
        <Text
            style={{
            flex: 1,
            height: 18,
            textAlign:"center",
            // Highlight header
            // Highlight Sundays
            color:textStyle.color,
            fontSize:18,
            // Highlight current date
            fontWeight: item == activeDate.getDate() || textStyle 
                                ? 'bold': '300'
            }}
            
        >
        {item != -1 ? item : ''}
    </Text>
    
    </TouchableOpacity >
  )
}

export default Day