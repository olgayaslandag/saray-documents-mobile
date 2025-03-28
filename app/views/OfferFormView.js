import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import StaticHeader from "../components/header/StaticHeader";
import * as Device from "expo-device"
import ErrorMessage from "../components/ErrorMessage";
import { useSelector } from "react-redux";
import * as DocumentPicker from 'expo-document-picker';
import { UploadApi } from "../api/offerApi";
import UploadIcon from "../components/icons/UploadIcon";
import { useNavigation, CommonActions  } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';




export default function OfferFormView() {
    const [upload, setUpload] = useState(false);
    const auth = useSelector(state => state.auth.value);
    const navigation = useNavigation();

    async function pick() {
        const result = await DocumentPicker.getDocumentAsync();  
        if (result.canceled)
            return;            

        const {name, size, uri} = result.assets[0];
        const formData = new FormData();
        formData.append('file', {
            name,
            uri,
            type: 'multipart/form-data',
            size
        });
        formData.append('user_id', auth.id);

        const res = await UploadApi(formData, auth.token);
        setUpload(res.data);
    }

    useEffect(() => {
        return () => {
            setUpload(false);
        }
    }, []);

    function OfferFormContent()
    {
        return (
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <TouchableOpacity 
                            style={{backgroundColor: '#222', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}}
                            onPress={() => navigation.navigate('Main', {screen: 'Offers'})}>
                            <Text style={{fontSize: 16, color: 'white'}}>
                                Geri
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={pick} style={{flex: 2, justifyContent: 'flex-start', alignItems: 'center'}}>                          
                        <UploadIcon fill="#ccc" width={100} height={100} />
                        <Text style={{fontSize: 18, fontWeight: 600}}>Döküman Seç</Text>
                    </TouchableOpacity>                    
                </View>
        );
    }

    function SuccessContent() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{marginBottom: 30}}>
                    <FontAwesome name="check" size={100} color="#222" />
                </View>
                <Text style={{fontSize: 18, fontWeight: 700}}>Teklif Başarıyla Gönderildi!</Text>
                <TouchableOpacity 
                    onPress={() => navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Offers' }],
                        })
                    )} 
                    style={{backgroundColor: '#222', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginTop: 10}}>
                    <Text style={{fontSize: 16, color: 'white'}}>Teklifleri Görüntüle</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    return (
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: Device.osName === "iOS" ? 30 : 0}}>
            <StaticHeader />
            <View style={{flex: 1, marginTop: 30, justifyContent: 'center', paddingLeft: 20}}>                
                <Text style={{fontSize: 30, fontWeight: 700}}>Teklif Formu</Text>
            </View>
            <View style={{flex: 15, padding: 20, justifyContent: 'flex-start'}}>
                <ErrorMessage />
                {auth && !upload && <OfferFormContent />} 
                {upload && <SuccessContent />}           
            </View>
        </View>
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