import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, login } from "../../store/authSlice";
import { DeleteAuthApi, LogoutApi, UpdateApi } from "../../api/authApi";
import LayoutAuth from "./LayoutAuth";
import BottomButton from "../../components/auth/BottomButton";
import styleAuth from "../../styles/styleAuth";
import useAppTranslation from "../../libs/useAppTranslation";

export default function ProfileView() {
    const [form, setForm] = useState({name: '', email: '', password: ''});
    const auth = useSelector(state => state.auth.value);
    const dispatch = useDispatch();

    const { t } = useAppTranslation();

    useEffect(() => {
        setForm(auth);
    }, []);


    async function HandleUpdate() {
        if(form === auth)
            return false;

        const result = await UpdateApi(form);
        if(result.status)
            dispatch(login({...auth, name: result.data.name, email: result.data.email}));
        
        Alert.alert(result.status ? t("profile.succss") : t("profile.error"), result.message)        
    }

    async function HandleDelete() {
        async function deleteAuth() {
            const result = await DeleteAuthApi(auth.token, auth.id);
            if(result.status) {
                dispatch(clearAuth());                
            }            
            Alert.alert(result.status ? t("profile.succss") : t("profile.error"), result.message)
        }


        Alert.alert(
            t("profile.delete_title"),
            t("profile.delete_confirm"),
            [
                {text: t("global.cancel"), style: 'cancel'},
                {text: t("profile.erase"), onPress: deleteAuth},
            ],
            {cancelable: false}
        );
    }

    async function HandleLogout() {
        const result = await LogoutApi(auth.token);
        if(result.status) {
            dispatch(clearAuth());            
        }

        Alert.alert(result.status ? t("profile.succss") : t("profile.error"), result.message)
    }

    return (
        <LayoutAuth>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={styleAuth.form.title}>
                    {t("profile.title")}
                </Text>
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, name: val})}
                        value={form.name}
                        placeholder={t("profile.name")}
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
                        placeholder={t("profile.email")}
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
                        placeholder={t("profile.password")}
                        autoComplete="current-password"
                        secureTextEntry={true}
                        placeholderTextColor="black"
                    />
                </View>   

                <TouchableOpacity activeOpacity={0.8} onPress={HandleUpdate}>
                    <Text style={{...styleAuth.form.button.text, backgroundColor: 'black', color: 'white'}}>
                        {t("profile.update")}
                    </Text>
                </TouchableOpacity>     
                <TouchableOpacity onPress={HandleDelete} style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
                    <Text style={{color: 'black'}}>
                        {t("profile.delete")}
                    </Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={HandleLogout} style={{width: '100%', marginTop: 10, alignItems: 'center'}}>
                    <Text style={{color: 'red'}}>
                        {t("profile.logout")}
                    </Text>    
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
        }        
    }
});