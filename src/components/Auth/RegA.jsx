import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

function RegA() {
  return (
    <View style={{...StyleSheet.absoluteFill}} >
        <View>
            <TextInput
                style={styles.textinput}
            />
        </View>
    </View>
  )
}

export default RegA


const styles = StyleSheet.create({
    textinput:{
        width:"90%",
        height:"10%"
    }
})