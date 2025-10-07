import MenuButton from "../icons/MenuButton";
import UserAvatar from "./UserAvatar";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device"


export default function HeaderUser() {
    const navigation = useNavigation();

    return (
        <View style={{flexDirection: 'row', paddingHorizontal: 5}}>
            <View style={{width: '70%'}}>
                <UserAvatar />
            </View>            
        </View>
    );
}

