import { Box, HStack } from "native-base";
import MenuButton from "../icons/MenuButton";
import UserAvatar from "./UserAvatar";


export default function HeaderUser() {
    return (
        <HStack mt="10">
            <Box width="70%">
                <UserAvatar />
            </Box>
            <Box width="30%" alignItems="flex-end" style={{opacity: 0}}>
              <MenuButton />
            </Box>
        </HStack>
    );
}

