import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { docSelect } from "../../store/docSelectSlice";
import titleReplace from "../../libs/titleReplace";
import GetDocIcon from "../GetDocIcon";


function FolderIcon({ title, selected }) {  
    return (
      <View style={{...styles.iconBox, backgroundColor: selected ? '#F1F1F1' : 'transparent'}}>
        <GetDocIcon title={title} selected={selected} />      
      </View>
    );    
}
  
function Item({ item, index, items }) {
  const docSelected = useSelector(state => state.docSelect.value || "ALU | CATALOG - ALU | KATALOG");

  const dispatch = useDispatch();

  function HandleSelect(title) {
    dispatch(docSelect(title))
  }

    return (
      <View style={{
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: index === 0 ? 15 : 5, 
        marginRight: index === items.length - 2 ? 15 : 5}}>
        {item.dir &&             
          <TouchableOpacity style={styles.iconButton} onPress={() => HandleSelect(item.dir.title)}>
              <FolderIcon title={item.dir.title} selected={docSelected === item.dir.title} />         
              <Text style={styles.iconTitle}>{titleReplace(item.dir.title)}</Text>          
          </TouchableOpacity>
        }
        <View style={{...styles.pyramid, borderBottomColor: docSelected === item.dir.title ? '#F1F1F1' : 'transparent'}}></View>
      </View>
    );
}
  
  
export default function ButtonIcon({ items }) {
  return (        
    <FlatList 
      data={items.filter(c => c.dir.title !== "icons")}
      renderItem={({item, index}) => <Item item={item} items={items} index={index} />}
      keyExtractor={(item, index) => index}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}



const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  iconTitle: {
    width: 80,
    fontSize: 12,
    textAlign: 'center',
  },
  pyramid: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: 'transparent',
    borderRightWidth: 20,
    borderRightColor: 'transparent',
    borderBottomWidth: 20,
    borderBottomColor: '#F1F1F1',
  },
});