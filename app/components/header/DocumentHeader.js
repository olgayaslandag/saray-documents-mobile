import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuButton from "../icons/MenuButton";
import SearchForm from "./SearchForm";

export default function DocumentHeader() {
  const navigation = useNavigation();

    return (
          <View style={{flexDirection: 'row'}}>  
            <View style={{width: '87%', marginTop: 12}}>
              <SearchForm pt={2}  />
            </View>                       
            
            <TouchableOpacity 
              onPress={() => navigation.openDrawer()} 
              style={styles.button}>
              <MenuButton />
            </TouchableOpacity>
          </View>          
    );
}


const styles = StyleSheet.create({
  button: {
    width: '10%', 
    marginLeft: '3%',  
    alignItems: 'flex-end', 
    height: 30, 
    marginTop: 40
  }
});