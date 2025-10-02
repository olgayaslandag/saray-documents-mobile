import { View, Text, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import * as Device from "expo-device"
import StaticHeader from "../components/header/StaticHeader";
import { useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";

export default function LayoutLock({ children, title }) {
    const auth = useSelector(state => state.auth.value);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingTop: Device.osName === "iOS" ? 30 : 0}}>
            <StaticHeader />
            <View style={{flex: 1, marginTop: 5, justifyContent: 'center', paddingLeft: 20}}>                
                <Text style={{fontSize: 24, fontWeight: 700}}>{title}</Text>
            </View>
            <View style={{flex: 15, padding: 20, justifyContent: 'flex-start'}}>
                <ErrorMessage />
                {auth && (
                    <View style={{flex: 1}}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={{ flex: 1 }}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
                            {children}
                        </KeyboardAvoidingView>
                    </View>                
                )}
                <View style={{height: 100, width: '100%'}}></View>
            </View>
        </SafeAreaView>
    );
}