import { Box, View } from "native-base";
import MenuButton from "../icons/MenuButton";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function StaticHeader() {
    const navigation = useNavigation();
    
    return (
        <View flex="1">
            <View 
                borderRadius={30} 
                p="4"            
                width="60"
                height="60"
                alignItems="center"  
                alignSelf="flex-end"          
                mr="2"
                position="absolute"
                style={{backgroundColor: 'white', right: -3, top: 24, zIndex: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <MenuButton />
                </TouchableOpacity>
                
            </View>
        </View>
    );
}