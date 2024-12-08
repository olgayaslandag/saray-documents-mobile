import { useState } from "react";
import { StyleSheet, Modal, TouchableOpacity, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import SearchFormInput from "./SearchFormInput";
import SearchResult from "../search/SearchResult";


export default function SearchForm({ pt }) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    function HandleClose() {
        setSearch("");
        setOpen(false);
    }
    
    return (
        <View style={{alignItems: 'center', width: '100%', marginTop: 20}}>
            {!search && !open && (
                <View style={{position: 'relative', width: '100%'}}>                
                    <View style={{width: '100%', position: 'relative', zIndex: 8}}>
                        <SearchFormInput pt={pt} search={search} setSearch={setSearch} order={1} setOpen={setOpen} />
                    </View>

                    <TouchableOpacity 
                        activeOpacity={1} 
                        onPress={() => setOpen(true)} 
                        style={{minHeight: 40, position: 'absolute', top: 0, width: '100%', zIndex: 9}}
                    ></TouchableOpacity>
                </View>
            )}            
            
            <Modal animationType="slide" visible={search || open ? true : false} transparent={false}>
                <View style={styles.modal.container}>
                    <View style={{width: '100%', paddingHorizontal: 20, paddingTop: 20, paddingbottom: 0, flexDirection: 'row'}}>
                        <SearchFormInput search={search} setSearch={setSearch} order={2} width="90%" />
                        
                        <TouchableOpacity onPress={HandleClose} style={styles.modal.close}>
                            <FontAwesome5 name="times" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    
                    <SearchResult search={search} setSearch={setSearch} setOpen={setOpen} />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        container: {
            flex: 1,
            backgroundColor: '#fff', 
            borderTopLeftRadius: 30, 
            borderTopRightRadius: 30,
        },
        close: {
            flex: 1, 
            alignItems: 'flex-end', 
            justifyContent: 'center',    
            width: '10%'        
        },
        closeButton: {
            flex: 1,
            width: 30,
            minHeight: 30, 
            padding: 0,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    } 
});