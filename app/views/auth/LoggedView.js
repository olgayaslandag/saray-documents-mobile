import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../store/authSlice";
import LayoutAuth from "./LayoutAuth";
import BottomButton from "../../components/auth/BottomButton";
import { useNavigation } from "@react-navigation/native";

export default function LoggedView() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    function HandleLogout() {
        dispatch(clearAuth())
    }

    return (
        <LayoutAuth>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Home'})}>
                    <Text style={styles.button.text}>Ana Ekran</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth')}>
                    <Text style={styles.button.text}>Hesabım</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Favorites'})}>
                    <Text style={styles.button.text}>Favorilerim</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Favorites'})}>
                    <Text style={styles.button.text}>Dökümanlar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Favorites'})}>
                    <Text style={styles.button.text}>Sürdürülebilirlik</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Favorites'})}>
                    <Text style={styles.button.text}>Kurumsal</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', {screen: 'Favorites'})}>
                    <Text style={styles.button.text}>İletişim</Text>
                </TouchableOpacity>
                
                
                
            </View>

            <View style={{flex: 1, paddingBottom: 20}}>
                <BottomButton />
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