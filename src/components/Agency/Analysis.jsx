import React from 'react'
import { ActivityIndicator, Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { basecolor } from '../../redux/constants';
import { View } from 'react-native';
import moment from 'moment';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseurl';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

function Analysis() {
  const {userInfo} = useSelector(state=>state.userLogin);
  const {profile} = userInfo.user;
  const [ loading, setLoading ] = useState(true);
  const [ period, setP ] = useState({f:null, l:null});
  const [c_month, setCM] = useState(moment().month()+1);

  const changeP = async(c) =>{
    let f,l;
    if(c <= 6){
      f = moment.months()[0];
      l = moment.months()[5];
    }
    else{
      f = moment.months()[6];
      l = moment.months()[11];
    }
    setP({f, l})

  }

  useEffect(()=>{
    changeP()
  }, [])

  const [ c_data, setCD ] = useState({
    labels: [  ],
    datasets: [
      {
        data: []
      }
    ]
  })
  useEffect(()=>{

    var cur_mon = moment().month()+1
    axios.get(`${baseUrl}get-anal?ag_id=${profile.id}&month=${cur_mon}&year=${moment().year()}`).then(res=>{
        let label = [];
        let datasets = [
          {
            data:Array(cur_mon-7).fill(0)
          }
        ]
        
        
        let b={}
        for (let i=0;i<res.data.length;i++){
          const {month} = res.data[i];
          if(b.hasOwnProperty(month)){
            b[res.data[i].month]+=1
          }
          else{
            b[res.data[i].month] = 1
          }
        }
        Object.keys(b).map(k=>{
          datasets[0].data[k-7] = b[k]
        })

        if(cur_mon<=6){
          label = [...moment.months().slice(0, cur_mon)]
        }
        else{
          label = [...moment.months().slice(6, cur_mon).map(i=>{return i.slice(0, 3)})]

        }
        setCD({labels:[...label], datasets:[...datasets]})
        setLoading(false);
        
    }).catch(e=>{
      setLoading(false);
      console.log(e, "error aanal")
    })
  },[])

  useEffect(()=>{
    console.log(c_data, "ccccdatat")
  }, [])
  return (
    <ScrollView contentContainerStyle={{flex:1, width:"100%", height:"100%", backgroundColor:"white", alignItems:"center"}}>
        {/* <View style={{flexDirection:"row", paddingTop:"10%", justifyContent:"space-around", alignItems:"center"}} >
            <TouchableOpacity>
                <AntDesign name="leftcircleo" size={35} color={basecolor} />
            </TouchableOpacity>
            <Text style={{fontSize:20, fontWeight:"700", color:"grey"}} >{moment.months()[moment().month()]}</Text>
            <TouchableOpacity>
                <AntDesign name="rightcircleo" size={35} color={basecolor} />
            </TouchableOpacity>
        </View> */}
        {
          loading?(
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}} >
              <ActivityIndicator size={30} />
            </View>
          ):(
            <View style={{flex:1,alignItems:"center", width:"100%" }} >
              <LineChart
            style={{
                marginTop:"5%",
                paddingVertical:5,
                borderRadius:10,
            }}
            off
            data={c_data}
            width={Dimensions.get('window').width-10}
            height={250}
            bezier
            fromZero={true}
            fromNumber={2}
            segments={c_data.datasets.length+1}
            xLabelsOffset={5}       
            onDataPointClick={({value, dataset, getColor})=>{
              console.log(value, "cal")
            }}   
            chartConfig={{
                backgroundColor: basecolor,
                backgroundGradientFrom: basecolor,
                backgroundGradientTo: basecolor,
                paddingTop:5,
                
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${.2})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
            verticalLabelRotation={0}
        />
            <View style={{flexDirection:"row", alignItems:"center", width:"100%", justifyContent:"space-around"}} >
                <TouchableOpacity >
                <AntDesign name="leftcircle" size={35} color={basecolor} />
                </TouchableOpacity>
                  <Text style={{fontSize:18, fontWeight:"500", color:"grey"}} >{period.f} - {period.l}</Text>
                <TouchableOpacity>
                <AntDesign name="rightcircle" size={35} color={basecolor} />
                </TouchableOpacity>
            </View>
            </View>
            
          )
        }
    </ScrollView>
  )
}

export default Analysis