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



function OfferContent(){
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

    function FileViewer({ fileUrl }) {
        const isImage = fileUrl.match(/\.(jpeg|jpg|png|gif)$/i); 
        if (isImage) {
            return (
                <Image
                    source={{ uri: fileUrl }}
                    style={{ width: '100%', height: 'auto' }}
                />
            );
        } else {
            return (
                <WebView
                    source={{ uri: fileUrl }}
                    style={{ width: '100%', height: 'auto' }}
                />
            );
        }
    }
    
    function ListContent({ item }) {
        return (
            <TouchableOpacity 
                style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#ccc'}}
                onPress={() => setSelectedId(item.id)}>
                <Text style={{fontSize: 18, fontWeight: 700, flex: 1, flexDirection: 'row'}}>#{item.id}</Text>
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Text style={{fontSize: 18, marginRight: 5}}>
                        {item.created_at_formatted}
                    </Text>
                    <FontAwesome name="eye" size={20} color="#666" />
                </View>                    
            </TouchableOpacity>                                
        )
    }    

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('OfferForm')} style={{...styles.buttons.login.container, alignSelf: 'flex-end'}}>
                <Text style={styles.buttons.login.text}>Yeni Teklif</Text>
            </TouchableOpacity>
            <FlatList
                data={items}
                renderItem={({item}) => <ListContent item={item} />}
                keyExtractor={(item, index) => index}
                style={{marginTop: 20}}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={!!selectedId}
                onRequestClose={() => {
                    setSelectedId(null);
                }}>
                    <SafeAreaView style={{flex: 1}}>
                        <TouchableOpacity onPress={() => setSelectedId(null)} style={{position: 'absolute', top: 0, right: 0, padding: 20, zIndex: 2}}>
                            <FontAwesome name="times" size={30} color="black" />
                        </TouchableOpacity>
                        <FileViewer fileUrl={"https://drive.saray.com/api/offer/show/" + selectedId} />
                    </SafeAreaView>                    
            </Modal>
        </View>
    );
}


export default function OffersView() {
    const auth = useSelector(state => state.auth.value);

    return (
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: Device.osName === "iOS" ? 30 : 0}}>
            <StaticHeader />
            <View style={{flex: 1, marginTop: 30, justifyContent: 'center', paddingLeft: 20}}>                
                <Text style={{fontSize: 30, fontWeight: 700}}>Teklifler</Text>
            </View>
            <View style={{flex: 15, padding: 20, justifyContent: 'flex-start'}}>
                <ErrorMessage />
                {auth && <OfferContent />}            
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