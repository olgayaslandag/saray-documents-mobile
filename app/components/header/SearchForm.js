import { useState } from "react";
import { StyleSheet, Modal, TouchableOpacity, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import SearchFormInput from "./SearchFormInput";
import SearchResult from "../search/SearchResult";
import * as Device from "expo-device"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";


export default function SearchForm() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const insets = useSafeAreaInsets();// 👈 Çentik/padding değerleri gelir

    function HandleClose() {
        setSearch("");
        setOpen(false);
    }
    
    return (
        <View style={styles. container}>
            {!search && !open && (
                <View style={{position: 'relative', width: '100%', marginTop: 10}}>                
                    <View style={{width: '100%', position: 'relative', zIndex: 8, marginLeft: 5, paddingRight: 5}}>
                        <SearchFormInput search={search} setSearch={setSearch} order={1} setOpen={setOpen} />
                    </View>

                    <TouchableOpacity 
                        activeOpacity={1} 
                        onPress={() => setOpen(true)} 
                        style={{minHeight: 50, position: 'absolute', top: 0, width: '100%', zIndex: 9}}
                    ></TouchableOpacity>
                </View>
            )}            
            
            <Modal animationType="none" visible={search || open ? true : false} transparent={true}>
                <SafeAreaView style={styles.modal.container}>
                    <View style={{flex: 1, paddingHorizontal: 5}}>
                        <View style={{flex: 1, flexDirection: 'row', paddingTop: insets.top}}>
                            <TouchableOpacity onPress={HandleClose} style={styles.modal.close}>
                                <FontAwesome5 name="times" size={20} color="black" />
                            </TouchableOpacity>
                            <View style={{flex: 1, marginRight: 10, width: '100%'}}>    
                                <SearchFormInput search={search} setSearch={setSearch} order={2} width="100%" />                                            
                            </View>    
                        </View>
                        
                        <View style={{flex: 15}}>
                            <SearchResult search={search} setSearch={setSearch} setOpen={setOpen} />
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        width: '100%', 
        paddingBottom: 0, 
        flex: 1, 
        justifyContent: 'center', 
        paddingTop: 0,        
    },
    modal: {
        container: {
            flex: 1,
            backgroundColor: '#fff', 
            borderTopLeftRadius: 30, 
            borderTopRightRadius: 30,         
            //paddingTop: Device.osName === "iOS" ? 40 : 10,   
            
        },
        close: {                        
            width: 25,
            height: 25,
            marginHorizontal: 15,   
            marginTop: 15                     
        },
    } 
});