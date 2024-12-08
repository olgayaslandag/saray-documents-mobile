import MenuButton from "../icons/MenuButton";
import UserAvatar from "./UserAvatar";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function HeaderUser() {
    const navigation = useNavigation();

    return (
        <View style={{marginTop: 40, flexDirection: 'row'}}>
            <View style={{width: '70%'}}>
                <UserAvatar />
            </View>
            <View style={{width: '30%', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <MenuButton />
                </TouchableOpacity>              
            </View>
        </View>
    );
}

