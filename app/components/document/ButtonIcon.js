import { Text, Box, Button, FlatList } from "native-base";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { docSelect } from "../../store/docSelectSlice";
import titleReplace from "../../libs/titleReplace";
import GetDocIcon from "../GetDocIcon";


function FolderIcon({ title, selected }) {  
    return (
      <Box style={{...styles.iconBox, backgroundColor: selected ? '#F1F1F1' : 'transparent'}}>
        <GetDocIcon title={title} selected={selected} />      
      </Box>
    );    
}
  
function Item({ item }) {
  const docSelected = useSelector(state => state.docSelect.value || "ALU | CATALOG - ALU | KATALOG");

  const dispatch = useDispatch();

  function HandleSelect(title) {
    dispatch(docSelect(title))
  }

    return (
      <Box style={{justifyContent: 'center', alignItems: 'center', marginLeft: 5}}>
        {item.dir &&             
          <Button variant="transparent" style={styles.iconButton} p={0} onPress={() => HandleSelect(item.dir.title)}>
            <Box>
              <FolderIcon title={item.dir.title} selected={docSelected === item.dir.title} />         
               
              <Text style={styles.iconTitle}>{titleReplace(item.dir.title)}</Text>          
            </Box>  
          </Button>
        }
        <Box style={{...styles.pyramid, borderBottomColor: docSelected === item.dir.title ? '#F1F1F1' : 'transparent'}}></Box>
      </Box>
    );
}
  
  
export default function ButtonIcon({ items }) {
  return (        
    <FlatList 
      data={items.filter(c => c.dir.title !== "icons")}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={(item, index) => index}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}



const styles = StyleSheet.create({
  iconButton: {
    marginRight: 5,
    marginLeft: 5,
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
    textAlign: 'center'
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