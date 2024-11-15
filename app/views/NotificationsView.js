import { useState, useEffect } from "react";
import { HStack, ScrollView, Stack, Text, Box, View } from "native-base"
import StaticHeader from "../components/header/StaticHeader";
import { StyleSheet } from "react-native";
import { getDataNotifications } from "../api/getDataNotifications";

export default function NotificationsView() {  
    const [items, setItems]  = useState([]);

    useEffect(() => {
        (async () => {
            const result = await getDataNotifications();
            if(result.status)
                setItems(result.data);
        })();
    }, []);
    return (
        <View>
            <StaticHeader />        
            <ScrollView style={styles.container}>            
                    <Stack>
                        <HStack>                        
                            <Text style={styles.title} pl="5">Bildirimler</Text>                            
                        </HStack>
                    </Stack>

                    <Box p="5" style={{marginBottom: 50}}>
                    {items.map((item, index) => (
                        <Box key={index} style={{...styles.text, borderBottomWidth: index + 1 === items.length ? 0 : 1}}>
                            <Text style={{fontSize: 16}}>{item.message}</Text>
                            <Text style={{fontSize: 12, textAlign: 'right'}}>{item.time}</Text>
                        </Box>
                    ))}
                </Box>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingBottom: 130
    },
    title: {
        flex: 1,
        marginTop: 30, 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: 30,
        fontWeight: 600,
        paddingTop: 25,
    },
    text: {
        paddingBottom: 15, 
        marginBottom: 15, 
        fontSize: 18
    }
});