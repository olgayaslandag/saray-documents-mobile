import { StyleSheet, TouchableOpacity, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuButton from "../icons/MenuButton";
import SearchForm from "./SearchForm";
import * as Device from "expo-device"

export default function DocumentHeader() {
  const navigation = useNavigation();

  return (
        <SafeAreaView style={{marginTop: 40, flexDirection: 'row', paddingHorizontal: 0, marginLeft: -2,  paddingTop: Device.osName === "iOS" ? 30 : 0, paddingBottom: 0}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MenuButton />
            </TouchableOpacity> 
            <View  style={{ flex: 1}}>
              <SearchForm />
            </View>
        </SafeAreaView>
    );
    return (
          <View style={{flexDirection: 'row'}}>  
            <TouchableOpacity 
              onPress={() => navigation.openDrawer()} 
              style={styles.button}>
              <MenuButton />
            </TouchableOpacity>

            <View style={{width: '87%', marginTop: 12}}>
              <SearchForm pt={2}  />
            </View>  
          </View>          
    );
}


const styles = StyleSheet.create({
  button: {
    width: '10%',     
    
    marginTop: 40,
  }
});