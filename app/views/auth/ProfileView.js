import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, login } from "../../store/authSlice";
import LayoutAuth from "./LayoutAuth";
import BottomButton from "../../components/auth/BottomButton";
import styleAuth from "../../styles/styleAuth";
import { DeleteAuthApi, LogoutApi, UpdateApi } from "../../api/authApi";

export default function ProfileView() {
    const [form, setForm] = useState({name: '', email: '', password: ''});
    const auth = useSelector(state => state.auth.value);
    const dispatch = useDispatch();

    useEffect(() => {
        setForm(auth);
    }, []);


    async function HandleUpdate() {
        if(form === auth)
            return false;

        const result = await UpdateApi(form);
        if(result.status)
            dispatch(login({...auth, name: result.data.name, email: result.data.email}));
        
        Alert.alert(result.status ? "Tebrikler" : "Hata Oluştu!", result.message)        
    }

    async function HandleDelete() {
        async function deleteAuth() {
            const result = await DeleteAuthApi(auth.token, auth.id);
            if(result.status) {
                dispatch(clearAuth());                
            }            
            Alert.alert(result.status ? "Tebrikler" : "Hata Oluştu!", result.message)
        }


        Alert.alert(
            "Hesabımı Sil",
            "Hesabımı silmek istediğinize emin misiniz?",
            [
                {text: 'İptal', style: 'cancel'},
                {text: 'Sil', onPress: deleteAuth},            
            ],
            {cancelable: false}
        );
    }

    async function HandleLogout() {
        const result = await LogoutApi(auth.token);
        if(result.status) {
            dispatch(clearAuth());            
        }

        Alert.alert(result.status ? "Tebrikler" : "Hata Oluştu!", result.message)
    }

    return (
        <LayoutAuth>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={styleAuth.form.title}>Hesabım</Text>
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

                <TouchableOpacity activeOpacity={0.8} onPress={HandleUpdate}>
                    <Text style={{...styleAuth.form.button.text, backgroundColor: 'black', color: 'white'}}>Güncelle</Text>
                </TouchableOpacity>     
                <TouchableOpacity onPress={HandleDelete} style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
                    <Text style={{color: 'black'}}>Hesabımı Sil</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={HandleLogout} style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
                    <Text style={{color: 'red'}}>Çıkış Yap</Text>    
                </TouchableOpacity>        
            </View>
            

            <View style={{flex: 1, paddingBottom: 20}}>
                <BottomButton />
            </View>
        </LayoutAuth>
    );
}

const styles = StyleSheet.create({
    button: {   
        marginBottom: 10, 
        width: '100%',
        text: {
            borderRadius: 0,
            padding: 10,
            fontSize: 16, 
            fontWeight: 500,   
            borderBottomWidth: 1,  
            borderBottomColor: '#ccc'
            //backgroundColor: '#000',
            //color: 'white'
        }
                 
    }
});