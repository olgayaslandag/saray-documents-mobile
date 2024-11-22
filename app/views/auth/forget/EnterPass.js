import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import LayoutForget from "../LayoutForget";
import styleAuth from "../../../styles/styleAuth";
import { useNavigation } from "@react-navigation/native";

export default function EnterPass() {
    const [form, setForm] = useState({email: '', password: ''});

    const navigation = useNavigation();

    function HandleSave() {
        navigation.navigate('Auth', {screen: 'Login'})
    }

    return (
        <LayoutForget>
            <Text style={styleAuth.form.title}>Yeni şifrenizi girin</Text>
            <View style={styleAuth.form.item.container}>
                <TextInput
                    style={styleAuth.form.item.input}
                    onChangeText={val => setForm({...form, password: val})}
                    value={form.password}
                    placeholder="Şifrenizi girin"
                    placeholderTextColor="black"
                    secureTextEntry
                />
            </View>
            

            <TouchableOpacity onPress={HandleSave} activeOpacity={0.8} style={{marginBottom: 10}}>
                <Text style={{...styleAuth.form.button.text, backgroundColor: 'black', color: 'white'}}>Şifremi Kaydet</Text>
            </TouchableOpacity>           
        </LayoutForget>
    );
}