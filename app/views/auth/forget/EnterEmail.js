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
    const [process, setProcess] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const dispatch = useDispatch();


    useEffect(() => {
        const code = generateNumber();
        setSystemCode(code);
        setForm({...form, code });
    }, []);

    async function HandleForget() {
        if(!form.email) {
            Alert.alert("Hata!", "Lütfen tüm alanları doldurunuz!");
            return;
        }

        setProcess(true);
        const result = await ForgetApi(form);
        setProcess(false);
        
        if(!result.status) {
            setErrors(result.result);
            Alert.alert("Hata!", result.message);
            return;
        }            
         
        dispatch(setCode(systemCode));
        Alert.alert("Tebrikler", result.message);
        navigation.navigate('Forget', {
            screen: 'EnterCode', 
            params: {email: form.email || 'deneme'}
        });
    }


    return (
        <LayoutForget>
            <Text style={styleAuth.form.title}>Şifremi Sıfırla</Text>
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
                {errors.email && <Text style={styleAuth.form.item.errorMessage}>{errors.email ?? null}</Text>}
            </View>
            

            <TouchableOpacity onPress={HandleForget} activeOpacity={0.8} style={{marginBottom: 10}} disabled={process}>
                <Text style={{...styleAuth.form.button.text, backgroundColor: 'black', color: 'white'}}>Şifremi Sıfırla</Text>
            </TouchableOpacity>        

            <TouchableOpacity onPress={() => navigation.navigate('Auth', {screen: 'Login'})} activeOpacity={0.8} style={{marginBottom: 10}}>
                <Text style={{...styleAuth.form.button.text, borderWidth: 0}}>Giriş Ekranı</Text>
            </TouchableOpacity>   
        </LayoutForget>
    );
}