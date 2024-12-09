import { useRef, useEffect } from "react";
import SearchIcon from "../icons/SearchIcon";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchFormInput({ search, setSearch, order, setOpen, width="100%" }) {        
    const ref = useRef(null);

    useEffect(() => {
        if(order === 2)
            ref.current.focus();
    }, [order]);

    function HandleFocus() {
        if(order === 1) {
            //Keyboard.dismiss();
            setOpen(true)
        }            
    }
    return (
        <View style={{position: 'relative', width}}>
            <TextInput 
                placeholder="Ne Aramıştınız?" 
                style={{...styles.searchInput}} 
                onFocus={HandleFocus}
                autoFocus={true}
                ref={ref}
                editable={order === 2 ? true : false}            
                onChangeText={setSearch}
                value={search}
            />
            <View                 
                style={styles.searchIconContainer}>
                <SearchIcon                            
                    fill="gray"
                    width={20}
                    height={20}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    searchInput: {
        width: '100%',
        backgroundColor: 'white' ,
        minHeight: 50,
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#C1C1C1',
        paddingTop: 15,
        paddingBottom: 15,        
      },
    searchIconContainer: {
        position: 'absolute', 
        right: 5, 
        height: '100%', 
        justifyContent: 'center' ,
        width: 30,
        top: -1,
    }
});