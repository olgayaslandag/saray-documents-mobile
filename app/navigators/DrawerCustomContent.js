
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from "react-native";
import LoginView from "../views/auth/LoginView";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../store/authSlice";
import { LogoutApi } from "../api/authApi";

export default function DrawerCustomContent(props) {
    const auth = useSelector(state => state.auth.value);
    const dispatch = useDispatch();

    async function HandleLogout() {
        result = await LogoutApi(auth.token);
        if(result.status)
            dispatch(clearAuth());

        if(!result.status)
            Alert.alert("Çıkış yapılamadı!");
    }

    return (
      <DrawerContentScrollView {...props} contentContainerStyle={styles.container}> 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../assets/icon.png')} alt="" style={styles.image} />
        </View>
        <View style={{flex: 8, justifyContent: 'center'}}>
            {!auth && <LoginView styles={styles} />}
            {auth && <Text>Giriş yapıldı</Text>}
        </View>        
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
            {auth && (
                <TouchableOpacity onPress={HandleLogout} activeOpacity={0.8} style={{marginBottom: 10, width: '100%'}}>
                    <Text style={styles.form.button.text}>Güvenli Çıkış</Text>
                </TouchableOpacity> 
            )}
            
            {!auth && (
                <TouchableOpacity activeOpacity={0.8} style={{marginBottom: 10, width: '100%'}}>
                    <Text style={styles.form.button.text}>Yeni Kayıt</Text>
                </TouchableOpacity> 
            )}
        </View>
      </DrawerContentScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
              
    },

    image: {
        width: 145,
        height: 30
    },

    form: {
        container: {
            justifyContent: 'center',
        },        
        title: {
            fontSize: 20,
            marginBottom: 20,      
            textAlign: 'center'      
        },

        item: {
            container: {
                marginBottom: 20
            },
    
            input: {
                height: 40,
                borderWidth: 1,
                padding: 10,
                borderColor: '#C1C1C1',
                borderRadius: 10,
                color: 'black',                
            }
        },

        button: {
            container: {
                //flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 5
            },
            row: {
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
            },
            text: {
                borderRadius: 10,
                padding: 10,
                fontSize: 16, 
                fontWeight: 500,   
                borderWidth: 1,  
                textAlign: 'center'                       
            }
                     
        }      
    }
});