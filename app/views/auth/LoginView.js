import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert, StyleSheet } from "react-native";
import { LoginApi } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import LayoutAuth from "./LayoutAuth";
import { useNavigation } from "@react-navigation/native";
import BottomButton from "../../components/auth/BottomButton";
import styleAuth from "../../styles/styleAuth";


export default function LoginView() {
    const [form, setForm] = useState({email: '', password: ''});
    const [errors, setErrors] = useState([]);
    const [process, setProcess] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    async function HandleLogin() {
        if(!form.email || !form.password) {
            Alert.alert("Hata!", "Lütfen tüm alanları doldurunuz.");            
            return;
        }

        setProcess(true);
        const result = await LoginApi(form);
        setProcess(false);
                
         if(!result.status) {
            setErrors(result.data);
            Alert.alert("Hata", result.message);
            return;
        }    
        
        if(result.status){
            dispatch(login(result.data));
            navigation.navigate('Main', {screen: 'Home'});
        }                           
    }

    return (
        <LayoutAuth>
            <View style={styleAuth.form.container}>
                <Text style={{...styleAuth.form.title}}>Giriş Yapın</Text>
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={errors.email ? styleAuth.form.item.inputError : styleAuth.form.item.input}
                        onChangeText={val => {
                            setForm({...form, email: val})
                            if (errors.email) {
                                setErrors({...errors, email: null});
                            }
                        }}
                        value={form.email}
                        placeholder="Eposta adresinizi girin"
                        autoComplete="email"
                        placeholderTextColor="black"
                        inputMode="email"
                    />
                    {errors.email && <Text style={styles.errorMessage}>{errors.email ?? null}</Text>}
                </View>
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={errors.password ? styleAuth.form.item.inputError : styleAuth.form.item.input}
                        onChangeText={val => {
                            setForm({...form, password: val})
                            if (errors.password) {
                                setErrors({...errors, password: null});
                            }
                        }}
                        value={form.password}
                        placeholder="Şifrenizi girin"
                        autoComplete="current-password"
                        secureTextEntry={true}
                        placeholderTextColor="black"
                    />
                    {errors.password && <Text style={styles.errorMessage}>{errors.password ?? null}</Text>}
                </View>

                <TouchableOpacity onPress={HandleLogin} activeOpacity={0.8} style={{marginBottom: 10}} disabled={process}>
                    <Text style={{...styleAuth.form.button.text, backgroundColor: 'black', color: 'white'}}>Giriş Yap</Text>
                </TouchableOpacity>        

                <TouchableOpacity onPress={() => navigation.navigate('Auth', {screen: 'Forget'})} activeOpacity={0.8} style={{marginBottom: 10}}>
                    <Text style={{...styleAuth.form.button.text, borderWidth: 0}}>Şifremi Unuttum</Text>
                </TouchableOpacity>      
            </View>

            <View style={{flex: 1, paddingBottom: 20}}>
                <BottomButton />
            </View>
        </LayoutAuth>
    );
}


const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
    }
});