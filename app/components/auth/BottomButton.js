import { useNavigation } from "@react-navigation/native";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LogoutApi } from "../../api/authApi";
import { clearAuth } from "../../store/authSlice";

export default function BottomButton() {
    const auth = useSelector(state => state.auth.value);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    async function HandleLogout() {
        result = await LogoutApi(auth.token);
        if(result.status)
            dispatch(clearAuth());

        if(!result.status)
            Alert.alert("Çıkış yapılamadı!");
    }

    return (
        <View style={styles.container}>
            {auth && (
                <TouchableOpacity 
                    onPress={HandleLogout} 
                    activeOpacity={0.8} 
                    style={styles.button}>
                    <Text style={styles.button.text}>Güvenli Çıkış</Text>
                </TouchableOpacity> 
            )}
            
            {!auth && (
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Auth', {screen: 'Register'})}>
                    <Text style={styles.button.text}>Yeni Kayıt</Text>
                </TouchableOpacity> 
            )}
        </View>
    );    
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
    },    

    button: {   
        marginBottom: 10, 
        width: '100%',
        text: {
            borderRadius: 10,
            padding: 10,
            fontSize: 16, 
            fontWeight: 500,   
            borderWidth: 1,  
            textAlign: 'center'                       
        }
                 
    }
});