import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { LoginApi } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";


export default function LoginView({ styles }) {
    const [form, setForm] = useState({email: '', password: ''});
    const dispatch = useDispatch();

    async function HandleLogin() {
        const result = await LoginApi(form);
        
        if(result.status)
            dispatch(login(result.data));

        if(!result.status)
            Alert.alert("bulunamadı!");
    }

    return (
        <View style={styles.form.container}>
            <Text style={styles.form.title}>Giriş Yapın</Text>
            <View style={styles.form.item.container}>
                <TextInput
                    style={styles.form.item.input}
                    onChangeText={val => setForm({...form, email: val})}
                    value={form.email}
                    placeholder="Eposta adresinizi girin"
                    autoComplete="email"
                    placeholderTextColor="black"
                    inputMode="email"
                />
            </View>
            <View style={styles.form.item.container}>
                <TextInput
                    style={styles.form.item.input}
                    onChangeText={val => setForm({...form, password: val})}
                    value={form.password}
                    placeholder="Şifrenizi girin"
                    autoComplete="current-password"
                    secureTextEntry={true}
                    placeholderTextColor="black"
                />
            </View>

            <TouchableOpacity onPress={HandleLogin} activeOpacity={0.8} style={{marginBottom: 10}}>
                <Text style={{...styles.form.button.text, backgroundColor: 'black', color: 'white'}}>Giriş Yap</Text>
            </TouchableOpacity>        

            <TouchableOpacity onPress={() => console.log(form)} activeOpacity={0.8} style={{marginBottom: 10}}>
                <Text style={{...styles.form.button.text, borderWidth: 0}}>Şifremi Unuttum</Text>
            </TouchableOpacity>      
        </View>
    );
}