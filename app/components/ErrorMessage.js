import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function ErrorMessage() {
    const auth = useSelector(state => state.auth.value);
    const navigation = useNavigation();

    if (!auth) {
        return (
            <View>
                <Text style={{ fontSize: 16 }}>Kullanıcı girişi yapmalısınız!</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Auth')} style={styles.buttons.login.container}>
                    <Text style={styles.buttons.login.text}>Giriş Yap</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return null;
}

const styles = StyleSheet.create({
    buttons: {
        login: {
            container: {
                width: 120,
                backgroundColor: 'black', 
                borderRadius: 10, 
                marginTop: 10,
            },
            text: {                
                padding: 10,                 
                fontSize: 16,
                color: 'white',     
                textAlign: 'center'  ,     
            }            
        }
    }
});