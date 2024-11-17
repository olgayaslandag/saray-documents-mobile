import { Box, Stack, HStack } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuButton from "../icons/MenuButton";
import SearchForm from "./SearchForm";

export default function DocumentHeader() {
  const navigation = useNavigation();

    return (
        <Stack direction="column">
          <HStack>  
            <Box width="87%" mt="3">
              <SearchForm pt={2}  />
            </Box>                       
            
            <TouchableOpacity 
              onPress={() => navigation.openDrawer()} 
              style={styles.button}>
              <MenuButton />
            </TouchableOpacity>
          </HStack>          
        </Stack>
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