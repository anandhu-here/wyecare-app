import 'react-native-gesture-handler';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import NavigationRoute from './src/NavigationRoute';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './src/components/Home';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={{flex:1, marginTop:StatusBar.currentHeight, backgroundColor:"white"}} > 
      <NavigationRoute />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
