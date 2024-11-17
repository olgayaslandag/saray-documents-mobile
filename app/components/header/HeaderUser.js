import { Box, HStack } from "native-base";
import MenuButton from "../icons/MenuButton";
import UserAvatar from "./UserAvatar";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function HeaderUser() {
    const navigation = useNavigation();

    return (
        <HStack mt="10">
            <Box width="70%">
                <UserAvatar />
            </Box>
            <Box width="30%" alignItems="flex-end">
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <MenuButton />
                </TouchableOpacity>              
            </Box>
        </HStack>
    );
}

