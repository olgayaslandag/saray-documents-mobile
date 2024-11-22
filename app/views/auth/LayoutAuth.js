import { View, SafeAreaView, TouchableOpacity } from "react-native";
import Logo from "../../components/auth/Logo";
import { useNavigation, CommonActions } from "@react-navigation/native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



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
            
            <TouchableOpacity onPress={HandleClose} style={{marginBottom: -30}}>
                <FontAwesome5 name="times" size={20} color="black" style={{textAlign: 'right'}} />
            </TouchableOpacity>
            <Logo />
            <View style={{flex: 8, justifyContent: 'center'}}>
                {children}
            </View>            
        </SafeAreaView>
    );
}