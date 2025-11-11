import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert, StyleSheet, Modal, ScrollView, Button } from "react-native";
import { RegisterApi } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigation } from "@react-navigation/native";
import styleAuth from "../../styles/styleAuth";
import LayoutAuth from "./LayoutAuth";
import useAppTranslation from "../../libs/useAppTranslation";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterView() {
    const [form, setForm] = useState({name: '', email: '', password: '', company_name: '', phone: ''});
    const [errors, setErrors] = useState([]);
    const [process, setProcess] = useState(false);
    const [showConsentModal, setShowConsentModal] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { t } = useAppTranslation();

    async function HandleLogin() {
        if(!form.name || !form.email || !form.password || !form.company_name || !form.phone) {
            Alert.alert(t("global.error"), t("global.error_fill_all"));
            return;
        }
        setProcess(true);
        const result = await RegisterApi(form);
        setProcess(false);
        if(result.status)
            dispatch(login(result.data));
        
        if(!result.status) {
            setErrors(result.result);
            Alert.alert(t("global.error"), result.message);
        }            
    }

    return (
        <LayoutAuth>
            <View style={styleAuth.form.container}>
                <Text style={styleAuth.form.title}>
                    {t("register.title")}
                </Text>
                {/* Adsoyad */}
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={errors.name ? styleAuth.form.item.inputError : styleAuth.form.item.input}
                        onChangeText={val => {
                            setForm({...form, name: val})
                            if (errors.name) {
                                setErrors({...errors, name: null});
                            }
                        }}
                        value={form.name}
                        placeholder={t("register.name_placeholder")}
                        autoComplete="name"
                        placeholderTextColor="black"
                        inputMode="text"
                    />
                    {errors.name && <Text style={styles.errorMessage}>{errors.name ?? null}</Text>}
                </View>
                
                {/* Eposta */}
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={errors.email ? styleAuth.form.item.inputError : styleAuth.form.item.input}
                        onChangeText={val => {
                            setForm({...form, email: val})
                            if (errors.email) {
                                setErrors({...errors, email: null});
                            }
                        }}
                        value={form.email}
                        placeholder={t("register.email_placeholder")}
                        autoComplete="email"
                        placeholderTextColor="black"
                        inputMode="email"
                    />
                    {errors.email && <Text style={styles.errorMessage}>{errors.email ?? null}</Text>}
                </View>

                {/* Telefon */}
                <View style={{marginBottom: 20}}>
                    <TextInput
                        style={styleAuth.form.item.input}
                        onChangeText={val => setForm({...form, phone: val})}
                        value={form.phone}
                        placeholder={t("register.phone_placeholder")}
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
                        placeholder={t("register.company_placeholder")}
                        placeholderTextColor="black"
                    />
                </View>

                {/* Şifre */}
                <View style={styleAuth.form.item.container}>
                    <TextInput
                        style={errors.passsword ? styleAuth.form.item.inputError : styleAuth.form.item.input}
                        onChangeText={val => {
                            setForm({...form, password: val})
                            if (errors.passsword) {
                                setErrors({...errors, passsword: null});
                            }
                        }}
                        value={form.password}
                        placeholder={t("register.password_placeholder")}
                        autoComplete="current-password"
                        secureTextEntry={true}
                        placeholderTextColor="black"
                    />
                    {errors.password && <Text style={styles.errorMessage}>{errors.passsword ?? null}</Text>}
                </View>                

                <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 20 }}>
                    {t("register.consent_text_start")}{" "}
                    <Text style={{ fontWeight: 'bold' }} onPress={() => setShowConsentModal(true)}>
                        {t("register.consent_link")}
                    </Text>{" "}
                    {t("register.consent_text_end")}
                </Text>

                <TouchableOpacity onPress={HandleLogin} activeOpacity={0.8} style={{marginBottom: 10}} disabled={process}>
                    <Text style={{...styleAuth.form.button.text, backgroundColor: 'black', color: 'white'}}>
                        {t("register.button_register")}
                    </Text>
                </TouchableOpacity>        

                <TouchableOpacity onPress={() => navigation.navigate('Auth', {screen: 'Login'})} activeOpacity={0.8} style={{marginBottom: 10}}>
                    <Text style={{...styleAuth.form.button.text, borderWidth: 0}}>
                        {t("register.button_login_screen")}
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal 
                animationType="slide"
                transparent={false}
                visible={showConsentModal}
                onRequestClose={() => setShowConsentModal(false)}>
                
                <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, paddingTop: 0}}>
                    <ScrollView>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                            {t("register.modal.title")}
                        </Text>

                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            {t("register.modal.intro")}
                        </Text>


                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>
                            {t("register.modal.sections.data_controller.title")}
                        </Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            {t("register.modal.sections.data_controller.text")}
                        </Text>



                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>
                            {t("register.modal.sections.processed_data.title")}
                        </Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            {t("register.modal.sections.processed_data.text")}
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>
                            {t("register.modal.sections.purpose.title")}
                        </Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            {t("register.modal.sections.purpose.text")}
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>
                            {t("register.modal.sections.transfer.title")}
                        </Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            {t("register.modal.sections.transfer.text")}
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>
                            {t("register.modal.sections.rights.title")}
                        </Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            {t("register.modal.sections.rights.text")}
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>
                            {t("register.modal.sections.consent.title")}
                        </Text>
                        <Text style={{ fontSize: 14, marginBottom: 10 }}>
                            {t("register.modal.sections.consent.text")}
                        </Text>
                    </ScrollView>

                    <View style={{ marginTop: 20 }}>
                        <Button title={t("register.modal.button_close")} onPress={() => setShowConsentModal(false)} />
                    </View>
                </SafeAreaView>
            </Modal>
        </LayoutAuth>
    );
}

const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
    }
});