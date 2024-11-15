import { Box, Stack, HStack } from "native-base";
import MenuButton from "../icons/MenuButton";
import SearchForm from "./SearchForm";

export default function DocumentHeader() {
    return (
        <Stack direction="column">
          <HStack>  
            <Box width="100%" mt="3">
              <SearchForm pt={2}  />
            </Box>                       
            <Box 
              width="0%" 
              ml="7%" 
              mt="10"
              alignItems="flex-end" 
              style={{opacity: 0}}
            >              
                <MenuButton />
            </Box>                                   
          </HStack>          
        </Stack>
    );
}