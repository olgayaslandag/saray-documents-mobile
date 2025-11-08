import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { TicketStoreApi } from "../api/TicketApi";
import styleAuth from "../styles/styleAuth";
import LayoutLock from "./LayoutLock";
import useAppTranslation from "../libs/useAppTranslation";

export default function TicketFormView() {
    const [form, setForm] = useState({title: '', message: '', user_id: 0});
    const [success, setSuccess] = useState(false);
    const auth = useSelector(state => state.auth.value);
    const navigation = useNavigation();
    const { t } = useAppTranslation();

    
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
                <Text style={{fontSize: 18, fontWeight: 700}}>{t("ticket.success")}</Text>
                <TouchableOpacity 
                    onPress={() => navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })
                    )} 
                    style={{backgroundColor: '#222', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginTop: 10}}>
                    <Text style={{fontSize: 16, color: 'white'}}>{t("ticket.go_home")}</Text>
                </TouchableOpacity>                
            </LayoutLock>
        );
    }

    return (
        <LayoutLock title={t("ticket.title")}>
            <View>
                {/* Konu */}
                <View style={{marginBottom: 20}}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, title: val})}
                        value={form.title}
                        placeholder={t("ticket.enter_subject")}
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
                        placeholder={t("ticket.enter_message")}
                        autoComplete="name"
                        placeholderTextColor="black"
                        inputMode="text"
                        multiline={true}
                        numberOfLines={5}
                        textAlignVertical="top"

                    />
                </View>

                <TouchableOpacity onPress={HandleSubmit} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 10, padding: 10}}>
                    <Text style={{fontSize: 16, color: 'white'}}>{t("ticket.submit")}</Text>
                </TouchableOpacity>
            </View>
        </LayoutLock>
    );
}