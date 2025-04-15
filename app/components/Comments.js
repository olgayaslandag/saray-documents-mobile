import { useState, useEffect } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function Comments({comOpen, setComOpen, doc_name, doc_id}) {

    function HandleClose() {
        setComOpen(false);
        console.log('close');
    }

    return (
        <Modal
            animationType="none"
            visible={comOpen}
            transparent={true}
            presentationStyle="overFullScreen"
        >
            <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
                <TouchableOpacity style={{height: '20%'}} onPress={HandleClose}>

                </TouchableOpacity>
                <View style={{flex: 1, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 30, paddingLeft: 10, paddingRight: 10}}>
                    <Text>{doc_name}</Text>  
                </View>            
            </View>            
        </Modal>
    );
}