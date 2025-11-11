import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from '@expo/vector-icons';
import { MeetStoreApi } from "../api/MeetApi";
import DateTimePicker from '@react-native-community/datetimepicker';
import LayoutLock from "./LayoutLock";
import styleAuth from "../styles/styleAuth";
import useAppTranslation from "../libs/useAppTranslation";



export default function MeetRequest() {
    const [form, setForm] = useState({name: '', email: '', phone: '', company_name: '', date: new Date(), user_id: 0, person: 1});
    const auth = useSelector(state => state.auth.value);    
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState(false);
    const dispatch = useDispatch();
    const { t } = useAppTranslation();


    useEffect(() => {
        if (!auth) return;
        setForm({
            name: auth.name || '',
            email: auth.email || '',
            phone: auth.phone || '',
            company_name: auth.company_name || '',
            date: new Date(),
            user_id: auth.id,
            person: 1
        });     
        setSuccess(false)   
    }, [auth]);


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
        const result = await MeetStoreApi({
            token: auth.token, 
            data: {...form, date: formatDateTime(form.date)}
        });
        if(result.status)
            setSuccess(true);
        if(!result.status)
            setErrors(result.data);        
    }
    
    if(success) {
        return (
            <LayoutLock title={t("meet_request.title")}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{marginBottom: 30}}>
                        <FontAwesome name="check" size={100} color="#222" />
                    </View>
                    <Text style={{fontSize: 16, color: 'dark'}}>{t("meet_request.form.success")}</Text>
                </View>
            </LayoutLock>
        )
    };

    return (
        <LayoutLock title={t("meet_request.title")}>
            <ScrollView style={{flex: 1}}>
                {/* Adsoyad */}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>
                        {t("meet_request.form.name")}
                    </Text>
                    <TextInput
                        style={[
                            styleAuth.form.item.input,
                            errors?.name && { borderColor: 'red', color: 'red' }
                        ]}
                        onChangeText={val => setForm({...form, name: val})}
                        value={form.name}
                        placeholder={t("meet_request.form.name")}
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
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>
                        {t("meet_request.form.email")}
                    </Text>
                    <TextInput
                        style={[
                            styleAuth.form.item.input,
                            errors?.email && { borderColor: 'red', color: 'red' }
                        ]}
                        onChangeText={val => setForm({...form, email: val})}
                        value={form.email}
                        placeholder={t("meet_request.form.email")}
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
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>
                        {t("meet_request.form.phone")}
                    </Text>
                    <TextInput
                        style={[
                            styleAuth.form.item.input,
                            errors?.phone && { borderColor: 'red', color: 'red' }
                        ]}
                        onChangeText={val => setForm({...form, phone: val})}
                        value={form.phone}
                        placeholder={t("meet_request.form.phone")}
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
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>
                        {t("meet_request.form.company_name")}
                    </Text>
                    <TextInput
                        style={[
                            styleAuth.form.item.input,
                            errors?.company_name && { borderColor: 'red', color: 'red' }
                        ]}
                        onChangeText={val => setForm({...form, company_name: val})}
                        value={form.company_name}
                        placeholder={t("meet_request.form.company_name")}
                        placeholderTextColor="black"
                        inputMode="text"
                    />
                    {errors?.company_name && (
                        <Text style={{ color: 'red', marginTop: 5, fontSize: 12 }}>{errors?.company_name[0]}</Text>
                    )}
                </View>

                {/* Tarih */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontWeight: 700, fontSize: 16, marginBottom: 3 }}>
                        {t("meet_request.form.date")}
                    </Text>
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
                                setForm({ ...form, date: selectedDate });
                            }
                        }}
                        />
                    )}
                </View>

                {/* Kişi Sayısı */}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontWeight: 700, fontSize: 16, marginBottom: 3}}>
                        {t("meet_request.form.person")}
                    </Text>
                    <View style={{width: '100%', height: 50, borderWidth: 1, borderColor: '#C1C1C1', borderRadius: 10, padding: 0}}>
                        <TextInput
                            style={[
                                styleAuth.form.item.input,
                                errors?.person && { borderColor: 'red' }
                            ]}
                            onChangeText={val => setForm({...form, person: val})}
                            value={form.person}
                            placeholder={t("meet_request.form.person_placeholder")}
                            placeholderTextColor="black"
                            inputMode="numeric"
                        />
                        {errors?.person && (
                            <Text style={{ color: 'red', marginTop: 5 }}>{errors?.person[0]}</Text>
                        )}
                    </View>                
                </View>

                <TouchableOpacity onPress={HandleSubmit} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderRadius: 10, padding: 10}}>
                    <Text style={{fontSize: 16, color: 'white'}}>
                        {t("meet_request.form.submit")}
                    </Text>
                </TouchableOpacity>
            </ScrollView>            
       </LayoutLock>
    );
}