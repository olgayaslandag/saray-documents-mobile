import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import LayoutLock from "./LayoutLock";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAppTranslation from "../libs/useAppTranslation";

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

    const { t } = useAppTranslation();

    const navigation = useNavigation();

    return (
        <LayoutLock title={t('ticket.title')}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('TicketForm')} 
                style={styles.newTicketButton}
            >
                <Text style={styles.newTicketButtonText}>
                    {t('ticket.new_button')}
                </Text>
            </TouchableOpacity>

            <ScrollView style={styles.scrollContainer}>
                {items.map((item) => (
                    <View key={item.id} style={styles.listContainer}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemDate}>{item.date}</Text>
                            <Text style={styles.itemStatus}>{item.status}</Text>
                        </View>

                        <TouchableOpacity 
                            style={styles.detailButtonContainer} 
                            onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}>
                            <View style={styles.detailButton}>
                                <Text style={styles.detailButtonText}>
                                    {t('ticket.detail_button')}
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
    scrollContainer: {
        flex: 1,
    },
    newTicketButton: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    newTicketButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    listContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 5,
        justifyContent: 'space-between',
    },
    itemInfo: {
        width: '80%',
    },
    itemTitle: {
        fontWeight: 'bold',
    },
    itemDate: {
        fontStyle: 'italic',
    },
    itemStatus: {
        color: '#333',
    },
    detailButtonContainer: {
        justifyContent: 'center',
    },
    detailButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
    },
    detailButtonText: {
        marginBottom: 2,
        color: 'white',
    },
});