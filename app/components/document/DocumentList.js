import { useState, useEffect } from "react";
import { Box, Text, Image, Stack, HStack, VStack, View } from "native-base";
import { Dimensions, Linking, TouchableOpacity, ActivityIndicator } from "react-native";
import PdfViewer from "../PdfViewer";


const imageSize = Dimensions.get("window").width / 3 - 20;

export default function DocumentList({ dirs, display, search=false }) {
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (dirs && dirs.length >= 0) {
      setIsLoading(false);
    }
  }, [dirs]);


  function HandleClick(path) {
    setSelected("https://saray.com/drive/" + path);
  }


  if (isLoading) {
    return null;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#EA0029" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }


  return (
    <View>
      <PdfViewer uri={selected} />
      <Stack space={4} mb={4} style={{display: display}}>
        <VStack justifyContent="space-between">
          {dirs.map((dir, dirIndex) => (
            <Box key={dirIndex} mb={search ? 0 : 4}>
              {!search && <Text mb={2} fontWeight="bold" fontSize="18">{dir.title.split(" | ")[1]}</Text>}

              {Array.from({ length: Math.ceil(dir.files.length / 3) }).map((_, rowIndex) => (
                <HStack key={rowIndex} space={3} justifyContent="space-between" mb={4}>
                  {dir.files.slice(rowIndex * 3, rowIndex * 3 + 3).map((item, fileIndex) => (
                    <TouchableOpacity key={fileIndex} style={{ width: imageSize, alignItems: "center" }} onPress={() => HandleClick(item.path)}>
                      <Image
                        source={{ uri: item.thumbnail }}
                        alt="thumbnail"
                        style={{ width: imageSize, height: imageSize * 1.5, borderRadius: 10 }}
                      />
                      <Text style={{fontSize: 12}}>{item.title}</Text>
                    </TouchableOpacity>
                  ))}
                </HStack>
              ))}
            </Box>
          ))}
        </VStack>
      </Stack>
    </View>
  );
}
