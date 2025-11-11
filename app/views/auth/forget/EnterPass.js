import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChangePasswordApi } from "../../../api/authApi";
import LayoutForget from "../LayoutForget";
import styleAuth from "../../../styles/styleAuth";
import useAppTranslation from "../../../libs/useAppTranslation";

export default function EnterPass({ route }) {
    const { email } = route.params;
    const [form, setForm] = useState({ email, password: '' });
    const [process, setProcess] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const navigation = useNavigation();
    const { t } = useAppTranslation();


    async function HandleSave() {
        if(!form.password) {
            Alert(t("global.error"), t("forget.enter_pass.error_empty"));
            return;
        }

        setProcess(true);
        const result = await ChangePasswordApi(form);
        setProcess(false);
        
        if(!result.status) {
            setErrors(result.result);
            Alert.alert(t("global.error"), result.message);
            return;
        }

        Alert.alert(t("global.success"), t("forget.enter_pass.success"));
        navigation.navigate('Auth', {screen: 'Login'})
    }

    return (
        <LayoutForget>
            <Text style={styleAuth.form.title}>
                {t("forget.title")}
            </Text>
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
                    placeholder={t("forget.enter_pass.email_placeholder")}
                    placeholderTextColor="black"
                    secureTextEntry
                />
                {errors.password && <Text style={styleAuth.form.item.errorMessage}>{errors.password ?? null}</Text>}
            </View>
            

            <TouchableOpacity onPress={HandleSave} activeOpacity={0.8} style={{marginBottom: 10}} disabled={process}>
                <Text style={{...styleAuth.form.button.text, backgroundColor: 'black', color: 'white'}}>
                    {t("forget.enter_pass.send_button")}
                </Text>
            </TouchableOpacity>           
        </LayoutForget>
    );
}