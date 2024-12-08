import { useState } from "react";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DocumentListItem from "../components/document/DocumentListItem";
import PdfViewer from "../components/PdfViewer";
import StaticHeader from "../components/header/StaticHeader";
import * as Device from "expo-device"

export default function FavoritesView() {
    const [selected, setSelected] = useState("");

    const items = useSelector(state => state.favorites.value);
    const auth = useSelector(state => state.auth.value);    
    
    const navigation = useNavigation();


    function ErrorMessage() {
        if (!auth) {
            return (
                <View>
                    <Text style={{ fontSize: 16 }}>Kullanıcı girişi yapmalısınız!</Text>
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.buttons.login.container}>
                        <Text style={styles.buttons.login.text}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    
        if (!items.length) {
            return (
                <View>
                    <Text style={{ fontSize: 16 }}>Henüz favorinize eklediğiniz döküman yok.</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Documents')} style={styles.buttons.login.container}>
                        <Text style={styles.buttons.login.text}>Dökümanlar</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    
        return null;
    }
    
    
    return (
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: Device.osName === "iOS" ? 30 : 0}}>
            <StaticHeader />
            <View style={{flex: 1, marginTop: 30, justifyContent: 'center', paddingLeft: 20}}>                
                <Text style={{fontSize: 30, fontWeight: 700}}>Favoriler</Text>
            </View>
            
            <View style={{flex: 15, padding: 20, justifyContent: 'flex-start'}}>            
                <ErrorMessage />
                {auth &&
                <View>
                    <PdfViewer uri={selected} />
                    <FlatList
                        data={items}
                        renderItem={({item}) => <DocumentListItem item={item} setSelected={setSelected} />}
                        keyExtractor={(item, index) => index}
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
                    />
                </View>}
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