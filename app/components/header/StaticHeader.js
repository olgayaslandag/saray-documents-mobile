import MenuButton from "../icons/MenuButton";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device"

export default function StaticHeader() {
    const navigation = useNavigation();
    
    return (
        <View 
            borderRadius={30} 
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
        position: 'absolute',
        backgroundColor: 'white', 
        right: 5, 
        zIndex: 10,
        borderRadius: 30,
        padding: 16,
        width: 60,
        height: 60,
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: 8,   
        top: Device.osName === "iOS" ? 54 : 24,     
    }
});