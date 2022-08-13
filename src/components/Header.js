import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { Feather, EvilIcons, AntDesign } from '@expo/vector-icons';

function Header({navigation, custom}) {
  
  return (
    <View style={{display:"flex",backgroundColor:"white", flexDirection:"row", width:"100%", height:60, justifyContent:"space-between", alignItems:"center", paddingHorizontal:10 }} >
        <>
          {
            custom?(
              <TouchableOpacity onPress={()=>navigation.goBack()} >
                <AntDesign  name='back' size={24}/>
              </TouchableOpacity>
            ):(
              <>
                <Feather name="menu" size={24} color="black" />
                  <Text style={{fontSize:20}} >WYECARE</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('notification')}}>
                    <EvilIcons name="bell" size={24} color="black" />
                </TouchableOpacity>
              </>
            )
          }
        </>
    </View>
  )
}

export default Header