import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ForgetApi } from "../../../api/authApi";
import { Alert, Text, View, TextInput, TouchableOpacity } from "react-native";
import { setCode } from "../../../store/authSlice";
import LayoutForget from "../LayoutForget";
import styleAuth from "../../../styles/styleAuth";
import generateNumber from "../../../libs/generateNumber";
import useAppTranslation from "../../../libs/useAppTranslation";

export default function EnterEmail() {
    const [form, setForm] = useState({email: '', password: '', code: ''});
    const [systemCode, setSystemCode] = useState("");
    const [process, setProcess] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { t } = useAppTranslation();


    useEffect(() => {
        const code = generateNumber();
        setSystemCode(code);
        setForm({...form, code });
    }, []);

    async function HandleForget() {
        if(!form.email) {
            Alert.alert(t("global.error"), t("global.error_fill_fields"));
            return;
        }

        setProcess(true);
        const result = await ForgetApi(form);
        setProcess(false);
        
        if(!result.status) {
            setErrors(result.result);
            Alert.alert(t("global.error"), result.message);
            return;
        }            
         
        dispatch(setCode(systemCode));
        Alert.alert(t("global.success"), result.message);
        navigation.navigate('Forget', {
            screen: 'EnterCode', 
            params: {email: form.email || 'deneme'}
        });
    }


    return (
        <LayoutForget>
            <Text style={styleAuth.form.title}>
                {t("forget.title")}
            </Text>
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
                    placeholder={t("forget.email_placeholder")}
                    autoComplete="email"
                    placeholderTextColor="black"
                    inputMode="email"
                />
                {errors.email && <Text style={styleAuth.form.item.errorMessage}>{errors.email ?? null}</Text>}
            </View>
            

            <TouchableOpacity onPress={HandleForget} activeOpacity={0.8} style={{marginBottom: 10}} disabled={process}>
                <Text style={{...styleAuth.form.button.text, backgroundColor: 'black', color: 'white'}}>
                    {t("forget.send_button")}
                </Text>
            </TouchableOpacity>        

            <TouchableOpacity onPress={() => navigation.navigate('Auth', {screen: 'Login'})} activeOpacity={0.8} style={{marginBottom: 10}}>
                <Text style={{...styleAuth.form.button.text, borderWidth: 0}}>
                    {t("forget.login_button")}
                </Text>
            </TouchableOpacity>   
        </LayoutForget>
    );
}