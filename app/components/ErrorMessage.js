import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import useAppTranslation from "../libs/useAppTranslation";

export default function ErrorMessage() {
    const auth = useSelector(state => state.auth.value);
    const navigation = useNavigation();
    const { t } = useAppTranslation();

    if (!auth) {
        return (
            <View>
                <Text style={{ fontSize: 16 }}>{t("global.login_required")}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Auth')} style={styles.buttons.login.container}>
                    <Text style={styles.buttons.login.text}>{t("navigation.login")}</Text>
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