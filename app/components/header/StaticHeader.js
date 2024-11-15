import { Box, View } from "native-base";
import MenuButton from "../icons/MenuButton";

export default function StaticHeader() {
    return (
        <View flex="1">
            <View 
                borderRadius={30} 
                p="4"            
                width="60"
                height="60"
                alignItems="center"  
                alignSelf="flex-end"          
                mr="2"
                position="absolute"
                style={{backgroundColor: 'white', right: -3, top: 24, zIndex: 10, opacity: 0}}>
                <MenuButton />
            </View>
        </View>
    );
}