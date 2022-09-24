import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (value) => {
    try {
      return await AsyncStorage.setItem('@userInfo', JSON.stringify(value))
    } catch (e) {
      // saving error
    }
  }

export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userInfo')
      if(value !== null) {
        return value
      }
    } catch(e) {
      // error reading value
    }
  }

export const deleteItem = async () =>{
    try{
        return AsyncStorage.removeItem('@userInfo');
    }
    catch{
        return false
    }
}


