import { useState } from "react";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import DocumentListItem from "../components/document/DocumentListItem";
import PdfViewer from "../components/PdfViewer";
import LayoutLock from "./LayoutLock";

const WIDTH = Dimensions.get('window').width;

export default function FavoritesView() {
    const [selected, setSelected] = useState("");

    const items = useSelector(state => state.favorites.value);    

    const formattedData = [...items];    
    while (formattedData.length % 3 !== 0) {
        formattedData.push({ id: `empty-${formattedData.length}`, empty: true }); // Eksik sütunlar için boş eleman ekleniyor
    }
    return (
        <LayoutLock title="Favorilerim">
            <View>
                <PdfViewer uri={selected} />
                {formattedData.length <= 0 && <Text style={{fontSize: 18, marginTop: 20, textAlign: 'center'}}>Henüz favorilerinize döküman eklemediniz!</Text>}
                <FlatList
                    data={formattedData}
                    renderItem={({item}) => <DocumentListItem item={item} setSelected={setSelected} />}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={WIDTH > 1250 ? 4 : 3}
                    columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
                />
            </View>
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