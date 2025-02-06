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
    const [process, setProcess] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    async function HandleLogin() {
        setProcess(true);
        const result = await LoginApi(form);
        
        if(result.status)
            dispatch(login(result.data));

        if(!result.status)
            Alert.alert("Hata", result.message);

        setProcess(false);
    }

    return (
        <LayoutAuth>
            <View style={styleAuth.form.container}>
                <Text style={{...styleAuth.form.title}}>Giriş Yapın</Text>
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, email: val})}
                        value={form.email}
                        placeholder="Eposta adresinizi girin"
                        autoComplete="email"
                        placeholderTextColor="black"
                        inputMode="email"
                    />
                </View>
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, password: val})}
                        value={form.password}
                        placeholder="Şifrenizi girin"
                        autoComplete="current-password"
                        secureTextEntry={true}
                        placeholderTextColor="black"
                    />
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