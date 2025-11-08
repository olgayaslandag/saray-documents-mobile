import { Text, View, Modal, SafeAreaView, TouchableOpacity, Image, FlatList } from "react-native";
import { WebView } from 'react-native-webview';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";
import LayoutLock from "./LayoutLock";
import useAppTranslation from "../libs/useAppTranslation";

const info = {
    "Ad Soyad": "Olgay Aslandağ",
    "Telefon": "05001234567",
    "Email": "olgay@example.com",
    "Şirket": "Örnek A.Ş.",
  };


export default function OfferDetail({ route, navigation }) {
    const [selectedId, setSelectedId] = useState(null);
    const { offerId } = route.params;
    const { t } = useAppTranslation();

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

    return (
        <LayoutLock  title={t("offer.detail.title")}>
            {Object.entries(info).map(([key, value], index) => (
                <View key={index} style={{ flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderColor: '#ccc', paddingBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold', width: 80 }}>{key}:</Text>
                    <Text style={{ marginBottom: 2 }}>{value}</Text>
                </View>
            ))}

            <TouchableOpacity onPress={() => setSelectedId(offerId)} style={{backgroundColor: 'black', borderRadius: 20, padding: 10, marginTop: 10, alignItems: 'center'}}>
                <Text style={{color: 'white'}}>
                    {t("offer.detail.file")}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Offers')} style={{ marginTop: 10, alignItems: 'center'}}>
                <Text>{t("offer.detail.all_offers")}</Text>
            </TouchableOpacity>

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
        </LayoutLock>
    );
}