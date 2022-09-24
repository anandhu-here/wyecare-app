import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import moment from 'moment'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FancyAlert } from 'react-native-expo-fancy-alerts'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from 'react-redux'
import { baseUrl } from '../../baseurl'
import { basecolor } from '../../redux/constants'

const styles = StyleSheet.create({
    alert: {
      backgroundColor: 'red',
    },
    icon: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C3272B',
      width: '100%',
    },
    content: {
      display: 'flex',
      width:"100%",
      justifyContent:"center",
      alignItems:"center",
      paddingBottom:"15%"
    },
})


function Finance({navigation}) {
    const [visible, setVisible] = useState(false)
    const [ isD1, setD1 ] = useState(false);
    const [ isD2, setD2 ] = useState(false);
    const [d1, setDate1] = useState(false);
    const [d2, setDate2] = useState(false);
    const [homes, setHomes] = useState([]);
    const [selected, setS] = useState(null);
    const [total, setT] = useState({"LONGDAY":0, "LATE":0, "EARLY":0, "NIGHT":0});
    
    const {userInfo} = useSelector(state=>state.userLogin);

    useEffect(()=>{
        axios.get(`${baseUrl}users?shift_id=null&type=HOME`, {headers:{
            "Authorization":`Token ${userInfo.token}`
        }}).then(res=>{
            setHomes([...res.data])
            setS(res.data[0])
        }).catch(e=>{
            console.log(e)
        })


        
    }, [])
    useEffect(()=>{
        return ()=>{
            setT({"LONGDAY":0, "LATE":0, "EARLY":0, "NIGHT":0})
        }
    }, [])

    const gen = async() =>{
        
        
    }


  return (
    <ScrollView  contentContainerStyle={{flex:1, width:"100%", height:"100%", backgroundColor:"white"}} >
        <View style={{flex:1, width:"100%", justifyContent:"center", alignItems:"center"}} >
            <TouchableOpacity onPress={()=>{
                setVisible(true)
            }} style={{paddingVertical:'5%', paddingHorizontal:"10%", backgroundColor:basecolor, borderRadius:10}} >
                <Text style={{color:"white", fontSize:17, fontWeight:"500"}} >Generate Invoice</Text>
            </TouchableOpacity>
        </View>
        <FancyAlert
        visible={visible}
        onRequestClose={()=>setVisible(false)}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: basecolor,
          borderRadius:100,
          width: '100%',
        }}><Text style={{color:"white", fontSize:20, fontWeight:"700"}} >W</Text></View>}
            style={{ backgroundColor: "white", flex:1}}
            
            >
                <View style={styles.content} >
                    <Text style={{fontSize:18, fontWeight:"600", color:"grey", paddingVertical:"5%"}} >Select your home</Text>
                    <View style={{width:"90%", alignItems:"center", borderWidth:1, borderRadius:100, borderStyle:"dashed", borderColor:basecolor}} >
                    <Picker
                        selectedValue={selected}
                        style={{width:"100%", }}
                        onValueChange={(item, index)=>{
                            setS(item)
                        }}
                    >
                        {
                            homes.map(i=>(
                                <Picker.Item value={i.id} label={i.name}  />
                            ))
                        }
                    </Picker>
                    </View>
                    
                    <TouchableOpacity onPress={()=>{
                        setVisible(false);
                        setD1(true)
                    }} style={{paddingVertical:'5%', marginTop:"5%", borderRadius:10, paddingHorizontal:"10%", backgroundColor:d1?"white":basecolor}} >
                        <Text style={{color:d1?basecolor:"white", fontWeight:"600"}} >{d1?moment.months()[moment(d1).month()]+" "+moment(d1).date().toString()+"th"+","+" "+moment(d1).year().toString():"Start date"}</Text>
                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        setVisible(false);
                        setD2(true)
                    }} style={{paddingVertical:'5%', marginTop:"5%", borderRadius:10, paddingHorizontal:"10%", backgroundColor:d2?"white":basecolor}} >
                        <Text style={{color:d2?basecolor:"white", fontWeight:"600"}} > {d2?moment.months()[moment(d2).month()]+" "+moment(d2).date().toString()+"th"+","+" "+moment(d2).year().toString():"End date"}</Text>
                    </TouchableOpacity>

                    {
                        d2&&(
                            <TouchableOpacity onPress={()=>{
                                setDate1(false)
                                setDate2(false);
                                setVisible(false);
                                setD1(false);setD2(false);setS(null);
                                axios.get(`${baseUrl}get-in?home_id=${selected.id}&agent_id=${userInfo.user.profile.id}&month1=${moment(d1).month()+1}&month2=${moment(d2).month()+1}&year=${moment(d1).year()}&day1=${moment(d1).date()}&day2=${moment(d2).date()}`, ).then(res=>{
                                    var t = {...total};
                                    res.data.map(sheet=>{
                                        t[sheet.type] = t[sheet.type]+1
                                    })
                                    navigation.navigate('invoice', {home:selected, total:t});
                                }).catch(e=>{
                                    console.log("eddde")
                                })
                                
                            }} style={{paddingVertical:'5%', marginTop:"5%", borderRadius:10, paddingHorizontal:"10%", backgroundColor:basecolor}} >
                                <Text style={{color:"white", fontWeight:"500"}} >Generate</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>

                
            </FancyAlert>
            <DateTimePickerModal
                isVisible={isD1}
                style={{flex:1}}
                mode="date"
                onConfirm={(d)=>{
                    setDate1(d);
                    setD1(false);
                    setVisible(true)
                }}
                onCancel={()=>setD1(false)}
            />
            <DateTimePickerModal
                isVisible={isD2}
                style={{flex:1}}
                mode="date"
                onConfirm={(d)=>{
                    setDate2(d);
                    setD2(false);
                    setVisible(true)
                }}
                onCancel={()=>setD2(false)}
            />
    </ScrollView>
  )
}

export default Finance