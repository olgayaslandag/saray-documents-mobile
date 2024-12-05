import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ForgetApi } from "../../../api/authApi";
import { Alert, Text, View, TextInput, TouchableOpacity } from "react-native";
import LayoutForget from "../LayoutForget";
import styleAuth from "../../../styles/styleAuth";
import generateNumber from "../../../libs/generateNumber";
import { setCode } from "../../../store/authSlice";

export default function EnterEmail() {
    const [form, setForm] = useState({email: '', password: '', code: ''});
    const [systemCode, setSystemCode] = useState("");
    const navigation = useNavigation();
    const dispatch = useDispatch();


    useEffect(() => {
        const code = generateNumber();
        setSystemCode(code);
        setForm({...form, code });
    }, []);

    async function HandleForget() {
        const result = await ForgetApi(form);
        
        if(result.status)
            dispatch(setCode(systemCode));
        
        if(!result.status)
            Alert.alert(result.message);

        Alert.alert("tebrikler", result.message);
        if(result.status)
            navigation.navigate('Forget', {screen: 'EnterCode'})
    }


    return (
        <LayoutForget>
            <Text style={styleAuth.form.title}>Giriş Yapın</Text>
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
            

            <TouchableOpacity onPress={HandleForget} activeOpacity={0.8} style={{marginBottom: 10}}>
                <Text style={{...styleAuth.form.button.text, backgroundColor: 'black', color: 'white'}}>Şifremi Sıfırla</Text>
            </TouchableOpacity>        

            <TouchableOpacity onPress={() => navigation.navigate('Auth', {screen: 'Login'})} activeOpacity={0.8} style={{marginBottom: 10}}>
                <Text style={{...styleAuth.form.button.text, borderWidth: 0}}>Giriş Ekranı</Text>
            </TouchableOpacity>   
        </LayoutForget>
    );
}