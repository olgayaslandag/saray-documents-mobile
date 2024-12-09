import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as Device from 'expo-device';



export default function PdfViewer({ uri }) {  

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {        
    setModalVisible(uri ? true : false);    
  }, [uri]);

  const DocsUrl = Device.osName === 'Android' ? `https://docs.google.com/viewer?url=${encodeURIComponent(uri)}` : encodeURI(uri); 

  if(!uri)
    return null;

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ flex: 1, marginTop: 0, backgroundColor: 'white', position: 'relative' }}>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <FontAwesome5 name="times" size={20} color="black" />               
            </TouchableOpacity>
            
            <WebView 
              source={{ uri: DocsUrl }}
              style={{ flex: 1 }}
              startInLoadingState
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  button: { 
    position: 'absolute', 
    top: 20, 
    right: 10, 
    backgroundColor: 'white', 
    zIndex: 99, 
    width: 50, 
    height: 50, 
    padding: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 30 
  }
});