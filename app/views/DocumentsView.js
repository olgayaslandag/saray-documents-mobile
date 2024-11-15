import { Text, Box, ScrollView } from "native-base";
import { useSelector } from "react-redux";

import DocumentHeader from "../components/header/DocumentHeader";
import ButtonIcon from "../components/document/ButtonIcon";
import DocumentList from "../components/document/DocumentList";



export default function DocumentsView() {
  const items = useSelector(state => state.data.value ?? []);   
  const docSelected = useSelector(state => state.docSelect.value);

  return (
    <Box style={{backgroundColor: 'white'}}>
      <Box px="5">
        <DocumentHeader />
        <Text fontWeight="600" mt="4" fontSize="26">Döküman Merkezi</Text>        
      </Box>
      <Box>
        <ButtonIcon items={items} />
      </Box>
      <ScrollView style={{backgroundColor: '#F1F1F1', marginBottom: 100, minHeight: '100%'}} p="5">        
        {items.map((item, index) => (
          <DocumentList 
            dir={item.dir} 
            dirs={item.dirs} 
            key={index} 
            display={docSelected ? (item.dir.title === docSelected ? 'block' : 'none') : 'block'}            
          />  
        ))}
      </ScrollView>
      
    </Box>
  );
}


