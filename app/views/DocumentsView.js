import { useSelector } from "react-redux";

import DocumentHeader from "../components/header/DocumentHeader";
import ButtonIcon from "../components/document/ButtonIcon";
import DocumentList from "../components/document/DocumentList";
import * as Device from "expo-device";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, FlatList,Dimensions } from "react-native"

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
    <View style={{ backgroundColor: "white", paddingTop: Device.osName === "iOS" ? 30 : 0 }}>
      <View style={{paddingHorizontal: 20}}>
        <DocumentHeader />
        {/*<Text style={{fontWeight: 600, marginTop: 25, marginBottom: 8, fontSize: 24}}>Döküman Merkezi</Text>*/}
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
          padding: 20,
          paddingBottom: 400,          
        }}
        extraData={isFocused}
      />
    </View>
  );
}
