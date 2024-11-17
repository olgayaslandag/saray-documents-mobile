import { useState } from "react";
import { Box, Button, HStack } from "native-base";
import { StyleSheet, Modal, TouchableOpacity } from "react-native";
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
        <Box alignItems="center" w="100%" mt="5">
            {!search && !open && (
                <Box style={{position: 'relative', width: '100%'}}>                
                    <Box style={{width: '100%', position: 'relative', zIndex: 8}}>
                        <SearchFormInput pt={pt} search={search} setSearch={setSearch} order={1} setOpen={setOpen} />
                    </Box>

                    <TouchableOpacity 
                        activeOpacity={1} 
                        onPress={() => setOpen(true)} 
                        style={{minHeight: 40, position: 'absolute', top: 0, width: '100%', zIndex: 9}}
                    ></TouchableOpacity>
                </Box>
            )}            
            
            <Modal animationType="slide" visible={search || open ? true : false} transparent={false}>
                <Box style={styles.modal.container}>
                    <HStack width="100%" px="5" pt="5" pb="0">                            
                        <SearchFormInput search={search} setSearch={setSearch} order={2} width="90%" />
                        <Box style={styles.modal.close}>
                            <Button size="md" variant="ghost" onPress={HandleClose} p="0" style={{width: '100%', minHeight: 40}}>                                
                                <FontAwesome5 name="times" size={20} color="black" />
                            </Button>
                        </Box>
                    </HStack>
                    
                    <SearchResult search={search} setSearch={setSearch} setOpen={setOpen} />
                </Box>
            </Modal>
        </Box>
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
        }
    } 
});