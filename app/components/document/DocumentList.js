import { useState, useEffect } from "react";
import { Box, Text, View } from "native-base";
import { FlatList } from "react-native";
import PdfViewer from "../PdfViewer";
import DocumentListItem from "./DocumentListItem";


export default function DocumentList({ dirs, display, search = false }) {
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (dirs && dirs.length >= 0) {
      setIsLoading(false);
    }
  }, [dirs]);

  if (isLoading)
    return null;
  
  const renderDirectory = ({ item: dir }) => (
    <Box mb={search ? 0 : 4}>
      {!search && (
        <Text mb={2} fontWeight="bold" fontSize="18">
          {dir.title.split(" | ")[1]}
        </Text>
      )}
      <FlatList
        data={dir.files}
        keyExtractor={(file, index) => index}
        renderItem={({item}) => <DocumentListItem item={item} setSelected={setSelected} />}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
      />
    </Box>
  );  

  return (
    <View>
      <PdfViewer uri={selected} />
      <FlatList
        data={dirs}
        keyExtractor={(dir, index) => `dir-${index}`}
        renderItem={renderDirectory}
      />
    </View>
  );
}
