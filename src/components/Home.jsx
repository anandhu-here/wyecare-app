import moment from 'moment';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip';

const items = [
    {
        name:"Bookings",
        
    },
    {
        name:"Availability"
    },
    {
        name:"Trainings"
    },
    {
        name:"Documents"
    },
    {
        name:"Timesheets"
    },
    {
        name:"Invite"
    },

]


function Home({navigation}) {
    
  return (
    <View style={{flex:1, backgroundColor:"white", alignItems:"center"}}  >
        <View style={{flex:0.2, width:"90%"}} >
            <CalendarStrip
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
            />
        </View>
        <View style={{flex:0.2,width:"90%", alignItems:"center", backgroundColor:"white"}} >
            <TouchableOpacity onPress={()=>navigation.navigate('inshift')} style={{flex:1,width:"100%",  borderRadius:20, justifyContent:'center', borderWidth:0.1}} >
                <Text style={{textAlign:"center", fontSize:25}} >The Chase</Text>
                <Text style={{textAlign:"center", fontSize:20}} >LONG DAY</Text>
                <Text style={{textAlign:"center", fontSize:18}} >4 Printers Ave, Watford</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:0.7, justifyContent:"center", alignItems:"center" }} >
            <View style={{flex:1, flexDirection:"row", flexWrap:"wrap" ,justifyContent:"space-around", alignItems:"center",marginTop:"20%"}} >
                {
                    items.map(item=>(
                        <TouchableOpacity onPress={()=>navigation.navigate(item.name.toLowerCase())} key={item.name} style={{display:"flex", width:100, height:100, marginTop:20, justifyContent:"center", borderRadius:15, backgroundColor:"#e0ebeb", elevation:2, textAlign:"center"}} >
                            <Text style={{textAlign:"center"}} >{item.name}</Text>
                        </TouchableOpacity> 
                    ))
                }
                
                </View>
        </View>
    </View>
  )
}

export default Home