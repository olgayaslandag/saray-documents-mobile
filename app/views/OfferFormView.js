import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { UploadApi } from "../api/offerApi";
import { useNavigation, CommonActions  } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import styleAuth from "../styles/styleAuth";
import LayoutLock from "./LayoutLock";
import * as DocumentPicker from 'expo-document-picker';
import UploadIcon from "../components/icons/UploadIcon";
import useAppTranslation from "../libs/useAppTranslation";


export default function OfferFormView() {
    const [upload, setUpload] = useState(false);
    const auth = useSelector(state => state.auth.value);
    const navigation = useNavigation();
    const [form, setForm] = useState({name: '', email: '', phone: '', company_name: ''});
    const [doc, setDoc] = useState({name: '', size: '', uri: ''});
    const [success, setSuccess] = useState(false);
    const { t } = useAppTranslation();

    async function pick() {
        const result = await DocumentPicker.getDocumentAsync();  
        if (result.canceled)
            return;
        
        setDoc(result.assets[0]);
    }

    async function HandleSubmit() {
        const {name, size, uri} = doc;
        const formData = new FormData();
        formData.append('file', {
            name,
            uri,
            type: 'multipart/form-data',
            size
        });
        formData.append('user_id', auth.id);
        formData.append('name', form.name);
        formData.append('phone', form.phone);
        formData.append('email', form.email);
        formData.append('company_name', form.company_name);

        const res = await UploadApi(formData, auth.token);
        if(!res.status)
            return;

        setUpload(res.data);
        setSuccess(true);
    }

    useEffect(() => {
        return () => {
            setUpload(false);
            setSuccess(false)
        }
    }, []);

    if(success) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{marginBottom: 30}}>
                    <FontAwesome name="check" size={100} color="#222" />
                </View>
                <Text style={{fontSize: 18, fontWeight: 700}}>{t("offer.form.success")}</Text>
                <TouchableOpacity 
                    onPress={() => navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Offers' }],
                        })
                    )} 
                    style={{backgroundColor: '#222', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginTop: 10}}>
                    <Text style={{fontSize: 16, color: 'white'}}>{t("offer.form.all_offers")}</Text>
                </TouchableOpacity>                
            </View>
        );
    }
    
    return (
        <LayoutLock title={t("offer.form.title")}>
            <ScrollView style={{flex: 1}}>                    
                <View>
                    {/* Adsoyad */}
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>
                            {t("offer.form.name")}
                        </Text>
                        <TextInput
                            style={styleAuth.form.item.input}
                            onChangeText={val => setForm({...form, name: val})}
                            value={form.name}
                            placeholder={t("offer.form.place_name")}
                            autoComplete="name"
                            placeholderTextColor="black"
                            inputMode="text"

                        />
                    </View>

                    {/* Eposta */}
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>
                            {t("offer.form.email")}
                        </Text>
                        <TextInput
                            style={styleAuth.form.item.input}
                            onChangeText={val => setForm({...form, email: val})}
                            value={form.email}
                            placeholder={t("offer.form.place_email")}
                            autoComplete="email"
                            placeholderTextColor="black"
                            inputMode="email"
                        />
                    </View>

                    {/* Telefon */}
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>
                            {t("offer.form.phone")}
                        </Text>
                        <TextInput
                            style={styleAuth.form.item.input}
                            onChangeText={val => setForm({...form, phone: val})}
                            value={form.phone}
                            placeholder={t("offer.form.place_phone")}
                            autoComplete="tel"
                            placeholderTextColor="black"
                            inputMode="tel"
                        />
                    </View>

                    {/* Şirket Adı */}
                    <View style={{marginBottom: 20}}>
                        <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>
                            {t("offer.form.company_name")}
                        </Text>
                        <TextInput
                            style={styleAuth.form.item.input}
                            onChangeText={val => setForm({...form, company_name: val})}
                            value={form.company_name}
                            placeholder={t("offer.form.place_company_name")}
                            placeholderTextColor="black"
                            inputMode="text"
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={pick} style={{flex: 2, justifyContent: 'flex-start', alignItems: 'center'}}>                          
                    <UploadIcon fill="#ccc" width={100} height={100} />
                    <Text style={{fontSize: 18, fontWeight: 600}}>
                        {t("offer.form.file")}
                    </Text>
                </TouchableOpacity>  

                <TouchableOpacity onPress={HandleSubmit} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 10, padding: 10, marginTop: 20}}>
                    <Text style={{fontSize: 16, color: 'white'}}>
                        {t("offer.form.submit")}
                    </Text>
                </TouchableOpacity>   
                <TouchableOpacity 
                    style={{paddingVertical: 10, paddingHorizontal: 20, alignItems: 'center'}}
                    onPress={() => navigation.navigate('Main', {screen: 'Offers'})}>
                    <Text style={{fontSize: 16}}>
                        {t("offer.form.back")}
                    </Text>
                </TouchableOpacity>               
            </ScrollView>
        </LayoutLock>        
    );
}

const styles = StyleSheet.create({
    buttons: {
        login: {
            container: {
                width: 120,
                backgroundColor: 'black', 
                borderRadius: 10, 
                marginTop: 10,
            },
            text: {                
                padding: 10,                 
                fontSize: 16,
                color: 'white',     
                textAlign: 'center'  ,     
            }            
        }
    }
});