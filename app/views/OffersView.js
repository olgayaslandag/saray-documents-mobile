import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Modal, SafeAreaView } from "react-native";
import * as Device from "expo-device"
import StaticHeader from "../components/header/StaticHeader";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ErrorMessage from "../components/ErrorMessage";
import { useEffect, useState } from "react";
import { offerListApi } from "../api/offerApi";
import { FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import LayoutLock from "./LayoutLock";



export default function OffersView(){
    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const auth = useSelector(state => state.auth.value);
    const navigation = useNavigation();
    

    useEffect(() => {
        (async () => {
            const result = await offerListApi(auth.token, auth.id); 
            if(result.status)
                setItems(result.data);
        })();
    }, [navigation]);

    
    
    function ListContent({ item }) {
        return (
            <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#ccc'}}>
                <View>
                    <Text>{item.created_at_formatted}</Text>
                </View>                
                <View style={{backgroundColor: 'black', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center'}}>
                    <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => navigation.navigate('OfferDetail', {offerId: item.id})}>
                        <Text style={{ marginBottom: 2, color: 'white', }}>
                                Detay
                        </Text>
                    </TouchableOpacity>
                </View>                    
            </View>                                
        )
    }    

    return (
        <LayoutLock title="Tekliflerim">
            <TouchableOpacity onPress={() => navigation.navigate('OfferForm')} style={{borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, marginBottom: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: 600}}>Yeni Teklif</Text>
            </TouchableOpacity>
            <FlatList
                data={items}
                renderItem={({item}) => <ListContent item={item} />}
                keyExtractor={(item, index) => index}
                style={{marginTop: 20}}
            />            
        </LayoutLock>
    );
}