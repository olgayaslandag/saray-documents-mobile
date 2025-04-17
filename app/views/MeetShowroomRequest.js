import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { useSelector } from "react-redux";
import styleAuth from "../styles/styleAuth";
import LayoutLock from "./LayoutLock";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { MeetShowroomStoreApi } from "../api/MeetShowroomApi";

export default function MeetShowroomRequest() {
    const [form, setForm] = useState({name: '', email: '', phone: '', company_name: '', date: new Date()});
    const auth = useSelector(state => state.auth.value);    
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        if (!auth) return;
        setForm({
            name: auth.name || '',
            email: auth.email || '',
            phone: auth.phone || '',
            company_name: auth.company_name || '',
            date: new Date()
        });    
        
    }, [auth]);

    if(success) {
        return (
            <LayoutLock title="Showroom Randevu Talebi">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{marginBottom: 30}}>
                        <FontAwesome name="check" size={100} color="#222" />
                    </View>
                    <Text style={{fontSize: 16, color: 'dark'}}>Talebiniz başarılı bir şekilde gönderildi!</Text>
                </View>
            </LayoutLock>
        )
    };

    async function HandleSubmit() {
        const result = await MeetShowroomStoreApi({token: auth.token, data: form});
        if(result.status)
            setSuccess(true);

        console.log(result)
    }

    return (
       <LayoutLock title="Showroom Randevu Talebi">
            <ScrollView style={{flex: 1}} contentContainerStyle={{ flexGrow: 1 }}>
                {/* Adsoyad */}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>Ad Soyad</Text>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChange={val => setForm({...form, name: val})}
                        value={form.name}
                        placeholder="Adınızı soyadınızı girin"
                        autoComplete="name"
                        placeholderTextColor="black"
                        inputMode="text"

                    />
                </View>

                {/* Eposta */}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>Eposta</Text>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChange={val => setForm({...form, email: val})}
                        value={form.email}
                        placeholder="Eposta adresinizi girin"
                        autoComplete="email"
                        placeholderTextColor="black"
                        inputMode="email"
                    />
                </View>

                {/* Telefon */}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>Telefon</Text>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChange={val => setForm({...form, phone: val})}
                        value={form.phone}
                        placeholder="Telefon numaranızı girin"
                        autoComplete="tel"
                        placeholderTextColor="black"
                        inputMode="tel"
                    />
                </View>

                {/* Şirket Adı */}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>Şirket Adı</Text>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChange={val => setForm({...form, company_name: val})}
                        value={form.company_name}
                        placeholder="Çalıştığınız Firma"
                        placeholderTextColor="black"
                    />
                </View>

                {/* Showroom */}
                <View style={{marginBottom: 20}}>
                    <Text style={{ fontWeight: 700, fontSize: 16, marginBottom: 3 }}>Showroom</Text>
                    <View style={{width: '100%', height: 50, borderWidth: 1, borderColor: '#C1C1C1', borderRadius: 10, padding: 0}}>
                        <Picker
                            selectedValue={form.showroom}
                            onValueChange={(val, index) =>
                                setForm({...form, showroom: val})
                            }>
                            <Picker.Item label="İstanbul Showroom" value="İstanbul Showroom" />
                            <Picker.Item label="Tekirdağ Showroom" value="Tekirdağ Showroom" />                    
                        </Picker>
                    </View>
                </View>

                {/* Tarih */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontWeight: 700, fontSize: 16, marginBottom: 3 }}>Tarih</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={{
                            width: '100%',
                            height: 50,
                            borderWidth: 1,
                            borderColor: '#C1C1C1',
                            borderRadius: 10,
                            padding: 10,
                            justifyContent: 'center',
                        }}
                    >
                        <Text>{form.date.toLocaleDateString()}</Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                        value={form.date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                            setForm({ ...form, date: selectedDate });
                            }
                        }}
                        />
                    )}
                </View>

                {/* Kişi Sayısı */}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>Kişi Sayısı</Text>
                    <View style={{width: '100%', height: 50, borderWidth: 1, borderColor: '#C1C1C1', borderRadius: 10, padding: 0}}>
                        <TextInput
                            style={styleAuth.form.item.input}
                            onChangeText={val => setForm({...form, people: val})}
                            value={form.people}
                            placeholder="Kişi sayısı girin."
                            placeholderTextColor="black"
                            inputMode="numeric"
                        />
                    </View>                
                </View>

                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 10, padding: 10}} onPress={HandleSubmit}>
                    <Text style={{fontSize: 16, color: 'white'}}>Toplantı Talebi Formu</Text>
                </TouchableOpacity>
            </ScrollView>
       </LayoutLock>
    );
}