import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import * as Device from "expo-device"
import StaticHeader from "../components/header/StaticHeader";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";

export default function LayoutLock({ children, title }) {
    const auth = useSelector(state => state.auth.value);
    const navigation = useNavigation();
    const [meet, setMeet] = useState(null)

    return (
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: Device.osName === "iOS" ? 30 : 0}}>
            <StaticHeader />
            <View style={{flex: 1, marginTop: 30, justifyContent: 'center', paddingLeft: 20}}>                
                <Text style={{fontSize: 30, fontWeight: 700}}>{title}</Text>
            </View>
            <View style={{flex: 15, padding: 20, justifyContent: 'flex-start'}}>
                <ErrorMessage />
                {auth && (
                    <View style={{flex: 1}}>
                        {children}
                    </View>                
                )}                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        login: {
            container: {
                width: 120,
                backgroundColor: 'black', 
                borderRadius: 10, 
                marginTop: 10,
            },
            text: {                
                padding: 10,                 
                fontSize: 16,
                color: 'white',     
                textAlign: 'center'  ,     
            }            
        }
    }
});