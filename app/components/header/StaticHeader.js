import MenuButton from "../icons/MenuButton";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function StaticHeader() {
    const navigation = useNavigation();
    
    return (
        <View 
            borderRadius={30} 
            p="4"            
            width="60"
            height="60"
            alignItems="center"  
            alignSelf="flex-end"          
            mr="2"
            position="absolute"
            style={styles.container}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MenuButton />
            </TouchableOpacity>            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        right: -3, 
        top: 24, 
        zIndex: 10,
        borderRadius: 30,
        padding: 16,
        width: 60,
        height: 60,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: 8,
        position: 'absolute'
    }
});