import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuButton from "../icons/MenuButton";
import SearchForm from "./SearchForm";

export default function DocumentHeader() {
  const navigation = useNavigation();

  return (
        <View style={{flexDirection: 'row', paddingHorizontal: 5}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginTop: 10, marginRight: 10}}>
                  <MenuButton />
              </TouchableOpacity> 
              <View style={{ flex: 1}}>
                <SearchForm />
              </View>
        </View>
    );
}