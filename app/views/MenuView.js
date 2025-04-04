import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import LayoutAuth from "./auth/LayoutAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function MenuView() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const auth = useSelector(state => state.auth.value);

    function HandleLogout() {
        dispatch(clearAuth())
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
                    <Text style={styles.button.text}>Teklifler</Text>
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