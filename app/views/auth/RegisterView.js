import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert, StyleSheet, Modal, ScrollView, Button } from "react-native";
import { RegisterApi } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import LayoutAuth from "./LayoutAuth";
import { useNavigation } from "@react-navigation/native";
import styleAuth from "../../styles/styleAuth";


export default function RegisterView() {
    const [form, setForm] = useState({name: '', email: '', password: '', company_name: '', phone: ''});
    const [showConsentModal, setShowConsentModal] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    async function HandleLogin() {
        const result = await RegisterApi(form);
        console.log(result)
        if(result.status)
            dispatch(login(result.data));

        if(!result.status)
            Alert.alert("bulunamadı!");
    }

    return (
        <LayoutAuth>
            <View style={styleAuth.form.container}>
                <Text style={styleAuth.form.title}>Kayıt Olun</Text>
                {/* Adsoyad */}
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, name: val})}
                        value={form.name}
                        placeholder="Adınızı soyadınızı girin"
                        autoComplete="name"
                        placeholderTextColor="black"
                        inputMode="text"
                    />
                </View>
                
                {/* Eposta */}
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, email: val})}
                        value={form.email}
                        placeholder="Eposta adresinizi girin"
                        autoComplete="email"
                        placeholderTextColor="black"
                        inputMode="email"
                    />
                </View>

                {/* Telefon */}
                <View style={{marginBottom: 20}}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, phone: val})}
                        value={form.phone}
                        placeholder="Telefon numaranızı girin"
                        autoComplete="tel"
                        placeholderTextColor="black"
                        inputMode="tel"
                    />
                </View>

                {/* Şirket Adı */}
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, company_name: val})}
                        value={form.password_confirmation}
                        placeholder="Çalıştığınız Firma"
                        placeholderTextColor="black"
                    />
                </View>

                {/* Şifre */}
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, password: val})}
                        value={form.password}
                        placeholder="Şifrenizi girin"
                        autoComplete="current-password"
                        secureTextEntry={true}
                        placeholderTextColor="black"
                    />
                </View>                

                <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 20 }}>
                    Formu gönderirken, kişisel verilerimin işlenmesine ve tarafıma ticari elektronik ileti gönderilmesine{" "}
                    <Text style={{ fontWeight: 'bold' }} onPress={() => setShowConsentModal(true)}>
                        burada
                    </Text>{" "}
                    belirtilen Rıza Metni ile onay veriyorum.
                </Text>

                <TouchableOpacity onPress={HandleLogin} activeOpacity={0.8} style={{marginBottom: 10}}>
                    <Text style={{...styleAuth.form.button.text, backgroundColor: 'black', color: 'white'}}>Kayıt</Text>
                </TouchableOpacity>        

                <TouchableOpacity onPress={() => navigation.navigate('Auth', {screen: 'Login'})} activeOpacity={0.8} style={{marginBottom: 10}}>
                    <Text style={{...styleAuth.form.button.text, borderWidth: 0}}>Giriş Ekranı</Text>
                </TouchableOpacity>
            </View>

            <Modal 
                animationType="slide"
                transparent={false}
                visible={showConsentModal}
                onRequestClose={() => setShowConsentModal(false)}>
                
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <ScrollView>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                            Kişisel Verilerin İşlenmesine Dair Aydınlatma ve Açık Rıza Metni
                        </Text>

                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kimliğinizi belirli ya da belirlenebilir kılan her türlü bilgi “kişisel veri” olarak tanımlanmakta ve tarafımızca aşağıda belirtilen çerçevede işlenmektedir.
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>1. Veri Sorumlusu</Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            Kişisel verileriniz, veri sorumlusu sıfatıyla tarafımızdan işlenmektedir.
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>2. İşlenen Kişisel Veriler</Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            Ad, soyad, e-posta adresi, telefon numarası, şirket bilgileri gibi tarafınızca paylaşılan bilgiler işlenmektedir.
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>3. İşleme Amaçları</Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            Kişisel verileriniz; hizmetlerimizin sunulması, size özel tekliflerin iletilmesi, kampanya, duyuru ve bilgilendirme yapılması, yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>4. Aktarım</Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            Kişisel verileriniz, hizmet alınan üçüncü taraflarla (örneğin SMS ve e-posta hizmet sağlayıcıları) sadece yukarıda belirtilen amaçlar doğrultusunda ve KVKK’ya uygun şekilde paylaşılabilir.
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>5. Haklarınız</Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            KVKK’nın 11. maddesi kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, düzeltilmesini veya silinmesini isteme gibi haklara sahipsiniz.
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>6. Açık Rıza</Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            Yukarıda belirtilen kapsamda, kişisel verilerinizin işlenmesine ve tarafınıza ticari elektronik ileti gönderilmesine açık rıza verdiğinizi beyan edersiniz.
                        </Text>
                    </ScrollView>

                    <View style={{ marginTop: 20 }}>
                        <Button title="Kapat" onPress={() => setShowConsentModal(false)} />
                    </View>
                </View>
            </Modal>
        </LayoutAuth>
    );
}