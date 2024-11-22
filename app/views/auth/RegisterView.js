import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert, StyleSheet } from "react-native";
import { RegisterApi } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import LayoutAuth from "./LayoutAuth";
import { useNavigation } from "@react-navigation/native";
import styleAuth from "../../styles/styleAuth";


export default function RegisterView() {
    const [form, setForm] = useState({name: '', email: '', password: ''});
    const dispatch = useDispatch();
    const navigation = useNavigation();

    async function HandleLogin() {
        const result = await RegisterApi(form);
        console.log(result)
        if(result.status)
            dispatch(login(result.data));

        if(!result.status)
            Alert.alert("bulunamadı!");
    }

    return (
        <LayoutAuth>
            <View style={styleAuth.form.container}>
                <Text style={styleAuth.form.title}>Kayıt Olun</Text>
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, name: val})}
                        value={form.name}
                        placeholder="Adınızı soyadınızı girin"
                        autoComplete="name"
                        placeholderTextColor="black"
                        inputMode="text"
                    />
                </View>
                
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

                <TouchableOpacity onPress={HandleLogin} activeOpacity={0.8} style={{marginBottom: 10}}>
                    <Text style={{...styleAuth.form.button.text, backgroundColor: 'black', color: 'white'}}>Kayıt</Text>
                </TouchableOpacity>        

                <TouchableOpacity onPress={() => navigation.navigate('Auth', {screen: 'Login'})} activeOpacity={0.8} style={{marginBottom: 10}}>
                    <Text style={{...styleAuth.form.button.text, borderWidth: 0}}>Giriş Ekranı</Text>
                </TouchableOpacity>      
            </View>
        </LayoutAuth>
    );
}