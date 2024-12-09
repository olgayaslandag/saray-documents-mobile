import { View, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import Logo from "../../components/auth/Logo";
import { useNavigation, CommonActions } from "@react-navigation/native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as Device from "expo-device"


export default function LayoutAuth({ children }) {    
    const navigation = useNavigation();

    function HandleClose() {
        navigation.navigate('Main');

        /*
        navigation.dispatch(
            CommonActions.reset()
        );
        */
    }
    return (
        <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: '#FFF'}}>  
            <View style={styles.ios_container}>
                <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>                    
                    <Logo />
                    <TouchableOpacity onPress={HandleClose} style={{marginRight: 10}}>
                        <FontAwesome5 name="times" size={26} color="black" style={{textAlign: 'right'}} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 8, justifyContent: 'center'}}>
                    {children}
                </View>            
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    ios_container: {
        flex: 1,
        padding: Device.osName === "iOS" ? 10 : 0,
    }
});