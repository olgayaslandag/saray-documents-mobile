import { Text, TouchableOpacity, View } from "react-native";
import LayoutLock from "./LayoutLock";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import styleAuth from "../styles/styleAuth";
import { useSelector } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { TicketStoreApi } from "../api/TicketApi";

export default function TicketFormView() {
    const [form, setForm] = useState({title: '', message: '', user_id: 0});
    const [success, setSuccess] = useState(false);
    const auth = useSelector(state => state.auth.value);
    const navigation = useNavigation();

    
    useEffect(() => {
        if (!auth) return;
        setForm({title: '', message: '', user_id: auth.id});
        return () => {
            setSuccess(false)
        }        
    }, [auth]);
    
    async function HandleSubmit() {
        const result = await TicketStoreApi({token: auth.token, data: form});
        if(result.status) {
            setSuccess(true);
        }
        console.log(result)
    }

    if(success) {
        return (
            <LayoutLock style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{marginBottom: 30}}>
                    <FontAwesome name="check" size={100} color="#222" />
                </View>
                <Text style={{fontSize: 18, fontWeight: 700}}>Mesajınız Başarıyla Gönderildi!</Text>
                <TouchableOpacity 
                    onPress={() => navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })
                    )} 
                    style={{backgroundColor: '#222', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginTop: 10}}>
                    <Text style={{fontSize: 16, color: 'white'}}>Ana Ekrana Git</Text>
                </TouchableOpacity>                
            </LayoutLock>
        );
    }

    return (
        <LayoutLock title="Destek Talebi Formu">
            <View>
                {/* Konu */}
                <View style={{marginBottom: 20}}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, title: val})}
                        value={form.title}
                        placeholder="Konu girin..."
                        autoComplete="name"
                        placeholderTextColor="black"
                        inputMode="text"

                    />
                </View>

                {/* Mesaj */}
                <View style={{marginBottom: 20}}>
                    <TextInput
                        style={{...styleAuth.form.item.input, height: 200}}
                        onChangeText={val => setForm({...form, message: val})}
                        value={form.message}
                        placeholder="Mesaj girin..."
                        autoComplete="name"
                        placeholderTextColor="black"
                        inputMode="text"
                        multiline={true}
                        numberOfLines={5}
                        textAlignVertical="top"

                    />
                </View>

                <TouchableOpacity onPress={HandleSubmit} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 10, padding: 10}}>
                    <Text style={{fontSize: 16, color: 'white'}}>Talebi Gönder</Text>
                </TouchableOpacity>
            </View>
        </LayoutLock>
    );
}