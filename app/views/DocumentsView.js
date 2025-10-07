import { useSelector } from "react-redux";

import DocumentHeader from "../components/header/DocumentHeader";
import ButtonIcon from "../components/document/ButtonIcon";
import DocumentList from "../components/document/DocumentList";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, FlatList,Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const WIDTH = Dimensions.get('window').width;

export default function DocumentsView() {
  const items = useSelector((state) => state.data.value ?? []);
  const docSelected = useSelector((state) => state.docSelect.value);

  const isFocused = useIsFocused();

  const renderDocumentList = ({ item }) => {
    const isVisible = docSelected ? item.dir.title === docSelected : true;
    return (
      isVisible && isFocused && (
        <DocumentList
          dir={item.dir}
          dirs={item.dirs}
        />
      )
    );
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
      <View style={{paddingHorizontal: 10}}>
        <DocumentHeader />
        <View style={{marginTop: 25}}></View>
      </View>

      <View style={{borderBottomWidth: 5, borderColor: '#F1F1F1', alignItems: WIDTH > 1250 ? 'center' : ''}}>
        <ButtonIcon items={items} />
      </View>
      
      <FlatList
        data={items}
        keyExtractor={(item, index) => index}
        renderItem={renderDocumentList}
        contentContainerStyle={{          
          backgroundColor: "#F1F1F1",
          padding: 15,
          paddingBottom: 400,          
        }}
        extraData={isFocused}
      />
    </SafeAreaView>
  );
}
