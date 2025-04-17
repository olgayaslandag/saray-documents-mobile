import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import LayoutLock from "./LayoutLock";
import styleAuth from "../styles/styleAuth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TicketDetailStoreApi, TicketDetailsApi } from "../api/TicketApi";

export default function TicketDetailView({ route }) {
    const { ticketId } = route.params;
    const [form, setForm] = useState({message: '', id: 0});    
    const [items, setItems] = useState([]);
    const auth = useSelector(state => state.auth.value);

    useEffect(() => {
        (async () => {
            const result = await TicketDetailsApi({token: auth.token, id: ticketId});
            if(result.status){
                setItems(result.data);
                setForm({...form, id: result.data.length + 1});
            }
        })();
    }, [auth]);

    async function HandleSubmit() {
        const result = await TicketDetailStoreApi({token: auth.token, data: form});  
        if(result.status){
            setItems([...items, {
                id: items.length + 1, 
                date: new Date().toLocaleDateString(), 
                status: 'Bekleniyor', 
                content: form.message, 
                type: 1
            }])
        } 
        
        setForm({message: ''})
        
        console.log(items)
    }


    return (
        <LayoutLock title="Destek Talebi Detayı">
            <ScrollView>
            {items.map((item, index) => (
                <View 
                    key={index} 
                    style={{
                        width: '90%', 
                        backgroundColor: '#F1F1F1', 
                        borderRadius: 10, 
                        marginBottom: 10, 
                        padding: 10, 
                        alignSelf: item.type === 1 ? 'flex-start' : 'flex-end'
                }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>{item.date}</Text>
                        <Text>{item.status}</Text>
                    </View>                    
                    <Text>{item.content}</Text>
                </View>
            ))}


            {/* Mesaj */}
            <View style={{marginBottom: 20}}>
                <TextInput
                    style={{...styleAuth.form.item.input, height: 100, marginTop: 20}}
                    onChangeText={val => setForm({...form, message: val})}
                    value={form.message}
                    placeholder="Mesaj girin..."
                    autoComplete="name"
                    placeholderTextColor="black"
                    inputMode="text"
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical="top"

                />                
            </View>
            <TouchableOpacity onPress={HandleSubmit} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 10, padding: 10, marginBottom: 80}}>
                <Text style={{fontSize: 16, color: 'white'}}>Talebi Gönder</Text>
            </TouchableOpacity>
            </ScrollView>
        </LayoutLock>
    );
}