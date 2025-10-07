import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FlatList, View } from "react-native";
import PdfViewer from "../PdfViewer";
import DocumentListItem from "../document/DocumentListItem";



export default function SearchResult({ search, setSearch, setOpen }) {
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
      <View style={{padding: 10}}>
        <PdfViewer uri={selected} />
        <FlatList 
          data={filtered}
          renderItem={({item}) => <DocumentListItem item={item} setSearch={setSearch} setOpen={setOpen} setSelected={setSelected} />}
          keyExtractor={(item, index) => index}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
        />
      </View>
    );    
}