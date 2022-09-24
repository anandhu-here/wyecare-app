import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl } from '../baseurl';
import { basecolor } from '../redux/constants';
import AlertBox from './util/AlertBox';
import { FancyAlert } from 'react-native-expo-fancy-alerts';






const styles = StyleSheet.create({
  alert: {
    backgroundColor: '#EEEEEE',
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: 'center',
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#4CB748',
    marginTop: 16,
    minWidth: '45%',
    paddingHorizontal: 16,
  },
  btnc: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: 'brown',
    marginTop: 16,
    minWidth: '45%',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
});



function Search({navigation}) {
  const serviceContext = useSelector(state=>state.serviceChangeReducer);
  const {userInfo}  = useSelector(state=>state.userLogin);
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const [ search, setSearch ] = useState([]);
  const [ alert, setAlert ] = useState(false);
  const [ alerttype, setType ] = useState(null);
  const [ selected, setSA ] = useState(false);
  const [message, setMS] = useState("");
  const dispatch = useDispatch()
  useEffect(()=>{
    const { searchcontent } = serviceContext;
    if(searchcontent.length === 3){
      axios.get(`${baseUrl}search?content=${searchcontent}`).then(res=>{
        setSearch([...res.data])
      }).catch(e=>console.log(e))
    }
    if(searchcontent.length === 0){
      setSearch([])
    }
    
  }, [serviceContext])

  useEffect(()=>{
    return ()=>{
      dispatch({type:"NEW_SEARCH", payload:""})
      setSearch([])
    }
  }, [])
  return (
    <View style={{flex:1, backgroundColor:"white" }} >
      <View style={{flex:1 ,  width:"100%", alignItems:"center", backgroundColor:"white",borderTopLeftRadius:50, borderTopRightRadius:50,}} >
        <ScrollView style={{width:"95%"}} contentContainerStyle={{flex:0.98,  marginTop:"2%", }} >
          <Text style={{paddingVertical:"5%", paddingLeft:"5%", fontSize:19, }} >{search.length} Results</Text>
          {
            search.map(item=>{
              return(
                <TouchableOpacity
                  onPress={()=>{
                    setMS(`Would you like to send a request to join ${item.name}`)
                    setSA(item);
                    setType("SEND");
                    setVisible(true)
                  }}
                style={{ paddingLeft:"5%", paddingVertical:"5%", backgroundColor:"white", borderRadius:100}} >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
      
      <FancyAlert
        visible={visible}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
          borderRadius: 50,
          width: '100%',
        }}><Text>🤓</Text></View>}
        style={{ backgroundColor: 'white' }}
        
      >
        <View style={styles.content}>
          <Text style={styles.contentText}>{message}</Text>
    
          
          
          {
            alerttype==="OK"?(
              <TouchableOpacity style={styles.btn} onPress={()=>setVisible(false)} >
                  <Text style={styles.btnText}>OK</Text>
                </TouchableOpacity>
            ):(
              <View style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"center", alignItems:"center", }} >
              <TouchableOpacity style={styles.btnc} onPress={()=>setVisible(false)} >
                  <Text style={styles.btnText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={()=>{
                  setVisible(false);
                  setMS("")
                  if(alerttype === "SEND"){
                    axios.post(`${baseUrl}join-request`, {agency_id:selected.id, profile_id:userInfo.user.profile.id}, {headers:{
                      "Content-Type":"application/json"
                    }}).then(res=>{
                      const {message} = res.data;
                      
                      
                      if(message === "success"){
                        setMS("Join request sent successfuly");
                        setType("OK")
                        setVisible(true);
                        axios.post('https://exp.host/--/api/v2/push/send', {to:selected.push_token, title:"Join request", sound:"default", body:`${userInfo.user.profile.first_name} ${userInfo.user.profile.last_name} has requested to join`, data:{type:"JOIN_REQUEST", data:{}, priority:3}}, {headers: {
                            'Content-Type': 'application/json',
                          },}).then(res=>{
                            navigation.navigate("home")
                          }).catch(e=>console.log(e, "kunna"))
                      }
                      else{
                        setMS(message);
                        setType("OK");
                        setVisible(true);
                      }
                    }).catch(e=>{
                      console.log(e, "error")
                    })
                  }
                  else{
                    setVisible(false)
                  }
                }}>
                  <Text style={styles.btnText}>OK</Text>
                </TouchableOpacity> 
                
                </View>
            )
          }
        </View>
      </FancyAlert>
    </View>
  )
}

export default Search