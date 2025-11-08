import UserAvatar from "./UserAvatar";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";


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

