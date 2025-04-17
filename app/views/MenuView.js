import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import LayoutAuth from "./auth/LayoutAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearAuth } from "../store/authSlice";
import { LogoutApi } from "../api/authApi";
import { Alert } from "react-native";

export default function MenuView() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const auth = useSelector(state => state.auth.value);


    async function HandleLogout() {
        const result = await LogoutApi(auth.token);
        if(result.status) {
            dispatch(clearAuth());            
        }

        Alert.alert(result.status ? "Tebrikler" : "Hata Oluştu!", result.message)
        navigation.navigate('Main');
    }

    return (
        <LayoutAuth>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Home'})}>
                    <Text style={styles.button.text}>Ana Ekran</Text>
                </TouchableOpacity>                

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Favorites'})}>
                    <Text style={styles.button.text}>Favorilerim</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Offers'})}>
                    <Text style={styles.button.text}>Tekliflerim</Text>
                </TouchableOpacity>
            
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'MeetRequest'})}>
                    <Text style={styles.button.text}>Toplantı Taleplerim</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'MeetShowroomRequest'})}>
                    <Text style={styles.button.text}>Showroom Randevu Taleplerim</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Ticket'})}>
                    <Text style={styles.button.text}>Destek Taleplerim</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Documents'})}>
                    <Text style={styles.button.text}>Dökümanlar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Sustainability'})}>
                    <Text style={styles.button.text}>Sürdürülebilirlik</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Company'})}>
                    <Text style={styles.button.text}>Kurumsal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth')}>
                    <Text style={styles.button.text}>{auth ? 'Hesabım' : 'Giriş Yap'}</Text>
                </TouchableOpacity> 
                {auth && (
                    <TouchableOpacity style={styles.button} onPress={HandleLogout}>
                        <Text style={styles.button.text}>Çıkış Yap</Text>
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
            padding: 10,
            fontSize: 16, 
            fontWeight: 500,   
            borderBottomWidth: 1,  
            borderBottomColor: '#ccc'
            //backgroundColor: '#000',
            //color: 'white'
        }
                 
    }
});