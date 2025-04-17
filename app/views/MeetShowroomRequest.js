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
    const [form, setForm] = useState({name: '', email: '', phone: '', company_name: '', date: new Date(), person: 1, user_id: 0, showroom: 'İstanbul Showroom"'});
    const auth = useSelector(state => state.auth.value);    
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (!auth) return;
        setForm({
            name: auth.name || '',
            email: auth.email || '',
            phone: auth.phone || '',
            company_name: auth.company_name || '',
            date: new Date(),
            person: 1,
            showroom: 'İstanbul Showroom"',
            user_id: auth.id
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

    function formatDateTime(date) {
        const pad = (num) => String(num).padStart(2, '0');
      
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // Aylar 0-indexli
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    async function HandleSubmit() {
        const result = await MeetShowroomStoreApi({
            token: auth.token, 
            data: {...form, date: formatDateTime(form.date)}
        });
        
        if(result.status)
            setSuccess(true);
        if(!result.status)
            setErrors(result.data);        
    }

    return (
       <LayoutLock title="Showroom Randevu Talebi">
            <ScrollView style={{flex: 1}} contentContainerStyle={{ flexGrow: 1 }}>
                {/* Adsoyad */}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>Ad Soyad</Text>
                    <TextInput
                        style={[
                            styleAuth.form.item.input,
                            errors?.name && { borderColor: 'red', color: 'red' }
                        ]}
                        onChangeText={val => setForm({...form, name: val})}
                        value={form.name}
                        placeholder="Adınızı soyadınızı girin"
                        autoComplete="name"
                        placeholderTextColor="black"
                        inputMode="text"
                    />
                    {errors?.name && (
                        <Text style={{ color: 'red', marginTop: 5, fontSize: 12 }}>{errors?.name[0]}</Text>
                    )}
                </View>

                {/* Eposta */}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>Eposta</Text>
                    <TextInput
                        style={[
                            styleAuth.form.item.input,
                            errors?.email && { borderColor: 'red', color: 'red' }
                        ]}
                        onChangeText={val => setForm({...form, email: val})}
                        value={form.email}
                        placeholder="Eposta adresinizi girin"
                        autoComplete="email"
                        placeholderTextColor="black"
                        inputMode="email"
                    />
                    {errors?.email && (
                        <Text style={{ color: 'red', marginTop: 5, fontSize: 12 }}>{errors?.email[0]}</Text>
                    )}
                </View>

                {/* Telefon */}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>Telefon</Text>
                    <TextInput
                        style={[
                            styleAuth.form.item.input,
                            errors?.phone && { borderColor: 'red', color: 'red' }
                        ]}
                        onChangeText={val => setForm({...form, phone: val})}
                        value={form.phone}
                        placeholder="Telefon numaranızı girin"
                        autoComplete="tel"
                        placeholderTextColor="black"
                        inputMode="tel"
                    />
                    {errors?.phone && (
                        <Text style={{ color: 'red', marginTop: 5, fontSize: 12 }}>{errors?.phone[0]}</Text>
                    )}
                </View>

                {/* Şirket Adı */}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>Şirket Adı</Text>
                    <TextInput
                        style={[
                            styleAuth.form.item.input,
                            errors?.company_name && { borderColor: 'red', color: 'red' }
                        ]}
                        onChangeText={val => setForm({...form, company_name: val})}
                        value={form.company_name}
                        placeholder="Çalıştığınız Firma"
                        placeholderTextColor="black"
                        inputMode="text"
                    />
                    {errors?.company_name && (
                        <Text style={{ color: 'red', marginTop: 5, fontSize: 12 }}>{errors?.company_name[0]}</Text>
                    )}
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
                        <Text>{form.date.toLocaleDateString('tr-TR')}</Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                        value={form.date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                setForm({ ...form, date: selectedDate.toISOString() });
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
                            style={[
                                styleAuth.form.item.input,
                                errors?.person && { borderColor: 'red' }
                            ]}
                            onChangeText={val => setForm({...form, person: val})}
                            value={form.person}
                            placeholder="Kişi sayısı girin."
                            placeholderTextColor="black"
                            inputMode="numeric"
                        />
                        {errors?.person && (
                            <Text style={{ color: 'red', marginTop: 5 }}>{errors?.person[0]}</Text>
                        )}
                    </View>                
                </View>

                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 10, padding: 10}} onPress={HandleSubmit}>
                    <Text style={{fontSize: 16, color: 'white'}}>Toplantı Talebi Formu</Text>
                </TouchableOpacity>
            </ScrollView>
       </LayoutLock>
    );
}