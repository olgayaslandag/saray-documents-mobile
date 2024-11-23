import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../store/authSlice";
import LayoutAuth from "./LayoutAuth";
import BottomButton from "../../components/auth/BottomButton";
import { useNavigation } from "@react-navigation/native";

export default function ProfileView() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    function HandleLogout() {
        dispatch(clearAuth())
    }

    return (
        <LayoutAuth>
            <View>
                
                
                
                
            </View>

            <View style={{flex: 1, paddingBottom: 20}}>
                <BottomButton />
            </View>
        </LayoutAuth>
    );
}

const styles = StyleSheet.create({
    button: {   
        marginBottom: 10, 
        width: '100%',
        text: {
            borderRadius: 0,
            padding: 10,
            fontSize: 16, 
            fontWeight: 500,   
            borderBottomWidth: 1,  
            borderBottomColor: '#ccc'
            //backgroundColor: '#000',
            //color: 'white'
        }
                 
    }
});