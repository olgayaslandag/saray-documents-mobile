import { useState, useEffect } from "react";
import { Box, Text, Image } from "native-base"
import { useSelector } from "react-redux";
import { TouchableOpacity, FlatList, Dimensions, StyleSheet } from "react-native";
import PdfViewer from "../PdfViewer";



const imageSize = Dimensions.get("window").width / 3 - 20;

function Item({ item, setSelected }) {
  return (
    <TouchableOpacity style={styles.item.container} onPress={() => setSelected("https://saray.com/drive/" + item.path)}>
      <Image source={{uri: item.thumbnail}} alt="" style={styles.item.image} />
      <Text style={styles.item.text}>{item.title}</Text>
    </TouchableOpacity>
  );
}



export default function SearchResult({ search }) {
    const items = useSelector(state => state.searchItems.value ?? []);   
    const [selected, setSelected] = useState("");
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
      if(search) {
        setFiltered(items.filter(item => item.title.toLowerCase().includes(search.toLowerCase())));
      } else {
        setFiltered([]);
      }      
    }, [search, items]);

    return (
      <Box p="5">
        <PdfViewer uri={selected} />
        <FlatList 
          data={filtered}
          renderItem={({item, index}) => <Item item={item} setSelected={setSelected} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={filtered.length >= 3 ? 3 : 1}
          key={filtered.length < 3 ? 'single-column' : 'multi-column'}          
        />
      </Box>
    );    
}

const styles = StyleSheet.create({
  item : {
    container: {
      flex: 1, 
      margin: 10
    },
    image: {
      width: imageSize,
      height: imageSize * 1.5,
      borderRadius: 10,

      shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
    },
    text: {

    }
  }  
});