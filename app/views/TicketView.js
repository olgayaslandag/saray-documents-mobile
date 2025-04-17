import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LayoutLock from "./LayoutLock";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function TicketView() {
    const [items, setItems] = useState([
        { id: 1, date: "2021-01-01", title: "Destek Talebi 1", status: "Bekleniyor" },
        { id: 2, date: "2021-01-02", title: "Destek Talebi 2", status: "Cevaplandı" },
        { id: 3, date: "2021-01-03", title: "Destek Talebi 3", status: "Cevaplandı" },
        { id: 4, date: "2021-01-04", title: "Destek Talebi 4", status: "Cevaplandı" },
        { id: 5, date: "2021-01-05", title: "Destek Talebi 5", status: "Kapalı" },
        { id: 6, date: "2021-01-06", title: "Destek Talebi 6", status: "Kapalı" },
        { id: 7, date: "2021-01-07", title: "Destek Talebi 7", status: "Kapalı" },
    ]);

    const navigation = useNavigation();


    return (
        <LayoutLock title="Destek Taleplerim">
            <TouchableOpacity onPress={() => navigation.navigate('TicketForm')} style={{borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10, marginBottom: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: 600}}>Yeni Destek Talebi</Text>
            </TouchableOpacity>
            <ScrollView style={{flex: 1}}>
                {items.map((item, index) => (
                    <View key={index} style={styles.list_container}>
                        <View style={{ width: '80%' }}>
                            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                            <Text style={{ fontStyle: 'italic' }}>{ item.date }</Text>
                            <Text>{ item.status }</Text>
                        </View>
                        
                        <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => navigation.navigate('TicketDetail', {ticketId: item.id})}>
                            <View style={styles.button}>
                                <Text style={{ marginBottom: 2, color: 'white', }}>
                                    Detay
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </LayoutLock>
    );
}

const styles = StyleSheet.create({
    list_container: {
        flexDirection: 'row', 
        marginBottom: 10, 
        borderBottomWidth: 1, 
        borderColor: '#ccc', 
        paddingBottom: 5,
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: 'black', 
        borderRadius: 10, 
        paddingHorizontal: 10, 
        paddingVertical: 5,
        alignItems: 'center'
    },
    new_button: {
        container: {
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderColor: '#C1C1C1',
            borderRadius: 10,
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            marginBottom: 20
        },
        text: {
            padding: 10,                 
            fontSize: 16,
            color: 'white',     
            textAlign: 'center'  ,     
        }
    }
});