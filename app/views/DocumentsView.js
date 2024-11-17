import { Text, Box, FlatList } from "native-base";
import { useSelector } from "react-redux";

import DocumentHeader from "../components/header/DocumentHeader";
import ButtonIcon from "../components/document/ButtonIcon";
import DocumentList from "../components/document/DocumentList";

export default function DocumentsView() {
  const items = useSelector((state) => state.data.value ?? []);
  const docSelected = useSelector((state) => state.docSelect.value);

  const renderDocumentList = ({ item }) => {
    const isVisible = docSelected ? item.dir.title === docSelected : true;
    return (
      isVisible && (
        <DocumentList
          dir={item.dir}
          dirs={item.dirs}
          display="block"
        />
      )
    );
  };

  return (
    <Box style={{ backgroundColor: "white" }}>
      <Box px="5">
        <DocumentHeader />
        <Text fontWeight="600" mt="4" fontSize="26">
          Döküman Merkezi
        </Text>
      </Box>
      <Box>
        <ButtonIcon items={items} />
      </Box>
      <FlatList
        data={items}
        keyExtractor={(item, index) => `document-${index}`}
        renderItem={renderDocumentList}
        contentContainerStyle={{
          backgroundColor: "#F1F1F1",
          padding: 20,
          paddingBottom: 100,
        }}
      />
    </Box>
  );
}
