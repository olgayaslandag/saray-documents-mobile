import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import LayoutAuth from "./auth/LayoutAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearAuth } from "../store/authSlice";
import { LogoutApi } from "../api/authApi";
import { Alert } from "react-native";
import useAppTranslation from "../libs/useAppTranslation";
import { setLanguage } from "../store/languageSlice";
import { CommonActions, DrawerActions } from '@react-navigation/native';

export default function MenuView() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const auth = useSelector(state => state.auth.value);

    const { t, i18n, lang } = useAppTranslation();


    async function HandleLogout() {
        const result = await LogoutApi(auth.token);
        if(result.status) {
            dispatch(clearAuth());            
        }

        Alert.alert(result.status ? t("global.success") : t("global.error"), result.message)
        navigation.navigate('Main');
    }


    return (
        <LayoutAuth>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Home'})}>
                    <Text style={styles.button.text}>{t("navigation.home")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Company'})}>
                    <Text style={styles.button.text}>{t("navigation.corporate")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Sustainability'})}>
                    <Text style={styles.button.text}>{t("navigation.sustainability")}</Text>
                </TouchableOpacity>


                <View style={{marginTop: 10, marginBottom: 10, borderTopWidth: 1, borderColor: '#ccc'}}></View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'MeetRequest'})}>
                    <Text style={styles.button.text}>{t("navigation.meeting_requests")}</Text>
                </TouchableOpacity>

                {
                /*
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'MeetShowroomRequest'})}>
                    <Text style={styles.button.text}>{t("navigation.showroom_requests")}</Text>
                </TouchableOpacity>                
                */
                }
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Offers'})}>
                    <Text style={styles.button.text}>{t("navigation.offers")}</Text>
                </TouchableOpacity>



                <View style={{marginTop: 10, marginBottom: 10, borderTopWidth: 1, borderColor: '#ccc'}}></View>

                
            
                
                
                

                

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Documents'})}>
                    <Text style={styles.button.text}>{t("navigation.documents")}</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Favorites'})}>
                    <Text style={styles.button.text}>{t("navigation.favorites")}</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Ticket'})}>
                    <Text style={styles.button.text}>{t("navigation.support_requests")}</Text>
                </TouchableOpacity>             

                <View style={{marginTop: 10, marginBottom: 10, borderTopWidth: 1, borderColor: '#ccc'}}></View>


                <TouchableOpacity style={styles.button} onPress={() => {
                    const newLang = lang === "tr" ? "en" : "tr";
                    i18n.changeLanguage(newLang);
                    dispatch(setLanguage(newLang));

                    navigation.dispatch(DrawerActions.closeDrawer());
                    
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "Home" }],
                        })
                    );
                }}>
                    <Text style={styles.button.text}>{ lang === "tr" ? "English" : "Türkçe"}</Text>
                </TouchableOpacity> 

                <View style={{marginTop: 10, marginBottom: 10, borderTopWidth: 1, borderColor: '#ccc'}}></View>

                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth')}>
                    <Text style={styles.button.text}>{auth ? t("navigation.account") : t("navigation.login")}</Text>
                </TouchableOpacity> 
                {auth && (
                    <TouchableOpacity style={styles.button} onPress={HandleLogout}>
                        <Text style={styles.button.text}>{t("navigation.logout")}</Text>
                    </TouchableOpacity>
                )}                
            </View>
        </LayoutAuth>
    );
}

const styles = StyleSheet.create({
    button: {   
        marginBottom: 10, 
        width: '100%',
        text: {
            borderRadius: 0,
            paddingHorizontal: 10,
            paddingVertical: 8,
            fontSize: 16, 
            fontWeight: 500,   
            //borderBottomWidth: 1,  
            //borderBottomColor: '#ccc'
            //backgroundColor: '#000',
            //color: 'white'
        }
                 
    }
});